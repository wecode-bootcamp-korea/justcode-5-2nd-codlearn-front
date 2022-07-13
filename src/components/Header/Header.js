import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faCartShopping, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass,faCartShopping, faBell, faUser);

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
          <div>
            <span>강의</span>
          </div>
          <div>
            <span>로드맵</span>
          </div>
          <div>
            <span>멘토링</span>
          </div>
          <div>
            <span>커뮤니티</span>
          </div>
          <div>
            <span>채용정보</span>
          </div>
        </BottomLeftWrapper>
        <BottomRightWrapper>
          <Search>
            <input>
            </input>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </div>
          </Search>
          <Share>
            <span>지식공유참여</span>
          </Share>
          <IconWrapper>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </div>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-bell" />
            </div>
            <div>
              <FontAwesomeIcon icon="fa-solid fa-user" />
            </div>
          </IconWrapper>
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
  padding: 0 32px;
  height: 64px;
`;

const BottomLeftWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 110px;
    height: 100%;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    width: 60px;
    height: 52px;
  }
`;

const BottomRightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.div`
  position: relative;
  
  input {
    width: 128px;
    height: 24px;
    padding: 5px 9px;
    border: 1px solid transparent;
    border-radius: 3px;
    background: #f6f6f6;

    &:hover{
      border: 1px solid #5f5f5f;
    }  
  }  

  div {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const Share = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 8px 8px;
  width: 84px;
  height: 48px;
`;

const IconWrapper = styled.div`
  display: flex;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    width: 24px;
    height: 48px;
  }
`;

export default Header;
