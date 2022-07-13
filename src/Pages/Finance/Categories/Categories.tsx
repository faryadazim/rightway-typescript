import React, { useState, useEffect } from 'react'
import Loader from '../../../Layout/Loader/Loader'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Tree from './Tree/Tree'
import './Categories.css'
import { State } from '../../../store/reducers'

const Categories:React.FC<any>= ({ pagePermission }) => {
    const rolePermissionTable = {
        Add: pagePermission.AddPermission,
        Delete: pagePermission.DelPermission,
        Edit: pagePermission.EditPermission,
    }
    
  const accessToken: any = localStorage.getItem("access_token");
    const [isLoading, setIsLoading] = useState(true)
    const showNavMenu = useSelector((state:State) => state.NavState);
    const [coreData, setCoreData] = useState([])
    const fetchApi = () => {
        var config = {
            method: 'get',
            url: 'http://rightway-api.genial365.com/api/ChartOfAccounts/GetChartOfAccounts',
            headers: {
                'Authorization': `Bearer ${JSON.parse(accessToken).access_token}`,
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200) {
                    setCoreData(response.data)
                    setIsLoading(false)

                } else {
                    console.log(response.status, "Err");
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    useEffect(() => {
        fetchApi()
    }, [])



    return (
        <>
            {isLoading ?
                <Loader />
                :
                <> <div className={`container-fluid page-title-bar ${showNavMenu == false ? "right_col-margin-remove" : ""
                    }   `}>
                    <span>&nbsp;Categories</span>
                </div>
                    <div
                        className={`right_col  h-100 ${showNavMenu == false ? "right_col-margin-remove" : "lorem "}   `} role="main"    >
                        <div className="row">
                            <div className="col-md-6  ">
                                <div className="x_panel">
                                    <div className="x_content">
                                        <span className="section">
                                            <div className="row">
                                                <div className="col-9">
                                                    <i className="fa fa-sitemap"></i>&nbsp;Account Tree
                                                </div>
                                            </div>
                                        </span>
                                        <Tree data={coreData} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6  ">
                                <div className="x_panel">
                                    <div className="x_content">
                                        <span className="section">
                                            <div className="row">
                                                <div className="col-9">
                                                    <i className="fa fa-plus icon"></i>&nbsp;Account Detail
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Categories