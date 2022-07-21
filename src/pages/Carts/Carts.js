import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faX } from '@fortawesome/free-solid-svg-icons';
library.add(faX);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1160px;
  max-width: 1160px;
  margin: 0 auto;
`;

const LeftCart = styled.div`
  width: 828px;
  max-width: 828px;
  margin-right: 32px;
  margin-bottom: 120px;
`;

const CartName = styled.div`
  font-size : 24px;
  font-weight: 700;
  color: #1b1c1d;
  padding-top: 32px;
  padding-bottom: 16px;
`;

const LeftCartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #1b1c1d;
  padding-bottom: 12px;
`;

const LeftCartHeaderLeft = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

const SelectAll = styled.span`
  height: 22px;
  color: #1b1c1d;
`;

const ListCount = styled.span`
  height: 25px;
  font-size: 16px;
  font-weight: 400;
  color: #858a8d;
  padding-left: 4px;
`;

const ListSelected = styled.span`
  color: #00c471;
`;

const LeftCartHeaderButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  color: #495057;
  background: #fff;
  border: 1px solid #d5dbe2;
  border-radius: 4px;
  padding: 0 12px;
  cursor: pointer;

  div {
    width: 14px;
    height: 14px;
    margin-left: 4px;
  }
`;

const RightCart = styled.div`
  width: 300px;
  max-width: 300px;
  min-width: 300px;
  padding-top: 32px;
`;

function Carts() {
  return (
    <Wrapper>
      <LeftCart>
        <CartName>수강바구니</CartName>
        <div>
          <LeftCartHeader>
            <LeftCartHeaderLeft>
              <input type='checkbox' id='cb1'/>
              <label for='cb1'></label>
              <SelectAll>전체선택</SelectAll>
              <ListCount>
                <ListSelected>6</ListSelected>
                /
                <span>6</span>
              </ListCount>
            </LeftCartHeaderLeft>
            <LeftCartHeaderButton>
              선택삭제
              <div>
                <FontAwesomeIcon icon="fa-solid fa-x" />
              </div>
            </LeftCartHeaderButton>
          </LeftCartHeader>
          <div>
            <div>
              <input type='checkbox' />
            </div>
            <div>이미지</div>
            <div>
              <div>강의제목</div>
              <div>저자 | 기간</div>
            </div>
            <div>
              <div>삭제버튼</div>
            </div>
            <div>
              <span>가격</span>
            </div>
          </div>
        </div>
      </LeftCart>
      <RightCart>
        <div>
          <div>
            <span>
              <div>구매자정보</div>
              <div>?</div>
            </span>
            <div>저장</div>
          </div>
          <div>
            <div>
              이름
              <span>*</span>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
          <div>
              이메일
              <span>*</span>
            </div>
            <div>
              <input />
            </div>
          </div>
          <div>
            <div>
              휴대폰 번호
              <span>*</span>
              (숫자만 입력)
            </div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      +82
                    </div>
                    <svg></svg>
                  </div>
                  <ul>
                    <li>
                      <p>+82</p>
                      <p>대한민국</p>
                    </li>
                    <li>
                      <p>+81</p>
                      <p>일본</p>
                    </li>
                    <li>
                      <p>+1</p>
                      <p>미국</p>
                    </li>
                    <li>
                      <p>+49</p>
                      <p>독일</p>
                    </li>
                    <li>
                      <p>+61</p>
                      <p>오스트레일리아</p>
                    </li>
                    <li>
                      <p>+52</p>
                      <p>멕시코</p>
                    </li>
                    <li>
                      <p>+32</p>
                      <p>벨기에</p>
                    </li>
                    <li>
                      <p>+55</p>
                      <p>브라질</p>
                    </li>
                    <li>
                      <p>+44</p>
                      <p>영국</p>
                    </li>
                  </ul>
                </div>
                <input />
              </div>
              <div>
                인증요청
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <span>쿠폰</span>
                  <div>
                    <svg></svg>
                  </div>
                  <span>사용가능</span>
                  <span>0</span>
                </div>
                <div>
                  <div>
                    <input />
                  </div>
                  <div>쿠폰선택</div>
                </div>
              </div>
              <div>
              <div>
                  <span>포인트</span>
                  <div>
                    <svg></svg>
                  </div>
                  <span>보유</span>
                  <span>0</span>
                </div>
                <div>
                  <div>
                    <input />
                  </div>
                  <div>전액사용</div>
                </div>
              </div>
              <div>
                <span>선택상품 금액</span>
                <div>
                  <span>415800</span>
                  <span>원</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <span>할인금액</span>
                    <svg></svg>
                  </div>
                  <div>
                    <span>-35750</span>
                    <span>원</span>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                      <div>- 즉시할인</div>
                      <div>
                        <span>-35750</span>
                        <span>원</span>
                      </div>
                    </div>
                    <div>
                    <div>- 쿠폰할인</div>
                      <div>
                        <span>0</span>
                        <span>원</span>
                      </div>
                    </div>
                    <div>
                    <div>- 포인트사용</div>
                      <div>
                        <span>0</span>
                        <span>잎</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <span>총 결제금액</span>
                <div>
                  <span>380050</span>
                  <span>원</span>
                </div>
              </div>
              <div>
                <i></i>
                <span>15%</span>
                할인받기
              </div>
              <div>결제하기</div>
            </div>
            <div>
              <div>
                <label>
                  회원 본인은 주문내용을 확인했으며, 
                  <span>구매조건 및 개인정보취급방침</span>
                  과 결제에 동의합니다.
                </label>
              </div>
            </div>
          </div>
          <div>
            <div>
              <i></i>
              <span>문의 바로가기</span>
            </div>
          </div>
        </div>
      </RightCart>
    </Wrapper>
  );
}

export default Carts;
