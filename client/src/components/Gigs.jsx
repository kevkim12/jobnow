import { DollarOutlined, EnvironmentOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Modal, Pagination, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import API_URL from '../config';
import { useAuth } from './AuthContext';
import Footer from './layout/Footer';

export default function Gigs() {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [price, setPrice] = useState("");
  const [error, setError] = useState('');
  const { userId, isLoggedIn } = useAuth();
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredPosts.length);
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchBookmarkStatus = async (post) => {
    const isBookmarked = await checkIfBookmarked(post.id, userId);
    setBookmarkedPosts(prev => ({ ...prev, [post.id]: isBookmarked }));
  };

  useEffect(() => {
    posts.forEach(post => {
      fetchBookmarkStatus(post);
    });
  }, [posts]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts) {
      setPosts(savedPosts);
      setFilteredPosts(savedPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/gigs`, {
          params: {
            page: currentPage,
            pageSize: pageSize,
          },
        });
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        message.error("Error fetching posts");
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !subject.trim() || !location.trim() || !description.trim() || !price.trim()) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/gigs`, { name, subject, location, price, description });
      const newPost = {
        name,
        subject,
        location,
        description,
        price
      };
      setPosts([...posts, newPost]);
      setName("");
      setSubject("");
      setLocation("");
      setDescription("");
      setPrice("");
      setIsModalOpen(false);
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data.error : "Create post failed";
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  const bookmarkPost = async (gigId) => {
    try {
      const response = await axios.post(`${API_URL}/save_gig`, { userId, gigId });
      if (response.data.message.includes("added")) {
        setBookmarkedPosts(prev => ({ ...prev, [gigId]: true }));
      } else if (response.data.message.includes("removed")) {
        setBookmarkedPosts(prev => ({ ...prev, [gigId]: false }));
      }
    } catch (error) {
      console.error("Error saving gigs:", error.response ? error.response.data.error : error.message);
    }
  };

  const checkIfBookmarked = async (gigId, userId) => {
    try {
      const response = await axios.get(`${API_URL}/saved_gigs?user_id=${userId}&gig_id=${gigId}`);
      return response.data.saved;
    } catch (error) {
      console.error("Error checking if gig is bookmarked:", error);
      return false;
    }
  }

  const handleSearch = () => {
    const keyword = input.trim().toLowerCase();
    const filtered = posts.filter(post =>
      post.name.toLowerCase().includes(keyword) ||
      post.subject.toLowerCase().includes(keyword) ||
      post.location.toLowerCase().includes(keyword) ||
      post.description.toLowerCase().includes(keyword) ||
      post.price.toLowerCase().includes(keyword)
    );

    if (filtered.length === 0) {
      message.error("No results found.");
    }

    setFilteredPosts(filtered);
  };

  return (
    <div>
      <div className="h-screen overflow-auto">
        <div className="h-fit flex flex-col items-center">
          <div className="lg:w-1/2 md:w-9/12 w-9/12 flex items-center rounded-lg justify-between bg-white mt-5 border border-black shadow-lg h-14">
            <div className="w-full ml-4 flex gap-1 items-center">
              <SearchOutlined />
              <input
                type="text"
                placeholder="Search for gigs..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="w-full text-lg p-2 focus:outline-none"
              />
            </div>
            <button onClick={handleSearch} className="bg-theme text-m mr-4 rounded-lg p-2 text-white font-medium">
              Search
            </button>
          </div>
          <div className="w-1/2 mt-5 flex justify-center">
            <Button type="primary" onClick={() => setIsModalOpen(true)} className="flex items-center text-xl">Create Post <PlusOutlined /></Button>
          </div>
          <Modal
            title="Create New Post"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            className="text-center underline underline-offset-4"
            footer={[
              <Button key="cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleSubmit}>
                Create
              </Button>,
            ]}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={handleNameChange}
              className="text-lg p-2 mb-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={handleSubjectChange}
              className="text-lg p-2 mb-2 w-full"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={handleLocationChange}
              className="text-lg p-2 mb-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={handlePriceChange}
              className="text-lg p-2 mb-2 w-full"
              pattern='[0-9]+'
              min='0'
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
              className="text-lg p-2 mb-2 w-full h-28"
              required
            ></textarea>
          </Modal>
          <div className="lg:w-1/2 md:w-9/12 w-9/12 mt-5 gap-4">
            {currentPosts.map((post, index) => (
              <Card key={index} className="mb-4 border-black">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-2xl font-semibold">Name: {post.name}</h1>
                  {isLoggedIn && (
                    <button id={post.id} className=" bg-theme text-white p-2 rounded-md" onClick={() => bookmarkPost(post.id)}>
                      {bookmarkedPosts[post.id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6">
                          <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24 "
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
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
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={filteredPosts.length}
        pageSize={pageSize}
        onChange={handlePageChange}
        showQuickJumper
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        className="mt-5 mb-5 text-center"
      />
      <Footer />
    </div>
  );
}