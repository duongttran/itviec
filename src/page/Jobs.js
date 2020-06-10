import React, { useEffect, useState } from 'react'
//import { useParams } from "react-router-dom";

import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Moment from 'react-moment';

import { Link } from 'react-router-dom'
import './Jobs.css'

import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { useHistory, useLocation } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'



const QUERYSTR_PREFIX = "q";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// let originalList = []

export default function Job() {
    let query = useQuery();
    query.get(QUERYSTR_PREFIX)
    let dispatch = useDispatch();
    let history = useHistory();
    let [result, setResult] = useState([])
    let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX))
    let [originalList, setOriginalList] = useState(null)

    let user = useSelector((state) => state.user);
    //let tempArray = []

    const getDetailData = async () => {
        let url = `https://my-json-server.typicode.com/duongttran/itviec/jobs/`
        let data = await fetch(url)
        let result = await data.json()
        console.log("this is result", result);
        setResult(result) // show the data
        setOriginalList(result) // keep the original list

        console.log("what is the query value?", query.get(QUERYSTR_PREFIX))
        console.log("what is the keyword", keyword)
        //tempArray = result

        searchByKeyword();
    }
    console.log(result, "hbdhfvhsdfhsdfvdhs")

    const logout = (e) => {
        dispatch({ type: "LOGOUT" });
        history.push(`/login`)
    }
    const searchByKeyword = (e) => {

        if (e) {
            e.preventDefault() // block to refresh the page
            alert(`jobs?${QUERYSTR_PREFIX}=${keyword}`);
            history.push(`jobs?${QUERYSTR_PREFIX}=${keyword}`)
        }


        let filterList = originalList// this is first time when we load the page

        if (keyword && keyword.length > 0) {
            console.log("keyword", keyword)
            filterList = originalList.filter(item => item.title.toLowerCase().includes(keyword))
            setResult(filterList)
        } else {
            if (originalList != null)
                setResult(originalList)
        }

    }

    useEffect(() => {
        getDetailData()

    }, [])


    return (
        <>
            {
                result ? <Container>
                    <Row>

                        <div className="col-md-12">
                            <Navbar bg="light" expand="lg">
                                <Navbar.Brand href="#home">Nhieu IT Viec</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        {/* <Nav.Link href="#home">Home</Nav.Link>
                                        <Nav.Link href="#link">Link</Nav.Link> */}
                                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                        </NavDropdown> */}
                                    </Nav>
                                    <Form inline onSubmit={(e) => searchByKeyword(e)}>
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setKeyword(e.target.value)} />
                                        <Button variant="outline-success" type="submit">Search</Button>
                                        <Button variant="outline-success" className="logout" onClick={()=> logout()}>Logout</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                            <h1>Hello, {user.email}</h1>
                            <h1 className="text-center">{result.length} IT jobs in Vietnam for you</h1>

                            {result.map((item, idx) => {
                                return (
                                    <div className="job-item">

                                        <div className="col-md-9">
                                            <div className="left-side"><img src={item.img}></img>
                                                <h2><Link to={`jobs/${idx}`}>{item.title}</Link></h2>
                                                <h4><i class="fas fa-money-bill-wave"></i> {item.salary}</h4>
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
                </Container> : <h1>Loading...</h1>
            }
        </>

    )
}

