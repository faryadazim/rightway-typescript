import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../store/reducers";
interface PROPS {
  isLogin: boolean;
}
const Nav: React.FC<PROPS> = ({ isLogin }) => {
  const showNavMenu = useSelector((state: State) => state.NavState);
  // const [currentBlock, setCurrentBlock] = useState(1);
  const [currentBlock, setCurrentBlock] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  const showNavResult = useSelector((state: any) => state.NavReducer.data);

  function SetCurrentModules(modules: string, page: string) {
    setCurrentBlock(modules);
    setCurrentPage(page);
  }

  return (
    <>
      {isLogin ? (
        <>
          <>
            {" "}
            {showNavMenu == true ? (
              <>
                <div className="col-md-3 left_col">
                  <div className="left_col scroll-view">
                    {/* Logo */}
                    <div className="navbar nav_title" style={{ border: 0 }}>
                      <a href="/" className="site_title">
                        <img
                          src="images/logo.svg"
                          className="md-logo"
                          alt="true"
                        />
                        <img
                          src="images/logo_icon.svg"
                          className="sm-logo"
                          alt="true"
                        />
                      </a>
                    </div>
                    <div className="clearfix" />

                    {/* Sidebar Menu */}
                    <div className="main_menu_side hidden-print main_menu sidebar-menu">
                      <div className="menu_section">
                        {/*<h3>General</h3>*/}
                        <ul className="nav side-menu">
                          {showNavResult.navigationResult.map(
                            (
                              module: {
                                module_name: string;
                                module_icon: string;
                                pages: [
                                  {
                                    viewPermission: string;
                                    pageName: string;
                                    pageURL: string;
                                  }
                                ];
                              },
                              index: number
                            ) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() =>
                                    setCurrentBlock(module.module_name)
                                  }
                                  className={
                                    currentBlock === module.module_name
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <a
                                    onClick={() =>
                                      setCurrentBlock(module.module_name)
                                    }
                                  >
                                    <i className={`${module.module_icon}`} />
                                    {module.module_name}
                                    <span className="fa fa-chevron-down" />
                                  </a>
                                  <ul
                                    className={`nav child_menu ${
                                      currentBlock === module.module_name
                                        ? "d-block"
                                        : " d-none"
                                    }`}
                                  >
                                    {module.pages.map(
                                      (
                                        page: {
                                          viewPermission: string;
                                          pageName: string;
                                          pageURL: string;
                                        },
                                        i: number
                                      ) => {
                                        return (
                                          <>
                                            {page.viewPermission === "true" && (
                                              <>
                                                <li>
                                                  {" "}
                                                  <NavLink to={page.pageURL}>
                                                    {page.pageName}
                                                  </NavLink>{" "}
                                                </li>
                                                {currentBlock === "" &&
                                                  currentPage === "" &&
                                                  window.location.href.split(
                                                    "/"
                                                  )[
                                                    window.location.href.split(
                                                      "/"
                                                    ).length - 1
                                                  ] === page.pageURL &&
                                                  SetCurrentModules(
                                                    module.module_name,
                                                    page.pageURL
                                                  )}
                                              </>
                                            )}
                                          </>
                                        );
                                      }
                                    )}
                                  </ul>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                    {/* /sidebar menu */}
                    {/* /menu footer buttons */}
                    <div className="sidebar-footer hidden-small">
                      <NavLink
                        to="UserProfile"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="FullScreen"
                      >
                        {" "}
                        <span
                          className="glyphicon glyphicon-cog"
                          aria-hidden="true"
                        />
                      </NavLink>

                      <NavLink
                        to="RoleAccess"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="FullScreen"
                      >
                        {" "}
                        <span
                          className="glyphicon glyphicon-fullscreen"
                          aria-hidden="true"
                        />{" "}
                      </NavLink>

                      <NavLink
                        to="EmployeesList"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Lock"
                      >
                        {" "}
                        <span
                          className="glyphicon glyphicon-user"
                          aria-hidden="true"
                        />{" "}
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        </>
      ) : (
        <>not load yet</>
      )}
    </>
  );
};

export default Nav;
