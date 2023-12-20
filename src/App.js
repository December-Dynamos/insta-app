import React,{useState} from 'react';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <Signup setToken={setToken}/>
      <Login setToken={setToken}/>
      <Dashboard token={token}/>
    </div>
  );
}

export default App;
