import React from 'react';
import {Home}  from './pages';
import { MouseCursor } from './components/mouse';


export const App = () => {

    return (
      <>
      {/* mouse shape */}
      <MouseCursor/>
      
      <Home/>
      </>
          
    );

}

export default App;


