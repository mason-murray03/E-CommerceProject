import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductListingPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { category } = useParams()

    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const categoryMap = {
                    mens: "men's clothing",
                    womens: "women's clothing",
                    electronics: "electronics"
                }

                const apiCategory = categoryMap[category] || category
                const url = category
                    ? `https://fakestoreapi.com/products/category/${encodeURIComponent(apiCategory)}`
                    : `https://fakestoreapi.com/products`

                const response = await axios.get(url)
                
                setProducts(response.data)
            } catch (error) {
                setError(`Error fetching products: ${error?.message || 'Unknown'}`)
            } finally {
                setLoading(false)
            }
        }
            fetchProducts()
    }, [category])

    if(loading) return <p>Loading products...</p>

    return (
        <Container>
            <h2>{category ? category.replace('-', ' ') : 'All Products'}</h2>
            <Row>
                {products.map(product => (
                    <Col key={product.id} className='mt-4'>
                        <Card className='h-100'>
                            <Card.Img 
                                variant='top'
                                src={product.image}
                                alt={product.title}
                                style={{ objectFit: 'contain', height:'200px', padding:'6px' }}
                            />
                            <Card.Body style={{ textAlign:'center' }}className='d-flex flex-column justify-content-between'>
                                <Card.Title style={{ fontSize:'14px' }}>{product.title}</Card.Title>
                                <Card.Text style={{ fontSize:'16px'}}>${product.price.toFixed(2)}</Card.Text>
                                <div className='d-flex justify-content-center gap-2 mt-auto'>
                                    <Link to={`/product/${product.id}`} className='mt-auto'>
                                        <button className='btn btn-primary '>Details</button>
                                    </Link>
                                    <button className='btn btn-danger text-nowrap' onClick = {() => addToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {error && <Alert variant='danger' dismissible>{error}</Alert>}
        </Container>
    )
}

export default ProductListingPage