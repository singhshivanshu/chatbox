import React,{useState} from 'react';
import './App.css';
import Main from './Main';
import Header from './layout/Header';
function App() {
  const [authentication, setAuthentication] = useState(null);

  const getAuthenticationValue = (fromMain) => {
   setAuthentication(fromMain)
  }
 
  return (
    <div className="App">
      <Header authentication={authentication}/>
      <Main callBackFromApp={getAuthenticationValue}/>
      
    </div>
  );
}

export default App;
