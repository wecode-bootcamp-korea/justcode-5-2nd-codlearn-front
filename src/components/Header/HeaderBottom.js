import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faMagnifyingGlass,
  faCartShopping,
  faBell,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
library.add(faMagnifyingGlass, faCartShopping, faBell, faUser);

function HeaderBottom() {
  const [token, setToken] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [scrollToggle, setScrollToggle] = useState(false);
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const openLogInModal = () => {
    navigate('/openLogInModal');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

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

  const writeText = e => {
    setText(e.target.value);
  };

  const resetText = () => {
    setText('');
  };

  const nextToSearch = () => {
    if (text !== '') {
      navigate(`/courses?s=${text}`);
      resetText();
    }
  };

  const searchByEnter = e => {
    if (text !== '' && e.key === 'Enter') {
      nextToSearch();
    }
  };

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <HeaderBottomWrapper
      style={
        scrollToggle ? { position: 'sticky', top: 0 } : { position: 'relative' }
      }
    >
      <BottomWrapper>
        <BottomLeftWrapper>
          <img alt="codlearn-logo" src="images/logo.png" onClick={goToHome} />
          <Courses>
            <span>
              <Link to="courses">강의</Link>
            </span>
            <Categories className="categories">
              <Category1>
                <Link to="courses/it-programming">개발 · 프로그래밍</Link>
                <Dep2Categories className="it-programming">
                  <Category4>
                    <Link to="courses/it-programming/front-end">
                      프론트엔드
                    </Link>
                    <Dep3Categories className="front-end">
                      <li>
                        <Link to="courses/it-programming/front-end?skill=javascript">
                          Javascript
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it-programming/front-end?skill=react">
                          React
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it-programming/front-end?skill=vuejs">
                          Vue.js
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category4>
                  <Category5>
                    <Link to="courses/it-programming/back-end">백엔드</Link>
                    <Dep3Categories className="back-end">
                      <li>
                        <Link to="courses/it-programming/back-end?skill=java">
                          Java
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it-programming/back-end?skill=spring">
                          Spring
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it-programming/back-end?skill=aws">
                          AWS
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category5>
                  <Category6>
                    <Link to="courses/it-programming/game-dev">게임개발</Link>
                    <Dep3Categories className="game-dev">
                      <li>
                        <Link to="courses/it-programming/game-dev?skill=ios">
                          IOS
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it-programming/game-dev/game-design">
                          게임기획
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it-programming/game-dev?skill=block-coding">
                          블록코딩
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category6>
                </Dep2Categories>
              </Category1>
              <Category2>
                <Link to="courses/it">보안 · 네트워크</Link>
                <Dep2Categories className="it">
                  <Category7>
                    <Link to="courses/it/security">보안</Link>
                    <Dep3Categories className="security">
                      <li>
                        <Link to="courses/it/security?skill=imformation-security">
                          정보보안
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it/security?skill=penetration-testing">
                          모의해킹
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it/security?skill=reversing">
                          리버싱
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category7>
                  <Category8>
                    <Link to="courses/it/cloud">클라우드</Link>
                    <Dep3Categories className="cloud">
                      <li>
                        <Link to="courses/it/cloud?skill=cloud">클라우드</Link>
                      </li>
                      <li>
                        <Link to="courses/it/cloud?skill=network">
                          네트워크
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it/cloud?skill=severless">
                          서버리스
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category8>
                  <Category9>
                    <Link to="courses/it/blockchain">블록체인</Link>
                    <Dep3Categories className="blockchain">
                      <li>
                        <Link to="courses/it/blockchain?skill=blockchain">
                          블록체인
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/it/blockchain?skill=nft">NFT</Link>
                      </li>
                      <li>
                        <Link to="courses/it/blockchain?skill=system">
                          시스템
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category9>
                </Dep2Categories>
              </Category2>
              <Category3>
                <Link to="courses/data-science">데이터 사이언스</Link>
                <Dep2Categories className="data-science">
                  <Category10>
                    <Link to="courses/data-science/data-analysis">
                      데이터 분석
                    </Link>
                    <Dep3Categories className="data-analysis">
                      <li>
                        <Link to="courses/data-science/data-analysis?skill=data-analysis">
                          데이터 분석
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/data-science/data-analysis?skill=python">
                          Python
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/data-science/data-analysis?skill=sql">
                          SQL
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category10>
                  <Category11>
                    <Link to="courses/data-science/artificial-intelligence">
                      인공지능
                    </Link>
                    <Dep3Categories className="artificial-intelligence">
                      <li>
                        <Link to="courses/data-science/artificial-intelligence?skill=machine-learning">
                          머신러닝
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/data-science/artificial-intelligence?skill=deep-learning">
                          딥러닝
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/data-science/artificial-intelligence?skill=keras">
                          Keras
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category11>
                  <Category12>
                    <Link to="courses/data-science/data-visualization">
                      데이터 시각화
                    </Link>
                    <Dep3Categories className="data-visualization">
                      <li>
                        <Link to="courses/data-science/data-visualization?skill=data-vis">
                          데이터 시각화
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/data-science/data-visualization?skill=excel">
                          Excel
                        </Link>
                      </li>
                      <li>
                        <Link to="courses/data-science/data-visualization?skill=bigdata">
                          빅데이터
                        </Link>
                      </li>
                    </Dep3Categories>
                  </Category12>
                </Dep2Categories>
              </Category3>
            </Categories>
          </Courses>
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
          <Search style={token ? { padding: 0 } : { padding: '0 24px 0 0' }}>
            <input value={text} onChange={writeText} onKeyUp={searchByEnter} />
            <div style={token ? { right: '10px' } : { right: '32px' }}>
              <FontAwesomeIcon
                onClick={nextToSearch}
                icon="fa-solid fa-magnifying-glass"
              />
            </div>
          </Search>
          <Share>
            <span>지식공유참여</span>
          </Share>
          {token ? (
            <IconWrapper>
              <div>
                <Link to="/carts">
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
                </Link>
              </div>
              <div>
                <Link to="/messages">
                  <FontAwesomeIcon icon="fa-solid fa-bell" />
                </Link>
              </div>
              <div>
                <Link to="/dashboard">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </Link>
              </div>
            </IconWrapper>
          ) : (
            <>
              <LoginButton onClick={openLogInModal}>로그인</LoginButton>
              <SignupButton onClick={goToSignUp}>회원가입</SignupButton>
            </>
          )}
        </BottomRightWrapper>
      </BottomWrapper>
    </HeaderBottomWrapper>
  );
}

const HeaderBottomWrapper = styled.div`
  transition-duration: 1s;
  width: 100%;
  background: white;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
  z-index: 99;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;
  padding: 0 32px;

  img {
    &:hover {
      cursor: pointer;
    }
  }
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

  span {
    &:hover {
      color: #1dc078;
      cursor: pointer;
    }
  }
`;

const Courses = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    :before {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translate(-50%, 0);
      border-color: transparent transparent #e2e3e4;
      border-style: solid;
      border-width: 0 12px 12px;
    }

    :after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translate(-50%, 0);
      border-color: transparent transparent #fff;
      border-style: solid;
      border-width: 0 10px 10px;
    }

    .categories {
      display: block;
    }
  }
`;

const Categories = styled.ul`
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
  width: 180px;
  padding: 8px 0;
  font-size: 14px;
  color: #454545;
  box-shadow: 8px 5px 8px 1px rgb(0 10 18 / 10%), 0 0 0 1px rgb(0 10 18 /10%);
  background: #fff;
  cursor: pointer;

  li {
    display: flex;
    align-items: center;
    width: 100%;
    height: 33px;
    padding: 6px 16px;
    background: #fff;
  }
`;

const Category1 = styled.li`
  &:hover {
    color: black;

    .it-programming {
      display: block;
    }
  }
`;

const Category4 = styled.li`
  &:hover {
    color: black;

    .front-end {
      display: block;
    }
  }
`;

const Category5 = styled.li`
  &:hover {
    color: black;

    .back-end {
      display: block;
    }
  }
`;

const Category6 = styled.li`
  &:hover {
    color: black;

    .game-dev {
      display: block;
    }
  }
`;

const Category2 = styled.li`
  &:hover {
    color: black;

    .it {
      display: block;
    }
  }
`;

const Category7 = styled.li`
  &:hover {
    color: black;

    .security {
      display: block;
    }
  }
`;

const Category8 = styled.li`
  &:hover {
    color: black;

    .cloud {
      display: block;
    }
  }
`;

const Category9 = styled.li`
  &:hover {
    color: black;

    .blockchain {
      display: block;
    }
  }
`;

const Category3 = styled.li`
  &:hover {
    color: black;

    .data-science {
      display: block;
    }
  }
`;

const Category10 = styled.li`
  &:hover {
    color: black;

    .data-analysis {
      display: block;
    }
  }
`;

const Category11 = styled.li`
  &:hover {
    color: black;

    .artificial-intelligence {
      display: block;
    }
  }
`;

const Category12 = styled.li`
  &:hover {
    color: black;

    .data-visualization {
      display: block;
    }
  }
`;

const Dep2Categories = styled(Categories)`
  top: 0;
  left: 180px;
`;

const Dep3Categories = styled(Dep2Categories)`
  top: 0;

  li {
    &:hover {
      color: black;
    }
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

    &:hover {
      border: 1px solid #5f5f5f;
    }
  }

  div {
    position: absolute;
    top: 10px;
    cursor: pointer;
  }
`;

const Share = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0 8px 8px;
  height: 64px;

  &:hover {
    color: #1dc078;
    cursor: pointer;
  }
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

    &:hover {
      color: #1dc078;
      cursor: pointer;
    }
  }
`;

const LoginButton = styled.div`
  margin-left: 16px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 8px;
  background: #fff;
  color: #363636;
  cursor: pointer;
`;

const SignupButton = styled.div`
  margin-left: 8px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding: 8px;
  background: #ff7867;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #ff6d5a;
  }
`;

export default HeaderBottom;
