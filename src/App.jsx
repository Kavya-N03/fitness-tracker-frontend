import './App.css'
import { Routes, Route } from "react-router-dom";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/Userlogin";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from './Components/ProtectedRoute';
import ProfileSetup from './pages/ProfileSetup'
import ProfileInfo from './Components/ProfileInfo';
import GoalSetup from './pages/GoalSetup';
import ActivitySetUp from './pages/ActivitySetup';
import Meals from './pages/Meals';
import DisplayActivity from './Components/DisplayActivity';
import DisplayMeal from './Components/DisplayMeal';
import BottomNavBar from './Components/Navigation/BottomNavbar';
import Nutrition from './Components/Nutrition';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<UserRegister/>} />
      <Route path="/login" element={<UserLogin/>}/>

      <Route path='/dashboard' element={
        <ProtectedRoute>
          <DashBoard/>
        </ProtectedRoute>
      }/>
      <Route path="/goals" element={<GoalSetup/>}/>
      <Route path="/profilesetup" element={<ProfileSetup/>}/>
      <Route path='/profileinfo' element={<ProfileInfo/>}/>
      <Route path="/activity" element={<ActivitySetUp/>}/>
      <Route path="/meals" element={<Meals/>}/>
      <Route path='/acts' element={<DisplayActivity/>}/>
      <Route path='/displaymeals' element={<DisplayMeal/>}/>
      <Route path='/nutrition' element={<Nutrition/>}/>
    </Routes>
    <BottomNavBar/>
    </>
  );
}

export default App;
