const dotenv = require("dotenv");
dotenv.config(); 

const apiKey = process.env.GEMINI_API_KEY;

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const puppeteer = require("puppeteer");
const fs = require("fs");
const { generateHighlight } = require("./generateHighlight");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));


app.get('/', (req, res) => {
  res.render('index');
});

app.post('/preview',async (req, res) => {
  const { name, skills, role, experience, template } = req.body;
  if ([name, skills, role, experience, template].some(f => !f || f.trim() === "")) {
    return res.send("⚠️ Please fill in all fields to preview your resume.");
  }


  const suggestedBullet = await generateHighlight(name, role, skills);
  res.render(`${template}.ejs`, { name, skills, role, experience, suggestedBullet, template });
});

app.post("/generate", async (req, res) => {
  const { name, skills, role, experience, template, email } = req.body;
  console.log("🛠️ Form Data Received:", req.body);

  if ([name, skills, role, experience, template, email].some(field => !field || field.trim() === "")) {
  return res.send("⚠️ Please fill in all fields and enter your email to generate your resume.");
}
  const suggestedBullet = await generateHighlight(name, role, skills);
  console.log("🧠 AI-generated summary:", suggestedBullet);
  console.log("📦 PDF Data:", { name, skills, role, experience, suggestedBullet });

  try{ 
    const htmlContent = await renderEJS(template, {
      name,
      skills,
      role,
      experience,
      suggestedBullet,
      template
    });
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "fabian.abbott29@ethereal.email",
        pass: "6BQUsM9ckpAzPsHVcu"
      }
    });

    const mailOptions = {
      from: '"Resume Builder" <noreply@resumegen.com>',
      to: email,
      subject: "Your AI-Generated Resume",
      text: "Attached is your resume PDF.",
      attachments: [
        {
          filename: `${name}-resume.pdf`,
          content: pdfBuffer
        }
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    const previewURL = nodemailer.getTestMessageUrl(info);

    res.send(`✅ Resume sent to <b>${email}</b>!<br><a href="${previewURL}" target="_blank">View Email Preview</a>`);
  } catch (error) {
    console.error("❌ Resume Generation Error:", error);
    res.send("Something went wrong while generating the resume. Please try again.");
  }
});


function renderEJS(templateName, data) {
  return new Promise((resolve, reject) => {
    const trimmedName = templateName.replace('.ejs', '');
    app.render(trimmedName, data, (err, html) => {
      if (err) {
         console.error("❌ Template Rendering Error:", err);
         return reject(err);
     }


      const cssPath = path.join(__dirname, "public", "css", `${templateName}.css`);
      let cssContent = "";

      try {
        cssContent = fs.readFileSync(cssPath, "utf8");
        console.log(`✅ Loaded CSS: ${cssPath}`);

      } catch {
        // If no specific CSS found, fallback to default
        const fallbackPath = path.join(__dirname, "public", "css", "styles.css");
        cssContent = fs.readFileSync(fallbackPath, "utf8");
        console.warn(`⚠️ No CSS found for template "${trimmedName}", using fallback`);

      }

      const styledHTML = html.replace("</head>", `<style>${cssContent}</style></head>`);
      console.log("✅ Final styled HTML ready for PDF generation");
      resolve(styledHTML);
    });
  });
}

const open = require("open").default;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});