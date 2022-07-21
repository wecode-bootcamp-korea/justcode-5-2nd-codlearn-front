import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function DashBoard() {
  return (
    <DashBoardWrap>
      <Section>
        <Title>
          <h4>대시보드</h4>
        </Title>
        <Container>
          <Main>
            <SlideBar>
              <NavContainer>
                <NavLabel>수강신청 관리</NavLabel>
                <NavList>
                  <li>
                    <Link to>대시보드</Link>
                  </li>
                  <li>
                    <Link to>수강바구니</Link>
                  </li>
                  <li>
                    <Link to>좋아요</Link>
                  </li>
                </NavList>
              </NavContainer>
            </SlideBar>
            <MainBoard>
              <BoardWrap>
                <Column className="profile">
                  <ColumnFrame>
                    <ColumnTitle>
                      <span>😄 </span>
                      <span>(회원아이디)님 프로필</span>
                    </ColumnTitle>
                    <Content>
                      <div className="text">
                        <div className="logoIcon">
                          <img src="images/icon.png" alt="icon" />
                        </div>
                        <p> (회원아이디)님, 남은 하루도 화이팅! 👋🏻</p>
                      </div>
                    </Content>
                  </ColumnFrame>
                </Column>
                <Column className="class">
                  <ColumnFrame>
                    <ColumnTitle>
                      <span>📖 </span>
                      <span>최근 학습 강의</span>
                    </ColumnTitle>
                    <Content>
                      <div className="text">
                        <p> (회원아이디)님, 남은 하루도 화이팅! 👋🏻</p>
                      </div>
                    </Content>
                  </ColumnFrame>
                </Column>
                <Column className="cart">
                  <ColumnFrame>
                    <ColumnTitle>
                      <span>🛒 </span>
                      <span>수강 바구니</span>
                    </ColumnTitle>
                    <Content>
                      <div className="text">
                        <p> (회원아이디)님, 남은 하루도 화이팅! 👋🏻</p>
                      </div>
                    </Content>
                  </ColumnFrame>
                </Column>
                <Column className="like">
                  <ColumnFrame>
                    <ColumnTitle>
                      <span>💖 </span>
                      <span>관심 있는 강의</span>
                    </ColumnTitle>
                    <Content>
                      <div className="text">
                        <p> (회원아이디)님, 남은 하루도 화이팅! 👋🏻</p>
                      </div>
                    </Content>
                  </ColumnFrame>
                </Column>
              </BoardWrap>
            </MainBoard>
          </Main>
        </Container>
      </Section>
    </DashBoardWrap>
  );
}

const DashBoardWrap = styled.main`
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
  background-color: #f7f7f7;
`;
const Main = styled.div`
  display: flex;
`;

const SlideBar = styled.aside`
  width: 15%;
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
  }
`;

const MainBoard = styled.div`
  padding: 15px;
  width: 85%;
`;
const BoardWrap = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: inherit;
`;
const Column = styled.div`
  padding: 15px;
  width: 50%;
  height: 230px;
  background-color: #f7f7f7;
  &.profile {
    .text {
      font-weight: 700;
      font-size: 20px;
      white-space: pre-line;
      .logoIcon {
        width: 40px;
      }
      p {
        margin-left: 10px;
      }
    }
  }
  &.class {
  }
  &.cart {
  }
  &.like {
  }
`;

const ColumnFrame = styled.div`
  height: 100%;
  background-color: white;
`;
const ColumnTitle = styled.p`
  padding: 20px 10px 10px 15px;
  font-size: 16px;
  font-weight: 700;
`;
const Content = styled.div`
  padding: 10px;
  .text {
    display: flex;
  }
  p {
    color: #333;
  }
`;

export default DashBoard;
