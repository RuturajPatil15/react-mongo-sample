import React from 'react'

export default function AddListForm({ handleSubmit, handleClose, credentialsTitle, credentialsBody, onChange, credentialsImage, handleImage }) {

    const ModelStyles = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        backgroundColor: '#121214',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        height: '58%',
        width: '42%',
        borderRadius: "15px",

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
            <div style={OverlayStyles}>
                <div className='container' style={ModelStyles}>
                    <form onSubmit={handleSubmit} style={{ width: "100%", padding: "15px 15px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", height: "37px" }} >
                            <h2>Add New List</h2>
                            <button className='btn fs-10' style={{backgroundColor: "lightseagreen"}} onClick={handleClose}>  X  </button>
                        </div>

                        <hr />
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label" >Title</label>
                            <input type="text" className="form-control" name="title" value={credentialsTitle} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="body" className="form-label" >Body</label>
                            <textarea className="form-control" name="body" value={credentialsBody} onChange={onChange} rows="2"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label"  >Image</label>
                            <input type='file' name='image' class="form-control" value={credentialsImage}  accept=".jpeg, .png, .jpg" onChange={handleImage}/>
                        </div>
                        <button type="submit" className="btn m-3" style={{backgroundColor:"lightseagreen"}}>
                            Add Data
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
