import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',  
logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
      price: 50000,
      priceChange1h: 0.5,
      priceChange24h: 2.3,
      priceChange7d: -1.2,
      marketCap: 950000000000,
      volume24h: 25000000000,
      circulatingSupply: 19000000,
      maxSupply: 21000000,
      sparkline: [49000, 49500, 50200, 49800, 50500, 50300, 50000],
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
      price: 3000,
      priceChange1h: 1.2,
      priceChange24h: 5.6,
      priceChange7d: 3.4,
      marketCap: 360000000000,
      volume24h: 18000000000,
      circulatingSupply: 120000000,
      maxSupply: null,
      sparkline: [2900, 2950, 3020, 2980, 3050, 3030, 3000],
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
      price: 1.0,
      priceChange1h: 0.0,
      priceChange24h: 0.01,
      priceChange7d: -0.01,
      marketCap: 83000000000,
      volume24h: 50000000000,
      circulatingSupply: 83000000000,
      maxSupply: null,
      sparkline: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    },
    {
      id: 4,
      name: 'Binance Coin',
      symbol: 'BNB',
      logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
      price: 400,
      priceChange1h: -0.3,
      priceChange24h: 1.2,
      priceChange7d: -2.1,
      marketCap: 64000000000,
      volume24h: 1500000000,
      circulatingSupply: 160000000,
      maxSupply: 170000000,
      sparkline: [410, 405, 402, 398, 395, 400, 400],
    },
    {
      id: 5,
      name: 'Solana',
      symbol: 'SOL',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
      price: 150,
      priceChange1h: 2.1,
      priceChange24h: 8.5,
      priceChange7d: 12.3,
      marketCap: 50000000000,
      volume24h: 3000000000,
      circulatingSupply: 330000000,
      maxSupply: null,
      sparkline: [140, 142, 145, 148, 152, 150, 150],
    },
  ],
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssetPrice: (state, action) => {
      const { id, price, priceChange1h, priceChange24h, priceChange7d, volume24h } = action.payload;
      const asset = state.assets.find(asset => asset.id === id);
      if (asset) {
        asset.price = price;
        asset.priceChange1h = priceChange1h;
        asset.priceChange24h = priceChange24h;
        asset.priceChange7d = priceChange7d;
        asset.volume24h = volume24h;
      }
    },
  },
});

export const { updateAssetPrice } = cryptoSlice.actions;

export const selectAllAssets = state => state.crypto.assets;

export default cryptoSlice.reducer;