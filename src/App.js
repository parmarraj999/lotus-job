import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './layout/home/Home';
import About from './layout/about/About';
import Job from './layout/job-book/Job';
import Photo from './layout/photo/Photo';
import Nav from './layout/nav/Nav';
import ApplyForm from './component/apply-form/applyForm';
import RecentJob from './admin/recent-job/RecentJob';
import RecentApply from './admin/recent-apply/recentApply';
import RecentPhoto from './admin/recent-photo/recentPhoto';
import RecentUpload from './admin/recent-upload/recentUpload';
import Dashboard from './admin/dashboard/dashboard';
import RecentVideo from './admin/recent-video/RecentVideo';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Nav/>
      <Routes>
        <Route path='admin' element={<Dashboard/>}>
          <Route path='recent-job' element={<RecentJob/>}/>
          <Route path='recent-apply' element={<RecentApply/>}/>
          <Route path='recent-photo' element={<RecentPhoto/>}/>
          <Route path='recent-uploads' element={<RecentUpload/>}/>
          <Route path='recent-video' element={<RecentVideo/>}/>
          </Route>
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
