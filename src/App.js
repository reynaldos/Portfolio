import React from 'react';
import {Home}  from './pages';
import { MouseCursor } from './components/mouse';
import { isMobile } from 'react-device-detect';
import { ModelViewer } from './threeJs/SceneV2';

export const App = () => {

    return (
      <>

        {/* mouse shape */}
        {!isMobile && <MouseCursor />}

        <Home />
      </>
    );

}

export default App;


