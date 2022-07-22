import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHashtag } from '@fortawesome/free-solid-svg-icons';
import Comments from './Comments';
import axios from 'axios';
const DetailWrapper = styled.div`
  margin-bottom: 50px;
`;
const DetailHeader = styled.div`
  background-color: #002233;
  color: white;
  display: flex;
  padding: 40px 0px 40px 150px;
`;
const DetailImg = styled.img`
  display: block;
  border-radius: 10px;
  width: 430px;
  height: 270px;
  margin-right: 40px;
`;
const DetailInfo = styled.div`
  margin-top: 50px;
`;
const DetailCategory = styled.div`
  span {
    margin-right: 5px;
  }
  margin-bottom: 10px;
`;
const DetailName = styled.h1`
  font-size: 27px;
  font-weight: 600;
  margin-bottom: 50px;
`;
const Detaildetail = styled.div`
  strong {
    font-weight: 700;
    margin-left: 5px;
  }
  margin-bottom: 10px;
`;
const DetailProf = styled.div`
  svg {
    margin-right: 10px;
  }
  margin-bottom: 10px;
`;
const DetailHashTag = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
  button {
    color: white;
    font-size: 12px;
    background-color: #183f50;
    border: none;
    margin-right: 10px;
    padding: 6px 10px;
    border-radius: 15px;
  }
`;
const DetailBodyWrapper = styled.div`
  display: flex;
`;
const DetailBody = styled.div`
  margin-top: 50px;
  padding: 0px 80px 0px 150px;
`;
const DBodyHeader = styled.h1`
  font-size: 23px;
  line-height: 1.3;
  strong {
    font-weight: 700;
  }
  margin-bottom: 20px;
`;
const DBodyDesc = styled.p`
  width: 700px;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 20px;
`;
const DBodyObj = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
  border: 1px solid #e9ecef;
  border-radius: 7px;
  width: 700px;
`;
const ObjLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 20px;
  margin-right: 70px;
  span {
    text-align: center;
    margin-bottom: 20px;
  }
  p {
    line-height: 1.4;
    width: 3.6rem;
  }
`;

const ObjRight = styled.div`
  p {
    margin-top: 15px;
  }
`;

const StickyAside = styled.div`
  position: sticky;
  right: 100px;
  height: 380px;
  top: 300px;
  margin-top: 40px;
  border: 1px solid #e9ecef;
  width: 300px;
  border-radius: 10px;
`;
const DetailPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
`;
const DetailButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const DetailButtonTop = styled.button`
  border: none;
  background-color: #01c371;
  padding: 15px 0px;
  border-radius: 7px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
  cursor: pointer;
`;
const DetailButtonBottom = styled(DetailButtonTop)`
  background-color: white;
  color: #485056;
  border: 1px solid #e9ecef;
`;
const DetailMoreInfo = styled.div`
  padding: 24px;
  li {
    font-size: 14px;
    list-style: inside;
    margin-bottom: 10px;
  }
`;
const DetailDifficulty = styled.span`
  color: ${props => (props.active ? 'black' : 'gray')};
  span {
    color: black;
  }
`;
const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #3d4042;
  color: white;
  font-weight: 700;
  border-radius: 20px;
  width: 300px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  span:last-child {
    cursor: pointer;
  }
`;

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [confirm, setConfirm] = useState(false);
  const difficulty = ['입문', '초급', '중급이상'];
  const token = localStorage.getItem('token');
  function cart(targetID) {
    axios
      .put(
        `http://localhost:10010/cart?classId=${targetID}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then(
        result =>
          result.statusText === 'Created' && alert('장바구니에 추가되었습니다!')
      );
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await (
        await fetch(`http://localhost:10010/course/${id}`)
      ).json();
      setData(result);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (confirm) {
      setTimeout(() => {
        setConfirm(false);
      }, 3000);
      return () => clearTimeout();
    }
  }, [confirm]);

  return (
    data && (
      <DetailWrapper>
        <DetailHeader>
          <DetailImg src={data.img} />
          <DetailInfo>
            <DetailCategory>
              {data.categories.map((el, idx) =>
                idx === 2 ? (
                  <span key={idx}>{el}</span>
                ) : (
                  <span key={idx}>{el} &gt;</span>
                )
              )}
            </DetailCategory>
            <DetailName>{data.class_name}</DetailName>
            <Detaildetail>
              <StarRatings
                rating={data.rate ? data.rate : 0}
                starRatedColor="#F7DF1B"
                numberOfStars={5}
                starSpacing="0px"
                starDimension="15px"
              />
              <strong>({data.rate ? data.rate.toFixed(1) : 0})</strong>
              <span>
                <strong>{data.students}명</strong>의 수강생
              </span>
            </Detaildetail>
            <DetailProf>
              <FontAwesomeIcon icon={faUser} />
              <span>{data.instructor_name}</span>
            </DetailProf>
            <DetailHashTag>
              <FontAwesomeIcon icon={faHashtag} />
              {[...new Set(data.categories)].map(el => (
                <button key={el}>{el}</button>
              ))}
            </DetailHashTag>
          </DetailInfo>
        </DetailHeader>
        <DetailBodyWrapper>
          <DetailBody>
            <DBodyHeader>
              <h2>
                <strong>{data.level}자</strong>를 위해 준비한
                <br />
                <strong>
                  {data.categories[1]},{data.categories[2]} 강의입니다.
                </strong>
              </h2>
            </DBodyHeader>
            <DBodyDesc>{data.description}</DBodyDesc>
            <DBodyObj>
              <ObjLeft>
                <span>✍️</span>
                <p>
                  이런 걸<br />
                  배워요!
                </p>
              </ObjLeft>
              <ObjRight>
                {data.contents.map(el => (
                  <p>✅ {el}</p>
                ))}
              </ObjRight>
            </DBodyObj>
            <Comments id={id} />
          </DetailBody>
          <StickyAside>
            <div style={{ padding: '24px' }}>
              <DetailPrice>
                {data.discounted_price
                  ? Number(data.discounted_price).toLocaleString('en') + '원'
                  : data.price
                  ? Number(data.price).toLocaleString('en') + '원'
                  : '무료'}
              </DetailPrice>
              <DetailButtonWrapper>
                <DetailButtonTop>수강신청 하기</DetailButtonTop>
                <DetailButtonBottom onClick={() => cart(id)}>
                  바구니에 담기
                </DetailButtonBottom>
              </DetailButtonWrapper>
            </div>
            <DetailMoreInfo>
              <ul>
                <li>지식공유자 : {data.instructor_name}</li>
                <li>총 {data.sessions}개 수업</li>
                <li>수강기한 : 무제한</li>
                <li>수료증 : 발급</li>
                <li>
                  난이도 :
                  {difficulty.map((el, idx) =>
                    idx === 2 ? (
                      <DetailDifficulty active={el === data.level}>
                        {el}
                      </DetailDifficulty>
                    ) : (
                      <DetailDifficulty active={el === data.level}>
                        {el}
                        <span>-</span>
                      </DetailDifficulty>
                    )
                  )}
                </li>
              </ul>
            </DetailMoreInfo>
          </StickyAside>
        </DetailBodyWrapper>
        {confirm && (
          <ModalBox>
            <span>바구니에 담기 성공!</span>
            <span
              onClick={() => {
                setConfirm(false);
              }}
            >
              X
            </span>
          </ModalBox>
        )}
      </DetailWrapper>
    )
  );
}

export default Detail;
