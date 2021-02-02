import { useState, useRef, useEffect } from "react";
import React from "react";
import './index.css';
const axios = require('axios');

const Create = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('mario');
  // It's not clear to me how to trigger updates to the UI
  const useForceUpdate = () => useState()[1];
  const fileInput = useRef(null);
  const forceUpdate = useForceUpdate();
  const handleSubmit = (e) => {

    var formData = new FormData();
    formData.append('imageUrl', fileInput.current.files);
    formData.append('title',title);
    formData.append('descriprion', description);

    console.log(formData);
    console.log('new data added' + JSON.stringify(formData));
    axios({
      method: 'post',
      url: 'https://scorefootball.herokuapp.com/insert/post',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        alert('succes')
          //handle success
          console.log(response);
      })
      .catch(function (response) {
        alert('error')
          //handle error
          console.log(response);
      });
    // fetch('https://scorefootball.herokuapp.com/insert/post', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData)
    // }).then(() => {

    //   console.log('new data added');
    // })
  }

  useEffect(e => {
    window.addEventListener("keyup", clickFileInput);
    return () => window.removeEventListener("keyup", clickFileInput);
  });

  function clickFileInput(e) {
    if (fileInput.current.nextSibling.contains(document.activeElement)) {
      // Bind space to trigger clicking of the button when focused
      if (e.keyCode === 32) {
        fileInput.current.click();
      }
    }
  }
  // function onSubmit(e) {
  //   e.preventDefault();
  //   const data = new FormData(fileInput.current.files);
  // }

  function fileNames() {
    const { current } = fileInput;

    if (current && current.files.length > 0) {
      let messages = [];
      for (let file of current.files) {
        messages = messages.concat(<p key={file.name}>{file.name}</p>);
      }
      return messages;
    }
    return null;
  }


  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <input
          id="file"
          type="file"
          ref={fileInput}
          onChange={forceUpdate}
          multiple
        />
        <label htmlFor="file">
          <span tabIndex="0" role="button" aria-controls="filename">
            Upload file(s):{" "}
          </span>
        </label>
        {fileNames()}
        <button>Add Blog</button>
      </form>
    </div>
  );
}

export default Create;