# Resume Setup Instructions

## Current Situation
Your actual resume is located outside the portfolio folder at:
`c:\Users\IKE\Downloads\IKE-CV\[your-resume-file].pdf`

## Option 1: Copy Resume to Portfolio (Recommended)
```powershell
# Copy your actual resume to the portfolio public folder
Copy-Item "c:\Users\IKE\Downloads\IKE-CV\Lorenz_Tazan_Resume.pdf" "c:\Users\IKE\Downloads\IKE-CV\portfolio\public\resume.pdf"
```

## Option 2: Create Symbolic Link
```powershell
# Create a symbolic link (requires admin PowerShell)
New-Item -ItemType SymbolicLink -Path "c:\Users\IKE\Downloads\IKE-CV\portfolio\public\resume.pdf" -Target "c:\Users\IKE\Downloads\IKE-CV\[your-actual-resume].pdf"
```

## Option 3: Replace Placeholder
Simply replace the placeholder file at:
`c:\Users\IKE\Downloads\IKE-CV\portfolio\public\resume.pdf`

With your actual resume file (rename it to `resume.pdf`)

---

## How the Resume Link Works:
- **Desktop Header**: "Resume" button in navigation bar
- **Mobile Header**: "Download Resume" button in mobile menu
- **Download filename**: `Lorenz_Tazan_Resume.pdf`
- **Path**: `/resume.pdf` (served from `/public` folder)

---

## To Update Later:
Just replace the file at `portfolio/public/resume.pdf` whenever you update your resume.
