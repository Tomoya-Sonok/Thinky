import React from "react";
// import logo from "./logo.svg";
import "./App.css";

import Layout from "./components/Layout";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React11
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <Layout>
      <App />
    </Layout>
  );
}

export default App;
