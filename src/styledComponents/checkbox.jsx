import { styled } from "styled-components";

export const Input = (props) => {
  const StyledInput = styled.input`
    background-color: #000;
  `;

  return <StyledInput {...props} />;
};
