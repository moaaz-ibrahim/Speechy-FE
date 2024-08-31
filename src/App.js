import logo from './logo.svg';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Router>
      <title>Speechy</title>
        <div className='App'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes here */}
      </Routes>
        </div>
    </Router>
    // <div className="App">
      
    //   <HomePage />
    // </div>
  );
}

export default App;
