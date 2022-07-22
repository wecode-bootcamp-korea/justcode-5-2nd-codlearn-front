import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
} from 'react-router-dom';
import Class from '../../components/Class/Class';
import Filter from '../../components/Filter/Filter';
import Pagination from './Pagination';
import BASE_URL from '../../config';

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
      { name: '보안', value: 'security' },
      { name: '인공지능', value: 'artificial-intelligence' },
      { name: '데이터 시각화', value: 'data-visualization' },
    ],
  },
];
const filterOpts = [
  { name: '기본순', value: 'default' },
  { name: '평점순', value: 'rating' },
  { name: '학생수순', value: 'famous' },
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
  width: 200px;
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
  margin-bottom: 20px;
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

const SortWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100px;
  padding: 10px 0px;
  border: ${props =>
    props.sortOn ? '1px solid #1EC077' : '1px solid #b8b8b8'};
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    border: ${props =>
      props.sortOn ? '1px solid #1EC077' : '1px solid black'};
  }
`;
const SortOptions = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  z-index: 3;
  top: 35px;
  display: ${props => (props.sortOn ? 'flex' : 'none')};
  border: 1px solid #1ec077;
  border-top: none;
  flex-direction: column;
  align-items: center;
  & > div {
    text-align: center;
    width: 100%;
    padding: 10px 0px;
  }
  & > div:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  & > div:last-child {
  }
`;
const PageboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 45px 0px;
`;

function Courses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [select, setSelect] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cat1, setCat1] = useState({ name: '', value: '' });
  const [cat2, setCat2] = useState({ name: '', value: '' });
  const [courseData, setCourseData] = useState();
  const [sortOn, setSortOn] = useState(false);
  const [sort, setSort] = useState();
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const [query, setQuery] = useSearchParams();
  const searchParams = new URLSearchParams(query);

  function showSubCat(target) {
    setSelect(prev => {
      if (prev === target) return '';
      else return target;
    });
  }
  function toUrl(target, value) {
    if (searchParams.has(target)) {
      searchParams.set(target, value);
      setQuery(searchParams.toString());
    } else {
      setQuery(searchParams.toString() + `&${target}=${value}`);
    }
  }

  function literal() {
    if (params.cat1 && !params.cat2) {
      return `/${params.cat1}`;
    } else if (params.cat1 && params.cat2) {
      return `/${params.cat1}/${params.cat2}`;
    }
  }
  const parameters = literal();

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
      setIsLoading(true);
      const result = await (
        await fetch(
          params.cat1
            ? `${BASE_URL}/courses${parameters}${location.search}`
            : `${BASE_URL}/courses${location.search}`
        )
      ).json();
      setCourseData(result);
      setIsLoading(false);
    };
    getData();
    window.scrollTo(0, 0);
  }, [params.cat1, parameters, location.search]);

  return (
    <Wrapper
      onClick={() => {
        setShowModal(false);
        setSortOn(false);
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
          <Filter
            showModal={showModal}
            setShowModal={setShowModal}
            query={query}
            setQuery={setQuery}
          />
          <MainSort>
            <SortWrapper
              sortOn={sortOn}
              onClick={e => {
                e.stopPropagation();
                setSortOn(prev => !prev);
              }}
            >
              <div>{searchParams.has('order') ? sort : '선택'}</div>
              <SortOptions sortOn={sortOn}>
                {filterOpts.map(el => (
                  <div
                    onClick={() => {
                      setSort(el.name);
                      toUrl('order', el.value);
                    }}
                    key={el.value}
                  >
                    {el.name}
                  </div>
                ))}
              </SortOptions>
            </SortWrapper>
          </MainSort>
        </MainSortWrapper>
        <MainWrapper>
          {!isLoading
            ? courseData?.data.map(el => (
                <Class navigate={navigate} key={el.id} data={el} />
              ))
            : 'Loading...'}
        </MainWrapper>
        <PageboxWrapper>
          <Pagination totalPage={Number(courseData?.pages)} toUrl={toUrl} />
        </PageboxWrapper>
      </main>
    </Wrapper>
  );
}

export default Courses;
