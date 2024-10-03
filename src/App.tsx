import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { RouteStrings } from './Utils/RouteStrings';
import ProtectedRoute from './Utils/ProtectedRoute';
import { Button } from '@mui/material';

const LoginComponent = lazy(() => import('./Components/LoginPage/index'));
const SignUpComponent = lazy(() => import('./Components/SignUpPage/index'));
const UserList = lazy(() => import('./Components/UserListPage/index'));
const ItemList = lazy(() => import('./Components/ItemListPage/index'));
const ItemDetail = lazy(() => import('./Components/ItemDetailPage/index'));

function App() {
  return (
    <div className="App">
      <Suspense>
        <Router>
          <Routes>
            <Route path={RouteStrings.login} Component={LoginComponent} />
            <Route path={RouteStrings.signup} Component={SignUpComponent} />
            <Route element={<ProtectedRoute />}>
              <Route path={RouteStrings.userdetails} Component={UserList} />
              <Route path={RouteStrings.itemDetail} Component={ItemDetail} />
              <Route path={RouteStrings.itemslist} Component={ItemList} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
