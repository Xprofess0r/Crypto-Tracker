
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  sparklineData: number[];
}

interface CryptoState {
  cryptos: CryptoData[];
  loading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  cryptos: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      circulatingSupply: 19.85,
      sparklineData: [91000, 92000, 93000, 92500, 93500, 93800, 93759],
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      circulatingSupply: 120.71,
      sparklineData: [1750, 1780, 1790, 1785, 1800, 1805, 1802],
    },
  ],
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrices: (state) => {
      state.cryptos = state.cryptos.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() * 0.002 - 0.001)),
        change1h: crypto.change1h + (Math.random() * 0.2 - 0.1),
        sparklineData: [...crypto.sparklineData.slice(1), crypto.price],
      }));
    },
  },
});

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
