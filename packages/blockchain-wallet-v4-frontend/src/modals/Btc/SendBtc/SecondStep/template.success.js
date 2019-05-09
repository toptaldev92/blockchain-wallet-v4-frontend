import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import {
  ExchangeAmount,
  ExchangeAmounts,
  LargeTableRow,
  SubExchangeAmount,
  Wrapper
} from 'components/Exchange'
import { Button, Link, HeartbeatLoader, Text } from 'blockchain-info-components'
import CoinDisplay from 'components/Display/CoinDisplay'
import FiatDisplay from 'components/Display/FiatDisplay'

const ConfirmWrapper = styled(Wrapper)`
  padding: 0px;
`
const SummaryExchangeAmount = styled(ExchangeAmount)`
  justify-content: flex-end;
`
const SummarySubExchangeAmount = styled(SubExchangeAmount)`
  justify-content: flex-end;
`
const TextTo = styled(Text)`
  max-width: 60%;
  text-align: right;
  word-break: break-all;
`
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 16px;
  width: 100%;

  & > :first-child {
    margin-bottom: 15px;
  }
`

const Success = props => {
  const {
    amount,
    coin,
    description,
    fee,
    fromAddress,
    handleSubmit,
    handleBack,
    submitting,
    toAddress,
    total
  } = props

  return (
    <React.Fragment>
      <ConfirmWrapper>
        <LargeTableRow>
          <Text size='16px' weight={500}>
            <FormattedMessage
              id='modals.sendbtc.secondstep.from'
              defaultMessage='From:'
            />
          </Text>
          <Text size='16px' weight={400} data-e2e='btcFromWallet'>
            {fromAddress}
          </Text>
        </LargeTableRow>
        <LargeTableRow>
          <Text size='16px' weight={500}>
            <FormattedMessage
              id='modals.sendbtc.secondstep.to'
              defaultMessage='To:'
            />
          </Text>
          <TextTo size='16px' weight={400} data-e2e='btcToAddress'>
            {toAddress}
          </TextTo>
        </LargeTableRow>
        {description && (
          <LargeTableRow>
            <Text size='16px' weight={500}>
              <FormattedMessage
                id='modals.sendbtc.secondstep.note'
                defaultMessage='Note:'
              />
            </Text>
            <Text size='16px' weight={400} data-e2e='btcSendDescription'>
              {description}
            </Text>
          </LargeTableRow>
        )}
        <LargeTableRow>
          <Text size='16px' weight={500}>
            <FormattedMessage
              id='modals.sendbtc.secondstep.amount'
              defaultMessage='Amount:'
            />
          </Text>
          <ExchangeAmounts>
            <SummaryExchangeAmount>
              <FiatDisplay size='16px' weight={500} coin={coin}>
                {amount}
              </FiatDisplay>
            </SummaryExchangeAmount>
            <SummarySubExchangeAmount>
              <CoinDisplay size='14px' weight={300} coin={coin}>
                {amount}
              </CoinDisplay>
            </SummarySubExchangeAmount>
          </ExchangeAmounts>
        </LargeTableRow>
        <LargeTableRow>
          <Text size='16px' weight={500}>
            <FormattedMessage
              id='modals.sendbtc.secondstep.fee'
              defaultMessage='Fee:'
            />
          </Text>
          <ExchangeAmounts>
            <SummaryExchangeAmount>
              <FiatDisplay size='16px' weight={500} coin={coin}>
                {fee}
              </FiatDisplay>
            </SummaryExchangeAmount>
            <SummarySubExchangeAmount>
              <CoinDisplay size='14px' weight={300} coin={coin}>
                {fee}
              </CoinDisplay>
            </SummarySubExchangeAmount>
          </ExchangeAmounts>
        </LargeTableRow>
        <LargeTableRow>
          <Text size='16px' weight={500}>
            <FormattedMessage
              id='modals.sendbtc.secontstep.sendtotal'
              defaultMessage='Total:'
            />
          </Text>
          <ExchangeAmounts>
            <SummaryExchangeAmount>
              <FiatDisplay coin={coin} size='16px' weight={500}>
                {total}
              </FiatDisplay>
            </SummaryExchangeAmount>
            <SummarySubExchangeAmount>
              <CoinDisplay coin={coin} size='14px' weight={300}>
                {total}
              </CoinDisplay>
            </SummarySubExchangeAmount>
          </ExchangeAmounts>
        </LargeTableRow>
      </ConfirmWrapper>
      <Footer>
        <Button
          height='56px'
          size='18px'
          onClick={handleSubmit}
          disabled={submitting}
          nature='primary'
          fullwidth
          data-e2e='btcSendSubmitButton'
        >
          {!submitting ? (
            <FormattedMessage
              id='modals.sendbtc.secondstep.send'
              defaultMessage='Send Bitcoin'
            />
          ) : (
            <HeartbeatLoader height='20px' width='20px' color='white' />
          )}
        </Button>
        <Link
          onClick={!submitting && handleBack}
          disabled={submitting}
          size='13px'
          weight={400}
          data-e2e='btcSendBackLink'
        >
          <FormattedMessage
            id='scenes.sendbtc.secondstep.goback'
            defaultMessage='Go Back'
          />
        </Link>
      </Footer>
    </React.Fragment>
  )
}

export default Success
