import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../config';
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalWrapper = styled.div`
  width: 35vw;
  height: 50vh;
  border-radius: 10px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.h1`
  font-size: 20px;
  padding: 20px;
  font-weight: 600;
`;

const Input = styled.textarea`
  margin-top: 20px;
  width: 420px;
  height: 130px;
  resize: none;
  border: 1px solid #dee2e6;
  padding: 20px;
  &:focus {
    outline: none;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  button {
    border: none;
    padding: 12px;
    background-color: white;
    font-size: 15px;
    cursor: pointer;
    &:last-child {
      background-color: #05c271;
      color: white;
      border-radius: 5px;
      margin-left: 10px;
    }
  }
`;

function Updatemodal({ setShowUpdate, id, reviewId, get, setShowOption }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState();
  console.log(reviewId);
  const handleContent = e => {
    setContent(e.target.value);
  };

  const submit = () => {
    axios.put(`${BASE_URL}/course/${id}/review`, {
      review_contents: content,
      rate: rating,
      review_id: reviewId,
    });
  };

  function modalClose() {
    setShowUpdate(false);
  }
  const handleRating = rate => {
    setRating(rate / 20);
  };

  return (
    <>
      <Overlay onClick={modalClose} />
      <ModalWrapper>
        <FontAwesomeIcon
          onClick={modalClose}
          style={{
            position: 'absolute',
            cursor: 'pointer',
            right: '25px',
            top: '25px',
            fontSize: '25px',
            color: '#858E96',
          }}
          icon={faXmark}
        />
        <Header>힘이 되는 수강평을 남겨주세요!</Header>
        <Rating
          allowHalfIcon
          onClick={handleRating}
          ratingValue={rating}
          fillColorArray={[
            '#f17a45',
            '#f19745',
            '#f1a545',
            '#f1b345',
            '#f1d045',
          ]}
        />
        <Input
          onChange={handleContent}
          placeholder="좋은 수강평을 남겨주시면 지식공유자와 이후 배우는 사람들에게 큰 도움이 됩니다! 포인트도 드려요!! (5자 이상)"
        />
        <ButtonWrapper>
          <button onClick={modalClose}>취소</button>
          <button
            onClick={() => {
              submit();
              get();
              setShowOption(false);
              modalClose();
            }}
          >
            저장하기
          </button>
        </ButtonWrapper>
      </ModalWrapper>
    </>
  );
}
export default Updatemodal;
//http://localhost:10010/course/${id}/review
