import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import "./Role.css";
import { useSelector } from "react-redux";
import { endPoint } from "../../config/Config";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-toastify";
import { State } from "../../store/reducers";

const customStyles: any = {
  control: (provided: any, state: any, base: any) => ({
    ...provided,
    border: "1px solid #c2cad8",
    borderRadius: "5px",
    minHeight: "30px",
    height: "30px",
    color: "#555",
    ...base,
    boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "#f79c74" : "#555",
    background: "#fff",
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    margin: "0px",
    color: "#555",
  }),
  indicatorSeparator: (state: any) => ({
    display: "none",
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    height: "30px",
  }),
};
const RolePermission: React.FC<any> = () => {
  const accessToken: any = localStorage.getItem("access_token");
  const notifyAdd = () => toast("Page Permission updated!");
  const notifyErr = () => toast("Something went wrong");
  const url = localStorage.getItem("authUser");
  const showNavMenu = useSelector((state: State) => state.NavState);
  const [isLoading, setisLoading] = useState(false);
  const [pagePermissionList, setpagePermissionList] = useState([]);
  const [reRenderApp, setReRenderApp] = useState(false);
  const [roleValue, setRoleVAlue] = useState("");
  const [roleOptions, setRoleOptions] = useState<any>([]);
  const [RoleToBeSearch, setRoleToBeSearch] = useState("");
  const [show, setShow] = useState(false);
  const fetchRollData = () => {
    fetch(url + "api/Roles", {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((response) => {
      response.json().then((data) => {
        var arr: any = [];
        data.map((item: any) => {
          arr.push({ label: item.Name, value: item.Id });
        });
        setRoleOptions(arr);
      });
    });
  };
  const fetchAllData = (e: any) => {
    fetch(url + `api/PagePermissions?roleId=${e}`, {
      method: "GET",
      headers: {
        // Authorization: "bearer" + " " + e,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        response.json().then((data) => {
          var sorted = data.sort((a: any, b: any) =>
            a.module_name.localeCompare(b.module_name)
          );
          setpagePermissionList(sorted);
          setReRenderApp(!reRenderApp);
          fetchRollData();
        });
      })
      .catch((error) => console.log("error", error));
  };
  // const updatePagePermission = async (pagePermissionState) => {
  //   var data = JSON.stringify({
  //     PermissionId: pagePermissionState.pagePermissionId,
  //     RoleId: RoleToBeSearch,
  //     PageId: pagePermissionState.pageID,
  //     EditPermission: pagePermissionState.EditPermission,
  //     viewPermission: pagePermissionState.viewPermission,
  //     DelPermission: pagePermissionState.DelPermission,
  //     AddPermission: pagePermissionState.AddPermission,
  //   });

  //   console.log(JSON.parse(data));
  //   var config = {
  //     method: "put",
  //     url: `${endPoint}api/updatePagePermissions?roleId=${RoleToBeSearch}`,
  //     headers: {
  //       Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token")).access_token
  //         }`,
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   await axios(config)
  //     .then(function (response) {
  //       if (response.status === 200) {
  //         notifyAdd();
  //         fetchAllData(RoleToBeSearch);
  //       } else {
  //         notifyErr();
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const updatePermissions = () => {
    let dataForPost: any = [];
    pagePermissionList.map((eachMod: any) => {
      eachMod.pages.map((eachPage: any) => {
        dataForPost.push({
          PermissionId: eachPage.pagePermissionId,
          PageId: eachPage.pageID,
          AddPermission: eachPage.AddPermission,
          viewPermission: eachPage.viewPermission,
          EditPermission: eachPage.EditPermission,
          DelPermission: eachPage.DelPermission,
        });
      });
    });
    var data = JSON.stringify({
      roleId: RoleToBeSearch,
      pages: dataForPost,
    });

    var config = {
      method: "put",
      url: `${endPoint}api/PutPagePermissionAll`,
      headers: {
        Authorization: `Bearer ${JSON.parse(accessToken).access_token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          notifyAdd();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAllData("e");
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <>
            <div
              className={`container-fluid page-title-bar ${
                showNavMenu == false ? "right_col-margin-remove" : ""
              }   `}
            >
              <span>&nbsp; Role Permission</span>
            </div>

            <div
              className={`right_col  h-10 heightFixForFAult  ${
                showNavMenu == false ? "right_col-margin-remove" : " "
              } `}
              role="main"
            >
              <div className="x_panel px-0">
                <div className="x_title mt-2 ">
                  <div
                    className="col-md-8 col-sm-8   d-flex justify-content-around align-items-center pl-0"
                    style={{ paddingRight: "20%" }}
                  >
                    <div className="field item form-group col-md-12 col-sm-12  ">
                      <label className="col-form-label col-md-3 col-sm-3 label-align">
                        Select Role
                        <span className="required">*</span>
                      </label>
                      <div className="col-md-8 col-sm-8">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          defaultValue={"Active"}
                          value={roleValue}
                          onChange={(value: any) => {
                            setRoleVAlue(value);
                            setRoleToBeSearch(value.value);
                            fetchAllData(value.value);
                          }}
                          isSearchable={true}
                          name="color"
                          options={roleOptions}
                          styles={customStyles}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4  text-right px-0">
                    {RoleToBeSearch === "" ||
                    RoleToBeSearch === null ||
                    RoleToBeSearch === undefined ? (
                      <></>
                    ) : (
                      <button
                        className="btn btn-info btn-sm mb-0 px-3 "
                        onClick={() => {
                          updatePermissions();
                        }}
                      >
                        Update
                      </button>
                    )}
                  </div>

                  <div className="clearfix" />
                </div>
                <div className="x_content  ">
                  {RoleToBeSearch === "" ? (
                    <div className="text-center mt-4">
                      Select Role Before Search
                    </div>
                  ) : (
                    <>
                      <div className="x_panel px-0">
                        <div className="x_content px-0">
                          <div className="table-responsive">
                            <table className="table  jambo_table  ">
                              <thead>
                                <tr className="headings">
                                  <th
                                    className="column-title text-center"
                                    // width="40%"
                                  >
                                    Title
                                  </th>
                                  <th
                                    className="column-title text-center"
                                    // width="12%"
                                  >
                                    View
                                  </th>
                                  <th
                                    className="column-title text-center"
                                    // width="12%"
                                  >
                                    Delete
                                  </th>
                                  <th
                                    className="column-title text-center"
                                    // width="12%"
                                  >
                                    Add
                                  </th>
                                  <th
                                    className="column-title text-center"
                                    // width="12%"
                                  >
                                    Edit
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {pagePermissionList.map(
                                  (item: any, index: any) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <tr className="moduleBgColor">
                                          <td className="py-2">
                                            <div>{item.module_name}</div>
                                          </td>
                                          <td className="text-center">
                                            <input
                                              type="checkbox"
                                              className="flat"
                                              checked={item.pages.every(
                                                (eachpage: any) => {
                                                  return eachpage.viewPermission ===
                                                    "true"
                                                    ? true
                                                    : false;
                                                }
                                              )}
                                              onClick={(e: any) => {
                                                let isChecked: any =
                                                  e.target.checked;
                                                const filteredModules =
                                                  pagePermissionList.filter(
                                                    (eachMod: any) => {
                                                      return (
                                                        eachMod.module_id !==
                                                        item.module_id
                                                      );
                                                    }
                                                  );
                                                const updatedPages =
                                                  item.pages.map(
                                                    (eachPage: any) => {
                                                      return {
                                                        ...eachPage,
                                                        viewPermission:
                                                          isChecked
                                                            ? "true"
                                                            : "false",
                                                      };
                                                    }
                                                  );
                                                const updatedPagePermissionState =
                                                  [
                                                    ...filteredModules,
                                                    {
                                                      ...item,
                                                      pages: updatedPages,
                                                    },
                                                  ];

                                                const updatedFilteredDataSorted: any =
                                                  updatedPagePermissionState.sort(
                                                    (a, b) =>
                                                      a.module_name.localeCompare(
                                                        b.module_name
                                                      )
                                                  );
                                                setpagePermissionList(
                                                  updatedFilteredDataSorted
                                                );
                                              }}
                                            />
                                          </td>
                                          <td className="text-center">
                                            <input
                                              type="checkbox"
                                              className="flat"
                                              checked={item.pages.every(
                                                (eachpage: any) => {
                                                  return eachpage.DelPermission ===
                                                    "true"
                                                    ? true
                                                    : false;
                                                }
                                              )}
                                              onClick={(e: any) => {
                                                let isChecked =
                                                  e.target.checked;
                                                const filteredModules: any =
                                                  pagePermissionList.filter(
                                                    (eachMod: any) => {
                                                      return (
                                                        eachMod.module_id !==
                                                        item.module_id
                                                      );
                                                    }
                                                  );
                                                const updatedPages =
                                                  item.pages.map(
                                                    (eachPage: any) => {
                                                      return {
                                                        ...eachPage,
                                                        DelPermission: isChecked
                                                          ? "true"
                                                          : "false",
                                                      };
                                                    }
                                                  );
                                                const updatedPagePermissionState =
                                                  [
                                                    ...filteredModules,
                                                    {
                                                      ...item,
                                                      pages: updatedPages,
                                                    },
                                                  ];

                                                const updatedFilteredDataSorted: any =
                                                  updatedPagePermissionState.sort(
                                                    (a, b) =>
                                                      a.module_name.localeCompare(
                                                        b.module_name
                                                      )
                                                  );
                                                setpagePermissionList(
                                                  updatedFilteredDataSorted
                                                );
                                              }}
                                            />
                                          </td>
                                          <td className="text-center">
                                            <input
                                              type="checkbox"
                                              className="flat"
                                              checked={item.pages.every(
                                                (eachpage: any) => {
                                                  return eachpage.AddPermission ===
                                                    "true"
                                                    ? true
                                                    : false;
                                                }
                                              )}
                                              onClick={(e: any) => {
                                                let isChecked =
                                                  e.target.checked;
                                                const filteredModules: any =
                                                  pagePermissionList.filter(
                                                    (eachMod: any) => {
                                                      return (
                                                        eachMod.module_id !==
                                                        item.module_id
                                                      );
                                                    }
                                                  );
                                                const updatedPages =
                                                  item.pages.map(
                                                    (eachPage: any) => {
                                                      return {
                                                        ...eachPage,
                                                        AddPermission: isChecked
                                                          ? "true"
                                                          : "false",
                                                      };
                                                    }
                                                  );
                                                const updatedPagePermissionState =
                                                  [
                                                    ...filteredModules,
                                                    {
                                                      ...item,
                                                      pages: updatedPages,
                                                    },
                                                  ];

                                                const updatedFilteredDataSorted: any =
                                                  updatedPagePermissionState.sort(
                                                    (a, b) =>
                                                      a.module_name.localeCompare(
                                                        b.module_name
                                                      )
                                                  );
                                                setpagePermissionList(
                                                  updatedFilteredDataSorted
                                                );
                                              }}
                                            />
                                          </td>
                                          <td className="text-center">
                                            <input
                                              type="checkbox"
                                              className="flat"
                                              checked={item.pages.every(
                                                (eachpage: any) => {
                                                  return eachpage.EditPermission ===
                                                    "true"
                                                    ? true
                                                    : false;
                                                }
                                              )}
                                              onClick={(e: any) => {
                                                let isChecked =
                                                  e.target.checked;
                                                const filteredModules =
                                                  pagePermissionList.filter(
                                                    (eachMod: any) => {
                                                      return (
                                                        eachMod.module_id !==
                                                        item.module_id
                                                      );
                                                    }
                                                  );
                                                const updatedPages =
                                                  item.pages.map(
                                                    (eachPage: any) => {
                                                      return {
                                                        ...eachPage,
                                                        EditPermission:
                                                          isChecked
                                                            ? "true"
                                                            : "false",
                                                      };
                                                    }
                                                  );
                                                const updatedPagePermissionState =
                                                  [
                                                    ...filteredModules,
                                                    {
                                                      ...item,
                                                      pages: updatedPages,
                                                    },
                                                  ];

                                                const updatedFilteredDataSorted: any =
                                                  updatedPagePermissionState.sort(
                                                    (a, b) =>
                                                      a.module_name.localeCompare(
                                                        b.module_name
                                                      )
                                                  );
                                                setpagePermissionList(
                                                  updatedFilteredDataSorted
                                                );
                                              }}
                                            />
                                          </td>
                                        </tr>
                                        {item.pages.map((arr: any) => {
                                          return (
                                            <>
                                              <tr className="even pointer">
                                                <td className=" pl-5 ">
                                                  {arr.pageName}
                                                </td>
                                                <td className=" text-center ">
                                                  <input
                                                    type="checkbox"
                                                    className="flat"
                                                    checked={
                                                      arr.viewPermission ===
                                                      "true"
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={() => {
                                                      const filteredModules =
                                                        pagePermissionList.filter(
                                                          (eachMod: any) => {
                                                            return (
                                                              eachMod.module_id !==
                                                              item.module_id
                                                            );
                                                          }
                                                        );
                                                      const filterPages =
                                                        item.pages.filter(
                                                          (eachPage: any) => {
                                                            return (
                                                              eachPage.page_id !==
                                                              arr.page_id
                                                            );
                                                          }
                                                        );
                                                      const updatedFilteredDataUnsorted =
                                                        [
                                                          ...filteredModules,
                                                          {
                                                            module_name:
                                                              item.module_name,
                                                            module_id:
                                                              item.module_id,
                                                            pages: [
                                                              ...filterPages,
                                                              {
                                                                pageID:
                                                                  arr.pageID,
                                                                page_id:
                                                                  arr.page_id,
                                                                pageName:
                                                                  arr.pageName,
                                                                pagePermissionId:
                                                                  arr.pagePermissionId,
                                                                pageURL:
                                                                  arr.pageURL,
                                                                AddPermission:
                                                                  arr.AddPermission,
                                                                DelPermission:
                                                                  arr.DelPermission,
                                                                EditPermission:
                                                                  arr.EditPermission,
                                                                viewPermission:
                                                                  arr.viewPermission ===
                                                                  "true"
                                                                    ? "false"
                                                                    : "true",
                                                              },
                                                            ].sort((a, b) =>
                                                              a.pageName.localeCompare(
                                                                b.pageName
                                                              )
                                                            ),
                                                          },
                                                        ];
                                                      const updatedFilteredDataSorted: any =
                                                        updatedFilteredDataUnsorted.sort(
                                                          (a, b) =>
                                                            a.module_name.localeCompare(
                                                              b.module_name
                                                            )
                                                        );
                                                      setpagePermissionList(
                                                        updatedFilteredDataSorted
                                                      );
                                                    }}
                                                  />
                                                </td>
                                                <td className=" text-center ">
                                                  <input
                                                    type="checkbox"
                                                    className="flat"
                                                    checked={
                                                      arr.DelPermission ===
                                                      "true"
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={() => {
                                                      const filteredModules =
                                                        pagePermissionList.filter(
                                                          (eachMod: any) => {
                                                            return (
                                                              eachMod.module_id !==
                                                              item.module_id
                                                            );
                                                          }
                                                        );
                                                      const filterPages =
                                                        item.pages.filter(
                                                          (eachPage: any) => {
                                                            return (
                                                              eachPage.page_id !==
                                                              arr.page_id
                                                            );
                                                          }
                                                        );
                                                      const updatedFilteredDataUnsorted =
                                                        [
                                                          ...filteredModules,
                                                          {
                                                            module_name:
                                                              item.module_name,
                                                            module_id:
                                                              item.module_id,
                                                            pages: [
                                                              ...filterPages,
                                                              {
                                                                pageID:
                                                                  arr.pageID,
                                                                page_id:
                                                                  arr.page_id,
                                                                pageName:
                                                                  arr.pageName,
                                                                pagePermissionId:
                                                                  arr.pagePermissionId,
                                                                pageURL:
                                                                  arr.pageURL,
                                                                AddPermission:
                                                                  arr.AddPermission,
                                                                DelPermission:
                                                                  arr.DelPermission ===
                                                                  "true"
                                                                    ? "false"
                                                                    : "true",
                                                                EditPermission:
                                                                  arr.EditPermission,
                                                                viewPermission:
                                                                  arr.viewPermission,
                                                              },
                                                            ].sort((a, b) =>
                                                              a.pageName.localeCompare(
                                                                b.pageName
                                                              )
                                                            ),
                                                          },
                                                        ];
                                                      const updatedFilteredDataSorted: any =
                                                        updatedFilteredDataUnsorted.sort(
                                                          (a, b) =>
                                                            a.module_name.localeCompare(
                                                              b.module_name
                                                            )
                                                        );
                                                      setpagePermissionList(
                                                        updatedFilteredDataSorted
                                                      );
                                                    }}
                                                  />
                                                </td>

                                                <td className=" text-center ">
                                                  <input
                                                    type="checkbox"
                                                    className="flat"
                                                    checked={
                                                      arr.AddPermission ===
                                                      "true"
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={() => {
                                                      const filteredModules =
                                                        pagePermissionList.filter(
                                                          (eachMod: any) => {
                                                            return (
                                                              eachMod.module_id !==
                                                              item.module_id
                                                            );
                                                          }
                                                        );
                                                      const filterPages =
                                                        item.pages.filter(
                                                          (eachPage: any) => {
                                                            return (
                                                              eachPage.page_id !==
                                                              arr.page_id
                                                            );
                                                          }
                                                        );
                                                      const updatedFilteredDataUnsorted =
                                                        [
                                                          ...filteredModules,
                                                          {
                                                            module_name:
                                                              item.module_name,
                                                            module_id:
                                                              item.module_id,
                                                            pages: [
                                                              ...filterPages,
                                                              {
                                                                pageID:
                                                                  arr.pageID,
                                                                page_id:
                                                                  arr.page_id,
                                                                pageName:
                                                                  arr.pageName,
                                                                pagePermissionId:
                                                                  arr.pagePermissionId,
                                                                pageURL:
                                                                  arr.pageURL,
                                                                AddPermission:
                                                                  arr.AddPermission ===
                                                                  "true"
                                                                    ? "false"
                                                                    : "true",
                                                                DelPermission:
                                                                  arr.DelPermission,
                                                                EditPermission:
                                                                  arr.EditPermission,
                                                                viewPermission:
                                                                  arr.viewPermission,
                                                              },
                                                            ].sort((a, b) =>
                                                              a.pageName.localeCompare(
                                                                b.pageName
                                                              )
                                                            ),
                                                          },
                                                        ];
                                                      const updatedFilteredDataSorted: any =
                                                        updatedFilteredDataUnsorted.sort(
                                                          (a, b) =>
                                                            a.module_name.localeCompare(
                                                              b.module_name
                                                            )
                                                        );
                                                      setpagePermissionList(
                                                        updatedFilteredDataSorted
                                                      );
                                                    }}
                                                  />
                                                </td>
                                                <td className=" text-center ">
                                                  <input
                                                    type="checkbox"
                                                    className="flat"
                                                    checked={
                                                      arr.EditPermission ===
                                                      "true"
                                                        ? true
                                                        : false
                                                    }
                                                    onChange={() => {
                                                      const filteredModules =
                                                        pagePermissionList.filter(
                                                          (eachMod: any) => {
                                                            return (
                                                              eachMod.module_id !==
                                                              item.module_id
                                                            );
                                                          }
                                                        );
                                                      const filterPages =
                                                        item.pages.filter(
                                                          (eachPage: any) => {
                                                            return (
                                                              eachPage.page_id !==
                                                              arr.page_id
                                                            );
                                                          }
                                                        );
                                                      const updatedFilteredDataUnsorted =
                                                        [
                                                          ...filteredModules,
                                                          {
                                                            module_name:
                                                              item.module_name,
                                                            module_id:
                                                              item.module_id,
                                                            pages: [
                                                              ...filterPages,
                                                              {
                                                                pageID:
                                                                  arr.pageID,
                                                                page_id:
                                                                  arr.page_id,
                                                                pageName:
                                                                  arr.pageName,
                                                                pagePermissionId:
                                                                  arr.pagePermissionId,
                                                                pageURL:
                                                                  arr.pageURL,
                                                                AddPermission:
                                                                  arr.AddPermission,
                                                                DelPermission:
                                                                  arr.DelPermission,
                                                                EditPermission:
                                                                  arr.EditPermission ===
                                                                  "true"
                                                                    ? "false"
                                                                    : "true",
                                                                viewPermission:
                                                                  arr.viewPermission,
                                                              },
                                                            ].sort((a, b) =>
                                                              a.pageName.localeCompare(
                                                                b.pageName
                                                              )
                                                            ),
                                                          },
                                                        ];
                                                      const updatedFilteredDataSorted: any =
                                                        updatedFilteredDataUnsorted.sort(
                                                          (a, b) =>
                                                            a.module_name.localeCompare(
                                                              b.module_name
                                                            )
                                                        );
                                                      setpagePermissionList(
                                                        updatedFilteredDataSorted
                                                      );
                                                    }}
                                                  />
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        })}
                                      </React.Fragment>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>

                            {/* <button className="btn btn-sm btn-primary" onClick={()=>{console.log(pagePermissionList)}}> Console</button> */}
                          </div>
                          <div
                            className="col-md-8 col-sm-8   d-flex justify-content-around align-items-center pl-0"
                            style={{ paddingRight: "40%" }}
                          ></div>
                          <div className="col-md-4  text-right px-0">
                            <button
                              className="btn btn-info btn-sm mb-0 px-3 "
                              onClick={() => {
                                updatePermissions();
                              }}
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>

          <div
            className={`right_col  h-100  ${
              showNavMenu === false ? "footer-margin-remove" : " "
            } `}
            role="main"
          >
            {/* Model  */}
          </div>
        </>
      )}
    </>
  );
};

export default RolePermission;
