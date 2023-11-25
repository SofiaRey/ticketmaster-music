const API_BASE_URL = "https://app.ticketmaster.com/discovery/v2/";
const API_KEY = "vEoopYJqXTlA6EAIMkiAjmqjnjGAkRHb";

// Get all items from Ticketmaster API
export const fetchItemsFromAPI = async () => {
  const response = await fetch(
    `${API_BASE_URL}attractions.json?segmentId=KZFzniwnSyZfZ7v7nJ&apikey=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data._embedded.attractions;
};

// Get events by attraction ID, used in ItemDetail to show upcoming events
export const fetchEventsByAttractionId = async (attractionId) => {
  try {
    const url = `${API_BASE_URL}events.json?apikey=${API_KEY}&attractionId=${attractionId}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data._embedded.events;
  } catch (error) {
    console.error("Error fetching events by attraction ID:", error);
    return [];
  }
};

// Get item detail by attraction ID
export const fetchItemDetail = async (attractionId) => {
  const url = `${API_BASE_URL}attractions/${attractionId}.json?apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

// Get items by category ID, used in ItemDetail to show similar attractions
export const fetchSimilarAttractions = async (categoryId) => {
  try {
    const url = `${API_BASE_URL}attractions.json?apikey=${API_KEY}&classificationId=${categoryId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data._embedded.attractions.slice(0, 3); // Devuelve hasta 3 atracciones
  } catch (error) {
    return [];
  }
};

// Get items by country code
export const fetchAttractionsByCountry = async (countryCode) => {
  try {
    const url = `${API_BASE_URL}attractions.json?apikey=${API_KEY}&countryCode=${countryCode}`;
    const response = await fetch(url);
    const data = await response.json();
    return data._embedded.attractions;
  } catch (error) {
    console.error("Error fetching attractions by country:", error);
    return [];
  }
};

// Get popular attractions, ordered by relevance
export const fetchPopularAttractions = async () => {
  const url = `${API_BASE_URL}attractions.json?apikey=${API_KEY}&segmentId=KZFzniwnSyZfZ7v7nJ&size=10&sort=relevance,desc`;
  const response = await fetch(url);
  const data = await response.json();
  return data._embedded.attractions;
};
