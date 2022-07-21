import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../App';
import MyPage from '../MyPage/MyPage';
import styled from 'styled-components';

function DashBoard() {
  //login 판별
  const [isLogin, setIsLogin] = useContext(LoginContext);
  return (
    <MyPage>
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
    </MyPage>
  );
}

const BoardWrap = styled.div`
  display: flex;
  width: 1000px;
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
  border-radius: 4px;
  box-shadow: 2px 8px 12px 0 rgb(20 20 20 / 2%);
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
