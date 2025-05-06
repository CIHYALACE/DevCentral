import { Form } from "react-bootstrap";

export default function CategoriesForm({ newCategory, setNewCategory, typeChoices }) {
  
  return (
    <>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Related Type</Form.Label>
          <Form.Select
            value={newCategory.related_type}
            onChange={(e) =>
              setNewCategory({ ...newCategory, related_type: e.target.value })
            }
          >
            <option value="">Select a type...</option>
            {typeChoices.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </>
  );
}
