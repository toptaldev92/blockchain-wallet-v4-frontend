import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions, selectors } from 'data'
import Error from './template.error'
import Loading from './template.loading'
import Success from './template.success'

export class CoinTickerContainer extends React.PureComponent {
  componentDidMount () {
    this.props.actions.initialized()
  }

  render () {
    const { data } = this.props

    return data.cata({
      Success: value => (
        <Success {...value} data-e2e={this.props['data-e2e']} />
      ),
      Failure: message => <Error>{message}</Error>,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: selectors.components.priceTicker.getData(ownProps.coin, state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.priceTicker, dispatch)
})

CoinTickerContainer.propTypes = {
  coin: PropTypes.string,
  handleClick: PropTypes.func,
  selected: PropTypes.bool
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoinTickerContainer)
