import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Theory from './pages/Theory';
import Songs from './pages/Songs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="theory" element={<Theory />} />
          <Route path="songs" element={<Songs/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
