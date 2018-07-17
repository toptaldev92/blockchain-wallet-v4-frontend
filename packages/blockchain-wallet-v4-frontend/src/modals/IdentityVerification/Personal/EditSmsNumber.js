import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { keys } from 'ramda'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Field, reduxForm } from 'redux-form'

import {
  SMS_STEPS,
  SMS_NUMBER_FORM
} from 'data/components/identityVerification/model'
import { getSmsData } from './selectors'
import { required, validMobileNumber } from 'services/FormHelper'
import { spacing } from 'services/StyleService'
import media from 'services/ResponsiveService'
import { Text, Button } from 'blockchain-info-components'
import {
  ColLeft,
  ColRight,
  InputWrapper,
  PartnerHeader,
  PartnerSubHeader,
  ButtonWrapper,
  ColRightInner,
  EmailHelper
} from 'components/IdentityVerification'
import { PhoneNumberBox, TextBox } from 'components/Form'

const MobileInput = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
`
const MobileCodeContainer = MobileInput.extend`
  margin-top: 25px;
`
const EditSmsNumberWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${media.mobile`
    flex-direction: column;
  `};
`

const smsHelper = ({ mobileVerifiedError, resendCode, editSmsNumber }) => {
  if (mobileVerifiedError) {
    return (
      <FormattedMessage
        id='identityverification.personal.sms.error'
        defaultMessage="That code doesn't match. {resend} or {changeNumber}."
        values={{
          resend: <a onClick={resendCode}>Resend</a>,
          changeNumber: <a onClick={editSmsNumber}>change mobile</a>
        }}
      />
    )
  }
  return (
    <FormattedMessage
      id='identityverification.personal.sms.didntreceive'
      defaultMessage="Didn't get our text? {resend} or {changeNumber}."
      values={{
        resend: <a onClick={resendCode}>Resend</a>,
        changeNumber: <a onClick={editSmsNumber}>change mobile</a>
      }}
    />
  )
}

const EditSmsNumber = ({
  step,
  smsNumber,
  resendCode,
  invalid,
  updateSmsNumber,
  editSmsNumber,
  verifySmsNumber,
  mobileVerifiedError,
  countryCode
}) => (
  <EditSmsNumberWrapper>
    <ColLeft>
      <InputWrapper>
        <PartnerHeader>
          <FormattedMessage
            id='identityverification.personal.mobile.header'
            defaultMessage="What's Your Number?"
          />
        </PartnerHeader>
        <PartnerSubHeader>
          <FormattedMessage
            id='identityverification.personal.mobile.subheader'
            defaultMessage="Don't worry, we won't use your number for anything other than sending your code."
          />
        </PartnerSubHeader>
        {step === SMS_STEPS.edit && (
          <MobileInput>
            <Text size='14px' weight={400} style={{ marginBottom: '5px' }}>
              <FormattedMessage
                id='identityverification.personal.mobile.entermobilenumber'
                defaultMessage='Enter your digits here:'
              />
            </Text>
            <Field
              name='smsNumber'
              defaultValue={smsNumber}
              component={PhoneNumberBox}
              validate={[required, validMobileNumber]}
              countryCode={countryCode}
              errorBottom
            />
            <Button
              nature='primary'
              onClick={updateSmsNumber}
              disabled={invalid}
              style={spacing('mt-15')}
            >
              <FormattedMessage
                id='identityverification.personal.mobile.sendmycode'
                defaultMessage='Send My Code'
              />
            </Button>
          </MobileInput>
        )}
        {step === SMS_STEPS.verify && (
          <MobileCodeContainer>
            <Text size='14px' weight={400} style={{ marginBottom: '5px' }}>
              <FormattedMessage
                id='identityverification.personal.mobile.entercode'
                defaultMessage='Enter the code we just sent to {smsNumber}'
                values={{ smsNumber: '' }}
              />
            </Text>
            <Field
              name='code'
              component={TextBox}
              validate={[required]}
              errorBottom
            />
            <EmailHelper error={mobileVerifiedError}>
              {smsHelper({ mobileVerifiedError, resendCode, editSmsNumber })}
            </EmailHelper>
          </MobileCodeContainer>
        )}
      </InputWrapper>
    </ColLeft>
    <ColRight>
      <ColRightInner>
        <ButtonWrapper>
          <Button
            nature='primary'
            onClick={verifySmsNumber}
            fullwidth
            disabled={invalid || step === SMS_STEPS.edit}
          >
            <FormattedMessage
              id='identityverification.personal.continue'
              defaultMessage='Continue'
            />
          </Button>
        </ButtonWrapper>
      </ColRightInner>
    </ColRight>
  </EditSmsNumberWrapper>
)

EditSmsNumber.propTypes = {
  editSmsNumber: PropTypes.func.isRequired,
  updateSmsNumber: PropTypes.func.isRequired,
  verifySmsNumber: PropTypes.func.isRequired,
  resendCode: PropTypes.func.isRequired,
  step: PropTypes.oneOf(keys(SMS_STEPS)).isRequired,
  mobileVerifiedError: PropTypes.bool,
  countryCode: PropTypes.object.isRequired,
  smsNumber: PropTypes.string.isRequired
}

const enhance = compose(
  connect(getSmsData),
  reduxForm({ form: SMS_NUMBER_FORM })
)

export default enhance(EditSmsNumber)
