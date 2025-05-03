import React, { useState, useEffect } from 'react';
import '../style/AddProgram.css';

const AddProgram = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    release_date: '',
    last_update_date: '',
    price: '',
    download_url: '',
    is_published: false,
    category: '',
    icon: null,
  });

  const [categories, setCategories] = useState([]); // State to store categories

  useEffect(() => {
    // Fetch categories from the endpoint
    fetch('http://127.0.0.1:8000/categories/')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch categories');
        return res.json();
      })
      .then((data) => {
        setCategories(data); // Update categories state
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred while fetching categories');
      });

    // Set the last_update_date to the current date whenever the component is rendered
    setFormData((prevData) => ({
      ...prevData,
      last_update_date: new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, icon: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    fetch('http://127.0.0.1:8000/programs/', {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to add program');
        return res.json();
      })
      .then(() => {
        alert('Program added successfully!');
        setFormData({
          title: '',
          description: '',
          type: '',
          release_date: '',
          last_update_date: new Date().toISOString().split('T')[0],
          price: '',
          download_url: '',
          is_published: false,
          category: '',
          icon: null,
        });
      })
      .catch((err) => {
        console.error(err);
        alert('An error occurred while adding the program');
      });
  };

  return (
    <div className="add-program-container">
      <h2 className="add-program-title">🧩 Add New Program</h2>
      <form onSubmit={handleSubmit} className="add-program-form">
        <label>
          Program Title:
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Program Title" className="input" required />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input textarea" />
        </label>
            <label>
              Type:
              <select name="type" value={formData.type} onChange={handleChange} className="input" required>
                <option value="" disabled>Select type</option>
                <option value="app">App</option>
                <option value="game">Game</option>
                <option value="book">Book</option>
              </select>
            </label>

        <label>
          Release Date:
          <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="input" />
        </label>
        <label>
          Last Update Date:
          <input type="date" name="last_update_date" value={formData.last_update_date} readOnly className="input" />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input" />
        </label>
        <label>
          Download URL:
          <input name="download_url" value={formData.download_url} onChange={handleChange} placeholder="Download URL" className="input" />
        </label>
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange} className="input" required>
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} />
          <span>Publish Program</span>
        </label>
        <label>
          Icon:
          <input type="file" name="icon" onChange={handleChange} className="file-input" accept="image/*" />
        </label>
        <button type="submit" className="submit-button">🚀 Submit</button>
      </form>
    </div>
  );
};

export default AddProgram;
