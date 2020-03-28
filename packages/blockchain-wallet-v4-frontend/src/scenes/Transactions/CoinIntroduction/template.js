import { Button, Text } from 'blockchain-info-components'
import { FormattedMessage } from 'react-intl'
import media from 'services/ResponsiveService'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 50px auto 0;
  width: 640px;
  ${media.tablet`
    flex-direction: column;
    width: 100%;
  `};
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 16px;
  &:last-child {
    margin-top: 32px;
  }
`
const Content = styled(Text)`
  margin: 15px 0 20px 0;
  line-height: 1.4;
`
const Column = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const BuyButton = styled(Button)`
  width: 158px;
  height: 46px;
  padding: 0 16px;
`

const Welcome = props => {
  const { currentCoin, handleBuy } = props

  return (
    <Container>
      <Row>
        <Column>
          <div>
            <Text size='20px' weight={600} color='grey800'>
              <FormattedMessage
                id='scenes.transaction.content.empty.transactions'
                defaultMessage='Transactions'
              />
            </Text>
            <Content weight={400}>
              <FormattedMessage
                id='scenes.transaction.content.empty.newcoinswap'
                defaultMessage='All your {coinName} transactions will show up here.'
                values={{
                  coinName: currentCoin.displayName
                }}
              />
            </Content>
          </div>
        </Column>
      </Row>
      <Column style={{ paddingRight: '20px' }}>
        <BuyButton nature='empty-blue' onClick={handleBuy}>
          <FormattedMessage
            id='scenes.transaction.content.empty.newcoinbuy'
            defaultMessage='Buy {coin} Now'
            values={{ coin: currentCoin.displayName }}
          />
        </BuyButton>
      </Column>
    </Container>
  )
}

Welcome.propTypes = {
  availability: PropTypes.object.isRequired,
  currentCoin: PropTypes.object.isRequired,
  partner: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  handleRequest: PropTypes.func.isRequired
}

export default Welcome
