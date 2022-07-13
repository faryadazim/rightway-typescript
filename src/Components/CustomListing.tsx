import React from "react";
import {
    MySimpleSelect,
} from "./CustomFields";
const  CustomListing:React.FC<any> = (props) =>{
    return (
        <div className="x_panel">
            <div className="x_content">
                <span className="section">
                    <div className="row">
                        <div className="col-9">
                            <i className={props.listing.icon}></i>&nbsp;{props.listing.title}
                        </div>
                        {
                            (props.listing.filters !== null && props.listing.filters !== undefined) &&
                            props.listing.filters.length !== 0 &&
                            props.listing.filters.map((value:any, index:any) => {
                                return (
                                    <div key={index} className="col-3" style={{ fontSize: "12px" }}>
                                        <MySimpleSelect
                                            label={value.label}
                                            name={value.name}
                                            defaultValue={value.defaultValue}
                                            options={value.options}
                                            changeFilterFieldValue={value.changeFilterFieldValue}
                                            totalListing={props.totalListing}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </span>

                <div className="table-responsive">
                    <table className="table table-striped jambo_table bulk_action">
                        <thead>
                            <tr className="headings">
                                {props.listing.theadData.map((value:any, index:any) => {
                                    return (
                                        <th key={index} className={value.className} style={value.style}>{value.heading}</th>
                                    );
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {props.listing.tbodyData.length === 0 ?
                                <tr><td colSpan={props.listing.theadData.length} className="text-center">No Record Found</td></tr>
                                :
                                props.listing.tbodyData.map((value:any, index:any) => {
                                    return (
                                        <tr key={index}>
                                            {value.map((tdValue:any)=> {
                                                return (
                                                    <td key={tdValue.name} className={tdValue.className} style={tdValue.style}>{
                                                        (tdValue.icons !== undefined && tdValue.icons.length !== 0) &&
                                                        tdValue.icons.map((icons:any, index1:any) => {
                                                            return tdValue.name === "actions" &&
                                                                icons.type === "edit" ?
                                                                props.pagePermission.Edit === "true" &&
                                                                <i
                                                                    key={index1}
                                                                    className="fa fa-edit"
                                                                    onClick={() =>
                                                                        icons.clickFunction(tdValue.entity_id)
                                                                    }
                                                                ></i>
                                                                :
                                                                props.pagePermission.Delete === "true" &&
                                                                <i
                                                                    // Delete
                                                                    key={index1}
                                                                    className="fa fa-trash-o ml-1"
                                                                    onClick={() =>
                                                                        icons.clickFunction(tdValue.entity_id)
                                                                    }
                                                                ></i>
                                                        })
                                                    } {tdValue.value}</td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CustomListing;