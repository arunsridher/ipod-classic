//include react
import React from 'react';
//include menu component
import Menu from './Menu';
//get music player background image
import imageURL from '../player.png'
import audioFile from '../Thunder.mp3';

//home screen functional property with props set from App
const HomeScreen = (props) => {
  //get hide menu and menulist from props
  let {hideMenu, menuList} = props;
  //set menulist to musci menu if main menu is not active
  if(!menuList.isActive)
    menuList = menuList.menuOptions[1].menuList;
  
  //check if we have to hide menu
  if(hideMenu){
    //check active menu to display corresponding option page or menu
    let option;
    for(let i = 0; i < menuList.menuOptions.length; i++){
      if(menuList.menuOptions[i].isSelected){
        option = menuList.menuOptions[i];
        break;
      }
    }
    //if option selected is all songs
    if(option.optionName === "All Songs"){
      return(
        <div id="home-screen">
          <div className="image-container">
            <img src={imageURL} alt="player dummy screen" />
            <audio id="audio" autoPlay>  
              <source src={audioFile} type="audio/mpeg" />  
              <p> Your browser doesn't support the audio tag </p>
            </audio> 
          </div>
        </div>
      );
    }
    else{
      //for all other options display corresponding background and option name
      return(
        <div id="home-screen">
          <img src={option.backgroundImage} alt={option.optionName} style={Styles.imgStyle}/>
          <p>{option.optionName}</p>
        </div>
      );
    }
  }
  else{
    //render menulist with corresponding background image
    return(
      <div id="home-screen" style={{backgroundImage:`url(${menuList.backgroundImage})`, objectFit:"cover"}}>
        {/* pass the menu list to MenuList component to render it */}
        <Menu menuList={menuList} />
      </div>
    );
  }
}

const Styles = {
  imgStyle:{
    width:180,
    height:105,
    borderRadius: '10%',
    paddingTop:15,
    margin: "auto"
  }
}
export default HomeScreen;