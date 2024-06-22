import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ category: '', area: '', date: '' });

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilter = () => {
    // Apply filtering logic here
    axios.get('/api/orders', { params: filter })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const updateOrderStatus = (orderId, status) => {
    axios.put(`/api/orders/${orderId}/status`, { status })
      .then(response => {
        alert('Order status updated');
        setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div>
        <label>
          Category:
          <input type="text" name="category" onChange={handleFilterChange} />
        </label>
        <label>
          Area:
          <input type="text" name="area" onChange={handleFilterChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" onChange={handleFilterChange} />
        </label>
        <button onClick={applyFilter}>Apply Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Category</th>
            <th>Item</th>
            <th>Serving Size</th>
            <th>Count</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user.firstName} {order.user.lastName}</td>
              <td>{order.category}</td>
              <td>{order.item}</td>
              <td>{order.servingSize}</td>
              <td>{order.count}</td>
              <td>{order.status}</td>
              <td>
                <select onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="on way">On Way</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;