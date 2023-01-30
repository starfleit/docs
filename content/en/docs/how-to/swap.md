---
title: Swap
weight: 10
---

Swap in STARFLEIT works as same as trade in other exchanges. The prices of centralized exchanges for both stock and cryptocurrency move by price bidding system, and supply and demand. These prices change in millisecond intervals, and the market carries out real-time transactions. In contrast, immediate execution of transaction becomes almost impossible due to block time when it comes to the exchange on blockchain.

Therefore, STARFLEIT adopted a different pricing approach - algorithmic pricing by tracking the ratio of the paired asset within the liquidity pool. To learn more about this approach, please refer to [mechanism section]({{< relref "/docs/introduction/mechanism" >}}).

## Prerequisites

- Tokens and pairs should be deployed on the chain.
- Initial liquidity should be provided.
- You should know the addresses of tokens and a pair for trade.

## Swap by Using CLI

### When offer_asset Is Native & IBC Token

All transactions can be executed with the below command:

```bash
fetchd tx wasm execute <contract-address> <handle-msg> <coins>
```

- `contract-address`: The pair contract address in a swap transaction
- `handle-msg`: The method and parameters of the execution, which will be explained following lines
- `coins`: Transaction execution fee

To learn more about the general rules for `handle-msg`, please refer to this [link]({{< relref "/docs/how-to/query" >}}).

```json
{
  "swap": {
    "offer_asset": {
      "info": {
        "native_token": {
          "denom": "afet"
        }
      },
      "amount": "10"
    },
    "to": "<Addr>"
  }
}
```

`swap.offer_asset` represents your source asset. It is mandatory to acknowledge the decimal of the token setting when entering the value of `swap.offer_asset.amount` for an accurate transaction you want. For instance, the decimal of FET is 18, and it implies the value `10` of `swap.offer_asset.amount` expresses `10 x 10^-18` in the actual amount. That means you should multiply with the matching value, `10^(decimal)`. And the number can vary by other native or IBC tokens but it cannot be detected if it is not acknowledged by human and the person doesn't register. Please find STARFLEIT team on [#STARFLEIT channel on Fetch.ai Discord](https://bit.ly/3ra5uMI) for registering the decimal information of the new native/IBC token. (Not needed for CW20 token)

`swap.to` is the destination token address. You don't need to enter the amount to swap into since STARFLEIT calculates the price algorithmically.

After filling them out, you may choose to change it into an inline string (not necessary if you can make it with multiline):

```bash
'{"swap":{"offer_asset": {"info" : {"native_token": {"denom": "afet"}},"amount": "10"},"to": "<Addr>",}}'
```

This is your `handle-msg`. The `handle-msg` can be used to complete the CLI command to swap tokens.

### When offer_asset Is Contract-minted Token

Swapping contract-minted token to native token is executed with the same logic as above. However, it requires a different `handle-msg` due to the token system's difference and implementation. The message looks like:

```json
{
  "send": {
    "contract": "<Addr>",
    "amount": "10",
    "msg": Base64({
      "swap": {}
    })
  }
}
```

The method is a little bit tricky. Please keep your concentration on!

```bash
fetchd tx wasm execute <contract-address> <handle-msg> <coins>
```

In the CLI,

- `contract-address`: Enter **token address**

In the message:

- `send.contract`: Enter **pair address**
- `send.amount`: The amount of the origin token to swap from

`send.msg.swap` is an optional attribute, which is not required for basic swap executions.

Encode `{"swap":{}}` into base64 encoding. It should look something like: `eyJzd2FwIjp7fX0=`.

Enter the base64 encoded value for `msg` of the JSON:

```json
{
  "send": {
    "contract": "<Addr>",
    "amount": "10",
    "msg": "eyJzd2FwIjp7fX0="
  }
}
```

After then, you may proceed as the above.
