
import { useState, useEffect } from 'react';
import ErrorPage from './ErrorPage.js'
import LoginForm from './LoginForm.js';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';

import { fetchData } from '../utils/utils.js'


function App() {


  const [layout, setLayout] = useState({ loginLayout: true, registerLayout: false, errorLayout: false });
  const [errorInfo, setErrorInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});


  const setLoginLayout = () => {
    setLayout({ loginLayout: true, registerLayout: false, errorLayout: false });
  }

  const setRegisterLayout = () => {
    setLayout({ loginLayout: false, registerLayout: true, errorLayout: false });
  }

  const setErrorLayout = () => {
    setLayout({ loginLayout: false, registerLayout: false, errorLayout: true });
  }

  const setDashboardLayout = () => {
    setLayout({ loginLayout: false, registerLayout: false, errorLayout: false });
  }

  
  useEffect(() => {
    fetchData('/user', 'POST', {})
      .then((response) => {
        if (response.status === 401) {
          setLoginLayout();
          return;
        }
        if (response.error) {
          setErrorLayout();
          return;
        }
        console.log(response.data);
        setDashboardLayout();
        setUserInfo(response.data);
      });
  }, []);





  if (layout.errorLayout) return <main><ErrorPage/></main>
  if (layout.loginLayout) return <main> <LoginForm methods={{setRegisterLayout, setErrorLayout, setErrorInfo, setDashboardLayout, setUserInfo}} /> </main>
  if (layout.registerLayout) return <main> <RegisterForm methods={{setErrorLayout, setErrorInfo, setLoginLayout}} /> </main>
  return <main> <Dashboard userInfo={userInfo} methods={{setErrorLayout, setErrorInfo, setLoginLayout}} /> </main>

}

export default App;
