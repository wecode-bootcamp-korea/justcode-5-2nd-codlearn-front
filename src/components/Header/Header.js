import React from 'react';
import styled from 'styled-components';

function Header() {
  return(
    <Wrapper>
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
      <BottomWrapper>
        <BottomLeftWrapper>
          <img alt='codlearn-logo' src='images/logo.png' />
          <span>강의</span>
          <span>로드맵</span>
          <span>멘토링</span>
          <span>커뮤니티</span>
          <span>채용정보</span>
        </BottomLeftWrapper>
        <BottomRightWrapper>
          <Search>
            <input></input>
            <img></img>
          </Search>
          <span>지식공유참여</span>
          <icon></icon>
          <icon></icon>
          <icon></icon>
        </BottomRightWrapper>
      </BottomWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`

`;

const TopWrapper = styled.div`
  display: flex;
  height: 40px;
  padding: 0 32px;
  font-size: 14px;
  border-bottom: 1px solid #f1f3f5;

  img {
    width: 14px;
    height: 14px;
    margin: 0 8px 0 0;
  }
`;

const Education = styled.div`
  display: flex;
  align-items: center;

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
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
`;

const BottomLeftWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 110px;
  }
`;

const Logo = styled.div`

`;

const BottomRightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.div`

`;

export default Header;
