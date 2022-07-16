import React from 'react';
import styled from 'styled-components';
import MainSlider from './Slider/MainSlider';

function Home() {
  return (
    <Homes>
      <MainSlider />
    </Homes>
  );
}

const Homes = styled.div`
  height: 100vh;
  background: ligthgray;
`;

export default Home;
