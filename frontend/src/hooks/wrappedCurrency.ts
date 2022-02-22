import {
  Currency,
  CurrencyAmount,
  ETHER,
  Token,
  TokenAmount,
  WETH,
} from "polkabridge-sdk";

export function wrappedCurrency(
  currency: Currency | undefined,
  chainId: number | undefined // todo: replaced number to ChainId type from sdk sdfdf
): Token | undefined {
  return chainId && currency === ETHER
    ? WETH[4]
    : currency instanceof Token && currency.chainId === chainId
    ? currency
    : undefined;
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: number | undefined
): TokenAmount | undefined {
  const token =
    currencyAmount && chainId
      ? wrappedCurrency(currencyAmount.currency, chainId)
      : undefined;
  return token && currencyAmount
    ? new TokenAmount(token, currencyAmount.raw)
    : undefined;
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WETH[4])) return ETHER;
  return token;
}