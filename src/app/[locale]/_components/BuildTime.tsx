// ビルド時に評価される定数
const BUILD_TIME = new Date();

interface BuildTimeProps {
  buildTimeLabel: string;
}

export function BuildTime({ buildTimeLabel }: BuildTimeProps) {
  const formatBuildTime = (date: Date) => {
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tokyo",
    });
  };

  return (
    <span className="text-sm text-gray-500 ml-2">
      {buildTimeLabel}: {formatBuildTime(BUILD_TIME)}
    </span>
  );
}
