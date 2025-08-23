import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useContext } from 'react'
import Badge from 'react-bootstrap/Badge'
import { CartContext} from '../context/CartContext'
import { Collapse } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'

function NavBar() {
    const { cartCount } = useContext(CartContext)

    const handleNavClick = () => {
    const navbarCollapse = document.getElementById('basic-navbar-nav');
    const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse, { toggle: false });
    bsCollapse.hide();
    };


    return(
        <Navbar bg='info' variant='dark' expand='lg' className='p-3 mb-4 sticky-top'>
            <Container fluid className='d-flex align-items-center justify-content-between'>
                <Navbar.Brand href='/' style={{ fontFamily:'impact'}}>Click & Carry</Navbar.Brand>
                <Nav className='d-none d-lg-flex align-items-center ms-auto'>
                    <Nav.Link as={NavLink} to='/cart' activeclassname='active' onClick={handleNavClick}>
                        🛒{''}
                        {cartCount > 0 && (
                            <Badge pill bg='success' className='ms-1'>
                                {cartCount}
                            </Badge>
                        )}
                    </Nav.Link>
                </Nav>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
            </Container>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                    <Nav.Link as ={NavLink} to='/' activeclassname ='active' onClick={handleNavClick}>
                    Home 
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/products' activeclassname='active' onClick={handleNavClick}>
                    Products
                    </Nav.Link>
                    <NavDropdown title='Add Products' id='basic-nav-dropdown'>
                        <NavDropdown.Item as={NavLink} to='/add-product-form' onClick={handleNavClick}>Add-Product Form</NavDropdown.Item>
                    </NavDropdown>
                    <Nav className='d-lg-none'>
                        <Nav.Link as={NavLink} to='/cart' activeclassname='active' onClick={handleNavClick}>
                        🛒{' '}
                        {cartCount > 0 && (
                            <Badge pill bg='success' className='ms-1'>
                            {cartCount}
                            </Badge>
                        )}
                        </Nav.Link>
                    </Nav>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar