import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import OrderDetailsFormField from 'components/molecules/OrderDetailsFormField/OrderDetailsFormField';
import { ElementWrapper } from 'components/atoms/ElementWrapper/ElementWrapper';
import { Button } from 'components/atoms/Button/Button';
import { properData } from 'helpers/helpers';
import { useOrder } from 'hooks/useOrder';
import { useSaveOrder } from 'hooks/useSaveOrder';

const Wrapper = styled.div`
  justify-self: center;
  align-self: center;
  max-width: 900px;
  margin: 1rem 4rem 6rem 4rem;
`;
const OrderWrapper = styled.form`
  display: flex;
  padding: 1rem;
  justify-content: space-around;
`;

const StyledButton = styled(Button)`
  height: 1.3rem;
  align-self: center;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

const DeleteButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.m};
  border-radius: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.white};
  border: none;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.secondary};
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.l};
  text-align: center;
  margin: 0.5rem 0 1rem 0;
`;

const ClienInfoWrapper = styled(ElementWrapper)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
const ProductsWrapper = styled(ElementWrapper)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-left: 0.5rem;
  min-width: 445px;
`;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order = {} } = useOrder(id);
  const { mutate: saveOrder } = useSaveOrder();
  const [inputValues, setInputValues] = useState({
    clientAdress: '',
    clientName: '',
    products: [],
    status: '',
  });
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (order) {
      setInputValues(order);
    }
  }, [order]);

  const handleToggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleClientInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleProductsInputChange = (e, id) => {
    const newProductsArray = inputValues.products;
    newProductsArray[id] = {
      ...newProductsArray[id],
      [e.target.name]: e.target.value,
    };
    setInputValues({
      ...inputValues,
      products: newProductsArray,
    });
  };

  const handleAddNewProduct = () => {
    setInputValues({ ...inputValues, products: [...inputValues.products, { name: '', quantity: '' }] });
  };
  const handleDeleteProduct = () => {
    const filteredProducts = inputValues.products.filter((product, idx) => idx !== inputValues.products.length - 1);
    setInputValues({ ...inputValues, products: [...filteredProducts] });
  };

  const saveChanges = (e) => {
    e.preventDefault();
    if (order !== inputValues) {
      saveOrder(inputValues);
    }
    handleToggleEdit();
  };
  return (
    <Wrapper>
      <ViewWrapper title="Order details">
        <OrderWrapper onSubmit={saveChanges}>
          <ClienInfoWrapper>
            <Title>General info</Title>
            <OrderDetailsFormField
              isEditable={isEditable}
              value={inputValues.clientName}
              name="clientName"
              handleInputChange={handleClientInputChange}
              label="client name"
            ></OrderDetailsFormField>
            <OrderDetailsFormField
              isEditable={isEditable}
              value={inputValues.clientAdress}
              name="clientAdress"
              handleInputChange={handleClientInputChange}
              label="client adress"
            ></OrderDetailsFormField>
            <OrderDetailsFormField
              isEditable={isEditable}
              value={inputValues.status}
              name="status"
              handleInputChange={handleClientInputChange}
              label="status"
            ></OrderDetailsFormField>
            <OrderDetailsFormField
              isEditable={isEditable}
              value={properData(inputValues.createdAt)}
              name="clientAdress"
              handleInputChange={handleClientInputChange}
              label="created date"
            ></OrderDetailsFormField>
            {isEditable ? null : (
              <StyledButton type="button" onClick={handleToggleEdit}>
                edit
              </StyledButton>
            )}

            {isEditable ? <StyledButton type="submit">save</StyledButton> : null}
          </ClienInfoWrapper>
          <ProductsWrapper>
            <Title>All products</Title>
            {inputValues.products
              ? inputValues.products.map((product, id) => (
                  <ProductWrapper key={id}>
                    <OrderDetailsFormField
                      isEditable={isEditable}
                      value={product.name}
                      name="name"
                      handleInputChange={(e) => handleProductsInputChange(e, id)}
                    ></OrderDetailsFormField>
                    <OrderDetailsFormField
                      isEditable={isEditable}
                      value={product.quantity}
                      name="quantity"
                      handleInputChange={(e) => handleProductsInputChange(e, id)}
                    ></OrderDetailsFormField>
                  </ProductWrapper>
                ))
              : null}

            {isEditable ? (
              <>
                {inputValues.products.length > 0 ? (
                  <DeleteButton type="button" onClick={handleDeleteProduct}>
                    delete last product
                  </DeleteButton>
                ) : null}
                <StyledButton type="button" onClick={handleAddNewProduct}>
                  add new
                </StyledButton>
              </>
            ) : null}
          </ProductsWrapper>
        </OrderWrapper>
      </ViewWrapper>
    </Wrapper>
  );
};

export default OrderDetails;
