import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
const MainFilterWrapper = styled.div`
  position: relative;
`;
const MainFilter = styled.div`
  display: flex;
  border: ${props => (props.modal ? '1px solid #1EC077' : '1px solid #b8b8b8')};
  padding: 14px;
  font-size: 14px;
  align-items: center;
  border-radius: 4px;
  position: relative;
  z-index: 3;
  &:hover {
    cursor: pointer;
    border: ${props => (props.modal ? '1px solid #1EC077' : '1px solid black')};
  }
  div:first-child {
    display: flex;
    svg {
      margin-right: 5px;
    }
  }
  div {
    margin-right: 10px;
  }
`;
const Paid = styled.span`
  color: ${props => (props.active ? '#1ec077' : 'gray')};
  font-weight: ${props => (props.active ? '700' : 'none')};
`;
const Free = styled(Paid)``;
const Discount = styled(Paid)`
  padding-right: 10px;
  border-right: 1px solid #b7b7b7;
`;
const Lev1 = styled.span`
  color: ${props => (props.active ? '#1ec077' : 'gray')};
  font-weight: ${props => (props.active ? '700' : 'none')};
`;
const Lev2 = styled(Lev1)``;
const Lev3 = styled(Lev1)``;
const Options = styled.div`
  box-sizing: border-box;
  width: 100%;
  position: absolute;
  padding: 20px;
  z-index: 2;
  display: ${props => (props.modal ? 'block' : 'none')};
  background-color: white;
  -webkit-box-shadow: 0px -1px 14px -7px rgba(0, 0, 0, 0.67);
  box-shadow: 0px -1px 14px -7px rgba(0, 0, 0, 0.67);
  border-radius: 5px;
  & > span {
    font-size: 12px;
    display: block;
    color: #595959;
    margin-bottom: 10px;
  }
`;
const PriceForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  & > div {
    display: flex;
    align-items: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  & > div:last-child {
    margin-bottom: 30px;
  }
  input {
    accent-color: green;
  }
  label {
    margin-left: 7px;
    font-size: 14px;
    flex: 1;
    padding: 13px;
  }
`;
const LevelForm = styled(PriceForm)``;

const SubmitWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #1ec077;
`;
const Reset = styled.span`
  margin-right: 10px;
  font-size: 15px;
  color: gray;
  &:hover {
    cursor: pointer;
  }
`;
const Confirm = styled(Reset)`
  color: black;
`;

function Filter({ showModal, setShowModal }) {
  const [charge, setCharge] = useState([]);
  const [level, setLevel] = useState([]);
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const chargeQuery = query.get('charge');
  const levelQuery = query.get('level');
  function modalOn(e) {
    e.stopPropagation();
    setShowModal(true);
  }

  function modalToggle(e) {
    e.stopPropagation();
    setShowModal(prev => !prev);
  }

  function priceOptionSet(e) {
    setCharge(prev =>
      prev.includes(e.target.name)
        ? [...prev].filter(el => el !== e.target.name)
        : [...prev].concat(e.target.name)
    );
  }

  function levelOptionSet(e) {
    setLevel(prev =>
      prev.includes(e.target.name)
        ? [...prev].filter(el => el !== e.target.name)
        : [...prev].concat(e.target.name)
    );
  }

  return (
    <MainFilterWrapper>
      <MainFilter onClick={modalToggle} modal={showModal}>
        <div>
          <FontAwesomeIcon icon={faFilter} />
          필터
        </div>
        <div>
          <Paid active={chargeQuery?.includes('paid')}>유료</Paid> ·
          <Free active={chargeQuery?.includes('free')}>무료</Free> ·
          <Discount active={chargeQuery?.includes('discounted')}>
            할인중
          </Discount>
        </div>
        <div>
          <Lev1 active={levelQuery?.includes('1')}>입문</Lev1> ·
          <Lev2 active={levelQuery?.includes('2')}>초급</Lev2> ·
          <Lev3 active={levelQuery?.includes('3')}>중급이상</Lev3>
        </div>
      </MainFilter>
      <Options modal={showModal} onClick={modalOn}>
        <span>유/무료</span>
        <PriceForm>
          <div>
            <input
              type="checkbox"
              id="paid"
              name="paid"
              onChange={priceOptionSet}
              checked={charge.includes('paid')}
            />
            <label htmlFor="paid">유료 강의</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="free"
              name="free"
              onChange={priceOptionSet}
              checked={charge.includes('free')}
            />
            <label htmlFor="free">무료 강의</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="discounted"
              name="discounted"
              onChange={priceOptionSet}
              checked={charge.includes('discounted')}
            />
            <label htmlFor="discounted">할인중 강의</label>
          </div>
        </PriceForm>
        <span>난이도</span>
        <LevelForm>
          <div>
            <input
              type="checkbox"
              id="입문"
              name="1"
              onChange={levelOptionSet}
              checked={level.includes('1')}
            />
            <label htmlFor="입문">입문</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="초급"
              onChange={levelOptionSet}
              name="2"
              checked={level.includes('2')}
            />
            <label htmlFor="초급">초급</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="중급"
              onChange={levelOptionSet}
              name="3"
              checked={level.includes('3')}
            />
            <label htmlFor="중급">중급 이상</label>
          </div>
        </LevelForm>
        <SubmitWrapper>
          <Reset
            onClick={() => {
              setCharge([]);
              setLevel([]);
              navigate('/courses');
            }}
          >
            초기화
          </Reset>
          <Confirm
            onClick={e => {
              e.stopPropagation();
              setQuery({ charge: charge.join(','), level: level.join(',') });
              setShowModal(false);
            }}
          >
            확인
          </Confirm>
        </SubmitWrapper>
      </Options>
    </MainFilterWrapper>
  );
}

export default Filter;
