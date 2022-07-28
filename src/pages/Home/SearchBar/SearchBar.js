import React, { useEffect, useRef, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Loading from './Loading';

import { createSearchParams } from 'react-router-dom';
import BASE_URL from '../../../config';

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
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState([]);
  const [showList, setShowList] = useState(false);
  const navigate = useNavigate();
  const inputEffect = useRef();
  const listRef = useRef();
  const outsideRef = useRef(null);
  const [query, setQuery] = useSearchParams();

  let searchQuery = new URLSearchParams(useLocation().search);
  let courses = searchQuery.get('courses');

  const goToCoure = () => {
    //setQuery(`/${courses}?s=${inputText}`);

    navigate({
      pathname: '/courses',
      search: `?${createSearchParams({
        s: inputText,
      })}`,
    });
  };

  const inputChange = e => {
    setInputText(e.target.value);
    if (inputText?.length === 0) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  };
  const inputEnter = e => {
    if (e.key === 'Enter') {
      goToCoure();
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (outsideRef.current && !outsideRef.current.contains(e.target)) {
        setShowList(false);
      }
    }
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [outsideRef]);

  const searchApi = async () => {
    setLoading(true);
    let timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    try {
      const response = await fetch(`${BASE_URL}?s=${inputText}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
      });
      const result = await response.json();
      setSearch(result.searchData);

      return () => {
        clearTimeout(timer);
      };
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    searchApi();
    if (inputText.length === 0) {
      setShowList(false);
      inputEffect.current.style = `border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      border-bottom : 1px solid #dbdbdb;`;
    } else {
      setShowList(true);
      inputEffect.current.style = `border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: 1px solid #fff;`;
    }
  }, [inputText]);

  return (
    <Search>
      <Container>
        <Content>
          <Title>배우고,나누고,성장하세요</Title>
          <SearchWrap ref={outsideRef}>
            <input
              ref={inputEffect}
              type="text"
              placeholder="배우고 싶은 지식을 입력해보세요."
              className={!inputStyle ? 'focusStyle' : 'blurStyle'}
              value={inputText}
              onChange={inputChange}
              onKeyPress={inputEnter}
              onFocus={() => {
                handleInputFocus();
                handleInputScroll();
                if (inputText) {
                  setShowList(true);
                  inputEffect.current.style = `border-bottom-left-radius: 0;
                  border-bottom-right-radius: 0;
                  border-bottom: 1px solid #fff;`;
                } else {
                  setShowList(false);
                }
              }}
              onBlur={() => {
                handleInputBlur();
                inputEffect.current.style = `border-bottom-left-radius: 30px;
                border-bottom-right-radius: 30px;
                border-bottom : 1px solid #dbdbdb;`;
              }}
              onClick={() => {
                handleInputScroll();
              }}
            />
            <button>
              <IconFontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={goToCoure}
              />
            </button>
            <SearchListWrap
              style={{ display: showList ? 'block' : 'none' }}
              ref={outsideRef}
            >
              <SearchListContainer>
                <ListHeader>강의</ListHeader>
                {loading ? (
                  <Loading />
                ) : (
                  <SearchList>
                    {search?.map(data => (
                      <Link
                        to={`/course/${data.id}`}
                        key={data.id}
                        ref={listRef}
                      >
                        <CourseImg>
                          <img src={data.img} alt={data.class_name} />
                        </CourseImg>
                        <CourseInfo>
                          <p className="class">
                            {data.class_name
                              .toLowerCase()
                              .includes(inputText.toLowerCase()) ? (
                              <>
                                {
                                  data.class_name
                                    .toLowerCase()
                                    .split(inputText.toLowerCase())[0]
                                }
                                <Highlight>{inputText}</Highlight>
                                {
                                  data.class_name
                                    .toLowerCase()
                                    .split(inputText.toLowerCase())[1]
                                }
                              </>
                            ) : (
                              data.class_name
                            )}
                          </p>
                          <p className="instructor">{data.instructor_name}</p>
                        </CourseInfo>
                      </Link>
                    ))}
                  </SearchList>
                )}
              </SearchListContainer>
            </SearchListWrap>
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
      color: rgb(0 0 0 / 20%);
    }
  }
  button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);
    background: none;
    border: none;
    color: #363636;
  }
`;

const SearchListWrap = styled.div`
  position: absolute;
  width: 100%;
  padding-bottom: 15px;
  z-index: 20;
  background-color: white;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border: 1px solid #dedede;
  border-top: 1px solid white;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
`;
const SearchListContainer = styled.div``;
const ListHeader = styled.h4`
  padding: 16px 20px 8px;
  margin-bottom: 0;
  font-size: 12px;
  font-weight: 600;
  color: #929292;
`;
const SearchList = styled.div`
  a {
    display: flex;
    padding: 8px 20px;
    &:hover {
      background-color: #f1f3f5;
    }
  }
`;
const CourseImg = styled.div`
  width: 52px;
  height: 34px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const CourseInfo = styled.div`
  display: inline-block;
  padding-left: 8px;
  .class {
    width: 480px;
    box-sizing: border-box;
    line-height: 20px;
    font-weight: 700;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .instructor {
    font-size: 12px;
    line-height: 1;
    color: #757575;
  }
`;

const Highlight = styled.span`
  color: #1dc078;
`;

const IconFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export default SearchBar;
