import React, { createContext, useEffect, useReducer } from 'react';

// third-party
// import { Auth0Client } from '@auth0/auth0-spa-js';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/reducers/actions';
import authReducer from 'store/reducers/auth';

// project import
import Loader from 'components/Loader';
import { KeyedObject } from 'types/root';
import { Auth0ContextType, AuthProps } from 'types/auth';
import { clearAdmin, clearName, clearAccount, clearToken, getUserName, isAuth } from 'utils/token';

// constant
// let auth0Client: Auth0Client;

const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| AUTH0 CONTEXT & PROVIDER ||============================== //

const Auth0Context = createContext<Auth0ContextType | null>(null);

export const Auth0Provider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // const dispatch = useDispatch()

  // console.log('state', state)
  // console.log('dispatch', dispatch)


  // process.env.REACT_APP_AUTH0_CLIENT_ID

  // const token = getToken().token

  // console.log('token', token)
  useEffect(() => {
    // console.log('登录鉴权')
    const init = async () => {
      try {
        // auth0Client = new Auth0Client({
        //   redirect_uri: window.location.origin,
        //   client_id: '11111111' as string,
        //   domain: process.env.REACT_APP_AUTH0_DOMAIN as string
        // });

        // await auth0Client.checkSession();
        // const isLogged = await auth0Client.isAuthenticated();

        // console.log('token变化')
        const isLoggedIn = isAuth();
        // const isLoggedIn = isAuth()
        // console.log('Auth0', isLoggedIn)

        if (isLoggedIn) {
          // const user = await auth0Client.getUser();

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                // id: '1',
                email: getUserName().username || '123@123'
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, [state.token]);

  // type Params = {
  //   name: string
  //   password: string
  // }

  const login = async (isLogin: boolean, options?: KeyedObject,) => {
    // await auth0Client.loginWithPopup(options);

    // const dispatch = useDispatch()
    // const isLogged = await auth0Client.isAuthenticated();
    // const isLoggedIn = false
    // useEffect(() => {
    //   dispatch(goLogin(params)).unwrap()
    //   console.log('发送请求')
    // }, [dispatch])

    const isLoggedIn = isLogin

    // console.log('isLogin', isLogin)





    // console.log('Auth0login', isLoggedIn)

    if (isLoggedIn) {
      // const user = await auth0Client.getUser();
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: {
            // id: user?.sub,
            // avatar: user?.picture,
            // email: user?.email,
            email: getUserName().username,
            name: getUserName().username,
            tier: 'Premium'
          }
        }
      });
    }
  };

  const logout = () => {
    // auth0Client.logout();

    clearToken()
    clearAccount()
    clearName()
    clearAdmin()

    dispatch({
      type: LOGOUT
    });
  };

  const resetPassword = async (email: string) => { };

  const updateProfile = () => { };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <Auth0Context.Provider value={{ ...state, login, logout, resetPassword, updateProfile }}>{children}</Auth0Context.Provider>;
};

export default Auth0Context;
