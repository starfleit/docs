---
title: Mechanism
weight: 20
---

## Liquidity Pools

STARFLEIT creates automated markets for pairs of tokens, which is called **pools** that enable users to exchange one asset for the other directly on-chain. Pools maintain balances of both assets, to which users can provide liquidity in exchange for reward-bearing LP tokens. There is more detailed explanation about LP tokens and their relationships to STARFLEIT in the Uniswap docs.

## Constant Product

STARFLEIT pools make prices based on a **constant product invariant.**

{{< katex display >}}XY=k{{< /katex >}}

The product of the number of tokens on each side of the pool should remain constant across trading operations (buying/selling).

## Pricing

In order to preserve the constant product invariant, STARFLEIT will make prices that ensure the product of resultant balances of the pool is as close as possible to product calculated prior to the trade. With {{< katex >}}X{{< /katex >}} being the current balance of the pool's source asset and and {{< katex >}}Y{{< /katex >}} being that of the target asset:

{{< katex display >}}XY=k=(X+A_{\text{in}})(Y-B_{\text{out}}){{< /katex >}}

To determine the proper value of {{< katex >}}B_{out}{{< /katex >}} given the trader's offered asset {{< katex >}}A_{in}{{< /katex >}} :

{{< katex display >}}B_{\text{out}} = \frac{YA_{\text{in}}}{X+A_{\text{in}}}{{< /katex >}}

STARFLEIT is able to execute trades with only the current balances of the pool and the number of incoming tokens. The market price is calculated by dividing the number of pool's target token into the source asset (also called the pool ratio). The spread between the executed and the expected trade is:

{{< katex display >}}\text{spread} = \frac{YA_{\text{in}}}{X} - \frac{YA_{\text{in}}}{X+A_{\text{in}}}{{< /katex >}}

When a pool has large balances of tokens on both sides from liquidity providers, the spread becomes smaller and helps the pool execute closer to its reported price of {{< katex >}}Y/X{{< /katex >}}.
