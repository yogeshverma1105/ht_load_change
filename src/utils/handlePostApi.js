 export const submitFormData = async (formData,url) => {
  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow"
  };

  const response = await fetch(`${url}`, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
};
