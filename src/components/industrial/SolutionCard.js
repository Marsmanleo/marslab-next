import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/IndustrialSolutions.module.css";

const SolutionCard = ({ solution }) => {
  // 添加日誌以檢查原始數據
  console.log("SolutionCard 接收到的原始數據:", solution);

  // 確保正確解析數據，兼容API和模擬數據兩種格式
  const id = solution.id;
  const title = solution.title;
  const category = solution.category;

  // 依次嘗試獲取描述字段
  const description =
    solution.short_description ||
    solution.description || // 增加對舊字段的支持
    solution.shortDescription ||
    solution.detailed_description ||
    solution.detailedDescription ||
    "無描述";

  // 處理圖片URL
  let imageUrl = solution.image_url || solution.imageUrl;
  if (imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("/")) {
    imageUrl = `/${imageUrl}`;
  }

  // 回退到默認圖片
  const defaultImage = "/images/placeholder.jpg";
  const imageSrc = imageUrl || defaultImage;

  // 獲取作者和日期信息
  const author = solution.author_name || solution.author;
  const date = solution.created_at || solution.date;

  // 標記數據來源
  const isApiData = !!solution.created_at || !!solution.short_description;

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={250}
            layout="responsive"
            objectFit="cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
              console.log("圖片加載失敗，使用默認圖片:", title);
            }}
          />
        )}
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardCategory}>{category}</div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <div className={styles.cardMeta}>
          <div className={styles.cardAuthor}>提供者: {author || "未知"}</div>
          <div className={styles.cardDate}>發佈於: {date || "未知日期"}</div>
        </div>
        <Link
          href={`/industrial-solutions/${id}`}
          className={styles.cardButton}
        >
          查看詳情
        </Link>

        {/* 調試信息區域 */}
        <details className={styles.debugDetails}>
          <summary>調試信息</summary>
          <div className={styles.debugInfo}>
            <p>
              <strong>解決方案ID:</strong> {id}
            </p>
            <p>
              <strong>數據來源:</strong> {isApiData ? "API數據" : "模擬數據"}
            </p>
            <p>
              <strong>描述源:</strong>{" "}
              {solution.short_description
                ? "short_description"
                : solution.description
                  ? "description"
                  : solution.shortDescription
                    ? "shortDescription"
                    : solution.detailed_description
                      ? "detailed_description"
                      : solution.detailedDescription
                        ? "detailedDescription"
                        : "無"}
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

export default SolutionCard;
