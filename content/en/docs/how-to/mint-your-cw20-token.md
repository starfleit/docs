---
title: Mint Your CW20 Token
weight: 20
---

## Introduction

This token contract is implemented under the CW20 standard and it fully supports STARFLEIT feature.
If your token is simply meant to be an asset, we recommend minting your own token by **instantiating this binary**, rather than developing your own.

{{< alert context="info" >}}
**Note**

We strongly encourage you to create by the pre-stored binary.\
There are some advantages below:

* These token and pair contract codes are well audited and continuously maintained. Don't have to audit for yours additionally.
* STARFLEIT only lists Token factory-created pairs.
* You don't have to migrate your contract whenever there is any major upgrade of Fetch.ai network. STARFLEIT will help you to migrate so that you don't have to take any action.
{{< /alert >}}

## How to Mint

### 1. Using Deployed Token Factory (Recommended)

The standard CW20 token is already stored in Fetch.ai network.\
The code is wrapped based on cw20 [v0.13.2](https://docs.rs/cw20/0.13.2/cw20/index.html) \
Please check [here]({{< relref "/docs/contract-resources/contract-addresses" >}}) for addresses and token code IDs.

You may instantiate your own token using the JSON as follows:

```json
{
    "name": "your_token_name",
    "symbol": "SYMBOL",
    "decimals": 6,
    "initial_balances": [
        {
            "address": "fetch10001asdfsdfbqwer...",
            "amount": "10000"
        },
        {
            "address": "fetch10002asdfsdfbqwer...",
            "amount": "10000"
        },
        ...
    ]
}
```

Then, the CLI reads:

```bash
fetchd tx wasm instantiate <token_bin_code> '{"name": "yout_token_name", "symbol": "SYMBOL", "decimals": 6, ... }' --from your_key
```

After confirmation, your token is minted on the Fetch.ai network!

With your tx hash, you may query the tx:

```bash
fetchd query tx EF2REFAWE234A2EFV....
```

Then, you may find the address of your contract from:

```json
{
    "key": "contract_address",
    "value": "fetch18vd8fpwxzck93qlwghaj6arh4p7c5n896xzem5"
}
```

### 2. Implement by Yourself

First, you should implement at least these messages.

```rust
#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Cw20ExecuteMsg {
    /// Transfer is a base message to move tokens to another account without triggering actions
    Transfer { recipient: String, amount: Uint128 },
    /// Burn is a base message to destroy tokens forever
    Burn { amount: Uint128 },
    /// Send is a base message to transfer tokens to a contract and trigger an action
    /// on the receiving contract.
    Send {
        contract: String,
        amount: Uint128,
        msg: Binary,
    },
    /// Only with "approval" extension. Allows spender to access an additional amount tokens
    /// from the owner's (env.sender) account. If expires is Some(), overwrites current allowance
    /// expiration with this one.
    IncreaseAllowance {
        spender: String,
        amount: Uint128,
        expires: Option<Expiration>,
    },
    /// Only with "approval" extension. Lowers the spender's access of tokens
    /// from the owner's (env.sender) account by amount. If expires is Some(), overwrites current
    /// allowance expiration with this one.
    DecreaseAllowance {
        spender: String,
        amount: Uint128,
        expires: Option<Expiration>,
    },
    /// Only with "approval" extension. Transfers amount tokens from owner -> recipient
    /// if `env.sender` has sufficient pre-approval.
    TransferFrom {
        owner: String,
        recipient: String,
        amount: Uint128,
    },
    /// Only with "approval" extension. Sends amount tokens from owner -> contract
    /// if `env.sender` has sufficient pre-approval.
    SendFrom {
        owner: String,
        contract: String,
        amount: Uint128,
        msg: Binary,
    },
    /// Only with "approval" extension. Destroys tokens forever
    BurnFrom { owner: String, amount: Uint128 },
    /// Only with the "mintable" extension. If authorized, creates amount new tokens
    /// and adds to the recipient balance.
    Mint { recipient: String, amount: Uint128 },
    /// Only with the "marketing" extension. If authorized, updates marketing metadata.
    /// Setting None/null for any of these will leave it unchanged.
    /// Setting Some("") will clear this field on the contract storage
    UpdateMarketing {
        /// A URL pointing to the project behind this token.
        project: Option<String>,
        /// A longer description of the token and it's utility. Designed for tooltips or such
        description: Option<String>,
        /// The address (if any) who can update this data structure
        marketing: Option<String>,
    },
    /// If set as the "marketing" role on the contract, upload a new URL, SVG, or PNG for the token
    UploadLogo(Logo),
}

#[derive(Serialize, Deserialize, Clone, PartialEq, JsonSchema, Debug)]
#[serde(rename_all = "snake_case")]
pub enum Cw20QueryMsg {
    /// Returns the current balance of the given address, 0 if unset.
    /// Return type: BalanceResponse.
    Balance { address: String },
    /// Returns metadata on the contract - name, decimals, supply, etc.
    /// Return type: TokenInfoResponse.
    TokenInfo {},
    /// Only with "allowance" extension.
    /// Returns how much spender can use from owner account, 0 if unset.
    /// Return type: AllowanceResponse.
    Allowance { owner: String, spender: String },
    /// Only with "mintable" extension.
    /// Returns who can mint and the hard cap on maximum tokens after minting.
    /// Return type: MinterResponse.
    Minter {},
    /// Only with "marketing" extension
    /// Returns more metadata on the contract to display in the client:
    /// - description, logo, project url, etc.
    /// Return type: MarketingInfoResponse.
    MarketingInfo {},
    /// Only with "marketing" extension
    /// Downloads the embedded logo data (if stored on chain). Errors if no logo data stored for
    /// this contract.
    /// Return type: DownloadLogoResponse.
    DownloadLogo {},
    /// Only with "enumerable" extension (and "allowances")
    /// Returns all allowances this owner has approved. Supports pagination.
    /// Return type: AllAllowancesResponse.
    AllAllowances {
        owner: String,
        start_after: Option<String>,
        limit: Option<u32>,
    },
    /// Only with "enumerable" extension
    /// Returns all accounts that have balances. Supports pagination.
    /// Return type: AllAccountsResponse.
    AllAccounts {
        start_after: Option<String>,
        limit: Option<u32>,
    },
}

/// We currently take no arguments for migrations
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MigrateMsg {}
```

Then, compile your contract using it.

```bash
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.6

```

Because the size of WASM file consumes over 1 MiB and this contract cannot be deployed due to binary size restriction. (512KiB)
