export const handleGetApi = async (url,consumerId) => {
  try {
    const response = await fetch(`${url}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching  Data:", error);
    return null;
  }
};