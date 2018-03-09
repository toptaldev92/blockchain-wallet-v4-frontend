import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { FormattedMessage } from 'react-intl'
import ui from 'redux-ui'
import { actions, selectors } from 'data'
import { formValueSelector, Field } from 'redux-form'

import { PhoneNumberBox, TextBox } from 'components/Form'
import { Text, Button } from 'blockchain-info-components'

import { required } from 'services/FormHelper'

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const ColLeft = styled.div`
  width: 50%;
`
const ColRight = styled.div`
  width: 50%;
`
const InputWrapper = styled.div`
  width: 80%;
`
const PartnerHeader = styled.div`
  font-size: 30px;
  font-weight: 600;
`
const PartnerSubHeader = styled.div`
  margin-top: 5px;
  font-size: 14px;
`
const MobileInput = styled.div`
  display: flex;
  margin-top: 25px;
  flex-direction: column;
`
const MobileCodeContainer = MobileInput.extend`
  margin-top: 25px;
`
const ButtonWrapper = styled.div`
  margin: 25px 0px;
`
const MixedText = styled.span`
  margin-top: 10px;
  font-size: 12px;
  color: ${props => props.theme['gray-3']};
  a {
    cursor: pointer;
    color: ${props => props.theme['brand-secondary']};
  }
`

class VerifyMobile extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.onSubmit = this.onSubmit.bind(this)
    this.resendCode = this.resendCode.bind(this)
    this.updateMobileNumber = this.updateMobileNumber.bind(this)
  }

  componentDidMount () {
    if (this.props.smsNumber) {
      this.props.formActions.change('sfoxCreate', 'mobileNumber', this.props.smsNumber)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.smsVerified) {
      this.props.updateUI({ create: 'create_account' })
    }
  }

  updateMobileNumber () {
    this.props.updateUI({ create: 'enter_mobile_code' })
    this.props.settingsActions.updateMobile(this.props.mobileNumber)
  }

  resendCode () {
    this.props.updateUI({ smsCodeResent: true })
    this.props.settingsActions.updateMobile(this.props.mobileNumber)
  }

  onSubmit (e) {
    e.preventDefault()
    if (this.props.ui.create !== 'enter_mobile_code') {
      this.updateMobileNumber()
    } else {
      this.props.settingsActions.verifyMobile(this.props.mobileCode)
    }
  }

  render () {
    const { ui, invalid } = this.props

    let smsHelper = () => {
      switch (true) {
        case ui.smsCodeResent: return <FormattedMessage id='sfoxexchangedata.create.mobile.helper.sentanothercode' defaultMessage='Another code has been sent!' />
        case !ui.smsCodeResent: return <FormattedMessage id='sfoxexchangedata.create.mobile.helper.didntreceive' defaultMessage="Didn't receive your code? {resend}." values={{ resend: <a onClick={this.resendCode}>Resend</a> }} />
      }
    }

    return (
      <Form onSubmit={this.onSubmit}>
        <ColLeft>
          <InputWrapper>
            <PartnerHeader>
              <FormattedMessage id='sfoxexchangedata.create.verifymobile.partner.header.mobile' defaultMessage='Confirm Phone Number' />
            </PartnerHeader>
            <PartnerSubHeader>
              <FormattedMessage id='sfoxexchangedata.create.verifymobile.partner.subheader.mobile' defaultMessage='Please take a moment to verify your phone number. This helps us confirm your identity and secure your account.' />
            </PartnerSubHeader>
            <MobileInput>
              <Text size='14px' weight={400} style={{'margin-bottom': '5px'}}>
                <FormattedMessage id='sfoxexchangedata.create.mobile.number' defaultMessage='Add Phone Number:' />
              </Text>
              <Field name='mobileNumber' component={PhoneNumberBox} validate={[required]} />
            </MobileInput>
            {
              ui.create === 'enter_mobile_code' && <MobileCodeContainer>
                <Text size='14px' weight={400} style={{'margin-bottom': '5px'}}>
                  <FormattedMessage id='sfoxexchangedata.create.mobile.entercode' defaultMessage='Enter Verification Code:' />
                </Text>
                <Field name='mobileCode' component={TextBox} validate={[required]} />
                <MixedText>
                  { smsHelper() }
                </MixedText>
              </MobileCodeContainer>
            }
          </InputWrapper>
        </ColLeft>
        <ColRight>
          {
            ui.create === 'enter_mobile_code' && <ButtonWrapper>
              <Button type='submit' nature='primary' fullwidth disabled={invalid}>
                Continue
              </Button>
            </ButtonWrapper>
          }
          {
            ui.create !== 'enter_mobile_code' && <ButtonWrapper>
              <Button type='submit' nature='primary' fullwidth disabled={invalid}>
                <FormattedMessage id='sfoxexchangedata.create.mobile.textcode' defaultMessage='Text Verification Code' />
              </Button>
            </ButtonWrapper>
          }
        </ColRight>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  mobileNumber: formValueSelector('sfoxCreate')(state, 'mobileNumber'),
  mobileCode: formValueSelector('sfoxCreate')(state, 'mobileCode'),
  smsNumber: selectors.core.settings.getSmsNumber(state).data
})

const mapDispatchToProps = (dispatch) => ({
  formActions: bindActionCreators(actions.form, dispatch),
  settingsActions: bindActionCreators(actions.modules.settings, dispatch)
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  ui({ state: { smsCodeResent: false } })
)

export default enhance(VerifyMobile)
