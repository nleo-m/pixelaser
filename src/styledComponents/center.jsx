import { styled } from "styled-components";
import { Flex } from "./flex";

export const Center = ({ children }) => {
  const StyledDiv = styled.div`
    justify-content: center;
    margin: auto;
  `;

  return (
    <Flex direction="column" width="100%" height="100vh">
      <StyledDiv>{children}</StyledDiv>
    </Flex>
  );
};
