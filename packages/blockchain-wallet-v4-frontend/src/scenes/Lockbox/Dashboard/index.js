import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { equals } from 'ramda'
import { withRouter } from 'react-router-dom'
import Transactions from './Transactions'
import Settings from './Settings'
import { actions } from 'data'
import Menu from './Menu'

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 270px);
  position: fixed;

  @media (max-width: 770px) {
    width: 100%;
  }
`
const Header = styled(Menu)`
  width: 100%;
`
const ContentWrapper = styled.div`
  height: 100%;
  position: relative;
  top: 206px;
`
class LockboxDashboardContainer extends React.PureComponent {
  componentDidUpdate (prevProps) {
    const prevIndex = prevProps.match.params.deviceIndex
    const nextIndex = this.props.match.params.deviceIndex
    if (equals(prevIndex, nextIndex)) return
    this.props.lockboxActions.initializeDashboard(nextIndex)
  }

  render () {
    const { location, match } = this.props
    const { deviceIndex } = match.params
    const onDashboard = location.pathname.includes('/lockbox/dashboard')

    return (
      <Wrapper>
        <Header />
        <ContentWrapper>
          {onDashboard ? (
            <Transactions deviceIndex={deviceIndex} />
          ) : (
            <Settings deviceIndex={deviceIndex} />
          )}
        </ContentWrapper>
      </Wrapper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  lockboxActions: bindActionCreators(actions.components.lockbox, dispatch)
})

const enhance = compose(
  withRouter,
  connect(
    undefined,
    mapDispatchToProps
  )
)

export default enhance(LockboxDashboardContainer)
