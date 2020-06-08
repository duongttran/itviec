import React, { useEffect, useState } from 'react'
//import { useParams } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';

import Moment from 'react-moment';

import {Link} from 'react-router-dom'



export default function Job() {

    let [result, setResult] = useState(null)

    const getDetailData = async () => {
        let url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/jobs/`
        let data = await fetch(url)
        let result = await data.json()
        console.log("this is result", result);
        setResult(result)

    }

    useEffect(() => {
        getDetailData()

    }, [])

    if (result === null) {
        return <div>loading</div>
    }

    return (
        <div>
            <h1>{result.length} IT jobs in Vietnam for you</h1>

            <div>
                {result.map((item, idx) => {
                    return (
                        <div>
                            <div className="left-side">
                                <h2><Link to={`jobs/${idx}`}>{item.title}</Link></h2>
                                <p>$ {item.salary}</p>
                                <ul>
                                    {item.benefits.map(one => {
                                        return (<li>{one}</li>)
                                    })}
                                </ul>
                                {item.tags.map(pill => {
                                    return <span className="job-tag">{pill}</span>
                                })}
                            </div>

                            <div className="right-side">
                               {item.isHotjob? <span className="hot-job">Hot job</span> : <></>}
                                <p>Location: {item.city}</p>

                                <p>District: {item.district}</p>
                                <p><Moment fromNow>{item.time}</Moment></p>
                            </div>



                        </div>
                    )
                })}


            </div>
        </div>
    )
}
