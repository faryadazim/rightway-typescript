import React from "react";
import { useSelector } from "react-redux";
import { State } from "../store/reducers";
const Footer = () => {
  const showNavMenu = useSelector((state:State) => state.NavState);
  return (
    <>
      <footer
        className={`footer   ${
          showNavMenu === false ? "footer-margin-remove" : " "
        }  `}
      >
        <div className="pull-right">
          Weaving - Management System by{" "}
          <a href="www.technupur.com">Technupur</a>
        </div>
        <div className="clearfix" />
      </footer>
    </>
  );
};

export default Footer;
