import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function AddListForm() {

    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const [credentials, setcredentials] = useState({ title: "", body: "", image: "" })
    const [addSection, setAddSection] = useState(false);

    const handleImage = async (e) => {
        const file = e.target.files[0]
        let formData = new FormData();
        formData.append('image', file)
        setUploading(true)
        try {
            const { data } = await axios.post("http://localhost:5000/uploadImage", formData)
            setUploading(false)
            setImage({
                url: data.url,
                public_id: data.public_id
            })
            console.log(data)
            if (uploading === false) {
                toast.success('successfully uploaded')
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/createdata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: credentials.title, body: credentials.body, image: image?.url })
        })
        const json = await response.json()
        console.log(json);

        if (json.success) {
            setAddSection(false)
            alert(json.message)
        } else {
            alert("Fill The Details")
        }
        //json.stringfy ka use karke dekha data aa raha hai kya
        console.log(JSON.stringify({ email: credentials.email, password: credentials.password, image: image?.url }))
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    
    const ModelStyles = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        backgroundColor: '#121214',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        height: '60%',
        width: '45%',
        borderRadius: "25px",

    }
    const OverlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }
    return (
        <>
            <div className="container" style={{paddingLeft: "80%", paddingBottom: "11px"}}>
                <Button color="inherit" className='bg-success' style={{width: "100px"}} onClick={() => { setAddSection(true) }}>
                    ADD LIST
                </Button>
                {
                    addSection && (
                        <div style={OverlayStyles}>
                            <div className='container' style={ModelStyles}>
                                <form onSubmit={handleSubmit} style={{ width: "100%", padding: "10px 10px" }}>
                                    {/* <form > */}

                                    <button className='btn bg-success fs-6' style={{ marginLeft: "93%", marginTop: "-20px" }} onClick={() => { setAddSection(false) }}>
                                        X
                                    </button>
                                    <h1>Add New List</h1>
                                    <hr />
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label" >Title</label>
                                        <input type="text" className="form-control" name="title" value={credentials.title} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="body" className="form-label" >Body</label>
                                        <textarea className="form-control" name="body" value={credentials.body} onChange={onChange} rows="2"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label"  >Post Image</label>
                                        <input type='file' name='image' class="form-control" accept=".jpeg, .png, .jpg" onChange={handleImage} />
                                    </div>
                                    <button type="submit" className="m-3 btn btn-success">
                                        Add Data
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                }
                  {
                    addSection && (
                        <div style={OverlayStyles}>
                            <div className='container' style={ModelStyles}>
                                <form onSubmit={handleSubmit} style={{ width: "100%", padding: "10px 10px" }}>
                                    {/* <form > */}

                                    <button className='btn bg-success fs-6' style={{ marginLeft: "93%", marginTop: "-20px" }} onClick={() => { setAddSection(false) }}>
                                        X
                                    </button>
                                    <h1>Add New List</h1>
                                    <hr />
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label" >Title</label>
                                        <input type="text" className="form-control" name="title" value={credentials.title} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="body" className="form-label" >Body</label>
                                        <textarea className="form-control" name="body" value={credentials.body} onChange={onChange} rows="2"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label"  >Post Image</label>
                                        <input type='file' name='image' class="form-control" accept=".jpeg, .png, .jpg" onChange={handleImage} />
                                    </div>
                                    <button type="submit" className="m-3 btn btn-success">
                                        Add Data
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}












import React, { useEffect, useState } from 'react'
import AddListForm from './AddListForm';
import ListItem from '../components/ListItem';
import Login from './Login'
import Header from '../components/Header'
import ListSubheader from '@mui/material/ListSubheader';

export default function Home() {
    const [items, setItems] = useState([]);

    const getFetchData = async () => {
        const response = await fetch("http://localhost:5000/ListAllData", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const json = await response.json();
        setItems(json.data);
        // console.log(json.data)
    }
    useEffect(() => {
        getFetchData();
    }, [])
    // console.log(items)

    const handleDelete = async (id) => {
        const response = await fetch("http://localhost:5000/delete/"+ id, {
            method: "delete",
        })
        const json = await response.json();
        if (json.success) {
            getFetchData();
            alert(json.message)
        }
    }
    return (
        <div>
            <div>
                <Header />
            </div>

            {(localStorage.getItem("authToken")) ?
                <div>
                    <div style={{ backgroundColor: "", marginTop: "100px" }}>
                        <ListSubheader className='fs-4 bg-success' style={{ position: "fixed", marginTop: "64px", width: "100%" }}>Todo List</ListSubheader>
                        <hr />

                        <div>
                            {
                                items !== "[]"
                                    ? items.map((data) => {
                                        return (
                                            <div key={data._id} >
                                                <ListItem Title={data.title}
                                                    Body={data.body}
                                                    Image={data.image}
                                                    Delete={() => handleDelete(data._id)}>
                                                </ListItem>
                                                <hr />
                                            </div>
                                        )
                                    })
                                    :
                                     ""
                            }
                        </div>
                        <div>
                            <AddListForm />
                        </div>
                    </div>
                </div>
                :
                <div>
                     <Login />
               </div>
            }
        </div>
    )
}
