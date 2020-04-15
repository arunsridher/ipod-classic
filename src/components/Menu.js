import React from 'react';
//font awesome imports to display icons from fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGreaterThan} from "@fortawesome/free-solid-svg-icons";

//functional component with props from App
const Menu = (props) => {
  //get menulist from props
  const {menuList} = props;
  return(
    <div id="menu">
      {/* display the name of the menu */}
      <div id="menu-heading">
        {menuList.menuName}
      </div>
      {/* display options in the menu list */}
      {menuList.menuOptions.map((option, index) => {
        // to display selected option - active one
        if(option.isSelected){
          return(
            <div className="menu-item active" key={index}>
              {option.optionName}
              <FontAwesomeIcon className="active-menu-item" icon={faGreaterThan} />
            </div>
          )
        }
        // display remaining options
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