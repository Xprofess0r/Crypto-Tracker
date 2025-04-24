
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatPercent = (percent: number): string => {
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
};

export const formatMarketCap = (marketCap: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(marketCap);
};

export const formatSupply = (supply: number): string => {
  return `${supply.toFixed(2)}M`;
};
