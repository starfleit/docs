---
title: Frequently Used Messages
weight: 50
---

## Transaction

### Provide Liquidity / Withdraw

As the swap ratio is stated [here]({{< relref "/docs/introduction/mechanism" >}}), the size of a pool is related to its swap ratio. The ratio will get stable if the size of the pool increases, and vice versa. Otherwise, liquidity providers need more tokens to adjust the price in a bigger pool and it means that the market loses elasticity. The providers adjust their markets by providing and withdrawing liquidity within a trade-off.

#### Provide Liquidity

Contribute to the pool by sending a pair of tokens. The transaction increases the pool size.

Execute this message by the **Pair contract** address!

If you are trying to provide cw20 token, increase your allowance first. [Execute `IncreaseAllowance`]({{< relref "/docs/reference/token#increasedecrease-allowance" >}})

```json
{
  "provide_liquidity": {
    "assets": [
      {
        "info" : {
            "token": {
                "contract_addr": "<Addr>"
            }
        },
        "amount": "10"
      },
      {
        "info" : {
            "native_token": {
                "denom": "afet"
            }
        },
        "amount": "10"
      }
    ],
    "deadline": 1682583565, // optional
    "slippage_tolerance": "0.005" // optional
  }
}
```

#### Withdraw

Withdraw your tokens and decrease the size of the pool.

Execute the below message via the **Liquidity token contract** address! Not token contract, nor pair contract!

```json
{
  "send": {
    "contract": "<PairContractAddress>",
    "amount": 123,
    "msg": "<base64-encodedStringOfWithdrawMsg>"
  },
}
```

In `send.msg`, you may decode this JSON string into base64 encoding.

```json
{
  "withdraw_liquidity": {
    "min_assets": [
      {
        "info" : {
          "token": {
            "contract_addr": "<Addr>"
          }
        },
        "amount": "10"
      },
      {
        "info" : {
          "native_token": {
            "denom": "axpla"
          }
        },
        "amount": "10"
      }
    ], // optional
    "deadline": 1682583565 // optional
  }
}
```

As a result, the contract calculates the portion of your liquidity token compared to the total supply, and withdraws them.

## Query

### Pool

The pool query message returns the amount of the tokens in the pool from the given pair contract address.

```json
{
  "pool":{}
}
```

Response:

```json
{
  "data": {
    "assets": [
      {
        "info": {
          "token": {
            "contract_addr": "fetch1cl0kw9axzpzkw58snj6cy0hfp0xp8xh9tudpw2exvzuupn3fafwqqhjc24"
          }
        },
        "amount": "81695"
      },
      {
        "info": {
          "native_token": {
            "denom": "afet"
          }
        },
        "amount": "40774785"
      }
    ],
    "total_share": "1814863"
  }
}
```

### Simulation / Reverse Simulation

Simulation works for guessing how much you will get by swapping with your token.

In case of you want to know how much the target token will be given from the source token, use `simulation`. Likewise, `reverse_simulation` can let you derive the number of source token from the number of target token.

#### Simulation Request

```json
{
  "simulation": {
    "offer_asset": {
      "amount":"1000000",
      "info": {
        "native_token": {
          "denom":"afet"
        }
      }
    }
  }
}
```

#### Simulation Response

```json
{
  "data": {
    "return_amount": "1950",
    "spread_amount": "48",
    "commission_amount": "5"
  }
}
```

#### Reverse Simulation Request

```json
{
  "reverse_simulation":{
    "ask_asset": {
      "amount":"1000000",
      "info": {
        "native_token": {
          "denom": "afet"
        }
      }
    }
  }
}
```

#### Reverse Simulation Response

```json
{
  "data": {
    "offer_amount": "2060",
    "spread_amount": "25157",
    "commission_amount": "3009"
  }
}
```
