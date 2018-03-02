import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, handleChange, username, password }) => (
  <div>
    <h2>Log in to application</h2>

    <form onSubmit={onSubmit}>
      <div>
        username:
          <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div>
        password:
          <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default LoginForm