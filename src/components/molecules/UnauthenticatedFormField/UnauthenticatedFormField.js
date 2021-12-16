import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  margin: 1rem;
  display: flex;
  align-self: center;
  justify-content: flex-start;
  transition: all 0.3s;
  &:focus-within {
    transform: scale(1.05, 1.05);
  }
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.darkPurple};
  box-sizing: border-box;
  width: 250px;
  height: 30px;
  box-shadow: -2px 2px 5px rgba(115, 124, 142, 0.29);
  border-radius: 19px;
  font-size: ${({ theme }) => theme.fontSize.m};
  resize: none;
  font-size: ${({ theme }) => theme.fontSize.l};
  transition: box-shadow 0.3s ease-in-out;

  &::placeholder {
    color: transparent;
  }
  &:focus {
    outline: none;
    box-shadow: -2px 2px 8px rgba(115, 124, 142, 0.29);
  }
  &:focus + Label,
  &:not(:placeholder-shown) + Label {
    transform: translateY(-28px) translateX(-23px) scale(0.9);
  }
`;

const Label = styled.label`
  font-family: Montserrat, sans-serif;
  position: absolute;
  display: block;
  margin: 0 !important;
  top: 5px;
  left: 14px;
  transform: translateY(0);
  transition: all 0.3s;
  font-weight: 500;
  margin: 0.5rem 0;
  font-size: ${({ theme }) => theme.fontSize.l};
  color: ${({ theme }) => theme.colors.black};
`;

const UnauthenticatedFormField = ({ label, type, id, placeholder, name, ...props }) => {
  return (
    <Wrapper>
      <Input type={type} name={name} placeholder={placeholder} id={id} {...props}></Input>
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};

export default UnauthenticatedFormField;
