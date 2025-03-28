import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';
import { FaTrash } from 'react-icons/fa';

const Landview = () => {
    const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
    const [landData, setLandData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLandData();
    }, []);

    const fetchLandData = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/agri/fetch`);
            setLandData(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:4000/api/agri/delete/${id}`);
            console.log(response.data);
            fetchLandData();
        } catch (error) {
            console.error("Error deleting land:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-4'>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Lottie animationData={loadingAnimation} loop autoplay />
                </div>
            ) : error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div>
                    <h1 className='text-3xl font-bold mb-4'>Land Information</h1>
                    {landData.map((land, index) => (
                    <div key={index} className="mb-8 p-4 bg-white shadow-md rounded">
                        <div className="flex justify-between">
                            <div className="w-1/2 pr-4">
                                <h2 className='text-xl font-bold mb-2'>Land {index + 1}</h2>
                                <table className='w-full'>
                                    <tbody>
                                        <tr className='border-b'>
                                            <td className='py-2'>Owner's Name</td>
                                            <td className='py-2'>{land.ownerName}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Contact Person</td>
                                            <td className='py-2'>{land.contact}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Phone Number</td>
                                            <td className='py-2'>{land.phoneNumber}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Address</td>
                                            <td className='py-2'>{land.address}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-1/2 pl-4">
                                <h2 className='text-xl font-bold mb-2'>Land Details</h2>
                                <table className='w-full'>
                                    <tbody>
                                        <tr className='border-b'>
                                            <td className='py-2'>Land Size</td>
                                            <td className='py-2'>{land.landSize}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Soil Type</td>
                                            <td className='py-2'>{land.soilType}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Crop Cultivated</td>
                                            <td className='py-2'>{land.cropCultivated}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Agricultural Loan (₹)</td>
                                            <td className='py-2'>{land.agriculturalLoan}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Latitude</td>
                                            <td className='py-2'>{land.latitude}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Longitude</td>
                                            <td className='py-2'>{land.longitude}</td>
                                        </tr>
                                        <tr className='border-b'>
                                            <td className='py-2'>Price of Cultivated Crop:</td>
                                            <td className='py-2'>{land.cropPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="text-red-500" onClick={() => handleDelete(land._id)}><FaTrash/></button>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Landview;
