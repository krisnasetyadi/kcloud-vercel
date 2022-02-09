import React from "react";
import {Navbar,Container} from 'react-bootstrap'
import '../styles/navbar.css'

function NavBarr(){
    
    return(
    <div>   
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">K-Cloud</Navbar.Brand>
        </Container>
    </Navbar>
    </div>
    )
}
export default NavBarr