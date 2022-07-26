import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignal,
  faFolderTree,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Fake = styled.div`
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px 10px 0px 10px;
  opacity: 0;
  width: 220px;
  height: 307px;
  position: absolute;
  color: white;
`;
const Course = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 300px;
  cursor: pointer;
  position: relative;
  &:hover ${Fake} {
    opacity: 1;
  }
`;
const CourseImg = styled.img`
  display: block;
  width: 100%;
  height: 145px;
  margin-bottom: 0.7rem;
`;

const CourseName = styled.strong`
  font-size: 16px;
  font-weight: 700;
  height: 50px;
`;
const CourseIns = styled.span`
  margin-top: 5px;
  font-size: 14px;
  color: #595959;
  margin-bottom: 5px;
`;
const CoursePrice = styled.span`
  color: blue;
  font-weight: 700;
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 12px;
`;
const DiscountP = styled.span`
  text-decoration: line-through;
  color: #b8b8b8;
  margin-right: 5px;
  font-size: 16px;
`;
const CourseRate = styled.span`
  font-size: 10px;
`;
const CourseStudents = styled.span`
  background-color: #ffc18e;
  margin-top: 5px;
  width: 60px;
  padding: 7px;
  font-size: 12px;
  text-align: center;
  border-radius: 6px;
  margin-right: 5px;
`;
const CourseDiscount = styled.span`
  background-color: #94b49f;
  margin-top: 5px;
  width: 60px;
  padding: 7px;
  font-size: 12px;
  text-align: center;
  border-radius: 6px;
`;
const FakeName = styled.strong`
  display: block;
  font-weight: 600;
`;

const FakeDesc = styled.p`
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.3;
`;
const FakeLev = styled.div`
  margin-top: 10px;
  span {
    font-size: 14px;
    margin-left: 10px;
  }
`;
const FakeButtons = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const Fakecartwrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 5px;
`;
const Fakecart = styled.div`
  width: 20px;
  margin-left: 10px;
  &:hover {
    color: tomato;
    cursor: default;
  }
  color: ${props => (props.inCart ? 'tomato' : 'white')};
`;
const Fakecartspan = styled.span`
  font-size: 13px;
  background-color: #f2df3a;
  color: black;
  padding: 7px 12px;
  border-radius: 5px;
  position: absolute;
  left: 80px;
`;
const Fakecartspan2 = styled.span`
  font-size: 13px;
  background-color: #f2df3a;
  color: black;
  padding: 7px 12px;
  border-radius: 5px;
  position: absolute;
  left: 67px;
`;
const Fakeheartwrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;
const Fakeheartspan = styled.span`
  display: block;
  font-size: 13px;
  background-color: #f2df3a;
  color: black;
  padding: 7px 12px;
  border-radius: 5px;
  position: absolute;
  left: 80px;
`;
const Fakeheart = styled.div`
  margin-left: 10px;
  width: 20px;
  font-size: 18px;
  &:hover {
    color: tomato;
    cursor: default;
  }
  color: ${props => (props.inWishList ? 'tomato' : 'white')};
`;
const Fakediv = styled.div`
  background-color: #f2df3a;
  width: 13px;
  height: 13px;
  position: relative;
  right: 1px;
  transform: rotateZ(45deg);
`;
const FakeCat = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  span {
    overflow: hidden;
    font-size: 14px;
    margin-left: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

function Class({
  data,
  navigate,
  cart,
  deleteCart,
  wishList,
  deleteWishList,
  cartClass,
  wishClass,
  wishListUpdate,
}) {
  const [fakecat, setFakecat] = useState(false);
  const [fakeheart, setFakeheart] = useState(false);
  const [actCat, setActCat] = useState();

  useEffect(() => {
    if (cartClass?.includes(data.id)) {
      setActCat(true);
    } else {
      setActCat(false);
    }
  }, [cartClass, data.id]);

  return (
    <Course>
      <CourseImg src={data.img} />
      <CourseName>{data.class_name}</CourseName>
      <CourseIns>{data.instructor_name}</CourseIns>
      <div>
        <StarRatings
          rating={data.rate ? data.rate : 0}
          starRatedColor="#F7DF1B"
          numberOfStars={5}
          starSpacing="0px"
          starDimension="18px"
        />
        <CourseRate>({data.rate ? data.rate.toFixed(1) : 0}/5.0)</CourseRate>
      </div>
      <CoursePrice>
        {data.discounted_price ? (
          <>
            <DiscountP>₩{Number(data.price).toLocaleString('en')}</DiscountP>
            <span>₩{Number(data.discounted_price).toLocaleString('en')}</span>
          </>
        ) : (
          <span>
            {data.price > 0
              ? '₩' + Number(data.price).toLocaleString('en')
              : '무료'}
          </span>
        )}
      </CoursePrice>
      <div>
        {data.students >= 100 && (
          <CourseStudents>
            +{data.students - (data.students % 100)}명
          </CourseStudents>
        )}
        {data.discounted_price && <CourseDiscount>할인중</CourseDiscount>}
      </div>
      <Fake
        onClick={() => {
          navigate(`/course/${data.id}`);
        }}
      >
        <FakeName>{data.class_name}</FakeName>
        <FakeDesc>
          {data?.description?.length > 80
            ? data.description.slice(0, 80) + '...'
            : data.description}
        </FakeDesc>
        <FakeLev>
          <FontAwesomeIcon icon={faSignal} />
          <span>{data.level}</span>
        </FakeLev>
        <FakeCat>
          <FontAwesomeIcon icon={faFolderTree} />
          <span>{data?.categories?.join(', ')}</span>
        </FakeCat>
        <FakeButtons>
          <Fakecartwrapper>
            {fakecat && (
              <>
                {actCat ? (
                  <Fakecartspan2>장바구니에서 제거</Fakecartspan2>
                ) : (
                  <Fakecartspan>장바구니에 추가</Fakecartspan>
                )}
                <Fakediv />
              </>
            )}
            <Fakecart
              onClick={e => {
                e.stopPropagation();
                actCat
                  ? deleteCart(data.id).then(() => {
                      setActCat(false);
                    })
                  : cart(data.id).then(() => {
                      setActCat(true);
                    });
              }}
              onMouseEnter={() => {
                setFakecat(true);
              }}
              onMouseLeave={() => {
                setFakecat(false);
              }}
              inCart={actCat}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </Fakecart>
          </Fakecartwrapper>
          <Fakeheartwrapper>
            {fakeheart && (
              <>
                <Fakeheartspan>
                  {wishClass?.includes(data.id)
                    ? '위시리스트 삭제'
                    : '위시리스트 추가'}
                </Fakeheartspan>
                <Fakediv />
              </>
            )}
            <Fakeheart
              onClick={e => {
                e.stopPropagation();
                wishClass.includes(data.id)
                  ? deleteWishList(data.id).then(() => {
                      wishListUpdate();
                    })
                  : wishList(data.id).then(() => {
                      wishListUpdate();
                    });
              }}
              onMouseEnter={() => {
                setFakeheart(true);
              }}
              onMouseLeave={() => {
                setFakeheart(false);
              }}
              inWishList={wishClass?.includes(data.id)}
            >
              <FontAwesomeIcon icon={faHeart} />
            </Fakeheart>
          </Fakeheartwrapper>
        </FakeButtons>
      </Fake>
    </Course>
  );
}
export default Class;
