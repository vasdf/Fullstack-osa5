import React from 'react'

const CreateBlogForm = ({ onSubmit, handleChange, title, author, url }) => (
  <div>
    <h2>create new</h2>

    <form onSubmit={onSubmit}>
      <div>
        title:
          <input
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div>
        author:
          <input
          name="author"
          value={author}
          onChange={handleChange}
        />
      </div>
      <div>
        ulr:
          <input
          name="url"
          value={url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
)

export default CreateBlogForm