import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  pointer-events: ${({ isEditable }) => (isEditable ? 'auto' : 'none')};
  border: ${({ isEditable }) => (isEditable ? '1px solid black' : '1px solid transparent')};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: 500;
  margin-bottom: 0.5rem;
`;
const StyledLabel = styled.label`
  font-weight: 400;
`;
const OrderDetailsFormField = ({ isEditable, value, name, handleInputChange, id, label = null, ...props }) => {
  return (
    <>
      <StyledLabel htmlFor={id}>{label ? label : null}</StyledLabel>
      <StyledInput {...props} isEditable={isEditable} value={value} name={name} onChange={handleInputChange}></StyledInput>
    </>
  );
};

OrderDetailsFormField.propTypes = {};

export default OrderDetailsFormField;
