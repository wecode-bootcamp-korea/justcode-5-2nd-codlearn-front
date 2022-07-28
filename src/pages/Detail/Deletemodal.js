import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { ButtonWrapper, Header, ModalWrapper, Overlay } from './Updatemodal';
import axios from 'axios';
import BASE_URL from '../../config';

function Deletemodal({ setShowDelete, id, reviewId, get }) {
  function closeModal() {
    setShowDelete(false);
  }

  const submit = () => {
    try {
      return axios
        .delete(`${BASE_URL}/course/${id}/review`, {
          data: {
            review_id: reviewId,
          },
        })
        .then(() => get());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Overlay onClick={closeModal} />
      <ModalWrapper
        style={{ width: '30vw', height: '40vh', justifyContent: 'center' }}
      >
        <FontAwesomeIcon
          onClick={closeModal}
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

        <FontAwesomeIcon
          style={{ fontSize: '60px', color: 'orange' }}
          onClick={closeModal}
          icon={faTriangleExclamation}
        />
        <Header>수강평 삭제</Header>
        <p>수강평 작성으로 지급된 포인트도 회수됩니다.</p>
        <ButtonWrapper>
          <button onClick={closeModal}>취소</button>
          <button
            onClick={() => {
              submit();
              closeModal();
            }}
          >
            삭제
          </button>
        </ButtonWrapper>
      </ModalWrapper>
    </>
  );
}
export default Deletemodal;
