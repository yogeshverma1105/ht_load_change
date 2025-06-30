export const extractFormValues = (formData) => {
  const data = {};
  formData.forEach((value, key) => {
    if (!(value instanceof File)) {
      data[key] = value.toString();
    }
  });
  return data;
};