import React, { useState } from 'react';
import {
  LoadingWrapper,
  StyledViewWrapper,
  Wrapper,
  TableWrapper,
  TableTitle,
  StyledLink,
  ModalWrapper,
  CreateNewOrderWrapper,
  TableBody,
  TableHead,
  OrderRow,
} from './OrdersTable.styles';
import { useNavigate } from 'react-router';
import { DeleteButton } from 'components/atoms/DeleteButton/DeleteButton';
import { properData } from 'helpers/helpers';
import { useOrders } from 'hooks/useOrders';
import { useDeleteOrder } from 'hooks/useDeleteOrder';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import Modal from 'components/organisms/Modal/Modal';
import { Button } from 'components/atoms/Button/Button';

const OrderDetailsTable = () => {
  const { data: orders = [], status: OrdersStatus } = useOrders();
  const { mutate: deleteOrder, status: DeletingStatus } = useDeleteOrder();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDetails = (id) => {
    navigate(`/orders/${id}`);
  };

  const handleDeleteOrder = (id) => {
    deleteOrder(id);
    setIsDeleteModalOpen(false);
  };
  return (
    <Wrapper>
      <StyledViewWrapper title="Orders">
        {OrdersStatus === 'success' && !orders.length > 0 ? (
          <ErrorMessage />
        ) : (
          <>
            {OrdersStatus === 'loading' ? (
              <LoadingWrapper>
                <LoadingSpinner isPurple></LoadingSpinner>
              </LoadingWrapper>
            ) : (
              <TableWrapper>
                <TableHead>
                  <tr>
                    <TableTitle>Client name</TableTitle>
                    <TableTitle>Client adress</TableTitle>
                    <TableTitle>Products</TableTitle>
                    <TableTitle>Quantity</TableTitle>
                    <TableTitle>State</TableTitle>
                    <TableTitle>Created</TableTitle>
                    <TableTitle></TableTitle>
                  </tr>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <OrderRow key={order.id}>
                      <td onClick={() => handleOpenDetails(order.id)}>{order.clientName}</td>
                      <td onClick={() => handleOpenDetails(order.id)}>{order.clientAdress}</td>
                      <td onClick={() => handleOpenDetails(order.id)}>
                        {order.products.map((product, id) => (
                          <p key={id}>{product.name}</p>
                        ))}
                      </td>
                      <td onClick={() => handleOpenDetails(order.id)}>
                        {order.products.map((product, id) => (
                          <p key={id}>{product.quantity}</p>
                        ))}
                      </td>
                      <td onClick={() => handleOpenDetails(order.id)}>{order.status}</td>
                      <td onClick={() => handleOpenDetails(order.id)}>{properData(order.published_at)}</td>
                      <td>
                        <DeleteButton onClick={() => setIsDeleteModalOpen(true)}>x</DeleteButton>
                        {isDeleteModalOpen ? (
                          <Modal>
                            <ModalWrapper>
                              <p>are you sure?</p>
                              <Button onClick={() => handleDeleteOrder(order.id)}>delete</Button>
                              <Button onClick={() => setIsDeleteModalOpen(false)}>go back</Button>
                            </ModalWrapper>
                          </Modal>
                        ) : null}
                      </td>
                    </OrderRow>
                  ))}
                </TableBody>
              </TableWrapper>
            )}
          </>
        )}

        <CreateNewOrderWrapper>
          <StyledLink to="new"> {DeletingStatus === 'loading' ? <LoadingSpinner></LoadingSpinner> : 'Create new order'}</StyledLink>
        </CreateNewOrderWrapper>
      </StyledViewWrapper>
    </Wrapper>
  );
};

OrderDetailsTable.propTypes = {};

export default OrderDetailsTable;
