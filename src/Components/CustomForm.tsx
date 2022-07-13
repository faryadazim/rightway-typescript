import { Formik, Form } from "formik";
import React from "react";
import {
  MyTextInput,
  MySelect,
  MyTextArea,
  MyFileUpload,
} from "./CustomFields";

const CustomForm:React.FC<any>=(props)=> {
  return (
    <div className="x_panel">
      <Formik
        initialValues={props.initialValues}
        validationSchema={props.DisplayingErrorMessagesSchema}
        enableReinitialize={true}
        onSubmit={(data, { resetForm }) => {
          props.formSubmit(data);
         //resetForm({ data: "" });
         resetForm()
        }}
      >
        {({ errors, setFieldValue }) => {
          return (
            <Form>
              <div className="x_content">
                <span className="section">
                  <i className="fa fa-edit"></i>&nbsp;{props.formTitle}
                </span>
                <div className="row">
                  {props.formFields.map((data:any, index:any) => {
                    if (data.type === "select") {
                      if (Object.keys(errors).length !== 0) {
                        errors.name = data.name;
                      }
                      return (
                        <MySelect
                          key={index}
                          label={data.label}
                          name={data.name}
                          defaultValue={data.defaultValue}
                          options={data.options}
                          changeFieldValue={props.changeFieldValue}
                          setFieldValue={setFieldValue}
                          required={data.required}
                          isDisabled={data.disabled}
                          isHidden={data.hidden}
                        />
                      );
                    } else if (data.type === "textarea") {
                      return (
                        <MyTextArea
                          key={index}
                          label={data.label}
                          name={data.name}
                          rows={data.rows}
                          placeholder={data.placeholder}
                          changeFieldValue={props.changeFieldValue}
                          setFieldValue={setFieldValue}
                          required={data.required}
                          disabled={data.disabled}
                          hidden={data.hidden}
                        />
                      );
                    } else if (data.type === "file") {
                      var objFile = {};
                      props.files.forEach((element:any) => {
                        if (element.name === data.name) {
                          objFile = element;
                          return false;
                        }
                      });
                      return (
                        <MyFileUpload
                          key={index}
                          label={data.label}
                          name={data.name}
                          objFile={objFile}
                          changeFieldValue={props.changeFieldValue}
                          setFieldValue={setFieldValue}
                          required={data.required}
                          disabled={data.disabled}
                          hidden={data.hidden}
                        />
                      );
                    } else {
                      return (
                        <MyTextInput
                          key={index}
                          label={data.label}
                          name={data.name}
                          type={data.type}
                          placeholder={data.placeholder}
                          changeFieldValue={props.changeFieldValue}
                          setFieldValue={setFieldValue}
                          required={data.required}
                          disabled={data.disabled}
                          hidden={data.hidden}
                        />
                      );
                    }
                  })}
                </div>
              </div>

              <div className="col-md-12 text-right x_footer">
                {props.showButtons && (
                  <>
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={() => {
                        console.log("pressed");
                        
                        props.clearFields()}}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-primary" type="submit">
                      {props.updateMode ? "Update" : "Submit"}
                    </button>
                  </>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
export default CustomForm;
