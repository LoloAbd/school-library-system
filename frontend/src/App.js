import Home from './Pages/Home'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import React from 'react'
import AddBook from './Pages/AddBook'
import ShowAllBooks from './Pages/ShowAllBooks'
import AddDeleteCategory from './Pages/AddDeleteCategory'
import AddStudent from './Pages/AddStudent'
import ShowAllStudent from './Pages/ShowAllStudent'
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
        <Route path='/AddBook' element={<AddBook />}></Route>
        <Route path='/AddDeleteCategory' element={<AddDeleteCategory />}></Route>
        <Route path='/ShowAllBooks' element={<ShowAllBooks />}></Route>
        <Route path='/AddStudent' element={<AddStudent />}></Route>
        <Route path='/ShowAllStudent' element={<ShowAllStudent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
