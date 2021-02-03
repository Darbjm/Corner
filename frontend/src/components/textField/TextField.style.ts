import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import * as COLORS from '../../styles/Colors';

export const TextFieldn = styled(TextField)<{
   $textFieldSize?: 'large'; 
}>`
   && { 
    margin-bottom: 15px;
    width: ${({$textFieldSize}): string => $textFieldSize === 'large' ? '400px;' : '166px;'}
   }
   && label {
    font-family: Raleway, sans-serif;
   }
   && input {
      font-size: ${({$textFieldSize}): string => $textFieldSize === 'large' ? '40px;' : 'inherit;'}
       font-family: Raleway, sans-serif;
      }
   && .Mui-focused {
      color: ${({color}): string => color === 'primary' ? `${COLORS.PRIMARY}` : `${COLORS.SECONDARY}`};
      font-size: ${({$textFieldSize}): string => $textFieldSize === 'large' ? '18px' : 'inherit'}
   }
   && .MuiInput-underline:after {
      border-bottom: ${({color}): string => color === 'primary' ? `2px solid ${COLORS.PRIMARY}` : `2px solid ${COLORS.SECONDARY}`};
     }
   && .MuiInput-colorSecondary.MuiInput-underline:after {
      border-bottom-color: ${({color}): string => color === 'primary' ? `${COLORS.PRIMARY}` : `${COLORS.SECONDARY}`};
     }
`