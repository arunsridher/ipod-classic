import React from 'react';
import './App.css';

// get fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPlay, 
  faPause,
  faFastForward,
  faFastBackward
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <div className="ipod">
        <div className="screen"></div>
        <div className="controls">
          <div className="menu">Menu</div>
          <div className="next">
            <FontAwesomeIcon className="icon-style" icon={faFastForward} />
          </div>
          <div className="play">
            <FontAwesomeIcon className="icon-style" icon={faPlay} />
            <FontAwesomeIcon className="icon-style" icon={faPause} />
          </div>
          <div className="previous">
            <FontAwesomeIcon className="icon-style" icon={faFastBackward} />
          </div>
        </div>
      </div>
      <div class="reflection" id="ref"></div>
    </div>
  );
}

export default App;
