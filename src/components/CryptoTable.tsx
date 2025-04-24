
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { 
  updatePrices, 
  selectCryptos, 
  setSortField, 
  setFilterType, 
  selectSortField, 
  selectSortDirection,
  selectFilterType,
  type SortField,
  type FilterType,
  type CryptoData
} from '../store/cryptoSlice';
import {
  formatPrice,
  formatPercent,
  formatMarketCap,
  formatSupply,
} from '../utils/formatters';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { 
  CircleDollarSign, 
  TrendingDown, 
  TrendingUp, 
  ArrowDown, 
  ArrowUp,
  Info,
  Filter
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ToggleGroup,
  ToggleGroupItem
} from '@/components/ui/toggle-group';
import CryptoDetail from './CryptoDetail';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector(selectCryptos);
  const sortField = useSelector(selectSortField);
  const sortDirection = useSelector(selectSortDirection);
  const filterType = useSelector(selectFilterType);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePrices());
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const getCryptoIcon = () => {
    return <CircleDollarSign className="h-6 w-6" />;
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

  const handleSort = (field: SortField) => {
    dispatch(setSortField(field));
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline" />
    );
  };

  const handleFilterChange = (value: string) => {
    if (value === 'all' || value === 'gainers' || value === 'losers' || value === 'stablecoins') {
      dispatch(setFilterType(value as FilterType));
    }
  };

  const handleCryptoClick = (crypto: CryptoData) => {
    setSelectedCrypto(crypto);
    setDetailOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">Cryptocurrency Prices</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <ToggleGroup type="single" value={filterType} onValueChange={handleFilterChange}>
            <ToggleGroupItem value="all" className="text-sm">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="gainers" className="text-sm">
              Gainers
            </ToggleGroupItem>
            <ToggleGroupItem value="losers" className="text-sm">
              Losers
            </ToggleGroupItem>
            <ToggleGroupItem value="stablecoins" className="text-sm">
              Stablecoins
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('price')}
              >
                Price {getSortIcon('price')}
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('change1h')}
              >
                1h % {getSortIcon('change1h')}
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('change24h')}
              >
                24h % {getSortIcon('change24h')}
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('change7d')}
              >
                7d % {getSortIcon('change7d')}
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('marketCap')}
              >
                Market Cap {getSortIcon('marketCap')}
              </th>
              <th 
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('volume24h')}
              >
                Volume(24h) {getSortIcon('volume24h')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Circulating Supply
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-block ml-1 cursor-help">
                      <Info className="h-3 w-3 inline" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The amount of coins that are circulating in the market and are available for trading</p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max Supply
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="inline-block ml-1 cursor-help">
                      <Info className="h-3 w-3 inline" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The maximum amount of coins that will ever exist in the lifetime of the cryptocurrency</p>
                  </TooltipContent>
                </Tooltip>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cryptos.map((crypto) => (
              <tr key={crypto.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crypto.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getCryptoIcon()}
                    <div className="ml-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                            onClick={() => handleCryptoClick(crypto)}
                          >
                            {crypto.name}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to view details</p>
                        </TooltipContent>
                      </Tooltip>
                      <div className="text-sm text-gray-500">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium font-mono">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>{formatPrice(crypto.price)}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Last updated: {new Date().toLocaleTimeString()}</p>
                    </TooltipContent>
                  </Tooltip>
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-mono">
                  {crypto.maxSupply ? `${formatSupply(crypto.maxSupply)} ${crypto.symbol}` : '∞'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-24 h-12 cursor-pointer">
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
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>7-day price movement</p>
                      <p>Low: {formatPrice(Math.min(...crypto.sparklineData))}</p>
                      <p>High: {formatPrice(Math.max(...crypto.sparklineData))}</p>
                    </TooltipContent>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <CryptoDetail 
        crypto={selectedCrypto} 
        open={detailOpen} 
        onOpenChange={setDetailOpen} 
      />
    </div>
  );
};

export default CryptoTable;
