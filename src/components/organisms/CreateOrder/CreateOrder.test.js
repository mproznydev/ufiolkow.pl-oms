import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from 'tests/utils';
import React from 'react';
import CreateOrder from './CreateOrder';

describe('Create Order Component', () => {
  it('create new order and clean inputs fields', async () => {
    renderWithProviders(<CreateOrder></CreateOrder>);
    fireEvent.change(screen.getByLabelText('client name', { target: { value: 'new client name' } }));
    fireEvent.change(screen.getByLabelText('client adress', { target: { value: 'new york' } }));
    fireEvent.change(screen.getByPlaceholderText('e.g. chocolate', { target: { value: 'chocolate' } }));
    fireEvent.change(screen.getByPlaceholderText('e.g. 1kg', { target: { value: '1kg' } }));
    fireEvent.click(screen.getByText('add new order'));

    expect(await screen.getByLabelText('client name').value).toBe('');
  });
});
