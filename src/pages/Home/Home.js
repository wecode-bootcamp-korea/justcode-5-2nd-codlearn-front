import React from 'react';
import MainSlider from './Slider/MainSlider';
import SearchBar from './SearchBar/SearchBar';
import styled from 'styled-components';

function Home() {
  return (
    <Main>
      <MainSlider />
      <SearchBar />
    </Main>
  );
}

const Main = styled.div`
  height: 100vh;
`;

export default Home;
