import Link from "next/link";
import styles from "@/styles/IndustrialSolutions.module.css";

export default function SolutionCard({ solution }) {
  const { id, title, category, shortDescription, author, date, imageUrl } =
    solution;

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
