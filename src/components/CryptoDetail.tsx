
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CryptoData } from '../store/cryptoSlice';
import { formatPrice, formatPercent, formatMarketCap, formatSupply } from '../utils/formatters';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoDetailProps {
  crypto: CryptoData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CryptoDetail = ({ crypto, open, onOpenChange }: CryptoDetailProps) => {
  if (!crypto) return null;

  const chartData = crypto.sparklineData.map((value, index) => ({
    name: index,
    value,
  }));

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center">
            {crypto.name} ({crypto.symbol})
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">Price</h3>
              <p className="text-2xl font-bold">{formatPrice(crypto.price)}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span>1h Change:</span>
                  <span className={getChangeColor(crypto.change1h)} style={{ display: 'flex', alignItems: 'center' }}>
                    {getChangeIcon(crypto.change1h)}
                    <span className="ml-1">{formatPercent(crypto.change1h)}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>24h Change:</span>
                  <span className={getChangeColor(crypto.change24h)} style={{ display: 'flex', alignItems: 'center' }}>
                    {getChangeIcon(crypto.change24h)}
                    <span className="ml-1">{formatPercent(crypto.change24h)}</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>7d Change:</span>
                  <span className={getChangeColor(crypto.change7d)} style={{ display: 'flex', alignItems: 'center' }}>
                    {getChangeIcon(crypto.change7d)}
                    <span className="ml-1">{formatPercent(crypto.change7d)}</span>
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">Market Stats</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between">
                  <span>Market Cap:</span>
                  <span className="font-mono">{formatMarketCap(crypto.marketCap)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>24h Volume:</span>
                  <span className="font-mono">{formatMarketCap(crypto.volume24h)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Circulating Supply:</span>
                  <span className="font-mono">
                    {formatSupply(crypto.circulatingSupply)} {crypto.symbol}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Supply:</span>
                  <span className="font-mono">
                    {crypto.maxSupply ? `${formatSupply(crypto.maxSupply)} ${crypto.symbol}` : '∞'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Price Chart (7 Days)</h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <RechartsTooltip
                    formatter={(value: number) => [formatPrice(value), 'Price']}
                    labelFormatter={() => ''}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={crypto.change7d >= 0 ? '#10B981' : '#EF4444'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CryptoDetail;
