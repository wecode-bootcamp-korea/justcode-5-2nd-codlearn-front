import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as oAuth from '../Login/OAuth';

function KakaoLogin() {
  const CLIENT_ID = process.env.REACT_APP_REST_API_KEY;

  const requestURL = `${oAuth.KAKAO_AUTH_URL}/?client_id=${CLIENT_ID}&redirect_uri=${oAuth.REDIRECT_URI}&response_type=code`;

  const onClick = () => {
    window.open(requestURL);
  };

  return (
    <SocialSignUpBtn onClick={onClick}>
      <KakaoLogo src="images/kakao_login.png" alt="logo" />
    </SocialSignUpBtn>
  );
}

export default KakaoLogin;

const SocialSignUpBtn = styled.button`
  width: 50px;
  height: 50px;
  margin-top: 4px;
  padding: 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;
const KakaoLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 6px;
`;
