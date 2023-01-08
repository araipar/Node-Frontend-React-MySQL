import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TimelineList = () => {
    const [posts, setPost] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [field, setField] = useState("\"createdAt\"");

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const response = await axios.post("http://localhost:5000/postsWithName");
        console.log(response.data[0])
        setPost(response.data[0]);
    };

    const getSortedPosts = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:5000/postsWithName", { SortBy: { field: field, order: order } });
        console.log(response.data[0]);
        setPost(response.data[0]);
    };


    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <Link to={`/`} className="button is-success">
                    Home
                </Link>
                &nbsp;
                <Link to={`timeline`} className="button is-success">
                    Timeline
                </Link>
                <br /><br />
                <form onSubmit={getSortedPosts}>
                    <div className="field">
                        <label className="label">Sort By</label>
                        <div className="control">
                            <div className="select is-halfwidth">
                                <select
                                    value={field}
                                    onChange={(e) => setField(e.target.value)}
                                >
                                    <option value="post">post</option>
                                    <option value="like">like</option>
                                    <option value="name">name</option>
                                    <option value='"createdAt"'>CreatedAt</option>
                                </select>
                            </div>
                            &nbsp;
                            <div className="select is-halfwidth">
                                <select
                                    value={order}
                                    onChange={(e) => setOrder(e.target.value)}
                                >
                                    <option value="ASC">Ascending</option>
                                    <option value="DESC">Descending</option>
                                </select>
                            </div>
                            &nbsp;
                            <button type="submit" className="button is-success">
                                Sort
                            </button>
                        </div>
                    </div>
                </form>

                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Post</th>
                            <th>Likes</th>
                            <th>Posted By</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{post.post}</td>
                                <td>{post.likes}</td>
                                <td>{post.name}</td>
                                <td>{post.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TimelineList;
