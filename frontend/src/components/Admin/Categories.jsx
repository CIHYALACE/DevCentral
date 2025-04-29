import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import CategoriesForm from './forms/CategoriesForm';

export default function CategoriesManagement() {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Games', relatedType: 'game', programCount: 150 },
        { id: 2, name: 'Productivity', relatedType: 'app', programCount: 75 }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        relatedType: ''
    });

    // Type choices from Django backend
    const TYPE_CHOICES = [
        { value: 'app', label: 'App' },
        { value: 'game', label: 'Game' },
        { value: 'book', label: 'Book' }
    ];

    const handleAddCategory = () => {
        // Add category logic here
        setShowModal(false);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Categories Management</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add New Category
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Programs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.relatedType}</td>
                            <td>{category.programCount}</td>
                            <td>
                                <Button variant="info" size="sm" className="me-2">Edit</Button>
                                <Button variant="danger" size="sm">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CategoriesForm newCategory={newCategory} setNewCategory={setNewCategory} TYPE_CHOICES={TYPE_CHOICES} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleAddCategory}
                        disabled={!newCategory.name || !newCategory.relatedType}
                    >
                        Add Category
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}