# 🔍 Online Inspectors

![Deployment Status](https://img.shields.io/badge/Backend-Render-blue?style=flat&logo=render)
![Frontend Status](https://img.shields.io/badge/Dashboard-GitHub_Pages-green?style=flat&logo=github)
![Extension Status](https://img.shields.io/badge/Extension-Chrome_v3-yellow?style=flat&logo=googlechrome)
![Python Version](https://img.shields.io/badge/Python-3.9%2B-brightgreen?style=flat&logo=python)

An automated, zero-cost domain intelligence engine. Inspects domain creation dates via **RDAP** and fetches **DNS** records seamlessly through a lightweight Chrome extension, a standalone web dashboard, or directly via REST API.

---

## 🌟 Live Endpoints & Deployments

| Component | Host / Platform | Live Endpoint / Link |
| :--- | :--- | :--- |
| **Backend API** | Render | `https://online-inspectors-backend.onrender.com` |
| **Web Dashboard** | GitHub Pages | `https://online-inspectors.github.io/online-inspectors/` |
| **Browser Extension**| Chrome Unpacked | Local build pointing to live Render backend |

---

## 🏗️ Architecture & Monorepo Structure

```text
online-inspectors/
├── backend/                  # Flask REST API engine
│   ├── app.py                # Main application & routing (/inspect)
│   ├── Procfile              # Gunicorn deployment configuration
│   └── requirements.txt      # Frozen dependencies (Flask, Gunicorn, tldextract, etc.)
├── extension/                # Manifest V3 Chrome Extension
│   ├── manifest.json         # Extension permissions & entrypoints
│   ├── popup.html            # UI layout for browser extension
│   └── popup.js              # Tab URL parser & API fetch client
├── web-dashboard/            # Standalone Web Client
│   └── index.html            # Modern HTML/JS/CSS frontend
├── index.html                # Root mirror for GitHub Pages serving
└── README.md                 # Project documentation