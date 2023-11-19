import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Document from '@/pages/Document';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/document' element={<Document />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
