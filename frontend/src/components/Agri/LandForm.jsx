import React, { useState } from "react";
import axios from "axios";

const LandForm = ({ onSubmit }) => {
    const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const [formData, setFormData] = useState({
        ownerName: "",
        phoneNumber: "",
        contact: "",
        address: "",
        landSize: "",
        soilType: "",
        cropCultivated: "",
        agriculturalLoan: "",
        latitude: "",
        longitude: "",
        cropPrice: ""
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            // Make POST request to your backend API endpoint
            const response = await axios.post(`${backendURL}/api/agri/add`, formData);
            console.log(response.data); // Log response from the server
            setFormData({
                ownerName: "",
                phoneNumber: "",
                contact: "",
                address: "",
                landSize: "",
                soilType: "",
                cropCultivated: "",
                agriculturalLoan: "",
                latitude: "",
                longitude: "",
                cropPrice: ""
            });
            // You can optionally call a callback function after successful submission
            if (onSubmit) {
                onSubmit();
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Failed to submit the form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold mb-4">Land Form Registration</h3>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="ownerName">Owner's Name:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phoneNumber">Phone Number:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="contact">Contact Person:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Address:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="landSize">Land Size:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="landSize"
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="soilType">Soil Type:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="soilType"
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="cropCultivated">Crop Cultivated:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="cropCultivated"
                    name="cropCultivated"
                    value={formData.cropCultivated}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="agriculturalLoan">Agricultural Loan (₹):</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="agriculturalLoan"
                    name="agriculturalLoan"
                    value={formData.agriculturalLoan}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="latitude">Latitude:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="longitude">Longitude:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="cropPrice">Price of Cultivated Crop:</label>
                <input
                    required
                    className='w-full px-3 py-2 border rounded'
                    type="text"
                    id="cropPrice"
                    name="cropPrice"
                    value={formData.cropPrice}
                    onChange={handleChange}
                />
            </div>
            <div className="flex justify-center">
                <button className={`px-4 py-2 bg-blue-500 text-white rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (<div className="loader">Loading...</div>) : 'Submit'}
                </button>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </form>
    );
};

export default LandForm;
