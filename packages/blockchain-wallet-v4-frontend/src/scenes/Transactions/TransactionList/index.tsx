import { CoinType, FiatType, RemoteDataType, SBOrderType } from 'core/types'
import { ProcessedTxType } from 'core/transactions/types'
import DataError from 'components/DataError'
import Loading from './template.loading'
import React, { PureComponent } from 'react'
import SimpleBuyListItem from './template.simplebuy'
import styled from 'styled-components'
import TransactionListItem from 'components/TransactionListItem'

const TransactionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  &:last-child {
    > div {
      border: none;
    }
  }
`
export type Props = {
  buySellPartner: 'coinify' | 'sfox'
  coin: CoinType
  coinTicker: string
  currency: FiatType
  data: RemoteDataType<
    { message: string },
    Array<SBOrderType | ProcessedTxType>
  >
  onArchive: (address: string) => void
  onLoadMore: () => void
  onRefresh: () => void
}

class TransactionList extends PureComponent<Props> {
  render () {
    const { buySellPartner, coin, coinTicker, currency, data } = this.props

    return data.cata({
      Success: (transactions: Array<SBOrderType | ProcessedTxType>) => (
        <TransactionsWrapper>
          {transactions.map(tx => {
            return 'hash' in tx ? (
              <TransactionListItem
                key={tx.hash}
                transaction={tx}
                coin={coin}
                coinTicker={coinTicker}
                currency={currency}
                buySellPartner={buySellPartner}
              />
            ) : (
              <SimpleBuyListItem />
            )
          })}
        </TransactionsWrapper>
      ),
      Failure: message => (
        <DataError onClick={this.props.onArchive} message={message} />
      ),
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

export default TransactionList
