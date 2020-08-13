import { bindActionCreators } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { formValueSelector } from 'redux-form'
import React from 'react'

import { actions, selectors } from 'data'
import { FlatLoader } from 'blockchain-info-components'
import UsedAddressesTable from './template'

class UsedAddressesTableContainer extends React.PureComponent<Props> {
  componentDidMount () {
    this.props.componentActions.fetchUsedAddresses(this.props.walletIndex)
  }

  render () {
    const { usedAddresses, search } = this.props

    return !usedAddresses
      ? null
      : usedAddresses.cata({
          Success: value => (
            <UsedAddressesTable usedAddresses={value} search={search} />
          ),
          Failure: () => <div />,
          Loading: () => (
            <FlatLoader
              style={{ margin: '25px auto' }}
              width='100px'
              height='12px'
            />
          ),
          NotAsked: () => <div />
        })
  }
}

const mapStateToProps = (state, ownProps) => ({
  search: formValueSelector('manageAddresses')(state, 'search'),
  usedAddresses: selectors.components.manageAddresses.getWalletUsedAddresses(
    state,
    ownProps.walletIndex
  )
})

const mapDispatchToProps = dispatch => ({
  componentActions: bindActionCreators(
    actions.components.manageAddresses,
    dispatch
  )
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = { walletIndex: number } & ConnectedProps<typeof connector>

export default connector(UsedAddressesTableContainer)
