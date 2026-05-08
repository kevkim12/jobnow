import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Pagination, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../config";
import { useAuth } from "./AuthContext";
import GigCard from "./GigCard";
import Footer from "./layout/Footer";

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
  const [error, setError] = useState("");
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

  useEffect(() => {
    if (!isLoggedIn || !userId) {
      return;
    }

    let isCurrent = true;

    const fetchBookmarkStatuses = async () => {
      const entries = await Promise.all(
        posts
          .filter((post) => post.id)
          .map(async (post) => {
            try {
              const response = await axios.get(
                `${API_URL}/saved_gigs?user_id=${userId}&gig_id=${post.id}`
              );
              return [post.id, response.data.saved];
            } catch (error) {
              console.error("Error checking if gig is bookmarked:", error);
              return [post.id, false];
            }
          })
      );

      if (isCurrent) {
        setBookmarkedPosts((prev) => ({
          ...prev,
          ...Object.fromEntries(entries),
        }));
      }
    };

    fetchBookmarkStatuses();

    return () => {
      isCurrent = false;
    };
  }, [posts, userId, isLoggedIn]);

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

  const handleSubmit = async () => {
    if (
      !name.trim() ||
      !subject.trim() ||
      !location.trim() ||
      !description.trim() ||
      !price.trim()
    ) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/gigs`, {
        name,
        subject,
        location,
        price,
        description,
      });
      const newPost = {
        name,
        subject,
        location,
        description,
        price,
      };
      setPosts([...posts, newPost]);
      setName("");
      setSubject("");
      setLocation("");
      setDescription("");
      setPrice("");
      setError("");
      setIsModalOpen(false);
      return response.data;
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.error
        : "Create post failed";
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  const bookmarkPost = async (gigId) => {
    if (!gigId) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/save_gig`, {
        userId,
        gigId,
      });
      if (response.data.message.includes("added")) {
        setBookmarkedPosts((prev) => ({ ...prev, [gigId]: true }));
      } else if (response.data.message.includes("removed")) {
        setBookmarkedPosts((prev) => ({ ...prev, [gigId]: false }));
      }
    } catch (error) {
      console.error(
        "Error saving gigs:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  const handleSearch = () => {
    const keyword = input.trim().toLowerCase();

    if (!keyword) {
      setFilteredPosts(posts);
      setCurrentPage(1);
      return;
    }

    const filtered = posts.filter((post) =>
      [
        post.name,
        post.subject,
        post.location,
        post.description,
        post.price,
      ].some((value) => String(value ?? "").toLowerCase().includes(keyword))
    );

    if (filtered.length === 0) {
      message.error("No results found.");
    }

    setFilteredPosts(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="page-shell">
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="content-wrap py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">Quick gigs</p>
                <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">
                  Find flexible work nearby.
                </h1>
                <p className="mt-4 text-lg leading-8 text-slate-600">
                  Search one-off jobs, local tasks, and short projects posted
                  by people who need help now.
                </p>
              </div>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalOpen(true)}
                className="!h-12 !rounded-md !bg-teal-500 !px-5 !font-black !text-slate-950 hover:!bg-teal-400"
              >
                Create post
              </Button>
            </div>

            <div className="search-panel mt-8">
              <div className="flex min-h-12 flex-1 items-center gap-2 rounded-md bg-slate-50 px-3">
                <SearchOutlined className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search gigs by title, location, name, or price"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="search-input"
                />
              </div>
              <button onClick={handleSearch} className="primary-action">
                <SearchOutlined />
                Search
              </button>
            </div>
          </div>
        </section>

        <Modal
          title="Create a gig"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleSubmit}>
              Create
            </Button>,
          ]}
        >
          <div className="grid gap-3 pt-2">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field-input"
              required
            />
            <input
              type="text"
              placeholder="Gig title"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="field-input"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="field-input"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="field-input"
              pattern="[0-9]+"
              min="0"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field-input min-h-32"
              required
            />
          </div>
        </Modal>

        <section className="content-wrap py-10">
          {error && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}
          {currentPosts.length > 0 ? (
            <div className="grid gap-5">
              {currentPosts.map((post, index) => (
                <GigCard
                  key={post.id || `${post.name}-${index}`}
                  post={post}
                  isLoggedIn={isLoggedIn}
                  isBookmarked={Boolean(bookmarkedPosts[post.id])}
                  onBookmark={bookmarkPost}
                />
              ))}
            </div>
          ) : (
            <div className="surface-card py-16 text-center">
              <p className="text-xl font-black text-slate-950">
                No gigs to show yet.
              </p>
              <p className="mt-2 text-slate-600">
                Try a different search or create the first post.
              </p>
            </div>
          )}
          <Pagination
            defaultCurrent={1}
            current={currentPage}
            total={filteredPosts.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showQuickJumper
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} gigs`
            }
            className="mt-8 text-center"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
