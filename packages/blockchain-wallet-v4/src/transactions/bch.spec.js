// import { bchTx, createMockWalletState, walletV4 } from '../../data'
// import { Types } from '../../src'
// import { _transformTx } from './bch'

// TODO: SEGWIT remove w/ DEPRECATED_V3 fix test
// describe.skip('transformTx', () => {
//   const mockState = createMockWalletState(walletV4)
//   const tx = _transformTx(
//     mockState.walletPath.wallet,
//     558418,
//     Types.HDAccountList.fromJS([]),
//     bchTx
//   )
//
//   it('should not include dust transactions', () => {
//     expect(tx.inputs.length).toBe(1)
//     expect(tx.outputs.length).toBe(2)
//   })
// })
