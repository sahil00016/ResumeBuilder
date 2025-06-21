# AI Resume + Cover Letter Builder

A full-stack web app where users can:
- Create an account or log in (Clerk.dev)
- Fill out their profile (name, education, experience, skills, etc.)
- Select a free resume + cover letter template
- Use AI (Gemini or HuggingFace) to generate content
- Preview and edit the generated content
- Download resume + cover letter as PDF

## Tech Stack
- **Frontend:** React + Tailwind CSS (Vercel)
- **Auth:** Clerk.dev
- **Backend:** Node.js + Express (Railway/Render)
- **AI:** Gemini API / HuggingFace
- **Template Engine:** EJS
- **PDF Generator:** Puppeteer
- **Database (optional):** MongoDB Atlas Free

## Project Structure
```
ResumeBuilder/
├── backend/
├── frontend/
└── README.md
```

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file with your API keys
4. `node server.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. Set up Clerk.dev keys in `.env`
4. `npm start`

---

See each folder for more details. 