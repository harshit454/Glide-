
import { useEffect, useState } from "react"; 
import SplashScreen from "./components/SplachScreen/SplashScreen"; 
import Main from "./components/Main";
 
function App() { 
  const [loading, setLoading] = useState(true); 
 
  useEffect(() => { 
    const timer = setTimeout(() => { 
      setLoading(false); 
    }, 3000); 
 
    return () => clearTimeout(timer); 
  }, []); 
 
  if (loading) { 
    return <SplashScreen/>; 
  } 
 
  return <Main/>; 
} 
 
export default App;
