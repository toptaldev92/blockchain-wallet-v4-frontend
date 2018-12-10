import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { reduxForm } from 'redux-form'

import {
  Button,
  HeartbeatLoader,
  Text,
  TextGroup,
  Link,
  Icon
} from 'blockchain-info-components'
import {
  Form,
  ColLeft,
  InputWrapper,
  FieldMimic,
  ErrorWrapper
} from 'components/IdentityVerification'
import { prop } from 'ramda'
import media from 'services/ResponsiveService'

export const EMAIL_IN_USE_ERROR = 'email_address_and_partner_id_in_use'

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  ${media.mobile`
    margin-top: 10px;
  `};
`
const VerifiedContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  > div {
    margin-left: 10px;
  }
`
export const AcceptTermsForm = styled(Form)`
  ${media.mobile`
    flex-direction: column;
  `};
`
const VerifiedText = styled(Text)`
  font-size: 14px;
  margin-bottom: 10px;
  ${media.mobile`
    margin-bottom: 5px;
  `};
`
const TermsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
`
const TermsText = styled(Text)`
  width: 50%;
`
const SquaredButton = styled(Button)`
  border-radius: 0px;
`
const SentEmailText = styled(Text)`
  margin-top: 15px;
`

const AcceptTerms = props => {
  const {
    busy,
    email,
    invalid,
    handleSubmit,
    signupError,
    emailVerified,
    clearError,
    create,
    handleResend
  } = props
  return (
    <AcceptTermsForm onSubmit={handleSubmit}>
      <ColLeft>
        <InputWrapper>
          <FieldContainer>
            <VerifiedText>
              <FormattedMessage
                id='coinifyexchangedata.create.createaccount.partner.emailaddress'
                defaultMessage='Email Address'
              />
            </VerifiedText>
            <VerifiedContainer>
              <FieldMimic width='100%'>
                <Text size='14px' weight={300}>
                  {email}
                </Text>
              </FieldMimic>
              {
                create === 'verify_email'
                  ? <SquaredButton nature='primary' onClick={handleResend}>
                    <FormattedMessage
                      id='coinifyexchangedata.create.createaccount.partner.sendagain'
                      defaultMessage='Send Again'
                    />
                  </SquaredButton>
                  : null
              }
            </VerifiedContainer>
            {
              create === 'verify_email'
                ? <SentEmailText size='14px' weight={300}>
                  <FormattedMessage
                    id='coinifyexchangedata.create.createaccount.partner.checkyourinbox'
                    defaultMessage='Check your inbox. We just sent you an email.'
                  />
                </SentEmailText>
                : null
            }
            <IconContainer>
              {emailVerified ? (
                <Fragment>
                  <Icon
                    name='checkmark'
                    color='success'
                    size='16px'
                    weight={600}
                  />
                  <Text color='success' size='14px' weight={600}>
                    <FormattedMessage
                      id='coinifyexchangedata.create.createaccount.partner.emailverified'
                      defaultMessage='Email Verified'
                    />
                  </Text>
                </Fragment>
              ) : null}
            </IconContainer>
            <TermsContainer>
              {
                emailVerified
                  ? <Fragment>
                    <TermsText size='12px' weight={300}>
                      <FormattedMessage
                        id='coinifyexchangedata.create.createaccount.partner.byclicking'
                        defaultMessage="By clicking continue, I agree to Coinify's {ToS} & {Privacy}"
                        values={{ ToS: <Link href='https://www.coinify.com/legal' size='12px' weight={300} rel='noreferrer noopener' target='_blank'>Terms of Service</Link>, Privacy: <Link href='https://www.coinify.com/legal/policy' size='12px' weight={300} rel='noreferrer noopener' target='_blank'>Privacy Policy</Link> }}
                      />
                    </TermsText>
                    <Button nature='primary' type='submit' disabled={invalid || busy || signupError}>
                      {
                        !busy ? (
                          <Text color='white' uppercase>
                            <FormattedMessage
                              id='continue'
                              defaultMessage='Continue'
                            />
                          </Text>
                        ) : (
                          <HeartbeatLoader height='20px' width='20px' color='white' />
                        )
                      }
                    </Button>
                  </Fragment>
                  : null
              }
            </TermsContainer>
            <ErrorWrapper>
              {signupError && (prop('error', signupError) === EMAIL_IN_USE_ERROR) && create !== 'verify_email'
                ? <TextGroup inline>
                  <Text size='12px' color='error' weight={300}>
                    <FormattedMessage
                      id='coinifyexchangedata.create.accept.error1'
                      defaultMessage='Unfortunately this email is being used for another account. '
                    />
                  </Text>
                  <Text
                    size='12px'
                    color='brand-secondary'
                    cursor='pointer'
                    weight={300}
                    onClick={props.editEmail}>
                    <FormattedMessage
                      id='coinifyexchangedata.create.accept.error2'
                      defaultMessage='Click here '
                    />
                  </Text>
                  <Text size='12px' color='error' weight={300}>
                    <FormattedMessage
                      id='coinifyexchangedata.create.accept.error3'
                      defaultMessage='to change it.'
                    />
                  </Text>
                </TextGroup>
                : signupError && create !== 'verify_email'
                  ? <TextGroup inline>
                    <Text size='12px' color='error' weight={300}>
                      <FormattedMessage
                        id='coinifyexchangedata.create.accept.unknownError'
                        defaultMessage="We're sorry, but something unexpected went wrong. Please "
                      />
                    </Text>
                    <Link size='12px' weight={300} onClick={() => clearError()}>
                      <FormattedMessage id='tryagain' defaultMessage='try again' />
                    </Link>
                    <Text size='12px' color='error' weight={300}>
                      <FormattedMessage id='or' defaultMessage='or' />
                    </Text>
                    <Link
                      target='_blank'
                      href='https://support.blockchain.com'
                      size='12px'
                      weight={300}
                      rel='noreferrer noopener'>
                      <FormattedMessage
                        id='contactsupport'
                        defaultMessage='contact support.'
                      />
                    </Link>
                    <br />
                    <Text size='12px' color='error' weight={300}>
                      <FormattedMessage
                        id='coinifyexchangedata.create.accept.support_error_description'
                        defaultMessage='Error Description: {errorDescription}'
                        values={{
                          errorDescription: prop('error_description', signupError)
                        }}
                      />
                    </Text>
                  </TextGroup>
                  : null}
            </ErrorWrapper>
          </FieldContainer>
        </InputWrapper>
      </ColLeft>
    </AcceptTermsForm>
  )
}

export default reduxForm({ form: 'coinifyAcceptTerms' })(AcceptTerms)
