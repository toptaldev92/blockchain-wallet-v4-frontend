import { Image } from 'blockchain-info-components'
import { NavLink } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

import {
  Navbar,
  NavbarBrand,
  NavbarDivider,
  NavbarHeader,
  NavbarMenu,
  NavbarNav,
  NavbarNavItem
} from 'components/Navbar'
import Balances from '../MenuLeft/Balances'
import Features from './Features'
import Refresh from './Refresh'
import SecurityCenter from './SecurityCenter'
import Settings from './Settings'

import { Props as OwnProps } from '.'

type Props = {
  handleToggle: () => void
} & OwnProps

const Spacer = styled.div``

const NavbarContainer = styled.div`
  width: auto;
  padding: 0 16px;
  background-color: ${props => props.theme.grey900};
`

const BlockchainLogoImage = styled(Image)`
  display: block;
  height: 20px;
  width: 160px;
`

const NavbarBottomStyled = styled(Navbar)`
  display: flex;
  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.whiteFade100};
`

const Medium: React.FC<Props> = props => {
  return (
    <NavbarContainer>
      <Navbar>
        <NavbarHeader>
          <NavbarBrand>
            <NavLink to='/home' data-e2e='homeLink'>
              <BlockchainLogoImage name='blockchain-logo' />
            </NavLink>
          </NavbarBrand>
        </NavbarHeader>
        <NavbarMenu>
          <Spacer />
          <NavbarNav>
            <NavbarNavItem>
              <SecurityCenter />
            </NavbarNavItem>
            <NavbarDivider />
            <NavbarNavItem>
              <Refresh />
            </NavbarNavItem>
            <NavbarDivider />
            <NavbarNavItem>
              <Settings {...props} />
            </NavbarNavItem>
          </NavbarNav>
        </NavbarMenu>
      </Navbar>
      <NavbarBottomStyled height='60px'>
        <Balances />
        <NavbarMenu>
          <NavbarNav>
            <Features />
          </NavbarNav>
        </NavbarMenu>
      </NavbarBottomStyled>
    </NavbarContainer>
  )
}

export default Medium
