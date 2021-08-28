import React from 'react'
import { HeaderWrapper } from './style'
import { Cart } from '../Cart'
import { Search } from '../Search'
import { Link } from 'gatsby'
import {Logo} from '../Logo/logo'
export const Header = () => {
    return (
        <HeaderWrapper>
            <div>
                <Link to="/">
                {''}<Logo/>
                </Link>
            </div>
            <Search/>
            <Cart/>
           
        </HeaderWrapper>
    )
}
