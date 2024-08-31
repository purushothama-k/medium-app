import axios from "axios";
import { BACKEND_URL } from "../pages/Config";
import { useEffect, useState } from "react";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}
export default function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
}
