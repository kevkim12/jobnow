import { LockOutlined, SearchOutlined } from "@ant-design/icons";
import { Pagination, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API_URL from "../config";
import { useAuth } from "./AuthContext";
import GigCard from "./GigCard";
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
      if (!isLoggedIn || !userId) {
        return;
      }

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
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [currentPage, userId, isLoggedIn]);

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
        setPosts((prev) => prev.filter((post) => post.id !== gigId));
        setFilteredPosts((prev) => prev.filter((post) => post.id !== gigId));
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
            <div className="max-w-2xl">
              <p className="eyebrow">Saved gigs</p>
              <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-5xl">
                Your shortlist, cleaned up.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Keep the gigs worth revisiting in one focused workspace.
              </p>
            </div>

            {isLoggedIn && (
              <div className="search-panel mt-8">
                <div className="flex min-h-12 flex-1 items-center gap-2 rounded-md bg-slate-50 px-3">
                  <SearchOutlined className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search saved gigs"
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
            )}
          </div>
        </section>

        <section className="content-wrap py-10">
          {!isLoggedIn ? (
            <div className="surface-card mx-auto max-w-xl p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-slate-950 text-2xl text-teal-300">
                <LockOutlined />
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-950">
                Sign in to view saved gigs.
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Your saved list appears here after you bookmark gigs from the
                marketplace.
              </p>
              <NavLink to="/login" className="primary-action mt-6">
                Login
              </NavLink>
            </div>
          ) : currentPosts.length > 0 ? (
            <div className="grid gap-5">
              {currentPosts.map((post, index) => (
                <GigCard
                  key={post.id || `${post.name}-${index}`}
                  post={post}
                  isLoggedIn={isLoggedIn}
                  isBookmarked={Boolean(bookmarkedPosts[post.id])}
                  onBookmark={bookmarkPost}
                  savedView
                />
              ))}
            </div>
          ) : (
            <div className="surface-card py-16 text-center">
              <p className="text-xl font-black text-slate-950">
                No saved gigs yet.
              </p>
              <p className="mt-2 text-slate-600">
                Bookmark gigs from the marketplace and they will appear here.
              </p>
              <NavLink to="/gigs" className="secondary-action mt-6">
                Browse gigs
              </NavLink>
            </div>
          )}
          {isLoggedIn && (
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={filteredPosts.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} saved gigs`
              }
              className="mt-8 text-center"
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
