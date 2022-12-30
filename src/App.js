
import './App.css';
import { router } from './Router/Route.js';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';
import Main from './components/Main/Main';

export const UserContext =createContext();
export const LoadingContext=createContext();
function App() {
  const [user,setUser]=useState({})
  const [loading,setLoading]=useState(false);  
  
  return (
    <UserContext.Provider value={[user,setUser]}>      
        <LoadingContext.Provider value={[loading,setLoading]}>
          <div className="App">
            <RouterProvider router={router}>
              <Main></Main>
            </RouterProvider>
            <Toaster></Toaster>
          </div>
        </LoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
