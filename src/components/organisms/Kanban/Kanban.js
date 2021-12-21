import React, { useEffect, useState } from 'react';
import { LoadingWrapper, StyledViewWrapper, StyledElementWrapper, UnOrderedList, KanbanSectionWrapper, Order } from './Kanban.styles';
import axios from 'axios';
import ProductDetailsModal from '../ProductDetailsModal/ProductDetailsModal';
import { useOrders } from 'hooks/useOrders';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';

const Kanban = ({ className }) => {
  const { data: orders = [], status: ordersStatus } = useOrders();
  const [allOrders, setAllOrders] = useState({ new: [], inProgress: [], done: [] });
  const [orderDetailsInModal, setOrderDetailsInModal] = useState({});
  const [isModalOpen, SetIsModalOpen] = useState(false);

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
      await axios.put(`https://ufiolkow-oms.herokuapp.com/orders/${orderDetailsInModal.id}`, { ...orderDetailsInModal }, { withCredentials: true });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      const inProgressOrd = orders.filter((order) => order.status === 'in progress');
      const newOrd = orders.filter((order) => order.status === 'new');
      const doneOrd = orders.filter((order) => order.status === 'done');
      setAllOrders({ new: [...newOrd], inProgress: [...inProgressOrd], done: [...doneOrd] });
    }
  }, [orders]);

  const handleOrderDetailsInModal = async (id) => {
    const orderDetails = [...orders].find((order) => order.id === id);
    setOrderDetailsInModal(orderDetails);
    SetIsModalOpen(true);
  };

  return (
    <StyledViewWrapper title="Kanban" className={className}>
      {ordersStatus === 'success' && !orders.length > 0 ? (
        <ErrorMessage></ErrorMessage>
      ) : (
        <>
          {ordersStatus === 'loading' ? (
            <LoadingWrapper>
              <LoadingSpinner isPurple></LoadingSpinner>
            </LoadingWrapper>
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
        </>
      )}
    </StyledViewWrapper>
  );
};

Kanban.propTypes = {};

export default Kanban;
