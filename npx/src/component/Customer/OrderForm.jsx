import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderForm() {
  const [formData, setFormData] = useState({
    category: '',
    item: '',
    extraCheese: 'No',
    servingSize: 'Regular',
    count: 1,
    deliveryAddress: '',
    contactNo: '',
  });

  useEffect(() => {
    // Fetch user details to autofill address and contact number
    axios.get('/api/customers/me')
      .then(response => {
        setFormData({
          ...formData,
          deliveryAddress: response.data.address,
          contactNo: response.data.mobile,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/orders', formData)
      .then(response => {
        alert('Order placed successfully');
        window.location.href = '/order-status';
      })
      .catch(error => {
        alert('Order failed');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <input type="radio" name="category" value="Veg" onChange={handleChange} /> Veg
        <input type="radio" name="category" value="Non Veg" onChange={handleChange} /> Non Veg
      </label>
      {formData.category === 'Veg' && (
        <select name="item" onChange={handleChange}>
          <option value="Veggie Supreme">Veggie Supreme</option>
          <option value="Exotica">Exotica</option>
          <option value="Paneer Vegorama">Paneer Vegorama</option>
        </select>
      )}
      {formData.category === 'Non Veg' && (
        <select name="item" onChange={handleChange}>
          <option value="Chicken Supreme">Chicken Supreme</option>
          <option value="Triple Chicken Feast">Triple Chicken Feast</option>
          <option value="Chicken Italiano">Chicken Italiano</option>
        </select>
      )}
      <label>
        Extra Cheese:
        <input type="radio" name="extraCheese" value="Yes" onChange={handleChange} /> Yes
        <input type="radio" name="extraCheese" value="No" onChange={handleChange} /> No
      </label>
      <select name="servingSize" onChange={handleChange}>
        <option value="Regular">Regular</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>
      <input type="number" name="count" placeholder="Count" onChange={handleChange} value={formData.count} />
      <input type="text" name="deliveryAddress" placeholder="Delivery Address" onChange={handleChange} value={formData.deliveryAddress} />
      <input type="text" name="contactNo" placeholder="Contact No" onChange={handleChange} value={formData.contactNo} />
      <button type="submit">Place Order</button>
    </form>
  );
}

export default OrderForm;