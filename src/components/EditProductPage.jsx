import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'

const EditProductPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        title:'',
        price:'',
        description:'',
        category:''
    })
    const [showModal, setShowModal] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data)
                setLoading(false)
            })
            .catch(error => {
                setError('Failed to load product')
                setLoading(false)
            })
    }, [id])

    const handleChange = (e) => {
        e.preventDefault()
        axios.put(`/api/products/${id}`, product)
            .then(() => {

            })
            .catch(error => {
                setError('Error updating product')
            })
    }

    const handleDelete = () => {
        axios.delete(`https://fakestoreapi.com/products/${id}`)
            .then(() => {
                setShowModal(false)
                navigate('/products')
            })
            .catch(error => {
                setError('Failed to delete product')
                setShowModal(false)
            })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProduct(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`https://fakestoreapi.com/products/${id}`, {
            ...product,
            price: parseFloat(product.price)
        })
        .then(() => {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                navigate('/products')
            }, 2000)
        })
        .catch(() => {
            setError('Error updating product')
            setSuccess(false)
        })
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Edit Product</h2>

                    {success && <Alert variant='success'>Product updated successfully!</Alert>}
                    {loading && <Spinner animation='border' variant='primary' />}
                    {error && <Alert variant='danger'>{error}</Alert>}
                
                    {!loading && product && (
                        <>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="title"
                                    value={product.title}
                                    onChange={handleInputChange}
                                    required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                    type="number"
                                    name="price"
                                    value={product.price}
                                    onChange={handleInputChange}
                                    required
                                    step="0.01"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={product.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                    type="text"
                                    name="category"
                                    value={product.category}
                                    onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit">
                                            Save Changes🔒
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button style={{ marginLeft:'92px' }} variant='danger' onClick={() => setShowModal(true)}>
                                            Delete Product🗑️
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </>
                    )}
                </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete <strong>{product?.title}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EditProductPage
