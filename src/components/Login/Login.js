import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../config';
import KakaoLogin from './KakaoLogin';
function Login() {
  const navigate = useNavigate();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const [email, setEmail] = useState('');
  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
    console.log('emailvalue :', e.currentTarget.value);
  };

  const [password, setPassword] = useState('');
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  console.log(password);
  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const handlePasswordType = e => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: 'text', visible: true };
      }
      return {
        type: 'password',
        visible: false,
      };
    });
  };

  const onLogin = () => {
    fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.token) {
          localStorage.setItem('login-token', result.token);
          navigate('/');
          setOpenLoginModal(false);
        } else {
          alert('이메일 또는 비밀번호를 확인해주세요.');
          setOpenLoginModal(false);
        }
      });
  };

  const signUpBtnHandle = event => {
    event.preventDefault();
    navigate('/signup');
  };

  const saveLoginToken = loginToken => {
    localStorage.setItem('loginToken', loginToken);
  };

  const goToMain = () => {
    navigate('/');
  };
  const closeBtn = () => {
    setOpenLoginModal(!openLoginModal);
  };

  return (
    <ModalCover>
      <ModalBackground />
      <ModalBox>
        <Close
          onClick={e => {
            closeBtn();
            // clickOutsideModal(e);
          }}
        >
          <CloseIcon icon={faXmark} />
        </Close>
        <Logo>
          <img src="images/logo.png" alt="logo" />
        </Logo>

        <InputBlock>
          <EmailInput
            type="email"
            placeholder="이메일"
            value={email}
            onChange={onEmailHandler}
          />
          <PWInputBox>
            <PWInput
              type={passwordType.type}
              placeholder="비밀번호"
              value={password}
              onChange={onPasswordHandler}
            />
            <PWToggleForm onClick={handlePasswordType}>
              {passwordType.visible ? (
                <EyeIcon icon={faEyeSlash}></EyeIcon>
              ) : (
                <EyeIcon icon={faEye}></EyeIcon>
              )}
            </PWToggleForm>
          </PWInputBox>
        </InputBlock>
        <Button id="loginBtn" onClick={onLogin}>
          로그인
        </Button>

        <SignInMoreAction>
          <FindPW>비밀번호 찾기</FindPW>
          <SignUp onClick={signUpBtnHandle}>회원 가입</SignUp>
        </SignInMoreAction>
        <SignUpSocial>
          <SocialLine />
          <SocialTitle>간편 로그인</SocialTitle>
          <KakaoLogin></KakaoLogin>
        </SignUpSocial>
      </ModalBox>
    </ModalCover>
  );
}
export default Login;

const ModalCover = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(11, 19, 30, 0.37);
  z-index: 99;
`;

const ModalBox = styled.article`
  padding: 24px;
  width: 360px !important;
  height: 482px;
  margin: auto;
  background-color: #fff;
  border-radius: 6px;
  z-index: 99;
`;

const Close = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  margin-left: auto;
  width: 16px;
`;

const Logo = styled.span`
  display: flex;
  align-items: center;
  img {
    width: 200px;
    margin: auto;
  }
`;

const SignInForm = styled.form``;
const InputBlock = styled.div`
  width: 312px !important;
  margin-bottom: 12px;
`;
const EmailInput = styled.input`
  width: 312px;
  padding: 13px 12px;
  margin-bottom: 12px;
  height: 48px;
  font-size: 15px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fff;
  :focus {
    outline: none;
    border-color: #00c471;
  }
`;
const PWInputBox = styled.div`
  display: flex;
  padding: 13px 12px;
  height: 48px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fff;
  :focus-within {
    border-color: #00c471;
  }
`;
const PWInput = styled.input`
  width: 100%;
  padding: 0;
  font-size: 15px;
  border: 0;
  background: none;
  :focus {
    outline: none;
  }
`;

const PWToggleForm = styled.span`
  cursor: pointer;
`;
const EyeIcon = styled(FontAwesomeIcon)`
  width: 16px;
`;

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 312px;
  margin: 24px 0 !important;
  font-size: 14px;
  font-weight: 700;
  border-radius: 3px;
  background-color: #00c471;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const SignInMoreAction = styled.p`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;
const FindPW = styled.span`
  line-height: 1.38;
  font-size: 13px;
  font-weight: 400;
  color: #616568;
  border-bottom: 1px solid #858a8d;
  cursor: pointer;
`;
const SignUp = styled.span`
  line-height: 1.38;
  font-size: 13px;
  font-weight: 400;
  margin-left: 16px;
  color: #616568;
  border-bottom: 1px solid #858a8d;
  cursor: pointer;
  ::after {
    position: relative;
    right: 55px;
    display: inline-block;
    width: 1px;
    height: 10px;
    background-color: #858a8d;
    content: ' ';
    pointer-events: none;
  }
`;

const SignUpSocial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SocialLine = styled.hr`
  position: relative;
  top: 7.5px;
  margin: 0;
  width: 100%;
  height: 1px;
  background-color: #f1f3f5;
  border: none;
  display: block;
`;
const SocialTitle = styled.span`
  margin-bottom: 12px;
  padding: 0 8px;
  font-size: 11px;
  color: #abb0b5;
  z-index: 1;
  background-color: #fff;
`;
