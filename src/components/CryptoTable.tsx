
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updatePrices } from '../store/cryptoSlice';
import {
  formatPrice,
  formatPercent,
  formatMarketCap,
  formatSupply,
} from '../utils/formatters';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Bitcoin, Ethereum, TrendingDown, TrendingUp } from 'lucide-react';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector((state: RootState) => state.crypto.cryptos);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const getCryptoIcon = (symbol: string) => {
    switch (symbol) {
      case 'BTC':
        return <Bitcoin className="h-6 w-6" />;
      case 'ETH':
        return <Ethereum className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cryptocurrency Prices</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">1h %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">7d %</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Volume(24h)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Circulating Supply</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cryptos.map((crypto) => (
              <tr key={crypto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crypto.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getCryptoIcon(crypto.symbol)}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                      <div className="text-sm text-gray-500">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium font-mono">
                  {formatPrice(crypto.price)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${getChangeColor(crypto.change1h)}`}>
                  <div className="flex items-center justify-end">
                    {getChangeIcon(crypto.change1h)}
                    <span className="ml-1">{formatPercent(crypto.change1h)}</span>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${getChangeColor(crypto.change24h)}`}>
                  <div className="flex items-center justify-end">
                    {getChangeIcon(crypto.change24h)}
                    <span className="ml-1">{formatPercent(crypto.change24h)}</span>
                  </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-right text-sm ${getChangeColor(crypto.change7d)}`}>
                  <div className="flex items-center justify-end">
                    {getChangeIcon(crypto.change7d)}
                    <span className="ml-1">{formatPercent(crypto.change7d)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mono">
                  {formatMarketCap(crypto.marketCap)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mono">
                  {formatMarketCap(crypto.volume24h)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mono">
                  {formatSupply(crypto.circulatingSupply)} {crypto.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-24 h-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={crypto.sparklineData.map((value, index) => ({ value }))}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={crypto.change7d >= 0 ? '#10B981' : '#EF4444'}
                          strokeWidth={1}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
