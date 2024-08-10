import Home from './Pages/Home'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import React from 'react'
import AddBook from './Pages/AddBook'
import ShowAllBooks from './Pages/ShowAllBooks'
import ShowAllBooksS from './Pages/ShowAllBooksS'
import AddDeleteCategory from './Pages/AddDeleteCategory'
import AddStudent from './Pages/AddStudent'
import ShowAllStudent from './Pages/ShowAllStudent'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import LibrarianHome from './Pages/LibrarianHome'
import LendingBook from './Pages/LendingBook'
import ShowBorrowedBooks from './Pages/ShowBorrowedBooks'
import StudentFee from './Pages/StudentFee'
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Registration' element={<Registration />}></Route>
        <Route path='/AddBook' element={<AddBook />}></Route>
        <Route path='/AddDeleteCategory' element={<AddDeleteCategory />}></Route>
        <Route path='/ShowAllBooks' element={<ShowAllBooks />}></Route>
        <Route path='/ShowAllBooksS' element={<ShowAllBooksS />}></Route>
        <Route path='/AddStudent' element={<AddStudent />}></Route>
        <Route path='/ShowAllStudent' element={<ShowAllStudent />}></Route>
        <Route path='/ForgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/ResetPassword' element={<ResetPassword />}></Route>
        <Route path='/LibrarianHome' element={<LibrarianHome />}></Route>
        <Route path='/LendingBook' element={<LendingBook />}></Route>
        <Route path='/ShowBorrowedBooks' element={<ShowBorrowedBooks />}></Route>
        <Route path='/StudentFee' element={<StudentFee />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
