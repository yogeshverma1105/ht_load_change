  export const fetchDataAll = async (url) => {
  const response = await fetch(
    `${url}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response; 
};