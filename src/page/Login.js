import React, {useState, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Form, FormControl, Button, Container, Row } from 'react-bootstrap'
import { useHistory, useLocation } from "react-router-dom";
import store from '../store'


export default function Login() {
    let history = useHistory();
    const dispatch = useDispatch();
    let user = useSelector((state) => state.user);


    let [userEmail, setUserEmail] = useState()//update data immediately

    const passwordRef = useRef(null)

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value)
    }

    const login = (e) => {
        e.preventDefault();
        let user = { email: userEmail, password: passwordRef.current.value };
        dispatch({ type: "LOGIN", payload: user });
        history.push("/");
    };


    return (
        <Container>
            <h1>{user.email}</h1>
            <Row>
                <div className="col-md-12">
                    <h1>Login page</h1>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                           
                        </Form.Group>
        
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                        </Form.Group>
        
                        <Button variant="primary" onClick={login}>
                            Submit
                         </Button>
                    </Form>
        
                </div>
            </Row>
        </Container>
    )
}
