import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px dashed black;
  background-color: transparent;
  padding: 0;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSize.l};

  &:focus {
    outline: none;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;
const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: flex-end;
`;

const FormField = ({ type = 'text', name, id, label = null, ...props }) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label ? label : null}</Label>
      <Input type={type} name={name} id={id} {...props}></Input>
    </Wrapper>
  );
};

FormField.propTypes = {};

export default FormField;
