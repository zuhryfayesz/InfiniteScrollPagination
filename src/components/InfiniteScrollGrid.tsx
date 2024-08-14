import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import axios from "axios";

interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const InfiniteScrollGrid = () => {
  const [post, setPost] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<Boolean>(true);

  const getPosts = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
      .then((res) => {
        post.length === 0 ? setPost(res.data) : setPost((prev) => [...prev, ...res.data])
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  const handleScroll = () => {
    console.log("Height : ", document.documentElement.scrollHeight);
    console.log("Top : ", document.documentElement.scrollTop);
    console.log("Window : ", window.innerHeight);

    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((pre) => pre + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90, sortable: true },
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "body", headerName: "Body", width: 150 },
  ];

  const rows = post.map((row: PostData) => ({
    id: row.id,
    userId: row.userId,
    title: row.title,
    body: row.body,
  }));

  return (
    <>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        hideFooterPagination
      />
      {loading && <div>Loading ...</div>}
    </>
  );
};

export default InfiniteScrollGrid;
