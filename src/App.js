
import './App.css';
import UserLogin from './components/UserLogin';
import UserReg from './components/UserReg';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './components/Homepage';
import Todo from './components/Todo';

function App() {
  return (
    <>
    {/* Routing Using React Router DOM */}
      <div className='bg-gradient-to-r from-blue-500 to-purple-500 h-screen'>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Homepage />
                </>
              }
            />
            <Route path='/login' element={<UserLogin />} />
            <Route path='/register' element={<UserReg />} />
            <Route path='/Todo' element={<Todo />} />
          </Routes>
        </Router >
      </div>
    </>

  );
}

export default App;
