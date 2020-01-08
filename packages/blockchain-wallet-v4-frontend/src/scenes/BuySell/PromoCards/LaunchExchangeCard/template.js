import * as React from 'react'
import { Button, Icon, Link, Text } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme['grey000']};
  width: 17.5rem;
  height: 15.5rem;
  margin-top: 2rem;

  &:not(:last-child) {
    margin-right: 1.5rem;
  }
`
const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const ButtonLink = styled(Link)`
  width: 100%;
  margin-top: 36px;
`
const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 36px;
`
const StyledBox = styled(Box)`
  margin-top: ${props => (props.noMargin ? '0' : '2rem')};
`
const LaunchExchangeCard = props => {
  const {
    isExchangeAccountLinked,
    handleLinkedWalletLinkout,
    handleSignup,
    exchangeUrl,
    noMargin
  } = props
  const Wrapper = isExchangeAccountLinked ? ButtonLink : ButtonWrapper
  return (
    <BoxWrapper>
      <StyledBox noMargin={noMargin}>
        <Icon name='blockchain-logo' size='30px' color='black' />
        <Text
          size='20px'
          color='grey800'
          weight={600}
          style={{ marginTop: '16px' }}
        >
          <FormattedMessage
            id='scenes.buysell.launchexchangecard.title'
            defaultMessage='Instantly Buy'
          />
        </Text>
        <Text size='20px' color='grey800' weight={600}>
          <FormattedMessage
            id='scenes.buysell.launchexchangecard.title2'
            defaultMessage='& Sell in the Exchange.'
          />
        </Text>
        <Text
          color='grey600'
          lineHeight='1.5'
          size='14px'
          style={{ margin: '8px 0 -4px', width: '265px' }}
          weight={500}
        >
          <FormattedMessage
            id='scenes.buysell.launchexchangecard.desc'
            defaultMessage='Link your account to buy or sell crypto from your Wallet or explore new tokens.'
          />
        </Text>

        <Wrapper
          href={`${exchangeUrl}?utm_source=web_wallet&utm_medium=referral&utm_campaign=buy_sell_linked`}
          rel='noopener noreferrer'
          target='_blank'
          onClick={isExchangeAccountLinked ? handleLinkedWalletLinkout : null}
        >
          <Button
            fullwidth
            height='50px'
            onClick={isExchangeAccountLinked ? null : handleSignup}
            nature='primary'
          >
            <Text color='white' weight={500}>
              <FormattedMessage
                id='scenes.buysell.launchexchangecard.launch'
                defaultMessage='Launch the Exchange'
              />
            </Text>
          </Button>
        </Wrapper>
      </StyledBox>
      <Text
        size='14px'
        color='grey600'
        weight={500}
        style={{ marginTop: '16px', paddingLeft: '24px' }}
      >
        <FormattedMessage
          id='scenes.buysell.launchexchangecard.poweredby'
          defaultMessage='Powered by Blockchain.com'
        />
      </Text>
    </BoxWrapper>
  )
}

export default LaunchExchangeCard
