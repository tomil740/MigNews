/*
 getNews remote function will mange the api request to get our news data from the news api
 *The notes code is to migrate that function work directly against the API , currently working with custome server backEnd that deals with those  * 
*/

export async function getNews() {
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

    console.log("called!!1")
    const data = await response.json();
    console.log("working!!",data)

    // Check if the response includes expected data
    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response format.");
    }

    console.log("Fetched news:", data);

    return data;
  } catch (error) {
    throw("Error fetching data:", error);
    return [];
  }
}
