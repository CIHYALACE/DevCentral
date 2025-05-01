// pages/AddProgram.jsx
import React, { useState } from 'react';

const AddProgram = () => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    type: '',
    release_date: '',
    last_update_date: '',
    price: '',
    download_count: '',
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
        if (!res.ok) throw new Error('فشل في الإضافة');
        return res.json();
      })
      .then((data) => {
        alert('تم إضافة التطبيق بنجاح!');
        // reset form
        setFormData({
          title: '',
          slug: '',
          description: '',
          type: '',
          release_date: '',
          last_update_date: '',
          price: '',
          download_count: '',
          download_url: '',
          is_published: false,
          category: '',
          icon: null,
        });
      })
      .catch((err) => {
        console.error(err);
        alert('حدث خطأ أثناء الإضافة');
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">إضافة تطبيق جديد</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-md">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="العنوان" className="p-2 border rounded" required />
        <input name="slug" value={formData.slug} onChange={handleChange} placeholder="Slug" className="p-2 border rounded" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="الوصف" className="p-2 border rounded" />
        <input name="type" value={formData.type} onChange={handleChange} placeholder="النوع (app/game/book)" className="p-2 border rounded" required />
        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="p-2 border rounded" />
        <input type="date" name="last_update_date" value={formData.last_update_date} onChange={handleChange} className="p-2 border rounded" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="السعر" className="p-2 border rounded" />
        <input type="number" name="download_count" value={formData.download_count} onChange={handleChange} placeholder="عدد التحميلات" className="p-2 border rounded" />
        <input name="download_url" value={formData.download_url} onChange={handleChange} placeholder="رابط التحميل" className="p-2 border rounded" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="معرف التصنيف (category id)" className="p-2 border rounded" />
        <label>
          <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} /> نشر التطبيق
        </label>
        <input type="file" name="icon" onChange={handleChange} className="p-2" accept="image/*" />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">أضف التطبيق</button>
      </form>
    </div>
  );
};

export default AddProgram;
