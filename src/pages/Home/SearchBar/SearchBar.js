import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

function SearchBar() {
  const [inputStyle, setInputStyle] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleInputFocus = () => {
    setInputStyle(!inputStyle);
  };
  const handleInputBlur = () => {
    setInputStyle(false);
  };

  const handleInputScroll = () => {
    window.scrollTo({
      top: 350,
      behavior: 'smooth',
    });
    setScrollY(0);
  };

  return (
    <Search>
      <Container>
        <Content>
          <Title>배우고,나누고,성장하세요</Title>
          <SearchWrap>
            <input
              type="text"
              placeholder="배우고 싶은 지식을 입력해보세요."
              className={!inputStyle ? 'focusStyle' : 'blurStyle'}
              onFocus={() => {
                handleInputFocus();
                handleInputScroll();
              }}
              onBlur={() => {
                handleInputBlur();
              }}
              onClick={() => {
                handleInputScroll();
              }}
            />
            <button>
              <IconFontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </SearchWrap>
        </Content>
      </Container>
    </Search>
  );
}

const Search = styled.section`
  padding-top: 50px;
  padding-bottom: 25px;
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Content = styled.div``;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: x-large;
  text-align: center;
  color: #363636;
  letter-spacing: 1px;
`;

const SearchWrap = styled.div`
  position: relative;
  width: 580px;
  input {
    width: 100%;
    padding: 15px 25px;
    border-radius: 30px;
    outline: none;
    transition: all 0.2s ease;
  }
  .focusStyle {
    background-color: rgba(29, 192, 120, 0.12);
    border: 1px solid rgba(29, 192, 120, 0.24);
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
    ::placeholder {
      color: rgba(29, 192, 120, 0.9);
    }
  }
  .blurStyle {
    background-color: white;
    border: 1px solid #dbdbdb;
    color: #363636;
    box-shadow: 0 4px 8px rgb(0 10 18 / 20%);
    ::placeholder {
      color: rgb(0 0 0 / 30%);
    }
  }
  button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
  }
`;

const IconFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default SearchBar;
