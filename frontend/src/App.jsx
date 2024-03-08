import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Document from '@/pages/Document';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import { DOC_ID_PARAM } from '@/util/constants';

function App() {
  return (
    <div className="h-full w-full">
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/register' exact element={<Register/>}/>
          <Route path={`/document/:${DOC_ID_PARAM}`} element={<Document />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
