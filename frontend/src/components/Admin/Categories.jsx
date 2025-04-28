import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

export default function CategoriesManagement() {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Games', description: 'Gaming applications', programCount: 150 },
        { id: 2, name: 'Productivity', description: 'Work and productivity apps', programCount: 75 }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: ''
    });

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
                        <th>Description</th>
                        <th>Programs</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
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
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                as="textarea"
                                rows={3}
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddCategory}>
                        Add Category
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}