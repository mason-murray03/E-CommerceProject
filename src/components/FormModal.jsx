import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


const FormModal = ({ product, submitted, showModal, handleCloseModal }) => {
    return (
        <>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Form Submitted!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {submitted &&
                    <>
                        <p>Nice job! Here is the information returned from the API:</p>
                        <p><b>Title: </b>{product.title}</p>
                        <p><b>Price: </b>{product.price}</p>
                        <p><b>Description: </b>{product.description}</p>
                        <p><b>Category: </b>{product.category}</p>
                    </>
                }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primery' onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default FormModal