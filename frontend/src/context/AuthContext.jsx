import React, { createContext, useState, useEffect} from 'react';
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import Api from '../Api';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('token')
      ? JSON.parse(localStorage.getItem('token'))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('token')
      ? jwtDecode(localStorage.getItem('token'))
      : null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useNavigate();

  const loginUser = async(email, password) => {
    try {
      const response = await Api.post('api/user/login', {
        email,
        password,
      });

      const data = await response.data;
      if (response.status === 200) {
        setAuthTokens(data.token);
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('AccountType', JSON.stringify(response.data.accountType))
        localStorage.setItem('FreeTrail', JSON.stringify(response.data.freeTrail))
        localStorage.setItem('subscription_Mode', JSON.stringify(response.data.subscription_mode))
        setError(null);
        history('/dashboard')

      }
    } catch (error) {
        setError(error.response.data.message);
    }
  };




  const registerUser = async (name, email, password, accountType) => {
    try {
      if (accountType == ""){
        setError("Error, please make sure you choose an account type and try again")
        return 
      }
      const data ={
        name: name,
        email: email,
        password: password,
        accountType: accountType
      }
      const response = await Api.post('api/user/register', data);

      if (response.status === 201 || response.status === 200) {
        setError(null)
        history('/login');
      } else {
        const data = await response.data;
        setError(data.message);
      }
    } catch (error) {
        setError(error.response.data.message);
    }
  };

  const handleGoogleAuthRegister = async (credentials, accountType) => {
    try {
      credentials = jwtDecode(credentials)
      if (!credentials || !accountType) {
        setError("please make sure you choose an account type and try again")
        return
      }
      else {
        const data = {
          name: `${credentials.given_name} ${credentials.family_name}`,
          email: credentials.email,
          sub: credentials.sub,
          accountType: accountType

        }
        await Api.post('api/user/google-auth-register', data)
          .then(async (response) => {
            if (response.status == 200 || response.status == 201) {
              setAuthTokens(response.data.token);
              localStorage.setItem('token', JSON.stringify(response.data.token));
              localStorage.setItem('AccountType', JSON.stringify(response.data.accountType))
              localStorage.setItem('FreeTrail', JSON.stringify(response.data.freeTrail))
              localStorage.setItem('subscription_Mode', JSON.stringify(response.data.subscription_mode))
              setError(null)
              history('/dashboard');
            }
          })
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  const handleGoogleAuthLogin = async (credentials) => {
    try {
      credentials = jwtDecode(credentials)
      if (!credentials) {
        setError("please make sure you choose an account type and try again")
        return
      }
      else {
        const data = {
          name: `${credentials.given_name} ${credentials.family_name}`,
          email: credentials.email,
          sub: credentials.sub,

        }
        await Api.post('api/user/google-auth-login', data)
          .then(async (response) => {
            if (response.status == 200) {
              setAuthTokens(response.data.token);
              localStorage.setItem('token', JSON.stringify(response.data.token));
              localStorage.setItem('AccountType', JSON.stringify(response.data.accountType))
              localStorage.setItem('FreeTrail', JSON.stringify(response.data.freeTrail))
              localStorage.setItem('subscription_Mode', JSON.stringify(response.data.subscription_mode))
              setError(null)
              history('/dashboard');
            }
          })
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }


  const logoutUser = async() => {
    localStorage.removeItem('token');
    localStorage.removeItem('AccountType')
    localStorage.removeItem('FreeTrail')
    localStorage.removeItem('subscription_Mode')
    setError(null)
    history('/login');
  };

  const contextData = {
    error,
    loginUser,
    logoutUser,
    registerUser,
    handleGoogleAuthRegister,
    handleGoogleAuthLogin
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
