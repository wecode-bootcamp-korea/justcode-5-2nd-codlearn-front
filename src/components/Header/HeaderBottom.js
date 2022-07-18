import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faCartShopping, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass,faCartShopping, faBell, faUser);

function HeaderBottom() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollToggle, setScrollToggle] = useState(false);
  useEffect(() => {
    (() => {
      window.addEventListener('scroll', () => setScrollY(window.pageYOffset));
      if (scrollY > 104) {
        setScrollToggle(true);
      } else if (scrollY < 104) {
        setScrollToggle(false);
      }
    })();
    return () => {
      window.removeEventListener('scroll', () =>
        setScrollY(window.pageYOffset)
      );
    };
  });

  return (
    <HeaderBottomWrapper style={ scrollToggle ? { position: 'sticky', top: 0 } : { position: 'static' }}>
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
    </HeaderBottomWrapper>
  );
}

const HeaderBottomWrapper = styled.div`
  transition-duration: 1s;
  width: 100%;
  background: white;
  border-bottom: 1px solid pink;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;
  padding: 0 32px;
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
    padding: 8px 16px;
    height: 64px;
  }
`;

const BottomRightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Search = styled.div`
  position: relative;
  
  input {
    width: 148px;
    height: 36px;
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
  height: 64px;
`;

const IconWrapper = styled.div`
  display: flex;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 10px;
    width: 44px;
    height: 64px;
  }
`;

export default HeaderBottom;
