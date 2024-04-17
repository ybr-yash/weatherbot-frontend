import './App.css';
import {BrowserRouter} from "react-router-dom";

import Dashboard from './Components/Dashboard/Dashboard';

function App() {

  

  return (
    <div className="App">
      <BrowserRouter>
          <Dashboard/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
