import { updateAssetPrice } from '../store/cryptoSlice';

class WebSocketService {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.interval = null;
  }

  connect() {
    this.interval = setInterval(() => {
      this.generateRandomUpdates();
    }, 1500);
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  generateRandomUpdates() {
    const assets = [1, 2, 3, 4, 5];
    
    assets.forEach(assetId => {
      const priceChange = (Math.random() - 0.5) * 2;
      const priceChange1h = (Math.random() - 0.5) * 2;
      const priceChange24h = (Math.random() - 0.5) * 4;
      const priceChange7d = (Math.random() - 0.5) * 5;
      const volumeChange = Math.random() * 0.2 - 0.1;
      
      this.dispatch(updateAssetPrice({
        id: assetId,
        price: this.calculateNewPrice(assetId, priceChange),
        priceChange1h: this.roundToTwo(priceChange1h),
        priceChange24h: this.roundToTwo(priceChange24h),
        priceChange7d: this.roundToTwo(priceChange7d),
        volume24h: this.calculateNewVolume(assetId, volumeChange),
      }));
    });
  }

  calculateNewPrice(assetId, changePercent) {
    const basePrices = {
      1: 50000,
      2: 3000,
      3: 1.0,
      4: 400,
      5: 150
    };
    
    const basePrice = basePrices[assetId];
    const changeAmount = basePrice * (changePercent / 100);
    return this.roundToTwo(basePrice + changeAmount);
  }

  calculateNewVolume(assetId, changePercent) {
    const baseVolumes = {
      1: 25000000000,
      2: 18000000000,
      3: 50000000000,
      4: 1500000000,
      5: 3000000000
    };
    
    const baseVolume = baseVolumes[assetId];
    const changeAmount = baseVolume * changePercent;
    return Math.round(baseVolume + changeAmount);
  }

  roundToTwo(num) {
    return Math.round(num * 100) / 100;
  }
}

export default WebSocketService;