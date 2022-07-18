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
import Login from "./Auth/Login";
import AddRole from "./Pages/Role/AddRole";
import AddUser from "./Pages/Role/AddUser";
import AddPages from "./Pages/Role/AddPages";
import AddModules from "./Pages/Role/AddModules";
import RolePermission from "./Pages/Role/RolePermission";

import { endPoint } from "./config/Config";
import Dashboard from "./Pages/Home/Dashboard.js/Dashboard";
import PrivateRoute from "./Layout/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { doGetNavigation } from "./store/actions/Navigation";
import CompanyInfo from "./Pages/General/CompanyInfo";
import CityNames from "./Pages/General/CityNames";
import Banknames from "./Pages/General/Banknames";
import AddMachines from "./Pages/General/AddMachines";
import AddShifts from "./Pages/General/AddShifts";
import EmployeeDesignations from "./Pages/General/EmployeeDesignations";
import StockUnits from "./Pages/General/StockUnits";
import CurrencyUnits from "./Pages/General/CurrencyUnits";
import Categories from "./Pages/Finance/Categories/Categories";
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
    localStorage.setItem("authUser", endPoint);
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
      {/* <ToastContainer /> */}
      {/* <ToastContainer
        position="top-right"
        autoClose={25000000}
        // hideProgressBar
        newestOnTop={false}
        // closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

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

                  <Routes>
                    <Route
                      path="RoleAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "RoleAccess"
                          )}
                        >
                          <AddRole
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "RoleAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="ModuleAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "ModuleAccess"
                          )}
                        >
                          <AddModules
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "ModuleAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="UserAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "UserAccess"
                          )}
                        >
                          <AddUser
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "UserAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="PermissionAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "PermissionAccess"
                          )}
                        >
                          <RolePermission
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "PermissionAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="PagesAccess"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "PagesAccess"
                          )}
                        >
                          <AddPages
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "PagesAccess"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
                    {/* <Route path="ModuleAccess" element={<AddModules />} />
                    <Route path="UserAccess" element={<AddUser />} />
                    <Route path="PagesAccess" element={<AddPages />} />
                    <Route
                      path="PermissionAccess"
                      element={<RolePermission />}
                    /> */}

                    {/* <Route path="/" element={<PrivateRoute nameRoute={"Dashboard"}><Dashboard /></PrivateRoute>} /> */}

                    <Route path="/" element={<Dashboard />} />

                    <Route
                      path="CompanyInfo"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "CompanyInfo"
                          )}
                        >
                          <CompanyInfo
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "CompanyInfo"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="Banknames"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "Banknames"
                          )}
                        >
                          <Banknames
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "Banknames"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    {/* <Route path="CompanyInfo" element={<CompanyInfo />} /> */}

                    {/* <Route path="Banknames" element={<Banknames />} /> */}

                    <Route
                      path="Designation"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "Designation"
                          )}
                        >
                          <EmployeeDesignations
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "Designation"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="CurrencyUnits"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "CurrencyUnits"
                          )}
                        >
                          <CurrencyUnits
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "CurrencyUnits"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="Machines"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "Machines"
                          )}
                        >
                          <AddMachines
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "Machines"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="Shifts"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "Shifts"
                          )}
                        >
                          <AddShifts
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "Shifts"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="CityNames"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "CityNames"
                          )}
                        >
                          <CityNames
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "CityNames"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="StockUnits"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "StockUnits"
                          )}
                        >
                          <StockUnits
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "StockUnits"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="Categories"
                      element={
                        <PrivateRoute
                          pagePermission={allPagesData.find(
                            (o: any) => o.pageURL === "Categories"
                          )}
                        >
                          <Categories
                            pagePermission={allPagesData.find(
                              (o: any) => o.pageURL === "Categories"
                            )}
                          />
                        </PrivateRoute>
                      }
                    />
                    {/* <Route path="Machines" element={<AddMachines />} /> */}

                    {/* <Route path="Categories" element={<Categories />} /> */}
                  </Routes>
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

// {isLogin===true && showMainLoader===false ? (
//
// ) : (

//     <>
//     {isLogin===false &&  showMainLoader===false &&

//     }
//     {
//       showMainLoader===true && isLogin===true && <>Loader </>
//     }

//     </>

// )}
