/* eslint-disable no-undef */
import http from "http";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
const server = http.createServer(app);

// App Configuration
app.use(cookieParser());
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("dist", "index.html"));
  });
} else {
  // Allow cross-origin requests in development
  const corsOptions = {
    origin: [
      "http://127.0.0.1:4040",
      "http://localhost:4040",
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://localhost:5174", 
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

// Initialize Google AI Client
const genAI = new GoogleGenerativeAI(process.env.VITE_GOOGLE_GENERATIVE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/mood", async (req, res) => {
  const { titles, title, description } = req.body;

  try {
    // If titles are provided, analyze sentiment of each
    if (titles && Array.isArray(titles)) {
      console.log("Received titles:", JSON.stringify(titles));

      const prompt = `For each sentence in the following list, 
        provide a sentiment score from 0 to 10, 
        where 0 is the most supportive and 10 is the most aggressive. 
        Please return matched json response
        Sentences: ${JSON.stringify(titles)}`;

      const response = await model.generateContent(prompt);
      console.log("Model Response:", response);

      // Check if the response structure is valid
      if (!response || !response.response || !response.response.text) {
        console.error("Invalid response structure:", response);
        return res
          .status(500)
          .json({ error: "Invalid response from AI model" });
      }

      const responseText = await response.response.text();
      console.log("Raw Response Text:", responseText);

      // Clean up the response text
      let cleanedResponseText = responseText.trim();
      cleanedResponseText = cleanedResponseText.replace(/```json|```/g, ""); // Remove backticks
      console.log("Cleaned Response Text:", cleanedResponseText);

      // Try parsing the cleaned response
      let sentimentScores;
      try {
        sentimentScores = JSON.parse(cleanedResponseText);
      } catch (parseError) {
        console.error("Error parsing response text:", parseError);
        return res
          .status(500)
          .json({ error: "Error parsing AI model response" });
      }

      console.log("Sentiment Scores:", sentimentScores);
      return res.json({ sentimentScores });
    }

    // If a title and description are provided, improve them for empathy and positivity
    if (title && description) {
      const prompt = `I will give you a title,news story and its current mood score(0-10) 0 = the most empathetic and positive titel and news story.
        Your task is to make both(titel and news story arguments) more empathetic and positive without losing important facts.
        and in the end supply new matched mood score to the result.
        The new mood score must be lower then the argument one!

        Title: "${title}"
        Description: "${description}"

        Return a plain JSON object with the format:
        {
          "title": "<new updated title>",
          "description": "<new updated description>",
          "moodScore": "<new matcehd mood Score out>"
        }
        Return only this JSON object, with no extra text or explanations.`;

      const response = await model.generateContent(prompt);
      console.log("Model Response:", response);

      if (!response || !response.response || !response.response.text) {
        console.error("Invalid response structure:", response);
        return res
          .status(500)
          .json({ error: "Invalid response from AI model" });
      }

      let answer = await response.response.text();
      answer = answer.replace(/```json|```/g, "").trim(); // Clean up JSON
      const updatedArticle = JSON.parse(answer);

      console.log("Updated Article:", updatedArticle);
      return res.json(updatedArticle);
    }

    // If the payload is invalid
    return res.status(400).json({ error: "Invalid request payload" });
  } catch (error) {
    console.error("Error in /api/mood:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



// News API - Fetch Latest News Articles
app.get("/api/news", async (req, res) => {
  const apiKey = process.env.VITE_API_KEY;
  const url = `https://api.worldnewsapi.com/search-news?api-key=${apiKey}&text=sport.`;
  const params = {
    text: "sport",
    language: "en",
    "earliest-publish-date": "2024-11-10",
    number: 10,
  };

  try {
    const urlParams = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${urlParams}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error details:", errorDetails);
      return res.status(500).json({ error: "Failed to fetch news" });
    }

    const data = await response.json();
    // Add an 'id' to each news item based on title for uniqueness
    const newsWithIds = data.news.map((article, index) => ({
      ...article,
      id: `${index}-${article.title?.slice(0, 10)}`,
    }));

    return res.json(newsWithIds);
  } catch (error) {
    console.error("Error in /api/news:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const port = process.env.PORT || 4040;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
