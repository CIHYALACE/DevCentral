import React, { useState } from 'react';
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

    fetch('http://127.0.0.1:8000/usingViewset/myprograms/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
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
          last_update_date: '',
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
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Program Title" className="input" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input textarea" />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="Type (app/game/book)" className="input" required />
        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="input" />
        <input type="date" name="last_update_date" value={formData.last_update_date} onChange={handleChange} className="input" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input" />
        <input name="download_url" value={formData.download_url} onChange={handleChange} placeholder="Download URL" className="input" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category ID" className="input" />

        <label className="checkbox-label">
          <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} />
          <span>Publish Program</span>
        </label>

        <input type="file" name="icon" onChange={handleChange} className="file-input" accept="image/*" />

        <button type="submit" className="submit-button">🚀 Submit</button>
      </form>
    </div>
  );
};

export default AddProgram;
