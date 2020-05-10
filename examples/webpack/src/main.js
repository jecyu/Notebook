// 文件大小单位转换
export const readablizeBytes = (bytes, keepDecimal = 2) => {
  if (bytes === 0) {
    return String(bytes);
  }
  const s = ["B", "KB", "MB", "GB", "TB", "PB"];
  const e = Math.floor(Math.log(bytes) / Math.log(1024)); // 获取幂
  return (
    (bytes / Math.pow(1024, Math.floor(e))).toFixed(keepDecimal) + " " + s[e]
  );
};