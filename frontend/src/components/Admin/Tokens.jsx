import React, { useState } from 'react';
import { Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import TokensForm from './forms/TokensForm';

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

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com' }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newToken, setNewToken] = useState({
        name: '',
        expiresAt: '',
        userId: ''
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
                    <TokensForm 
                        users={users}
                        newToken={newToken}
                        setNewToken={setNewToken}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleGenerateToken}
                        disabled={!newToken.userId || !newToken.name}
                    >
                        Generate Token
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}