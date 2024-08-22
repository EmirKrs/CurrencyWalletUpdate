export const validateEmail = (emailText) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(emailText);
  };

  export  const validatePhone = (phoneText) => {
    const regex = /^05\d{2}\d{3}\d{4}$/;
    return regex.test(phoneText);
  };

  export  const validatePassword = (passwordText) => {
    // En az 6 karakter, büyük harf, küçük harf, rakam içermeli
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(passwordText);
  };

  export  const validatePasswordCon = (passwordText, passwordConText) => {
    return passwordText === passwordConText;
  };