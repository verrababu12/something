import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    navigate("/home");
  };

  // Validate individual fields
  const validateField = (fieldName, value) => {
    let errorMsg = "";
    if (!value) {
      errorMsg = "*required";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMsg,
    }));
    return errorMsg === "";
  };

  // Form validation
  const validateForm = () => {
    const isUsernameValid = validateField("username", username);
    const isPasswordValid = validateField("password", password);
    return isUsernameValid && isPasswordValid;
  };

  // Handle input blur (when user leaves the field)
  const handleBlur = (fieldName, value) => {
    validateField(fieldName, value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return;
    }

    const userDetails = { username, password };
    const url = "/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      onSubmitSuccess();
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label-2" htmlFor="password">
        PASSWORD
      </label>
      <input
        type="password"
        id="password"
        className="input-filed"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => handleBlur("password", password)}
      />
      {errors.password && <p className="error-message">{errors.password}</p>}
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label-2" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="input-filed"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => handleBlur("username", username)}
      />
      {errors.username && <p className="error-message">{errors.username}</p>}
    </>
  );

  return (
    <div className="login-form-container-2">
      <form className="login-card-2" onSubmit={submitForm}>
        <h1 className="main-heading-2">Login Form</h1>
        <div className="input-container-2">{renderUsernameField()}</div>
        <br />
        <div className="input-container-2">{renderPasswordField()}</div>
        <button type="submit" className="button">
          Login
        </button>
        <p>Dont have an account?</p>
        <Link to="/">
          <button type="button" className="sign-up-button-2">
            SIGN UP
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
