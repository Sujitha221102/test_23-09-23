import React, { useState, useEffect } from "react";
import axios from "axios";
import { add } from './AddSlice';
import { useDispatch, useSelector } from "react-redux";

const JsonFile = () => {
    const [data, setData] = useState([]);
    const selector = useSelector((state) => state.add.value);
    const dispatch = useDispatch();
    const [info, setInfo] = useState(selector);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:3030/posts`)
            .then((response) => setData(response.data))
            .catch((error) => console.log("error", error.message));
    };

    function handleAdd() {
        setInfo({ title: "", description: "", buttonClicked: true });
    }

    function AddData() {
        const newData = {
            id:info.id, 
            title: info.title,
            description: info.description,
        };
        dispatch(add(newData));
        setData([...data, newData]);
        setInfo({id:"", title: "", description: "", buttonClicked: false });
        axios.post(`http://localhost:3030/posts`, newData)
            .then((response) => {console.log(response.data)})
            .catch((error) => console.log("error", error.message));
    }

    function handleUpdate(id){
        // axios.put(`http://localhost:3030/posts/${id}`,newData)
        
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:3030/posts/${id}`)
            .then(() => {
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
            })
            .catch((error) => console.log("error", error.message));
    }

    return (
        <div>
            <button onClick={handleAdd}>Add New</button>
            {info.buttonClicked ? (
                <div className="form">
                    <h3>Add</h3>
                    <input type='text'
                        placeholder="id"
                        value={info.id}
                        className="input"
                        onChange={(e) => setInfo({ ...info, id: e.target.value })}/>
                    <input type='text'
                        placeholder="title"
                        value={info.title}
                        className="input"
                        onChange={(e) => setInfo({ ...info, title: e.target.value })}/>
                    <input type='text'
                        placeholder="Description"
                        value={info.description}
                        className="input"
                        onChange={(e) => setInfo({ ...info, description: e.target.value })}/>
                    <button onClick={AddData}>Add</button>
                </div>
            ) : (
                <div>
                    {data.map((item) => (
                        <div key={item.id} className="content">
                            <h3>Id:{item.id}</h3>
                            <h4>Title: {item.title}</h4>
                            <p>Description: {item.description}</p>
                            <button onClick={handleUpdate(item.id)}>Update</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JsonFile;
