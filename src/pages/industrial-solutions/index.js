import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/IndustrialSolutions.module.css";
import FilterBar from "@/components/industrial/FilterBar";
import SolutionCard from "@/components/industrial/SolutionCard";

export default function IndustrialSolutions() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    searchQuery: "",
  });

  useEffect(() => {
    async function fetchSolutions() {
      try {
        setLoading(true);
        // 嘗試從 API 獲取數據
        try {
          const res = await fetch(
            `/api/industrial-solutions?category=${filters.category}&search=${filters.searchQuery}`
          );

          if (res.ok) {
            const data = await res.json();
            setSolutions(data);
            setLoading(false);
            return; // 如果 API 成功，提前返回
          }
        } catch (apiError) {
          console.log("API 尚未就緒，使用模擬數據", apiError);
        }

        // 如果 API 不可用，使用模擬數據
        const demoData = [
          {
            id: 1,
            title: "智能工廠生產線自動化解決方案",
            category: "自動化",
            shortDescription: "通過AI和物聯網技術提高生產效率和產品質量",
            imageUrl: "/images/solution1.jpg",
            author: "張工程師",
            date: "2025-03-10",
          },
          {
            id: 2,
            title: "工業廢水處理智能監控系統",
            category: "環保科技",
            shortDescription: "實時監控和優化工業廢水處理過程，降低環境影響",
            imageUrl: "/images/solution2.jpg",
            author: "李環保",
            date: "2025-03-05",
          },
          {
            id: 3,
            title: "工業設備預測性維護系統",
            category: "設備維護",
            shortDescription: "利用機器學習預測設備故障，減少停機時間",
            imageUrl: "/images/solution3.jpg",
            author: "王維護",
            date: "2025-02-28",
          },
        ];

        // 根據篩選條件過濾模擬數據
        let filteredData = [...demoData];

        if (filters.category !== "all") {
          filteredData = filteredData.filter(
            (item) => item.category === filters.category
          );
        }

        if (filters.searchQuery) {
          const query = filters.searchQuery.toLowerCase();
          filteredData = filteredData.filter(
            (item) =>
              item.title.toLowerCase().includes(query) ||
              item.shortDescription.toLowerCase().includes(query)
          );
        }

        setSolutions(filteredData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchSolutions();
  }, [filters]);

  // 處理過濾器變更
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>工業科技解決方案 | MARS LAB</title>
        <meta
          name="description"
          content="探索創新的工業科技解決方案，提升您的業務效率和競爭力"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>工業科技解決方案</h1>
          <p className={styles.description}>
            探索由工程專家設計的前沿工業科技解決方案，助力企業數字化轉型和技術升級
          </p>
          <Link
            href="/industrial-solutions/submit"
            className={styles.submitButton}
          >
            提交您的方案
          </Link>
        </div>

        <FilterBar
          onFilterChange={handleFilterChange}
          currentFilters={filters}
        />

        {loading ? (
          <div className={styles.loading}>加載中...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.grid}>
            {solutions.length > 0 ? (
              solutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))
            ) : (
              <div className={styles.noResults}>未找到匹配的解決方案</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
