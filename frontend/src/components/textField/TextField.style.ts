import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import {ColorTypeKey} from '../../styles/theme';
import * as COLORS from '../../styles/Colors';

export const TextFieldn = styled(TextField)`
   && { 
    margin-bottom: 15px;
   }
   && ::after {
    border-bottom: ${({color}): string => color === 'primary' ? `2px solid ${COLORS.PRIMARY}` : `2px solid ${COLORS.SECONDARY}`};
   }
`