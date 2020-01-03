import { actions } from 'data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Icon, Text } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid ${props => props.theme['gray-1']};
`
const Tab = styled.div`
  width: 33%;
  display: flex;
  padding: 6px 5px;
  position: relative;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (min-width: 768px) {
    padding: 13px 5px;
  }
  &:after {
    display: block;
    content: '';
    width: 100%;
    left: 0;
    bottom: -2px;
    position: absolute;
    transform: scaleX(0);
    transition: transform 0.3s;
    border-bottom: solid 3px ${props => props.theme.blue600};
  }
  > * {
    color: ${props => props.theme['gray-2']};
    transition: color 0.3s;
  }
  &.active,
  &:hover {
    &:after {
      transform: scaleX(1);
    }
    > * {
      color: ${props => props.theme.blue900};
    }
  }
`
const TabHeader = styled(Text)`
  font-weight: 500;
`
const TabIcon = styled(Icon)`
  margin-right: 10px;
  @media (min-width: 768px) {
    font-size: ${props => props.size || '20px'};
  }
`

class TabsContainer extends React.PureComponent {
  handleClick = tab => {
    this.props.layoutActions.setBalancesTableTab(tab)
  }

  render () {
    const { currentTab } = this.props
    return (
      <Tabs>
        <Tab
          className={currentTab === 'total' ? 'active' : ''}
          onClick={() => this.handleClick('total')}
        >
          <TabIcon name='bank-filled' />
          <TabHeader data-e2e='totalTab'>
            <FormattedMessage
              id='scenes.home.balance.total'
              defaultMessage='Total'
            />
          </TabHeader>
        </Tab>
        <Tab
          className={currentTab === 'wallet' ? 'active' : ''}
          onClick={() => this.handleClick('wallet')}
        >
          <TabIcon name='wallet-filled' size='24px' />
          <TabHeader data-e2e='walletTab'>
            <FormattedMessage
              id='scenes.home.balance.wallet'
              defaultMessage='Wallet'
            />
          </TabHeader>
        </Tab>
        <Tab
          className={currentTab === 'lockbox' ? 'active' : ''}
          onClick={() => this.handleClick('lockbox')}
        >
          <TabIcon name='hardware' size='24px' />
          <TabHeader data-e2e='lockboxTab'>
            <FormattedMessage
              id='scenes.home.balance.hardware'
              defaultMessage='Hardware'
            />
          </TabHeader>
        </Tab>
      </Tabs>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  layoutActions: bindActionCreators(actions.components.layoutWallet, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(TabsContainer)
