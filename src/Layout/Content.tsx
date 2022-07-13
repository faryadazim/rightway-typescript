import React from "react";
import { useSelector } from "react-redux";
import { State } from "../store/reducers";

const Content:React.FC = () => {
  
  const showNavMenu = useSelector((state: State) => state.NavState);
  return (
    <>
      <div
        role="main"
        className={`top_nav   ${
          showNavMenu === false ? "right_col-margin-remove" : " "
        }  `}
      >
        <div className="page-title ">
          <div className="title_left">
            <h1>Main Heading LOREMDFDFSD</h1>
          </div>
          <div className="clearfix" />
        </div>
        <p>Page Contents Area...</p>
      </div>
    </>
  );
};

export default Content;
