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
      color: '#89a52a',
      maincontent: '첫번째입니다',
      subcontent: '강의입니다. 추천해요 들어보세요 어쩌고 저쩌고',
      button: '첫번째배너 🎁',
    },
    {
      color: '#ffcb6b',
      maincontent: '두번째입니다',
      subcontent: '강의입니다. 추천해요 들어보세요 어쩌고 저쩌고',
      button: '두번째배너',
    },
    {
      color: '#929292',
      maincontent: '세번째입니다',
      subcontent: '강의입니다. 추천해요 들어보세요 어쩌고 저쩌고',
      button: '세번째배너',
    },
    {
      color: '#ffe4e1',
      maincontent: '네번째입니다',
      subcontent: '강의입니다. 추천해요 들어보세요 어쩌고 저쩌고',
      button: '네번째배너 😎',
    },
    {
      color: '#6ccad0',
      maincontent: '다섯번째입니다',
      subcontent: '강의입니다. 추천해요 들어보세요 어쩌고 저쩌고',
      button: '다섯번째배너',
    },
    {
      color: '#ff627f',
      maincontent: '여섯번째입니다',
      subcontent: '강의입니다. 추천해요 들어보세요 어쩌고 저쩌고',
      button: '여섯번째배너',
    },
    {
      color: '#a5ea89',
      maincontent: '마지막입니다',
      subcontent: '강의입니다. 추천해요 들어보세요 어쩌고 저쩌고',
      button: '마지막배너',
    },
  ];
  const itemsLength = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [stop, setStop] = useState(false);
  const sliderContainerRef = useRef();
  const sliderRef = useRef();

  const addSlide = () => {
    let addFront = [];
    let addLast = [];
    addFront.unshift(items[itemsLength - 1]);
    addLast.push(items[0]);
    return [...addFront, ...items, ...addLast];
  };
  const newSlide = addSlide();
  const slidelength = newSlide.length;

  const clickPrev = () => {
    console.log('prev클릭');
    sliderContainerRef.current.style.transform = `translateX(-${
      (slideIndex - 1) * 100
    }vw)`;
    sliderContainerRef.current.style.transition = 'transform 0.5s ease-in';
    setSlideIndex(prev => prev - 1);
  };

  const clickNext = () => {
    console.log('next클릭');
    sliderContainerRef.current.style.transform = `translateX(-${
      (slideIndex + 1) * 100
    }vw)`;
    sliderContainerRef.current.style.transition = 'transform 0.5s ease-in';
    setSlideIndex(prev => prev + 1);
  };

  const clickStop = () => {
    console.log('stop클릭');
    //setStop(!stop);
    setSlideIndex(10);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideIndex < slidelength - 1) {
        setSlideIndex(prev => prev + 1);
        sliderContainerRef.current.style.transform = `translateX(-${
          slideIndex * 100
        }vw)`;
        sliderContainerRef.current.style.transition = 'transform 1s ease-in';
      } else if (slideIndex === slidelength - 1) {
        sliderContainerRef.current.style.transition = 'transform 0s ease-in';
        sliderContainerRef.current.style.transform = `translateX(-0vw)`;
        setSlideIndex(1);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [slideIndex]);

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
              {slideIndex}/{itemsLength}
            </BannerIndex>
            <PrevButton onClick={clickPrev}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </PrevButton>
            <StopButton
              onClick={() => {
                clickStop();
              }}
            >
              {!stop ? (
                <FontAwesomeIcon icon={faPause} />
              ) : (
                <FontAwesomeIcon icon={faCaretRight} />
              )}
            </StopButton>
            <NextButton onClick={clickNext}>
              <FontAwesomeIcon icon={faAngleRight} />
            </NextButton>
          </MoveButtonBox>
          <BannerButtonBox>
            {items.map((data, index) => (
              <BannerButton
                key={index}
                className={index === slideIndex - 1 && 'select'}
                onClick={() => {
                  sliderContainerRef.current.style.transform = `translateX(-${
                    index * 100
                  }vw)`;
                  sliderContainerRef.current.style.transition =
                    'transform 1s ease-in';
                  setSlideIndex(index);
                }}
              >
                {data.button}
              </BannerButton>
            ))}
          </BannerButtonBox>
        </ButtonCenter>
      </ButtonWrap>
    </SliderWrap>
  );
}

const SliderWrap = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid rgb(206, 212, 218);
  overflow: hidden;
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

const SliderText = styled.div`
  display: flex;
  align-items: center;
  width: 1130px;
  height: 100%;
  margin: 0 auto;
  color: white;
  div {
    width: 100%;
  }
  .mainContent {
    font-size: xx-large;
    font-weight: 900;
  }
  .subContent {
    margin-top: 20px;
    font-size: medium;
    font-weight: 500;
  }
`;
//-------------------------------------------//
const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
`;
const ButtonCenter = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1130px;
`;

const Button = styled.button`
  text-align: center;
  cursor: pointer;
`;

//-------------------------------------------//
const MoveButtonBox = styled.div`
  line-height: 19px;
  padding: 5px 20px;
  border-radius: 20px;
  color: white;
  background-color: gray;
  ${Button} {
    color: white;
    border: none;
    background: none;
  }
`;

const BannerIndex = styled.span`
  font-size: small;
  font-weight: 500;
  letter-spacing: 2px;
  margin-right: 10px;
`;

const PrevButton = styled(Button)``;
const NextButton = styled(Button)``;
const StopButton = styled(Button)``;

//-------------------------------------------//

const BannerButtonBox = styled.div``;
const BannerButton = styled(Button)`
  height: 100%;
  margin-right: 10px;
  padding: 5px 20px;
  border-radius: 20px;
  color: #495057;
  font-weight: 600;
  background-color: white;
  border: 1.5px solid rgb(206, 212, 218);
  &:last-child {
    margin-right: 0px;
  }
  &.select {
    color: #1dc078;
    border: 2px solid #1dc078;
  }
`;
export default MainSlider;
