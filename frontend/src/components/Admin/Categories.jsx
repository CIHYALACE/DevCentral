import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import CategoriesForm from './forms/CategoriesForm';
import { adminStore, fetchAdminCategories } from '../../store/adminStore';

export default function CategoriesManagement() {
    // State for categories data from the store
    const [categoriesData, setCategoriesData] = useState({
        data: [],
        loading: true,
        error: null
    });

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

    // Subscribe to admin store and fetch categories data
    useEffect(() => {
        const unsubscribe = adminStore.subscribe(state => {
            // Make sure categories exists in the state before updating local state
            if (state && state.categories) {
                setCategoriesData(state.categories);
            }
        });
        
        // Fetch categories data when component mounts
        const loadCategories = async () => {
            try {
                await fetchAdminCategories();
            } catch (error) {
                console.error('Error loading categories:', error);
                // Update state with error even if the store update fails
                setCategoriesData(prev => ({
                    ...prev,
                    loading: false,
                    error: { detail: error.message || 'Failed to load categories' }
                }));
            }
        };
        
        loadCategories();
        
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleAddCategory = () => {
        // Add category logic
        console.log('Adding category:', newCategory);
        setShowModal(false);
    };

    const handleEditCategory = (id) => {
        // Edit category logic
        console.log(`Edit category ${id}`);
    };

    const handleDeleteCategory = (id) => {
        // Delete category logic
        console.log(`Delete category ${id}`);
    };

    // Safely check loading state
    const isLoading = categoriesData?.loading === true;
    
    // Safely check error state
    const hasError = categoriesData?.error != null;
    
    // Safely get data
    const categories = categoriesData?.data || [];

    // Loading state
    if (isLoading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading categories...</span>
                </Spinner>
                <p className="mt-2">Loading categories data...</p>
            </div>
        );
    }

    // Error state
    if (hasError) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Error Loading Categories</Alert.Heading>
                <p>{categoriesData?.error?.detail || 'An error occurred while loading categories data'}</p>
            </Alert>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* <h2>Categories Management</h2> */}
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add New Category
                </Button>
            </div>

            <Table striped bordered hover responsive>
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
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.related_type}</td>
                                <td>{category.program_count || 0}</td>
                                <td>
                                    <Button 
                                        variant="info" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => handleEditCategory(category.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No categories found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CategoriesForm 
                        newCategory={newCategory} 
                        setNewCategory={setNewCategory} 
                        typeChoices={TYPE_CHOICES}
                    />
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