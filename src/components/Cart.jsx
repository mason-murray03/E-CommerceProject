import { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CartContext } from '../context/CartContext'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const {
        cartItems,
        removeFromCart,
        totalPrice,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext)

    const navigate = useNavigate()
    const handleCheckout = () => {
        if(cartItems.length === 0) {
            alert('Your cart is empty')
            return
        }

        navigate('/checkout')
    }

    return (
        <Container>
            <h2>🛒 Your Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                {cartItems.map(item => (
                    <Card key={item.id}>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                <h5>{item.title}</h5>
                                <p>${item.price.toFixed(2)}</p>
                                </Col>

                                <Col md={3} className='d-flex align-items-center'>
                                    <Button
                                        variant='outline-secondary'
                                        size='sm'
                                        onClick={() => decreaseQuantity(item.id)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </Button>
                                    <span className='mx-2'>{item.quantity}</span>
                                    <Button
                                        variant='outline-secondary'
                                        size='sm'
                                        onClick={() => increaseQuantity(item.id)}
                                    >
                                        +
                                    </Button>
                                </Col>

                                <Col md={3} className='text-end'>
                                    <Button
                                        variant='danger'
                                        size='sm'
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                    Remove
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
                <hr />
                <Row>
                    <Col><strong>Total:</strong></Col>
                    <Col className='text-end'><strong>${totalPrice.toFixed(2)}</strong></Col>
                </Row>

                <div className='d-flex justify-content-between mt-3'>
                    <Button variant='outline-primary' onClick={() => navigate('/products')}>Keep Shopping</Button>
                    <Button variant='success' onClick={handleCheckout}>Proceed to Checkout</Button>
                </div>
                </>
            )}
        </Container>
    )
}

export default Cart