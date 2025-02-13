import React from 'react';
import styled, { keyframes } from 'styled-components';

// Overall Page Container (no width restriction)
const Container = styled.div`
  font-family: Arial, sans-serif;
  width: 100%;
  margin: 0;
  padding: 0;
`;

/* --- Full-width Video Section --- */
const VideoContainer = styled.div`
  width: 100vw;
  height: 60vh; /* Adjust this value as needed */
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* --- Animation for the Cards --- */
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* --- Full-width Cards Section --- */
const Features = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw); /* Break out to full viewport width */
  padding: 50px 20px;
  background: #f8f9fa;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

const FeatureCard = styled.div`
  flex: 1 1 300px;
  padding: 30px 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeInUp} 0.5s ease-in-out forwards;
  opacity: 0;
  animation-delay: ${props => props.delay || '0s'};
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 50%;
    height: 3px;
    background: linear-gradient(to right, #ff00a8, #00d2ff);
    border-radius: 2px;
  }
`;

const CardContent = styled.p`
  color: #666;
  line-height: 1.6;
`;

/* --- Full-width Footer --- */
const Footer = styled.footer`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  padding: 20px;
  text-align: center;
  background: #222;
  font-size: 0.9rem;
  color: #fff;
`;

const LandingPage = () => {
  // Cards content with project-specific details
  const features = [
    { title: 'Academic Materials', content: 'Access comprehensive study materials for your subjects.' },
    { title: 'Take Quizzes', content: 'Test your knowledge with interactive quizzes.' },
    { title: 'Learn Subjects', content: 'Engage in courses designed to enhance your learning.' },
  ];

  return (
    <Container>
      {/* Full-width Video Section */}
      <VideoContainer>
        <Video autoPlay muted loop>
          <source src="https://www.swarnandhra.ac.in/img/data/video.mp4" type="video/mp4" />
        </Video>
      </VideoContainer>

      {/* Full-width Cards Section */}
      <Features>
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} delay={`${index * 0.2}s`}>
            <CardTitle>{feature.title}</CardTitle>
            <CardContent>{feature.content}</CardContent>
          </FeatureCard>
        ))}
      </Features>

      {/* Full-width Footer */}
      <Footer>
        © 2025 Your Company. All rights reserved.
      </Footer>
    </Container>
  );
};

export default LandingPage;
