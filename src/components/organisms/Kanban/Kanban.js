import React, { useEffect, useState } from 'react';
import { LoadingWrapper, StyledViewWrapper, StyledElementWrapper, UnOrderedList, KanbanSectionWrapper, Order } from './Kanban.styles';
import ProductDetailsModal from '../ProductDetailsModal/ProductDetailsModal';
import { useOrders } from 'hooks/useOrders';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';
import { useSaveOrder } from 'hooks/useSaveOrder';

const Kanban = ({ className }) => {
  const { mutate: saveOrder } = useSaveOrder();

  const { data: orders = [], status: ordersStatus } = useOrders();
  const [groupedOrders, setGroupedOrders] = useState({ new: [], inProgress: [], done: [] });

  const [orderDetailsInModal, setOrderDetailsInModal] = useState({});

  const [isModalOpen, SetIsModalOpen] = useState(false);

  useEffect(() => {
    if (orders.length > 0) {
      const inProgressOrd = orders.filter((order) => order.status === 'in progress');
      const newOrd = orders.filter((order) => order.status === 'new');
      const doneOrd = orders.filter((order) => order.status === 'done');
      setGroupedOrders({ new: [...newOrd], inProgress: [...inProgressOrd], done: [...doneOrd] });
    }
  }, [orders]);

  const handleOrderDetailsInModal = async (id) => {
    const orderDetails = [...orders].find((order) => order.id === id);
    setOrderDetailsInModal(orderDetails);
    SetIsModalOpen(true);
  };

  const handleChangeOrderStatus = (e) => {
    if (e.target.value !== orderDetailsInModal.status) {
      setOrderDetailsInModal({
        ...orderDetailsInModal,
        status: e.target.value,
      });
    }
  };

  const updateAllOrdersState = () => {
    const orders = [...groupedOrders.done, ...groupedOrders.new, ...groupedOrders.inProgress];
    const filteredOrders = orders.filter((order) => order.id !== orderDetailsInModal.id);
    filteredOrders.push(orderDetailsInModal);
    const inProgressOrd = filteredOrders.filter((order) => order.status === 'in progress');
    const newOrd = filteredOrders.filter((order) => order.status === 'new');
    const doneOrd = filteredOrders.filter((order) => order.status === 'done');
    setGroupedOrders({ new: [...newOrd], inProgress: [...inProgressOrd], done: [...doneOrd] });
  };

  const saveChangesInApi = async () => {
    saveOrder(orderDetailsInModal);
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
                  {groupedOrders.new.map((order, id) => (
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
                  {groupedOrders.inProgress.map((order, id) => (
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
                  {groupedOrders.done.map((order, id) => (
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
