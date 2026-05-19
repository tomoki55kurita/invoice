function toIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** 土日なら翌月曜にずらす */
export function adjustDueDateFromWeekend(isoDate: string): string {
  const date = parseIsoDate(isoDate)
  const weekday = date.getDay()

  if (weekday === 6) {
    date.setDate(date.getDate() + 2)
  } else if (weekday === 0) {
    date.setDate(date.getDate() + 1)
  }

  return toIsoDate(date)
}

/** 翌月10日（土日の場合は翌月曜）の ISO 日付 (YYYY-MM-DD) */
export function getDefaultDueDate(baseDate = new Date()): string {
  const due = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 10)
  return adjustDueDateFromWeekend(toIsoDate(due))
}
