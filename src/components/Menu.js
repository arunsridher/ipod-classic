import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGreaterThan} from "@fortawesome/free-solid-svg-icons";

const Menu = (props) => {
  const {menuItems} = props;
  return(
    <div id="menu">
      <div id="menu-heading">
        {menuItems[0].name}
      </div>
      {menuItems.slice(1).map((menuItem, index) => {
        if(menuItem.isSelected){
          return(
            <div className="menu-item active" key={index}>
              {menuItem.name}
              <FontAwesomeIcon className="active-menu-item" icon={faGreaterThan} />
            </div>
          )
        }
        else{
          return(
            <div className="menu-item" key={index}>
              {menuItem.name}
            </div>
          )
        }
      })}
    </div>
  );
}

export default Menu;