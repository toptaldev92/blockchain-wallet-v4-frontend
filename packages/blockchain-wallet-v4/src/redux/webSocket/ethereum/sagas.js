import { takeEvery, call, put, select, take } from 'redux-saga/effects'
import * as A from '../../actions'
import * as AT from './actionTypes'
import * as ethAT from '../../kvStore/ethereum/actionTypes'
import * as ethSelectors from '../../kvStore/ethereum/selectors'
import * as ethActions from '../../data/ethereum/actions'

const ACCOUNT_SUB = 'account_sub'
const BLOCK_SUB = 'block_sub'

// TO REVIEW
export default ({ api, ethSocket }) => {
  const send = ethSocket.send.bind(ethSocket)

  const onOpen = function * () {
    yield call(send, JSON.stringify({op: BLOCK_SUB}))
    const metadata = yield take(ethAT.FETCH_METADATA_ETHEREUM_SUCCESS)
    for (let i in metadata.payload.value.ethereum.accounts) {
      yield call(send, JSON.stringify({op: ACCOUNT_SUB, account: metadata.payload.value.ethereum.accounts[i].addr}))
    }
  }

  const onMessage = function * (action) {
    const message = action.payload

    switch (message.op) {
      case ACCOUNT_SUB:
        console.log('ethereum account sub received ', message)
        if (message.tx.to === message.account) {
          yield put(A.webSocket.bitcoin.paymentReceived('You\'ve just received an Ethereum payment.'))
        }
        break
      case BLOCK_SUB:
        yield put(ethActions.fetchLatestBlock())
        break
      case 'pong':
        break
      default:
        console.log('unknown type for ', message)
        break
    }
  }

  const onClose = function * (action) {
  }

  return function * () {
    yield takeEvery(AT.OPEN_SOCKET, onOpen)
    yield takeEvery(AT.MESSAGE_SOCKET, onMessage)
    yield takeEvery(AT.CLOSE_SOCKET, onClose)
  }
}
