import React from 'react';
import Menu from './Menu';
import { noAuto } from '@fortawesome/fontawesome-svg-core';

const HomeScreen = (props) => {
  let {hideMenu, menuList} = props;
  if(!menuList.isActive)
    menuList = menuList.menuOptions[1].menuList;
  
  if(hideMenu){
    let option;
    for(let i = 0; i < menuList.menuOptions.length; i++){
      if(menuList.menuOptions[i].isSelected){
        option = menuList.menuOptions[i];
        break;
      }
    }
    return(
      <div id="home-screen">
        <img src={option.backgroundImage} alt={option.optionName} style={Styles.imgStyle}/>
        <p>{option.optionName}</p>
      </div>
    );
  }
  else{
    return(
      <div id="home-screen" style={{backgroundImage:`url(${menuList.backgroundImage})`}}>
        <Menu menuList={menuList} />
      </div>
    );
  }
}

const Styles = {
  imgStyle:{
    width:75,
    height:75,
    paddingTop:15,
    margin: "auto"
  }
}
export default HomeScreen;