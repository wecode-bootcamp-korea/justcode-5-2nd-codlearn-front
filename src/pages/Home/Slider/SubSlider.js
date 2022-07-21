import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faSignal,
  faFolderTree,
  faCubes,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

function SubSlider() {
  const [freeCourse, setFreeCourse] = useState([]);
  const [beginnerCourse, setBeginnerCourse] = useState([]);
  const [showLike, setShowLike] = useState(false);
  const [showMyFolder, setShowMyFolder] = useState(false);

  const navigationPrevFreeRef = useRef(null);
  const navigationNextFreeRef = useRef(null);
  const navigationPrevBeginRef = useRef(null);
  const navigationNextBeginRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:10010/', { method: 'GET' })
      .then(res => res.json())
      .then(res => {
        setFreeCourse(res.free15);
        setBeginnerCourse(res.intro15);
      });
  }, []);
  console.log(freeCourse);

  return (
    <SubSliderWrap>
      <FreeSlider>
        <Header>
          <Link to="/courses?charge=free">
            <Title>
              무료강의? 오히려 좋아 ✨ <FontAwesomeIcon icon={faAngleRight} />
            </Title>
          </Link>
          <SubText>무료 강의부터 가볍게 시작해 보세요.</SubText>
        </Header>
        <NavigationButton>
          <PrevButton ref={navigationPrevFreeRef}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PrevButton>
          <NextButton ref={navigationNextFreeRef}>
            <FontAwesomeIcon icon={faAngleRight} />
          </NextButton>
        </NavigationButton>
        <StyleSwiper
          slidesPerView={5}
          spaceBetween={10}
          slidesPerGroup={5}
          loop={false}
          loopFillGroupWithBlank={true}
          navigation={{
            prevEl: navigationPrevFreeRef.current,
            nextEl: navigationNextFreeRef.current,
          }}
          onBeforeInit={swiper => {
            swiper.params.navigation.prevEl = navigationPrevFreeRef.current;
            swiper.params.navigation.nextEl = navigationNextFreeRef.current;
          }}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          modules={[Navigation]}
          className="mySwiper"
        >
          {freeCourse.map(data => (
            <SwiperSlide key={data.id}>
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
                    <div className="price">{data.price === 0 && `무료`}</div>
                    <div className="students">
                      +{Math.floor(data.students / 100) * 100}명
                    </div>
                  </section>
                </ContentWrap>
              </Link>
            </SwiperSlide>
          ))}
        </StyleSwiper>
      </FreeSlider>
      <BeginnerSLider>
        <Header>
          <Link to="/courses?level=1">
            <Title>
              왕초보도 할 수 있어요 💪 <FontAwesomeIcon icon={faAngleRight} />
            </Title>
          </Link>
          <SubText>이미 검증된 쉽고 친절한 입문 강의!!</SubText>
        </Header>
        <NavigationButton>
          <PrevButton ref={navigationPrevBeginRef}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PrevButton>
          <NextButton ref={navigationNextBeginRef}>
            <FontAwesomeIcon icon={faAngleRight} />
          </NextButton>
        </NavigationButton>
        <StyleSwiper
          slidesPerView={5}
          spaceBetween={10}
          slidesPerGroup={5}
          loop={false}
          loopFillGroupWithBlank={true}
          navigation={{
            prevEl: navigationPrevBeginRef.current,
            nextEl: navigationNextBeginRef.current,
          }}
          onBeforeInit={swiper => {
            swiper.params.navigation.prevEl = navigationPrevBeginRef.current;
            swiper.params.navigation.nextEl = navigationNextBeginRef.current;
          }}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          modules={[Navigation]}
          className="mySwiper"
        >
          {beginnerCourse.map(data => (
            <SwiperSlide key={data.id}>
              <Link to className="linkHover">
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
            </SwiperSlide>
          ))}
        </StyleSwiper>
      </BeginnerSLider>
    </SubSliderWrap>
  );
}

const SubSliderWrap = styled.section`
  margin: 80px 0;
  a {
    display: block;
    text-decoration: none;
    &.linkHover:hover {
      .ContentHover {
        display: block;
      }
    }
  }
  article {
    position: relative;
    width: 1200px;
    margin: 70px auto;
  }
`;

//title
const Header = styled.div``;
const Title = styled.h1`
  font-size: x-large;
  font-weight: 600;
  color: #1e1e1e;
  svg {
    color: #757575;
  }
`;
const SubText = styled.p`
  margin-top: 10px;
  font-weight: 400;
  color: #757575;
`;

//slider
const FreeSlider = styled.article``;
const BeginnerSLider = styled.article``;

//slider - prev&next button
const NavigationButton = styled.div`
  Button {
    position: absolute;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 100%;
    border: 1px solid #ccc;
    background-color: white;
    opacity: 0.8;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
    transition: all 0.2s ease-in;
    z-index: 10;
    &:hover {
      box-shadow: 0 2px 8px 0 rgb(0 0 0 / 30%);
    }
  }
`;
const PrevButton = styled.button`
  top: 60%;
  transform: translateY(-60%);
  left: -25px;
`;
const NextButton = styled.button`
  top: 60%;
  transform: translateY(-60%);
  right: -25px;
`;

//slider - hover
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
const StyleSwiper = styled(Swiper)`
  position: relative;
  width: 1200px;
  margin: 25px auto;
  padding: 0;
  background-color: white;
`;
const ContentWrap = styled.div`
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

export default SubSlider;
