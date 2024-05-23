import {
  DollarOutlined,
  EnvironmentOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Card, Divider, Pagination, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../config";
import { useAuth } from "./AuthContext";
import Footer from "./layout/Footer";

export default function Saved() {
  const { userId, isLoggedIn } = useAuth();
  const [input, setInput] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [posts, setPosts] = useState([]);
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
    setBookmarkedPosts((prev) => ({ ...prev, [post.id]: isBookmarked }));
  };

  useEffect(() => {
    posts.forEach((post) => {
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
        const response = await axios.get(
          `${API_URL}/load_saved?user_id=${userId}`,
          {
            params: {
              page: currentPage,
              pageSize: pageSize,
            },
          }
        );
        console.log("hi");
        console.log(response.data);
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const bookmarkPost = async (gigId) => {
    try {
      const response = await axios.post(`${API_URL}/save_gig`, {
        userId,
        gigId,
      });
      if (response.data.message.includes("added")) {
        setBookmarkedPosts((prev) => ({ ...prev, [gigId]: true }));
      } else if (response.data.message.includes("removed")) {
        setBookmarkedPosts((prev) => ({ ...prev, [gigId]: false }));
        setFilteredPosts((prev) => prev.filter((post) => post.id !== gigId));
      }
    } catch (error) {
      console.error(
        "Error saving gigs:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  const checkIfBookmarked = async (gigId, userId) => {
    try {
      const response = await axios.get(
        `${API_URL}/saved_gigs?user_id=${userId}&gig_id=${gigId}`
      );
      return response.data.saved;
    } catch (error) {
      console.error("Error checking if gig is bookmarked:", error);
      return false;
    }
  };

  const handleSearch = () => {
    const keyword = input.trim().toLowerCase();
    const filtered = posts.filter(
      (post) =>
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
        <div className="flex flex-col items-center h-fit">
          <div className="flex items-center justify-between w-9/12 mt-5 bg-white border border-black rounded-lg shadow-lg lg:w-1/2 md:w-9/12 h-14">
            <div className="flex items-center w-full gap-1 ml-4">
              <SearchOutlined />
              <input
                type="text"
                placeholder="Search for saved gigs..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full p-2 text-lg focus:outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="p-2 mr-4 font-medium text-white rounded-lg bg-theme text-m"
            >
              Search
            </button>
          </div>

          <div className="w-9/12 gap-4 mt-10 lg:w-1/2 md:w-9/12">
            {currentPosts.map((post, index) => (
              <Card key={index} className="mb-4 border-black">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-semibold">Name: {post.name}</h1>
                  {isLoggedIn && (
                    <button
                      id={post.id}
                      className="p-2 text-white rounded-md bg-theme"
                      onClick={() => bookmarkPost(post.id)}
                    >
                      {bookmarkedPosts[post.id] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24 "
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                <Divider></Divider>
                <p className="mb-2 text-xl">Subject: {post.subject}</p>
                <p className="mb-2 text-xl">
                  Location:{" "}
                  <span>
                    <EnvironmentOutlined />
                  </span>{" "}
                  {post.location}
                </p>
                <p className="mb-2 text-xl">
                  Price:{" "}
                  <span>
                    <DollarOutlined />
                  </span>{" "}
                  {post.price}
                </p>
                <p className="mb-2 text-xl">Description:</p>
                <p className="pl-5 text-lg">{post.description}</p>
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
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        className="mt-5 mb-5 text-center"
      />
      <Footer />
    </div>
  );
}
