class WebSocketService {
    constructor(dispatch) {
      this.dispatch = dispatch;
      this.interval = null;
    }
  
    connect() {
      // Simulate WebSocket connection with setInterval
      this.interval = setInterval(() => {
        this.generateRandomUpdates();
      }, 1500); // Update every 1.5 seconds
    }
  
    disconnect() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  
    generateRandomUpdates() {
      const assets = [1, 2, 3, 4, 5]; // IDs of our assets
      
      assets.forEach(assetId => {
        const priceChange = (Math.random() - 0.5) * 2; // Random value between -1 and 1
        const priceChange1h = (Math.random() - 0.5) * 2;
        const priceChange24h = (Math.random() - 0.5) * 4;
        const priceChange7d = (Math.random() - 0.5) * 5;
        const volumeChange = Math.random() * 0.2 - 0.1; // -10% to +10%
        
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
      // Get current price from store (in a real app, you'd get this from state)
      const basePrices = {
        1: 50000, // BTC
        2: 3000,  // ETH
        3: 1.0,   // USDT
        4: 400,    // BNB
        5: 150     // SOL
      };
      
      const basePrice = basePrices[assetId];
      const changeAmount = basePrice * (changePercent / 100);
      return this.roundToTwo(basePrice + changeAmount);
    }
  
    calculateNewVolume(assetId, changePercent) {
      // Get current volume from store (in a real app, you'd get this from state)
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