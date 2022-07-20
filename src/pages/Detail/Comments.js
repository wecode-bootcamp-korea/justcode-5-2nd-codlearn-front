import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
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

function Comments({ id }) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState();
  const [reviews, setReviews] = useState();

  const handleRating = rate => {
    setRating(rate / 20);
  };

  const handleContent = e => {
    setContent(e.target.value);
  };

  const submit = () => {
    axios.post(`http://localhost:10010/course/${id}/review`, {
      class_id: id,
      user_id: 1,
      content,
      rating,
    });
  };

  useEffect(() => {
    async function get() {
      const result = await axios.get(
        `http://localhost:10010/course/${id}/review`
      );
      setReviews(result);
    }
    get();
  }, [id]);

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
          ratingValue={rating} /* Available Props */
        />
        <p>별점을 입력해주세요.</p>
        <textarea
          onChange={handleContent}
          placeholder="좋은 수강평을 남겨주시면 지식공유자와 이후 배우는 사람들에게 큰 도움이 됩니다! 포인트도 드려요!! (5자 이상)"
        />
        <ButtonWrapper>
          <button onClick={submit}>등록</button>
        </ButtonWrapper>
      </Body>
    </Wrapper>
  );
}

export default Comments;
