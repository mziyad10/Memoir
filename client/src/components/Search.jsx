import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newParams = new URLSearchParams(searchParams);

      if (searchTerm.trim()) {
        newParams.set("search", searchTerm.trim());
      } else {
        newParams.delete("search");
      }

      if (location.pathname === "/posts") {
        navigate(`?${newParams.toString()}`, { replace: true });
      } else {
        navigate(`/posts?${newParams.toString()}`);
      }

      // Refresh posts
      await queryClient.invalidateQueries("posts");
      queryClient.refetchQueries("posts");
    }
  };

  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="search a post..."
        className="bg-transparent"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default Search;
