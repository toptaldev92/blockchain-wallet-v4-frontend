import { actions, selectors } from 'data'
import { AppActionTypes } from 'data/types'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { lift } from 'ramda'
import { Text } from 'blockchain-info-components'
import EmailRequired from 'components/EmailRequired'
import Loading from './template.loading'
import PastAirdropsSuccess from './PastAirdrops/template.success'
import React from 'react'
import styled from 'styled-components'
import Success from './template.success'

export const Wrapper = styled.div`
  width: 100%;
  margin: 12px 30px;
  padding-top: 24px;
  border-top: 1px solid ${(props) => props.theme.blue100};
`
export const Header = styled.div`
  margin-bottom: 40px;
`
export const History = styled.div`
  margin-top: 120px;
`

export const MainTitle = styled(Text)`
  margin-bottom: 8px;
`

type LinkStatePropsType = {
  data: any,
  hasEmail: boolean
}

export type LinkDispatchPropsType = {
  identityVerificationActions: typeof actions.components.identityVerification,
  profileActions: typeof actions.modules.profileActions
}

export type Props = LinkStatePropsType & LinkDispatchPropsType

class Airdrops extends React.PureComponent<Props> {
  componentDidMount () {
    this.props.profileActions.fetchUserCampaigns()
  }

  render () {
    const { data, hasEmail } = this.props
    const AirdropCards = data.cata({
      Success: val => <Success {...val} {...this.props} />,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />,
      Failure: e => (
        <Text size='16px' weight={500}>
          Oops. Something went wrong and we don't know why.{' '}
          <b>Here's the error: {e.type}</b>
        </Text>
      )
    })
    const PastAirdrops = data.cata({
      Success: val => <PastAirdropsSuccess {...val} />,
      Loading: () => <Text weight={500}>Loading...</Text>,
      NotAsked: () => <Text weight={500}>Loading...</Text>,
      Failure: () => (
        <Text size='16px' weight={500}>
          Oops. Something went wrong and we don't know why.
        </Text>
      )
    })
    if (!hasEmail) return <EmailRequired />
    return (
      <Wrapper>
        <Header>
          <MainTitle size='32px' color='grey800' weight={600}>
            <FormattedMessage
              id='scenes.airdrops.blockchain'
              defaultMessage='Blockchain Airdrops'
            />
          </MainTitle>
          <Text size='16px' color='grey400' weight={500}>
            <FormattedMessage
              id='scenes.airdrops.blockchain.safest1'
              defaultMessage='The safest and easiest way to try and discover new crypto'
            />
          </Text>
        </Header>
        {AirdropCards}
        <History>
          <MainTitle size='24px' color='grey800' weight={600}>
            <FormattedMessage
              id='scenes.airdrops.pastairdrops'
              defaultMessage='Past Airdrops'
            />
          </MainTitle>
        </History>
        {PastAirdrops}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  data: lift((userData, campaignData) => ({
    ...userData,
    ...campaignData
  }))(
    selectors.modules.profile.getUserData(state),
    selectors.modules.profile.getUserCampaigns(state)
  ),
  hasEmail: selectors.core.settings
    .getEmail(state)
    .map(Boolean)
    .getOrElse(false)
})

const mapDispatchToProps = (dispatch: Dispatch<AppActionTypes>): LinkDispatchPropsType => ({
  identityVerificationActions: bindActionCreators(
    actions.components.identityVerification,
    dispatch
  ),
  profileActions: bindActionCreators(actions.modules.profile, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Airdrops)
