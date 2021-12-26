import React, { useState, useRef } from 'react';
import FormField from 'components/molecules/FormField/FormField';
import { useCreateOrder } from 'hooks/useCreateOrder';
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
  StyledDeleteButton,
} from './CreateOrder.styles';
import LoadingSpinner from 'components/atoms/LoadingSpinner/LoadingSpinner';

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
  const productNameField = useRef();
  const [clientFormValues, setClientFormValues] = useState(initialClientFormValues);
  const [productFormValues, setProductFormValues] = useState(initialProductFormValues);
  const [products, setProducts] = useState([]);

  const handleClientInputChange = (e) => {
    setClientFormValues({
      ...clientFormValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleProductInputChange = (e) => {
    setProductFormValues({
      ...productFormValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (productFormValues.name !== '' && productFormValues.quantity !== '') {
      const newProduct = {
        id: Math.floor(Math.random() * 500),
        name: productFormValues.name,
        quantity: productFormValues.quantity,
      };
      setProducts([newProduct, ...products]);
      setProductFormValues(initialProductFormValues);
      productNameField.current.focus();
    }
  };

  const handleDeleteProduct = (id) => {
    const fiteredProducts = products.filter((product) => product.id !== id);
    setProducts(fiteredProducts);
  };

  const handleAddNewOrder = (e) => {
    e.preventDefault();
    if (clientFormValues.clientName !== '' && clientFormValues.clientAdress !== '' && products.length > 0) {
      handleCreateOrder({ clientName: clientFormValues.clientName, clientAdress: clientFormValues.clientAdress, products: [...products] });
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
                ref={productNameField}
                type="text"
                placeholder="e.g. chocolate"
                name="name"
                value={productFormValues.name}
                onChange={handleProductInputChange}
              />
              <ul>
                {products.map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </ProductNameWrapper>
            <ProductQuantityWrapper>
              <Title>Product quantity:</Title>
              <StyledInput
                type="text"
                placeholder="e.g. 1kg "
                name="quantity"
                value={productFormValues.quantity}
                onChange={handleProductInputChange}
              />
              <AddProductButton onClick={handleAddProduct}>add</AddProductButton>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    {product.quantity}
                    <StyledDeleteButton type="button" onClick={() => handleDeleteProduct(product.id)}>
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
