/** ISO日付 (YYYY-MM-DD) をメール用の日本語表記に変換 */
export function formatDueDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  if (!year || !month || !day) return isoDate
  return `${year}年${month}月${day}日`
}
