import React, { useEffect, useState } from 'react'
import AddListForm from './AddListForm';
import ListItem from '../components/ListItem';
import Login from './Login'
import Header from '../components/Header'
import Button from '@mui/material/Button';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function Home() {
    let Navigate = useNavigate();
    const [search, setSearch] = useState("")
    const [items, setItems] = useState([]);
    const [image, setImage] = useState({});
    const [uploading, setUploading] = useState(false)
    const [credentials, setcredentials] = useState({ title: "", body: "", image: "" })
    const [editCredentials, seteditCredentials] = useState({ _id: "", title: "", body: "", image: "" })
    const [addSection, setAddSection] = useState(false);
    const [editSection, setEditSection] = useState(false);

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
                toast.success('successfully uploaded !')
            }
        } catch (error) {
            console.log(error)
        }
    }

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
            alert("Enter Valid Credentials")
        }
        console.log(JSON.stringify({ title: credentials.title, body: credentials.body, image: image?.url }))
        getFetchData();
        setcredentials({title: "", body: "", image: ""});
        setImage("");
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = await axios.put("http://localhost:5000/updateData", {
            _id: editCredentials._id,
            title: editCredentials.title,
            body: editCredentials.body,
            image: image?.url
        })
        console.log(data)
        if (data.data.success) {
            getFetchData();
            setEditSection(false)
            alert(data.data.message)
        }
    }

    const handleEdit = async (data) => {
        seteditCredentials(data)
        setEditSection(true)
    }

    const handleDelete = async (id) => {
        const response = await fetch("http://localhost:5000/delete/" + id, {
            method: "delete",
        })
        const json = await response.json();
        if (json.success) {
            getFetchData();
            alert(json.message)
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const editOnChange = (e) => {
        seteditCredentials({ ...editCredentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div>
                <Header />
            </div>

            {(localStorage.getItem("authToken")) ?
                <div>
                    <div style={{ padding: "65px 0" }}>
                        <Paper
                            component="form"
                            sx={{borderRadius: '20px', display: 'flex', alignItems: 'center', width: '100%', backgroundColor: '#e2efee', position: 'fixed',zIndex: 100 }}
                        >
                            <IconButton type="button" sx={{ p: '10px', color: 'black' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 , color: 'gray'}}
                                placeholder="Search..."
                                value={search} onChange={(e) => { setSearch(e.target.value) }}
                            />
                        </Paper>
                        <div style={{ paddingTop: "68px" }}>
                            {
                                items !== "[]"
                                    ? items.filter((item) => (item.title.toLowerCase().includes(search.toLocaleLowerCase())))
                                        .map((data) => {
                                            return (
                                                <div key={data._id} >
                                                    <ListItem Title={data.title}
                                                        Body={data.body}
                                                        Image={data.image}
                                                        Delete={() => handleDelete(data._id)}
                                                        handleEdit={() => { handleEdit(data) }}>
                                                    </ListItem>
                                                    <hr />
                                                </div>
                                            )
                                        })
                                    :
                                    ""
                            }
                        </div>
                        <div className="container" style={{ paddingLeft: "86%", paddingBottom: "11px" }}>
                            <Button color="inherit" onClick={() => { setAddSection(true) }} style={{ width: "10px", fontSize: "26px", color: "white", backgroundColor: "lightseagreen", borderRadius: "30px" }}>
                                +
                            </Button>
                            {
                                addSection && (
                                    <AddListForm
                                        handleSubmit={handleSubmit}
                                        handleClose={() => { setAddSection(false) }}
                                        credentialsTitle={credentials.title}
                                        credentialsBody={credentials.body}
                                        onChange={onChange}
                                        handleImage={handleImage}
                                    />
                                )
                            }
                            {
                                editSection && (
                                    <AddListForm
                                        handleSubmit={handleUpdate}
                                        handleClose={() => { setEditSection(false) }}
                                        credentialsTitle={editCredentials.title}
                                        credentialsBody={editCredentials.body}
                                        onChange={editOnChange}
                                        handleImage={handleImage}
                                    />
                                )
                            }
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
