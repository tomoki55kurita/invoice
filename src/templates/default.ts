/**
 * メール下書きのデフォルトテンプレート。
 * 差し替え時はこのファイルを編集するか、別ファイルに export して App から import する。
 */
export const defaultEmailTemplate = {
  subject: '【システム保守費のご請求】栗田朋季',
  /** {{recipient}} と {{dueDate}} は UI から差し込み */
  bodyTemplate: `{{recipient}}

お世話になっております。栗田です。
保守費の請求書をお送りいたします。

本メールに添付のPDFをご確認ください。
お支払い期限日を{{dueDate}}とさせていただいております。

ご不明点ございましたら、お気軽にご連絡ください。
(LINEでも構いません)
ご確認よろしくお願いいたします。


栗田
`,
}
