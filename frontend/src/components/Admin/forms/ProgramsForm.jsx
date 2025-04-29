import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export default function ProgramsForm({ newProgram, setNewProgram }) {
    // These would typically come from API/Redux store
    const types = ['Game', 'Application', 'Education', 'Entertainment', 'Utility'];
    const categories = {
        Game: ['Action', 'Adventure', 'RPG', 'Strategy'],
        Application: ['Productivity', 'Communication', 'Social'],
        Education: ['Languages', 'Mathematics', 'Science'],
        Entertainment: ['Streaming', 'Music', 'Video'],
        Utility: ['Tools', 'Security', 'System']
    };
    const developers = [
        { id: 1, name: 'Developer 1' },
        { id: 2, name: 'Developer 2' }
    ];

    return (
        <Form>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={newProgram.title}
                            onChange={(e) => setNewProgram({...newProgram, title: e.target.value})}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={newProgram.slug}
                            onChange={(e) => setNewProgram({...newProgram, slug: e.target.value})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                />
            </Form.Group>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select 
                            value={newProgram.type}
                            onChange={(e) => setNewProgram({...newProgram, type: e.target.value})}
                        >
                            <option value="">Select Type</option>
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select 
                            value={newProgram.category}
                            onChange={(e) => setNewProgram({...newProgram, category: e.target.value})}
                            disabled={!newProgram.type}
                        >
                            <option value="">Select Category</option>
                            {newProgram.type && categories[newProgram.type]?.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Developer</Form.Label>
                        <Form.Select 
                            value={newProgram.developerId}
                            onChange={(e) => setNewProgram({...newProgram, developerId: e.target.value})}
                        >
                            <option value="">Select Developer</option>
                            {developers.map(dev => (
                                <option key={dev.id} value={dev.id}>{dev.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type="number" 
                            min="0"
                            step="0.01"
                            value={newProgram.price}
                            onChange={(e) => setNewProgram({...newProgram, price: e.target.value})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Release Date</Form.Label>
                        <Form.Control 
                            type="date"
                            value={newProgram.releaseDate}
                            onChange={(e) => setNewProgram({...newProgram, releaseDate: e.target.value})}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Update Date</Form.Label>
                        <Form.Control 
                            type="date"
                            value={newProgram.lastUpdateDate}
                            onChange={(e) => setNewProgram({...newProgram, lastUpdateDate: e.target.value})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control 
                            type="number" 
                            min="0"
                            max="5"
                            step="0.1"
                            value={newProgram.rating}
                            onChange={(e) => setNewProgram({...newProgram, rating: e.target.value})}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Download Count</Form.Label>
                        <Form.Control 
                            type="number"
                            min="0"
                            value={newProgram.downloadCount}
                            onChange={(e) => setNewProgram({...newProgram, downloadCount: e.target.value})}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Icon</Form.Label>
                <Form.Control 
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProgram({...newProgram, icon: e.target.files[0]})}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Download URL</Form.Label>
                <Form.Control 
                    type="url"
                    value={newProgram.downloadUrl}
                    onChange={(e) => setNewProgram({...newProgram, downloadUrl: e.target.value})}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check 
                    type="checkbox"
                    label="Is Published"
                    checked={newProgram.isPublished}
                    onChange={(e) => setNewProgram({...newProgram, isPublished: e.target.checked})}
                />
            </Form.Group>
        </Form>
    );
}