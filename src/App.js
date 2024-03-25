// App.js
import React from "react";
import Header from "./Hearder/Hearder";
import Login from "./Login/Login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-background">
        <Login />
      </div>
    </div>
  );
}

export default App;
