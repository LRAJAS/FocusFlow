# ⏱️ FocusFlow - Transform Distraction into Achievement

<div align="center">

![FocusFlow Banner](https://img.shields.io/badge/FocusFlow-Study%20Timer-6366f1?style=for-the-badge&logo=clockify&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live-Demo-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://lrajas.github.io/focusflow)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Turn your device from a distraction into a powerful study tool**

[View Demo](#-demo) • [Features](#-features) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack)

</div>
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=vercel)](https://lrajas.github.io/FocusFlow)
---

## 📖 About The Project

**FocusFlow** is a Pomodoro-style study timer designed to help students stay focused by converting their biggest distraction (their phone/computer) into a productive study companion. With tab-switch detection, an AI study buddy, and a rewarding points system, FocusFlow makes studying engaging and effective.

### 🎯 The Problem

- Students get distracted by their devices while studying
- Traditional timers don't prevent tab-switching to social media
- Studying feels unrewarding and isolated

### ✨ The Solution

FocusFlow addresses these issues by:
- **Tab Detection**: Timer resets if you switch tabs (no cheating!)
- **Reward System**: Earn points for completing focus sessions
- **AI Study Buddy**: Get instant help without leaving your focus zone
- **Nature Backgrounds**: Calming wallpapers that rotate randomly during sessions
- **Smart Tips**: Receive study tips at strategic times

---

## 🚀 Features

### 🎯 Core Features

#### **Intelligent Timer System**
- ⏱️ **Flexible Durations**: Choose from 10 to 180 minutes (5-minute intervals)
- 🎨 **3 Visual Modes**: Digital, Analog, and Progress Circle
- 🔒 **Tab-Switch Detection**: Timer auto-resets if you leave the page
- 📊 **Points System**: Earn 5-100 points based on session length

#### **🌿 Calming Nature Backgrounds**
- Randomly selected nature wallpapers during focus sessions
- Helps create a peaceful studying atmosphere
- Reduces eye strain with carefully chosen imagery

#### **🤖 AI Study Buddy**
- Powered by Google Gemini 2.5 Flash
- Ask questions without breaking your focus
- Get instant explanations and help
- Animated robot icon with pulsing effect

#### **💡 Smart Study Tips**
- Automatic tips at halfway point
- Reminder 5 minutes before completion
- Science-backed studying techniques

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase Authentication & Realtime Database
- **AI**: Google Gemini 2.5 Flash API
- **Hosting**: GitHub Pages

---

## 🚀 Quick Start

1. Clone the repository
2. Set up Firebase (see full guide below)
3. Get Gemini API key
4. Add nature wallpapers to `/wallpapers` folder
5. Run locally or deploy to GitHub Pages

**Full setup guide below** ⬇️

---

## 📁 Project Structure

```
focusflow/
├── index.html              # Login page
├── timer.html              # Timer interface
├── timer.js                # Main logic
├── styles.css              # Styling
├── wallpapers/             # Nature backgrounds
│   ├── nature1.jpg
│   └── ... (nature2-10.jpg)
├── README.md               # This file
└── .gitignore
```

---

## 🌐 Deploying to GitHub Pages

### Step-by-Step Guide

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it "focusflow"
   - Make it Public (for GitHub Pages)

2. **Push Your Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/focusflow.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Repository → Settings → Pages
   - Source: Deploy from branch "main"
   - Folder: / (root)
   - Save

4. **Update Firebase**
   - Firebase Console → Authentication → Settings
   - Add authorized domain: `YOUR_USERNAME.github.io`

5. **Your Site is Live!**
   ```
   https://YOUR_USERNAME.github.io/focusflow/
   ```

---

## ⚙️ Configuration

### Firebase Setup

1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Google + Anonymous)
3. Create Realtime Database (test mode)
4. Update `index.html` line 101 with your config

### Gemini API

1. Get key from [AI Studio](https://makersuite.google.com/app/apikey)
2. Update `timer.js` line 356

### Wallpapers

1. Create `/wallpapers` folder
2. Add 10 images: `nature1.jpg` through `nature10.jpg`
3. Use free images from [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com)

---

## 🎯 Usage

1. **Sign in** (Google or PIN)
2. **Choose duration** and timer style
3. **Start session** - enjoy nature background
4. **Stay focused** (no tab switching!)
5. **Use AI chatbot** (🤖 button) for help
6. **Complete session** - earn points!

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Check Firebase auth is enabled |
| Timer won't start | Select a duration first |
| Chatbot doesn't work | Verify API key & model name |
| Wallpapers missing | Check `/wallpapers` folder exists |

---

## 🤝 Contributing

Contributions welcome! Fork → Branch → Commit → Push → PR

---

## 📜 License

MIT License - see LICENSE file

---

## 🙏 Credits

- Firebase - Backend
- Google Gemini - AI
- Unsplash/Pexels - Images

---

<div align="center">

**Made with ❤️ for focused learners**

Give it a ⭐ if it helped you!

[⬆ Back to Top](#️-focusflow---transform-distraction-into-achievement)

</div>

## 📞 Contact

**Creator**: LRAJAS
- GitHub: [@LRAJAS](https://github.com/LRAJAS)
- Project Link: [FocusFlow](https://github.com/LRAJAS/FocusFlow)

---

## ⭐ Show Your Support

If FocusFlow helped you study better, please give it a ⭐!
