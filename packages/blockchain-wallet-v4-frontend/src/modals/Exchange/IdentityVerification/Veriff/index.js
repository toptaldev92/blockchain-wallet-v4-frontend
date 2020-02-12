import { actions } from 'data'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getData } from './selectors'
import { Remote } from 'blockchain-wallet-v4'
import Failure from './template.failure'
import Loading from './template.loading'
import React from 'react'
import Success from './template.success'

class Veriff extends React.PureComponent {
  state = {
    loading: false
  }
  componentDidMount () {
    if (Remote.Success.is(this.props.veriffUrl)) return
    this.props.actions.fetchVeriffUrl()
  }

  componentWillUnmount () {
    this.setState({ loading: false })
  }

  handleVeriffMessage = event => {
    if (event === 'FINISHED') {
      this.setState({ loading: true })
      this.props.actions.syncVeriff()
    }
    if (event === 'CANCELED') {
      this.props.onClose()
    }
  }

  render () {
    const { veriffUrl, actions, onClose } = this.props

    if (this.state.loading) return <Loading />

    return veriffUrl.cata({
      Success: url => (
        <Success url={url} handleVeriffMessage={this.handleVeriffMessage} />
      ),
      Loading: () => <Loading />,
      Failure: message => (
        <Failure
          data-e2e='veriffFailure'
          message={message}
          onClick={actions.fetchVeriffUrl}
          onClose={onClose}
        />
      ),
      NotAsked: () => <Loading />
    })
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.veriff, dispatch),
  kycActions: bindActionCreators(
    actions.components.identityVerification,
    dispatch
  )
})

export default connect(
  getData,
  mapDispatchToProps
)(Veriff)
