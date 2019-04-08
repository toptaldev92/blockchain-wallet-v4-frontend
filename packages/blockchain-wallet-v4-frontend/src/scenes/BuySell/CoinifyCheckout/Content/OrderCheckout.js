import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Text, Icon } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'
import QuoteInput from './QuoteInput'
import { getReasonExplanation } from 'services/CoinifyService'
import { submitButtonHelper, wantToHelper, rateHelper } from './Helpers'
import media from 'services/ResponsiveService'

const ExchangeCheckoutWrapper = styled.div`
  padding: 30px;
  border: 1px solid ${props => props.theme['gray-1']};
  border-radius: 10px;
`
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`
const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
`
const QuoteInputWrapper = styled.div`
  margin-top: 5px;
`
const SubmitButtonWrapper = styled.div`
  margin-top: 35px;
`
const WantToText = styled(Text)`
  ${media.mobile`
    margin-bottom: 20px;
  `};
`

const OrderCheckout = ({
  account,
  busy,
  cannotTradeReason,
  canTrade,
  canTradeAfter,
  changeTab,
  checkoutBusy,
  checkoutError,
  defaultCurrency,
  onFetchQuote,
  increaseLimit,
  limits,
  onOrderCheckoutSubmit,
  quoteR,
  reason,
  setMax,
  setMin,
  symbol,
  type,
  verified
}) => {
  const reasonExplanation =
    (cannotTradeReason || !verified) &&
    getReasonExplanation(cannotTradeReason, canTradeAfter, verified)

  return (
    <ExchangeCheckoutWrapper>
      <TopContainer>
        <Icon name='btc-circle-filled' color='btc' size='45px' />
        <RateContainer>
          <Text>
            <FormattedMessage id='bitcoin' defaultMessage='Bitcoin' />
          </Text>
          <Text size='14px'>1 BTC = {rateHelper(quoteR)}</Text>
        </RateContainer>
      </TopContainer>
      {reason.indexOf('has_remaining') > -1 ? (
        <Fragment>
          <WantToText size='14px'>{wantToHelper(type)}</WantToText>
          <QuoteInputWrapper>
            <QuoteInput
              limits={limits}
              type={type}
              defaultCurrency={defaultCurrency}
              verified={verified}
            />
          </QuoteInputWrapper>
        </Fragment>
      ) : null}
      <SubmitButtonWrapper>
        {submitButtonHelper(
          checkoutError,
          limits,
          defaultCurrency,
          setMax,
          setMin,
          changeTab,
          canTrade,
          reasonExplanation,
          reason,
          onOrderCheckoutSubmit,
          verified,
          checkoutBusy,
          quoteR,
          type
        )}
      </SubmitButtonWrapper>
    </ExchangeCheckoutWrapper>
  )
}

export default OrderCheckout
