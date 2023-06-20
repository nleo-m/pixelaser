import { styled } from "styled-components";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  ${(props) => props.width && `width: ${props.width}`};
  ${(props) => props.height && `height: ${props.height}`};
`
