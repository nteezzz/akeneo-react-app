import React from 'react';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Akeneo Product List</h1>
      </header>
      <ProductList />
    </div>
  );
}

export default App;
