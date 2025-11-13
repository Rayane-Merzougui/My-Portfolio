import { useEffect, useState } from "react";
import api from "../lib/api.js";

export default function Home() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  useEffect(() => {
    api.get("/articles", { params: { page } }).then(({ data }) => {
      setItems(data.items);
      setTotalPages(data.totalPages);
    });
  }, [page]);

  return (
    <div className="home">
      <h1>Articles</h1>
      <ul className="articles">
        {items.map((a) => (
          <li key={a.id} className="article">
            <div className="meta">
              <img
                className="mini-avatar"
                src={
                  a.avatar_url
                    ? `http://localhost:8000${a.avatar_url}`
                    : "https://via.placeholder.com/24"
                }
              />
              <span className="author">{a.author_name}</span>
              <span className="date">
                {new Date(a.created_at).toLocaleDateString()}
              </span>
            </div>
            <h3>{a.title}</h3>
            <p>{a.body}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          Précédent
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
