import React from 'react'

class Statistics extends React.Component {
  resetToZero = () => () => {
    this.props.store.dispatch({ type: 'ZERO' })
  }

  average = () => {
    const feedback = this.props.store.getState()

    const size = feedback.good + feedback.ok + feedback.bad

    const sum = feedback.good*1 + feedback.ok*0 + feedback.bad*-1

    return Math.round(sum/size*100)/100
  }

  positive = () => {
    const feedback = this.props.store.getState()

    const size = feedback.good + feedback.ok + feedback.bad

    return Math.round(feedback.good/size*1000)/10 + '%'
  }

  render() {
    const feedback = this.props.store.getState()

    if (feedback.good === 0 && feedback.ok === 0 && feedback.bad === 0) {
      return (
        <div>
          <h2>statistiikka</h2>
          <div>ei yhtään palautetta annettu</div>
        </div>
      )
    }

    return (
      <div>
        <h2>statistiikka</h2>
        <table>
          <tbody>
            <tr>
              <td>hyvä (1)</td>
              <td>{feedback.good}</td>
            </tr>
            <tr>
              <td>neutraali (0)</td>
              <td>{feedback.ok}</td>
            </tr>
            <tr>
              <td>huono (-1)</td>
              <td>{feedback.bad}</td>
            </tr>
            <tr>
              <td>keskiarvo</td>
              <td>{this.average()}</td>
            </tr>
            <tr>
              <td>positiivisia</td>
              <td>{this.positive()}</td>
            </tr>
          </tbody>
        </table>

        <button onClick={this.resetToZero()}>nollaa tilasto</button>
      </div>
    )
  }
}

export default Statistics