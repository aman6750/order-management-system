
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import CustomerRegistration from './component/Customer/CustomerRegistration';
import CustomerLogin from './component/Customer/CustomerLogin';
import OrderForm from './component/Customer/OrderForm';
import OrderStatus from './component/Customer/OrderStatus';
import AdminRegistration from './components/Admin/AdminRegistration';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/customer/register" component={CustomerRegistration} />
        <Route path="/customer/login" component={CustomerLogin} />
        <Route path="/order" component={OrderForm} />
        <Route path="/order-status" component={OrderStatus} />
        <Route path="/admin/register" component={AdminRegistration} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
