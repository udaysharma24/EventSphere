"use client"
import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Dynamicform1 from "@/components/dynamicForm1"
import Dynamicform2 from "@/components/dynamicForm2"
import Dynamicform3 from "@/components/dynamicForm3"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"


export default function Home() {
  const MAX_WORDS = 170;
  const searchParams= useSearchParams()
  const username= searchParams.get("username")
  const [mode, setmode]= useState(null);
  const [sponsoringAgencies, setsponsoring_Agencies]= useState([]);
  const [title, settitle]= useState("");
  const [coordinator, setcoordinator]= useState("");
  const [co_coordinators, setco_coordinators]= useState([]);
  const [chief_patron, setchief_patron]= useState("");
  const [chief_patron_designation, setchief_patron_designation]= useState("");
  const [hod, sethod]= useState("");
  const [department, setdepartment]= useState(null);
  const [about_department, setabout_department]= useState("");
  const [venue, setvenue]= useState("The LNM Institute of Information Technology, Rupa ki Nangal, Post-Sumel, Via-Jamdoli, Jaipur-302031, Rajasthan, India.")
  const [city, setcity]= useState("Jaipur")
  const [state, setstate]= useState("Rajasthan");
  const [country, setcountry]= useState("India");
  const [fromdate, setfromdate]= useState(null)
  const [todate, settodate]= useState(null)
  const [resource_person, setresource_person]= useState("");
  const [about_program, setabout_program]= useState("");
  const [topics, settopics]= useState([]);
  const [previewURL, setpreviewURL]= useState(null);
  const [Email, setEmail]= useState("");
  const [Contact, setContact]= useState(0);
  const [coordinator_designation, setcoordinator_designation]= useState("")
  function handleDescriptionChange(e) {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    if (words.length > 250) {
      alert("Description cannot exceed 250 words!");
      return;
    }
    setabout_program(text);
  }
  function handleAboutDepartmentChange(e) {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    if (words.length > MAX_WORDS) {
      alert("Description cannot exceed 170 words!");
      return;
    }
    setabout_department(text);
  }
  function formatDate(dateObj) {
    if (!dateObj) return "";
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const yyyy = dateObj.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
  function addTopic(value) {
    if (!value.trim()) return;
    settopics((prev) => [...prev, value.trim()]);
  }

  function addCoCoordinator(value) {
    if (!value.trim()) return;
    setco_coordinators((prev) => [...prev, value.trim()]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ SEND JSON OBJECT (not array)
    const formdata = {
      mode,
      sponsoringAgencies,
      title,
      coordinator,
      co_coordinators,
      chief_patron,
      chief_patron_designation,
      hod,
      department,
      about_department,
      venue,
      city,
      state,
      country,
      fromdate: formatDate(fromdate),
      todate: formatDate(todate),
      resource_person,
      about_program,
      topics,
      Email,
      Contact,
      coordinator_designation
    };

    try {
      const response = await fetch("http://localhost:3001/generate-brochure-faculty_DP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      if (!response.ok) {
        alert("Error generating DOCX");
        return;
      }

      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);

      // Show preview (only works in <iframe>; Word files preview inside some browsers)
      setpreviewURL(fileURL);

      // Auto-download DOCX
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `Faculty_DP_Brochure_${title}.docx`;
      link.click();

    } catch (err) {
      console.error("Error generating DOCX:", err);
      alert("Failed to generate brochure");
    }
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Faculty Development Program</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min px-6 py-8">
                  <h1 className="text-3xl font-semibold tracking-tight text-gray-800 mb-2">
                    Faculty Development Program
                  </h1>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"></div>
                  {/* Add here */}
                  <form onSubmit={handleSubmit}>
                    <h1 className="text-gray-850 text-xl underline">Mode of Event</h1>
                    <br/>
                    <Select onValueChange={(value)=>{setmode(value)}}>
                      <SelectTrigger
                        className="w-[180px] bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-gray-200 transition-all"
                      >
                        <SelectValue placeholder="Mode of Event" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#fdfdfd] border border-gray-100 shadow-md">
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Sponsoring agencies (if any)</h1>
                    <br/>
                    <Dynamicform1 onChange={(e)=>{setsponsoring_Agencies(e.target.value)}}/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Title of Event</h1>
                    <br/>
                    <Input onChange={(e)=>{settitle(e.target.value)}} className="bg-white"/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Name of Coordinator of program</h1>
                    <br/>
                    <Input onChange={(e)=>{setcoordinator(e.target.value)}} className="bg-white"/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Designation of Coordinator of the program</h1>
                    <br/>
                    <Input onChange={(e)=>{setcoordinator_designation(e.target.value)}} className="bg-white"/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Co-Cordinators of event</h1>
                    <br/>
                    <Dynamicform2 onAdd={addCoCoordinator}/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Chief Patron of the event(if any)</h1>
                    <br/>
                    <Input onChange={(e)=>{setchief_patron(e.target.value)}} className="bg-white"/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Designation of Chief Patron of the event(if any)</h1>
                    <br/>
                    <Input onChange={(e)=>{setchief_patron_designation(e.target.value)}} className="bg-white"/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Name of HOD</h1>
                    <br/>
                    <Input onChange={(e)=>{sethod(e.target.value)}} className="bg-white"/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Organizing department</h1>
                    <br/>
                    <Select onValueChange={(value)=>{setdepartment(value)}}>
                      <SelectTrigger
                        className="w-[180px] bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-gray-200 transition-all"
                      >
                        <SelectValue placeholder="Organising Department"/>
                      </SelectTrigger>
                      <SelectContent className="bg-[#fdfdfd] border border-gray-100 shadow-md">
                        <SelectItem value="CSE Department">CSE Department</SelectItem>
                        <SelectItem value="CCE Department">CCE Department</SelectItem>
                        <SelectItem value="ECE Department">ECE Department</SelectItem>
                        <SelectItem value="MME Department">MME Department</SelectItem>
                        <SelectItem value="Mathematics Department">Mathematics Department</SelectItem>
                        <SelectItem value="Humanities Department">Humanities Department</SelectItem>
                        <SelectItem value="AI/ML Department">AI/ML Department</SelectItem>
                      </SelectContent>
                    </Select>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Please give some info of the Organizing Department</h1>
                    <br/>
                    <div className="grid w-full gap-3">
                      <Label htmlFor="description">About the Department</Label>
                      <Textarea onChange={handleAboutDepartmentChange} placeholder="Type your description here." id="description" className="bg-white"/>
                    </div>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Venue of the event</h1>
                    <br/>
                    <Input onChange={(e)=>{setvenue(e.target.value)}} className="bg-white"/>
                    <br/>
                    <div className="flex flex-wrap gap-6">
                      <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="city">City</Label>
                        <Input onChange={(e)=>{setcity(e.target.value)}} type="text" id="city" placeholder="City" className="bg-white" />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="state">State</Label>
                        <Input onChange={(e)=>{setstate(e.target.value)}} type="text" id="state" placeholder="State" className="bg-white" />
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-3">
                        <Label htmlFor="country">Country</Label>
                        <Input onChange={(e)=>{setcountry(e.target.value)}} type="text" id="country" placeholder="Country" className="bg-white" />
                      </div>
                    </div>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Date of event</h1>
                    <br/>
                    <div className="flex flex-wrap gap-6 items-center">
                      <Calendar
                        mode="single"
                        selected={fromdate}
                        onSelect={setfromdate}
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                      />
                      <h1 className="text-gray-850 text-xl font-medium">to</h1>
                      <Calendar
                        mode="single"
                        selected={todate}
                        onSelect={settodate}
                        className="rounded-md border shadow-sm"
                        captionLayout="dropdown"
                      />
                    </div>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Name of Resource person</h1>
                    <br/>
                    <Input onChange={(e)=>{setresource_person(e.target.value)}} className="bg-white"/>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Description of the program</h1>
                    <br/>
                    <div className="grid w-full gap-3">
                      <Label htmlFor="description">About the Program</Label>
                      <Textarea onChange={handleDescriptionChange} placeholder="Type your description here." id="description" className="bg-white"/>
                    </div>
                    <br/>
                    <h1 className="text-gray-850 text-xl underline">Topics to be covered</h1>
                    <br/>
                    <Dynamicform3 onAdd={addTopic} />
                    <br/>
                    <Card className="bg-white shadow-sm border">
                      <CardHeader>
                        <CardTitle className="text-lg">Contact Details</CardTitle>
                        <CardDescription>Provide Coordinator's valid contact information</CardDescription>
                      </CardHeader>

                      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Email */}
                        <div className="grid gap-2">
                          <Label>Email ID</Label>
                          <Input
                            type="email"
                            placeholder="faculty@lnmiit.ac.in"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        {/* Phone */}
                        <div className="grid gap-2">
                          <Label>Phone Number</Label>
                          <Input
                            type="tel"
                            placeholder="+91 9876543210"
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </div>

                      </CardContent>
                    </Card>
                    <br/>
                    <Button className="cursor-pointer" type='submit'>Submit</Button>
                  </form>
                  {previewURL && (
                    <div className="mt-8">
                      <h2 className="text-xl font-semibold mb-2">Preview</h2>
                      <iframe
                        src={previewURL}
                        title="Brochure Preview"
                        width="100%"
                        height="600px"
                        className="border rounded-lg"
                      ></iframe>
                      <div className="mt-4">
                        <a href={previewURL} download="Faculty_DP_Brochure.docx">
                          <Button>Download DOCX</Button>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
