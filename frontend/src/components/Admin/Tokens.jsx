import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Badge, Spinner, Alert } from 'react-bootstrap';
import TokensForm from './forms/TokensForm';
import { adminStore, fetchAdminTokens, revokeToken, createToken } from '../../store/adminStore';

export default function TokensManagement() {
    // State for tokens data from the store
    const [tokensData, setTokensData] = useState({
        data: [],
        loading: true,
        error: null
    });

    const [showModal, setShowModal] = useState(false);
    const [newToken, setNewToken] = useState({
        name: '',
        expiresAt: ''
    });

    // Subscribe to admin store and fetch tokens data
    useEffect(() => {
        const unsubscribe = adminStore.subscribe(state => {
            // Make sure tokens exists in the state before updating local state
            if (state && state.tokens) {
                setTokensData(state.tokens);
            }
        });
        
        // Fetch tokens data when component mounts
        const loadTokens = async () => {
            try {
                await fetchAdminTokens();
            } catch (error) {
                console.error('Error loading tokens:', error);
                // Update state with error even if the store update fails
                setTokensData(prev => ({
                    ...prev,
                    loading: false,
                    error: { detail: error.message || 'Failed to load tokens' }
                }));
            }
        };
        
        loadTokens();
        
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleAddToken = async () => {
        try {
            await createToken(newToken);
            setShowModal(false);
            setNewToken({ name: '', expiresAt: '' });
        } catch (error) {
            console.error("Error creating token:", error);
        }
    };

    const handleRevokeToken = async (id) => {
        try {
            await revokeToken(id);
        } catch (error) {
            console.error(`Error revoking token ${id}:`, error);
        }
    };

    // Safely check loading state
    const isLoading = tokensData?.loading === true;
    
    // Safely check error state
    const hasError = tokensData?.error != null;
    
    // Safely get data
    const tokens = tokensData?.data || [];

    // Loading state
    if (isLoading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading tokens...</span>
                </Spinner>
                <p className="mt-2">Loading tokens data...</p>
            </div>
        );
    }

    // Error state
    if (hasError) {
        return (
            <Alert variant="danger">
                <Alert.Heading>Error Loading Tokens</Alert.Heading>
                <p>{tokensData?.error?.detail || 'An error occurred while loading tokens data'}</p>
            </Alert>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                {/* <h2>API Tokens Management</h2> */}
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Generate New Token
                </Button>
            </div>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Token</th>
                        <th>Status</th>
                        <th>Expires</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.length > 0 ? (
                        tokens.map((token) => (
                            <tr key={token.id}>

                                <td>{token.name}</td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <span className="text-truncate" style={{ maxWidth: '150px' }}>
                                            {token.token}
                                        </span>
                                        <Button 
                                            variant="outline-secondary" 
                                            size="sm" 
                                            className="ms-2"
                                            onClick={() => {
                                                navigator.clipboard.writeText(token.token);
                                                // You could add a toast notification here
                                            }}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <Badge bg={token.status === 'active' ? 'success' : 'danger'}>
                                        {token.status}
                                    </Badge>
                                </td>
                                <td>{token.expires_at ? new Date(token.expires_at).toLocaleDateString() : 'Never'}</td>
                                <td>{token.created_at ? new Date(token.created_at).toLocaleDateString() : 'Unknown'}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRevokeToken(token.id)}
                                        disabled={token.status === 'revoked'}
                                    >
                                        Revoke
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No tokens found</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate New API Token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Token Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="e.g., Development API Token"
                                value={newToken.name}
                                onChange={(e) => setNewToken({...newToken, name: e.target.value})}
                            />
                            <Form.Text className="text-muted">
                                Give your token a descriptive name to identify its purpose.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                value={newToken.expiresAt}
                                onChange={(e) => setNewToken({...newToken, expiresAt: e.target.value})}
                            />
                            <Form.Text className="text-muted">
                                Set an expiration date for security. Leave blank for non-expiring token.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddToken}
                        disabled={!newToken.name}
                    >
                        Generate Token
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}