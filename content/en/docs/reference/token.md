---
title: CW20 Token
weight: 20
---

## Transaction

### Transfer

Transfer tokens from a transaction executor to `recipient`.

```json
{
    "transfer": {
        "recipient": "<Addr>",
        "amount": "123123",
    }
}
```

### Burn

Reduce tokens from the balance of a transaction executor.

```json
{
    "burn": {
        "amount": "123123"
    }
}
```

### Send

Work same as `transfer` but it sends tokens to `contract`, not an user address.<br />
When processing a transaction, it triggers the given message in `msg`. The given message should be executable on its recipient `contract`.<br />
`msg` is base64-encoded JSON string.

```json
{
    "send": {
        "contract": "<Addr>",
        "amount": "123123",
        "msg": "1234erwfaffaesfaef="
    }
}
```

### Mint

Issue `amount` of tokens and transfer them to the given `recipient`.

```json
{
    "mint": {
        "recipient": "<Addr>",
        "amount": "123123"
    }
}
```

### Increase/Decrease Allowance

Increases/Decreases the allowance for `spender` to handle specific `amount` of token.<br />
After execution, the token can be transferred by executing a transaction from `spender`. Its transferability expires on the given time point.

```json
{
    "increase_allowance": {
        "spender": "<Addr>",
        "amount": "123123",
        "expires": {
            "at_height": 123123,
            // or
            "at_time": 123123,
            // or
            "never": {}
        }
    }
}
```

```json
{
    "decrease_allowance": {
        "spender": "<Addr>",
        "amount": "123123",
        "expires": {
            "at_height": 123123,
            // or
            "at_time": 123123,
            // or
            "never": {}
        }
    }
}
```

### Transfer from/Send from

Transfers `amount` of token from `owner` to `recipient`. The allowance should be increased before execution.

```json
{
    "transfer_from": {
        "owner": "<Addr>",
        "recipient": "<Addr>",
        "amount": "123123",
    }
}
```

```json
{
    "send_from": {
        "owner": "<Addr>",
        "recipient": "<Addr>",
        "amount": "123123",
        "msg": "<base64_encoded_json_message>"
    }
}
```

### Burn from

Burn a specific `amount` of token from `owner`'s balance.

```json
{
    "burn_from": {
        "owner": "<Addr>",
        "amount": "123123"
    }
}
```

## Query

### Get Balance

Check the token `balance` of the given `address`

```json
{
    "balance": {
        "address": "<Addr>"
    }
}
```

### Token Info

Check metadata of the contract.<br />
It checks:
- Name
- Decimals
- Total supply
- Other useful information

```json
{
    "token_info": {}
}
```

### Minter

```json
{
    "minter": {}
}
```

### Allowance

Get the allowance list of the given `owner` and `spender`.

```json
{
    "allowance": {
        "owner": "<Addr>",
        "spender": "<Addr>"
    }
}
```

### All Allowances

Get the list of all allowances of the token that `owner` received and not expired.

```json
{
    "all_allowances": {
        "owner": "<Addr>",
        "start_after": "<Addr>", // optional
        "limit": 1 // optional
    }
}
```

### All Accounts

Get all account list of the token holder.

```json
{
    "all_accounts": {
        "start_after": "<Addr>", // optional
        "limit": 1 // optional
    }
}
```
