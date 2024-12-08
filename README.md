# News App with Mood Tracker

This is a simple news app that fetches the latest articles, displays them to the user, and allows for mood tracking related to each article. The app is built with React for the frontend, and the backend is powered by Node.js and Express. 

## Features
- Fetches news articles from a custom backend API.
- Displays articles with detailed information such as title, description, authors, and more.
- Tracks mood score for each article and allows users to update it.
- Frontend is built with React and manages state using Recoil.
- Backend serves news data via a custom API and handles mood score updates.

## Tech Stack
- **Frontend**: 
  - React (for building user interfaces)
  - Recoil (for state management)
  - React Router (for routing between different pages)
  - Axios / Fetch (for making HTTP requests)

- **Backend**: 
  - Node.js with Express (for serving API)
  - Fetch API (to get data from external news API)
  - Environment variables for API keys

- **Other tools**:
  - CSS (for basic styling)
  - ES6+ features (such as async/await)

  ## Getting Started

### 1. Clone the Repository

First, clone this repository to your local machine:

### 2. Backend (Server) Setup

The backend is a simple Express server that provides news data and handles mood score updates.

#### Install Dependencies

Navigate to the backend folder and install the required dependencies:


#### Set Up Environment Variables

Create a `.env` file in the root of the server folder and add your API key for the external news source:

The server will be accessible at `http://localhost:4040` by default.

### 3. Frontend Setup

The frontend is built with React and communicates with the backend API.

#### Install Dependencies

Navigate to the frontend folder and install the required dependencies:

#### Start the Frontend

To start the React development server, run the following command:
