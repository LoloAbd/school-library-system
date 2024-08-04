import Home from './Pages/Home'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    /*
    <div>
      <Home />
    </div>*/

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Registration' element={<Registration />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
