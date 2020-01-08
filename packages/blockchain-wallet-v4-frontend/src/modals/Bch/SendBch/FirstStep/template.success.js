import { Field, reduxForm } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import Bowser from 'bowser'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import {
  Banner,
  Button,
  Image,
  Text,
  TooltipHost,
  TooltipIcon
} from 'blockchain-info-components'
import {
  CountdownTimer,
  FiatConverter,
  Form,
  FormGroup,
  FormItem,
  FormLabel,
  SelectBoxBchAddresses,
  SelectBoxCoin,
  TextAreaDebounced,
  TextBox
} from 'components/Form'
import {
  insufficientFunds,
  invalidAmount,
  maximumAmount,
  shouldError
} from './validation'
import { model } from 'data'
import { required, validBchAddress } from 'services/FormHelper'
import { Row } from 'components/Send'
import BitPayCTA from 'components/BitPayCTA'
import ComboDisplay from 'components/Display/ComboDisplay'
import QRCodeCapture from 'components/QRCodeCapture'

const WarningBanners = styled(Banner)`
  margin: -6px 0 12px;
  padding: 8px;
`
const SubmitFormGroup = styled(FormGroup)`
  margin-top: 16px;
`
const TimerContainer = styled.div`
  width: 66%;
  display: inline-block;
  float: right;
`
const CustomMerchantInput = styled(Field)`
  & > input {
    padding-right: 84px;
  }
`
const ImageInInputContainer = styled.div`
  position: absolute;
  margin-top: -35px;
  right: 10px;
`

const FirstStep = props => {
  const {
    excludeHDWallets,
    excludeLockbox,
    from,
    handleBitPayInvoiceExpiration,
    handleSubmit,
    invalid,
    payPro,
    pristine,
    submitting,
    totalFee
  } = props
  const isPayPro = !!payPro
  const isFromLockbox = from && from.type === 'LOCKBOX'
  const browser = Bowser.getParser(window.navigator.userAgent)
  const isBrowserSupported = browser.satisfies(
    model.components.lockbox.supportedBrowsers
  )
  const disableLockboxSend = isFromLockbox && !isBrowserSupported

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup inline margin={'15px'}>
        <FormItem width={'40%'}>
          <FormLabel for='coin'>
            <FormattedMessage
              id='modals.sendBch.firststep.currency'
              defaultMessage='Currency'
            />
          </FormLabel>
          <Field
            name='coin'
            component={SelectBoxCoin}
            type='send'
            validate={[required]}
          />
        </FormItem>
        <FormItem width={'60%'}>
          <FormLabel for='from'>
            <FormattedMessage
              id='modals.sendBch.firststep.fromwallet'
              defaultMessage='From'
            />
          </FormLabel>
          <Field
            name='from'
            coin='BCH'
            includeAll={false}
            validate={[required]}
            component={SelectBoxBchAddresses}
            excludeHDWallets={excludeHDWallets}
            excludeLockbox={excludeLockbox}
            excludeWatchOnly
          />
        </FormItem>
      </FormGroup>
      {isFromLockbox && !disableLockboxSend && (
        <WarningBanners type='info'>
          <Text color='warning' size='13px'>
            <FormattedMessage
              id='modals.sendbch.firststep.lockboxwarn'
              defaultMessage='You will need to connect your Lockbox to complete this transaction.'
            />
          </Text>
        </WarningBanners>
      )}
      {disableLockboxSend && (
        <WarningBanners type='warning'>
          <Text color='warning' size='12px'>
            <FormattedMessage
              id='modals.sendbch.firststep.blockbrowser'
              defaultMessage='Sending Bitcoin Cash from Lockbox can only be done while using the Brave, Chrome, Firefox or Opera browsers.'
            />
          </Text>
        </WarningBanners>
      )}
      <FormGroup margin={'15px'}>
        <FormItem>
          <FormLabel for='to'>
            <FormattedMessage
              id='modals.sendBch.firststep.towallet'
              defaultMessage='To'
            />
            {isPayPro && (
              <TimerContainer>
                <CountdownTimer
                  expiryDate={payPro.expiration}
                  handleExpiry={handleBitPayInvoiceExpiration}
                  hideTooltip
                  payProInvoice
                />
              </TimerContainer>
            )}
          </FormLabel>
          <Row>
            {!isPayPro ? (
              <>
                <Field
                  name='to'
                  placeholder='Paste, scan, or select destination'
                  component={SelectBoxBchAddresses}
                  dataE2e='sendBchAddressInput'
                  validate={[required, validBchAddress]}
                  exclude={[from.label]}
                  openMenuOnClick={false}
                  includeAll={false}
                  includeExchangeAddress
                  isCreatable
                  noOptionsMessage={() => null}
                  isValidNewOption={() => false}
                />
                <QRCodeCapture
                  scanType='bchAddress'
                  border={['top', 'bottom', 'right']}
                />
              </>
            ) : (
              <Field
                name='to'
                component={TextBox}
                input={{ value: `web+bitcoincash:?r=${payPro.paymentUrl}` }}
                disabled={true}
              />
            )}
          </Row>
        </FormItem>
      </FormGroup>
      <FormGroup>
        <BitPayCTA coin='BCH' />
      </FormGroup>
      <FormGroup margin={'15px'}>
        <FormItem>
          <FormLabel for='amount'>
            <FormattedMessage
              id='modals.sendbch.firststep.sendamount'
              defaultMessage='Amount'
            />
          </FormLabel>
          <Field
            name='amount'
            component={FiatConverter}
            validate={[
              required,
              invalidAmount,
              insufficientFunds,
              maximumAmount
            ]}
            coin='BCH'
            marginTop='8px'
            data-e2e='sendBch'
            disabled={isPayPro}
          />
        </FormItem>
      </FormGroup>
      <FormGroup margin={'15px'}>
        <FormItem>
          <FormLabel>
            <FormattedMessage
              id='modals.sendBch.firststep.desc'
              defaultMessage='Description'
            />
            <TooltipHost id='sendBch.firststep.share_tooltip'>
              <TooltipIcon name='question-in-circle' size='12px' />
            </TooltipHost>
          </FormLabel>
          {!isPayPro ? (
            <Field
              name='description'
              component={TextAreaDebounced}
              placeholder="What's this transaction for? (optional)"
              data-e2e='sendBchDescription'
              fullwidth
            />
          ) : (
            <>
              <CustomMerchantInput
                name='description'
                component={TextBox}
                placeholder="What's this transaction for? (optional)"
                rows={3}
                data-e2e='sendBtcDescription'
              />
              <ImageInInputContainer>
                <Image name='bitpay-logo' height='24px' />
              </ImageInInputContainer>
            </>
          )}
        </FormItem>
      </FormGroup>
      <FormGroup inline margin={isPayPro ? '10px' : '30px'}>
        <FormItem>
          <FormLabel>
            <FormattedMessage
              id='modals.sendBch.firststep.networkfee'
              defaultMessage='Network Fee'
            />
          </FormLabel>
          <ComboDisplay size='13px' coin='BCH'>
            {totalFee}
          </ComboDisplay>
        </FormItem>
      </FormGroup>
      {isPayPro && invalid && (
        <Text
          size='13px'
          color='error'
          weight={500}
          style={{ textAlign: 'center' }}
        >
          <FormattedMessage
            id='modals.sendBch.firststep.bitpay.insufficientfunds'
            defaultMessage='Insufficient funds to complete BitPay transaction'
          />
        </Text>
      )}
      <SubmitFormGroup>
        <Button
          type='submit'
          nature='primary'
          height='56px'
          size='18px'
          disabled={
            submitting ||
            invalid ||
            (!isPayPro && pristine) ||
            disableLockboxSend
          }
          data-e2e='bchSendContinue'
        >
          <FormattedMessage
            id='modals.sendBch.firststep.continue'
            defaultMessage='Continue'
          />
        </Button>
      </SubmitFormGroup>
    </Form>
  )
}

FirstStep.propTypes = {
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  totalFee: PropTypes.string.isRequired
}

export default reduxForm({
  form: model.components.sendBch.FORM,
  destroyOnUnmount: false,
  shouldError
})(FirstStep)
