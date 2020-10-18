import { payments as Payments, bip32, networks as Networks } from 'bitcoinjs-lib'
import _ from 'lodash'
import b58 from 'bs58check'
// import * as bip32 from 'bip32'

// we default to bitcoinjs & add features
const Xpubs = {}
const networkMap = { mainnet: 'bitcoin', testnet: 'testnet' }

// https://github.com/satoshilabs/slips/blob/master/slip-0132.md
const slip0132 = {
    xpub: { network: 'mainnet', magic: '0488b21e', path: `m/44'/0'`, startWith: '1..', type: 'p2pkh'  , info: 'P2PKH or P2SH' }          // tested (legacy)
  , ypub: { network: 'mainnet', magic: '049d7cb2', path: `m/49'/0'`, startWith: '3..', type: 'p2wpkh' , info: 'P2SH > P2WPKH nested' }   // tested (segwit)
  , Ypub: { network: 'mainnet', magic: '0295b43f', path: ``        , startWith: '3..', type: 'p2wsh'  , info: 'P2SH > P2WSH nested' }    // not tested (segwit)
  , zpub: { network: 'mainnet', magic: '04b24746', path: `m/84'/0'`, startWith: 'bc1', type: 'p2wpkh' , info: 'P2WPKH' }                 // tested (segwit nativ)
  , Zpub: { network: 'mainnet', magic: '02aa7ed3', path: ``        , startWith: 'bc1', type: 'p2wsh'  , info: 'P2WSH' }                  // tested (segwit nativ)

  , tpub: { network: 'testnet', magic: '043587cf', path: `m/44'/1'`, startWith: 'm|n', type: 'p2pkh'  , info: 'P2PKH or P2SH' }          // tested (legacy)
  , upub: { network: 'testnet', magic: '044a5262', path: `m/49'/1'`, startWith: '...', type: 'p2wpkh' , info: 'P2SH > P2WPKH nested' }   // not tested (segwit)
  , Upub: { network: 'testnet', magic: '024289ef', path: ``        , startWith: '...', type: 'p2wsh'  , info: 'P2SH > P2WSH nested' }    // not tested (segwit)
  , vpub: { network: 'testnet', magic: '045f1cf6', path: `m/84'/1'`, startWith: 'tb1', type: 'p2wpkh' , info: 'P2WPKH' }                 // tested (segwit nativ)
  , Vpub: { network: 'testnet', magic: '02575483', path: ``        , startWith: 'tb1', type: 'p2wsh'  , info: 'P2WSH' }                  // not tested (segwit nativ)
}



Xpubs.derive = (pubkey='', { start=0, end=4, type='received' } = {}) => {
  // cast ints
  start = parseInt(start || 0, 10)
  end = parseInt(end || start, 10)

  const prefix = pubkey.substr(0, 4)
  const options = slip0132[prefix]
  if(!options) throw `Invalid pubkey`

  const pubkeyType = options.type
  const networkName = options.network
  const network = Networks[networkMap[networkName]]

  const info = {
      network: networkName
    , pubkeyType
    , prefix
  }

  // reconvert to xpub or tbup (only way bitcoins derivation works)
  if(options.network == 'mainnet' && prefix != 'xpub') pubkey = pubkeyTo('xpub', pubkey)
  if(options.network == 'testnet' && prefix != 'tpub') pubkey = pubkeyTo('tpub', pubkey)


  const node = bip32.fromBase58(pubkey, network)

  const derivations = _.range(start, end+1).map(i => {
    const derivedKey = node.derive(({received:0, change:1})[type]).derive(i)
    const addressPublicKey = derivedKey.publicKey

    const result = (prefix == 'ypub' || prefix == 'upub')
      ? Payments.p2sh({ redeem: Payments.p2wpkh({ pubkey: addressPublicKey }) })  // non native segwit (for now i only assume this is for TREZOR wallet)
      : Payments[pubkeyType]({ pubkey: addressPublicKey, network }) // non segwit or segwit nativ

    return { i, address: result.address }
  })

  if(!derivations.length) throw `invalid/unsupported pubkey`

  return { derivations, pubkey, ...options, range: [start, end] }
}



export const pubkeyTo = (prefix='xpub', pubkey) => {
  let data = b58.decode(pubkey)
  data = data.slice(4)
  data = Buffer.concat([Buffer.from(slip0132[prefix].magic,'hex'), data])
  return b58.encode(data)
}

export default Xpubs