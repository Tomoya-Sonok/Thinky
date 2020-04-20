import React from "react";
import logo from "./logo.svg";
import Home from "./Home.js";
import "./App.css";

import Layout from "./components/Layout";
import WhyModal from "./components/WhyModal";

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
      <WhyModal />
    </Layout>
  );
}

export default App;
