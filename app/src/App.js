import React, {Component} from 'react';
import './App.css';
import Routes from './Routes';

class App extends Component {
  render() {
    return (
      <div className='application_container'>
        {Routes}
      </div>
    );
  }
}

export default App;
