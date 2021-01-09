import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './approuter';
// import * as serviceWorker from './client/serviceWorker';

// boostrap
import 'bootstrap/dist/css/bootstrap.min.css';

//fontawesome

import '../node_modules/font-awesome/css/font-awesome.min.css'; 

import './client/assets/css/all.css';
import './client/assets/css/all.min.css';
import './client/assets/css/fontawesome.min.css';
import "react-datepicker/dist/react-datepicker.css";
//carousel
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//style
import './client/assets/css/style.css';

//admin
//import './admin/assets/css/app.css';
import './admin/assets/css/feathericon.min.css';
import './admin/assets/js/script.js';
import './admin/assets/css/fontawesome.min.css';

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

if (module.hot) { // enables hot module replacement if plugin is installed
 module.hot.accept();
}