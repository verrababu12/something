import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    navigate("/login");
  };

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

  const validateForm = () => {
    const isUsernameValid = validateField("username", username);
    const isNameValid = validateField("name", name);
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);

    return isUsernameValid && isNameValid && isEmailValid && isPasswordValid;
  };

  const handleBlur = (fieldName, value) => {
    validateField(fieldName, value);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const userDetails = { username, name, email, password };
    const url = "/api/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    if (response.ok) {
      onSubmitSuccess();
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
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
      <label className="input-label" htmlFor="username">
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

  const renderNameField = () => (
    <>
      <label className="input-label" htmlFor="name">
        NAME
      </label>
      <input
        type="text"
        id="name"
        className="input-filed"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => handleBlur("name", name)}
      />
      {errors.name && <p className="error-message">{errors.name}</p>}
    </>
  );

  const renderEmailField = () => (
    <>
      <label className="input-label" htmlFor="email">
        EMAIL
      </label>
      <input
        type="email"
        id="email"
        className="input-filed"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => handleBlur("email", email)}
      />
      {errors.email && <p className="error-message">{errors.email}</p>}
    </>
  );

  return (
    <div className="login-form-container">
      <form className="login-card" onSubmit={submitForm}>
        <h1 className="main-heading">SignUp Form</h1>
        <div className="input-container">{renderUsernameField()}</div>
        <br />
        <div className="input-container">{renderNameField()}</div>
        <br />
        <div className="input-container">{renderEmailField()}</div>
        <br />
        <div className="input-container">{renderPasswordField()}</div>
        <br />
        <button type="submit" className="form-button">
          SIGN UP
        </button>
        <p className="paragraph">Already have an account?</p>
        <Link to="/login">
          <button type="button" className="sign-in-button">
            SIGN IN
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Register;
