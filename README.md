# 🔥 AI Resume + Cover Letter Builder 🔥

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge"/>
  <img src="https://img.shields.io/badge/Google_Gemini-8E75A5?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini Badge"/>
</p>

<p align="center">
  <i>Forget writer's block. Build a job-winning resume and cover letter in minutes, not hours.</i>
</p>

---

## 🌟 About The Project

This isn't just another resume builder. It's an intelligent career assistant powered by the Google Gemini AI. This full-stack application was built to streamline the tedious process of crafting job application materials, allowing users to generate high-quality, professional resumes and cover letters with ease. 

From selecting a template to fine-tuning the AI-generated content with a live preview, every part of the experience is designed to be intuitive, fast, and effective. The standout feature is the **AI-Styled Template**, where the AI acts not just as a writer, but as a designer, structuring the resume content into a visually appealing, professional layout.

Deployment link (frontend): https://resume-builder-amber-chi.vercel.app/ 

---

## ✨ Core Features

- **🧠 AI-Powered Content Generation**: Leverages Google Gemini (MODEL- gemini-1.5-flash) to automatically create compelling, professional text based on your profile.
- **🎨 Multiple Template Options**:
  - **Classic, Modern, Minimalist**: Timeless, professional templates for any industry.
  - **AI-Styled Template (Beta)**: A cutting-edge feature where the AI structures the content into a beautiful, pre-designed layout.
- **✍️ Live Preview & Real-Time Editing**: Instantly see your final document and edit the AI-generated content on the fly. No more guessing games.
- **🗣️ Customizable AI Prompts**: Take control of the AI by providing specific instructions to tailor the tone and focus of your documents.
- **📄 Instant PDF Downloads**: Generate and download high-quality, pixel-perfect PDFs of your resume and cover letter.
- **🔐 Secure & Persistent**: Full user authentication via Clerk.dev, with all your progress saved in the browser's session storage.

---

## 🚀 Technology Stack & Philosophy

This project was built with a modern, robust, and scalable tech stack, chosen for performance and developer experience.

- **Frontend**: **React (with Vite)** was chosen for its lightning-fast development server and optimized build process. **Tailwind CSS** allows for rapid, utility-first styling.
- **Backend**: **Node.js & Express** provide a lightweight, powerful, and non-blocking foundation for the API.
- **AI Integration**: The **Google Gemini API** was selected for its advanced reasoning and content generation capabilities.
- **Templating & PDF**: **EJS** is used for its simplicity in rendering server-side HTML, which is then converted to a PDF using **Puppeteer** for perfect print-fidelity.
- **Authentication**: **Clerk.dev** handles the entire user authentication flow, providing a secure and seamless sign-in experience out-of-the-box.

---

## 🔄 Project Workflow

Here is a visual representation of the application's architecture and user flow:

```mermaid
graph TD
    subgraph "User Journey"
        A["👤 Start: User Enters App"] --> B{"Sign In / Sign Up"};
        B --> C["📝 Fill Profile Information"];
        C --> D["🎨 Select Template<br>(Classic, Modern, AI-Styled)"];
        D --> E["💬 Add Custom Prompts"];
    end

    subgraph "AI Generation Core"
        E --> F("🚀 Trigger AI Generation");
        F --> G["BACKEND: Build Prompt<br>with Profile + Style"];
        G --> H{{"🤖 Google Gemini API"}};
        H --> I["BACKEND: Receive AI Response<br>(Text or JSON)"];
    end

    subgraph "Finalization"
        I --> J["FRONTEND: Live Preview<br>Updates in Real-Time"];
        J --> K["✍️ User Edits Content<br>(Text or JSON)"];
        K --> L{"Download PDF"};
        L --> M["BACKEND: Render Final HTML<br>with EJS"];
        M --> N["PUPPETEER: Convert HTML to PDF"];
        N --> O["📄 User Receives PDF"];
    end

    style B fill:#E9D5FF,stroke:#8B5CF6
    style F fill:#DBEAFE,stroke:#3B82F6
    style H fill:#D1FAE5,stroke:#10B981
    style L fill:#DBEAFE,stroke:#3B82F6
    style O fill:#A7F3D0,stroke:#10B981
```

---

## 🔧 Setup and Installation

Follow these steps to get the project running on your local machine.

**Prerequisites:**
- Node.js (v18 or later recommended)
- npm

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```

**2. Configure Backend**
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```
- **Create Environment File**: In the `backend` directory, create a `.env` file.
- **Add API Key**: Add your Google Gemini API key to the `.env` file:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

**3. Configure Frontend**
```bash
# Navigate to the frontend directory from the root
cd ../frontend-vite

# Install dependencies
npm install
```

**4. Run the Application**

You'll need two separate terminals running simultaneously.

- **Terminal 1: Start Backend**
    ```bash
    # From the project root
    node --env-file=backend/.env backend/server.js
    ```
    *(Backend will run on `http://localhost:5000`)*

- **Terminal 2: Start Frontend**
    ```bash
    # From the project root
    cd frontend-vite
    npm run dev
    ```
    *(Frontend will be available at `http://localhost:5173`)*

---

## 🔮 Future Roadmap

- [ ] Add more template designs.
- [ ] Implement a "Share" feature to generate a public link to a resume.
- [ ] Allow users to save and manage multiple versions of their documents.
- [ ] Integrate with LinkedIn to pre-fill profile information.

---

## 📸 Screenshots & Demonstration

<table width="100%">
  <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/0a016202-0987-4b47-9a60-553f31ba2d05" alt="Sign Up" width="100%">
      <br />
      <em>1. Sign up with secure Clerk authentication.</em>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/7bb70eef-e673-486d-952e-c284995e963f" alt="Fill Profile" width="100%">
      <br />
      <em>2. Fill in your professional profile details.</em>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/04af8397-15d5-42c7-be02-d90d131063d6" alt="Choose Template" width="100%">
      <br />
      <em>3. Choose a template (including the AI-Styled option).</em>
    </td>
  </tr>
  <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/51158b2d-2c09-4267-a45e-5d830c0d2015" alt="Custom Prompts" width="100%">
      <br />
      <em>4. Add custom prompts to guide the AI.</em>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/35f7e405-cfdf-4d74-97ad-0ebc0863575f" alt="Edit Content" width="100%">
      <br />
      <em>5. Directly edit the AI-generated JSON content.</em>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/4cff4c1f-1884-4907-af3a-0eaee4753336" alt="Live Preview" width="100%">
      <br />
      <em>6. See your changes update in the live preview.</em>
    </td>
  </tr>
    <tr>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/547e5f9b-38d8-4c0b-9a26-a9e1c55e39a4" alt="Cover Letter" width="100%">
      <br />
      <em>7. The generated cover letter is also editable.</em>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/b9074e03-7ab1-4498-98b8-f3c39213d9b0" alt="Download PDF" width="100%">
      <br />
      <em>8. Download the final documents as PDF.</em>
    </td>
    <td align="center" valign="top">
      <img src="https://github.com/user-attachments/assets/42d7cd6a-1225-4ea4-a054-c385a6cc0ba2" alt="Final Output" width="100%">
      <br />
      <em>9. The final, professionally formatted PDF output.</em>
    </td>
  </tr>
</table>

Video demonstration link: https://drive.google.com/file/d/103AkpmUFU6qjyusM8Fxxb_VbXbQ2ka1G/view?usp=drive_link
