import { FormattedMessage } from 'react-intl'
import {
  IdentityVerificationHeader,
  InputWrapper,
  PartnerSubHeader
} from 'components/IdentityVerification'
import { MediaContextConsumer } from 'providers/MatchMediaProvider'
import { model } from 'data'
import AcceptTerms from './AcceptTerms'
import media from 'services/ResponsiveService'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import VerifyEmail from './VerifyEmail'

const { CHANGE } = model.components.coinify.REGISTER_STATES
const { EMAIL, TERMS } = model.components.coinify.REGISTER_STEPS

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 15%;
`
const SubHeader = styled(PartnerSubHeader)`
  width: 65%;
  ${media.mobile`
    width: 100%;
  `}
`

const Create = props => {
  const { create } = props

  const determineStep = create === CHANGE ? EMAIL : TERMS

  return (
    <Container>
      <MediaContextConsumer>
        {({ mobile }) => (
          <InputWrapper>
            <IdentityVerificationHeader>
              <FormattedMessage
                id='coinifyexchangedata.create.header.createaccount'
                defaultMessage='Create Account'
              />
            </IdentityVerificationHeader>
            <SubHeader>
              <FormattedMessage
                id='coinifyexchangedata.create.subheader.getstartedverifyemail'
                defaultMessage="To get started, create and verify your account in a matter of minutes. We'll need a verified email to start with."
              />
            </SubHeader>
            {determineStep === EMAIL && (
              <VerifyEmail create={create} {...props} />
            )}
            {determineStep === TERMS && (
              <AcceptTerms create={create} {...props} />
            )}
          </InputWrapper>
        )}
      </MediaContextConsumer>
    </Container>
  )
}

Create.propTypes = {
  handleSignup: PropTypes.func.isRequired,
  create: PropTypes.string.isRequired
}

export default Create
