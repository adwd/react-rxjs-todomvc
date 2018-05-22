import * as React from 'react';

import Header from './components/Header';
import MainSection from './components/MainSection';

class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <MainSection />
      </div>
    );
  }
}

export default App;
