import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Index } from './components/index';
import { League } from './components/league/league';
import { AddLeague } from './components/addLeague/addLeague';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/league/:id' element={<League />} />
        <Route path='/addLeague' element={<AddLeague />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
