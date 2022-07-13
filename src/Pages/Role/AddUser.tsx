import PageTemplate from "../../Components/PageTemplate";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AddUser: React.FC<any> = ({ pagePermission }) => {
  const accessToken: any = localStorage.getItem("access_token");
  const rolePermissionTable = {
    Add: pagePermission.AddPermission,
    Delete: pagePermission.DelPermission,
    Edit: pagePermission.EditPermission,
  };
  const URL = localStorage.getItem("authUser");
  const [isLoading, setIsLoading] = useState<any>(true);
  const [updateMode, setUpdateMode] = useState<any>(false);
  const [listingData, setListingData] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<any>({
    user_id: 0,
    user_name: "",
    user_email: "",
    user_password: "",
    user_role: "",
    user_role_id: 0,
    user_role_name: "",
  });

  const [formFields, setFormFields] = useState<any>([
    {
      label: "User Name",
      name: "user_name",
      type: "text",
      placeholder: "Enter Role Name",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Email",
      name: "user_email",
      type: "text",
      placeholder: "Enter Email",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Password",
      name: "user_password",
      type: "text",
      placeholder: "Enter Password (8 characters strong Password)",
      required: true,
      disabled: false,
      hidden: false,
    },
    {
      label: "Select Role",
      name: "user_role",
      type: "select",
      placeholder: "",
      required: true,
      disabled: false,
      hidden: false,
    },
  ]);

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    user_name: Yup.string().required("Select Bank Name First"),
    user_email: Yup.string().required("Select Bank Name First"),
    user_password: Yup.string().required("Select Bank Name First"),
    user_role: Yup.string().required("Select Branch First"),
  });

  useEffect(() => {
    fetchCityNames();
    fetchData();
  }, []);

  const clearFields = () => {
    let arrFields = formFields;
    arrFields.forEach((element: any) => {
      element.disabled = false;
    });
    arrFields[1].defaultValue = { label: "--- Select City ---", value: "" };
    setInitialValues({
      bank_id: 0,
      bank_name: "",
      branch_city: 0,
    });
    setUpdateMode(false);
  };

  const changeFieldValue = (field: any, value: any) => {
    var obj = initialValues;
    if (field === "bank_name") {
      obj.bank_name = value;
    } else if (field === "branch_city") {
      obj.branch_city = value;
    }

    setInitialValues(obj);
  };

  const fetchData = () => {
    fetch(URL + "api/Users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(accessToken).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var theadData = [
          {
            heading: "SR #",
            className: "",
            style: {},
          },
          {
            heading: "User Name",
            className: "",
            style: {},
          },
          {
            heading: "Email",
            className: "",
            style: {},
          },
          {
            heading: "Role",
            className: "",
            style: {},
          },
          {
            heading: "Actions",
            className: "text-right",
            style: {},
          },
        ];

        var tbodyData: any = [];
        json.map((value: any, index: any) => {
          tbodyData.push([
            {
              name: "sr_no",
              value: index + 1,
              className: "",
              style: {},
            },
            {
              name: "user_name",
              value: value.userName,
              className: "",
              style: {},
            },
            {
              name: "user_email",
              value: value.email,
              className: "",
              style: {},
            },
            {
              name: "user_role",
              value: value.roleName,
              className: "",
              style: {},
            },
            {
              name: "actions",
              value: "",
              icons: [
                {
                  type: "edit",
                  clickFunction: fetchDataForEdit,
                },
                {
                  type: "delete",
                  clickFunction: deleteBankName,
                },
              ],
              className: "text-right",
              style: {
                width: "20%",
              },
              entity_id: value.id,
            },
          ]);
        });

        setListingData([
          {
            title: "Listing",
            icon: "fa fa-list",
            theadData,
            tbodyData,
          },
        ]);

        setIsLoading(false);
      });
  };
  const fetchCityNames = () => {
    fetch(URL + "api/Roles", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + JSON.parse(accessToken).access_token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        var arr = [];
        arr.push({ label: "--- Select Role ---", value: "" });
        json.map((item: any) => {
          arr.push({ label: item.Name, value: item.Id });
        });

        var arrFields = formFields;
        arrFields[3].defaultValue = arr[0];
        arrFields[3].options = arr;
        setFormFields(arrFields);
        console.log(arr, "rolllllllllllll");
      });
  };
  const fetchDataForEdit = (UserId: any) => {
    setUpdateMode(false);
    // fetch(URL + "api/BankNames/GetDataById?id=" + bank_id, {
    //   method: "GET",
    //   headers: {
    //     Authorization: "Bearer " + JSON.parse(accessToken).access_token,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     if (json.bank_name === null) {
    //       json.bank_name = "";
    //     }

    //     console.log("get data by id data", json);
    //     let arrFields = formFields;
    //     arrFields.forEach((element: any) => {
    //       element.disabled = false;
    //     });
    //     arrFields[1].defaultValue = {
    //       label: json.branch_city_name,
    //       value: json.branch_city_id,
    //     };
    //     let obj = initialValues;
    //     obj.bank_id = json.bank_id;
    //     obj.bank_name = json.bank_name;
    //     obj.branch_city = json.branch_city;
    //     setFormFields(arrFields);

    //     setInitialValues(obj);
    //     setUpdateMode(true);
    //   });
  };
  const formSubmit = (data: any) => {
    console.log(data, "data");

    fetch(
      URL +
        (updateMode
          ? "api/BankNames/PutData?id=" + initialValues.bank_id
          : "api/Users"),
      {
        method: updateMode ? "PUT" : "POST",
        headers: {
          Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.user_name,
          password: data.user_password,
          email: data.user_email,
        }),
      }
    ).then((response) => {
      response.json().then((json) => {
        console.log(json.Id);

        // calling another api to set role against this user id
        const requestOptionsForRole = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserId: json.Id,
            RoleId: data.user_role,
          }),
        };
        fetch(URL + "/api/UserRoles", requestOptionsForRole)
          .then((response) => {
            if (response.status === 200) {
              toast.success(
                "User has been " +
                  (updateMode ? "Updated" : "Added" + " successfully!")
              );
              clearFields();
              fetchCityNames();
              fetchData();
            } else {
              toast.error(json.Message);
            }
            response.json();
          })

          .catch((err) => {
            console.log("err", err);
          });
      });
      //   }
    });
  };

  const deleteBankName = (bank_id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this city name!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(URL + "api/BankNames/DeleteData?id=" + bank_id, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + JSON.parse(accessToken).access_token,
          },
        }).then((response) => {
          if (response.status === 200) {
            toast.success("City Name has been Deleted successfully!");
            fetchData();
            clearFields();
          } else {
            response.json().then((json) => {
              toast.error(json.Message);
            });
          }
        });
      }
    });
  };

  return (
    <PageTemplate
      pagePermission={rolePermissionTable}
      moduleName="Manage User"
      formTitle="Add/Edit User Name"
      formFields={formFields}
      initialValues={initialValues}
      DisplayingErrorMessagesSchema={DisplayingErrorMessagesSchema}
      updateMode={updateMode}
      formSubmit={formSubmit}
      listing={listingData}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      fetchData={fetchData}
      clearFields={clearFields}
      changeFieldValue={changeFieldValue}
      showButtons={true}
    />
  );
};

export default AddUser;
