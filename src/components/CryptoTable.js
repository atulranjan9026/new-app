import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import './CryptoTable.css';

const CryptoTable = ({ assets }) => {
  const formatNumber = (num) => {
    if (num === null || num === undefined) return '∞';
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatSupply = (num) => {
    if (num === null || num === undefined) return '∞';
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td className="asset-name">
                <img src={asset.logo} alt={asset.name} className="asset-logo" />
                <span>{asset.name}</span>
                <span className="asset-symbol">{asset.symbol}</span>
              </td>
              <td>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              <td className={asset.priceChange1h >= 0 ? 'positive' : 'negative'}>
                {asset.priceChange1h >= 0 ? '+' : ''}{asset.priceChange1h}%
              </td>
              <td className={asset.priceChange24h >= 0 ? 'positive' : 'negative'}>
                {asset.priceChange24h >= 0 ? '+' : ''}{asset.priceChange24h}%
              </td>
              <td className={asset.priceChange7d >= 0 ? 'positive' : 'negative'}>
                {asset.priceChange7d >= 0 ? '+' : ''}{asset.priceChange7d}%
              </td>
              <td>{formatNumber(asset.marketCap)}</td>
              <td>{formatNumber(asset.volume24h)}</td>
              <td>{formatSupply(asset.circulatingSupply)} {asset.symbol}</td>
              <td>{asset.maxSupply ? formatSupply(asset.maxSupply) : '∞'}</td>
              <td>
                <div className="sparkline-container">
                  <Sparklines data={asset.sparkline} width={100} height={40}>
                    <SparklinesLine color={asset.priceChange7d >= 0 ? '#16c784' : '#ea3943'} />
                  </Sparklines>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;