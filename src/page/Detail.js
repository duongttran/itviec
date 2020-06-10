import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './Detail.css'


import { Container, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Moment from 'react-moment';
import { useHistory, useLocation } from "react-router-dom";

export default function Detail() {
    const { id } = useParams();
    let history = useHistory();
    let [result, setResult] = useState(null)

    const getDetailData = async () => {
        let url = `https://my-json-server.typicode.com/duongttran/itviec/jobs/${id}`
        let data = await fetch(url)
        let result = await data.json()
        console.log("this is result", result);
        setResult(result)

    }

    const returnJobs = () => {
        history.push(`/jobs`)
    }

    const applyJob = () => {
        alert("Thanks for applying for this job! We'll contact you soon!")
        history.push(`/jobs`)
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
                <div>
                    {/* <h1>This is detail</h1>
                    <h2>Your ID is {id}</h2> */}
                    <img src={result.img}></img>
                    <h3>{result.title}</h3>
                    {result.tags.map(item => {
                        return <span className="job-tag">{item}</span>
                    })}
                    
                    
                    
                    <p>Salary: {result.salary}</p>
                    <p>Location: {result.city} District {result.district}</p>
                    <p>Posted on: <Moment fromNow>{result.time}</Moment></p>
        
                    <h3>Benefits</h3>
                    <ul>
                        {result.benefits.map(item => {
                            return (<li>{item}</li>)
                        })}
                    </ul>
                    <h3>Description</h3>
                    <p>{result.description}</p>
                    <Button variant="danger" onClick={()=> applyJob()}>Apply</Button>
                    <Button variant="danger" onClick={()=> returnJobs()}>Return to Job Board</Button>
                </div>
            </Row>
        </Container>
    )
}
