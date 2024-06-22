import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders/my-orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Category</th>
            <th>Item</th>
            <th>Serving Size</th>
            <th>Count</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.category}</td>
              <td>{order.item}</td>
              <td>{order.servingSize}</td>
              <td>{order.count}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderStatus;