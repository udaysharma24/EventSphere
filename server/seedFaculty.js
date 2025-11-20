import { faker } from '@faker-js/faker';
import fs from "fs"
import bcrypt from "bcrypt"

async function generate_csv(){
    let dep= ["Computer Science(CSE)", "Communication and Computer(CCE)", "Electronics and Communication(ECE)", "Mechanical Engineering(ME)", "Mathematics", "Humanities", "IT"]
    let des= ["Assistant Professor", "Professor", "Associate Professor", "Visiting Faculty"]

    const rows= 200
    let csvdata1= "College_ID,First Name,Last Name,Email,Designation,Department,Office,password\n"
    let csvdata2= "College_ID,First Name,Last Name,Email,Designation,Department,Office,hashedpassword\n"

    for(let i=0; i<rows; i++)
    {
        const firstname= faker.person.firstName()
        const lastname= faker.person.lastName()
        const designation= des[Math.floor(Math.random()*(des.length))]
        const department= dep[Math.floor(Math.random()*(dep.length))]
        const email= (firstname.toLowerCase())+ (lastname.toLowerCase())+ "@lnmiit.ac.in"
        const college_ID= "F" + faker.number.int(2000)
        const office= faker.number.int(2000)
        const password= faker.internet.password({length:12, memorable:false})
        const hashedpassword= await bcrypt.hash(password, 10)
        console.log({college_ID, firstname, lastname, email, designation, department, office, password})
        csvdata1+=`${college_ID},${firstname},${lastname},${email},${designation},${department},${office},${password}\n`
        csvdata2+=`${college_ID},${firstname},${lastname},${email},${designation},${department},${office},${hashedpassword}\n`
    }

    fs.writeFileSync("Faculty_demo.csv", csvdata1)
    fs.writeFileSync("Faculty_demo_hashed.csv", csvdata2)

    console.log("✅ faculty_demo.csv and faculty_demo_hashed.csv generated with", rows, "rows");
}

generate_csv()