import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';import Header from './components/Header';
import Code from './pages/Code';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path='/editCode/:id' element={<Code></Code>}></Route>
      </Routes>
    </div>
  );
}

export default App;
