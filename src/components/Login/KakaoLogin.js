import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../config';
import styled from 'styled-components';

function KakaoLogin() {
  const navigate = useNavigate();

  const onKakaoLogin = async () => {
    console.log('onKakaoLogin start');
    await fetch(`${BASE_URL}/user/kakao/request`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.redirected) {
          window.location.href = res.url;
        }
      })
      .catch(function (err) {
        console.info(err + ' url: ' + `${BASE_URL}/user/kakao/request`);
      });
  };

  return (
    <SocialSignUpBtn onClick={onKakaoLogin}>
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
