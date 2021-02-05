import styled from "styled-components";
import { LIGHT_PRIMARY } from '../../styles/Colors'
export const UL = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0;
  `;

  export const LI = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  :hover {
    background-color: ${LIGHT_PRIMARY}};
  }
  `