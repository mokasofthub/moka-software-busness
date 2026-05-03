export type Lang = 'en' | 'fr' | 'es' | 'pt' | 'it' | 'zh' | 'ja' | 'ko'
export const SUPPORTED_LANGS: Lang[] = ['en', 'fr', 'es', 'pt', 'it', 'zh', 'ja', 'ko']
export const SUPPORT_EMAIL = 'contact@mokasoftwarebusness.com'
export const LAST_UPDATED = 'May 3, 2026'

export function resolveLang(param?: string): Lang {
  if (param && (SUPPORTED_LANGS as string[]).includes(param)) return param as Lang
  return 'en'
}

export interface PrivacyTranslation {
  title: string
  subtitle: string
  back: string
  intro: string
  sections: {
    collect: { h: string; p: string; items: string[] }
    use: { h: string; p: string; items: string[] }
    storage: { h: string; p: string }
    sharing: { h: string; p: string; items: string[] }
    rights: { h: string; p: string; items: string[] }
    children: { h: string; p: string }
    changes: { h: string; p: string }
    contact: { h: string; p: string }
  }
  footer: { terms: string; contact: string }
}

export const privacy: Record<Lang, PrivacyTranslation> = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'Last updated',
    back: '← Back',
    intro: 'MokaSoftware ("we", "us", or "our") operates the Financeo personal finance application. This Privacy Policy explains how we collect, use, and protect your information.',
    sections: {
      collect: {
        h: '1. Information We Collect',
        p: 'We collect information you provide directly to us, including:',
        items: [
          'Account information: name, email address, and password (hashed and never stored in plain text).',
          'Manually entered financial data: income entries, transaction amounts and notes, budgets, and spending categories.',
          'Preferences: language, currency, and notification settings.',
          'Device information: device type, operating system, and app version for diagnostics.',
          'Usage data: features used and actions taken within the app to improve the service.',
        ],
      },
      use: {
        h: '2. How We Use Your Information',
        p: 'We use the information we collect to:',
        items: [
          'Provide, maintain, and improve the Financeo application.',
          'Send transactional emails (account verification, password reset).',
          'Respond to your support requests.',
          'Monitor and analyze usage patterns to enhance user experience.',
          'Comply with legal obligations.',
        ],
      },
      storage: {
        h: '3. Data Storage & Security',
        p: 'Your data is stored on secure servers. We use industry-standard encryption (TLS in transit, AES-256 at rest) and access controls to protect your information. Passwords are stored using bcrypt hashing and are never stored in plain text.',
      },
      sharing: {
        h: '4. Data Sharing',
        p: 'We do not sell your personal data. We may share data with:',
        items: [
          'Cloud infrastructure providers (AWS) to host and operate the service.',
          'Email delivery services (AWS SES) solely for sending transactional emails.',
          'Law enforcement when required by applicable law.',
        ],
      },
      rights: {
        h: '5. Your Rights',
        p: 'You have the right to:',
        items: [
          'Access the personal data we hold about you.',
          'Correct inaccurate or incomplete data.',
          'Delete your account and associated data.',
          'Export your financial data in a portable format.',
          'Withdraw consent at any time (where processing is consent-based).',
        ],
      },
      children: {
        h: '6. Children\'s Privacy',
        p: 'Financeo is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.',
      },
      changes: {
        h: '7. Changes to This Policy',
        p: 'We may update this Privacy Policy from time to time. We will notify you of significant changes by email or in-app notification at least 14 days before they take effect.',
      },
      contact: {
        h: '8. Contact Us',
        p: 'If you have any questions about this Privacy Policy or your personal data, please contact us at:',
      },
    },
    footer: { terms: 'Terms of Service', contact: 'Contact Support' },
  },

  fr: {
    title: 'Politique de confidentialité',
    subtitle: 'Dernière mise à jour',
    back: '← Retour',
    intro: 'MokaSoftware (« nous ») exploite l\'application de finances personnelles Financeo. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.',
    sections: {
      collect: {
        h: '1. Informations collectées',
        p: 'Nous collectons les informations que vous nous fournissez directement, notamment :',
        items: [
          'Informations de compte : nom, adresse e-mail et mot de passe (haché et jamais stocké en clair).',
          'Données financières saisies manuellement : revenus, montants et notes de transactions, budgets et catégories de dépenses.',
          'Préférences : langue, devise et paramètres de notifications.',
          'Informations sur l\'appareil : type, système d\'exploitation et version de l\'application.',
          'Données d\'utilisation : fonctionnalités utilisées pour améliorer le service.',
        ],
      },
      use: {
        h: '2. Utilisation de vos informations',
        p: 'Nous utilisons les informations collectées pour :',
        items: [
          'Fournir, maintenir et améliorer l\'application Financeo.',
          'Envoyer des e-mails transactionnels (vérification de compte, réinitialisation de mot de passe).',
          'Répondre à vos demandes d\'assistance.',
          'Analyser les usages pour améliorer l\'expérience utilisateur.',
          'Respecter nos obligations légales.',
        ],
      },
      storage: {
        h: '3. Stockage et sécurité des données',
        p: 'Vos données sont stockées sur des serveurs sécurisés. Nous utilisons le chiffrement TLS (transit) et AES-256 (repos), ainsi que des contrôles d\'accès stricts. Les mots de passe sont hachés avec bcrypt et ne sont jamais stockés en clair.',
      },
      sharing: {
        h: '4. Partage des données',
        p: 'Nous ne vendons pas vos données personnelles. Nous pouvons les partager avec :',
        items: [
          'Les fournisseurs d\'infrastructure cloud (AWS) pour héberger le service.',
          'Les services de messagerie (AWS SES) pour les e-mails transactionnels uniquement.',
          'Les autorités légales lorsque la loi l\'exige.',
        ],
      },
      rights: {
        h: '5. Vos droits',
        p: 'Vous avez le droit de :',
        items: [
          'Accéder aux données personnelles que nous détenons sur vous.',
          'Corriger des données inexactes ou incomplètes.',
          'Supprimer votre compte et les données associées.',
          'Exporter vos données financières dans un format portable.',
          'Retirer votre consentement à tout moment.',
        ],
      },
      children: {
        h: '6. Confidentialité des enfants',
        p: 'Financeo n\'est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données personnelles auprès d\'enfants de moins de 13 ans. Si vous pensez que de telles données ont été collectées, contactez-nous immédiatement.',
      },
      changes: {
        h: '7. Modifications de cette politique',
        p: 'Nous pouvons mettre à jour cette politique. Nous vous informerons des modifications importantes par e-mail ou notification dans l\'application au moins 14 jours avant leur entrée en vigueur.',
      },
      contact: {
        h: '8. Nous contacter',
        p: 'Pour toute question concernant cette politique de confidentialité ou vos données personnelles, contactez-nous à :',
      },
    },
    footer: { terms: 'Conditions d\'utilisation', contact: 'Contacter le support' },
  },

  es: {
    title: 'Política de Privacidad',
    subtitle: 'Última actualización',
    back: '← Volver',
    intro: 'MokaSoftware ("nosotros") opera la aplicación de finanzas personales Financeo. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información.',
    sections: {
      collect: {
        h: '1. Información que Recopilamos',
        p: 'Recopilamos la información que nos proporcionas directamente, incluyendo:',
        items: [
          'Información de cuenta: nombre, correo electrónico y contraseña (cifrada y nunca almacenada en texto plano).',
          'Datos financieros introducidos manualmente: ingresos, importes y notas de transacciones, presupuestos y categorías de gastos.',
          'Preferencias: idioma, divisa y configuración de notificaciones.',
          'Información del dispositivo: tipo, sistema operativo y versión de la app.',
          'Datos de uso: funciones utilizadas para mejorar el servicio.',
        ],
      },
      use: {
        h: '2. Cómo Usamos tu Información',
        p: 'Usamos la información recopilada para:',
        items: [
          'Proporcionar, mantener y mejorar la aplicación Financeo.',
          'Enviar correos transaccionales (verificación de cuenta, restablecimiento de contraseña).',
          'Responder a tus solicitudes de soporte.',
          'Analizar patrones de uso para mejorar la experiencia.',
          'Cumplir con obligaciones legales.',
        ],
      },
      storage: {
        h: '3. Almacenamiento y Seguridad de Datos',
        p: 'Tus datos se almacenan en servidores seguros con cifrado TLS (tránsito) y AES-256 (reposo). Las contraseñas se almacenan con hash bcrypt y nunca en texto plano.',
      },
      sharing: {
        h: '4. Compartir Datos',
        p: 'No vendemos tus datos personales. Podemos compartirlos con:',
        items: [
          'Proveedores de infraestructura cloud (AWS) para operar el servicio.',
          'Servicios de email (AWS SES) solo para correos transaccionales.',
          'Autoridades legales cuando lo exija la ley.',
        ],
      },
      rights: {
        h: '5. Tus Derechos',
        p: 'Tienes derecho a:',
        items: [
          'Acceder a los datos personales que tenemos sobre ti.',
          'Corregir datos inexactos o incompletos.',
          'Eliminar tu cuenta y los datos asociados.',
          'Exportar tus datos financieros en formato portable.',
          'Retirar tu consentimiento en cualquier momento.',
        ],
      },
      children: {
        h: '6. Privacidad de Menores',
        p: 'Financeo no está dirigido a menores de 13 años. No recopilamos conscientemente información personal de menores de 13 años. Si crees que hemos recopilado tal información, contáctanos de inmediato.',
      },
      changes: {
        h: '7. Cambios en esta Política',
        p: 'Podemos actualizar esta política. Te notificaremos de cambios significativos por correo o notificación en la app al menos 14 días antes.',
      },
      contact: {
        h: '8. Contacto',
        p: 'Para cualquier pregunta sobre esta Política de Privacidad o tus datos, contáctanos en:',
      },
    },
    footer: { terms: 'Términos de Servicio', contact: 'Contactar soporte' },
  },

  pt: {
    title: 'Política de Privacidade',
    subtitle: 'Última atualização',
    back: '← Voltar',
    intro: 'MokaSoftware ("nós") opera o aplicativo de finanças pessoais Financeo. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações.',
    sections: {
      collect: {
        h: '1. Informações que Coletamos',
        p: 'Coletamos as informações que você nos fornece diretamente, incluindo:',
        items: [
          'Informações de conta: nome, endereço de e-mail e senha (criptografada e nunca armazenada em texto simples).',
          'Dados financeiros inseridos manualmente: entradas de renda, valores e notas de transações, orçamentos e categorias de gastos.',
          'Preferências: idioma, moeda e configurações de notificações.',
          'Informações do dispositivo: tipo, sistema operacional e versão do app.',
          'Dados de uso: recursos utilizados para melhorar o serviço.',
        ],
      },
      use: {
        h: '2. Como Usamos suas Informações',
        p: 'Usamos as informações coletadas para:',
        items: [
          'Fornecer, manter e melhorar o aplicativo Financeo.',
          'Enviar e-mails transacionais (verificação de conta, redefinição de senha).',
          'Responder às suas solicitações de suporte.',
          'Analisar padrões de uso para melhorar a experiência.',
          'Cumprir obrigações legais.',
        ],
      },
      storage: {
        h: '3. Armazenamento e Segurança de Dados',
        p: 'Seus dados são armazenados em servidores seguros com criptografia TLS (trânsito) e AES-256 (repouso). As senhas são armazenadas com hash bcrypt e nunca em texto simples.',
      },
      sharing: {
        h: '4. Compartilhamento de Dados',
        p: 'Não vendemos seus dados pessoais. Podemos compartilhá-los com:',
        items: [
          'Provedores de infraestrutura cloud (AWS) para operar o serviço.',
          'Serviços de e-mail (AWS SES) apenas para e-mails transacionais.',
          'Autoridades legais quando exigido por lei.',
        ],
      },
      rights: {
        h: '5. Seus Direitos',
        p: 'Você tem o direito de:',
        items: [
          'Acessar os dados pessoais que mantemos sobre você.',
          'Corrigir dados incorretos ou incompletos.',
          'Excluir sua conta e os dados associados.',
          'Exportar seus dados financeiros em formato portátil.',
          'Retirar seu consentimento a qualquer momento.',
        ],
      },
      children: {
        h: '6. Privacidade de Crianças',
        p: 'O Financeo não é direcionado a crianças menores de 13 anos. Não coletamos conscientemente informações pessoais de crianças menores de 13 anos. Se você acredita que coletamos tais informações, entre em contato conosco imediatamente.',
      },
      changes: {
        h: '7. Alterações nesta Política',
        p: 'Podemos atualizar esta política. Notificaremos sobre mudanças significativas por e-mail ou notificação no app com pelo menos 14 dias de antecedência.',
      },
      contact: {
        h: '8. Contato',
        p: 'Para quaisquer dúvidas sobre esta Política de Privacidade ou seus dados, entre em contato conosco em:',
      },
    },
    footer: { terms: 'Termos de Serviço', contact: 'Contatar suporte' },
  },

  it: {
    title: 'Informativa sulla Privacy',
    subtitle: 'Ultimo aggiornamento',
    back: '← Indietro',
    intro: 'MokaSoftware ("noi") gestisce l\'applicazione di finanza personale Financeo. Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo e proteggiamo le tue informazioni.',
    sections: {
      collect: {
        h: '1. Informazioni che Raccogliamo',
        p: 'Raccogliamo le informazioni che ci fornisci direttamente, tra cui:',
        items: [
          'Informazioni dell\'account: nome, indirizzo e-mail e password (con hash, mai memorizzata in chiaro).',
          'Dati finanziari inseriti manualmente: entrate, importi e note delle transazioni, budget e categorie di spesa.',
          'Preferenze: lingua, valuta e impostazioni di notifica.',
          'Informazioni sul dispositivo: tipo, sistema operativo e versione dell\'app.',
          'Dati di utilizzo: funzionalità utilizzate per migliorare il servizio.',
        ],
      },
      use: {
        h: '2. Come Utilizziamo le tue Informazioni',
        p: 'Utilizziamo le informazioni raccolte per:',
        items: [
          'Fornire, mantenere e migliorare l\'applicazione Financeo.',
          'Inviare e-mail transazionali (verifica account, reset password).',
          'Rispondere alle tue richieste di supporto.',
          'Analizzare i modelli di utilizzo per migliorare l\'esperienza.',
          'Adempiere agli obblighi legali.',
        ],
      },
      storage: {
        h: '3. Archiviazione e Sicurezza dei Dati',
        p: 'I tuoi dati sono archiviati su server sicuri con crittografia TLS (transito) e AES-256 (riposo). Le password sono archiviate con hash bcrypt e non vengono mai memorizzate in testo normale.',
      },
      sharing: {
        h: '4. Condivisione dei Dati',
        p: 'Non vendiamo i tuoi dati personali. Possiamo condividerli con:',
        items: [
          'Fornitori di infrastrutture cloud (AWS) per ospitare il servizio.',
          'Servizi di posta elettronica (AWS SES) solo per e-mail transazionali.',
          'Autorità legali quando richiesto dalla legge.',
        ],
      },
      rights: {
        h: '5. I tuoi Diritti',
        p: 'Hai il diritto di:',
        items: [
          'Accedere ai dati personali che conserviamo su di te.',
          'Correggere dati inesatti o incompleti.',
          'Eliminare il tuo account e i dati associati.',
          'Esportare i tuoi dati finanziari in un formato portatile.',
          'Revocare il consenso in qualsiasi momento.',
        ],
      },
      children: {
        h: '6. Privacy dei Minori',
        p: 'Financeo non è destinato a bambini di età inferiore a 13 anni. Non raccogliamo consapevolmente informazioni personali da bambini di età inferiore a 13 anni. Se ritieni che abbiamo raccolto tali informazioni, contattaci immediatamente.',
      },
      changes: {
        h: '7. Modifiche a questa Informativa',
        p: 'Potremmo aggiornare questa informativa. Ti informeremo di modifiche significative tramite e-mail o notifica in-app almeno 14 giorni prima che entrino in vigore.',
      },
      contact: {
        h: '8. Contattaci',
        p: 'Per qualsiasi domanda su questa Informativa sulla Privacy o sui tuoi dati, contattaci a:',
      },
    },
    footer: { terms: 'Termini di Servizio', contact: 'Contatta il supporto' },
  },

  zh: {
    title: '隐私政策',
    subtitle: '最后更新',
    back: '← 返回',
    intro: 'MokaSoftware（"我们"）运营个人财务应用程序 Financeo。本隐私政策说明我们如何收集、使用和保护您的信息。',
    sections: {
      collect: {
        h: '1. 我们收集的信息',
        p: '我们收集您直接提供给我们的信息，包括：',
        items: [
          '账户信息：姓名、电子邮件地址和密码（加密存储，从不以明文保存）。',
          '手动录入的财务数据：收入记录、交易金额和备注、预算及消费类别。',
          '偏好设置：语言、货币及通知设置。',
          '设备信息：设备类型、操作系统和应用版本。',
          '使用数据：应用内使用的功能，用于改善服务。',
        ],
      },
      use: {
        h: '2. 我们如何使用您的信息',
        p: '我们使用收集的信息来：',
        items: [
          '提供、维护和改善 Financeo 应用程序。',
          '发送交易性电子邮件（账户验证、密码重置）。',
          '回复您的支持请求。',
          '分析使用模式以改善用户体验。',
          '遵守法律义务。',
        ],
      },
      storage: {
        h: '3. 数据存储与安全',
        p: '您的数据存储在安全服务器上，使用 TLS（传输中）和 AES-256（静止）加密。密码使用 bcrypt 哈希存储，从不以明文保存。',
      },
      sharing: {
        h: '4. 数据共享',
        p: '我们不出售您的个人数据。我们可能与以下方共享数据：',
        items: [
          '云基础设施提供商（AWS）用于托管服务。',
          '电子邮件服务（AWS SES）仅用于发送交易性邮件。',
          '法律要求时向执法部门披露。',
        ],
      },
      rights: {
        h: '5. 您的权利',
        p: '您有权：',
        items: [
          '访问我们持有的关于您的个人数据。',
          '更正不准确或不完整的数据。',
          '删除您的账户和相关数据。',
          '以可携带格式导出您的财务数据。',
          '随时撤回同意（在基于同意的处理情况下）。',
        ],
      },
      children: {
        h: '6. 儿童隐私',
        p: 'Financeo 不面向 13 岁以下儿童。我们不会故意收集 13 岁以下儿童的个人信息。如果您认为我们收集了此类信息，请立即联系我们。',
      },
      changes: {
        h: '7. 政策变更',
        p: '我们可能会不时更新本隐私政策。我们将在重大变更生效前至少 14 天通过电子邮件或应用内通知告知您。',
      },
      contact: {
        h: '8. 联系我们',
        p: '如果您对本隐私政策或您的个人数据有任何疑问，请通过以下方式联系我们：',
      },
    },
    footer: { terms: '服务条款', contact: '联系支持' },
  },

  ja: {
    title: 'プライバシーポリシー',
    subtitle: '最終更新',
    back: '← 戻る',
    intro: 'MokaSoftware（「当社」）は、個人財務アプリケーション Financeo を運営しています。このプライバシーポリシーは、当社がどのように情報を収集、使用、保護するかを説明します。',
    sections: {
      collect: {
        h: '1. 収集する情報',
        p: '当社はお客様から直接提供される情報を収集します。これには以下が含まれます：',
        items: [
          'アカウント情報：名前、メールアドレス、パスワード（ハッシュ化、平文では保存されません）。',
          '手動入力の財務データ：収入の記録、取引金額とメモ、予算、支出カテゴリ。',
          '設定：言語、通貨、通知設定。',
          'デバイス情報：デバイスの種類、OS、アプリのバージョン。',
          '使用データ：サービス改善のためのアプリ内機能の使用状況。',
        ],
      },
      use: {
        h: '2. 情報の使用方法',
        p: '収集した情報は以下の目的で使用します：',
        items: [
          'Financeo アプリケーションの提供、維持、改善。',
          'トランザクションメールの送信（アカウント確認、パスワードリセット）。',
          'サポートリクエストへの対応。',
          'ユーザーエクスペリエンス向上のための使用パターンの分析。',
          '法的義務の遵守。',
        ],
      },
      storage: {
        h: '3. データの保存とセキュリティ',
        p: 'お客様のデータは、TLS（転送中）および AES-256（保存時）暗号化を使用した安全なサーバーに保存されます。パスワードは bcrypt ハッシュで保存され、平文では保存されません。',
      },
      sharing: {
        h: '4. データの共有',
        p: '当社はお客様の個人データを販売しません。以下の場合にデータを共有することがあります：',
        items: [
          'サービスのホスティングのためのクラウドインフラプロバイダー（AWS）。',
          'トランザクションメール送信のためのみのメールサービス（AWS SES）。',
          '法律で要求された場合の法執行機関への開示。',
        ],
      },
      rights: {
        h: '5. お客様の権利',
        p: 'お客様には以下の権利があります：',
        items: [
          '当社が保有するお客様の個人データへのアクセス。',
          '不正確または不完全なデータの修正。',
          'アカウントと関連データの削除。',
          'ポータブル形式での財務データのエクスポート。',
          'いつでも同意を撤回すること（同意に基づく処理の場合）。',
        ],
      },
      children: {
        h: '6. 子供のプライバシー',
        p: 'Financeo は 13 歳未満の子供を対象としていません。当社は 13 歳未満の子供から個人情報を意図的に収集することはありません。そのような情報が収集されたと思われる場合は、すぐにご連絡ください。',
      },
      changes: {
        h: '7. ポリシーの変更',
        p: '当社はこのプライバシーポリシーを随時更新することがあります。重要な変更については、発効の少なくとも 14 日前にメールまたはアプリ内通知でお知らせします。',
      },
      contact: {
        h: '8. お問い合わせ',
        p: 'このプライバシーポリシーまたはお客様の個人データについてご質問がある場合は、以下にお問い合わせください：',
      },
    },
    footer: { terms: '利用規約', contact: 'サポートに連絡' },
  },

  ko: {
    title: '개인정보 처리방침',
    subtitle: '최종 업데이트',
    back: '← 뒤로',
    intro: 'MokaSoftware("당사")는 개인 재무 앱 Financeo를 운영합니다. 이 개인정보 처리방침은 당사가 귀하의 정보를 어떻게 수집, 사용 및 보호하는지 설명합니다.',
    sections: {
      collect: {
        h: '1. 수집하는 정보',
        p: '당사는 귀하가 직접 제공하는 정보를 수집합니다. 여기에는 다음이 포함됩니다:',
        items: [
          '계정 정보: 이름, 이메일 주소, 비밀번호(해시 처리, 일반 텍스트로 저장되지 않음).',
          '수동으로 입력한 재무 데이터: 수입 항목, 거래 금액 및 메모, 예산, 지출 카테고리.',
          '환경 설정: 언어, 통화 및 알림 설정.',
          '기기 정보: 기기 유형, 운영 체제, 앱 버전.',
          '사용 데이터: 서비스 개선을 위한 앱 내 기능 사용.',
        ],
      },
      use: {
        h: '2. 정보 사용 방법',
        p: '당사는 수집한 정보를 다음 목적으로 사용합니다:',
        items: [
          'Financeo 앱 제공, 유지, 개선.',
          '거래 이메일 발송(계정 인증, 비밀번호 재설정).',
          '지원 요청에 대한 응답.',
          '사용자 경험 향상을 위한 사용 패턴 분석.',
          '법적 의무 준수.',
        ],
      },
      storage: {
        h: '3. 데이터 저장 및 보안',
        p: '귀하의 데이터는 TLS(전송 중) 및 AES-256(저장 시) 암호화를 사용하는 보안 서버에 저장됩니다. 비밀번호는 bcrypt 해시로 저장되며 절대 일반 텍스트로 저장되지 않습니다.',
      },
      sharing: {
        h: '4. 데이터 공유',
        p: '당사는 귀하의 개인 데이터를 판매하지 않습니다. 다음의 경우 데이터를 공유할 수 있습니다:',
        items: [
          '서비스 호스팅을 위한 클라우드 인프라 제공업체(AWS).',
          '거래 이메일 발송 전용의 이메일 서비스(AWS SES).',
          '법률에서 요구하는 경우 법 집행 기관.',
        ],
      },
      rights: {
        h: '5. 귀하의 권리',
        p: '귀하는 다음의 권리를 가집니다:',
        items: [
          '당사가 보유한 귀하의 개인 데이터에 접근.',
          '부정확하거나 불완전한 데이터 수정.',
          '계정 및 관련 데이터 삭제.',
          '이동 가능한 형식으로 재무 데이터 내보내기.',
          '언제든지 동의 철회(동의 기반 처리의 경우).',
        ],
      },
      children: {
        h: '6. 아동 개인정보',
        p: 'Financeo는 13세 미만 아동을 대상으로 하지 않습니다. 당사는 13세 미만 아동으로부터 개인정보를 의도적으로 수집하지 않습니다. 그러한 정보가 수집되었다고 생각되면 즉시 연락해 주세요.',
      },
      changes: {
        h: '7. 이 방침의 변경',
        p: '당사는 이 개인정보 처리방침을 수시로 업데이트할 수 있습니다. 중요한 변경 사항은 발효 최소 14일 전에 이메일 또는 앱 내 알림으로 알려드립니다.',
      },
      contact: {
        h: '8. 문의',
        p: '이 개인정보 처리방침 또는 귀하의 개인 데이터에 관한 질문이 있으면 다음으로 연락해 주세요:',
      },
    },
    footer: { terms: '서비스 약관', contact: '지원팀 연락' },
  },
}
