import React, { useEffect, useState } from 'react'
//import { useParams } from "react-router-dom";

import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Moment from 'react-moment';

import { Link } from 'react-router-dom'
import './Jobs.css'

import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

export default function Job() {

    let [result, setResult] = useState(null)
    let [keyword, setKeyword] = useState(null)
    let [originalList, setOriginalList] = useState(null)

    const getDetailData = async () => {
        let url = `https://my-json-server.typicode.com/duongttran/itviec/jobs/`
        let data = await fetch(url)
        let result = await data.json()
        console.log("this is result", result);
        setOriginalList(result) // keep the original list
        setResult(result) // show the data
    }

    const searchByKeyword = (e) => {
        e.preventDefault() // block to refresh the page
        let filterList = originalList

        if (keyword) {
            console.log("keyword", keyword)
            filterList = originalList.filter(item => item.title.toLowerCase().includes(keyword))
        }
        setResult(filterList)
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
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form inline onSubmit={(e) => searchByKeyword(e)}>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setKeyword(e.target.value)} />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                    {/* <h1 className="text-center">{result.length} IT jobs in Vietnam for you</h1> */}

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
