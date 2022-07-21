import React, { useMemo, useState } from 'react';
import { ModalsStateContext, ModalsDispatchContext } from './Context';

const ModalsProvider = ({ children }) => {
  const [openedModals, setOpenedModals] = useState(false);

  //open함수 파라미터 => 열고 싶은 모달 컴포넌트, 모달컴포넌트로 넘겨주고 싶은 props
  // const open = (Component) => {
  //   setOpenedModals(modals => {
  //     return [...modals, {Component}];
  //   });
  // };
  // //close함수 파라미터=> 모달 컴포넌트
  // //state가 리스트 형태이기 때문에 filter 이용
  // //파라미터 받은 모달 컴포넌트를 제외하고 필터링
  // //파라미터로 받은 모달 컴포넌트를 제외하고 나머지만 다시 저장
  // const close = Component => {
  //   setOpenedModals(modals => {
  //     return modals.filter(modal => modal.Component !== Component);
  //   });
  // };

  // //ModalsDispatchContext에 넘겨주는 dispatch가
  // //항상 재생성돼서 리렌더링 되는것을 막아주기 위해 useMemo사용
  // const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalsStateContext.Provider value={openedModals}>
      {/* <ModalsDispatchContext.Provider value={dispatch}> */}
      {children}
      {/* </ModalsDispatchContext.Provider> */}
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
