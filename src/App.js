import { createContext, useState } from 'react';
import './App.css';
import Router from './Router';
export const LoginContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
});

function App() {
  const loginState = useState({ isLogin: false });
  return (
    <LoginContext.Provider value={loginState}>
      <Router />
    </LoginContext.Provider>
  );
}

export default App;
