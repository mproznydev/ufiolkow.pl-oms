import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import FormField from 'components/molecules/FormField/FormField';
import { useCreateOrder } from 'hooks/useCreateOrder';
import { DeleteButton } from 'components/atoms/DeleteButton/DeleteButton';
import {
  StyledAddOrderButton,
  Wrapper,
  StyledViewWraper,
  StyledForm,
  AddProductButton,
  AddProductsWrapper,
  ProductNameWrapper,
  ProductQuantityWrapper,
  StyledInput,
  Title,
} from './CreateOrder.styles';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';

const StyledDeleteButton = styled(DeleteButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

const initialClientFormValues = {
  clientName: '',
  clientAdress: '',
};
const initialProductFormValues = {
  name: '',
  quantity: '',
};

const CreateOrder = () => {
  const { mutate: handleCreateOrder, status } = useCreateOrder();
  const firstInputEl = useRef();
  const [clientFormValues, setClientFormValues] = useState(initialClientFormValues);
  const [productFormValues, setProductFormValues] = useState(initialProductFormValues);
  const [products, setProducts] = useState([]);
  const handleClientInputChange = (e) => {
    setClientFormValues({
      ...clientFormValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputChange = (e) => {
    setProductFormValues({
      ...productFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (productFormValues.name !== '' && productFormValues.quantity !== '') {
      const newProduct = {
        name: productFormValues.name,
        quantity: productFormValues.quantity,
      };
      setProducts([newProduct, ...products]);
      setProductFormValues({ name: '', quantity: '' });
      firstInputEl.current.focus();
    }
  };

  const handleDeleteProduct = (name) => {
    const fiteredProducts = products.filter((product) => product.name !== name);
    setProducts(fiteredProducts);
  };

  const handleAddNewOrder = (e) => {
    e.preventDefault();
    if (clientFormValues.clientName !== '' && clientFormValues.clientAdress !== '' && products.length > 0) {
      handleCreateOrder({ clientName: clientFormValues.clientName, clientAdress: clientFormValues.clientAdress, products: [...products] });
      // navigate('/orders');
      setClientFormValues(initialClientFormValues);
      setProductFormValues(initialProductFormValues);
      setProducts([]);
    }
  };

  return (
    <Wrapper>
      <StyledViewWraper title="Create new order">
        <StyledForm onSubmit={handleAddNewOrder}>
          <FormField
            name="clientName"
            id="client-name"
            label="client name"
            value={clientFormValues.clientName}
            onChange={handleClientInputChange}
          ></FormField>
          <FormField
            name="clientAdress"
            id="client-adress"
            label="client adress"
            value={clientFormValues.clientAdress}
            onChange={handleClientInputChange}
          ></FormField>
          <AddProductsWrapper>
            <ProductNameWrapper>
              <Title>Product name:</Title>
              <StyledInput
                ref={firstInputEl}
                type="text"
                placeholder="e.g. chocolate"
                name="name"
                value={productFormValues.name}
                onChange={handleInputChange}
              />
              <ul>
                {products.map((product, id) => (
                  <li key={id}>{product.name}</li>
                ))}
              </ul>
            </ProductNameWrapper>
            <ProductQuantityWrapper>
              <Title>Product quantity:</Title>
              <StyledInput type="text" placeholder="e.g. 1kg " name="quantity" value={productFormValues.quantity} onChange={handleInputChange} />
              <AddProductButton onClick={handleAddProduct}>add</AddProductButton>
              <ul>
                {products.map((product, id) => (
                  <li key={id}>
                    {product.quantity}
                    <StyledDeleteButton type="button" onClick={() => handleDeleteProduct(product.name)}>
                      x
                    </StyledDeleteButton>
                  </li>
                ))}
              </ul>
            </ProductQuantityWrapper>
          </AddProductsWrapper>
          {status === 'loading' ? (
            <StyledAddOrderButton>
              <LoadingSpinner></LoadingSpinner>
            </StyledAddOrderButton>
          ) : (
            <StyledAddOrderButton type="submit">add new order</StyledAddOrderButton>
          )}
        </StyledForm>
      </StyledViewWraper>
    </Wrapper>
  );
};

CreateOrder.propTypes = {};

export default CreateOrder;
