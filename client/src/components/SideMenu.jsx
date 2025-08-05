import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleFilterChange = async (e) => {
    const newValue = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("sort", newValue);
    setSearchParams(params, { replace: true });
    await queryClient.invalidateQueries(["posts"]);
    await queryClient.refetchQueries(["posts"]);
  };

  const handleCategoryChange = async (category) => {
    const params = new URLSearchParams(searchParams);
    params.set("cat", category);
    setSearchParams(params, { replace: true });
    await queryClient.invalidateQueries(["posts"]);
    await queryClient.refetchQueries(["posts"]);
  };


  const currentSort = searchParams.get("sort") || "";
  const currentCategory = searchParams.get("cat") || "";

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        {[
          { value: "newest", label: "Newest" },
          { value: "popular", label: "Most Popular" },
          { value: "trending", label: "Trending" },
          { value: "oldest", label: "Oldest" }
        ].map(option => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              checked={currentSort === option.value}
              onChange={handleFilterChange}
              value={option.value}
              className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm bg-white checked:bg-blue-800"
            />
            {option.label}
          </label>
        ))}
      </div>

      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span
          onClick={async () => {
            const params = new URLSearchParams(searchParams);
            params.delete("cat");
            setSearchParams(params, { replace: true });
            await queryClient.invalidateQueries(["posts"]);
            await queryClient.refetchQueries(["posts"]);
          }}
          className={`cursor-pointer ${
            !currentCategory
              ? "underline text-blue-800 font-medium"
              : "underline text-gray-600 hover:text-blue-800"
          }`}
        >
          All Categories
        </span>
        {[
          { value: "web-design", label: "Web Design" },
          { value: "development", label: "Development" },
          { value: "databases", label: "Databases" },
          { value: "seo", label: "Search Engines" },
          { value: "marketing", label: "Marketing" }
        ].map(category => (
          <span
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={`cursor-pointer ${
              currentCategory === category.value
                ? "underline text-blue-800 font-medium"
                : "underline text-gray-600 hover:text-blue-800"
            }`}
          >
            {category.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;