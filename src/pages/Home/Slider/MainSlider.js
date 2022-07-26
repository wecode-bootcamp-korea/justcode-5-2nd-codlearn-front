import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faCaretRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function MainSlider() {
  const items = [
    {
      id: 1,
      color: '#38e5ff',
      label: '첫번째',
      maincontent: '첫번째입니다',
      subcontent:
        '강의입니다. 추천해요! 들어보세요!\n 매일 업데이트 되는 코드런 신규강의를 만나보세요!',
      gif: 'https://icons8.com/icon/g7FGqx8h2AxR/선물',
      button: '첫번째배너 🎁',
    },
    {
      id: 2,
      color: '#ffcb6b',
      label: '두번째',
      maincontent: '두번째입니다',
      subcontent:
        '강의입니다. 추천해요! 들어보세요!\n 매일 업데이트 되는 코드런 신규강의를 만나보세요!',
      button: '두번째배너',
    },
    {
      id: 3,
      color: '#929292',
      label: '세번째',
      maincontent: '세번째입니다',
      subcontent:
        '강의입니다. 추천해요! 들어보세요!\n 매일 업데이트 되는 코드런 신규강의를 만나보세요!',
      button: '세번째배너',
    },
    {
      id: 4,
      color: '#ff7836',
      label: '네번째',
      maincontent: '네번째입니다',
      subcontent:
        '강의입니다. 추천해요! 들어보세요!\n 매일 업데이트 되는 코드런 신규강의를 만나보세요!',
      button: '네번째배너 😎',
    },
    {
      id: 5,
      color: '#6ccad0',
      label: '다섯번째',
      maincontent: '다섯번째입니다',
      subcontent:
        '강의입니다. 추천해요! 들어보세요!\n 매일 업데이트 되는 코드런 신규강의를 만나보세요!',
      button: '다섯번째배너',
    },
    {
      id: 6,
      color: '#ff627f',
      label: '여섯번째',
      maincontent: '여섯번째입니다',
      subcontent:
        '강의입니다. 추천해요! 들어보세요!\n 매일 업데이트 되는 코드런 신규강의를 만나보세요!',
      button: '여섯번째배너',
    },
    {
      id: 7,
      color: '#086394',
      label: '마지막',
      maincontent: '마지막입니다',
      subcontent:
        '강의입니다. 추천해요! 들어보세요!\n 매일 업데이트 되는 코드런 신규강의를 만나보세요!',
      button: '마지막배너',
    },
  ];
  const itemsLength = items.length;
  const [slideIndex, setSlideIndex] = useState(1);
  const [pause, setPause] = useState(false);
  const sliderContainerRef = useRef();
  const sliderRef = useRef();

  const addSlide = () => {
    let addFront = [];
    let addLast = [];
    addFront.unshift(items[items.length - 1]);
    addLast.push(items[0]);
    return [...addFront, ...items, ...addLast];
  };
  const newSlide = addSlide();
  const slidelength = newSlide.length;

  const clickPrev = () => {
    if (slideIndex <= 0) {
      sliderContainerRef.current.style.transform = `translateX(-100vw)`;
      sliderContainerRef.current.style.transition = 'transform 0s';
      //setSlideIndex(0);
      //setSlideIndex(prev => prev - 1);
    } else {
      sliderContainerRef.current.style.transform = `translateX(-${
        (slideIndex - 2) * 100
      }vw)`;
      sliderContainerRef.current.style.transition = 'transform 0.5s ease-in';
      setSlideIndex(prev => prev - 1);
      console.log(sliderContainerRef.current.style.transform);
    }
  };
  //(slideIndex + 1) * 100
  const clickNext = () => {
    sliderContainerRef.current.style.transform = `translateX(-${
      slideIndex * 100
    }vw)`;
    sliderContainerRef.current.style.transition = 'transform 1s ease-in';
    setSlideIndex(prev => prev + 1);
    console.log(sliderContainerRef.current.style.transform);
  };

  const clickPause = () => {
    setPause(!pause);

    //setSlideIndex(10);
  };

  const showIndex = () => {
    if (slideIndex < 8) {
      if (slideIndex <= 0) {
        sliderContainerRef.current.style.transform = `translateX(-600vw)`;
        setSlideIndex(7);
      } else {
        return slideIndex;
      }
    } else {
      sliderContainerRef.current.style.transform = `translateX(-800vw)`;
      return 1;
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (slideIndex < slidelength - 1) {
        setSlideIndex(prev => prev + 1);
        sliderContainerRef.current.style.transition = 'transform 0.5s ease-in';
        sliderContainerRef.current.style.transform = `translateX(-${
          slideIndex * 100
        }vw)`;
      }
    }, 2000);
    if (slideIndex >= slidelength - 1) {
      setTimeout(() => {
        sliderContainerRef.current.style.transition = 'transform 0s';
        sliderContainerRef.current.style.transform = `translateX(-0vw)`;
        setSlideIndex(1);
      }, 300);
    }

    return () => {
      clearInterval(timer);
      clearTimeout();
    };
  }, [slideIndex, slidelength, pause]);

  return (
    <SliderWrap>
      <SliderContainer ref={sliderContainerRef}>
        {newSlide.map((data, index) => (
          <Slider
            key={index}
            style={{ background: data.color }}
            ref={sliderRef}
          >
            <SliderText>
              <div className="mainContent">
                <span className="slideLabel">{data.label}</span>
                {data.maincontent}
                <div className="subContent">{data.subcontent}</div>
              </div>
            </SliderText>
          </Slider>
        ))}
      </SliderContainer>
      <ButtonWrap>
        <ButtonCenter>
          <MoveButtonBox>
            <BannerIndex>
              {showIndex()}/{itemsLength}
            </BannerIndex>
            <ButtonIcon>
              <PrevButton onClick={clickPrev}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </PrevButton>
              <PauseButton
                onClick={() => {
                  clickPause();
                }}
              >
                {!pause ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faCaretRight} />
                )}
              </PauseButton>
              <NextButton onClick={clickNext}>
                <FontAwesomeIcon icon={faAngleRight} />
              </NextButton>
            </ButtonIcon>
          </MoveButtonBox>
          <PageButtonBox>
            {items.map(data => {
              let btnIndex = slideIndex => {
                if (slideIndex === 8) {
                  return (slideIndex = 1);
                } else {
                  return slideIndex;
                }
              };
              return (
                <PageButton
                  key={data.id}
                  className={data.id === btnIndex(slideIndex) && 'select'}
                  onClick={() => {
                    sliderContainerRef.current.style.transform = `translateX(-${
                      (data.id - 1) * 100
                    }vw)`;
                    sliderContainerRef.current.style.transition =
                      'transform 0.5s ease-in';
                    setSlideIndex(data.id);
                  }}
                >
                  {data.button}
                </PageButton>
              );
            })}
          </PageButtonBox>
        </ButtonCenter>
      </ButtonWrap>
    </SliderWrap>
  );
}

const SliderWrap = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid rgb(206, 212, 218);
`;

const SliderContainer = styled.div`
  display: flex;
  width: 900vw;
`;

const Slider = styled.div`
  width: 100vw;
  height: 320px;
  transform: translateX(-100vw);
`;

// slider contents
const SliderText = styled.div`
  display: flex;
  align-items: center;
  max-width: 1130px;
  height: 100%;
  margin: 0 auto;
  color: white;
  div {
    width: 100%;
    white-space: pre-line;
  }
  .slideLabel {
    position: absolute;
    padding: 5px 10px;
    top: 65px;
    border-radius: 10px;
    background-color: #1dc078;
    font-size: small;
    font-weight: 600;
  }
  .mainContent {
    margin-top: 40px;
    font-size: 45px;
    font-weight: 900;
    &:nth-child(4) {
      color: black;
    }
  }
  .subContent {
    margin-top: 30px;
    font-size: medium;
    font-weight: 500;
    line-height: 25px;
  }
`;

// slider button
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;
const ButtonCenter = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 1130px;
`;
const Button = styled.button`
  text-align: center;
  cursor: pointer;
`;

// slider button - index / prev&next / play&pause
const MoveButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 130px;
  height: 36px;
  padding: 5px 10px 5px 15px;
  line-height: 36px;
  border-radius: 20px;
  color: white;
  background-color: gray;
  ${Button} {
    color: white;
    border: none;
    background: none;
  }
`;
const ButtonIcon = styled.div`
  width: 60px;
  line-height: 25px;
  ${Button} {
    width: 33.333%;
  }
`;
const BannerIndex = styled.div`
  margin-right: 10px;
  line-height: 26px;
  font-size: small;
  font-weight: 500;
  letter-spacing: 2px;
`;

const PrevButton = styled(Button)``;
const NextButton = styled(Button)``;
const PauseButton = styled(Button)``;

// slider button - pagenation
const PageButtonBox = styled.div``;
const PageButton = styled(Button)`
  height: 36px;
  margin-right: 10px;
  padding: 5px 20px;
  border-radius: 20px;
  color: #495057;
  font-weight: 600;
  border: 1.5px solid rgb(206, 212, 218);
  background-color: white;
  &:last-child {
    margin-right: 0px;
  }
  &.select {
    color: #1dc078;
    font-weight: 800;
    border: 2px solid #1dc078;
  }
`;
export default MainSlider;
