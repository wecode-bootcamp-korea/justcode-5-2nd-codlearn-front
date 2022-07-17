import React from 'react';
import MainSlider from './Slider/MainSlider';
import styled from 'styled-components';

function Home() {
  return (
    <Main>
      <MainSlider />
    </Main>
  );
}

const Main = styled.div`
  height: 100vh;
`;
export default Home;
