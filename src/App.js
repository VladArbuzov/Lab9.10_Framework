import React from 'react';
import Header from './Header';
import DataList from './DataList';

function App() {
  const pageTitle = "Мій React Додаток";

  return (
    <div className="App">
      <Header title={pageTitle} />
      <DataList />
    </div>
  );
}

export default App;
