import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

function SignUpErrModal({ setOpenErrModal, text }) {
  return (
    <ModalCover>
      <ModalBackground />
      <ModalBox>
        <ModalContent>
          <ModalIconContent>
            <ModalIcon>
              <StyledIcon icon={faTriangleExclamation} />
            </ModalIcon>
            <Title>회원 가입에 실패했습니다.</Title>
            <Description>{text}</Description>
          </ModalIconContent>
          <ButtonPosition>
            <Button
              id="cancelBtn"
              onClick={() => {
                setOpenErrModal(false);
              }}
            >
              확인
            </Button>
          </ButtonPosition>
        </ModalContent>
      </ModalBox>
    </ModalCover>
  );
}
export default SignUpErrModal;

const ModalCover = styled.div`
  position: fixed;
  display: flex !important;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 80;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 19, 30, 0.37); ;
`;

const ModalBox = styled.div`
  position: absolute;
  width: calc(100% - 40px);
  max-width: 416px;
  min-width: 320px;
  padding: 38px 55px;
  border-radius: 4px;
  background-color: #fff;
`;
const ModalContent = styled.div``;

const ModalIconContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
`;

const ModalIcon = styled.span`
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 20px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 56px;
  height: 56px;
  color: rgb(255, 160, 22);
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #212529;
`;

const Description = styled.span`
  font-size: 16px;
  color: #343a40;
  text-align: center;
`;

const ButtonPosition = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  height: 40px;
  padding: 0 16px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 3px;
  background-color: #00c471;
  color: #fff;
  border: none;
  cursor: pointer;
`;
