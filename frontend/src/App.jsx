// import './App.css'
// import Register from './components/Register'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Login from './components/Login'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'

// function App() {

//   return (
//     <>
//       <div className=''>
//         <BrowserRouter>
//         <Sidebar/>
//         <Navbar/>
//           <Routes>
//             <Route path='/register' element={<Register />} />
//             <Route path='/login' element={<Login />} />

//           </Routes>
//         </BrowserRouter>
//       </div>
//     </>
//   )
// }

// export default App


import './App.css';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Category from './components/Category';
import SubCategories from './components/SubCategories';
import ProductComponent from './components/ProductComponent';
import Home from './components/Home';

function App() {
  return (
    <>
      <div className="flex h-screen">
      <BrowserRouter>
        <Sidebar className="w-64 h-full bg-gray-800 text-white fixed" />
        <div className="flex flex-col w-full ml-64">
          <Navbar className="h-16 bg-gray-900 text-white w-full" />
          <main className="flex-1 p-4 overflow-auto bg-[#f4f4f4] mt-16">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/categories" element={<Category />} />
              <Route path="/subcategories" element={<SubCategories />} />
              <Route path="/products" element={<ProductComponent />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
