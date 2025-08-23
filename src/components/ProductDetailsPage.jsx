import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import Alert from 'react-bootstrap/Alert'

const ProductDetailsPage = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] =useState(true)
    const[showSuccess, setShowSuccess] = useState(false)

    const { addToCart } = useContext(CartContext)

    const handleAddToCart = () => {
        addToCart(product)

        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 1000)
    }

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                setProduct(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to load product details')
                setLoading(false)
                console.error(err)
            }
        }
        fetchProduct()
    }, [id])

    if(error) return <p className='text-danger'>{error}</p>
    if(loading) {
        return (
            <Container>
                <h3>
                    <Spinner 
                        animation='border'
                        variant='info'
                        style={{ marginRight: '15px'}}
                        role='status'
                    />
                    Loading Product Details...
                </h3>
            </Container>
        )
    }

    return (
        <Container className='mt-4'>
            {showSuccess && (
                <Alert variant='success'>
                     Product added to cart! ✅
                </Alert>
            )}
            <Row>
                <Col md={6} className='d-felx justofy-content-center align-items-center'>
                    <img 
                        src={product.image}
                        alt={product.title}
                        style={{ maxHeight:'300px', objectFit: 'contain', width:'100%'}}
                    />
                </Col>
                <Col md={6}>
                    <h2>{product.title}</h2>
                    <p className='mt-3'>{product.description}</p>
                    <p><strong>Price: </strong>${product.price}</p>
                    <div className='d-flex justify-content-between align-items-center mt-4 gap-3 mb-4'>
                        <button className='btn btn-primary' onClick={() => window.history.back()}>
                            ⬅️ Back to Products
                        </button>

                        <Link to={`/edit-product/${product.id}`}>
                            <Button variant='warning'>
                                Edit Product ✏️
                            </Button>
                        </Link>

                        <button style={{ borderRadius:'4px', backgroundColor:'red', border:'none', height:'36px'}} onClick={handleAddToCart}>Add to Cart 🛒</button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductDetailsPage