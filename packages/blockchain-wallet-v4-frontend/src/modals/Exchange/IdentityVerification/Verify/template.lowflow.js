import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { model } from 'data'
import { map, flip, prop } from 'ramda'
import { Button } from 'blockchain-info-components'
import { FooterShadowWrapper } from 'components/Form'
import {
  BackButton,
  IdentityVerificationForm,
  InputWrapper,
  IdentityVerificationImage,
  IdentityVerificationHeader,
  IdentityVerificationSubHeader,
  Footer
} from 'components/IdentityVerification'

const DocumentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 24px;
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  > span:not(:first-child) {
    margin-top: 10px;
  }
`

const { SUPPORTED_DOCUMENTS } = model.components.identityVerification

const docMap = {
  [SUPPORTED_DOCUMENTS['PASSPORT']]: (
    <FormattedMessage
      key='passport'
      id='identityverification.verify.passport'
      defaultMessage='Government Issued Passport'
    />
  ),
  [SUPPORTED_DOCUMENTS['DRIVING_LICENCE']]: (
    <FormattedMessage
      key='deivingLicence'
      id='identityverification.verify.driverslicense'
      defaultMessage='Driver’s License'
    />
  ),
  [SUPPORTED_DOCUMENTS['NATIONAL_IDENTITY_CARD']]: (
    <FormattedMessage
      key='id'
      id='identityverification.verify.natitionalidcard'
      defaultMessage='National Identity Card'
    />
  )
}

const Verify = ({ handleSubmit, onBack, supportedDocuments }) => (
  <IdentityVerificationForm>
    <FooterShadowWrapper
      fields={
        <InputWrapper>
          <IdentityVerificationHeader>
            <FormattedMessage
              id='identityverification.verify.header'
              defaultMessage='Last Step. Verify Your ID'
            />
          </IdentityVerificationHeader>
          <IdentityVerificationImage name='identity-verification' />
          <IdentityVerificationSubHeader>
            <FormattedMessage
              id='identityverification.verify.message'
              defaultMessage='We need to confirm your identity with a government issued ID. Before proceeding, make sure you have one of the following forms of ID handy.'
            />
          </IdentityVerificationSubHeader>
          <DocumentsWrapper>
            {map(flip(prop)(docMap), supportedDocuments)}
          </DocumentsWrapper>
        </InputWrapper>
      }
      footer={
        <Footer>
          <BackButton onClick={onBack}>
            <FormattedMessage
              id='identityverification.lowflow.personal.back'
              defaultMessage='Back'
            />
          </BackButton>
          <Button nature='primary' onClick={handleSubmit}>
            <FormattedMessage
              id='identityverification.lowflow.personal.continue'
              defaultMessage='Continue'
            />
          </Button>
        </Footer>
      }
    />
  </IdentityVerificationForm>
)

Verify.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default Verify
