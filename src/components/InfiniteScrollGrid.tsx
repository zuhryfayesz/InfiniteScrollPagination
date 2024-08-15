import { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";

interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const InfiniteScrollGrid = () => {
  const [post, setPost] = useState<PostData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const getPosts = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
      .then((res) => {
        post.length === 0
          ? setPost(res.data)
          : setPost((prev) => [...prev, ...res.data]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, [page]);

  const onScrollEnd = () => {
    if (page <= 9) {
      setLoading(true);
      setPage((pre) => pre + 1);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90, sortable: true },
    { field: "userId", headerName: "User ID", width: 150 },
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
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <DataGridPro
        style={{ height: "600px" }}
        onRowsScrollEnd={onScrollEnd}
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
      />
    </>
  );
};

export default InfiniteScrollGrid;
