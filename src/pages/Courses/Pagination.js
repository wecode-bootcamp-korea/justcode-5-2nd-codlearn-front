import { useState } from 'react';
import styled from 'styled-components';
const Pagebox = styled.button`
  background-color: ${props => (props.active ? 'green' : 'white')};
  color: ${props => (props.active ? 'white' : 'black')};
  max-width: 30px;
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

  return pages.map(el => (
    <Pagebox
      onClick={() => {
        toUrl('page', el.pageNum);
        setCurPage(el.pageNum);
      }}
      active={curPage === el.pageNum}
    >
      {el.pageVal}
    </Pagebox>
  ));
}

export default Pagination;
