import React from 'react';
import './App.css';
import Controls from './components/Controls';
import HomeScreen from './components/HomeScreen';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      hideMenu: false,
      menuList: {
        menuName: "ipod.js",
        isActive: true,
        backgroundImage: "https://digitalsynopsis.com/wp-content/uploads/2017/02/beautiful-color-gradients-backgrounds-010-winter-neva.png",
        menuOptions: [
          {
            optionName: "Cover Flow",
            isSelected: true,
            backgroundImage: "https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
          },
          {
            optionName: "Music",
            isSelected: false,
            menuList: {
              menuName: "Music",
              isActive: false,
              backgroundImage: "https://c8.alamy.com/comp/2AHPNFJ/neon-colors-isolated-on-a-black-background-music-instruments-vector-illustration-square-shape-design-with-musical-instruments-and-equipment-2AHPNFJ.jpg",
              menuOptions: [
                {
                  optionName: "All Songs",
                  isSelected: true,
                  backgroundImage: "https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
                },
                {
                  optionName: "Albums",
                  isSelected: false,
                  backgroundImage: "https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
                },
                {
                  optionName: "Artists",
                  isSelected: false,
                  backgroundImage: "https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
                }
              ]
            }
          },
          {
            optionName: "Games",
            isSelected: false,
            backgroundImage: "https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
          },
          {
            optionName: "Settings",
            isSelected: false,
            backgroundImage: "https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
          }
        ]
      }
    };
  }

  myCallback = (dataFromChild) => {
    switch(dataFromChild){
      case "menu":
        if(this.state.hideMenu){
          this.setState({hideMenu: false});
        }
        else if(!this.state.menuList.isActive){
          let mList = this.state.menuList;
          let innerMList = mList.menuOptions[1].menuList;
          let options = innerMList.menuOptions;
          for(let i = 0; i < options.length; i++){
            options[i].isSelected = false;
          }
          options[0].isSelected = true;
          innerMList.isActive = false;
          mList.isActive = true;
          this.setState({menuList: mList});
        }
        break;
      case "select":
        let menu = this.state.menuList;
        if(menu.isActive){
          if(menu.menuOptions[1].isSelected){
            menu.isActive = false;
            menu.menuOptions[1].menuList.isActive = true;
            this.setState({menuList:menu});
          }
          else{
            this.setState({hideMenu:true});
          }
        }
        else{
          this.setState({hideMenu:true});
        }
        break;
      case 1:
      case -1:
        let index;
        let list = this.state.menuList;
        let options = list.isActive? list.menuOptions : list.menuOptions[1].menuList.menuOptions;
        for(let i = 0; i < options.length; i++){
          if(options[i].isSelected){
            index = i;
            break;
          }
        }
        options[index].isSelected = false;
        let nexIndex = dataFromChild === 1 ? (index+1)%options.length : (index > 0 ? index-1: options.length-1);
        options[nexIndex].isSelected = true;
        this.setState({menuList: list});
        break;
      default:
        console.log("wrong input");
    }
  }

  render(){
    const {hideMenu, menuList} = this.state;
    return (
      <div className="App">
        <div className="ipod">
          <div className="screen">
            <div className="display">
              <HomeScreen hideMenu={hideMenu} menuList={menuList} key={menuList.menuName} />
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
