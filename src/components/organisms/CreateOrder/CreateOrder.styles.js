import styled from 'styled-components';
import ViewWrapper from 'components/atoms/ViewWrapper/ViewWrapper';
import { Button } from 'components/atoms/Button/Button';
import { DeleteButton } from 'components/atoms/DeleteButton/DeleteButton';

export const StyledAddOrderButton = styled(Button)`
  position: absolute;
  bottom: 0;
  height: 3rem;
  align-self: center;
  transition: all 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    transform: scale(1.04);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  margin: 32px 132px 32px 32px;
`;
export const StyledViewWraper = styled(ViewWrapper)`
  height: 100%;
  width: 400px;
  padding: 2rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const AddProductButton = styled.button`
  margin-left: 4px;
  align-self: center;
  justify-self: center;
  background-color: ${({ theme }) => theme.colors.darkPurple};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 10px;
  font-weight: 500;
  padding: 4px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.04);
  }
`;

export const AddProductsWrapper = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr, 1fr;
  li {
    margin-bottom: 4px;
    list-style: none;
    position: relative;
    border-bottom: 1px dashed black;
  }
`;
export const ProductNameWrapper = styled.div`
  grid-column: 1/1;
`;
export const ProductQuantityWrapper = styled.div`
  grid-column: 2/2;
`;

export const StyledInput = styled.input`
  margin: 0.5rem 0 0.8rem 0;
  border-radius: 7px;
  height: 1.5rem;
  width: 9rem;
  padding: 0.3rem;
  border: 1px solid black;
  &:focus {
    outline: none;
  }
`;
export const Title = styled.p`
  font-weight: 500;
`;
export const StyledDeleteButton = styled(DeleteButton)`
  position: absolute;
  top: 0;
  right: 0;
`;
