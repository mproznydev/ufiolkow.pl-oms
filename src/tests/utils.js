import { render } from '@testing-library/react';
import { rest } from 'msw';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';

const dummyOrders = [
  {
    clientAdress: 'Bytom',
    id: 1,
    clientName: 'lodziarnia nad zalewem',
    products: [
      { name: 'trusban', quantity: '1kg' },
      { name: 'trusban', quantity: '1kg' },
    ],
    status: 'done',
  },
  {
    clientAdress: 'Stroszek',
    id: 2,
    clientName: 'lodziarnia w cetrum',
    products: [
      { name: 'trusban', quantity: '1kg' },
      { name: 'trusban', quantity: '1kg' },
    ],
    status: 'done',
  },
];

export const handlers = [
  rest.get('*/orders/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyOrders[0]));
  }),
  rest.get('*/orders', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dummyOrders));
  }),
  rest.post('*/orders', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        clientAdress: 'new york',
        id: 3,
        clientName: 'new client name',
        products: [{ name: 'chocolate', quantity: '1kg' }],
        status: 'done',
      })
    );
  }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export function renderWithProviders(ui) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi) => rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
}
