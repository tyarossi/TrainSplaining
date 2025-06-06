// THIS PAGE WILL BE THE FIRST PAGE USERS SEE
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../utilities/decodeJwt";

const PRIMARY_COLOR = "#D6D6D6"; //TEXT
const SECONDARY_COLOR = '#404040'; //BACKGROUND
const BUTTON_COLOR = '#80276C';
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/login`;

const Login = () => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [light, setLight] = useState(false);
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const [bgText, setBgText] = useState(PRIMARY_COLOR);
  const navigate = useNavigate();

  let labelStyling = {
    color: PRIMARY_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  let backgroundStyling = { background: bgColor };
  let buttonStyling = {
    background: BUTTON_COLOR,
    borderStyle: "none",
    color: '#FFFFFF',
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {

    const obj = getUserInfo(user)
    setUser(obj)
    setBgColor(SECONDARY_COLOR);
    setBgText(PRIMARY_COLOR);
    //  if (light) {
    //    setBgColor("#202020");
    //    setBgText('Dark mode')
    //  } else {
    //    setBgColor(SECONDARY_COLOR);
    //    setBgText('Light mode')
    //  }
  }, [light]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate("/mbtaSchedule");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  if(user) {
    navigate('/mbtaSchedule')
    return
  }

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom vh-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100 "
            style={backgroundStyling}>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyling}>Username</Form.Label>
                  <Form.Control
                    type="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                  <Form.Text className="text-muted">
                    We just might sell your data
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={labelStyling}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Text className="text-muted pt-1">
                    Dont have an account?
                    <span>
                      <Link to="/signup" style={labelStyling}> Sign up
                      </Link>
                    </span>
                  </Form.Text>
                </Form.Group>
                {/* <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={() => { setLight(!light) }}
                  />
                  <label class="form-check-label" for="flexSwitchCheckDefault" className='text-muted'>
                    {bgText}
                  </label>
                </div>
                {error && <div style={labelStyling} className='pt-3'>{error}</div>} */}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={buttonStyling}
                  className='mt-2'
                >
                  Log In
                </Button>
                {/* <Button // THIS BUTTON WILL GO TO SCHEDULE PAGE
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={buttonStyling}
                  className='mt-2'
                >
                  Log In as Guest
                </Button> */}
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
