import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import * as COLORS from '../../styles/Colors';

export const TextFieldn = styled(TextField)`
   && { 
    margin-bottom: 15px;
   }
   && label {
    font-size: 12px;
   }
   && .Mui-focused {
      color: ${({color}): string => color === 'primary' ? `${COLORS.PRIMARY}` : `${COLORS.SECONDARY}`};
   }
   && .MuiInput-underline:after {
      border-bottom: ${({color}): string => color === 'primary' ? `2px solid ${COLORS.PRIMARY}` : `2px solid ${COLORS.SECONDARY}`};
     }
   && .MuiInput-colorSecondary.MuiInput-underline:after {
      border-bottom-color: ${({color}): string => color === 'primary' ? `${COLORS.PRIMARY}` : `${COLORS.SECONDARY}`};
     }
`