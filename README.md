# 🌀 PUIN POINTS
_A web application for easily finding your friends at events, without live tracking._

## 📌 Table of Contents
- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Credits](#credits)

## 🧠 Project Description
Puin Points is a lightweight web application developed for PUIN Collective events.  
It allows festival visitors to find their friends through visual signals (emojis) displayed on event screens, without the need for GPS tracking or constant phone use.  
Perfect for busy events where mobile coverage is unreliable and quick reconnection is needed.

## 🛠️ Tech Stack

| Area       | Technology                     |
|------------|---------------------------------|
| Frontend   | HTML5, CSS3, JavaScript (Vanilla) |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB (via Mongoose)           |
| View Engine | EJS (Embedded JavaScript Templates) |
| Hosting    | Local server (Node) or cloud server |
| Environment Variables | dotenv (.env file) |

## 🗂 Project Structure

```
Puin Points/
├── puin-points-frontend/      # Frontend assets (HTML, CSS, JavaScript)
├── puin-points-backend/
│   ├── models/                # Mongoose models
│   ├── routes/                # Express.js routes (e.g., groups, pings)
│   ├── node_modules/          # Node dependencies
│   ├── .env                   # Environment variables (not uploaded)
│   └── index.js               # Main server file
└── .git/                      # Version control system (optional)
```

## ✨ Features

- **Group Management**
  - Create new groups with custom emoji identifiers
  - Join existing groups via QR code or shared link
  - Manage group members easily
- **Signal & Location Services**
  - Send a "Where is my group?" ping
  - Respond by activating a visual PUIN Point signal
  - Temporary visual signals (auto-expire after 10 minutes)
  - Last known group locations saved
- **User Interface**
  - Simple and responsive design
  - Fast real-time feedback
  - No app install needed (web-based)
- **System Management (Planned)**
  - Admin dashboard for managing active groups and signals
  - Emergency override to clear all signals

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (included with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/downloads)

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/puin-points.git
```

2. **Navigate to the backend folder and install dependencies**
```bash
cd puin-points-backend
npm install
```

3. **Create a `.env` file**
```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/puinpoints
```

4. **Start the server**
```bash
node index.js
```

5. **Open the frontend**
- Open `puin-points-frontend/index.html` directly in your browser.
- (Optional) Host frontend with live-server or another lightweight local server.

## 🚀 Usage

- Create or join a group via the webapp
- Send a "Where is my group?" request
- Group members activate a PUIN Point visual signal
- Look for your emoji on the event screens and reconnect with your group

## 🔮 Future Improvements

- Real-time signaling using WebSockets instead of polling
- Full admin dashboard for system monitoring
- Better mobile UI/UX optimizations
- Group chat or message board features
- NFC integration for quick ping actions via wristbands

## 🙌 Credits

Puin Points was developed by Sil van Tiel, student at Fontys University of Applied Sciences (ICT Media & Design).  
Project realized as part of an event interaction concept for PUIN Collective.
