import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './layout/home/Home';
import About from './layout/about/About';
import Job from './layout/job-book/Job';
import Photo from './layout/photo/Photo';
import Nav from './layout/nav/Nav';
import FileUpload from './function/upload/upload';
import Dashboard from './admin/dashboard';
import ApplyForm from './component/apply-form/applyForm';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Nav/>
      <Routes>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route exact path="/job" element={<Job/>}/>
        <Route/>
        <Route exact path="/photo" element={<Photo/>}>
        </Route>
        <Route path='/apply' element={<ApplyForm/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
