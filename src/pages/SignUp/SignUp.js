import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import SignUpErrModal from '../../components/Modal/SignUpErrModal';
import BASE_URL from '../../config';
import KakaoLogin from '../../components/Login/KakaoLogin';
import Login from '../../components/Login/Login';
const PWGuideLineComponent = ({ message, validation }) => {
  console.log('validation:', validation);
  return <PWGuideLine validation={validation}>{message}</PWGuideLine>;
};

function SignUp() {
  /////////////////////////email////////////////////////
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [emailErrMessage, setEmailErrMessage] = useState('');

  const emailRegExp =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
    console.log('emailvalue :', e.currentTarget.value);
    if (!emailRegExp.test(email)) {
      setEmailErrMessage('이메일 형식이 올바르지 않습니다.');
      setEmailValid(false);
    } else {
      setEmailErrMessage('');
      setEmailValid(true);
    }
  };
  ////////////////////////username/////////////////////

  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [nameErrMessage, setNameErrMessage] = useState('');

  const onNameInput = e => {
    setName(e.currentTarget.value);
  };

  const NameValidation = () => {
    if (1 < name.length && name.length < 10) {
      setNameValid(true);
    } else {
      setNameErrMessage('닉네임을 입력하세요.');
      setNameValid(false);
    }
  };

  ///////////////////////password///////////////////////
  const [password, setPassword] = useState(''); //비밀번호 input
  const [passwordValid, setPasswordValid] = useState(false); //비밀번호 유효성 검사

  const [passwordErrMessage, setPasswordErrMessage] = useState([
    { id: 1, messsage: '영문/숫자/특수문자 2가지 이상 포함', validation: 0 },
    { id: 2, messsage: '8자 이상 32자 이하 입력 (공백제외)', validation: 0 },
    { id: 3, messsage: '연속 3자 이상 동일한 문자/숫자 제외', validation: 0 },
  ]);

  // 1. errMessage map 돌리기
  // 2. PWGuideLine validation 기반 스타일 바꿔주기
  // 3. passwordValidation 안에서 스테이트 바꾸기

  const passwordRegEx = {
    number: password.search(/[0-9]/g),
    english: password.search(/[a-zA-Z]/g),
    specialChar: password.search(
      /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/g
    ),
  };
  const onPasswordInput = e => {
    setPassword(e.currentTarget.value);
    console.log('PWvalue :', e.currentTarget.value);
    console.log('PWlength: ', password.length);
  };

  const passwordValidation = () => {
    //영문 숫자 특수 문자 2가지 이상 포함 검사
    if (
      (passwordRegEx.number > 0 && passwordRegEx.english > 0) ||
      (passwordRegEx.english > 0 && passwordRegEx.specialChar > 0) ||
      (passwordRegEx.specialChar > 0 && passwordRegEx.number > 0)
    ) {
      // 새 객체를 만들어서 기존의 값에 변경된 값을 덮어씀 : 기존의 값을 그대로 유지
      setPasswordErrMessage(prev =>
        prev.map(el => (el.id === 1 ? { ...el, validation: 1 } : el))
      );
      setPasswordValid(true);
    }

    //8자 이상 32자 이하 입력 (공백제외) 검사
    if (
      password.length >= 8 &&
      password.length <= 32
      // password.search(/\s/) !== -1
    ) {
      setPasswordErrMessage(prev =>
        prev.map(el => (el.id === 2 ? { ...el, validation: 1 } : el))
      );
      setPasswordValid(true);
    }

    //연속 3자 이상 동일한 문자/숫자 제외 검사
    if (/[^(\w)\1\1]/.test(password)) {
      setPasswordErrMessage(prev =>
        prev.map(el => (el.id === 3 ? { ...el, validation: 1 } : el))
      );
      setPasswordValid(true);
    } else {
      /////false 일때 validation : 2 ,,,????
      setPasswordValid(false);
    }
  };

  ///////////////////////confirm password//////////////////////
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [confirmPasswordErrMessage, setConfirmPasswordErrMessage] =
    useState('');

  const onConfirmPasswordInput = e => {
    setConfirmPassword(e.currentTarget.value);
  };

  const confirmPasswordValidation = () => {
    if (confirmPassword === password) {
      setConfirmPasswordErrMessage('');
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordErrMessage('비밀번호가 일치하지 않습니다.');
      setConfirmPasswordValid(false);
    }
  };

  /////비밀번호 숨김 OR 표출 기능
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

  /////비밀번호재확인 숨김 OR 표출 기능
  const [confirmPasswordType, setConfirmPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const handleConfirmPasswordType = e => {
    setConfirmPasswordType(() => {
      if (!confirmPasswordType.visible) {
        return { type: 'text', visible: true };
      }
      return {
        type: 'password',
        visible: false,
      };
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
  };

  const [openErrModal, setOpenErrModal] = useState(false);
  const [errModalText, setErrModalText] = useState('');

  const navigate = useNavigate();
  const onSignUp = () => {
    fetch(`${BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        user_name: name,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        if (data.message === 'SIGNUP_SUCCEEDED') {
          console.log(data.status);
          navigate('/hello');
        } else if (data.message === 'SIGNUP_FAILED: EMAIL_EXIST') {
          setOpenErrModal(true);
          setErrModalText('이미 가입한 이메일 입니다.');
        } else {
          setOpenErrModal(true);
          setErrModalText('이메일 또는 비밀번호 형식이 올바르지 않습니다.');
        }
      });
  };

  return (
    <Main>
      <Section>
        <Login />
        <Title>회원가입</Title>
        <SignUpMessages>
          <HiddenMessage>회원가입 메세지</HiddenMessage>
          <SignUpMessageSlider>
            {/* <SignUpMessage>코드런에서 가치를 높이세요</SignUpMessage>
            <SignUpMessage>나의 성장을 돕는 IT 실무 지식 플랫폼</SignUpMessage>
            <SignUpMessage>
              코드런에서 다양한 성장의 기회를 얻으세요
            </SignUpMessage>
            <SignUpMessage>성장이 목마를 때, 코드런</SignUpMessage> */}
            <SignUpMessage>나의 온라인 사수, 코드런</SignUpMessage>
          </SignUpMessageSlider>
        </SignUpMessages>

        <SignUpMain>
          <SignUpForm onSubmit={onSubmitHandler}>
            <FormInputWrapper>
              <Label for="email">이메일</Label>
              <EmailInput
                name="email"
                id="email"
                type="email"
                placeholder="example@codlearn.com"
                value={email}
                onChange={onEmailHandler}
              ></EmailInput>
              <FormErrEmail>{emailErrMessage}</FormErrEmail>
            </FormInputWrapper>
            <FormInputWrapper>
              <Label for="name">이름</Label>
              <NameInput
                name="name"
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={onNameInput}
                onKeyUp={NameValidation}
              ></NameInput>
              <FormErrEmail>{emailErrMessage}</FormErrEmail>
            </FormInputWrapper>
            <FormInputWrapper>
              <Label for="password">비밀번호</Label>
              <PWInputBlock>
                <PWInput
                  name="password"
                  id="password"
                  type={passwordType.type}
                  placeholder="******"
                  value={password}
                  onChange={onPasswordInput}
                  onKeyUp={passwordValidation}
                ></PWInput>
                <PWToggleForm onClick={handlePasswordType}>
                  {passwordType.visible ? (
                    <StyledFontAwesomeIcon
                      icon={faEyeSlash}
                    ></StyledFontAwesomeIcon>
                  ) : (
                    <StyledFontAwesomeIcon icon={faEye}></StyledFontAwesomeIcon>
                  )}
                </PWToggleForm>
              </PWInputBlock>
              <PWGuideLineAria>
                {passwordErrMessage.map(obj => (
                  <PWGuideLineComponent
                    validation={obj?.validation}
                    message={obj?.messsage}
                  ></PWGuideLineComponent>
                ))}
              </PWGuideLineAria>
            </FormInputWrapper>
            <FormInputWrapper>
              <Label for="ConfirmPassword">비밀번호 확인</Label>
              <PWInputBlock>
                <PWInput
                  name="ConfirmPassword"
                  id="ConfirmPassword"
                  type={confirmPasswordType.type}
                  placeholder="******"
                  value={confirmPassword}
                  onChange={onConfirmPasswordInput}
                  onKeyUp={confirmPasswordValidation}
                ></PWInput>
                <PWToggleForm onClick={handleConfirmPasswordType}>
                  {confirmPasswordType.visible ? (
                    <StyledFontAwesomeIcon
                      icon={faEyeSlash}
                    ></StyledFontAwesomeIcon>
                  ) : (
                    <StyledFontAwesomeIcon icon={faEye}></StyledFontAwesomeIcon>
                  )}
                </PWToggleForm>
              </PWInputBlock>
              <PWConfirmErr>{confirmPasswordErrMessage}</PWConfirmErr>
            </FormInputWrapper>
            <SignUpButton onClick={onSignUp}>가입하기</SignUpButton>
            {openErrModal && (
              <SignUpErrModal
                setOpenErrModal={setOpenErrModal}
                text={errModalText}
              />
            )}
            <SignUpFooter>
              <FooterFolicy>
                가입 시, 통합 계정으로 코드런이 제공하는 서비스를 모두 이용하실
                수 있습니다.
                <StyledLink to=""> 통합 계정</StyledLink> 및 서비스 이용약관 (
                <StyledLink to=""> 코드런</StyledLink> /
                <StyledLink to=""> 랠릿 </StyledLink> ),
                <StyledLink to=""> 개인정보취급방침 </StyledLink>에 동의합니다.
              </FooterFolicy>
              <AllowMarketing>
                <label for="allowMarketing">
                  통합회원 할인 혜택 및 유용한 채용 소식을 받아볼래요.
                </label>
                <CheckBoxInput type="checkbox" id="allowMarketing" />
              </AllowMarketing>
            </SignUpFooter>
          </SignUpForm>
          <SignUpSocial>
            <SocialLine />
            <SocialTitle>간편 회원가입</SocialTitle>
            <KakaoLogin></KakaoLogin>
          </SignUpSocial>
        </SignUpMain>
      </Section>
    </Main>
  );
}

export default SignUp;

const Main = styled.main`
  min-height: 800px;
  line-height: 1.5;
`;
const Section = styled.section`
  width: 320px;
  margin: 64px auto auto;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 500;
  font-size: 26px;
`;
const SignUpMessages = styled.aside`
  margin-bottom: 24px;
  text-align: center;
`;

const HiddenMessage = styled.h3`
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  z-index: -1;
`;
const SignUpMessageSlider = styled.div``;
const SignUpMessage = styled.p``;
const SignUpMain = styled.div``;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormInputWrapper = styled.div`
  margin-bottom: 16px;
`;
const Label = styled.label`
  letter-spacing: -0.3px;
  font-size: 14px;
  font-weight: 400;
  color: #3e4042;
`;
const EmailInput = styled.input`
  appearance: none;
  margin-top: 4px;
  padding: 13px 12px;
  width: 320px;
  font-size: 15px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fff;
  :focus {
    outline: none;
    border-color: #00c471;
  }
`;
const NameInput = styled.input`
  appearance: none;
  margin-top: 4px;
  padding: 13px 12px;
  width: 320px;
  font-size: 15px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fff;
  :focus {
    outline: none;
    border-color: #00c471;
  }
`;
const FormErrEmail = styled.span`
  font-size: 12px;
  color: #e5503c;
`;
const PWInputBlock = styled.div`
  display: flex;
  padding: 9.5px 12px;
  margin-top: 4px;
  width: 320px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fff;
  align-items: center;
  :focus-within {
    border-color: #00c471;
  }
`;
const PWInput = styled.input`
  padding: 0;
  width: 100%;
  font-size: 15px;
  margin-right: 12px;
  border: 0;
  :focus {
    outline: none;
  }
`;

const PWToggleForm = styled.span`
  cursor: pointer;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 16px;
`;
const PWGuideLineAria = styled.p`
  display: flex;
  flex-direction: column;
`;
const PWGuideLine = styled.span`
  font-weight: 400;
  line-height: 1.5;
  font-size: 12px;
  color: #abb0b5;
  color: ${props =>
    props.validation === 0
      ? '#abb0b5'
      : props.validation === 1
      ? '#00c471'
      : '#e5503c'};
`;

const PWConfirmErr = styled.span`
  font-weight: 400;
  line-height: 1.5;
  font-size: 12px;
  color: #e5503c;
`;
const SignUpButton = styled.button`
  -webkit-appearance: none;
  height: 48px;
  margin: 16px 0 12px;
  border: 1px solid #fff;
  padding: 0 16px;
  border-color: #00c471;
  font-weight: 700;
  font-size: 15px;
  background-color: #00c471;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;
const SignUpFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;
const FooterFolicy = styled.span`
  line-height: 1.5;
  letter-spacing: -0.3px;
  font-size: 12px;
  margin-bottom: 6px;
  color: #858a8d;
`;
const StyledLink = styled(Link)`
  color: #1964d5;
  text-decoration: none;
  cursor: pointer;
`;
const AllowMarketing = styled.p`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  font-size: 16px;
  margin: 0;
  label {
    line-height: 1.5;
    letter-spacing: -0.03px;
    font-size: 12px;
    margin-left: 4px;
    color: #858a8d;
  }
`;
const CheckBoxInput = styled.input`
  margin: 0;
  vertical-align: baseline;
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
  margin-bottom: 16px;
  padding: 0 8px;
  font-size: 11px;
  color: #abb0b5;
  z-index: 1;
  background-color: #fff;
`;
