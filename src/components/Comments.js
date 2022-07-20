import styled from 'styled-components';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
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
`;
function Comments() {
  const [rating, setRating] = useState(0);

  const handleRating = rate => {
    setRating(rate);
  };
  console.log(rating / 20);
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
      </Body>
    </Wrapper>
  );
}

export default Comments;
