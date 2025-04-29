import { Form } from "react-bootstrap";

export default function TokensForm( { users, newToken, setNewToken }) {
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Select User</Form.Label>
          <Form.Select
            value={newToken.userId}
            onChange={(e) =>
              setNewToken({ ...newToken, userId: e.target.value })
            }
          >
            <option value="">Choose a user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Token Name</Form.Label>
          <Form.Control
            type="text"
            value={newToken.name}
            onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
            placeholder="Enter a name for this token"
          />
        </Form.Group>
      </Form>
    </>
  );
}
