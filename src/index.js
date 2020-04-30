import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/app/app";


ReactDOM.render(<App />, document.getElementById('root'));




// fetch ('https://opensky-network.org/api/flights/arrival?airport=EHAM&begin=1587499465&end=1588017865')
// .then((res)=>{
//
//     return res.json();
// }).then((body)=>{
//     console.log(body);
// });