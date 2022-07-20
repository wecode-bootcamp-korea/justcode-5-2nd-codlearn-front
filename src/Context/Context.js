import { createContext, useContext } from 'react';

//모달 state 함수
export const ModalsStateContext = createContext([]);

//모달을 열고 닫을 수 있는 함수
export const ModalsDispatchContext = createContext({
  open: () => {},
  close: () => {},
});

//커스텀 훅
export default function useModals() {
  const { open, close } = useContext(ModalsDispatchContext);

  const openModal = (Component, props) => {
    open(Component, props);
  };
  const closeModal = Component => {
    close(Component);
  };
  return { openModal, closeModal };
}
