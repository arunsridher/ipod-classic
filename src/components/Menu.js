import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGreaterThan} from "@fortawesome/free-solid-svg-icons";

const Menu = (props) => {
  const {menuList} = props;
  return(
    <div id="menu">
      <div id="menu-heading">
        {menuList.menuName}
      </div>
      {menuList.menuOptions.map((option, index) => {
        if(option.isSelected){
          return(
            <div className="menu-item active" key={index}>
              {option.optionName}
              <FontAwesomeIcon className="active-menu-item" icon={faGreaterThan} />
            </div>
          )
        }
        else{
          return(
            <div className="menu-item" key={index}>
              {option.optionName}
            </div>
          )
        }
      })}
    </div>
  );
}

export default Menu;