---
title: Create Your Own Pair
weight: 30
---

{{< alert context="warning" >}}
**Important**

If you want to register a brand-new Fetch.ai native or IBC token that is not listed on Starfleit yet, please first send 1 of that token to the [Factory contract address](https://docs.starfleit.io/docs/contract-resources/contract-addresses/), and then tag the STARFLEIT team in the [#STARFLEIT channel on the Fetch.ai Discord](https://bit.ly/3ra5uMI) to let them know the token's contract address (for metadata)
{{< /alert >}}

## Instantiation by Contract Address

You should use the STARFLEIT token factory contract.

- dorado-1 testnet: `fetch1kmag3937lrl6dtsv29mlfsedzngl9egv5c3apnr468q50gu04zrqea398u`

The JSON message format is as follows:

```json
{
  "create_pair": {
    "assets": [
      {
        "info": {
          "token": {
            "contract_addr": "fetch1..."
          }
        },
        "amount": "0"
      },
      {
        "info": {
          "native_token": {
            "denom": "afet"
          }
        },
        "amount": "0"
      }
    ]
  }
}
```

This is a JSON constructor of pair contract. Tokens of pair can be either CW20 tokens or Fetch.ai native tokens(including IBC tokens). Use JSON keys with their corresponding values as described below.
  - `assets[x].info.token.contract_addr`: CW20 token **address**
  - `assets[x].info.native_token.denom`: Fetch.ai native token(including IBC token) **denominator**

Then, you may execute the contract with the organized JSON above.

## Provide initial liquidity

STARFLEIT pair contract derives the swap rate from the amount of the remained assets on the pool. However, if you have just created your own pair and haven't provided its liquidity yet, the contract won't be able to calculate the rate, and all swap simulations and transactions will fail. So, for the pair to work successfully, you should provide the initial liquidity.

{{< alert context="warning" >}}
**Warning**

In order to prevent LP inflation attacks, when a user provides initial liquidity, the amount of minimum liquidity will belong to the pair contract itself and be permanently locked. Thus, the initial provider should be aware that some of their shares will be sacrificed by the amount of minimum liquidity ('1000') for this protection, and they will receive the amount of LP tokens which the minimum liquidity is deducted from.
{{< /alert >}}

### Increase allowance (CW20 token)

If one of or both of assets of the pair are CW20, you should execute `increase_allowance` before providing liquidity. You may follow the instruction from [here](/docs/reference/token/#increasedecrease-allowance). Don't have to do this action of native tokens like `FET`.

- Make sure that you should input the pair contract address on `spender`.
- Make sure the input number `amount` that the number is multiplied by the decimal.

e.g:

```bash
fetchd tx wasm execute <token_address> '{"increase_allowance":{"spender":"<pair_address>","amount":"<amount_with_decimal>","expires":{"never":{}}}}' --fees 200000000000000atestfet --from <your_key_name_on_local>
```

### Provide liquidity

Now you can provide the initial liquidity. Replace to your parameter and execute it!\
Make sure that:

- The native token part should be input on both of contract & bash args, and the amount should be same.
- In `--amount` args, no space between the amount and the denom like `<same_amount_above>atestfet`.

```bash
fetchd tx wasm execute <pair_address> '{"provide_liquidity":{"assets":[{"info":{"token":{"contract_addr":"<token_address>"}},"amount":"<amount_with_decimal>"},{"info":{"native_token":{"denom":"atestfet"}},"amount":"<amount_with_decimal>"}]}}' --gas 600000 --fees 600000000000000atestfet --from <your_key_name_on_local> --amount <same_amount_above>atestfet
```
