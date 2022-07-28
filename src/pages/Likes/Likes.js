import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MyPage from '../MyPage/MyPage';
import styled from 'styled-components';
import { LoginContext } from '../../App';
import BASE_URL from '../../config';

import axios from 'axios';

function Likes() {
  const [isLogin, setIsLogin] = useContext(LoginContext);
  const [userData, setUserData] = useState([]);

  const token = localStorage.getItem('token');

  const boardApi = async () => {
    setIsLogin(true);
    const response = await axios.get(`${BASE_URL}/dashboard`, {
      headers: {
        Authorization: token,
      },
    });
    setUserData(response.data);
  };

  useEffect(() => {
    boardApi();
  }, []);

  return (
    <MyPage>
      {/* <WrapTitle>전체({userData?.data?.wishlist.length})</WrapTitle> */}
      {userData?.data?.wishlist?.map(data => (
        <Wrap key={data.id}>
          <Link to={`/course/${data.class_id}`} className="linkHover">
            <ContentWrap>
              <section>
                <img src={data.img} alt={data.class_name} />
                <p className="className">{data.class_name}</p>
                {/* <div className="instructorName">{data.instructor_name}</div> */}
              </section>
            </ContentWrap>
          </Link>
        </Wrap>
      ))}
    </MyPage>
  );
}

//slider - style
const Wrap = styled.div`
  padding: 5px;
  width: 33.333333%;
  a {
    display: block;
    text-decoration: none;
    &.linkHover:hover {
      .ContentHover {
        display: block;
      }
    }
  }
`;

const WrapTitle = styled.h3`
  position: absolute;
  left: 0;
  top: 0;
`;

const ContentWrap = styled.div`
  margin-bottom: 15px;
  section {
    width: 100%;
    padding: 15px;
    background-color: white;
    img {
      width: 100%;
      height: 150px;
      margin-bottom: 5px;
      object-fit: cover;
    }
    .className {
      height: 40px;
      line-height: 20px;
      font-weight: 600;
      color: rgb(69, 69, 69);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .instructorName {
      margin-top: 20px;
      margin-bottom: 5px;
      font-size: small;
      color: #7d7d7d;
    }
    .price {
      margin: 10px 0;
      font-size: medium;
      font-weight: 600;
      color: #175cbe;
      span {
        margin-right: 5px;
        color: #595959;
        font-weight: 400;
        font-size: small;
        text-decoration: line-through;
        opacity: 0.75;
      }
    }
    .students {
      display: inline-block;
      padding: 4px 7px;
      font-size: small;
      color: #454545;
      border-radius: 5px;
      background-color: hsl(321, 63%, 90%);
    }
  }
`;

export default Likes;
