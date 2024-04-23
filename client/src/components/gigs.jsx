import { DollarOutlined, EnvironmentOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Modal, message } from 'antd';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts'));
    if (savedPosts) {
      setPosts(savedPosts);
      setFilteredPosts(savedPosts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
    setFilteredPosts(posts);
  }, [posts]);

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

  const handleSubmit = () => {
    if (!name.trim() || !subject.trim() || !location.trim() || !description.trim() || !price.trim()) {
      message.error("Please fill in all fields.");
      return;
    }
    const newPost = {
      name: name,
      subject: subject,
      location: location,
      description: description,
      price: price
    };
    setPosts([...posts, newPost]);
    setName("");
    setSubject("");
    setLocation("");
    setDescription("");
    setPrice("");
    setIsModalOpen(false);
  };

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

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-1/2 flex items-center rounded-lg justify-between bg-white mt-5 border border-black shadow-lg h-14">
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

      <div className="w-1/2 mt-5 flex justify-center">
        <Button type="primary" onClick={() => setIsModalOpen(true)} className="flex items-center text-xl">Create Post <PlusOutlined /></Button>
      </div>

      <Modal
        title="Create New Post"
        visible={isModalOpen}
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

      <div className="w-1/2 mt-10 mb-10 gap-4 overflow-auto">
        {filteredPosts.map((post, index) => (
          <Card key={index} className="mb-4 border-black">
            <h1 className="text-2xl font-semibold">Name: {post.name}</h1>
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
  );
}
