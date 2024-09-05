import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiGET } from '../../utilities/apiHelpers';
import MultiRangeSlider from '../../components/productComponents/multiRangeSlider';
const ProductSecondModal = ({ show, onHide }) => {

    return (
        <>
            <Modal show={show} onHide={onHide} className='' size="lg" aria-labelledby="contained-modal-title-vcenter">
                <div className='p-3'>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">Filter By</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <div>
                        <div>
                            <h3>Sort By</h3>
                        </div>
                       </div>
                    </Modal.Body>
                    <Modal.Body>
                   
                    </Modal.Body>
                    <Modal.Body>
                     
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                </div>
            </Modal>
        </>
    );
};

export default ProductSecondModal;
