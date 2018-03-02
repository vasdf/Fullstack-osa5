import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import App from './App';
import counterReducer from './counterReducer'

const store = createStore(counterReducer)

const render = () => {
  ReactDOM.render(<App store={store}/>, document.getElementById('root'))
}

render()
store.subscribe(render)