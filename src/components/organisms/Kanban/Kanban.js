import React, { useEffect, useState } from 'react';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import styled from 'styled-components';
import axios from 'axios';
import ProductDetailsModal from '../ProductDetailsModal/ProductDetailsModal';
import { useOrders } from 'hooks/useOrders';
import { useOrder } from 'hooks/useOrder';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';

const StyledViewWrapper = styled(ViewWrapper)`
  display: flex;
  justify-content: center;
  min-height: 320px;
`;
const Order = styled.li`
  list-style: none;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
`;

const StyledElementWrapper = styled(ElementWrapper)`
  cursor: pointer;
  margin: 0.3rem;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const UnOrderedList = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const KanbanSectionWrapper = styled.div`
  margin: 1rem;
  min-width: 240px;
  min-height: 300px;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow.primary};

  overflow-y: scroll;
  scrollbar-width: none;
  background-color: ${({ isNew, isInProgress, isDone, theme }) => {
    if (isNew) {
      return theme.colors.kanbanNew;
    }
    if (isInProgress) {
      return theme.colors.kanbanInProgess;
    }
    if (isDone) {
      return theme.colors.kanbanDone;
    }
  }};
  ::-webkit-scrollbar {
    display: none;
  }
  & p {
    text-align: center;
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: 600;
    margin: 5px 0 5px 0;
  }
`;

const IsLoadingWrapper = styled.div`
  width: 600px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const Kanban = ({ className }) => {
  const { data: orders, status: OrdersStatus } = useOrders();
  const [allOrders, setAllOrders] = useState({ new: '', inProgress: '', done: '' });
  const [orderDetailsInModal, setOrderDetailsInModal] = useState({});
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log(orders);

  const handleChangeOrderStatus = (e) => {
    if (e.target.value !== orderDetailsInModal.status) {
      setOrderDetailsInModal({
        ...orderDetailsInModal,
        status: e.target.value,
      });
    }
  };

  const updateAllOrdersState = () => {
    const orders = [...allOrders.done, ...allOrders.new, ...allOrders.inProgress];
    const filterdOrders = orders.filter((order) => order.id !== orderDetailsInModal.id);
    filterdOrders.push(orderDetailsInModal);
    const inProgressOrd = filterdOrders.filter((order) => order.status === 'in progress');
    const newOrd = filterdOrders.filter((order) => order.status === 'new');
    const doneOrd = filterdOrders.filter((order) => order.status === 'done');
    setAllOrders({ new: [...newOrd], inProgress: [...inProgressOrd], done: [...doneOrd] });
  };

  const saveChangesInApi = async () => {
    try {
      await axios.put(`http://localhost:1337/orders/${orderDetailsInModal.id}`, { ...orderDetailsInModal }, { withCredentials: true });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (orders && orders.length > 0) {
      const inProgressOrd = orders.filter((order) => order.status === 'in progress');
      const newOrd = orders.filter((order) => order.status === 'new');
      const doneOrd = orders.filter((order) => order.status === 'done');

      setAllOrders({ new: [...newOrd], inProgress: [...inProgressOrd], done: [...doneOrd] });

      setIsLoading(false);
    }
  }, [orders]);

  const handleOrderDetailsInModal = async (id) => {
    const orderDetails = [...orders].find((order) => order.id === id);
    setOrderDetailsInModal(orderDetails);
    SetIsModalOpen(true);
  };

  return (
    <StyledViewWrapper title="Kanban" className={className}>
      {isLoading ? (
        <IsLoadingWrapper>
          <p>please wait...</p>
        </IsLoadingWrapper>
      ) : (
        <>
          <KanbanSectionWrapper isNew>
            <p>New</p>
            <UnOrderedList>
              {allOrders.new.map((order, id) => (
                <Order key={id}>
                  <StyledElementWrapper
                    onClick={() => {
                      handleOrderDetailsInModal(order.id);
                    }}
                  >
                    {order.clientName}
                  </StyledElementWrapper>
                </Order>
              ))}
            </UnOrderedList>
          </KanbanSectionWrapper>
          <KanbanSectionWrapper isInProgress>
            <p>In progress</p>
            <UnOrderedList>
              {allOrders.inProgress.map((order, id) => (
                <Order key={id}>
                  <StyledElementWrapper
                    onClick={() => {
                      handleOrderDetailsInModal(order.id);
                    }}
                  >
                    {order.clientName}
                  </StyledElementWrapper>
                </Order>
              ))}
            </UnOrderedList>
          </KanbanSectionWrapper>
          <KanbanSectionWrapper isDone>
            <p>Done</p>
            <UnOrderedList>
              {allOrders.done.map((order, id) => (
                <Order key={id}>
                  <StyledElementWrapper
                    onClick={() => {
                      handleOrderDetailsInModal(order.id);
                    }}
                  >
                    {order.clientName}
                  </StyledElementWrapper>
                </Order>
              ))}
            </UnOrderedList>
          </KanbanSectionWrapper>
          {isModalOpen ? (
            <ProductDetailsModal
              updateAllOrdersState={updateAllOrdersState}
              saveChangesInApi={saveChangesInApi}
              orderDetails={orderDetailsInModal}
              SetIsModalOpen={SetIsModalOpen}
              handleChangeOrderStatus={handleChangeOrderStatus}
            ></ProductDetailsModal>
          ) : null}
        </>
      )}
      {OrdersStatus === 'success' && !orders.length > 0 ? <ErrorMessage></ErrorMessage> : null}
    </StyledViewWrapper>
  );
};

Kanban.propTypes = {};

export default Kanban;
