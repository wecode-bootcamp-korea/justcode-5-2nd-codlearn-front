import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../../ApiOrigin';

const PWGuideLineComponent = ({ message, validation }) => {
  console.log('validation:', validation);
  return <PWGuideLine validation={validation}>{message}</PWGuideLine>;
};

function SignUp() {
  const [email, setEmail] = useState(''); //이메일 input
  const [emailValid, setEmailValid] = useState(false); //이메일 유효성 검사
  const [emailErrMessage, setEmailErrMessage] = useState(''); // 이메일 에러 메시지

  const emailRegExp =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
    console.log('emailvalue :', event.currentTarget.value);

    if (!emailRegExp.test(email)) {
      setEmailErrMessage('이메일 형식이 올바르지 않습니다.');
      setEmailValid(false);
    } else {
      setEmailErrMessage('');
      setEmailValid(true);
    }
  };

  const [password, setPassword] = useState(''); //비밀번호 input
  const [passwordValid, setPasswordValid] = useState(false); //비밀번호 유효성 검사

  const [passwordErrMessage, setPasswordErrMessage] = useState([
    { id: 1, messsage: '영문/숫자/특수문자 2가지 이상 포함', validation: 0 },
    { id: 2, messsage: '8자 이상 32자 이하 입력 (공백제외)', validation: 0 },
    { id: 3, messsage: '연속 3자 이상 동일한 문자/숫자 제외', validation: 0 },
  ]);

  // 1. errMessage map 돌리기
  // 2. PWGuideLine validation 기반 스타일 바꿔주기
  // 3. onPasswordHandle 안에서 스테이트 바꾸기

  const passwordRegEx = {
    number: password.search(/[0-9]/g),
    english: password.search(/[a-zA-Z]/g),
    specialChar: password.search(
      /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\']/g
    ),
  };

  console.log('passwordErrMessage: ', passwordErrMessage);
  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
    console.log('PWvalue :', event.currentTarget.value);
    console.log('PWlength: ', password.length);
    ////////영문 숫자 특수 문자 2가지 이상 포함 검사
    if (
      (passwordRegEx.number > 0 && passwordRegEx.english > 0) ||
      (passwordRegEx.english > 0 && passwordRegEx.specialChar > 0) ||
      (passwordRegEx.specialChar > 0 && passwordRegEx.number > 0)
    ) {
      setPasswordErrMessage(prev =>
        prev.map(el => (el.id === 1 ? { ...el, validation: 1 } : el))
      ); // 새 객체를 만들어서 기존의 값에 변경된 값을 덮어씀 : 기존의 값을 그대로 유지
      setPasswordValid(true);
    }

    ////////8자 이상 32자 이하 입력 (공백제외) 검사
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

    ////////연속 3자 이상 동일한 문자/숫자 제외 검사
    if (/[^(\w)\1\1]/.test(password)) {
      setPasswordErrMessage(prev =>
        prev.map(el => (el.id === 3 ? { ...el, validation: 1 } : el))
      );
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const [confirmPasswordErrMessage, setConfirmPasswordErrMessage] =
    useState('');

  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
    if (password === confirmPassword) {
      setConfirmPasswordErrMessage('');
      setConfirmPasswordValid(true);
    } else {
      setConfirmPasswordErrMessage('비밀번호가 일치하지 않습니다.');
      setConfirmPasswordValid(false);
    }
  };

  const [passwordType, setPasswordType] = useState({
    type: 'password',
    visible: false,
  });

  const [confirmPasswordType, setConfirmPasswordType] = useState({
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

  const onSubmitHandler = () => {
    if

  };

  return (
    <Main>
      <Section>
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
              <Label for="password">비밀번호</Label>
              <PWInputBlock>
                <PWInput
                  name="password"
                  id="password"
                  type={passwordType.type}
                  placeholder="******"
                  value={password}
                  onChange={event => onPasswordHandler(event)}
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
                  onChange={onConfirmPasswordHandler}
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
            <SignUpButton>가입하기</SignUpButton>
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
            <SocialSignUpBtn>
              <KakaoSVG></KakaoSVG>
            </SocialSignUpBtn>
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
const FormErrEmail = styled.span`
  font-size: 12px;
  color: #e5503c;
`;
const PWInputBlock = styled.div`
  display: flex;
  padding: 13px 12px;
  margin-top: 4px;
  width: 320px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  background-color: #fff;
  align-items: center;
  :focus {
    outline: none;
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
  width: 16;
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
const SocialSignUpBtn = styled.button`
  width: 50px;
  height: 50px;
  margin-top: 4px;
`;
const KakaoSVG = styled.svg``;
