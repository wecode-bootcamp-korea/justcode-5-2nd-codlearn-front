import React from 'react';
import styled from 'styled-components';
import logo from '../../../images/logo.png';
function Loading() {
  return (
    <LoadingWrap>
      <LoadingImg>
        <img src={logo} alt="logo" />
      </LoadingImg>
    </LoadingWrap>
  );
}

const LoadingWrap = styled.div`
  width: 400px;
  margin: 0 auto;
`;
const LoadingImg = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

export default Loading;
