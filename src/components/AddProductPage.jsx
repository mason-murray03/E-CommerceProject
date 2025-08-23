import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import FormModal from './FormModal'

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        title:'',
        price:'',
        description:'',
        category:'',
    })

    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false)
    const [validated, setValidated] = useState(false)
    const [product, setProduct] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target 
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.currentTarget 
        if(form.checkValidity() === false) {
            e.stopPropagation()
        } else {
            try {
                const response = await axios.post('https://fakestoreapi.com/products', {

                title: formData.title,
                price: parseFloat(formData.price),
                description: formData.description,
                category: formData.category
                })
                console.log(response.data)
                setProduct(response.data)
                setSubmitted(true)
                setShowModal(true)
                setError(null)
            } catch (error) {
                setError(`Error submitting the form. Please try again later`)
                setSubmitted(false)
            }

            setValidated(true)
        }
    }

    return (
        <Container>
            <h2>Create a Product</h2>

            <FormModal product={product} submitted={submitted} showModal={showModal} handleCloseModal={handleCloseModal} />

            {submitted && <Alert variant='success' dismissible>{product.title}</Alert>}
            {error && <Alert variant='danger' dismissible>{error}</Alert>}

            <Form onSubmit={ handleSubmit } noValidate validated={validated}>
                <Row>
                    <Col>
                        <Form.Group controlId='formTitle'>
                            <Form.Label>Product Title</Form.Label>
                            <Form.Control 
                                type='text'
                                placeholder='Enter Product Name'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please provide a product title
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId='productPrice'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type='number'
                                placeholder='Enter Product Price'
                                name='price'
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please Enter the Price
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId='productDescription'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as='textarea'
                                rows={3}
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                            <Form.Control.Feedback type='invalid'>
                                Please Provide a Description
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId='formSelect'>
                            <Form.Label>Select a Category</Form.Label>
                            <Form.Select
                                name='category'
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                            <Form.Control.Feedback type='invalid'>
                                Please Chose a Category
                            </Form.Control.Feedback>
                            <option hidden value=''>Choose...</option>
                            <option>Men's Clothing</option>
                            <option>Women's Clothing</option>
                            <option>Electronics</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant='primary' type='submit' className='mt-4'>
                    Add Product
                </Button>
            </Form>
        </Container>
    )
}

export default AddProductPage