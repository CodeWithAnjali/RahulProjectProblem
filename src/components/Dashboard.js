import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [shares, setShares] = useState([]);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;

    axios.get('http://localhost:5000/shares').then(res => setShares(res.data));
    axios.get('http://localhost:5000/holdings').then(res => setHoldings(res.data));
  }, []);

  const buyShare = (shareId) => {
    axios.post('http://localhost:5000/holdings/buy', { shareId, quantity: 1 }).then(() => {
      alert('Share purchased!');
      window.location.reload();
    });
  };

  return (
    <div>
      <h2>Available Shares</h2>
      {shares.map(share => (
        <div key={share._id}>
          <span>{share.name} - ${share.price}</span>
          <button onClick={() => buyShare(share._id)}>Buy</button>
        </div>
      ))}

      <h2>Your Holdings</h2>
      {holdings.map(holding => (
        <div key={holding._id}>
          <span>{holding.shareId.name} - Quantity: {holding.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
