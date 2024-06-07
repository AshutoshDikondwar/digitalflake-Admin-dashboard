import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {  FaBoxes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const ProductComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [editProductData, setEditProductData] = useState({
        productName: '',
        category: '',
        subcategory: '',
        image: '',
        status: ''
    });

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
        fetchProducts();
    }, []);
    const navigate=useNavigate();

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
            setSubCategories(response.data);
        } catch (error) {
            
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error fetching sub-categories');
        }
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            const response = await axios.get('http://localhost:5000/products',config);
            const flattenedProducts = response.data.map(product => ({
                ...product,
                categoryName: product.category.category,
                subCategoryName: product.subcategory.subcategory,
            }));
            setProducts(flattenedProducts);
        } catch (error) {
           
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error fetching products');
        }
    };

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
            const response = await axios.post('http://localhost:5000/products', {
                product: productName,
                category: selectedCategory,
                subcategory: selectedSubCategory
              
            },config);
            if (response.status === 201) {
                alert('Product added successfully');
                setShowForm(false);
                setProductName('');
                setSelectedCategory('');
                setSelectedSubCategory('');
              
                fetchProducts();
            }
        } catch (error) {
           
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error adding product');
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
            const response = await axios.delete(`http://localhost:5000/products/${id}`,config);
            if (response.status === 200) {
                alert('Product deleted successfully');
                fetchProducts();
            }
        } catch (error) {
          
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error deleting product');
        }
    };

    const handleEdit = (product) => {
        setEditModalOpen(true);
        setEditProductId(product._id);
        setEditProductData({
            productName: product.product,
            category: product.category._id,
            subcategory: product.subcategory._id,
            image: product.image,
            status: product.status
        });
    };

    const handleUpdateProduct = async () => {
        try {
            const token = localStorage.getItem('token');

                // Configure headers with the token
                const config = {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                };
            const response = await axios.put(`http://localhost:5000/products/${editProductId}`, editProductData,config);
            if (response.status === 200) {
                fetchProducts();
                setEditModalOpen(false);
                alert('Product updated successfully');
            }
        } catch (error) {
          
            if(error.response.status===401){
                navigate("/login")
            }
            alert('Error updating product');
        }
    };

    const columns = [
        { key: 'product', name: 'Product Name' },
        { key: 'categoryName', name: 'Category' },
        { key: 'subCategoryName', name: 'Sub Category' },
        {
            key: 'image', name: 'Image', width: 200, renderCell: (params) => (
                <div className='w-44 h-12'>
                    <img className='object-contain w-full h-full' src={params.row.image} alt='Product' />
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
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold flex"><span><FaBoxes className="sidebar-icon mr-3 w-8 h-8" /></span>Product</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#662671] text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
                    <div className="bg-white p-4 rounded shadow-md w-96">
                        <h2 className="text-xl font-bold mb-4">  Add Product</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="mb-4">
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
                            <div className="mb-4">
                                <label className="block text-gray-700">Sub Category</label>
                                <select
                                    value={selectedSubCategory}
                                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                >
                                    <option value="">Select Sub Category</option>
                                    {subCategories.map((subcategory) => (
                                        <option key={subcategory._id} value={subcategory._id}>
                                            {subcategory.subcategory}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-4 py-2 rounded"
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <form className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-gray-700">Category</label>
                                <select
                                    value={editProductData.category}
                                    onChange={(e) =>
                                        setEditProductData({ ...editProductData, category: e.target.value })
                                    }
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
                            <div className="mb-4">
                                <label className="block text-gray-700">Sub Category</label>
                                <select
                                    value={editProductData.subcategory}
                                    onChange={(e) =>
                                        setEditProductData({ ...editProductData, subcategory: e.target.value })
                                    }
                                    className="border rounded w-full py-2 px-3"
                                    required
                                >
                                    <option value="">Select Sub Category</option>
                                    {subCategories.map((subcategory) => (
                                        <option key={subcategory._id} value={subcategory._id}>
                                            {subcategory.subcategory}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Name</label>
                                <input
                                    type="text"
                                    value={editProductData.productName}
                                    onChange={(e) =>
                                        setEditProductData({ ...editProductData, productName: e.target.value })
                                    }
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="text"
                                    value={editProductData.image}
                                    onChange={(e) =>
                                        setEditProductData({ ...editProductData, image: e.target.value })
                                    }
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Status</label>
                                <input
                                    type="text"
                                    value={editProductData.status}
                                    onChange={(e) =>
                                        setEditProductData({ ...editProductData, status: e.target.value })
                                    }
                                    className="border rounded w-full py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={handleUpdateProduct}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <DataGrid
                columns={columns}
                rows={products}
                className="border border-gray-200 bg-[#f4f4f4]"
                style={{ height: '90%', width: '100%' }}
            />
        </div>
    );
};

export default ProductComponent;
