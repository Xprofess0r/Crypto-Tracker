
import { createSlice } from '@reduxjs/toolkit';

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
  maxSupply: number | null;
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
      maxSupply: 21,
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
      maxSupply: null,
      sparklineData: [1750, 1780, 1790, 1785, 1800, 1805, 1802],
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      price: 1.00,
      change1h: 0.01,
      change24h: -0.02,
      change7d: 0.00,
      marketCap: 102481279327,
      volume24h: 52547469307,
      circulatingSupply: 102481.27,
      maxSupply: null,
      sparklineData: [1, 1, 1, 0.999, 1.001, 1, 1],
    },
    {
      id: 4,
      name: 'BNB',
      symbol: 'BNB',
      price: 567.82,
      change1h: -0.32,
      change24h: 2.45,
      change7d: 8.91,
      marketCap: 85749623145,
      volume24h: 12458963247,
      circulatingSupply: 151.01,
      maxSupply: 200,
      sparklineData: [550, 555, 563, 558, 565, 568, 567.82],
    },
    {
      id: 5,
      name: 'Solana',
      symbol: 'SOL',
      price: 188.34,
      change1h: 1.24,
      change24h: 5.67,
      change7d: 15.89,
      marketCap: 42365897412,
      volume24h: 8965412357,
      circulatingSupply: 224.94,
      maxSupply: null,
      sparklineData: [175, 180, 185, 182, 186, 189, 188.34],
    }
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
        change24h: crypto.change24h + (Math.random() * 0.4 - 0.2),
        volume24h: crypto.volume24h * (1 + (Math.random() * 0.004 - 0.002)),
        sparklineData: [...crypto.sparklineData.slice(1), crypto.price],
      }));
    },
  },
});

export const selectCryptos = (state: { crypto: CryptoState }) => state.crypto.cryptos;

export const { updatePrices } = cryptoSlice.actions;
export default cryptoSlice.reducer;
