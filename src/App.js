import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllAssets } from './store/cryptoSlice';  // Changed path
import WebSocketService from './services/websocketService';  // Changed path
import CryptoTable from './components/CryptoTable';  // Changed path
import './App.css';

function App() {
  const assets = useSelector(selectAllAssets);
  const dispatch = useDispatch();
  const wsService = useRef(null);

  useEffect(() => {
    // Initialize WebSocket service
    wsService.current = new WebSocketService(dispatch);
    wsService.current.connect();

    // Cleanup on unmount
    return () => {
      if (wsService.current) {
        wsService.current.disconnect();
      }
    };
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Crypto Price Tracker</h1>
      </header>
      <main>
        <CryptoTable assets={assets} />
      </main>
    </div>
  );
}

export default App;