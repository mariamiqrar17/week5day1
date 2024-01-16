import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { loginUser } from "../Services/api";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // New state for handling errors
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { duration: 1 }});

    tl.from(".col-10", { opacity: 0, y: -50 })
      .from(".form-label", { opacity: 0, y: -20, stagger: 0.2 }, "-=0.5")
      .from(".form-control", { opacity: 0, y: -20, stagger: 0.2 }, "-=0.5")
      .from("button", { opacity: 0, scale: 0.5 }, "-=0.5");

    if (user && token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setError(null);

    // Validation checks
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await loginUser({ email, password });
      dispatch(setUser(response.email));
      dispatch(setToken(response.token));
      dispatch(setPicture(response.picture));
      dispatch(setUserId(response._id));
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("Email not registered. Please check your email and try again.");
      } else {
        setError("Error logging in. Please try again later.");
      }
    }
  };

  return (
    <Wrapper className="d-flex align-items-center justify-content-center mt-5">
      <GlassMorphism className="col-10 col-md-8 col-lg-6 p-3 text-center" style={{ opacity: 0.9 }}>
        <h1 className="display-6 text-2xl font-bold">Log In</h1>

        <form className="py-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEmail3" className="form-label text-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control mx-auto"
              id="inputEmail3"
              style={{ width: '80%' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword3" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              className="form-control mx-auto"
              id="inputPassword3"
              style={{ width: '80%' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-800">
            Sign in
          </button>

          {error && (
            <div className="alert alert-danger mt-3" role="alert">
              {error}
            </div>
          )}

          <p className="text-sm mt-2 mb-0 text-light">
            Don't have an account?{' '}
            <strong className="text-decoration-underline" onClick={() => navigate('/register')}>
              Register Yourself Here
            </strong>
          </p>
        </form>
      </GlassMorphism>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div``;

const GlassMorphism = styled.div`
  background: rgba(34, 193, 195, 0.8);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
`;