import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const CheckboxInput = styled.input`
  &:checked {
    transform: scale(1.1);
  }
`;

const Label = styled.label`
  margin-left: 2px;
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const Checkbox = ({ id, label, name }) => {
  return (
    <Wrapper>
      <CheckboxInput type="checkbox" name={name} id={id}></CheckboxInput>
      <Label htmlFor={name} id={id}>
        {label}
      </Label>
    </Wrapper>
  );
};

Checkbox.propTypes = {};

export default Checkbox;
