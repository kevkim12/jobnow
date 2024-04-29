//Component worked on by Mohamed Dirie

import { DollarOutlined, EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import { Card, Divider } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export default function Saved() {
    const { userId, isLoggedIn } = useAuth();
    const [input, setInput] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState({});

    // Fetches bookmark status for each post
    const fetchBookmarkStatus = async (post) => {
        const isBookmarked = await checkIfBookmarked(post.id, userId);
        setBookmarkedPosts(prev => ({ ...prev, [post.id]: isBookmarked }));
    };

    // Fetches bookmark status for all posts when posts state changes
    useEffect(() => {
        posts.forEach(post => {
            fetchBookmarkStatus(post);
        });
    }, [posts]);

    // Loads saved posts from local storage
    useEffect(() => {
        const savedPosts = JSON.parse(localStorage.getItem("posts"));
        if (savedPosts) {
            setPosts(savedPosts);
            setFilteredPosts(savedPosts);
        }
    }, []);

    // Updates local storage and filters posts when posts state changes
    useEffect(() => {
        localStorage.setItem("posts", JSON.stringify(posts));
        setFilteredPosts(posts);
    }, [posts]);

    // Fetches all saved posts from the server based on currently logged in user
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/load_saved?user_id=${userId}`);
                console.log("hi")
                console.log(response.data)
                setPosts(response.data);
                setFilteredPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    // Bookmarks a specific post
    const bookmarkPost = async (gigId) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/save_gig", { userId, gigId });
            if (response.data.message.includes("added")) {
                setBookmarkedPosts(prev => ({ ...prev, [gigId]: true }));
            } else if (response.data.message.includes("removed")) {
                setBookmarkedPosts(prev => ({ ...prev, [gigId]: false }));
                setFilteredPosts(prev => prev.filter(post => post.id !== gigId));
            }
        } catch (error) {
            console.error("Error saving gigs:", error.response ? error.response.data.error : error.message);
        }
    };

    // Checks if a specific post is bookmarked or not
    const checkIfBookmarked = async (gigId, userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/saved_gigs?user_id=${userId}&gig_id=${gigId}`);
            return response.data.saved;
        } catch (error) {
            console.error("Error checking if gig is bookmarked:", error);
            return false;
        }
    }

    // Handles search based on input value and keywords in posts
    const handleSearch = () => {
        const keyword = input.trim().toLowerCase();
        const filtered = posts.filter(post =>
            post.name.toLowerCase().includes(keyword) ||
            post.subject.toLowerCase().includes(keyword) ||
            post.location.toLowerCase().includes(keyword) ||
            post.description.toLowerCase().includes(keyword) ||
            post.price.toLowerCase().includes(keyword)
        );
        setFilteredPosts(filtered);
    };

    // Returns the UI for the Saved Gigs page
    return (
        <div className="h-86.7 overflow-auto">
            <div className="h-fit flex flex-col items-center">
                <div
                    className="w-1/2 flex items-center rounded-lg justify-between bg-white mt-5 border border-black shadow-lg h-14">
                    <div className="ml-4 flex gap-1 items-center">
                        <SearchOutlined />
                        <input
                            type="text"
                            placeholder="Search Gigs"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="text-lg p-2 focus:outline-none"
                        />
                    </div>
                    <button onClick={handleSearch} className="bg-theme text-m mr-4 rounded-lg p-2 text-white font-medium">
                        Search
                    </button>
                </div>

                <div className="w-1/2 mt-10 mb-10 gap-4 overflow-auto">
                    {filteredPosts.map((post, index) => (
                        <Card key={index} className="mb-4 border-black">
                            <div className="flex justify-between items-center mb-2">
                                <h1 className="text-2xl font-semibold">Name: {post.name}</h1>
                                {isLoggedIn && (
                                    <button id={post.id} className=" bg-theme text-white p-2 rounded-md"
                                        onClick={() => bookmarkPost(post.id)}>
                                        {bookmarkedPosts[post.id] ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="w-6 h-6">
                                                <path fillRule="evenodd"
                                                    d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24 "
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                            </svg>)}
                                    </button>
                                )}
                            </div>

                            <Divider></Divider>
                            <p className="text-xl mb-2">Subject: {post.subject}</p>
                            <p className="text-xl mb-2">Location: <span><EnvironmentOutlined /></span> {post.location}</p>
                            <p className="text-xl mb-2">Price: <span><DollarOutlined /></span> {post.price}</p>
                            <p className="text-xl mb-2">Description:</p>
                            <p className="text-lg pl-5">{post.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}