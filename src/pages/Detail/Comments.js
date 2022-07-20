import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import Updatemodal from './Updatemodal';
import Deletemodal from './Deletemodal';

const Wrapper = styled.div`
  margin-top: 40px;
`;

const Header = styled.div`
  h1 {
    font-size: 23px;
    font-weight: 700;
  }
  p {
    margin-top: 10px;
    font-size: 15px;
  }
`;

const Body = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  textarea {
    margin-top: 20px;
    padding: 20px;
    width: 100%;
    height: 6.5rem;
    resize: none;
    border: 1px solid #dee2e6;
    &:focus {
      outline: none;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  border-left: 1px solid #dee2e6;
  border-bottom: 1px solid #dee2e6;
  button {
    background-color: #05c271;
    color: white;
    border: none;
    padding: 0.75rem;
    font-weight: 700;
    cursor: pointer;
  }
`;

const ReviewWrapper = styled.div`
  margin-top: 30px;
  border-top: 1px solid black;
`;

const ReviewHeader = styled.div`
  display: flex;
  position: relative;
  margin-top: 20px;
  align-items: center;
`;

const ReviewImg = styled.img`
  width: 45px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ReviewRatingWrapper = styled.div`
  display: flex;
  span {
    margin-left: 10px;
    font-weight: 700;
  }
  margin-bottom: 5px;
`;

const ReviewUserName = styled.span`
  font-weight: 700;
  color: #858e96;
`;

const ReviewContent = styled.p`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ReviewCreatedAt = styled.span`
  font-size: 13px;
  color: #858e96;
`;

const Elipsis = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

const SModalWrapper = styled.div`
  position: absolute;
  right: 25px;
  top: 20px;
  span {
    font-weight: 500;
  }
  cursor: pointer;
  border: 1px solid #acb5bd;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const Modify = styled.div`
  padding: 15px;
  border-bottom: 1px solid #acb5bd;
`;

const Delete = styled(Modify)`
  border-bottom: none;
`;

const ReviewInfo = styled.div``;
function Comments({ id }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState();
  const [reviews, setReviews] = useState();
  const [showOption, setShowOption] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleRating = rate => {
    setRating(rate / 20);
  };
  console.log('렌더링되었습니다');
  const handleContent = e => {
    setContent(e.target.value);
  };

  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxfQ.wq6RVyINzhOV6g8cixMo5mc3660Sq3caVOAxBTu1yis';

  async function get() {
    const result = await axios.get(
      `http://localhost:10010/course/${id}/review`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setReviews(result.data);
  }

  const submit = async () => {
    await axios.post(`http://localhost:10010/course/${id}/review`, {
      class_id: id,
      user_id: 1,
      content,
      rating,
    });
    get();
  };

  useEffect(() => {
    get();
  }, [id]);
  console.log(reviews);
  return (
    <Wrapper>
      <Header>
        <h1>수강평</h1>
        <p>
          수강생분들이 직접 작성하신 수강평입니다. 수강평을 작성 시 300잎이
          적립됩니다.
        </p>
      </Header>
      <Body>
        <Rating
          allowHalfIcon
          onClick={handleRating}
          fillColorArray={[
            '#f17a45',
            '#f19745',
            '#f1a545',
            '#f1b345',
            '#f1d045',
          ]}
          ratingValue={rating}
        />
        <p>더블클릭하여 별점을 입력해주세요.</p>
        <textarea
          value={content}
          onChange={handleContent}
          placeholder="좋은 수강평을 남겨주시면 지식공유자와 이후 배우는 사람들에게 큰 도움이 됩니다! 포인트도 드려요!! (5자 이상)"
        />
        <ButtonWrapper>
          <button
            onClick={() => {
              submit();
              setContent('');
            }}
          >
            등록
          </button>
        </ButtonWrapper>
      </Body>
      <ReviewWrapper>
        {reviews?.map((el, idx) => (
          <>
            <ReviewHeader key={idx}>
              <ReviewImg src={el.user_img} />
              <ReviewInfo>
                <ReviewRatingWrapper>
                  <div>
                    <StarRatings
                      rating={el.rate}
                      starRatedColor="#F7DF1B"
                      numberOfStars={5}
                      starSpacing="0px"
                      starDimension="15px"
                    />
                    <span>{el.rate}</span>
                  </div>
                  <Elipsis>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      onClick={() => setShowOption(prev => !prev)}
                    />
                  </Elipsis>
                  <SModalWrapper show={showOption}>
                    <Modify
                      onClick={() => {
                        setShowUpdate(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                      <span>수정</span>
                    </Modify>
                    <Delete
                      onClick={() => {
                        setShowDelete(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                      <span>삭제</span>
                    </Delete>
                  </SModalWrapper>
                </ReviewRatingWrapper>
                <ReviewUserName>{el.user_name}</ReviewUserName>
              </ReviewInfo>
            </ReviewHeader>
            <ReviewContent>{el.review_content}</ReviewContent>
            <ReviewCreatedAt>{el.created_at.slice(0, 10)}</ReviewCreatedAt>
            {showUpdate && (
              <Updatemodal
                setShowUpdate={setShowUpdate}
                id={id}
                reviewId={el.id}
              />
            )}
            {showDelete && (
              <Deletemodal
                setShowDelete={setShowDelete}
                id={id}
                reviewId={el.id}
              />
            )}
          </>
        ))}
      </ReviewWrapper>
    </Wrapper>
  );
}

export default Comments;
