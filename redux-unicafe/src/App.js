import React from 'react';
import Statistics from './components/statistics'

class App extends React.Component {
  click = (button) => () => {
    this.props.store.dispatch({ type: button })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.click('GOOD')}>hyvä</button>
        <button onClick={this.click('OK')}>neutraali</button>
        <button onClick={this.click('BAD')}>huono</button>
        <Statistics store={this.props.store}/>
      </div>
    )
  }
}

export default App;