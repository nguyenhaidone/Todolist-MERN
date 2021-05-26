import { useState, useContext, React } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../Contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";
import restResponse from "../../common/response";

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  //local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [alert, setAlert] = useState(null);

  // set data
  const { username, password, confirmPassword } = registerForm;

  const onChangleRegisterForm = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const register = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", messages: "password do not match" });
      setTimeout(() => setAlert(null), 5000);
      return
    }

    try {
      const registerData = await registerUser(registerForm);
      if (registerData.success) {
        console.log(registerData);
        // history.push("/dashboard");
      } else {
        // console.log(loginData);
        setAlert({ type: "danger", messages: registerData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
      restResponse(false, error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            required
            value={username}
            onChange={onChangleRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            required
            value={password}
            onChange={onChangleRegisterForm}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangleRegisterForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>Already have account</p>
      <Link to="/login">
        <Button variant="info" size="sm" className="ml-2">
          Login
        </Button>
      </Link>
    </>
  );
};

export default RegisterForm;
