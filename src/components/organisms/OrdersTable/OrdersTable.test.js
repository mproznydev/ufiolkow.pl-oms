import OrdersTable from './OrdersTable';
import { renderWithProviders } from 'tests/utils';
import { server } from 'setupTests';
import { rest } from 'msw';

describe('Orders Table', () => {
  it('shows orders when are fetched', async () => {
    const result = renderWithProviders(<OrdersTable></OrdersTable>);
    expect(await result.findByText(/lodziarnia nad zalewem/i)).toBeInTheDocument();
  });

  it('shows error when fetch fails', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    const result = renderWithProviders(<OrdersTable></OrdersTable>);

    expect(await result.findByText(/Sorry but there is no data.../i)).toBeInTheDocument();
  });
});
