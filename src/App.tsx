import { useCallback, useEffect, useMemo, useState } from 'react'
import { buildBody } from './lib/buildBody'
import { getDefaultDueDate } from './lib/defaultDueDate'
import { formatDueDate } from './lib/formatDueDate'
import { defaultEmailTemplate } from './templates/default'
import {
  defaultRecipientId,
  recipientOptions,
} from './templates/recipients'
import './App.css'

type CopyStatus = 'idle' | 'copied' | 'error'

function CopyButton({
  label,
  status,
  onCopy,
  disabled = false,
}: {
  label: string
  status: CopyStatus
  onCopy: () => void
  disabled?: boolean
}) {
  const buttonLabel =
    status === 'copied' ? 'コピーしました' : status === 'error' ? 'コピーに失敗' : label

  return (
    <button
      type="button"
      className="btn btn--ghost btn--sm"
      onClick={onCopy}
      disabled={disabled}
    >
      {buttonLabel}
    </button>
  )
}

function App() {
  const [subject, setSubject] = useState(defaultEmailTemplate.subject)
  const [recipientId, setRecipientId] = useState(defaultRecipientId)
  const [dueDate, setDueDate] = useState(getDefaultDueDate)
  const [subjectCopyStatus, setSubjectCopyStatus] = useState<CopyStatus>('idle')
  const [bodyCopyStatus, setBodyCopyStatus] = useState<CopyStatus>('idle')

  const hasRecipient = recipientId !== ''

  const recipient = useMemo(
    () => recipientOptions.find((o) => o.id === recipientId)?.value ?? '',
    [recipientId],
  )

  const computedBody = useMemo(
    () => buildBody(defaultEmailTemplate.bodyTemplate, recipient, dueDate),
    [recipient, dueDate],
  )

  const [body, setBody] = useState(computedBody)

  useEffect(() => {
    setBody(computedBody)
  }, [computedBody])

  const copyWithFeedback = useCallback(
    (text: string, setStatus: (status: CopyStatus) => void) => {
      navigator.clipboard
        .writeText(text)
        .then(() => setStatus('copied'))
        .catch(() => setStatus('error'))
        .finally(() => {
          window.setTimeout(() => setStatus('idle'), 2000)
        })
    },
    [],
  )

  const handleCopySubject = useCallback(() => {
    copyWithFeedback(subject, setSubjectCopyStatus)
  }, [copyWithFeedback, subject])

  const handleCopyBody = useCallback(() => {
    copyWithFeedback(body, setBodyCopyStatus)
  }, [copyWithFeedback, body])

  const handleReset = useCallback(() => {
    setSubject(defaultEmailTemplate.subject)
    setRecipientId(defaultRecipientId)
    setDueDate(getDefaultDueDate())
    setSubjectCopyStatus('idle')
    setBodyCopyStatus('idle')
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__title">
          <h1>メール下書き</h1>
          <p>請求書送付時の文面を編集し、左でプレビューできます</p>
        </div>
        <div className="app-header__actions">
          <button type="button" className="btn btn--ghost" onClick={handleReset}>
            テンプレートに戻す
          </button>
        </div>
      </header>

      <main className="workspace">
        <section className="panel panel--preview" aria-label="プレビュー">
          <div className="panel__label">プレビュー</div>
          <div className="preview">
            <section className="preview-block preview-block--subject">
              <div className="preview-block__header">
                <span className="preview-block__label">件名</span>
                <CopyButton
                  label="件名をコピー"
                  status={subjectCopyStatus}
                  onCopy={handleCopySubject}
                  disabled={!hasRecipient}
                />
              </div>
              <p className="preview-block__content">
                {subject || '（件名がありません）'}
              </p>
            </section>
            <section className="preview-block preview-block--body">
              <div className="preview-block__header">
                <span className="preview-block__label">本文</span>
                <CopyButton
                  label="本文をコピー"
                  status={bodyCopyStatus}
                  onCopy={handleCopyBody}
                  disabled={!hasRecipient}
                />
              </div>
              <pre className="preview-block__content preview-block__content--mono">
                {body || '（本文がありません）'}
              </pre>
            </section>
          </div>
        </section>

        <section className="panel panel--editor" aria-label="編集">
          <div className="panel__label">編集</div>
          <div className="editor-fields">
            <div className="field field--variables">
              <span className="field__label">差し込み</span>
              <div className="variables">
                <label className="variable">
                  <span className="variable__name">宛名</span>
                  <select
                    className="variable__control"
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                  >
                    <option value="">選択してください</option>
                    {recipientOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="variable">
                  <span className="variable__name">支払期限</span>
                  <input
                    type="date"
                    className="variable__control"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                  <span className="variable__hint">{formatDueDate(dueDate)}</span>
                </label>
              </div>
            </div>

            <div className="field field--subject">
              <span className="field__label">件名</span>
              <input
                type="text"
                className="subject-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                spellCheck={false}
                aria-label="件名"
              />
            </div>
            <div className="field field--body">
              <span className="field__label">本文</span>
              <textarea
                className="editor"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                spellCheck={false}
                aria-label="本文"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
