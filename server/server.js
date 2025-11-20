import express from "express";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import connect_pg from "connect-pg-simple";
import pool from "./db.js";
import bcrypt from "bcrypt";

dotenv.config();

const PgSession = connect_pg(session);
const app = express();
const port = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new PgSession({
      pool: pool,
      tableName: "session",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// LOGIN ROUTE (unchanged)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query("SELECT * FROM faculties WHERE email=$1", [email]);

  if (result.rows.length === 0)
    return res.status(401).json({ message: "No such account found" });

  const match = await bcrypt.compare(password, result.rows[0].hashedpassword);
  if (!match)
    return res.status(401).json({ message: "Wrong password" });

  return res.status(200).json({
    status_code: 200,
    firstname: result.rows[0].first_name,
  });
});

// BROCHURE ROUTE
app.post("/generate-brochure-seminar", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Seminar_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Seminar_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Seminar_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-expert_lecture", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Expert_lecture_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Expert_lecture_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Expert_lecture_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-conference", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Conference_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Conference_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Conference_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-admin_DP", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "ADP_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `ADP_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ADP_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-executive_DP", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "EDP_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `EDP_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=EDP_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-faculty_DP", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "FDP_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `FDP_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=FDP_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-finishing_school", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Finishing_school_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Finishing_school_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Finishing_school_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-foundation_day", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Foundation_day_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Foundation_day_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Foundation_day_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-ind_visit", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Industrial_visit_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Industrial_visit_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Ind_visit_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-intl_STP", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Int_sumterm_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Int_sumterm_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Int_sumterm_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-Nat_STP", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Nat_sumterm_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Nat_sumterm_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Nat_sumterm_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.post("/generate-brochure-training_prog", async (req, res) => {
  try {
    // Load template
    const templatePath = path.join(__dirname, "templates", "Training_prog_template10.docx");
    const content = fs.readFileSync(templatePath, "binary");

    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' }
    });

    // Extract fields from frontend
    const data = req.body;

    doc.render({
      mode: data.mode || "",
      title: data.title || "",
      coordinator: data.coordinator || [],
      co_coordinators: data.co_coordinators || [],
      chief_patron: data.chief_patron || "",
      chief_patron_designation: data.chief_patron_designation || "",
      hod: data.hod || "",
      department: data.department || "",
      about_department: data.about_department || "",
      venue: data.venue || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "",
      fromdate: data.fromdate || "",
      todate: data.todate || "",
      resource_person: data.resource_person || "",
      about_program: data.about_program || "",
      topics: data.topics || [],
      sponsoringAgencies: data.sponsoringAgencies || [],
      Email: data.Email || "",
      Contact: data.Contact || 0,
      Coordi_desi: data.coordinator_designation || ""
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });
    const generatedDir = path.join(__dirname, "generated");
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    const outputPath = path.join(__dirname, "generated", `Training_prog_${data.title}.docx`);
    fs.writeFileSync(outputPath, buffer);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Training_prog_${data.title}.docx`
    );

    res.send(buffer);
    } 
    catch (error) {
      if (error.properties && error.properties.errors) {
        console.log("Docxtemplater Errors:", error.properties.errors);
      } else {
        console.log("General Error:", error);
      }
    }
  }
);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
