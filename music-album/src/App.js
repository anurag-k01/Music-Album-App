
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from './Components/HomePage';
import Songs from './Components/Songs';
function App() {
  return (
    <div className="App">
      
        <Routes>
        <Route path="/:id" element={<Songs />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
