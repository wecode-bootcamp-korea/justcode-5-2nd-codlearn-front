import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

function MyPage(props) {
  const location = useLocation();
  return (
    <MyPageWrap>
      <Section>
        <Title>
          {location.pathname === '/dashboard' && <h4>대시보드</h4>}
          {location.pathname === '/likes' && <h4>좋아요</h4>}
          {location.pathname === '/my_courses' && <h4>내 학습</h4>}
          {location.pathname === '/carts' && <h4>수강 바구니</h4>}
        </Title>
        <Container>
          <Main>
            <SlideBar>
              <NavContainer>
                <NavLabel>수강신청 관리</NavLabel>
                <NavList>
                  <li>
                    <Link to="/dashboard">
                      {location.pathname === '/dashboard' ? (
                        <span className="select">대시보드</span>
                      ) : (
                        <span>대시보드</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/carts">
                      {location.pathname === '/carts' ? (
                        <span className="select">수강 바구니</span>
                      ) : (
                        <span>수강 바구니</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/likes">
                      {location.pathname === '/likes' ? (
                        <span className="select">좋아요</span>
                      ) : (
                        <span>좋아요</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/my_courses">
                      {location.pathname === '/my_courses' ? (
                        <span className="select">내 학습</span>
                      ) : (
                        <span>내 학습</span>
                      )}
                    </Link>
                  </li>
                </NavList>
              </NavContainer>
            </SlideBar>
            <MainBoard>
              <ContentWrap>{props.children}</ContentWrap>
            </MainBoard>
          </Main>
        </Container>
      </Section>
    </MyPageWrap>
  );
}

const MyPageWrap = styled.main`
  background-color: #f7f7f7;
`;
const Section = styled.section``;

const Title = styled.div`
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-weight: 700;
  font-size: large;
  background-color: #333b3d;
  h4 {
    margin: 0 auto;
    max-width: 1180px;
    color: white;
  }
`;
const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  background: transparent;
  background-color: #f7f7f7;
`;
const Main = styled.div`
  display: flex;
`;

const SlideBar = styled.aside`
  min-width: 175px;
`;
const NavContainer = styled.div`
  min-height: 100vh;
`;
const NavLabel = styled.p`
  padding: 20px 15px 10px 15px;
  font-size: small;
  color: #cfcfcf;
`;
const NavList = styled.ul`
  li {
    a {
      display: block;
      padding: 15px;
      width: 100%;
      height: 100%;
      color: #454545;
      text-indent: 10px;
    }
    &:hover {
      background-color: white;
    }
    .select {
      font-weight: 700;
      color: #00c471;
    }
  }
`;
const MainBoard = styled.div`
  padding: 15px;
`;
const ContentWrap = styled.div`
  width: 1000px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: inherit;
`;

export default MyPage;
