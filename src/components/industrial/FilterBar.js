import { useState } from "react";
import styles from "@/styles/IndustrialSolutions.module.css";

export default function FilterBar({ onFilterChange, currentFilters }) {
  const [searchInput, setSearchInput] = useState(
    currentFilters.searchQuery || ""
  );

  const categories = [
    { value: "all", label: "所有類別" },
    { value: "自動化", label: "自動化" },
    { value: "人工智能", label: "人工智能" },
    { value: "物聯網", label: "物聯網" },
    { value: "機器人", label: "機器人" },
    { value: "環保科技", label: "環保科技" },
    { value: "能源優化", label: "能源優化" },
    { value: "設備維護", label: "設備維護" },
    { value: "智能製造", label: "智能製造" },
    { value: "其他", label: "其他" },
  ];

  const handleCategoryChange = (e) => {
    onFilterChange({ category: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ searchQuery: searchInput });
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterSection}>
        <label htmlFor="categoryFilter" className={styles.filterLabel}>
          按類別篩選:
        </label>
        <select
          id="categoryFilter"
          className={styles.categorySelect}
          value={currentFilters.category}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="搜索解決方案..."
        />
        <button type="submit" className={styles.searchButton}>
          搜索
        </button>
      </form>
    </div>
  );
}
