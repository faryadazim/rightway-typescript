// React Import
import { useEffect, useState } from "react";
//  Style Module Import
import "./App.css";
// Router Import
import { Routes, Route } from "react-router-dom";
// Notifier Import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Component Import
import Nav from "./Layout/Nav";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Content from "./Layout/Content";

import PrivateRoute from "./Layout/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { doGetNavigation } from "./store/actions/Navigation";

import Login from "./Auth/Login";
import { endPoint } from "./config/Config";

import Banknames from "./Pages/General/Banknames";

function App() {
  const [isLogin, setisLogin] = useState<boolean>(false);
  const [showMainLoader, setShowMainLoader] = useState<boolean>(true);
  const dispatch = useDispatch();
  const showNavResukt = useSelector((state: any) => state.NavReducer.data);

  let allPagesData = [1];
  if (showNavResukt !== undefined) {
    showNavResukt.navigationResult.map((eachModule: any) => {
      eachModule.pages.map((eachPage: any) => {
        allPagesData.push(eachPage);
      });
    });
  }

  useEffect(() => {
    var newRetrived = localStorage.getItem("access_token");
    if (newRetrived) {
      setisLogin(true);
    } else {
      setisLogin(false);
    }
    dispatch(doGetNavigation(setShowMainLoader));
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLogin === null ? (
        <>
          {" "}
          <div className="lds-dual-ring-ForMain-Page "></div>
        </>
      ) : !isLogin ? (
        <>
          <Login
            setisLogin={setisLogin}
            setShowMainLoader={setShowMainLoader}
          />
        </>
      ) : (
        <>
          {showMainLoader ? (
            <>
              {" "}
              <div className="lds-dual-ring-ForMain-Page "></div>
            </>
          ) : (
            <>
              <div className="container body">
                <div className="main_container">
                  <Nav isLogin={isLogin} />
                  <Header
                    roleName={showNavResukt.RoleName}
                    setisLogin={setisLogin}
                  />
                  <Banknames
                    pagePermission={allPagesData.find(
                      (o: any) => o.pageURL === "Banknames"
                    )}
                  />
                  {/* <Content/> */}
                  <Footer />
                </div>
              </div>
            </>
          )}{" "}
        </>
      )}
    </>
  );
}

export default App;
