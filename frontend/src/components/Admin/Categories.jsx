import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import CategoriesForm from './forms/CategoriesForm';
import { useStore } from '@tanstack/react-store';
import { adminStore, fetchAdminCategories } from '../../store/adminStore';
import { addCategory, editCategory, deleteCategory } from '../../store';
import { Paginator } from '../common/Paginator';

export default function CategoriesManagement() {
    // Use the store hook to access categories data directly
    const categoriesData = useStore(adminStore, (state) => state.categories);
    const isLoading = useStore(adminStore, (state) => state.loading);
    
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Modals state
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    // Category data state
    const [newCategory, setNewCategory] = useState({
        name: '',
        related_type: ''
    });
    const [currentCategory, setCurrentCategory] = useState(null);

    // Type choices from Django backend
    const TYPE_CHOICES = [
        { value: 'app', label: 'App' },
        { value: 'game', label: 'Game' },
        { value: 'book', label: 'Book' }
    ];

    // Fetch categories data when component mounts or page changes
    useEffect(() => {
        const loadCategories = async () => {
            try {
                await fetchAdminCategories(currentPage, itemsPerPage);
            } catch (error) {
                console.error('Error loading categories:', error);
            }
        };
        
        loadCategories();
    }, [currentPage, itemsPerPage]);
    
    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddCategory = async () => {
        try {
            // Call the store function to add the category
            await addCategory(newCategory);
            
            // Reset form and close modal
            setNewCategory({
                name: '',
                related_type: ''
            });
            setShowAddModal(false);
            
            // Refresh the categories list
            await fetchAdminCategories(currentPage, itemsPerPage);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleEditCategory = (category) => {
        // Set the current category and open the edit modal
        setCurrentCategory(category);
        setNewCategory({
            name: category.name,
            related_type: category.related_type
        });
        setShowEditModal(true);
    };
    
    const submitEditCategory = async () => {
        try {
            // Call the store function to update the category
            await editCategory(currentCategory.id, newCategory);
            
            // Reset form and close modal
            setCurrentCategory(null);
            setNewCategory({
                name: '',
                related_type: ''
            });
            setShowEditModal(false);
            
            // Refresh the categories list
            await fetchAdminCategories(currentPage, itemsPerPage);
        } catch (error) {
            console.error(`Error editing category ${currentCategory?.id}:`, error);
        }
    };

    const handleDeleteCategory = (category) => {
        // Set the current category and open the delete confirmation modal
        setCurrentCategory(category);
        setShowDeleteModal(true);
    };
    
    const confirmDeleteCategory = async () => {
        try {
            // Call the store function to delete the category
            await deleteCategory(currentCategory.id);
            
            // Reset and close modal
            setCurrentCategory(null);
            setShowDeleteModal(false);
            
            // Refresh the categories list
            await fetchAdminCategories(currentPage, itemsPerPage);
        } catch (error) {
            console.error(`Error deleting category ${currentCategory?.id}:`, error);
        }
    };

    // Get data from store
    const categories = categoriesData?.data || [];
    const totalItems = categoriesData?.totalItems || 0;
    const hasError = categoriesData?.error != null;

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
                <Button variant="primary" onClick={() => setShowAddModal(true)}>
                    Add New Category
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>

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

                                <td>{category.name}</td>
                                <td>{category.related_type}</td>
                                <td>{category.program_count || 0}</td>
                                <td>
                                    <Button 
                                        variant="info" 
                                        size="sm" 
                                        className="me-2"
                                        onClick={() => handleEditCategory(category)}
                                    >
                                        Edit
                                    </Button>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleDeleteCategory(category)}
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

            {/* Pagination */}
            <Paginator
                currentPage={currentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                maxPageButtons={5}
            />

            {/* Add Category Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
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
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleAddCategory}
                        disabled={!newCategory.name || !newCategory.related_type}
                    >
                        Add Category
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Category Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CategoriesForm 
                        newCategory={newCategory} 
                        setNewCategory={setNewCategory} 
                        typeChoices={TYPE_CHOICES}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={submitEditCategory}
                        disabled={!newCategory.name || !newCategory.related_type}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete the category <strong>{currentCategory?.name}</strong>?</p>
                    {currentCategory?.program_count > 0 && (
                        <Alert variant="warning">
                            This category is used by {currentCategory.program_count} program(s). Deleting it may affect those programs.
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={confirmDeleteCategory}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}