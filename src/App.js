//import react 
import React from 'react';
import './App.css';

//import our componenets
import Controls from './components/Controls';
import HomeScreen from './components/HomeScreen';

class App extends React.Component {
  constructor() {
    super();
    //state holds the menulist data
    this.state = {
      hideMenu: false, // whether to display or hide the menu list
      menuList: {
        menuName: "ipod.js",
        isActive: true,
        backgroundImage: "https://cdn.pixabay.com/photo/2015/06/19/11/41/geometry-814744_960_720.png",
        menuOptions: [
          {
            optionName: "Cover Flow",
            isSelected: true,
            backgroundImage: "https://images.theconversation.com/files/258026/original/file-20190208-174861-nms2kt.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
          },
          {
            optionName: "Music",
            isSelected: false,
            //sub menu list of music option
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
                  backgroundImage: "https://cdn.pixabay.com/photo/2015/09/05/01/03/records-923679_960_720.jpg"
                },
                {
                  optionName: "Artists",
                  isSelected: false,
                  backgroundImage: "https://media.defense.gov/2015/Nov/23/2001320091/750/422/0/151118-M-RH401-060.JPG"
                }
              ]
            }
          },
          {
            optionName: "Games",
            isSelected: false,
            backgroundImage: "https://c1.wallpaperflare.com/preview/523/21/80/board-game-fun-game-hands.jpg"
          },
          {
            optionName: "Settings",
            isSelected: false,
            backgroundImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWqo4UHDzpOw80JajA1W9HUyKlPSgHw1vygATH3JRZGw_OVTF2KA&s"
          }
        ]
      }
    };
  }

  //controls callback - whenever we scroll or click a button this method will be called
  myCallback = (dataFromChild) => {
    switch (dataFromChild) {
      //if menu button is clicked
      case "menu":
        //to hide main menu
        if (this.state.hideMenu) {
          this.setState({ hideMenu: false });
        }
        //hide music menu and show main menu
        else if (!this.state.menuList.isActive) {
          let mList = this.state.menuList;
          let innerMList = mList.menuOptions[1].menuList;
          let options = innerMList.menuOptions;
          for (let i = 0; i < options.length; i++) {
            options[i].isSelected = false;
          }
          options[0].isSelected = true;
          innerMList.isActive = false;
          mList.isActive = true;
          this.setState({ menuList: mList });
        }
        break;
      //if select button is clicked
      case "select":
        let menu = this.state.menuList;
        //if main menu is being displayed
        if (menu.isActive) {
          //if music options menu is selected show musci menu
          if (menu.menuOptions[1].isSelected) {
            menu.isActive = false;
            menu.menuOptions[1].menuList.isActive = true;
            this.setState({ menuList: menu });
          }
          else {
            //hide menu and show corresponding screen
            this.setState({ hideMenu: true });
          }
        }
        else {
          //hide music menu and show corresponding screen
          this.setState({ hideMenu: true });
        }
        break;
      //if play/pause button is clicked
      case "play-pause":
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          //if menu is hidden and all songs option is selected -> means we are in player screen
          if (allSongs.isSelected) {
            //get the audio element
            let audio = document.getElementById("audio");
            //TODO: use these values to show song prgress; refactor code have seperate class componenet
            console.log(audio.duration);
            console.log(audio.currentTime);
            //toggle play/pause
            if (audio.paused) {
              audio.play();
            } else {
              audio.pause();
            }
          }
        }
        break;
      case "fast-forward":
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          //if menu is hidden and all songs option is selected -> means we are in player screen
          if (allSongs.isSelected) {
            //get the audio element
            let audio = document.getElementById("audio");
            if (!audio.paused) {
              //get total duration of the song
              let totalDuration = audio.duration;
              //get current seek time
              let currentTime = audio.currentTime;
              //forward by 15 seconds; if seek time croses total duration set it to total duration
              currentTime = (currentTime + 15 < totalDuration) ? currentTime + 15 : totalDuration;
              //update the audio currentime
              audio.currentTime = currentTime;
            }
          }
        }
        break;
      case "fast-backward":
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          //if menu is hidden and all songs option is selected -> means we are in player screen
          if (allSongs.isSelected) {
            //get the audio element
            let audio = document.getElementById("audio");
            if (!audio.paused) {
              //get current time
              let currentTime = audio.currentTime;
              //reduce current time by 15 seconds if its still greater than 0 or set it to 0
              currentTime = (currentTime - 15 > 0) ? currentTime - 15 : 0;
              //update the audio current time
              audio.currentTime = currentTime;
            }
          }
        }
        break;
      case 1:
      case -1:
        //to increase or decrease volume when a song is being played
        if (this.state.hideMenu) {
          let allSongs = this.state.menuList.menuOptions[1].menuList.menuOptions[0];
          //check if we are in the all songs screen
          if (this.state.menuList.menuOptions[1].menuList.isActive && allSongs.isSelected) {
            let audio = document.getElementById("audio");
            //increase or decrease volume if not paused
            if (!audio.paused) {
              console.log(audio.volume);
              let volumeChanger = dataFromChild === 1 ? 0.1 : -0.1;
              volumeChanger += audio.volume;
              //limit volume value between 0 and 1
              volumeChanger = volumeChanger > 1 ? 1 : (volumeChanger < 0 ? 0 : volumeChanger);
              audio.volume = volumeChanger;
            }
          }
          return;
        }
        // if either clockwise or anti-clockwise scroll has been detected
        let index;
        let list = this.state.menuList;
        //see whethe the displayed menu is main menu or music menu
        let options = list.isActive ? list.menuOptions : list.menuOptions[1].menuList.menuOptions;
        //find the current active option
        for (let i = 0; i < options.length; i++) {
          if (options[i].isSelected) {
            index = i;
            break;
          }
        }
        //make the current option inactive
        options[index].isSelected = false;
        //if clock wise make next option active otherwise make previous option active
        let nexIndex = dataFromChild === 1 ? (index + 1) % options.length : (index > 0 ? index - 1 : options.length - 1);
        options[nexIndex].isSelected = true;
        //set state to render the updates
        this.setState({ menuList: list });
        break;
      default:
        console.log("wrong input");
    }
  }

  render() {
    const { hideMenu, menuList } = this.state;
    return (
      <div className="App">
        <div className="ipod">
          <div className="screen">
            <div className="display">
              {/* render home screen component with props menulist and menu hide options */}
              <HomeScreen hideMenu={hideMenu} menuList={menuList} key={menuList.menuName} />
            </div>
          </div>
          {/* render cntrols wheel and send callback method in props */}
          <Controls callbackFromParent={this.myCallback} />
        </div>
        <div className="reflection" id="ref"></div>
      </div>
    );
  }
}
export default App;
