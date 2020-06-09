import React, { useEffect, useState } from 'react'
//import { useParams } from "react-router-dom";

import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Moment from 'react-moment';

import { Link } from 'react-router-dom'
import './Jobs.css'


export default function Job() {

    let [result, setResult] = useState(null)

    const getDetailData = async () => {
        let url = `https://my-json-server.typicode.com/duongttran/itviec/jobs/`
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
        <Container>
            <Row>


                <div className="col-md-12">
                    <h1 className="text-center">{result.length} IT jobs in Vietnam for you</h1>

                    {result.map((item, idx) => {
                        return (
                            <div className="job-item">

                                <div className="col-md-9">
                                    <div className="left-side">
                                        <h2><Link to={`jobs/${idx}`}>{item.title}</Link></h2>
                                        <h4>{item.salary}</h4>
                                        <ul>
                                            {item.benefits.map(one => {
                                                return (<li>{one}</li>)
                                            })}
                                        </ul>
                                        <div>
                                            {item.tags.map(pill => {
                                                return <span className="job-tag">{pill}</span>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="right-side">
                                        <p> {item.isHotjob ? <span className="hot-job">Hot job</span> : <></>}</p>
                                        <p>Location: {item.city}</p>
    
                                        <p>District: {item.district}</p>
                                        <p><Moment fromNow>{item.time}</Moment></p>
                                    </div>
                                </div>

                            </div>
                        )
                    })}


                </div>
            </Row>
        </Container>
    )
}
