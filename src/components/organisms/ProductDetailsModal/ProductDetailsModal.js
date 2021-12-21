import React from 'react';
import styled from 'styled-components';
import Modal from 'components/organisms/Modal/Modal';
import { Button } from 'components/atoms/Button/Button';
import { useNavigate } from 'react-router';

const OrderDetails = styled.div`
  margin-top: 2rem;
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;

  p {
    font-weight: 500;
    margin: 0 0.5rem 0rem 0.5rem;
  }
`;

const ModalContainer = styled.div`
  width: 500px;
  padding: 1rem;
  height: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 2rem;
`;
const ClientDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;
const StatusOption = styled.select`
  border: none;
  font-size: ${({ theme }) => theme.fontSize.m};
  margin-left: 0.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const ProductDetailsModal = ({ orderDetails, SetIsModalOpen, handleChangeOrderStatus, saveChangesInApi, updateAllOrdersState }) => {
  const navigate = useNavigate();

  return (
    <Modal>
      <ModalContainer>
        <OrderDetails>
          <ClientDetails>
            <ClientDetailWrapper>
              Client:<p>{orderDetails.clientName}</p>
            </ClientDetailWrapper>
            <ClientDetailWrapper>
              Delivery adress:<p>{orderDetails.clientAdress}</p>
            </ClientDetailWrapper>
            <ClientDetailWrapper as="form">
              <label htmlFor="status-select">Status:</label>
              {/* statusOption has value so you can check initial state and pass there  */}
              <StatusOption id="status-select" name="status" onChange={handleChangeOrderStatus}>
                <option value="new" selected={'done' === orderDetails.status}>
                  new
                </option>
                <option value="in progress" selected={'in progress' === orderDetails.status}>
                  in progress
                </option>
                <option value="done" selected={'done' === orderDetails.status}>
                  done
                </option>
              </StatusOption>
            </ClientDetailWrapper>
          </ClientDetails>
          <ProductsTable>
            <thead>
              <tr>
                <td>Product </td>
                <td>Quantity</td>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((order, id) => (
                <tr key={id}>
                  <td>{order.name}</td>
                  <td>{order.quantity}</td>
                </tr>
              ))}
            </tbody>
          </ProductsTable>
        </OrderDetails>
        <Button
          onClick={() => {
            navigate(`/orders/${orderDetails.id}`);
          }}
        >
          edit order
        </Button>
        <Button
          onClick={() => {
            saveChangesInApi();
            updateAllOrdersState();
            SetIsModalOpen(false);
          }}
        >
          save & close
        </Button>
      </ModalContainer>
    </Modal>
  );
};

ProductDetailsModal.propTypes = {};

export default ProductDetailsModal;
