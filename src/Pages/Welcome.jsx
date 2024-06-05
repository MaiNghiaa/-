import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "./../assets/Animation.json";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  width: 80vw;
  height: 80vh;
  margin: auto;
  position: relative;
`;

const StyledButton = styled.button`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background-color: transparent;
  border: 2px solid #cccccc;
  border-radius: 5px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff7f50;
    border-color: #ff7f50;
    color: #ffffff;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 500;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

const Welcome = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      animationData: animationData,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div>
      <Container ref={containerRef} />
      <StyledButton>
        <StyledLink to="/Login">Đăng nhập</StyledLink>
      </StyledButton>
    </div>
  );
};

export default Welcome;
