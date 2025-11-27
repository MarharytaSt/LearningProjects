// import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.sass';



// ReactDOM.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>,
//     document.getElementById('root')
// );

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />)


