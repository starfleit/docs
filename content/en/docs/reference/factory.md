---
title: Factory
weight: 10
---

The factory contract registers a pair between two tokens.
It uses the pre-stored pair contract binary and instantiates it so that users do not need to execute a pair contract by themselves.

## Transaction

### Create pair

Instantiate a pair from uploaded WASM binary. You may follow JSON attribute by the type of your asset. (CW20: `token`, Native/IBC: `native_token`)

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

## Query

### Config

```json
{
    "config": {}
}
```

### Pair

```json
{
    "pair": {
        "asset_infos": [
            {
                "token": {
                    "contract_addr": "<Addr>"
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

### Pairs

```json
{
    "pairs": {
        "start_after": [ // optional
            {
                "token": {
                    "contract_addr": "<Addr>"
                }
            },
            {
                "native_token": {
                    "denom": "afet"
                }
            }
        ],
        "limit": 10 // optional, default=10, max=30
    }
}
```

Select all pairs
```json
{
    "pairs": {
        "limit": 10 // STRONGLY RECOMMENDED, optional, default=10, max=30
    }
}
```
