
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { FaList } from 'react-icons/fa';


const Category = () => {
    const [showForm, setShowForm] = useState(false);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [categories, setCategories] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryData, setEditCategoryData] = useState({
        category: '',
        image: '',
        status: ''
    });
    const navigate = useNavigate();

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

                const response = await axios.get('http://localhost:5000/categories', config);
                setCategories(response.data);
            } catch (error) {
                alert('User is not login ');
                navigate("/login")
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };

        e.preventDefault();
      
        try {
            const response = await axios.post('http://localhost:5000/categories', {
                category,
                image,
                status
            },config);
            if (response.status === 401) {
                alert('Not Authorizd');
                navigate("/login");
            }
            if (response.status === 201) {
                alert('Category added successfully');
                setShowForm(false);
                setCategory('');
                setImage('');
                setStatus('');
                setCategories([...categories, response.data]);
            }
        } catch (error) {
            if(error.response.status === 401){
                navigate("/login")
            }
            alert(error.message);

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

            const response = await axios.delete(`http://localhost:5000/categories/${id}`, config);
            if (response.status === 200) {
                setCategories(categories.filter(category => category._id !== id));
                alert('Category deleted successfully');
            }
        } catch (error) {
            if(error.response.status === 401){
                navigate("/login")
            }
            alert('Error deleting category');
        }
    };

    const handleEdit = (category) => {
        setEditModalOpen(true);
        setEditCategoryId(category._id);
        setEditCategoryData({
            category: category.category,
            image: category.image,
            status: category.status
        });
    };

    const handleUpdateCategory = async () => {
        try {
            const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };

            const response = await axios.put(`http://localhost:5000/categories/${editCategoryId}`, editCategoryData,config);
            if (response.status === 200) {
                setCategories(categories.map(category => category._id === editCategoryId ? response.data : category));
                setEditModalOpen(false);
                alert('Category updated successfully');
            }
        } catch (error) {
            if(error.response.status === 401){
                navigate("/login")
            }
            alert('Error updating category');
        }
    };

    const columns = [
        { key: 'category', name: 'Category', },
        {
            key: 'image', name: 'Image', width: 200, renderCell: (params) => (
                <div className='w-44 h-12'>
                    <img className='object-contain w-full h-full' src={params.row.image} alt='Category' />
                </div>
            )
        },
        { key: 'status', name: 'Status' },
        {
            key: 'action', name: 'Action', width: 150, renderCell: (params) => (
                <div className="flex">
                    <button onClick={() => handleEdit(params.row)}>
                        <AiFillEdit className="text-blue-500 mr-2 w-8 h-8" size={20} />
                    </button>
                    <button onClick={() => handleDelete(params.row._id)}>
                        <AiFillDelete className="text-red-500 w-8 h-8" size={20} />
                    </button>
                </div>
            )
        }
    ];

    return (

        <div className="p-4 w-[80vw] bg-[#f4f4f4] h-[80vh]">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-700 flex"><span> <FaList className="sidebar-icon mr-3 w-8 h-8" /></span>Category</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#662671] text-white px-4 py-2 rounded"
                >
                    Add Category
                </button>
            </div>
            <div className="w-full h-full">
                <DataGrid
                    columns={columns}
                    rows={categories}
                    className="border border-gray-200 bg-[#f4f4f4] "
                    style={{ height: '90%', width: '100%', }}

                />
            </div>
            {editModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Category</label>
                            <input
                                type="text"
                                value={editCategoryData.category}
                                onChange={(e) => setEditCategoryData({ ...editCategoryData, category: e.target.value })}
                                className="border rounded w-full py-2 px-3"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image</label>
                            <input
                                type="text"
                                value={editCategoryData.image}
                                onChange={(e) => setEditCategoryData({ ...editCategoryData, image: e.target.value })}
                                className="border rounded w-full py-2 px-3"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Status</label>
                            <input
                                type="text"
                                value={editCategoryData.status}
                                onChange={(e) => setEditCategoryData({ ...editCategoryData, status: e.target.value })}
                                className="border rounded w-full py-2 px-3"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleUpdateCategory}
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
            )}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">Add Category</h2>
                        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700">Category</label>
                                <input
                                    type="text"
                                    className="border rounded w-full py-2 px-3"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="text"
                                    value={image}
                                    className="border rounded w-full py-2 px-3"
                                    onChange={(e) => setImage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={status}
                                    className="border rounded w-full py-2 px-3"
                                    onChange={(e) => setStatus(e.target.value)}
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
        </div>
    );
};

export default Category;

