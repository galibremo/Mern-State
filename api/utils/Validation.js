export default function Validation(values) {
  const error = {};

  const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if(!values.username){
    error.username = "Name is Required";
  }else if(!/^[a-zA-Z]{6,}$/.test()){
    error.username = "user Name length must be more than 6";
  }else{
    error.username = '';
  }

  if (!values.email) {
    error.email = "Email is Required";
  } else if (!email_pattern.test(values.email)) {
    errors.email = "Invalid email address";
  }else{
    error.email = '';
  }

  if (!values.password) {
    error.password = "Password is Required";
  }
  else if (!/(?=.*[a-z])/.test(values.password)) {
    error.password = "At least one lower case letter needed";
  }
  else if (!/(?=.*[A-Z])/.test(values.password)) {
    error.password = "At least one upper case letter needed";
  }
  else if (!/(?=.*\d)/.test(values.password)) {
    error.password = "At least one digit needed";
  }
  else if (!/[a-zA-Z0-9]{8,}/.test(values.password)) {
    error.password = "length must be atleast 8";
  }else{
    error.password = '';
  }

  return error;
}
