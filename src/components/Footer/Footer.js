import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faN, faB } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faYoutube, faFacebookF } from '@fortawesome/free-brands-svg-icons';
library.add(faN, faB, faInstagram, faYoutube, faFacebookF);

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterTop>
          <div>
            <FooterListTitle>
              코드런
            </FooterListTitle>
            <FooterSubList>
              <div>공지사항</div>
              <div>코드런 소개</div>
              <div>코드랩 실Log</div>
              <div>코드랩 채용</div>
            </FooterSubList>
          </div>
          <div>
            <FooterListTitle>
              고객센터
            </FooterListTitle>
            <FooterSubList>
              <div>자주묻는 질문</div>
              <div>수료증 확인</div>
              <div>이용약관</div>
              <div>개인정보취급방침</div>
              <div>저작권 신고센터</div>
            </FooterSubList>
          </div>
          <div>
            <FooterListTitle>
              신청하기
            </FooterListTitle>
            <FooterSubList>
              <div>지식공유참여</div>
              <div>코드런 비즈니스</div>
              <div>코드런 X 대학교</div>
              <div>코드런 X AWS 제휴</div>
            </FooterSubList>
          </div>
          <div>
            <FooterListTitle>
              학습하기
            </FooterListTitle>
            <FooterSubList>
              <div>IT 프로그래밍</div>
              <div>크리에이티브</div>
              <div>업무스킬</div>
              <div>수강코드 등록</div>
            </FooterSubList>
          </div>
          <div>
            <FooterListTitle>
              커뮤니티
            </FooterListTitle>
            <FooterSubList>
              <div>학습로드맵</div>
              <div>질문 & 답변</div>
              <div>수강평 모아보기</div>
              <div>강의 · 기능요청</div>
            </FooterSubList>
          </div>
        </FooterTop>
        <FooterBottom>
          <div>
            <FooterInfoTop>
              <img alt='Logo' src='/images/logo.png'/>
              <div>개인정보취급방침</div>
              <div>이용약관</div>
            </FooterInfoTop>
            <FooterInfoBottom>
              <InfoBottomFisrt>
                <span>주식회사 그레이스풀레인</span>
                <div>대표자: 송은우</div>
                <div>사업자번호: 530-81-01310</div>
                <div>사업자 정보 확인</div>
              </InfoBottomFisrt>
              <InfoBottomSecond>
                <span>통신판매업: 2018-성남분당B-0062</span>
                <div>개인정보보호책임자: 이소헌</div>
                <div>이메일: code@codlearn.com</div>
              </InfoBottomSecond>
              <div>
                <div>주소: 서울특별시 강남구 테헤란로 427, 위워크타워</div>
              </div>
            </FooterInfoBottom>
            <Rights>
              <div>©CODLAB. ALL RIGHTS RESERVED</div>
            </Rights>
          </div>
          <FooterBottomRight>
            <FooterIcon>
              <div>
                <FontAwesomeIcon icon="fa-solid fa-n" />
              </div>
            </FooterIcon>
            <FooterIcon>
              <div>
                <FontAwesomeIcon icon="fa-solid fa-b" />
              </div>
            </FooterIcon>
            <FooterIcon>
              <div>
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </div>
            </FooterIcon>
            <FooterIcon>
              <div>
                <FontAwesomeIcon icon="fa-brands fa-youtube" />
              </div>
            </FooterIcon>
            <FooterIcon>
              <div>
                <FontAwesomeIcon icon="fa-brands fa-facebook-f" />
              </div>
            </FooterIcon>
          </FooterBottomRight>
        </FooterBottom>
      </FooterWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  background: #303740;
  color: #bdbdbd;
`;

const FooterWrapper = styled.div`
  max-width: 1152px;
  margin: 0 auto;
  background: #303740;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 20px;
  border-bottom: 1px solid #444;
`;

const FooterListTitle = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #eee;
  padding: 16px 0;
`;

const FooterSubList = styled.div`
  font-size: 14px;
  
  div {
    margin: 0 0 10px 0;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 20px;
`;

const FooterInfoTop = styled.div`
  display: flex;
  align-items: end;
  margin: 0 0 12px 0;

  img {
    width: 86px;
    height: 20px;
  }

  div {
    font-size: 12px;
    font-weight: 700;
    margin: 0 0 0 16px;
    padding: 0 0 0 12px;
    border-left: 1px solid #bdbdbd;
  }
`;

const FooterInfoBottom = styled.div`
  font-size: 12px;
`;

const Rights = styled.div`
  margin: 12px 0 0 0;
  font-size: 12px;
`;

const InfoBottomFisrt = styled.div`
  display: flex;
  margin: 0 0 4px 0;

  div {
    margin: 0 0 0 6px;
    padding: 0 0 0 6px;
    border-left: 1px solid #bdbdbd;
  }
`;

const InfoBottomSecond = styled.div`
  display: flex;
  margin: 0 0 4px 0;

  div {
    margin: 0 0 0 6px;
    padding: 0 0 0 6px;
    border-left: 1px solid #bdbdbd;
  }
`;

const FooterBottomRight = styled.div`
  display: flex;
  align-items: center;
`;

const FooterIcon = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    margin: 0 10px 0 0;
    color: black;
    border: 1px solid transparent;
    border-radius: 20px;
    background: #bdbdbd;
  }
`;

export default Footer;
