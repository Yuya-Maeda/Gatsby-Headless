import styled from 'styled-components';
import {StyledLink} from '../StyledLink'
export const CartWrapper = styled(StyledLink).attrs(() =>({
    to: '/cart',
}))`
display:flex;
/* align-items:center; */
padding-left:60px;
color: black;
text-decoration: none;
>svg{
    margin:auto 0;
}
>div:last-child{
    padding-left: 8px;
    margin: auto 0;
}

&:hover{
    text-decoration: underline;
}
`