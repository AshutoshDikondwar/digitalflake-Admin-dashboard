import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {  FaThLarge } from 'react-icons/fa';


const SubCategory = () => {
    
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editSubCategoryId, setEditSubCategoryId] = useState(null);
    const [editSubCategoryData, setEditSubCategoryData] = useState({
        category: '',
        subcategory: '',
        image: '',
        status: ''
    });
    const navigate=useNavigate();

    useEffect(() => {
        
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:5000/categories',config);
                setCategories(response.data);
            } catch (error) {
                if(error.response.status===401){
                    navigate("/login")
                }
                alert('Error fetching categories');
            }
        };

        
        const fetchSubCategories = async () => {
            try {
                const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:5000/subcategories',config);
                const flattenedSubCategories = response.data.map(subCategory => ({
                    ...subCategory,
                    categoryName: subCategory.category.category
                }));
                setSubCategories(flattenedSubCategories);
            } catch (error) {
                if(error.response.status===401){
                    navigate("/login")
                }
                alert('Error fetching sub-categories');
            }
        };

        fetchCategories();
        fetchSubCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            const response = await axios.post('http://localhost:5000/subcategories', {
                category: selectedCategory,
                subcategory:subCategory,
                image,
                status
            },config);
            if (response.status === 201) {
                alert('Sub-category added successfully');
                setShowForm(false);
                setSelectedCategory('');
                setSubCategory('');
                setImage('');
                setStatus('');
                setSubCategories([...subCategories, response.data]);
            }
        } catch (error) {
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error adding sub-category');
        }
    };


    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            const response = await axios.delete(`http://localhost:5000/subcategories/${id}`,config);
            if (response.status === 200) {
                alert('Sub-category deleted successfully');
                setSubCategories(subCategories.filter(subCat => subCat._id !== id));
            }
        } catch (error) {
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error deleting sub-category');
        }
    };

    const handleEdit = (subCategory) => {

        setEditModalOpen(true);
        setEditSubCategoryId(subCategory._id);
        setEditSubCategoryData({
            category: subCategory.category._id,
            subcategory: subCategory.subcategory,
            image: subCategory.image,
            status: subCategory.status
        });
    };

    const handleUpdateSubCategory = async () => {
        try {
            const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            const response = await axios.put(`http://localhost:5000/subcategories/${editSubCategoryId}`, editSubCategoryData,config);
            if (response.status === 200) {
                setSubCategories(subCategories.map(subCat => subCat._id === editSubCategoryId ? response.data : subCat));
                setEditModalOpen(false);
                alert('Sub-category updated successfully');
            }
        } catch (error) {
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error updating sub-category');
        }
    };

    const columns = [
        { key: 'categoryName', name: 'Category' },
        { key: 'subcategory', name: 'Sub Category' },
        {
            key: 'image', name: 'Image', width: 200, renderCell: (params) => (
                <div className='w-44 h-12'>
                    <img className='object-contain w-full h-full' src={params.row.image} alt='Sub Category' />
                </div>
            )
        },
        { key: 'status', name: 'Status' },
        {
            key: 'actions', name: 'Actions', renderCell: (params) => (
                <div className='flex items-center justify-center text-center space-x-2'>
                 <AiFillEdit
                        className='cursor-pointer text-blue-500 w-8 h-8'
                        onClick={() => handleEdit(params.row)}
                    />
                    <AiFillDelete
                        className='cursor-pointer text-red-500 w-8 h-8'
                        onClick={() => handleDelete(params.row._id)}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="p-4 w-[80vw] h-[80vh]">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold flex"> <span><FaThLarge className="sidebar-icon mr-3 w-8 h-8" /></span>Sub Category</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#662671] text-white px-4 py-2 rounded"
                >
                    Add Sub Category
                </button>
            </div>
            <div className="w-full">
                <DataGrid
                    columns={columns}
                    rows={subCategories}
                    className="border border-gray-200 bg-[#f4f4f4]"
                    style={{ height: '90%', width: '100%' }}
                />
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Add Sub Category</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Sub Category</label>
                                <input
                                    type="text"
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="text"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Sub-Category</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Category</label>
                                <select
                                    value={editSubCategoryData.category}
                                    onChange={(e) => setEditSubCategoryData({ ...editSubCategoryData, category: e.target.value })}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700">Sub-Category</label>
                                <input
                                    type="text"
                                    value={editSubCategoryData.subcategory}
                                    onChange={(e) => setEditSubCategoryData({ ...editSubCategoryData, subcategory: e.target.value })}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="text"
                                    value={editSubCategoryData.image}
                                    onChange={(e) => setEditSubCategoryData({ ...editSubCategoryData, image: e.target.value })}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={editSubCategoryData.status}
                                    onChange={(e) => setEditSubCategoryData({ ...editSubCategoryData, status: e.target.value })}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleUpdateSubCategory}
                                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Submit
                                </button>
                                <button
                                    onClick={() => setEditModalOpen(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubCategory;
