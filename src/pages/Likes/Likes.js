import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MyPage from '../MyPage/MyPage';
import styled from 'styled-components';

import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignal,
  faFolderTree,
  faCubes,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

function Likes() {
  const [freeCourse, setFreeCourse] = useState([]);
  const [beginnerCourse, setBeginnerCourse] = useState([]);
  const [showLike, setShowLike] = useState(false);
  const [showMyFolder, setShowMyFolder] = useState(false);

  useEffect(() => {
    fetch('http://localhost:10010/', { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        setFreeCourse(res.free15);
        setBeginnerCourse(res.intro15);
      });
  }, []);

  return (
    <MyPage>
      {beginnerCourse.map(data => (
        <Wrap key={data.id}>
          <Link to={`/course/${data.id}`} className="linkHover">
            <ContentHover className="ContentHover">
              <p className="className">{data.class_name}</p>
              <p className="level">
                <span>
                  <FontAwesomeIcon icon={faSignal} />
                </span>
                {data.level}
              </p>
              <p className="level">
                <span>
                  <FontAwesomeIcon icon={faFolderTree} />
                </span>
                {data.categories[0]}
              </p>
              <p className="level">
                <span>
                  <FontAwesomeIcon icon={faCubes} />
                </span>
                {data.categories[1]}, {data.categories[2]}
              </p>
              <div className="iconBox">
                <div className="likeBtn">
                  <div
                    className="likeText"
                    style={{ display: showLike ? 'block' : 'none' }}
                  >
                    <span className="text">좋아요에 추가</span>
                    <div className="arrowIcon"></div>
                  </div>
                  <div
                    className="likeIcon"
                    onMouseEnter={() => {
                      setShowLike(true);
                    }}
                    onMouseLeave={() => {
                      setShowLike(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </div>
                </div>
                <div className="myFolderBtn">
                  <div
                    className="myFolderText"
                    style={{ display: showMyFolder ? 'block' : 'none' }}
                  >
                    <span className="text">장바구니에 추가</span>
                    <div className="arrowIcon"></div>
                  </div>
                  <div
                    className="myFolderIcon"
                    onMouseEnter={() => {
                      setShowMyFolder(true);
                    }}
                    onMouseLeave={() => {
                      setShowMyFolder(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                  </div>
                </div>
              </div>
              <div className="bg"></div>
            </ContentHover>
            <ContentWrap>
              <section>
                <img src={data.img} alt={data.class_name} />
                <p className="className">{data.class_name}</p>
                <div className="instructorName">{data.instructor_name}</div>
                <StarRatings
                  rating={data.rate ? data.rate : 0}
                  starRatedColor="#F7DF1B"
                  numberOfStars={5}
                  starSpacing="0px"
                  starDimension="15px"
                />
                <div className="price">
                  {data.discounted_price ? (
                    <span>
                      ₩{Number(data.discounted_price).toLocaleString('en')}
                    </span>
                  ) : null}
                  {data.price === 0
                    ? `무료`
                    : '₩' + Number(data.price).toLocaleString('en')}
                </div>
                <div className={data.students >= 100 ? 'students' : null}>
                  {data.students >= 100
                    ? `+${Math.floor(data.students / 100) * 100}명`
                    : null}
                </div>
                {data.discounted_price ? (
                  <span
                    className="students"
                    style={{
                      marginLeft: '10px',
                      backgroundColor: 'hsl(1,100%,89%)',
                    }}
                  >
                    할인중
                  </span>
                ) : null}
              </section>
            </ContentWrap>
          </Link>
        </Wrap>
      ))}
    </MyPage>
  );
}

const ContentHover = styled.div`
  display: none;
  position: absolute;
  padding: 15px;
  width: 230px;
  height: 315px;
  z-index: 2;
  p {
    color: white;
    opacity: 1;
    z-index: 1;
  }
  .className {
    margin-bottom: 20px;
    height: 40px;
    line-height: 20px;
    font-size: medium;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .level {
    margin: 5px 0;
    font-size: small;
    color: rgb(197, 235, 248);
    span {
      margin-right: 5px;
    }
  }
  .iconBox {
    position: absolute;
    overflow: hidden;
    right: 15px;
    bottom: 15px;
    color: white;
    .likeBtn {
      position: relative;
      padding: 2px 0;
      height: 30px;
      .likeText {
        position: relative;
        float: left;
        .text {
          margin-right: 10px;
          padding: 4px 6px;
          color: rgb(69, 69, 69);
          font-size: 11px;
          background-color: rgba(255, 221, 87, 1);
          border-radius: 5px;
        }
        .arrowIcon {
          display: inline-block;
          position: absolute;
          width: 0;
          height: 0;
          top: 4px;
          right: 5px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid rgba(255, 221, 87, 1);
          z-index: 15;
        }
      }
      .likeIcon {
        float: right;
        &:hover {
          color: red;
        }
      }
    }
    .myFolderBtn {
      height: 30px;
      padding: 2px 0;
      .myFolderText {
        position: relative;
        float: left;
        .text {
          margin-right: 10px;
          padding: 4px 6px;
          color: rgb(69, 69, 69);
          font-size: 11px;
          background-color: rgba(255, 221, 87, 1);
          border-radius: 5px;
        }
        .arrowIcon {
          display: inline-block;
          position: absolute;
          width: 0;
          height: 0;
          top: 4px;
          right: 5px;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid rgba(255, 221, 87, 1);
          z-index: 15;
        }
      }
      .myFolderIcon {
        float: right;
        &:hover {
          color: red;
        }
      }
    }
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.8;
    z-index: -1;
  }
`;

//slider - style
const Wrap = styled.div`
  padding: 20px 0;
  width: 25%;
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
const ContentWrap = styled.div`
  margin-bottom: 15px;
  section {
    width: 230px;
    height: 315px;

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
