import axios from 'axios';
import React, { useContext, useEffect, useReducer, createContext } from 'react';

const OrdersStateContext = createContext();
const OrdersDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return [...state, ...action.orders];
    // case 'DELETE_ORDER':
    //   return [...action.fiteredOrders];
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get('http://localhost:1337/orders', {
          withCredentials: true,
        });

        dispatch({ type: 'FETCH_DATA', orders: result.data });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <OrdersDispatchContext.Provider value={dispatch}>
      <OrdersStateContext.Provider value={state}>{children}</OrdersStateContext.Provider>
    </OrdersDispatchContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersStateContext);
export const useOrdersDispatch = () => useContext(OrdersDispatchContext);
