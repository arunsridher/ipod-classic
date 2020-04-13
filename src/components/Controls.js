import React from 'react';
// get fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFastForward,
  faFastBackward
} from "@fortawesome/free-solid-svg-icons";

import ZingTouch from 'zingtouch';

class Controls extends React.Component {

  handleScroll = (callbackFromParent) => {
    let angle = 0
    const target = document.getElementById('controls');
    const region = new ZingTouch.Region(target);
    region.bind(target, 'rotate', function(e) {
      angle += Math.floor(e.detail.distanceFromLast);
      if(Math.abs(angle) > 30){
        let scrollDir = angle > 30 ? 1 : -1;
        angle = 0;
        callbackFromParent(scrollDir);
      }
    });
  }

  handleClick = (component) => {
    this.props.callbackFromParent(component);
  }

  render(){
    const {callbackFromParent} = this.props;
    return (
      <div id="controls" onClick={() => this.handleScroll(callbackFromParent)} draggable="false">
        <div id="menu-button" onClick={() => this.handleClick("menu")}>
          Menu
        </div>
        <div id="next">
          <FontAwesomeIcon className="icon-style" icon={faFastForward} />
        </div>
        <div id="play">
          <FontAwesomeIcon className="icon-style" icon={faPlay} />
          <FontAwesomeIcon className="icon-style" icon={faPause} />
        </div>
        <div id="previous">
          <FontAwesomeIcon className="icon-style" icon={faFastBackward} />
        </div>
        <div id="select" onClick={() => this.handleClick("select")}></div>
      </div>
    );
  }
}

// const styles = {
//   controls: {
//     position: 'relative',
//     margin: '3.5em auto',
//     width: '5em',
//     height: '5em',
//     border: '3.5em solid #fff',
//     borderRadius: '50%',
//     boxShadow: 'inset 0 1em 3em #aaa'
//   },
//   menu: {
//     position: 'absolute',
//     top: '-3.4em',
//     left: '0.9em',
//     fontWeight: 'bold',
//     color: '#b4bcc5',
//     width: '50px',
//     height: '25px',
//     cursor: 'default',
//   },
//   next: {
//     position: 'absolute',
//     left: '7em',
//     top: '1.75em',
//   },  
//   play: {
//     position: 'absolute',
//     top: '6.9em',
//     left: '1.1em',
//     width: '50px',
//     height: '25px'
//   },  
//   previous: {
//     position: 'absolute',
//     top: '1.75em',
//     left: '-3.2em'
//   },  
//   iconStyle: {
//     fontSize: '0.8em !important',
//     padding: '2px',
//     color: '#b4bcc5',
//     fontWeight: 'lighter'
//   }
// }

export default Controls;
