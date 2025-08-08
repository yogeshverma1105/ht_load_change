export const submitFormData = async (formData, url) => {
  const requestOptions = {
    method: 'POST',
    body: formData,
    redirect: 'follow',
  };
console.log(requestOptions,"requestOptions")
  const response = await fetch(`${url}`, requestOptions);
  console.log(response,"response")

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
};

export const updateFormData = async (formData, url) => {
  const requestOptions = {
    method: 'PATCH',
    body: formData,
    credentials: 'omit',
  };

  const response = await fetch(`${url}`, requestOptions);
console.log(response,"response")
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
};
export const submitFormDataUsingQuery = async (formData, url) => {
  const response = await fetch(
    `${url}application_no=${formData.employee_id}&password=${formData.password}`,
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
export const getHtApplicationByApplicationNo = async (url) => {
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
export const getDataForPostApi = async (formData, url) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(formData),
    redirect: 'follow',
     headers: {
      'Content-Type': 'application/json',
    },
  };
console.log(requestOptions,"requestOptions")
  const response = await fetch(`${url}`, requestOptions);
  console.log(response,"response")

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
};
