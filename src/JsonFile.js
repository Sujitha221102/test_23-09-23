import React, { useState, useEffect } from "react";
import axios from "axios";
import { add } from './AddSlice';
import { useDispatch, useSelector } from "react-redux";

const JsonFile = () => {
    const [data, setData] = useState([]);
    const selector = useSelector((state) => state.add.value);
    const dispatch = useDispatch();
    const [info, setInfo] = useState(selector);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(`http://localhost:3008/posts`)
            .then((response) => setData(response.data))
            .catch((error) => console.log("error", error.message));
    };

    function handleAdd() {
        setInfo({ id: null, title: "", body: "", buttonClicked: true });
        setUpdating(false)
    }

    function AddData() {
        const newData = {
            id: data.length ? data[data.length - 1].id + 1 : 1,
            title: info.title,
            body: info.body,
        };
        if (!updating) {
            dispatch(add(newData));
            axios.post(`http://localhost:3008/posts`, newData)
                .then((response) => {
                    console.log(response.data)
                    fetchData()
                    setInfo({ id: null, title: "", body: "", buttonClicked: false });
                })
                .catch((error) => console.log("error", error.message));
        } else {
            axios.put(`http://localhost:3008/posts/${info.id}`, newData)
                .then(() => {
                    fetchData();
                    setInfo({ id: null, title: "", body: "", buttonClicked: false });
                })
                .catch((error) => console.log("error", error.message));
        }
    }

    function handleUpdate(id) {
        const editData = data.find(item => item.id === id);
        if (editData) {
            setInfo({
                id: editData.id,
                title: editData.title,
                body: editData.body,
                buttonClicked: true,
            });
            setUpdating(true);
        }
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:3008/posts/${id}`)
            .then(() => {
                const updatedData = data.filter(item => item.id !== id);
                setData(updatedData);
            })
            .catch((error) => console.log("error", error.message));
    }

    return (
        <div>
            <h2>Api Methods</h2>
            <button onClick={handleAdd}>Add New</button>
            {info.buttonClicked ? (
                <div className="form">
                    <h3>{updating ? 'Update' : 'Add'}</h3>
                    <input type='text'
                        placeholder="title"
                        value={info.title}
                        className="input"
                        onChange={(e) => setInfo({ ...info, title: e.target.value })} />
                    <input type='text'
                        placeholder="Body"
                        value={info.body}
                        className="input"
                        onChange={(e) => setInfo({ ...info, body: e.target.value })} />
                    <button onClick={AddData}>{updating ? 'Update' : 'Add'}</button>
                </div>
            ) : (
                <div className="addData">
                    {data.map((item) => (
                        <div key={item.id} className="content">
                            <h3>Id : {item.id}</h3>
                            <h4>Title : {item.title}</h4>
                            <p>Body : {item.body}</p>
                            <div className="contentButton">
                                <button onClick={() => handleUpdate(item.id)}>Update</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JsonFile;


