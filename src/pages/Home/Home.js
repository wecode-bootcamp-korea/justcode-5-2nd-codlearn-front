import React from 'react';
import MainSlider from './Slider/MainSlider';
import SearchBar from './SearchBar/SearchBar';
import SubSlider from './Slider/SubSlider';
import styled from 'styled-components';

function Home() {
  return (
    <Main>
      <MainSlider />
      <SearchBar />
      <SubSlider />
    </Main>
  );
}

const Main = styled.div``;

export default Home;
