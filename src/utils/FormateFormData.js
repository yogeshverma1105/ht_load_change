export const toFormData = (data) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof FileList && value.length > 0) {
      formData.append(key, value[0]);
    } else if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  }
  return formData;
};