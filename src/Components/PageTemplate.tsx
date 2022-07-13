import Loader from "../Layout/Loader/Loader";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomForm from './CustomForm';
import FilterForm from './FilterForm';
import CustomListing from './CustomListing';
import { State } from "../store/reducers";

const  PageTemplate : React.FC<any>=(props)=> {
    // Nav Toggle State
    const showNavMenu = useSelector((state:State) => state.NavState);
    const [displayUserRegBox, setdisplayUserRegBox] = useState(true);
    return (
        <>
            {props.isLoading ?
                <Loader />
                :
                <>
                    <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                        }   `}>
                        <span>&nbsp;{props.moduleName}</span>
                    </div>
                    <div
                        className={`right_col  h-100 ${showNavMenu == false ? "right_col-margin-remove" : "lorem "
                            }   `}
                        role="main"
                    >
                        {displayUserRegBox && props.pagePermission.Add === "true" &&
                            <CustomForm
                                formTitle={props.formTitle}
                                formFields={props.formFields}
                                initialValues={props.initialValues}
                                files={props.files}
                                DisplayingErrorMessagesSchema={props.DisplayingErrorMessagesSchema}
                                updateMode={props.updateMode}
                                formSubmit={props.formSubmit}
                                fetchData={props.fetchData}
                                clearFields={props.clearFields}
                                showButtons={props.showButtons}
                                changeFieldValue={props.changeFieldValue} />
                        }
                        {props.addFilters &&
                            <FilterForm
                                filterFields={props.filterFields}
                                filterFormSubmit={props.filterFormSubmit}
                                clearFilterFields={props.clearFilterFields}
                                showFilterButtons={props.showFilterButtons}
                                changeFilterFieldValue={props.changeFilterFieldValue} />
                        }
                        {
                            props.listing.map((value:any, index:any) => {
                                return (<CustomListing key={index} listing={value} totalListing={props.listing} pagePermission={props.pagePermission} />)
                            })
                        }

                    </div>
                </>
            }
        </>
    );
}
export default PageTemplate;