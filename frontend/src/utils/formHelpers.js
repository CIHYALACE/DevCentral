// Form validation helpers
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  // At least 8 characters, one uppercase, one lowercase, one number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return re.test(String(password));
};

const validatePhone = (phone) => {
  // Egyptian phone number format (starts with 01)
  const re = /^01\d{9}$/;
  return re.test(String(phone));
};

const validateRequired = (value) => {
  return value !== undefined && value !== null && value.trim() !== '';
};

const validateMinLength = (value, minLength) => {
  return value.length >= minLength;
};

const validateMaxLength = (value, maxLength) => {
  return value.length <= maxLength;
};

// Form error message generators
const getEmailError = (email) => {
  if (!validateRequired(email)) return 'Email is required';
  if (!validateEmail(email)) return 'Please enter a valid email address';
  return '';
};

const getPasswordError = (password) => {
  if (!validateRequired(password)) return 'Password is required';
  if (!validatePassword(password)) 
    return 'Password must be at least 8 characters with at least one uppercase letter, one lowercase letter, and one number';
  return '';
};

const getPhoneError = (phone) => {
  if (phone && !validatePhone(phone)) 
    return 'Phone number must be 11 digits and start with 01';
  return '';
};

const getRequiredError = (value, fieldName) => {
  if (!validateRequired(value)) return `${fieldName} is required`;
  return '';
};

const getMinLengthError = (value, minLength, fieldName) => {
  if (!validateMinLength(value, minLength)) 
    return `${fieldName} must be at least ${minLength} characters`;
  return '';
};

const getMaxLengthError = (value, maxLength, fieldName) => {
  if (!validateMaxLength(value, maxLength)) 
    return `${fieldName} must be no more than ${maxLength} characters`;
  return '';
};

// Form data helpers
const getFormData = (form) => {
  const formData = new FormData(form);
  const data = {};
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
};

const getFormDataAsJson = (form) => {
  return JSON.stringify(getFormData(form));
};

// Form submission helpers
const handleFormSubmit = (event, callback) => {
  event.preventDefault();
  const data = getFormData(event.target);
  callback(data);
};

export {
  validateEmail,
  validatePassword,
  validatePhone,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  getEmailError,
  getPasswordError,
  getPhoneError,
  getRequiredError,
  getMinLengthError,
  getMaxLengthError,
  getFormData,
  getFormDataAsJson,
  handleFormSubmit
};
