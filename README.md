# JobNow

Production Website Link: https://jobnow.onrender.com/

## Prerequisites

Make sure you have `python` or `python3` installed on your machine, as well as `flask`. Also, go to https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch/details to create an account and obtain an API key.

## Installation Guide

### Client

Navigate to `client` folder, and create a `.env` file and add the following line:

```
VITE_API_KEY="your-api-key"
```

In the terminal window, navigate to the `client` folder, and run `npm install` to install all dependencies. Then, run `npm run dev` to start the development server.

### Server

Navigate to `server` folder, and create a `.env` file and add the following lines:

```
FLASK_SECRET_KEY=supersecretkey
DATABASE_URL=sqlite:///database.db
```

In a new terminal window, navigate to the `server` folder, and create a virtual environment. 

To create a virtual environment on `macOS/Linux`, run the following commands:

```
python3 -m venv .venv
```

```
. .venv/bin/activate
```

To create a virtual environment on `Windows`, run the following commands:

```
py -3 -m venv .venv
```

```
.venv\Scripts\activate
```

Then, run `python init.py` to initialize the database and run `python server.py` to start the backend server. You may have to use `python3` if the `python` command does not work.

## Technologies & Frameworks Used
- React.js
- Flask
- MySQL
- JavaScript
- Tailwind CSS
- Python
- Ant Design
- Vite

## API Used
- JSearch

## Deployed on Render
- Production Website: https://jobnow.onrender.com/




