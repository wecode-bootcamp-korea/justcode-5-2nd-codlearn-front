import React from 'react';
import styled from 'styled-components';

function HeaderTop() {
  return (
    <HeaderTopWrapper>
      <TopWrapper>
        <Education>          
          <img alt='codlearn-icon' src='images/icon.png' />
          <span>교육</span>          
        </Education>
        <Employment>          
          <img alt='codlearn-icon' src='images/icon.png' />
          <span>채용</span>          
        </Employment>
      </TopWrapper>
    </HeaderTopWrapper>
  );
}

const HeaderTopWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #f1f3f5;
`;

const TopWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  height: 40px;
  margin: 0 auto;
  padding: 0 32px;
  font-size: 14px;

  img {
    width: 14px;
    height: 14px;
    margin: 0 8px 0 0;
  }
`;

const Education = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:after {
    content: '';
    width: 1px;
    height: 12px;
    margin: 0 8px;
    background: #d5dbe2;
  }
`;

const Employment = styled.div`
  display: flex;
  align-items: center;
  color: #858a8d;
  cursor: pointer;

  img {
    -webkit-filter: opacity(0.5) drop-shadow(0 0 0 #858a8d);
    filter: opacity(0.5) drop-shadow(0 0 0 #858a8d);
  }
`;

export default HeaderTop;
