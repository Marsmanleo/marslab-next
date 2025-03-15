import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/IndustrialSolutions.module.css";

// 模擬數據，實際應用中會從API獲取
const demoSolutions = [
  {
    id: "1",
    title: "智能工廠生產線自動化解決方案",
    category: "自動化",
    shortDescription: "通過AI和物聯網技術提高生產效率和產品質量",
    detailedDescription: `這一解決方案整合了人工智能、機器視覺和物聯網技術，實現了生產線的全面自動化和智能化。系統能夠實時監控生產過程中的各項指標，自動識別產品缺陷，並根據生產數據動態調整生產參數，從而顯著提高產品質量和生產效率。

主要技術亮點包括：
- 基於深度學習的機器視覺檢測系統，準確率超過99.5%
- 分佈式物聯網感測器網絡，監控溫度、濕度、振動等環境參數
- 人工智能驅動的生產參數自適應調整系統
- 數字孿生技術，實現虛擬生產線與實際生產線的實時映射`,
    problemStatement: `傳統工廠面臨的主要問題包括：
1. 人工檢測耗時且容易出錯
2. 生產參數難以根據實時情況動態調整
3. 缺乏對生產過程的全面監控
4. 產品缺陷率高，造成物料浪費
5. 生產效率低下，人力成本高昂`,
    technicalParameters: `- 產品檢測準確率：≥99.5%
- 生產效率提升：平均提升35%
- 能源消耗降低：平均節省20%
- 人力需求減少：可減少60%人工參與
- 系統響應時間：≤100ms
- 數據處理能力：每秒可處理1000+數據點
- 系統擴展性：支持最多100條並行生產線實時監控`,
    images: [
      "/images/solution1_1.jpg",
      "/images/solution1_2.jpg",
      "/images/solution1_3.jpg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=example1",
    author: "張工程師",
    authorCompany: "智能製造科技有限公司",
    date: "2025-03-10",
    contactEmail: "contact@example.com",
  },
  {
    id: "2",
    title: "工業廢水處理智能監控系統",
    category: "環保科技",
    shortDescription: "實時監控和優化工業廢水處理過程，降低環境影響",
    detailedDescription: `本系統利用先進的水質感測器、數據分析和人工智能技術，實現了工業廢水處理全過程的自動監控和優化。系統可以實時檢測水質參數，預測處理效果，並自動調整處理工藝參數，確保出水水質穩定達標，同時降低能源消耗和藥劑使用量。

系統主要由以下部分組成：
- 多參數在線水質監測系統
- 廢水處理工藝參數實時監控系統
- 人工智能驅動的處理工藝優化控制系統
- 雲端數據分析和可視化平台
- 異常預警和應急響應系統`,
    problemStatement: `工業廢水處理面臨的主要挑戰：
1. 水質波動大，難以穩定達標排放
2. 處理工藝參數調整主要依靠經驗，缺乏科學依據
3. 能源和藥劑使用效率低
4. 突發情況應對不及時，造成環境風險
5. 缺乏對處理全過程的實時監控和數據分析`,
    technicalParameters: `- 水質監測參數：pH、COD、BOD、氨氮、重金屬等20+項
- 數據採集頻率：最快可達每秒1次
- 出水達標率：≥99.8%
- 能源消耗降低：15-30%
- 藥劑使用量減少：20-40%
- 異常情況響應時間：≤5分鐘
- 系統可靠性：≥99.9%
- 支持處理規模：1,000-100,000噸/日`,
    images: ["/images/solution2_1.jpg", "/images/solution2_2.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=example2",
    author: "李環保",
    authorCompany: "綠色環境科技公司",
    date: "2025-03-05",
    contactEmail: "eco@example.com",
  },
  {
    id: "3",
    title: "工業設備預測性維護系統",
    category: "設備維護",
    shortDescription: "利用機器學習預測設備故障，減少停機時間",
    detailedDescription: `預測性維護系統通過在關鍵工業設備上安裝振動、溫度、聲音等多種感測器，收集設備運行數據，並利用機器學習算法分析設備的健康狀態，預測潛在故障，實現在故障發生前進行維護，從而減少計劃外停機時間，延長設備壽命，降低維護成本。

系統關鍵功能包括：
- 多維度設備狀態實時監測
- 基於歷史數據的故障模式識別
- 機器學習驅動的故障預測模型
- 維護建議生成和優先級排序
- 維護工作流程管理
- 維護效果評估和持續優化`,
    problemStatement: `傳統設備維護面臨的主要問題：
1. 被動響應式維護導致意外停機，影響生產
2. 定期預防性維護可能過早或過晚，造成浪費或風險
3. 缺乏對設備健康狀態的實時了解
4. 依賴經驗豐富的維護人員，人才短缺
5. 缺乏數據支持的維護決策流程`,
    technicalParameters: `- 支持的設備類型：電機、泵、壓縮機、風機、軸承等
- 數據採集頻率：最高10kHz
- 故障預測準確率：85-95%
- 預測提前時間：通常故障發生前1-4週
- 停機時間減少：平均減少35-50%
- 維護成本降低：平均降低25-40%
- 設備壽命延長：平均延長15-30%
- 系統可擴展性：單一系統可監控最多1000台設備`,
    images: [
      "/images/solution3_1.jpg",
      "/images/solution3_2.jpg",
      "/images/solution3_3.jpg",
      "/images/solution3_4.jpg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=example3",
    author: "王維護",
    authorCompany: "智能維護科技股份有限公司",
    date: "2025-02-28",
    contactEmail: "maintenance@example.com",
  },
];

export default function SolutionDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // 如果id還未加載，不執行任何操作
    if (!id) return;

    const fetchSolution = async () => {
      try {
        // 嘗試從 API 獲取數據
        let apiSuccess = false;
        try {
          // 使用修正後的 API 路徑
          const res = await fetch(`/api/industrial-solutions.php/${id}`);

          if (res.ok) {
            const responseData = await res.json();
            console.log("API 返回詳情數據:", responseData);

            if (responseData && responseData.success && responseData.data) {
              // 處理 API 返回的數據格式
              const apiSolution = responseData.data;

              // 將 API 數據映射到頁面所需格式
              const formattedSolution = {
                id: apiSolution.id,
                title: apiSolution.title,
                category: apiSolution.category,
                shortDescription: apiSolution.description,
                detailedDescription: apiSolution.content || "",
                problemStatement: apiSolution.problem || "",
                technicalParameters: apiSolution.technical_parameters || "",
                videoUrl: apiSolution.video_url,
                author: apiSolution.contact_info?.name || "",
                authorCompany: apiSolution.contact_info?.company || "",
                contactEmail: apiSolution.contact_info?.email || "",
                date: apiSolution.created_at,
                images: [], // API 可能不返回圖片，暫時使用空數組
              };

              setSolution(formattedSolution);
              setLoading(false);
              apiSuccess = true;
            }
          } else {
            console.log("API 響應錯誤:", res.status);
          }
        } catch (apiError) {
          console.log("API 調用失敗，使用模擬數據:", apiError);
        }

        // 如果 API 獲取失敗，使用模擬數據
        if (!apiSuccess) {
          console.log("使用模擬數據");
          // 使用模擬數據
          const foundSolution = demoSolutions.find((s) => s.id === id);
          if (!foundSolution) throw new Error("無法找到該解決方案");

          // 模擬網絡延遲
          await new Promise((resolve) => setTimeout(resolve, 500));

          setSolution(foundSolution);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSolution();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <Head>
          <title>載入中... | MARS LAB</title>
        </Head>
        <div className={styles.loading}>加載中...</div>
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className={styles.container}>
        <Head>
          <title>錯誤 | MARS LAB</title>
        </Head>
        <div className={styles.error}>
          <h1>出現錯誤</h1>
          <p>{error || "無法找到該解決方案"}</p>
          <Link href="/industrial-solutions" className={styles.backButton}>
            返回解決方案列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{solution.title} | MARS LAB</title>
        <meta name="description" content={solution.shortDescription} />
      </Head>

      <main className={styles.detailMain}>
        <div className={styles.breadcrumbs}>
          <Link href="/">首頁</Link> &gt;
          <Link href="/industrial-solutions">工業科技解決方案</Link> &gt;
          <span>{solution.title}</span>
        </div>

        <div className={styles.detailHeader}>
          <h1 className={styles.detailTitle}>{solution.title}</h1>
          <div className={styles.detailMeta}>
            <span className={styles.category}>{solution.category}</span>
            <span className={styles.author}>提供者: {solution.author}</span>
            <span className={styles.date}>發佈於: {solution.date}</span>
          </div>
        </div>

        <div className={styles.detailContent}>
          <div className={styles.detailSidebar}>
            <div className={styles.sidebarSection}>
              <h3>提供者信息</h3>
              <p>
                <strong>名稱:</strong> {solution.author}
              </p>
              {solution.authorCompany && (
                <p>
                  <strong>組織:</strong> {solution.authorCompany}
                </p>
              )}
              {solution.contactEmail && (
                <p>
                  <strong>聯繫方式:</strong> {solution.contactEmail}
                </p>
              )}
            </div>

            <div className={styles.sidebarSection}>
              <h3>解決方案分類</h3>
              <p>{solution.category}</p>
            </div>

            <div className={styles.sidebarActions}>
              {solution.contactEmail && (
                <button
                  className={styles.contactButton}
                  onClick={() =>
                    (window.location.href = `mailto:${solution.contactEmail}?subject=關於「${solution.title}」的諮詢`)
                  }
                >
                  聯繫提供者
                </button>
              )}
              <Link
                href="/industrial-solutions/submit"
                className={styles.submitOwnButton}
              >
                提交您的方案
              </Link>
            </div>
          </div>

          <div className={styles.detailMainContent}>
            <div className={styles.summary}>
              <h2>解決方案概述</h2>
              <p>{solution.shortDescription}</p>
            </div>

            {solution.images && solution.images.length > 0 && (
              <div className={styles.gallery}>
                <div className={styles.mainImage}>
                  {/* 實際應用中使用真實圖片 */}
                  <div className={styles.imagePlaceholder}>
                    圖片 {activeImageIndex + 1}: {solution.title}
                  </div>
                </div>

                {solution.images.length > 1 && (
                  <div className={styles.thumbnails}>
                    {solution.images.map((image, index) => (
                      <div
                        key={index}
                        className={`${styles.thumbnail} ${index === activeImageIndex ? styles.activeThumbnail : ""}`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        {/* 縮略圖 */}
                        <div className={styles.thumbnailPlaceholder}>
                          {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {solution.problemStatement && (
              <div className={styles.problemSection}>
                <h2>解決的問題</h2>
                <div className={styles.formattedText}>
                  {solution.problemStatement
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>
            )}

            {solution.detailedDescription && (
              <div className={styles.descriptionSection}>
                <h2>詳細描述</h2>
                <div className={styles.formattedText}>
                  {solution.detailedDescription
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>
            )}

            {solution.technicalParameters && (
              <div className={styles.parametersSection}>
                <h2>技術參數和指標</h2>
                <div className={styles.formattedText}>
                  {solution.technicalParameters
                    .split("\n")
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              </div>
            )}

            {solution.videoUrl && (
              <div className={styles.videoSection}>
                <h2>演示視頻</h2>
                <div className={styles.videoPlaceholder}>
                  <p>視頻鏈接: {solution.videoUrl}</p>
                  <p>(實際應用中這裡會嵌入視頻播放器)</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.relatedSolutions}>
          <h2>相關解決方案</h2>
          <div className={styles.relatedGrid}>
            {demoSolutions
              .filter((s) => s.id !== id && s.category === solution.category)
              .slice(0, 2)
              .map((relatedSolution) => (
                <div key={relatedSolution.id} className={styles.relatedCard}>
                  <h3>
                    <Link href={`/industrial-solutions/${relatedSolution.id}`}>
                      {relatedSolution.title}
                    </Link>
                  </h3>
                  <p>{relatedSolution.shortDescription}</p>
                  <Link
                    href={`/industrial-solutions/${relatedSolution.id}`}
                    className={styles.readMoreLink}
                  >
                    了解更多
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.backToList}>
          <Link href="/industrial-solutions" className={styles.backButton}>
            返回解決方案列表
          </Link>
        </div>
      </main>
    </div>
  );
}
