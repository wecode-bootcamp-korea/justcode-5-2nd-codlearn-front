import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  const navigate = useNavigate();

  const API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const KAKAO_CODE = new URL(window.location.href).searchParams.get('code');

  const getLoginToken = () => {
    fetch(` http://localhost:8000/user/kakao/request/`, {
      // method: 'GET',
      // headers: {
      //   Authorization: kakaoToken,
      // },
    })
      .then(res => res.json())
      .then(data => {
        //data 아니고 쿼리로
        if (data => data.access_token) {
          localStorage.setItem('token', data.access_token);
        } else {
          navigate('/');
        }
      });
  };

  const saveLoginToken = loginToken => {
    localStorage.setItem('loginToken', loginToken);
  };

  const goToMain = () => {
    navigate('/');
  };

  return null;

  // useEffect(() => {
  //   getKakaoToken();
  // }, []);

  // const getKakaoToken = () => {
  //   fetch('https://kauth.kakao.com/oauth/authorize', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //     },
  //     body: `grant_type=authorization_code&client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       sendData(data);
  //     });

  //   const sendData = async data => {
  //     await fetch(`http://localhost:10010/user/kakao/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       params: {
  //         grant_type: 'authorization_code',
  //         client_id: API_KEY,
  //         redirect_uri: REDIRECT_URI,
  //         code: KAKAO_CODE,
  //       },
  //     })
  //       .then(res => res.json())
  //       .then(res => {
  //         if (!res.token) return;
  //         localStorage.setItem('token', res.token);
  //         navigate('/');
  //       });
  //   };
  // };
}

export default KakaoLogin;
