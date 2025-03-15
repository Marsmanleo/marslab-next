import Link from "next/link";
import styles from "@/styles/IndustrialSolutions.module.css";

export default function SolutionCard({ solution }) {
  // 適配 API 返回的不同數據格式
  // API返回格式: { id, title, description, category, author_name, created_at, ... }
  // 模擬數據格式: { id, title, shortDescription, category, author, date, imageUrl }

  const id = solution.id;
  const title = solution.title;
  const category = solution.category;
  const shortDescription = solution.description || solution.shortDescription;
  const author = solution.author_name || solution.author;
  const date = solution.created_at || solution.date;
  const imageUrl = solution.image_url || solution.imageUrl;

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        {/* 在實際應用中，使用真實圖片 */}
        <div className={styles.cardImagePlaceholder}>
          {imageUrl ? "解決方案圖片" : "無圖片"}
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardCategory}>{category}</div>
        <h3 className={styles.cardTitle}>
          <Link href={`/industrial-solutions/${id}`}>{title}</Link>
        </h3>
        <p className={styles.cardDescription}>{shortDescription}</p>
        <div className={styles.cardMeta}>
          <span className={styles.cardAuthor}>{author}</span>
          <span className={styles.cardDate}>{date}</span>
        </div>
        <Link
          href={`/industrial-solutions/${id}`}
          className={styles.cardReadMore}
        >
          了解更多
        </Link>
      </div>
    </div>
  );
}
