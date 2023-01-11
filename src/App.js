import './App.css';
import HomePage from './component/Homepage';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ProfilePage from './component/ProfilePage';
import GalleryPage from './component/GalleryPage';
import TodosPage from './component/TodosPage';
import PostsPage from './component/PostsPage';
function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/profile/:id" element={<ProfilePage/>}/>
        <Route exact path="/posts" element={<PostsPage/>}/>
        <Route exact path="/gallery" element={<GalleryPage/>}/>
        <Route exact path="/todos" element={<TodosPage/>}/>


      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
