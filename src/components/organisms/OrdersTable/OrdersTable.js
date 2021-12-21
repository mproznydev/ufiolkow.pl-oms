import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { DeleteButton } from 'components/atoms/DeleteButton/DeleteButton';
import { properData } from 'helpers/helpers';
import { useOrders } from 'hooks/useOrders';
import { useDeleteOrder } from 'hooks/useDeleteOrder';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import Modal from 'components/organisms/Modal/Modal';
import { Button } from 'components/atoms/Button/Button';

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const StyledViewWrapper = styled(ViewWrapper)`
  min-height: 400px;
`;

const Wrapper = styled.div`
  margin: 2rem;
`;
const TableBody = styled.tbody``;
const TableHead = styled.thead``;
const OrderRow = styled.tr`
  cursor: pointer;
  td {
    border-bottom: 1px dashed black;
  }
`;

const TableWrapper = styled.table`
  padding: 2rem 0 2rem 0;
  width: 100%;

  td {
    text-align: center;
    font-weight: 500;
  }
`;
const TableTitle = styled.th`
  text-align: center;

  border-bottom: 1px dashed black;
  margin: 1rem;
  font-size: ${({ theme }) => theme.fontSize.l}; ;
`;

const StyledLink = styled(Link)`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.darkPurple};
  padding-top: 3px;
  padding-bottom: 3px;
  color: ${({ theme }) => theme.colors.white};
  border-radius: 19px;
  border: none;
  cursor: pointer;
  font-weight: ${({ isSecondary }) => (isSecondary ? '500' : '600')};
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 7px;
  font-size: 14px;
  width: 7rem;
  height: 2.5rem;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

const ModalWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CreateNewOrderWrapper = styled.div`
  display: flex;

  justify-content: center;
  align-self: center;
  padding: 0.5rem;
`;

const OrderDetailsTable = () => {
  const { data = [], status: OrdersStatus } = useOrders();
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
        {OrdersStatus === 'success' && !data.length > 0 ? (
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
                  {data
                    ? data.map((order) => (
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
                      ))
                    : null}
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
