import { formatDueDate } from './formatDueDate'

export function buildBody(
  template: string,
  recipient: string,
  dueDateIso: string,
): string {
  return template
    .replace('{{recipient}}', recipient)
    .replace('{{dueDate}}', formatDueDate(dueDateIso))
}
