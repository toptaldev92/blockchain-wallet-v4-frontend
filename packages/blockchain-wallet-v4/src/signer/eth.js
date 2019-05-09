import BigNumber from 'bignumber.js'
import EthereumTx from 'ethereumjs-tx'
import EthereumAbi from 'ethereumjs-abi'
import * as eth from '../utils/eth'
import Task from 'data.task'
import { curry } from 'ramda'
import Eth from '@ledgerhq/hw-app-eth'

const isOdd = str => str.length % 2 !== 0
const toHex = value => {
  const hex = new BigNumber(value).toString(16)
  return isOdd(hex) ? `0x0${hex}` : `0x${hex}`
}

// TODO: ERC20 send contract address to method, figure out fees
export const signErc20 = curry((network = 1, mnemonic, data) => {
  const { index, to, amount, nonce, gasPrice, gasLimit } = data
  const privateKey = eth.getPrivateKey(mnemonic, index)
  const transferMethodHex = '0xa9059cbb'
  const txParams = {
    to: '0x8e870d67f660d95d5be530380d0ec0bd388289e1', // contract address
    nonce: toHex(nonce),
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    value: toHex(0),
    chainId: network,
    data:
      transferMethodHex +
      EthereumAbi.rawEncode(['address'], [to]).toString('hex') +
      EthereumAbi.rawEncode(['uint256'], [amount]).toString('hex')
  }
  const tx = new EthereumTx(txParams)
  tx.sign(privateKey)
  const rawTx = '0x' + tx.serialize().toString('hex')
  return Task.of(rawTx)
})

export const sign = curry((network = 1, mnemonic, data) => {
  const { index, to, amount, nonce, gasPrice, gasLimit } = data
  const privateKey = eth.getPrivateKey(mnemonic, index)
  const txParams = {
    to,
    nonce: toHex(nonce),
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    value: toHex(amount),
    chainId: network
  }
  const tx = new EthereumTx(txParams)
  tx.sign(privateKey)
  const rawTx = '0x' + tx.serialize().toString('hex')
  return Task.of(rawTx)
})

export const signWithLockbox = function * (
  network = 1,
  transport,
  scrambleKey,
  data
) {
  const { to, amount, nonce, gasPrice, gasLimit } = data
  const txParams = {
    to,
    nonce: toHex(nonce),
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    value: toHex(amount),
    chainId: network,
    v: '0x01',
    s: '0x00',
    r: '0x00'
  }
  const tx = new EthereumTx(txParams)
  const rawTx = tx.serialize().toString('hex')
  const eth = new Eth(transport, scrambleKey)
  const signature = yield eth.signTransaction("44'/60'/0'/0/0", rawTx)
  return serialize(network, data, signature)
}

export const serialize = (network, raw, signature) => {
  const { to, amount, nonce, gasPrice, gasLimit } = raw
  const txParams = {
    to,
    nonce: toHex(nonce),
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    value: toHex(amount),
    chainId: network,
    r: '0x' + signature.r,
    v: '0x' + signature.v,
    s: '0x' + signature.s
  }
  const tx = new EthereumTx(txParams)
  return '0x' + tx.serialize().toString('hex')
}

export const signLegacy = curry((network = 1, seedHex, data) => {
  const { index, to, amount, nonce, gasPrice, gasLimit } = data
  const privateKey = eth.getLegacyPrivateKey(seedHex, index)
  const txParams = {
    to,
    nonce: toHex(nonce),
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    value: toHex(amount),
    chainId: network || 1
  }

  const tx = new EthereumTx(txParams)
  tx.sign(privateKey)
  const rawTx = '0x' + tx.serialize().toString('hex')
  return Task.of(rawTx)
})
