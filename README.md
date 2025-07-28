# 🧠 AI-Powered Resume Generator

Create elegant, dynamic resumes with built-in AI summarization, PDF export, and multiple visual themes — all in a sleek web app built using Node.js, EJS, and Google Gemini.

## 🚀 Live Features

- ✍️ User-friendly form to input name, role, skills, experience
- 🎨 Multiple resume themes (Classic, Modern, Elegant, Creative, Minimal)
- 🤖 Gemini API generates professional summary bullets based on user input
- 📄 PDF export with styling via Puppeteer
- 💼 Live preview with consistent AI output
- 🧠 Single Gemini API call with summary reuse (hidden input transfer)
- 📎 Custom favicons per theme & home page branding
- 🔐 Environment configuration via `.env`
- 📬 Email module (optional) using Nodemailer + Ethereal

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express, EJS
- **Frontend**: HTML5, CSS3, Vanilla JS
- **AI**: Google AI Studio (Gemini API)
- **PDF Export**: Puppeteer
- **Utilities**: dotenv, open, nodemailer

---

## 📁 Project Structure

ai-resume-generator/
├── app.js                         # Main Express server file
├── generateHighlight.js          # Gemini API integration for bullet summary
├── .env                          # Stores Gemini API key securely
├── package.json                  # Project metadata and dependencies
├── public/                       # Static assets served via Express
│   ├── css/                      # Stylesheets for form and resume templates
│   │   ├── index.css
│   │   ├── classic.css
│   │   ├── modern.css
│   │   ├── elegant.css
│   │   ├── creative.css
│   │   └── minimal.css
│   ├── icons/                    # Custom favicons per theme + home page
│   │   ├── home.ico
│   │   ├── classic.ico
│   │   ├── modern.ico
│   │   ├── elegant.ico
│   │   ├── creative.ico
│   │   └── minimal.ico
│   ├── js/                       
│   │   └── preview.js
├── views/                        # EJS templates for rendering pages
│   ├── index.ejs                 # Homepage: input form and theme selection
│   ├── classic.ejs               # Resume template - Classic
│   ├── modern.ejs                # Resume template - Modern
│   ├── elegant.ejs               # Resume template - Elegant
│   ├── creative.ejs              # Resume template - Creative
│   └── minimal.ejs               # Resume template - Minimal
├── README.md                     # Full project documentation
├── node_modules/                 # Installed npm packages
└── .gitignore                    # Ignore node_modules, .env, etc.
---

## 🧰 Prerequisites

- Node.js v18+
- npm (comes with Node)
- Git Bash or Terminal

---

## ⚙️ Setup


### Option 1: Manual Setup

1. Clone or download the project
2. Run:
   ```bash
   npm install
   npm start
### Option 2: One-Click Launch

1.  Windows: double-click setup.bat
2.  macOS/Linux: run bash setup.sh from Terminal

### If Security Issues Error occures then use :

1. Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass (For temporary use)
 
2. Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned (Permanent, to be used cautiously)

🔐 API Key Setup

- Visit Google AI Studio
- Create a Gemini API key
- Add to your .env file:
GEMINI_API_KEY=your_key_here


🎨 Theming & Favicon

- Each resume theme has its own favicon (public/icons/*.ico)
- Themes are passed via template and dynamically rendered
- Add new themes easily by extending views and icons

✨ AI Summary Flow

- Summary is generated once during preview
- Injected visibly into template and passed via hidden input
- Reused during PDF generation (no extra API calls)
- Fallback to basic summary if Gemini API fails

🛡️ Pro Tip for Distribution
If the project is shared with others (especially less technical users):
- After cloning: npm install
If PDF fails to generate: run npx puppeteer install
If at the terminal Gemini Generation error occurs: npm install @google/generative-ai@latest
