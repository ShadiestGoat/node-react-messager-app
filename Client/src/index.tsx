import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./App.css";
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { DMpage } from './pages/dm';

ReactDOM.render(
  // <React.StrictMode>
    <div className="App">
      <DMpage channlId="98282717244666928854" token="544709652e868f2cb7dc8bb95ff6bdaad9002c4109501be3a32c89244cf4e773" id="47615026313301367274"> </DMpage>
    </div>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
