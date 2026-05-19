/** 翌月10日の ISO 日付 (YYYY-MM-DD) */
export function getDefaultDueDate(baseDate = new Date()): string {
  const due = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 10)
  const year = due.getFullYear()
  const month = String(due.getMonth() + 1).padStart(2, '0')
  return `${year}-${month}-10`
}
