import { useState } from "react";
import Appbar from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "./Config";
import { useNavigate } from "react-router-dom";

export default function Publish() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handlePost() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    navigate(`/blog/${response.data.id}`);
  }

  return (
    <>
      <Appbar />

      <div className="  flex justify-center p-9">
        <div className="max-w-4xl  w-full ">
          <div className="mb-6">
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title..."
              type="text"
              id="large-input"
              className=" block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 "
            />
          </div>

          <div>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              rows={9}
              placeholder="Content.."
              id="default-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <button
            onClick={handlePost}
            className=" mt-6 px-4 py-1 text-white rounded-md bg-black"
          >
            New Blog
          </button>
        </div>
      </div>
    </>
  );
}
