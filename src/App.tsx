import * as React from 'react';
import './game/main';

class App extends React.Component {
    public render() {
        return (
          <div className='App'>
            <p className='App-intro'>
              Impact!
            </p>
            <div id='game' />
          </div>
        );
    }
}

export default App;
