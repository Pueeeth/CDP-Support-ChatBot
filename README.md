# 📌 CDP Support Chatbot  

## 📝 Project Overview  

The **CDP Support Chatbot** is an intelligent assistant designed to answer **"how-to"** queries related to **Customer Data Platforms (CDPs)**:  
- **Segment**  
- **mParticle**  
- **Lytics**  
- **Zeotap**  

### ✅ Features:  
- **Real-time search** across CDP documentation  
- **Web scraping** to fetch the latest documentation  
- **Integration support** for multiple CDPs  
- **Comparison queries** between different CDPs  
- **Automatic documentation updates** every 24 hours  

This chatbot uses **Flask** for the backend and **React** for the frontend, integrating **Selenium, BeautifulSoup, and RapidFuzz** for efficient searching.

---

## 🛠️ Technology Stack  

| Component  | Tech Used |
|------------|----------|
| **Backend**  | Flask (Python) |
| **Frontend** | React (JavaScript) |
| **Database** | JSON-based storage |
| **Web Scraping** | BeautifulSoup, Selenium |
| **Search Optimization** | RapidFuzz |
| **Task Scheduling** | Python `schedule` library |

---

## 🚀 Getting Started  

### 1️⃣ **Clone the Repository**  

git clone https://github.com/company-repo/cdp-support-chatbot.git
cd cdp-support-chatbot

🔧 Backend Setup (Flask API)
📌 Install Dependencies

pip install -r requirements.txt
📌 Run the Flask Server

python app.py
This starts the API at http://127.0.0.1:5000.

🎨 Frontend Setup (React UI)
📌 Navigate to the Frontend Folder

cd frontend
📌 Install Dependencies

npm install
📌 Start the Frontend

npm start
The chatbot UI will be running at http://localhost:3000.

🔄 Documentation Scraper
The chatbot fetches documentation using scraper.py and updates it every 24 hours.

📌 Manually Update Documentation

python scraper.py
📌 Run the Scheduler for Automatic Updates

python scheduler.py
⚡ API Endpoints
Method	Endpoint	Description
GET	/search?query=<your-query>	Search for answers related to CDPs
GET	/	Load the chatbot UI
Example API Request:

curl "http://127.0.0.1:5000/search?query=How to integrate Segment with Zeotap?"
📜 Project Structure

cdp-support-chatbot/
│── backend/              # Flask backend
│   ├── app.py            # Main Flask app
│   ├── search.py         # Search logic & processing
│   ├── scraper.py        # Web scraping logic
│   ├── scheduler.py      # Automatic updates
│   ├── requirements.txt  # Python dependencies
│── frontend/             # React frontend
│   ├── src/              # React source files
│   ├── public/           # Static assets
│   ├── package.json      # React dependencies
│── data/                 # Scraped documentation storage
│── README.md             # Project documentation

🔥 How the Chatbot Works
User enters a query (e.g., "How to integrate Segment with Zeotap?").
Search logic identifies whether the query is about comparison, integration, or general information.
Documentation is fetched from official CDP sources using web scraping.
Relevant results are extracted using RapidFuzz for better search matching.
Response is displayed to the user.