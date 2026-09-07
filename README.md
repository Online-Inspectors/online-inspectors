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

```

---

## 🚀 API Reference

### `GET /inspect`

Retrieves domain metadata including RDAP registration timestamps and DNS query responses.

**Query Parameters:**

* `domain` *(required)*: The domain hostname to analyze (e.g., `google.com`).

**Sample Request:**

```bash
curl "[https://online-inspectors-backend.onrender.com/inspect?domain=google.com](https://online-inspectors-backend.onrender.com/inspect?domain=google.com)"

```

**Sample Response:**

```json
{
  "dns": {
    "answers": [
      {
        "TTL": 300,
        "data": "142.250.4.102",
        "name": "google.com.",
        "type": 1
      }
    ],
    "status": "success"
  },
  "domain": "google.com",
  "rdap": {
    "creation_date": "1997-09-15T04:00:00Z",
    "handle": "2138514_DOMAIN_COM-VRSN",
    "status": "success"
  }
}

```

---

## 🛠️ Local Development Setup

### 1. Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
gunicorn app:app

```

Backend runs locally on `http://127.0.0.1:8000`.

### 2. Chrome Extension Installation

1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer Mode** (top right toggle).
3. Click **Load unpacked** and select the `extension/` folder from this repository.

---

## 📄 License

Distributed under the MIT License.

```

Terminal execution commands to commit and push:

```bash
git add README.md
git commit -m "Docs: Add full production README"
git push origin main

```