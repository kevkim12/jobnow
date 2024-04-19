import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function Gigs() {
  const [input, setInput] = useState("");

  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-1/2 flex items-center rounded-lg justify-between bg-white mt-5 border border-black shadow-lg h-14">
        <div className='ml-4 flex flex-row gap-1 items-center'>
          <SearchOutlined className='pr-0 mr-0' />
          <input
            type="text"
            placeholder="Search Gigs"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="text-lg p-2 focus:outline-none"
          />
        </div>
        <button className="bg-theme text-m mr-4 rounded-lg p-2 text-white font-medium">
          Search
        </button>
      </div>
    </div>
  );
}
