import React from 'react';
import './App.css';
import Controls from './components/Controls';
import Menu from './components/Menu';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      menuItems:[
        {
          name: "ipod.js"
        },
        {
          name: "Cover Flow",
          isSelected : true
        },
        {
          name: "Music",
          isSelected : false
        },
        {
          name: "Games",
          isSelected : false
        },
        {
          name: "Settings",
          isSelected : false
        }
      ]
    };
  }

  myCallback = (dataFromChild) => {
    console.log(dataFromChild);
  }

  render(){
    const {menuItems} = this.state;
    return (
      <div className="App">
        <div className="ipod">
          <div className="screen">
            <div className="display">
              <Menu menuItems={menuItems} key={menuItems.name} />
            </div>
          </div>
          <Controls callbackFromParent={this.myCallback} />
        </div>
        <div className="reflection" id="ref"></div>
      </div>
    );
  }
}
export default App;
