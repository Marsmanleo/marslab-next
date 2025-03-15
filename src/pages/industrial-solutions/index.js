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

  const [apiStatus, setApiStatus] = useState({
    attempted: false,
    success: false,
    endpoint: "",
    error: null,
  });

  async function fetchSolutions() {
    try {
      setLoading(true);

      // 默認API端點
      let apiEndpoint = "/api/industrial-solutions.php";

      // 嘗試從環境變量獲取API端點
      if (process.env.NEXT_PUBLIC_API_ENDPOINT) {
        apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
      }

      // 嘗試從 API 獲取數據
      try {
        console.log("正在請求API數據...");
        const apiUrl = `${apiEndpoint}?category=${filters.category}&search=${filters.searchQuery}`;
        console.log("API URL:", apiUrl);

        setApiStatus((prev) => ({
          ...prev,
          attempted: true,
          endpoint: apiUrl,
        }));

        const res = await fetch(apiUrl);
        console.log("API響應狀態:", res.status);

        if (res.ok) {
          const data = await res.json();
          console.log("API 完整返回數據:", data);

          setApiStatus((prev) => ({ ...prev, success: true, error: null }));

          // 確保我們處理的是正確的數據結構
          if (data && data.success && data.data) {
            console.log("使用data.data結構:", data.data);
            setSolutions(data.data);
          } else {
            console.log("使用舊數據格式:", data);
            setSolutions(data); // 兼容舊格式
          }
          console.log(
            "處理後的解決方案數據:",
            Array.isArray(data.data ? data.data : data)
              ? data.data
                ? data.data
                : data
              : "非數組數據"
          );
          setLoading(false);

          // 添加前端調試信息
          document.title = `工業科技解決方案 (${data.data ? data.data.length : 0})`;

          return; // 如果 API 成功，提前返回
        } else {
          console.log("API 響應錯誤:", res.status);
          const errorText = await res.text();
          console.log("錯誤詳情:", errorText);

          setApiStatus((prev) => ({
            ...prev,
            success: false,
            error: `API返回錯誤: ${res.status}, ${errorText}`,
          }));
        }
      } catch (apiError) {
        console.log("API 調用異常:", apiError);
        setApiStatus((prev) => ({
          ...prev,
          success: false,
          error: `API調用異常: ${apiError.message}`,
        }));
      }

      // 如果 API 不可用，使用模擬數據
      console.log("回退到模擬數據");
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

      console.log("使用的模擬數據:", filteredData);
      setSolutions(filteredData);
      setLoading(false);
    } catch (err) {
      console.log("fetchSolutions總體錯誤:", err);
      setError(err.message);
      setLoading(false);
    }
  }

  // 頁面加載時
  useEffect(() => {
    // 檢查是否需要強制刷新數據
    const needRefresh = localStorage.getItem("refreshSolutions") === "true";
    if (needRefresh) {
      console.log("檢測到新提交的數據，正在刷新列表...");
      localStorage.removeItem("refreshSolutions");
    }

    fetchSolutions();
  }, []);

  // 過濾器變更時
  useEffect(() => {
    fetchSolutions();
  }, [filters]);

  // 處理過濾器變更
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // 手動刷新數據
  const handleRefresh = () => {
    console.log("手動刷新數據");
    fetchSolutions();
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
          <div className={styles.actions}>
            <Link
              href="/industrial-solutions/submit"
              className={styles.submitButton}
            >
              提交您的方案
            </Link>
            <button onClick={handleRefresh} className={styles.refreshButton}>
              刷新數據
            </button>
          </div>
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
          <>
            <div className={styles.grid}>
              {solutions.length > 0 ? (
                solutions.map((solution) => (
                  <SolutionCard key={solution.id} solution={solution} />
                ))
              ) : (
                <div className={styles.noResults}>
                  未找到匹配的解決方案
                  <div className={styles.debugInfo}>
                    <small>調試信息：嘗試檢查控制台輸出</small>
                  </div>
                </div>
              )}
            </div>

            {/* API 狀態信息 */}
            {apiStatus.attempted && (
              <details className={`${styles.debugDetails} ${styles.apiStatus}`}>
                <summary>API 狀態信息</summary>
                <div className={styles.debugInfo}>
                  <p>
                    <strong>端點:</strong> {apiStatus.endpoint}
                  </p>
                  <p>
                    <strong>狀態:</strong> {apiStatus.success ? "成功" : "失敗"}
                  </p>
                  {apiStatus.error && (
                    <p>
                      <strong>錯誤:</strong> {apiStatus.error}
                    </p>
                  )}
                  <p>
                    <strong>數據源:</strong>{" "}
                    {apiStatus.success ? "API數據" : "模擬數據"}
                  </p>
                  <p>
                    <strong>解決方案數量:</strong> {solutions.length}
                  </p>
                </div>
              </details>
            )}
          </>
        )}
      </main>
    </div>
  );
}
