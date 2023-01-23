import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom'
import { signout } from '../../actions';

export default function Header() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(signout());
    }
    const renderLoggedInLinks = () => {
        return (<Nav>
            <li className="nav-item">
                <span className="nav-link" onClick={logout}>Signout</span>
            </li>
        </Nav>)
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
            </Nav>
        );
    }

    return (
        <Navbar fixed='top' style={{ zIndex: 1 }} collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Link to="/" className='navbar-brand'>Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
