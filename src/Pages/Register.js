import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "../components/User/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { registerUser } from "../Services/api";
import gsap from "gsap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
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

    try {
      const response = await registerUser({ first_name: firstname, last_name: lastname, email, password, pictureUrl });
      dispatch(setUser(response.email));
      dispatch(setToken(response.token));
      dispatch(setPicture(response.picture));
      dispatch(setUserId(response._id));
      navigate("/");
    } catch (error) {
      console.log("Error registering:", error);
    }
  };

  return (
    <Wrapper className="d-flex align-items-center justify-content-center mt-5">
      <GlassMorphism className="col-10 col-md-8 col-lg-6 p-3 text-center" style={{ opacity: 0.9 }}>
        <h1 className="display-6 text-4xl font-bold text-normal">Register</h1>

        <form className="py-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputFirstname" className="form-label text-light">
              Firstname
            </label>
            <input type="text" className="form-control mx-auto" value={firstname} onChange={(e) => setFirstname(e.target.value)} id="inputFirstname" />
          </div>
          <div className="mb-3">
            <label htmlFor="inputLastname" className="form-label text-light">
              Lastname
            </label>
            <input
              type="text"
              className="form-control mx-auto"
              id="inputLastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail3" className="form-label text-light">
              Email
            </label>
            <input
              type="email"
              className="form-control mx-auto"
              id="inputEmail3"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {pictureUrl && <Avatar url={pictureUrl} />}
          <div className="mb-3">
            <label htmlFor="inputPictureUrl" className="form-label text-light">
              Picture Url
            </label>
            <input type="text" className="form-control mx-auto" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} id="inputPictureUrl" />
          </div>
          <button type="submit" className="bg-blue-900">
            Sign Up
          </button>
          <p className="text-sm mt-2 mb-0 text-light">
            Already have an account?{' '}
            <strong className="text-decoration-underline" onClick={() => navigate('/login')}>
              Sign in
            </strong>
          </p>
        </form>
      </GlassMorphism>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div``;

const GlassMorphism = styled.div`
  background: rgba(34, 193, 195, 0.8);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
`;