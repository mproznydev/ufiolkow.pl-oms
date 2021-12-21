import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import UnauthenticatedApp from './UnauthenticatedApp';
import { GlobalStyle } from 'assets/styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from 'components/organisms/Login/Login';
import Register from 'components/organisms/Register/Register';
import AuthenticatedApp from './AuthenticatedApp';
import { CurrentUserProvider } from 'contexts/CurrentUserProvider';
import HomePage from 'views/HomePage';
import OrdersTable from 'components/organisms/OrdersTable/OrdersTable';
import { Outlet } from 'react-router';
import OrderDetails from './OrderDetails';
import CreateOrders from 'components/organisms/CreateOrder/CreateOrder';
import KanbanPage from './KanbanPage';
import Messages from 'components/organisms/Messages/Messages';
import ClientsPage from './ClientsPage';
import ClientDetails from 'components/organisms/ClientDetails/ClientDetails';

function Root() {
  return (
    <BrowserRouter>
      <GlobalStyle></GlobalStyle>
      <ThemeProvider theme={theme}>
        <CurrentUserProvider>
          <Routes>
            <Route path="/" element={<AuthenticatedApp></AuthenticatedApp>}>
              <Route index element={<HomePage></HomePage>}></Route>
              <Route path="orders" element={<Outlet></Outlet>}>
                <Route index element={<OrdersTable></OrdersTable>}></Route>
                <Route path="kanban" element={<KanbanPage></KanbanPage>}></Route>
                <Route path=":id" element={<OrderDetails></OrderDetails>}></Route>
                <Route path="new" element={<CreateOrders></CreateOrders>}></Route>
              </Route>
              <Route path="messages" element={<Messages></Messages>}></Route>
              <Route path="clients" element={<Outlet></Outlet>}>
                <Route index element={<ClientsPage></ClientsPage>}></Route>
                <Route path=":id" element={<ClientDetails></ClientDetails>}></Route>
              </Route>
            </Route>
            <Route path="/login" element={<UnauthenticatedApp></UnauthenticatedApp>}>
              <Route index element={<Login></Login>}></Route>
              <Route path="register" element={<Register></Register>}></Route>
            </Route>
          </Routes>
        </CurrentUserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

Root.propTypes = {};

export default Root;
