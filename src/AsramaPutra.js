import "./Layout.css";
import React, { useState, useEffect } from 'react';

import DelIcon from "./asset/garbage_535195.png";

function Layout() {
    const [data, setData] = useState([]);
    const [field, setField] = useState({
        string: "",
        link: "",
        collection: "asramaputra"
    });

    const fetchAll = () => {
        const url = "https://linkmanager.vercel.app/getAll/asramaputra";
        fetch(url)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = "https://linkmanager.vercel.app/addLink";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(field),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
        fetchAll();
    };

    const handleChange = (event) => {
        setField({
            ...field,
            [event.target.name]: event.target.value,
        });
    };

    const handleDelete = (id) => {
        const url = "https://linkmanager.vercel.app/deleteLink/asramaputra/" + id;
        console.log(url);
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => console.log(response))
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    useEffect(() => {
        fetchAll();
    }, [data]);

    return (
        <div className="Layout">
            {/* <div className="bg-ap"></div> */}
            <h1>LINK PENTINGGGGG ASKSKSKS</h1>
            {data === undefined || data.length === 0 ? (
                null
            ) : (
                data.map((item) => (
                    <div className="items">
                        <div className="link">
                            <a href={item.data.link}>{item.data.string}</a>
                        </div>
                        <div className="delete" onClick={() => handleDelete(item.id)}>
                            <img src={DelIcon} alt="delete" />
                        </div>
                    </div>
                )
            ))}
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="string"
                        placeholder="Nama Link"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        name="link"
                        placeholder="Link"
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Layout;