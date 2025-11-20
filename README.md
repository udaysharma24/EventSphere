EventSphere – Smart Event Brochure Automation System

EventSphere is a modern web application that automatically generates professional MS Word (DOCX) brochures for academic events such as seminars, workshops, FDPS, conferences, and guest lectures.
It eliminates manual formatting by allowing faculty to fill a structured form, after which the system dynamically fills a pre-designed Word template using Docxtemplater.

EventSphere dramatically reduces the time needed to prepare brochures and ensures consistent formatting across all departments. EventSphere – Smart Event Brochure Automation System

EventSphere is a modern web application that automatically generates professional MS Word (DOCX) brochures for academic events such as seminars, workshops, FDPS, conferences, and guest lectures.
It eliminates manual formatting by allowing faculty to fill a structured form, after which the system dynamically fills a pre-designed Word template using Docxtemplater.

EventSphere dramatically reduces the time needed to prepare brochures and ensures consistent formatting across all departments.

Features
1. Automated DOCX Brochure Generation
    - Generates a formatted event brochure with a single click
    - Fills placeholders like {{title}}, {{mode}}, {{coordinator}}, {{topics}}, etc.

2. Dynamic Form Handling
    - Add multiple topics, coordinators, and sponsoring agencies
    - Smart input validation (word limits, date format, empty-field checks)

3. Secure Login System
    - Faculty login with email + password
    - Passwords hashed with bcrypt
    - Session-based authentication using PostgreSQL

4. Modern UI/UX
    - Built using React + ShadCN UI + TailwindCSS
    - Mobile-responsive
    - Calendar date pickers
    - Dynamic input groups

5. Live Preview & Download
    - Preview generated DOCX in an iframe
    - Auto-download feature after generation

6. Template-Driven Design
    - Custom MS Word brochure designed in Word 365
    - Supports logos, images, color sections, and structured layout

Tech Stack
  Frontend
    1) React / Next.js
    2) ShadCN UI
    3) TailwindCSS
    4) Dynamic Form Components
    5) Calendar date pickers

  Backend
    1) Node.js + Express
    2) PostgreSQL
    3) Docxtemplater + PizZip
    4) bcrypt
    5) express-session

  Template Engine
    1) Microsoft Word 365
    2) DOCX placeholder-based dynamic mapping
    3) Fully customizable layout

Folder Structure
eventsphere/
 ├── client/               # Frontend UI
 │   ├── components/
 │   ├── app/
 │   ├── public/
 │   └── styles/
 │
 ├── server/               # Backend logic
 │   ├── templates/        # Word template files (.docx)
 │   ├── generated/        # Generated brochures
 │   ├── db.js
 │   └── server.js
 │
 ├── README.md
 └── .gitignore

Setup Instructions
    Clone the Repository
    '''
        git clone https://github.com/your-username/eventsphere.git
        cd eventsphere
    '''

    Install Backend
    '''
        cd server
        npm install
    '''

    Install Frontend
    '''
        cd ../client
        npm install
    '''

    Set Up Environment Variables
        Create .env in /server:
    '''
        SESSION_SECRET=your-secret-key
        DB_USER=postgres
        DB_PASSWORD=yourpassword
        DB_NAME=eventsphere
        DB_HOST=localhost
        DB_PORT=5432
    '''

    Run Project
    
        Backend:
        '''
            cd server
            node server.js
        '''
        Frontend:
        '''
            cd client
            npm run dev
        '''
        Backend → http://localhost:3001
        Frontend → http://localhost:3000

How It Works
    Step 1: Login
        Faculty logs in → backend verifies credentials (PostgreSQL database).
    Step 2: Fill Event Form
        User fills:
            Mode of event
            Title
            fromdate(start date)
            todate(end date)
            Coordinator
            Co-coordinators
            Sponsoring agencies
            Department
            About Department
            Venue
            Dates
            Resource person
            Chief Patron
            HOD
            About the program
            Topics list
    Step 3: Docxtemplater Fills Template
            The backend processes data and replaces Word template placeholders.
    Step 4: User Downloads Fully Designed Brochure
            A DOCX file is generated under /server/generated.

Screenshots
/screenshots/
 ├── Eventsphere.png
 └── next.png

Why EventSphere?
- Saves hours of manual design work
- Ensures uniform formatting for all events
- Easy for faculty to use
- Prevents layout errors
- Supports dynamic content

Future Enhancements
- PDF export
- Multiple template selection
- Admin dashboard
- Rich text editor
- Image drag & drop
- Email sharing of brochures
- Poster and Certificate addition

License
- This project is licensed under the MIT License.

Contributing
Pull requests are welcome.
For major changes, open an issue to discuss your ideas.
