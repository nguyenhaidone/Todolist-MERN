import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import restResponse from "../../common/response";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  // set data
  const { username, password } = loginForm;

  const onChangleLoginForm = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        // console.log(loginData);
        setAlert({ type: "danger", messages: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
      restResponse(false, error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            required
            onChange={onChangleLoginForm}
            value={username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            onChange={onChangleLoginForm}
            value={password}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>Don't have account</p>
      <Link to="/register">
        <Button variant="info" size="sm" className="ml-2">
          Register
        </Button>
      </Link>
    </>
  );
};

export default LoginForm;
