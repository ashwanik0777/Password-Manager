import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("img/crosseye.svg")) {
            ref.current.src = "img/eye.svg"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "img/crosseye.svg"
            passwordRef.current.type = "text"
        }
    }
    const savePassword = () => {
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setform({ site: "", username: "", password: "" })
        toast('Password saved!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const deletePassword = (id) => {
        let c = confirm("Do you agree to delete password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        toast('Password deleted!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('🦄 Copied to clipboard!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="mycontainer lg:min-h-[85vh] min-h-[87.5vh]">
                <div className='font-bold text-4xl text-center'>
                    <span className='text-green-700 '>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP&gt;</span>
                </div>
                <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} name='site' className='rounded-full border border-green-400 px-4 py-1.5 text-black w-full' type="text" placeholder="Enter Website Name or URL" id='site' />
                    <div className='flex md:flex-row flex-col w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} name='username' className='rounded-full border border-green-400 px-4 py-1.5 text-black w-full' type="text" placeholder='Enter the user name' id='username' />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} name='password' className='rounded-full border border-green-400 px-4 py-1.5 text-black w-full' type="password" placeholder="Enter password" id='password' />
                            <span className='absolute top-0 right-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1.5 w-9' src="img/eye.svg" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-500 rounded-full py-2 px-8 w-fit border border-green-800'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save </button>
                </div>
                <div className="passwords">
                    <h2 className='text-xl font-semibold my-5'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="w-full text-sm text-left relative shadow-md rounded-lg overflow-hidden">
                        <thead className="text-xs text-white uppercase bg-green-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Site
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Password
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-green-100">
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <th scope="row" className="flex items-center justify-center px-6 py-4 cursor-pointer" onClick={() => { copyText(item.site) }}>
                                        <a href={item.site} target='_blank'>{item.site}</a>
                                        <lord-icon
                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            trigger="hover" >
                                        </lord-icon>
                                    </th>
                                    <td className="px-6 py-4 ">
                                        <div className='flex items-center justify-center cursor-pointer' onClick={() => { copyText(item.username) }}>{item.username}
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        <div className='flex items-center justify-center cursor-pointer' onClick={() => { copyText(item.password) }}>{item.password}
                                            <lord-icon
                                                style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover" >
                                            </lord-icon>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 ">
                                        <div className='flex justify-center gap-2'>
                                            <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </div>
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
