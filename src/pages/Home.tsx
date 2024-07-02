import { useTitle } from "../hooks/useTitle";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

interface User {
    _id: string;
    firstname: string;
    lastname: string;
    tel: string;
    email: string;
    sex: string;
}

export const Home: React.FC = () => {
    useTitle(`Home 🏠`)
    const [, setLocation] = useLocation()
    const baseURL = "http://localhost:3000/users"
    const [users, setUsers] = useState<User[]>([]);

    const showAlert = (id: string, name: string) => {
        Swal.fire({
            title: 'Do You Want Delete User!',
            html: 'If Delete User :: <span class="text-teal-600">' + name + '</span>. <p>ID :: ' + id +'</p>',
            icon: 'warning', // Can be 'success', 'error', 'warning', 'info', 'question'
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancle'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(id)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                console.log("Your file is safe. File Is Not Delete!")
            }
        });
    };

    const deleteData = async (id: string) => {
        try {
            const response = await axios.delete(baseURL + "/" + id);
            console.log('Data DELETE ID :: ' + id + 'successfully:', response.data);
            // alert("DELETE SUCCESS!!!");
            getDataList()
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    const getDataList = () => {
        axios.get(baseURL).then((res) => {
            setUsers(res.data)
            console.log(res.data)
        })
    };

    useEffect(() => {
        getDataList()
    },[])

    return (
        <div className="flex flex-col items-center min-h-screen bg-neutral-500 p-4">
            <h1 className="text-white text-3xl font-bold font-mono text-center mt-4">
                React CRUD :: Users
            </h1>

            <div className="w-5/6 p-2 mt-2 text-end">
                <button onClick={() => setLocation(`/addform`) } className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-md">
                    ADD
                </button>
            </div>

            <div className="w-5/6 p-2 m-2">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Telephone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    SEX
                                </th>
                                <th scope="col" className="px-6 py-3 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                                    </svg>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th className="px-6 py-4 font-cold">
                                        {index + 1}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button onClick={() => setLocation(`/userDetail`) }>{user?.firstname} {user?.lastname}</button>
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.tel}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.sex}
                                    </td>
                                    <td className="px-6 py-4 flex justify-center items-center">
                                        <button onClick={() => setLocation(`/editform/${user._id}`) } className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3">Edit</button>
                                        <button onClick={() => showAlert(`${user._id}`,`${user.firstname}`)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-3">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}