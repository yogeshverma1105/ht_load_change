const handleFormErrors = (err) => {
  const newErrors = {};

  if (err.inner && Array.isArray(err.inner)) {
    err.inner.forEach((error) => {
      newErrors[error.path] = error.message;
    });
  } else if (err.path && err.message) {
    newErrors[err.path] = err.message;
  } else {
    newErrors.general = "Something went wrong. Please try again.";
  }

  setError(newErrors);
  setIsDisabled(false);