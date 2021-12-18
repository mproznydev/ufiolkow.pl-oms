import axios from 'axios';
import React, { useContext, useReducer, createContext, useEffect } from 'react';

const CurrentUserStateContext = createContext();
const CurrentUserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.user, isAuthenticated: true, isLoading: false };
    case 'LOGOUT':
      return { isAuthenticated: false };
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { isAuthenticated: false, isLoading: true });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://ufiolkow-oms.herokuapp.com/users/me', {
          withCredentials: true,
        });
        if (data.id) {
          dispatch({ type: 'LOGIN', user: data });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <CurrentUserDispatchContext.Provider value={dispatch}>
      <CurrentUserStateContext.Provider value={state}>{children}</CurrentUserStateContext.Provider>
    </CurrentUserDispatchContext.Provider>
  );
};

export const useCurrentUser = () => useContext(CurrentUserStateContext);
export const useCurrentDispatchUser = () => useContext(CurrentUserDispatchContext);
