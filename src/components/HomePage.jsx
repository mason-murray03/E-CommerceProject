import { Container, Carousel, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import mensClothing from '../assets/mens-clothing.png'
import womensClothing from '../assets/womens-clothing.png'
import electronics from '../assets/electronics.png'

function HomePage() {

    const navigate = useNavigate()

    const handleClick = (category) => {
        navigate(`/products/${category}`)
    }
    

    return (
        <Container className='bg-light ' style={{textAlign:'center'}}>
            <Row>
                <Col>
                    <h1>Welcome to Click & Carry🛍️</h1>
                    <h5 style={{ color: 'gray' }}>Where style meets simplicity and everything is just a click away.</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p style={{ color: '#adb5bd'}}>Whether you're browsing for the perfect gift, upgrading your everyday ossentials, or just window-shopping with flair, you,ve landed in the right place.
                       Our curated collection of products is designed to delight, with intuitive navigation, clean design, and a seamless shopping experience from start to checkout.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p style={{ color: '#adb5bd'}}>Explore categories, discover featured items, and enjoy a site built with care, crafted by a developer who belives great code should feel as smooth as a great design.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 style={{ marginLeft:'20px', marginBottom:'16px'}}>Categories</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img src={mensClothing} alt="Men's clothing" style={{ marginLeft:'20px', width:'100%', maxWidth: '146px', marginRight: '20px', marginBottom:'10px'}}/>
                    <img src={womensClothing} alt="Women's clothing" style={{ width:'100%', maxWidth: '146px', marginRight: '20px', marginBottom: '10px'}}/>
                    <img src={electronics} alt="Electronics" style={{ width:'100%', maxWidth:'146px', marginBottom: '10px'}}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button style={{ marginLeft:'20px', marginRight: '20px', paddingLeft:'18px', paddingRight:'18px' }}onClick={() => handleClick("men's clothing")}>Men's Clothing</button>
                    <button style={{ marginRight: '20px' }} onClick={() => handleClick("women's clothing")}>Women's Clothing</button>
                    <button style={{ marginBottom:'20px', paddingLeft:'33px', paddingRight:'33px' }} onClick={() => handleClick('electronics')}>Electronics</button>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage