export type RecipientOption = {
  id: string
  label: string
  value: string
}

/** 宛名の選択肢（value はメール本文先頭にそのまま挿入） */
export const recipientOptions: RecipientOption[] = [
  {
    id: 'atoms',
    label: '株式会社ATOMS / ご担当者 様',
    value: '株式会社ATOMS\nご担当者 様',
  },
  {
    id: 'five',
    label: 'FIVE / 吉川様',
    value: 'FIVE\n吉川様',
  },
  {
    id: 'genuine',
    label: 'Genuine / 三浦様',
    value: 'Genuine\n三浦様',
  },
  {
    id: 'teppen',
    label: 'Teppen / 橋之口 様',
    value: 'Teppen\n橋之口 様',
  },
  {
    id: 'rag-de-lion',
    label: 'RAG de Lion / 宮川 様',
    value: 'RAG de Lion\n宮川 様',
  },
]

export const emptyRecipientId = ''

export const defaultRecipientId = emptyRecipientId
