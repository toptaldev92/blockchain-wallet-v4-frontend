import { FormattedHTMLMessage } from 'react-intl'
import {
  HomeBalanceRow,
  HomeBalanceTable,
  HomeCoinBalanceCell
} from 'components/Balances'
import { LinkContainer } from 'react-router-bootstrap'
import { mapObjIndexed, toLower, values } from 'ramda'
import { Text } from 'blockchain-info-components'
import React from 'react'
import styled from 'styled-components'

const TotalRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme['gray-1']};
`

const HomeTitle = styled.div`
  flex-grow: 1;
  padding: 10px 20px;
`

const HomeBalanceAmount = styled(Text)`
  position: relative;
  padding: 10px 20px;
  font-size: 22px;
  font-weight: 400;
  color: ${props => props.theme.blue900};
`

const TxLink = styled(LinkContainer)`
  &:hover {
    cursor: pointer;
  }
`

const JoyrideSpotlight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto auto;
  width: 32px;
  height: 32px;
`

const Success = props => {
  const { viewType, balances, supportedCoins } = props
  const coinOrder = [
    supportedCoins.PAX,
    supportedCoins.BTC,
    supportedCoins.ETH,
    supportedCoins.BCH,
    supportedCoins.XLM
  ]

  return (
    <HomeBalanceTable>
      <TotalRow>
        <HomeTitle>
          <Text size='20px' weight={400}>
            <FormattedHTMLMessage
              id='components.balances.home.total'
              defaultMessage='{viewType} Balance'
              values={{ viewType }}
            />
          </Text>
        </HomeTitle>
        <div>
          <HomeBalanceAmount data-e2e='homeBalanceAmt'>
            <JoyrideSpotlight className='wallet-intro-tour-step-1' />
            {balances.totalBalance.totalBalance}
          </HomeBalanceAmount>
        </div>
      </TotalRow>
      {values(
        mapObjIndexed((coin, i) => {
          if (viewType === 'Hardware' && !coin.hasLockboxSupport) return
          const link =
            viewType === 'Hardware' ? '/lockbox' : coin.txListAppRoute
          return (
            coin.invited && (
              <HomeBalanceRow
                key={i}
                data-e2e={`${toLower(coin.coinCode)}BalanceTable`}
              >
                <TxLink to={link}>
                  <div>
                    <HomeCoinBalanceCell
                      coin={coin.coinCode}
                      coinName={coin.displayName}
                      coinIcon={coin.icons.circleFilled}
                      balance={balances[`${toLower(coin.coinCode)}Balance`]}
                    />
                  </div>
                </TxLink>
              </HomeBalanceRow>
            )
          )
        }, coinOrder)
      )}
    </HomeBalanceTable>
  )
}
export default Success
