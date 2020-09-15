import { actions } from 'data'
import { bindActionCreators } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import { getData } from './selectors'
import Footer from './template'
import React from 'react'

class FooterContainer extends React.PureComponent<Props> {
  render () {
    const { cryptoCurrency, simpleBuyActions } = this.props
    return (
      <Footer
        handleBuy={() =>
          simpleBuyActions.showModal('PriceChart', cryptoCurrency)
        }
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => getData(state)

const mapDispatchToProps = dispatch => ({
  simpleBuyActions: bindActionCreators(actions.components.simpleBuy, dispatch)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(FooterContainer)
