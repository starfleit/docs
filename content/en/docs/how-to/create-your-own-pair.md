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
    "asset_infos": [
      {
        "token": {
          "contract_addr": "fetch1..."
        }
      },
      {
        "native_token": {
          "denom": "afet"
        }
      }
    ]
  }
}
```

This is a JSON constructor of pair contract.

- A token pair can be either, contract-based token, or fetch.ai-native / IBC token
  - `asset_infos[x].token.contract_addr`: Contract-basd token **address** is entered here.
  - `asset_infos[x].native_token.denom`: Fetch.ai native / IBC token **denominator** is entered here.

Then, you may execute the contract with the organized JSON above.

## Provide initial liquidity

STARFLEIT pair contract knows the swap rate by the both of the remained assets on the pool. But if you have just created your own pair but no liquidity provided, The contract cannot calculate the rate and all swap & swap simulation raise fail. So, STARFLEIT UI does not list the pair unless the initial liquidity is provided. So, if you want finalize the listing, you should provide the initial liquidity and it should be done on CLI.

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
