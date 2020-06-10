import { actions } from 'data'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { getData } from './selectors'
import { Modal } from 'blockchain-info-components'
import { pathEq, toLower } from 'ramda'
import { Remote } from 'blockchain-wallet-v4/src'
import DataError from 'components/DataError'
import Loading from './template.loading'
import modalEnhancer from 'providers/ModalEnhancer'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
export const MODAL_NAME = 'Onfido'
const OnfidoIframe = styled.iframe.attrs({
  allow: 'camera; microphone'
})`
  width: 100%;
  height: 604px;
  border: none;
`
const OnfidoModal = styled(Modal)`
  height: 604px;
  display: flex;
  ${props => (props.onfidoActive ? `background-color: #f3f3f4;` : '')};
`
class OnfidoContainer extends React.PureComponent {
  componentDidMount () {
    this.props.actions.fetchOnfidoSDKKey()
    window.addEventListener('message', this.handleOnfidoMessage, false)
  }
  componentWillUnmount () {
    window.removeEventListener('message', this.handleOnfidoMessage)
  }
  handleOnfidoMessage = ({ data, origin }) => {
    const { helperDomain, actions } = this.props
    if (origin !== helperDomain) return
    if (data.from !== 'onfido') return
    if (data.to !== 'IdentityVerification') return
    if (data.event !== 'done') return
    const isSelfie = pathEq(['data', 'face', 'variant'], 'standard', data)
    actions.syncOnfido(isSelfie)
  }
  render () {
    const {
      helperDomain,
      position,
      total,
      onfidoSDKKey,
      onfidoSyncStatus,
      supportedDocuments,
      actions
    } = this.props
    const docs = supportedDocuments.map(toLower).join('|')
    return (
      <OnfidoModal
        size='medium'
        position={position}
        onfidoActive={Remote.Success.is(onfidoSDKKey)}
        total={total}
      >
        {onfidoSDKKey.cata({
          Success: sdkKey =>
            onfidoSyncStatus.cata({
              Success: () => <Loading />,
              Loading: () => <Loading />,
              NotAsked: () => (
                <OnfidoIframe
                  src={`${helperDomain}/wallet-helper/onfido/#/token/${sdkKey}/docs/${docs}`}
                  sandbox='allow-same-origin allow-scripts'
                  scrolling='no'
                  id='onfido-iframe'
                />
              ),
              Failure: () => <DataError onClick={actions.syncOnfido} />
            }),
          Loading: () => <Loading />,
          Failure: () => <DataError onClick={actions.fetchOnfidoSDKKey} />,
          NotAsked: () => <Loading />
        })}
      </OnfidoModal>
    )
  }
}
OnfidoContainer.propTypes = {
  helperDomain: PropTypes.string.isRequired,
  onfidoSDKKey: PropTypes.instanceOf(Remote).isRequired,
  onfidoSyncStatus: PropTypes.instanceOf(Remote).isRequired
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.onfido, dispatch)
})
const enhance = compose(
  modalEnhancer(MODAL_NAME),
  connect(getData, mapDispatchToProps)
)
export default enhance(OnfidoContainer)
