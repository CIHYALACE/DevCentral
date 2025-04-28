import React, { useState } from 'react';
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap';

export default function TokensManagement() {
    const [tokens, setTokens] = useState([
        { 
            id: 1, 
            name: 'API Access Token',
            token: 'eyJhbGciOiJ...truncated',
            status: 'active',
            expiresAt: '2025-05-28',
            createdAt: '2025-04-28'
        },
        { 
            id: 2, 
            name: 'Admin Dashboard Token',
            token: 'kJhbGNiOiJ...truncated',
            status: 'expired',
            expiresAt: '2025-04-27',
            createdAt: '2025-03-28'
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newToken, setNewToken] = useState({
        name: '',
        expiresAt: ''
    });

    const handleGenerateToken = () => {
        // Token generation logic here
        setShowModal(false);
    };

    const handleRevokeToken = (id) => {
        setTokens(tokens.map(token => 
            token.id === id ? {...token, status: 'revoked'} : token
        ));
    };

    const getStatusBadge = (status) => {
        const variants = {
            active: 'success',
            expired: 'warning',
            revoked: 'danger'
        };
        return <Badge bg={variants[status]}>{status}</Badge>;
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>API Tokens Management</h2>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Generate New Token
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Token</th>
                        <th>Status</th>
                        <th>Expires At</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tokens.map(token => (
                        <tr key={token.id}>
                            <td>{token.id}</td>
                            <td>{token.name}</td>
                            <td>
                                <code className="small">{token.token}</code>
                                <Button 
                                    variant="link" 
                                    size="sm"
                                    onClick={() => navigator.clipboard.writeText(token.token)}
                                >
                                    Copy
                                </Button>
                            </td>
                            <td>{getStatusBadge(token.status)}</td>
                            <td>{token.expiresAt}</td>
                            <td>{token.createdAt}</td>
                            <td>
                                {token.status === 'active' && (
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={() => handleRevokeToken(token.id)}
                                    >
                                        Revoke
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate New Token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Token Name</Form.Label>
                            <Form.Control 
                                type="text"
                                value={newToken.name}
                                onChange={(e) => setNewToken({...newToken, name: e.target.value})}
                                placeholder="Enter a name for this token"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Expiration Date</Form.Label>
                            <Form.Control 
                                type="date"
                                value={newToken.expiresAt}
                                onChange={(e) => setNewToken({...newToken, expiresAt: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleGenerateToken}>
                        Generate Token
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}