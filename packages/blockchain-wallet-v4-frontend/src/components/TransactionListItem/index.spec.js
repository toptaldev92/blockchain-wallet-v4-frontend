import React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import ListItemContainer from './index'
import configureStore from 'redux-mock-store'

import { Remote } from 'blockchain-wallet-v4/src'
import {
  getOptions,
  getSupportedCoins,
  getErc20CoinList
} from 'blockchain-wallet-v4/src/redux/walletOptions/selectors'

jest.mock('blockchain-wallet-v4/src/redux/walletOptions/selectors')
jest.mock('./template', () => () => <div />)
jest.mock('blockchain-info-components', () => ({
  TooltipRebuild: jest.fn()
}))

getOptions.mockImplementation(() => Remote.of({}))
getSupportedCoins.mockImplementation(() => Remote.of({}))
getErc20CoinList.mockImplementation(() => Remote.of({}))

const store = configureStore([])({})
const tx = { hash: '123abc' }

describe('ListItemContainer', () => {
  it('renders correctly', () => {
    const component = mount(<ListItemContainer store={store} />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
  describe('handleEditDescription()', () => {
    it('handles eth tx notes', () => {
      const component = shallow(
        <ListItemContainer transaction={tx} coin='ETH' store={store} />
      )
      const instance = component.dive().instance()
      const spy = jest.spyOn(instance.props.ethActions, 'setTxNotesEth')
      instance.handleEditDescription()
      expect(spy).toHaveBeenCalled()
    })
    it('handles btc tx notes', () => {
      const component = shallow(
        <ListItemContainer transaction={tx} coin='BTC' store={store} />
      )
      const instance = component.dive().instance()
      const spy = jest.spyOn(instance.props.walletActions, 'setTransactionNote')
      instance.handleEditDescription()
      expect(spy).toHaveBeenCalled()
    })
  })
})
