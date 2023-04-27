---
title: Pair
weight: 30
---

## Transaction

### Provide Liquidity

Send user's asset to a STARFLEIT contract in order to provide liquidity.<br />
**NOTE: You should [allow your allowance]({{< relref "/docs/reference/token" >}}) of the token before providing liquidity!**

The asset can be both a contract-based token and a native token. It can be distinguished by the key under `info`: `token` or `native_token`.

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
    "receiver": "<Addr>", // optional, LP token receiver
    "deadline": 1682583565, // optional, unix epoch
    "slippage_tolerance": "0.005" // optional
  }
}
```

### Swap

Swap between the given two tokens. It can be considered as trade.<br />
`offer_asset` is your source asset and `to` is a destination address to receive, which is optional.<br />
`Base64()` means that this JSON message should be encoded into Base64.<br />


```json
{
    "swap": {
        "offer_asset": {
            "info" : {
                "native_token": {
                    "denom": "afet"
                }
            },
            "amount": "10"
        },
        "belief_price": 0.1,  // optional
        "max_spread": 0.1, // optional
        "to": "<Addr>", // optional
        "deadline": 1682583565 // optional, unix epoch
    }
}
```

```json
{
    "send": {
        "contract": "<Addr>",
        "amount": "10",
        "msg": Base64({
            "swap": {
                "offer_asset": {
                    "info" : {
                        "token": {
                            "contract_addr": "<Addr>"
                        }
                    },
                    "amount": "10"
                },
                "belief_price": 0.1,  // optional
                "max_spread": 0.1, // optional
                "to": "<Addr>", // optional
                "deadline": 1682583565 // optional, unix epoch
            }
        })
    }
}
```

## Query

### Pool

```json
{
    "pool": {}
}
```

### Simulation

```json
{
    "simulation": {
        "offer_asset": {
            "info" : {
                "token": {
                    "contract_addr": "<Addr>"
                }
            },
            "amount": "10"
        }
    }
}
```

### Reverse Simulation

```json
{
    "reverse_simulation": {
        "ask_asset": {
            "info" : {
                "token": {
                    "contract_addr": "<Addr>"
                }
            },
            "amount": "10"
        }
    }
}
```
