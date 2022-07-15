import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Class from '../../components/Class/Class';
import Filter from '../../components/Filter/Filter';

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
const MainSortWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const MainSort = styled.div`
  display: flex;
  flex-direction: column;
  span {
    position: relative;
    z-index: 3;
  }
`;

function Courses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState('');
  const [cat1, setCat1] = useState({ name: '', value: '' });
  const [cat2, setCat2] = useState({ name: '', value: '' });
  const [courseData, setCourseData] = useState();
  const [sortOn, setSortOn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  console.log(location.search);
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

  useEffect(() => {
    const getData = async () => {
      const result = await (
        await fetch(`http://localhost:8000/courses${location.search}`)
      ).json();
      setCourseData(result);
    };
    getData();
  }, [location.search]);
  return (
    <Wrapper
      onClick={() => {
        setShowModal(false);
      }}
    >
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
        <MainSortWrapper>
          <Filter showModal={showModal} setShowModal={setShowModal} />
          <MainSort>
            <span
              onClick={() => {
                setSortOn(prev => !prev);
              }}
            >
              기본순
            </span>
            {sortOn && (
              <>
                <span>인기순</span>
                <span>평점순</span>
                <span>학생수순</span>
              </>
            )}
          </MainSort>
        </MainSortWrapper>
        <MainWrapper>
          {courseData?.map(el => (
            <Class key={el.class_name} data={el} />
          ))}
        </MainWrapper>
      </main>
    </Wrapper>
  );
}

export default Courses;
