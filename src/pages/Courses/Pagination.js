import { useEffect, useState } from 'react';
import styled from 'styled-components';
const Pagebox = styled.button`
  background-color: ${props => (props.active ? '#1EC077' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
  min-width: 30px;
  padding: 7px 0px;
  width: 100%;
  text-align: center;
  border: 1px solid #b8b8b8;
  border-radius: 5px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    border: 1px solid #1ec077;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Prev = styled.button`
  background-color: white;
  border: 1px solid #b8b8b8;
  border-radius: 4px;
  font-size: 12px;
  &:hover {
    cursor: pointer;
    border: 1px solid #1ec077;
  }
  opacity: ${props => (props.show ? '1' : '0')};
  pointer-events: ${props => (props.show ? 'auto' : 'none')};
`;
const Next = styled(Prev)`
  opacity: ${props => (props.show ? '1' : '0')};
  pointer-events: ${props => (props.show ? 'auto' : 'none')};
`;

function Pagination({ totalPage, toUrl }) {
  const [curPage, setCurPage] = useState(1);
  let start;
  const divide = curPage / 10;
  const extra = curPage % 10;
  if (extra) {
    start = Math.floor(divide) * 10 + 1;
  } else {
    start = Math.floor(divide);
  }
  const end = Math.min(start + 9, totalPage);
  const pages = [];
  if (start !== 1) {
    pages.push({ pageNum: 1, pageVal: 1 });
    pages.push({ pageNum: start - 1, pageVal: '...' });
  }
  for (let i = start; i <= end; i++) {
    pages.push({ pageNum: i, pageVal: i });
  }
  if (end !== totalPage) {
    pages.push({ pageNum: end + 1, pageVal: '...' });
    pages.push({ pageNum: totalPage, pageVal: totalPage });
  }

  function prev() {
    setCurPage(prev => (prev === 1 ? prev : prev - 1));
  }
  function next() {
    setCurPage(prev => (prev === totalPage ? prev : prev + 1));
  }
  useEffect(() => {
    toUrl('page', curPage);
  }, [curPage]);

  return (
    <Wrapper>
      <Prev onClick={prev} show={curPage !== 1}>
        이전페이지
      </Prev>
      <div style={{ display: 'flex' }}>
        {pages.map(el => (
          <Pagebox
            key={el.pageVal}
            onClick={() => {
              setCurPage(el.pageNum);
            }}
            active={curPage === el.pageNum}
          >
            {el.pageVal}
          </Pagebox>
        ))}
      </div>
      <Next onClick={next} show={curPage !== totalPage}>
        다음페이지
      </Next>
    </Wrapper>
  );
}

export default Pagination;
