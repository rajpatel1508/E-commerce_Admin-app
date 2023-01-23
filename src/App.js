import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './containers/home';
import Signin from './containers/signin';
import Signup from './containers/signup';
import PrivateRoute from './components/HOC/privateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getInitialData, isUserLoggedIn } from './actions';
import Products from './containers/products';
import Orders from './containers/orders';
import Category from './containers/category';
import NewPage from './containers/NewPage';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">

      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/page" element={<PrivateRoute />} >
          <Route path="/page" element={<NewPage />} />
        </Route>
        <Route path="/products" element={<PrivateRoute />} >
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="/orders" element={<PrivateRoute />} >
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route path="/category" element={<PrivateRoute />} >
          <Route path="/category" element={<Category />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
