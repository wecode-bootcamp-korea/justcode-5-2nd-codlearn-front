import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';
import MyPage from '../MyPage/MyPage';
import styled from 'styled-components';
import axios from 'axios';

function DashBoard() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [userData, setUserData] = useState(null);
  console.log(isLogin);

  const navigate = useNavigate();

  const goToMyCourses = () => {
    navigate('/my_courses');
  };

  const token = localStorage.getItem('token');

  const boardApi = async () => {
    setIsLogin(true);
    const response = await axios.get(`http://localhost:10010/dashboard`, {
      headers: {
        Authorization: token,
      },
    });
    setUserData(response.data);
  };

  useEffect(() => {
    boardApi();
  }, []);

  console.log('data : ', userData?.data);
  // to={`/course/${data.class_id}`}
  return (
    <>
      {isLogin ? (
        <MyPage>
          <BoardWrap>
            <Column className="profile">
              <ColumnFrame>
                <ColumnTitle>
                  <span>😄 </span>
                  <span>{userData?.data.user.name}님 프로필</span>
                </ColumnTitle>
                <Content>
                  <div className="text">
                    <div className="logoIcon">
                      <img src="images/icon.png" alt="icon" />
                    </div>
                    <p> {userData?.data.user.name}님, 오늘 하루 화이팅! 👋🏻</p>
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
                    {userData?.data.recentlyRegistered.map(data => (
                      <p className="recentP">
                        <Link to={`/course/${data.class_id}`}>
                          {data.class_name}
                        </Link>
                      </p>
                    ))}
                  </div>
                  <ClassBtn onClick={goToMyCourses}>내 모든 강의</ClassBtn>
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
                    {userData?.data.wishlist.map(data => (
                      <p className="cartP">
                        <Link to={`/course/${data.class_id}`}>
                          {data.class_name}
                        </Link>
                      </p>
                    ))}
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
                    {userData?.data.wishlist.map(data => (
                      <p className="likeP">
                        <Link to={`/course/${data.class_id}`}>
                          {data.class_name}
                        </Link>
                      </p>
                    ))}
                  </div>
                </Content>
              </ColumnFrame>
            </Column>
          </BoardWrap>
        </MyPage>
      ) : null}
    </>
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
  height: 320px;
  background-color: #f7f7f7;
  a {
    &:hover {
      color: #00c471;
    }
  }
  &.profile {
    .text {
      display: flex;
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
    .recentP {
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      //border: 1px solid red;
    }
  }
  &.cart {
    .cartP {
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      //border: 1px solid red;
    }
  }
  &.like {
    .likeP {
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      //border: 1px solid red;
    }
  }
`;

const ColumnFrame = styled.div`
  position: relative;
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
  p {
    color: #333;
  }
`;

const ClassBtn = styled.button`
  position: absolute;
  right: 15px;
  bottom: 15px;
  padding: 10px;
  font-weight: 700;
  color: white;
  border: none;
  border-radius: 5px;
  background-color: #00c471;
  cursor: pointer;
`;

export default DashBoard;
