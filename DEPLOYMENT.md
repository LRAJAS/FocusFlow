# 🚀 GitHub Deployment Guide for FocusFlow

**Complete guide to deploying your FocusFlow study timer to GitHub Pages**

---

## 📋 Prerequisites

Before you start, make sure you have:
- [x] GitHub account (free)
- [x] Git installed on your computer
- [x] Your FocusFlow project folder ready
- [x] Firebase configured and working locally
- [x] Gemini API key set up

---

## 🎯 Deployment Steps

### Step 1: Create GitHub Account (if needed)

1. Go to https://github.com
2. Click "Sign up"
3. Choose a username (this will be in your website URL)
4. Complete verification

---

### Step 2: Create New Repository

1. **On GitHub**:
   - Click the "+" icon (top right) → "New repository"
   
2. **Repository Settings**:
   - **Name**: `focusflow` (or your preferred name)
   - **Description**: "Pomodoro study timer with AI chatbot and nature backgrounds"
   - **Visibility**: ✅ Public (required for free GitHub Pages)
   - **DON'T** check "Initialize with README" (you already have one)
   
3. Click **"Create repository"**

---

### Step 3: Install Git (if not installed)

**Windows**:
- Download from https://git-scm.com/download/win
- Run installer with default settings
- Restart Command Prompt after installation

**Mac**:
- Open Terminal
- Type: `git --version`
- If not installed, it will prompt you to install

**Linux**:
```bash
sudo apt-get install git
```

---

### Step 4: Push Your Code to GitHub

#### Option A: Using Command Line

1. **Open Command Prompt/Terminal in your project folder**:
   ```bash
   # Navigate to your project
   cd D:\Projects\pomodoro web-page
   ```

2. **Initialize Git**:
   ```bash
   git init
   ```

3. **Add all files**:
   ```bash
   git add .
   ```

4. **Commit**:
   ```bash
   git commit -m "Initial commit: FocusFlow study timer"
   ```

5. **Add remote** (replace with YOUR username):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/focusflow.git
   ```

6. **Set branch name**:
   ```bash
   git branch -M main
   ```

7. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```
   
   You'll be asked to sign in - enter your GitHub username and password (or use personal access token)

#### Option B: Using GitHub Desktop (Easier!)

1. **Download GitHub Desktop**:
   - Go to https://desktop.github.com/
   - Install and sign in

2. **Add your repository**:
   - File → Add Local Repository
   - Choose your project folder
   - Click "Create a repository"

3. **Publish**:
   - Click "Publish repository"
   - Uncheck "Keep this code private"
   - Click "Publish repository"

---

### Step 5: Enable GitHub Pages

1. **Go to your repository** on GitHub:
   ```
   https://github.com/YOUR_USERNAME/focusflow
   ```

2. **Click "Settings"** (top menu)

3. **Click "Pages"** (left sidebar)

4. **Configure Source**:
   - **Branch**: Select `main`
   - **Folder**: Select `/ (root)`
   - Click **"Save"**

5. **Wait 2-3 minutes** for deployment

6. **Your site is live!**
   ```
   https://YOUR_USERNAME.github.io/focusflow/
   ```
   
   GitHub will show you this URL at the top of the Pages settings

---

### Step 6: Update Firebase Authorized Domains

**IMPORTANT**: Your site won't work until you do this!

1. **Go to Firebase Console**:
   https://console.firebase.google.com/

2. **Select your project** ("Pomodoro site")

3. **Go to Authentication**:
   - Click "Authentication" (left sidebar)
   - Click "Settings" tab
   - Scroll to "Authorized domains"

4. **Add your GitHub Pages domain**:
   - Click "Add domain"
   - Enter: `YOUR_USERNAME.github.io`
   - Click "Add"

---

### Step 7: Test Your Live Site

1. **Open your GitHub Pages URL**:
   ```
   https://YOUR_USERNAME.github.io/focusflow/
   ```

2. **Test everything**:
   - [ ] Login with Google works
   - [ ] PIN login works
   - [ ] Timer starts and counts down
   - [ ] Nature wallpapers appear
   - [ ] AI chatbot responds
   - [ ] Points are saved

---

## 🔄 Updating Your Site

When you make changes to your code:

### Using Command Line:
```bash
# In your project folder
git add .
git commit -m "Description of what you changed"
git push
```

### Using GitHub Desktop:
1. Open GitHub Desktop
2. You'll see your changes listed
3. Write a commit message
4. Click "Commit to main"
5. Click "Push origin"

**Your live site updates automatically in 1-2 minutes!**

---

## 📁 Important Files to Include

Make sure these are in your repository:

```
✅ index.html
✅ timer.html
✅ timer.js
✅ styles.css
✅ README.md
✅ .gitignore
✅ wallpapers/ (folder with images)
```

---

## 🛠️ Create .gitignore File

Create a file named `.gitignore` in your project root:

```
# Node modules (if you add them later)
node_modules/

# Environment files (never commit these!)
.env
.env.local

# IDE files
.vscode/
.idea/
*.swp

# OS files
.DS_Store
Thumbs.db

# Build files
dist/
build/

# Logs
*.log
npm-debug.log*
```

---

## 🔐 Security Best Practices

### API Keys
- ✅ Firebase keys are SAFE to commit (protected by Firebase rules)
- ✅ Gemini API key is on free tier (low risk)
- ✅ Monitor usage at:
  - Firebase Console
  - Google Cloud Console

### Firebase Security Rules

Update your Realtime Database rules for production:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "pinUsers": {
      "$username": {
        ".read": "auth != null",
        ".write": "auth != null && (!data.exists() || root.child('pinUsers/' + $username).exists())"
      }
    }
  }
}
```

---

## 🎨 Customizing for Your Profile

### Update README with your info:

```markdown
**Creator**: Your Name
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- Email: your.email@example.com
```

### Add a profile README:

1. Create repository named `YOUR_USERNAME` (same as your username)
2. Add README.md showcasing your projects
3. Include link to FocusFlow!

---

## 🌟 Making Your Repository Stand Out

### Add Topics/Tags:
1. Go to your repository
2. Click the gear icon next to "About"
3. Add topics: `study-timer`, `pomodoro`, `firebase`, `ai-chatbot`, `productivity`

### Add a Description:
"Pomodoro study timer with AI chatbot, tab detection, and nature backgrounds"

### Create a Banner Image:
- Use [Canva](https://canva.com) to design
- Add to repository
- Reference in README: `![Banner](banner.png)`

---

## 📊 Monitoring Your Site

### GitHub Insights:
- Repository → Insights → Traffic
- See visitors, views, and clones

### Google Analytics (Optional):
Add tracking code to `index.html` and `timer.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

---

## 🐛 Troubleshooting Deployment

### Site shows 404
- Check GitHub Pages is enabled
- Verify branch is "main"
- Wait 2-3 minutes after enabling

### Firebase login doesn't work
- Add domain to authorized domains
- Clear browser cache
- Check browser console for errors

### Changes don't appear
- Wait 1-2 minutes for GitHub to rebuild
- Hard refresh browser (Ctrl+Shift+R)
- Check if you pushed changes: `git status`

### Images don't load
- Check file paths are correct
- Ensure `/wallpapers` folder is in repository
- Verify image files are committed

---

## 🎯 Next Steps After Deployment

1. **Share your project**:
   - Post on LinkedIn
   - Share with friends
   - Add to your portfolio

2. **Get feedback**:
   - Ask friends to test
   - Post on Reddit (r/webdev, r/learnprogramming)
   - Join Discord communities

3. **Keep improving**:
   - Fix bugs users report
   - Add new features
   - Maintain documentation

---

## 📞 Need Help?

### Resources:
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Firebase Docs](https://firebase.google.com/docs)

### Got stuck?
1. Check repository Issues tab
2. Google the error message
3. Ask on Stack Overflow
4. Post in r/webdev

---

## ✅ Deployment Checklist

Before going live, verify:

- [ ] Firebase config is correct
- [ ] Gemini API key is set
- [ ] Wallpapers folder has 10 images
- [ ] All features work locally
- [ ] README has your information
- [ ] .gitignore file is created
- [ ] Code is pushed to GitHub
- [ ] GitHub Pages is enabled
- [ ] Domain added to Firebase
- [ ] Site tested online
- [ ] Shared with friends! 🎉

---

## 🎊 Congratulations!

Your FocusFlow study timer is now live on the internet!

**Your URL**:
```
https://YOUR_USERNAME.github.io/focusflow/
```

**What you've accomplished**:
- ✅ Built a full-stack web application
- ✅ Integrated Firebase & AI
- ✅ Deployed to production
- ✅ Created a portfolio piece

**Share it everywhere!** 🚀

---

<div align="center">

**Made with ❤️ by developers, for learners**

[← Back to README](README.md)

</div>
