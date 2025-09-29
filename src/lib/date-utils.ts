// 公開日ユーティリティ（日単位で「今日まで」を公開とみなす）
import { isAfter, parseISO, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

export class PublicationDateGuard {
  static isPublished(
    publishedAt: string | Date,
    now: Date = new Date()
  ): boolean {
    if (!publishedAt) return false;
    const published =
      typeof publishedAt === "string" ? parseISO(publishedAt) : publishedAt;
    if (Number.isNaN(published.getTime())) return false;

    const TZ = "Asia/Tokyo";
    const startOfToday = fromZonedTime(startOfDay(toZonedTime(now, TZ)), TZ);
    const startOfPublishDay = fromZonedTime(
      startOfDay(toZonedTime(published, TZ)),
      TZ
    );
    // 「当日公開OK」: 公開日が今日以前（<= 今日）なら公開扱い
    return !isAfter(startOfPublishDay, startOfToday);
  }

  static filterPublished<
    T extends { metadata: { publishedAt: string | Date } }
  >(items: T[], now: Date = new Date()): T[] {
    return items.filter((item) =>
      PublicationDateGuard.isPublished(item.metadata.publishedAt, now)
    );
  }
}
