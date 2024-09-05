import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));





root.render(
	<PayPalScriptProvider options= {{"client-id": "AcGjWwJr_Y0MScf0oIuRjmteEm-cuF9JwiW2_G-CUtCB4DPWy27BIBZcl-a2ZMY2QoPUUIruyX8teTHP"}}>
	<Provider store={store}>
	<React.StrictMode>
		      <ToastContainer
			  position={toast.POSITION.BOTTOM_RIGHT}
			  autoClose={5000}
			  hideProgressBar={false}
			  closeOnClick={true}
			  pauseOnHover={true}
			  draggable={true}
			   /> 
		<App />
	</React.StrictMode>
	</Provider>
	</PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
