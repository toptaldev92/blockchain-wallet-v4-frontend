import { replace } from 'ramda'
import React from 'react'
import styled from 'styled-components'

import Alerts from 'components/Alerts'
import ErrorBoundary from 'providers/ErrorBoundaryProvider'
import ExchangeMenu from 'scenes/Exchange/Menu'
import ExchangeProfileMenu from 'scenes/Settings/Profile/Menu'
import Header from './Header'
import Menu from 'scenes/Transactions/Menu'
import MenuLeft from './MenuLeft'
import MenuTop from './MenuTop'
import Modals from 'modals'
import Page from './Page'
import SettingsAddressesMenu from 'scenes/Settings/Addresses/Menu'
import Tooltips from 'components/Tooltips'
import TrayRight from './TrayRight'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: calc(100% - 60px);
`
const Nav = styled.div`
  flex: 0 0 60px;
  background-color: ${props => props.theme.blue900};
`
const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: calc(100% - 250px);
  background-color: ${props => props.theme.white};

  @media (max-width: 768px) {
    width: 100%;
  }
`
const Top = styled.div`
  width: 100%;
`

// TODO: @header issue
// change this so that pages control their own scroll
const WalletLayout = props => {
  const { coin, location, children } = props

  return (
    <Wrapper>
      <ErrorBoundary>
        <Alerts />
        <Tooltips />
        <Modals />
        <Nav>
          <Header />
        </Nav>
        <Container>
          <MenuLeft location={location} />
          <TrayRight />
          <Content data-e2e={`page${replace(/\//g, '-', location.pathname)}`}>
            <Top>
              <MenuTop />
            </Top>
            {location.pathname.includes('/transactions') && (
              <Menu coin={coin} />
            )}
            {location.pathname.includes('/swap') && (
              <ExchangeMenu
                historySelected={location.pathname.includes('/swap/history')}
              />
            )}
            {location.pathname.includes('/settings/addresses') && (
              <SettingsAddressesMenu location={location} />
            )}
            {location.pathname.includes('/settings/profile') && (
              <ExchangeProfileMenu />
            )}
            <Page>{children}</Page>
          </Content>
        </Container>
      </ErrorBoundary>
    </Wrapper>
  )
}

export default WalletLayout
