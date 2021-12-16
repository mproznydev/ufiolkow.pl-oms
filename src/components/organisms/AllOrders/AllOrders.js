import React, { useState } from 'react';
import { StyledViewWrapper, ListOfOrders, Order, StyledElementWrapper } from 'components/organisms/AllOrders/AllOrders.styles';
import { useOrders } from 'contexts/OrdersProvider';
import Modal from '../Modal/Modal';
import styled from 'styled-components';
import axios from 'axios';
import { Button } from 'components/atoms/Button/Button';

const ModalContainer = styled.div`
  width: 500px;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const CloseModalButton = styled(Button)``;

const OrderDetails = styled.div`
  margin-top: 2rem;
  height: 80%;
  display: flex;
  flex-direction: column;

  span {
    font-weight: 500;
    margin-bottom: 0.6rem;
  }
`;

const ProductsTable = styled.table`
  border-collapse: collapse;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  text-align: center;

  td {
    padding: 0.3rem;
  }
  thead tr {
    border-bottom: 1px dashed black;
  }

  thead tr td {
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: 500;
  }
`;

const ClientDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2rem;
`;

function AllOrders() {
  const orders = useOrders();
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const handleModalInfo = async (id) => {
    try {
      const result = await axios.get(`http://localhost:1337/orders/${id}`, { withCredentials: true });
      setOrderDetails(result.data);
      SetIsModalOpen(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StyledViewWrapper title={'All orders'}>
      <ListOfOrders>
        {orders.map((order) => (
          <Order key={order.id}>
            <StyledElementWrapper
              onClick={() => {
                handleModalInfo(order.id);
              }}
            >
              {order.clientName}
              {console.log(order)}
            </StyledElementWrapper>
          </Order>
        ))}
        {isModalOpen ? (
          <Modal>
            <ModalContainer>
              <OrderDetails>
                <ClientDetails>
                  Client: <span>{orderDetails.clientName}</span>
                  Adress: <span>{orderDetails.clientAdress}</span>
                </ClientDetails>
                <ProductsTable>
                  <thead>
                    <tr>
                      <td>Product </td>
                      <td>QTY</td>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.products.map((order) => (
                      <tr>
                        <td>{order.name}</td>
                        <td>{order.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </ProductsTable>
              </OrderDetails>
              <CloseModalButton
                onClick={() => {
                  SetIsModalOpen(false);
                }}
              >
                close
              </CloseModalButton>
            </ModalContainer>
          </Modal>
        ) : null}
      </ListOfOrders>
    </StyledViewWrapper>
  );
}

AllOrders.propTypes = {};

export default AllOrders;
