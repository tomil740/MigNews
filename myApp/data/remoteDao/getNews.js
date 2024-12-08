export default async function getNews() {
  const url = "http://localhost:4040/api/news"; // Assuming your server is running locally

  console.log("Fetching fresh data from our server...");

  try {
    const response = await fetch(url, {
      method: "GET",
      // Optionally, add headers if required, such as authentication
      // headers: {
      //   'Authorization': `Bearer ${apiKey}`,
      // },
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error details:", errorDetails);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Check if the response includes expected data
    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response format.");
    }

    console.log("Fetched news:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

/*
export default async function getNews(){
  const url = "https://api.worldnewsapi.com/search-news";
  const apiKey = ; 

    console.log("Fetching fresh data from API...");
    const params = {
      text: "earth quake", // Specify the topic
      language: "en", // Specify language
      "earliest-publish-date": "2024-11-10", // Specify publish date range
      number: 10, // Limit results
    };

    // Build query string
    const urlParams = new URLSearchParams(params).toString();

    try {
    console.log('Request URL:', `${url}?${urlParams}`);
    console.log('API Key:', apiKey);

    const response = await fetch//(`${url}?${urlParams}`, {
    ("https://673b0d30339a4ce4451a586f.mockapi.io/MyShop/newsData",{
      method: 'GET',
      //headers: {
        //'x-api-key': apiKey,
      //},
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data1 = await response.json();
    const data = data1[0]

    // Check if the response includes expected data
    if (!data.news || !Array.isArray(data.news)) {
      throw new Error('Unexpected API response format.');
    }

    const newsWithIds = data.news.map((article, index) => ({
      ...article,
      id: `${index}-${article.title?.slice(0, 10)}`, // Generate unique IDs
    }));

    console.log(newsWithIds)

    return newsWithIds;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
  */
