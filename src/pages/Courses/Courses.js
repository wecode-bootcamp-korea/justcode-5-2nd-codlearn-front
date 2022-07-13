import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = [
  {
    name: '개발·프로그래밍',
    value: 'it-programming',
    inner: [
      { name: 'ALL', value: '' },
      { name: '프론트엔드', value: 'front-end' },
      { name: '백엔드', value: 'back-end' },
      { name: '게임개발', value: 'game-dev' },
    ],
  },
  {
    name: '보안·네트워크',
    value: 'it',
    inner: [
      { name: 'ALL', value: '' },
      { name: '데이터분석', value: 'data-analysis' },
      { name: '클라우드', value: 'cloud' },
      { name: '블록체인', value: 'blockchain' },
    ],
  },
  {
    name: '데이터 사이언스',
    value: 'data-science',
    inner: [
      { name: 'ALL', value: '' },
      { name: '보안', value: 'sequrity' },
      { name: '인공지능', value: 'artificial-intelligence' },
      { name: '데이터 시각화', value: 'data-visualization' },
    ],
  },
];

const Wrapper = styled.div`
  margin-top: 30px;
  padding: 0px 115px;
  display: flex;
  aside {
    margin-right: 10px;
  }
  main {
    border-top: 1px solid #e4e4e4;
    padding-top: 10px;
    flex: 1;
  }
`;

const CategoryWrapper = styled.div`
  border: 1px solid #e4e4e4;
  border-bottom: none;
  background-color: #fafafa;
`;

const Category = styled.div`
  padding: 15px;
  width: 150px;
  font-size: 16px;
  color: #595959;
  border-bottom: 1px solid #e4e4e4;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  svg {
    font-size: 13px;
    transition: transform 0.1s ease-in-out;
  }
`;

const SubCategory = styled.div`
  background-color: white;
  padding: 15px;
  color: #595959;
  font-size: 14px;
  border-bottom: 1px solid #e4e4e4;
  cursor: pointer;
  &:hover {
    background-color: #efefef;
  }
`;
const MainHeader = styled.div`
  span {
    font-weight: 400;
    padding-right: 10px;
    margin-right: 10px;
    font-size: 18px;
    border-right: 2px solid #e4e4e4;
    &:last-child {
      border: none;
      font-weight: 800;
    }
  }
`;
const MainWrapper = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
`;
const Course = styled.div`
  background-color: red;
  width: 220px;
  height: 300px;
  cursor: pointer;
`;
function Courses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState('');
  const [cat1, setCat1] = useState({ name: '', value: '' });
  const [cat2, setCat2] = useState({ name: '', value: '' });

  function showSubCat(target) {
    setSelect(prev => {
      if (prev === target) return '';
      else return target;
    });
  }

  useEffect(() => {
    if (cat1.value && cat2.value) {
      navigate(`${cat1.value}/${cat2.value}`, {
        state: { category1: cat1.name, category2: cat2.name },
      });
    } else if (!cat1.value && !cat2.value) {
      navigate('/courses');
    } else if (cat1.value) {
      navigate(`${cat1.value}`, {
        state: { category1: cat1.name },
      });
    }
  }, [cat2]);

  return (
    <Wrapper>
      <aside>
        <CategoryWrapper>
          <Category
            onClick={() => {
              setCat1(prev => {
                return { ...prev, name: '', value: '' };
              });
              setCat2(prev => {
                return { ...prev, name: '', value: '' };
              });
              setSelect('');
            }}
          >
            전체 강의
          </Category>
          {categories.map(el => (
            <div key={el.value}>
              <Category
                onClick={() => {
                  showSubCat(el.name);
                  setCat1(prev => {
                    return { ...prev, name: el.name, value: el.value };
                  });
                }}
              >
                <span>{el.name}</span>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{
                    transform: el.name === select ? 'rotateZ(90deg)' : 'none',
                  }}
                />
              </Category>
              {select === el.name &&
                el.inner.map(el => (
                  <SubCategory
                    key={el.name}
                    onClick={() => {
                      if (el.value) {
                        setCat2(prev => {
                          return { ...prev, name: el.name, value: el.value };
                        });
                      } else
                        setCat2(prev => {
                          return { ...prev, name: '', value: '' };
                        });
                    }}
                  >
                    {el.name}
                  </SubCategory>
                ))}
            </div>
          ))}
        </CategoryWrapper>
      </aside>
      <main>
        <MainHeader>
          <span>전체</span>
          {location?.state?.category1 && (
            <span>{location?.state?.category1}</span>
          )}
          {location?.state?.category2 && (
            <span>{location?.state?.category2}</span>
          )}
        </MainHeader>
        <MainWrapper>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
          <Course></Course>
        </MainWrapper>
      </main>
    </Wrapper>
  );
}

export default Courses;
