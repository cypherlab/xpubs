# `xpubs`


<p align="center">
  <img width="250" alt="screenshot" src="https://user-images.githubusercontent.com/503577/96371360-ad2f7300-1161-11eb-983b-45ad3ba63fb8.jpg">
</p>
<p align="center">
  🔑 Xpub Keys Derivation
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/">
    <img alt="npm version" src="https://img.shields.io/npm/v/xpubs">
  </a>
  <img alt="lisence" src="https://img.shields.io/npm/l/xpubs">
</p>

---


Derive any exetended pubkey, in your terminal.


## Install
```bash
yarn global add xpubs
# or
npm install xpubs -g
```

## Use

In your terminal


```bash
xpubs xpub6Bh2z1Mg2fT6KkcHrdEEaQ3C5YRVvfPA7B65pGU4Rci78L7ewGU97M7EVPKZvRhSP86CtEtZsdDpLbJUy4VHpHFEhsvJmEzk8ZwidaZs4Wh
```

result :

```json
{
  "derivations": [
    { "i": 0, "address": "15j2BNoEd1uwy3pFF1h4YpFYorVXktpHVa" },
    { "i": 1, "address": "1MLsETjYsALT3tYRgUxHQ8QE15YVpqTMVR" },
    { "i": 2, "address": "1DgsmNVhurgCNk8hTQ1XK9ydF1PW8Unm1T" },
    { "i": 3, "address": "1BvCFZ3W2pRLGwUGiN2kxY5oPmgbcoMNnN" },
    { "i": 4, "address": "1Furg86iqep5xGn2q2djAFdqgBvdeUWvcC" }
  ],
  "pubkey": "xpub6Bh2z1Mg2fT6KkcHrdEEaQ3C5YRVvfPA7B65pGU4Rci78L7ewGU97M7EVPKZvRhSP86CtEtZsdDpLbJUy4VHpHFEhsvJmEzk8ZwidaZs4Wh",
  "network": "mainnet",
  "magic": "0488b21e",
  "path": "m/44'/0'",
  "startWith": "1..",
  "type": "p2pkh",
  "info": "P2PKH or P2SH",
  "range": [ 0, 4 ]
}
```

you can pass the addresses index range you want to derive as second argument.

```bash
# range index
xpubs someXpub 10,20
# single index
xpubs someXpub 13
```


## Support

- compatible with [slip0132](https://github.com/satoshilabs/slips/blob/master/slip-0132.md)
- mainnet & testnet

```
xpub
ypub, Ypub
zpub, Zpub
tpub
upub, Upub
vpub, Vpub
```

## Deps

- [bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)
- [bs58check](https://github.com/bitcoinjs/bs58check)


