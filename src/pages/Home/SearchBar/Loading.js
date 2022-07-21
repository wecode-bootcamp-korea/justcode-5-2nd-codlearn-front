import React from 'react';
import styled from 'styled-components';

function Loading() {
  return (
    <LoadingWrap>
      <LoadingImg>
        <img src="images/logo.png" alt="logo" />
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
