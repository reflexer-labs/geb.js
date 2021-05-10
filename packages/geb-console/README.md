# geb-console

## Install 

```
npm install -g @reflexer-finance/geb-console@latest
```

## Use

To start the console run the command:
```bash
geb-console

# Default network is kovan, to start it on mainnet run
geb-console mainnet

# To preload a private key, pass an env variable PK
PK=0xabc123... geb-console
```

Once loaded you should see:
```
Start geb-console on Kovan...
Context objects:
- geb                        - ethers
- gebAdmin                   - now()
- contracts                  - provider
- BigNumber                  - info(func)
- ETH_A                      - WAD
- RAD                        - RAY
- metamask(<txRequest>)      - wad(<BN|number|string>)
- ray(<BN|number|string>)    - rad(<BN|number|string>)
- parseWad(<BN>)             - parseRay(<BN>)
- parseRad(<BN>)             - WAD

🗿 >
```

A few examples of what you can do in the JS console:
```js
// Fetch some system variables
// Hint: use TAB autocomplete to see what's available
🗿 > globalDebt = await geb.contracts.safeEngine.globalDebt()

// Print the BigNumber as string (45 decimals RAD)
🗿 > globalDebt.toString()
'600058105670389218985501651609537665157840485958'

// We expose the objects `ethers` and `provider` from the ether.js library
🗿 > amount = ethers.utils.parseEther('1')

🗿 > await provider.getBalance("0x7eb8caf136Ba45DD16483188cbe8b615f6251ca7")
BigNumber { _hex: '0x1496cdb253dea8a31690', _isBigNumber: true }

// Hint: use the underscore to refer to the previous command result
🗿 > _.toString()
'97229163269988743845520'

// Pass a string, number or Bignumber to this function display a converted readable amount
🗿 > parseWad(_)
'97229.16326998874384552'

// Hint: use the `info` function to see the prototype of a function
🗿 > info(geb.contracts.liquidationEngine.liquidateSAFE)
'function (collateralType, safe)'

// Contract interaction e.g: Manually liquidate a safe
🗿 > geb.contracts.liquidationEngine.liquidateSAFE(ETH_A, '0xc6a789e33b40b13144e21816b853744562686131')
{
  to: '0x84334811e26fc70cC5a68BB2878b0F18E278C397',
  data: '0x4c28be574554482d41000000000000000000000000000000000000000000000000000000000000000000000000000000c6a789e33b40b13144e21816b853744562686131',
  value: undefined
}

// Sign transaction with metamask!
🗿 > metamask(tx)
Open you browser at http://localhost:8084

// Deploy a proxy (geb account)
🗿 > metamask(geb.deployProxy())
// Confirm transaction and wait for the tx to be mined...

// Get the newly created proxy object
🗿 > proxy = await geb.getProxyAction("<Your address>")

// Open a safe with 1 ETH collateral and 100 RAI debt
🗿 > tx = proxy.openLockETHAndGenerateDebt(wad(1), ETH_A, wad(100))
🗿 > metamask(tx)

// Hint: use the `.editor` command to paste a multiline command
// Hint: access all contract of the GEB system under `geb.contracts.<contract name>`
// Hint: See geb.js full docs at https://docs.reflexer.finance/geb-js/getting-started

```

## Mainnet fork
Run
```
geb-console mainnet-fork
```
This will start a Hardhat mainnet fork at the current block. 
It exposes an RPC endpoint on port 8545 that can be used to deploy contracts.

You can then use the console:
```js
// Make transactions with the default wallet funded with 10k ETH
🗿 > wallet.address
'0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
🗿 > await  wallet.sendTransaction({value: wad(10), to: "0x1234..."})

// Impersonate any account
🗿 > b1 = await getImpersonatingSigner("0xb1adced...")
await b1.sendTransaction({...})
🗿 > stopImpersonate("0xb1adced...")

// Mine blocks
🗿 > await mine()
🗿 > await mine(3600) // Add seconds to the next block's timestamp

``` 