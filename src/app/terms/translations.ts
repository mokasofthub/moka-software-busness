import { resolveLang, SUPPORT_EMAIL, LAST_UPDATED } from '../privacy/translations'
import type { Lang } from '../privacy/translations'

export interface TermsTranslation {
  title: string
  subtitle: string
  back: string
  sections: {
    acceptance: { h: string; p: string }
    service: { h: string; p: string; items: string[] }
    account: { h: string; items: string[] }
    acceptable: { h: string; p: string; prohibited: string[] }
    financial: { h: string; p1: string; p2: string }
    ip: { h: string; p: string }
    termination: { h: string; p: string }
    disclaimer: { h: string; p: string }
    liability: { h: string; p: string }
    changes: { h: string; p: string }
    governing: { h: string; p: string }
    contactSection: { h: string; p: string }
  }
  footer: { privacy: string; contact: string }
}

export const terms: Record<Lang, TermsTranslation> = {
  en: {
    title: 'Terms of Service',
    subtitle: 'Last updated',
    back: '← Back',
    sections: {
      acceptance: {
        h: '1. Acceptance of Terms',
        p: 'By downloading, installing, or using the Financeo mobile application ("Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.',
      },
      service: {
        h: '2. Description of Service',
        p: 'Financeo is a personal finance management application that allows you to:',
        items: [
          'Track your income and expenses across multiple accounts.',
          'Set and monitor budgets by category.',
          'View financial summaries and spending analytics.',
          'Manage your financial data securely in the cloud.',
        ],
      },
      account: {
        h: '3. Account Responsibilities',
        items: [
          'You must provide accurate information when creating your account.',
          'You are responsible for maintaining the confidentiality of your password.',
          'You must notify us immediately of any unauthorized access to your account.',
          'You are responsible for all activity that occurs under your account.',
          'One person may not maintain more than one active account.',
        ],
      },
      acceptable: {
        h: '4. Acceptable Use',
        p: 'You agree not to:',
        prohibited: [
          'Use the Service for any unlawful purpose.',
          'Attempt to gain unauthorized access to any part of the Service.',
          'Transmit any malicious code, viruses, or harmful data.',
          'Scrape, crawl, or extract data from the Service by automated means.',
          'Impersonate another person or entity.',
          'Interfere with or disrupt the integrity or performance of the Service.',
        ],
      },
      financial: {
        h: '5. Financial Data',
        p1: 'All financial data you enter into Financeo is yours. We do not analyze, sell, or use your financial data for advertising purposes.',
        p2: 'Financeo does not connect to your bank accounts directly and does not initiate any financial transactions on your behalf. All data is entered manually by you.',
      },
      ip: {
        h: '6. Intellectual Property',
        p: 'The Financeo application, including its design, code, and content (excluding your personal data), is the property of MokaSoftware and is protected by copyright and other intellectual property laws. You may not copy, modify, or distribute any part of the Service without our prior written consent.',
      },
      termination: {
        h: '7. Termination',
        p: 'We reserve the right to suspend or terminate your account at any time if you violate these Terms. You may also delete your account at any time from the app settings. Upon termination, your data will be deleted within 30 days as described in our Privacy Policy.',
      },
      disclaimer: {
        h: '8. Disclaimer of Warranties',
        p: 'The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, error-free, or free of viruses. You use the Service at your own risk.',
      },
      liability: {
        h: '9. Limitation of Liability',
        p: 'To the fullest extent permitted by applicable law, MokaSoftware shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of the Service.',
      },
      changes: {
        h: '10. Changes to Terms',
        p: 'We may update these Terms from time to time. We will notify you of material changes by email or in-app notification at least 14 days before they take effect. Continued use of the Service after changes constitutes acceptance of the new Terms.',
      },
      governing: {
        h: '11. Governing Law',
        p: 'These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Service shall be resolved through good-faith negotiation first.',
      },
      contactSection: {
        h: '12. Contact',
        p: 'For any questions about these Terms of Service, please contact us at:',
      },
    },
    footer: { privacy: 'Privacy Policy', contact: 'Contact Support' },
  },

  fr: {
    title: "Conditions d'utilisation",
    subtitle: 'Dernière mise à jour',
    back: '← Retour',
    sections: {
      acceptance: {
        h: "1. Acceptation des conditions",
        p: "En téléchargeant, installant ou utilisant l'application Financeo (\"Service\"), vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas, n'utilisez pas le Service.",
      },
      service: {
        h: '2. Description du service',
        p: 'Financeo est une application de gestion des finances personnelles qui vous permet de :',
        items: [
          'Suivre vos revenus et dépenses sur plusieurs comptes.',
          'Définir et surveiller des budgets par catégorie.',
          'Consulter des résumés financiers et des analyses de dépenses.',
          'Gérer vos données financières en toute sécurité dans le cloud.',
        ],
      },
      account: {
        h: '3. Responsabilités du compte',
        items: [
          'Vous devez fournir des informations exactes lors de la création de votre compte.',
          'Vous êtes responsable de la confidentialité de votre mot de passe.',
          "Vous devez nous informer immédiatement de tout accès non autorisé à votre compte.",
          "Vous êtes responsable de toute activité qui se produit sous votre compte.",
          "Une personne ne peut pas avoir plus d'un compte actif.",
        ],
      },
      acceptable: {
        h: '4. Utilisation acceptable',
        p: "Vous acceptez de ne pas :",
        prohibited: [
          'Utiliser le Service à des fins illégales.',
          "Tenter d'accéder sans autorisation à une partie du Service.",
          'Transmettre des codes malveillants, virus ou données nuisibles.',
          'Extraire des données du Service par des moyens automatisés.',
          "Usurper l'identité d'une autre personne ou entité.",
          "Perturber l'intégrité ou les performances du Service.",
        ],
      },
      financial: {
        h: '5. Données financières',
        p1: "Toutes les données financières que vous saisissez dans Financeo vous appartiennent. Nous n'analysons pas, ne vendons pas et n'utilisons pas vos données financières à des fins publicitaires.",
        p2: "Financeo ne se connecte pas directement à vos comptes bancaires et n'initie aucune transaction financière en votre nom. Toutes les données sont saisies manuellement par vous.",
      },
      ip: {
        h: '6. Propriété intellectuelle',
        p: "L'application Financeo, y compris sa conception, son code et son contenu (à l'exclusion de vos données personnelles), est la propriété de MokaSoftware et est protégée par le droit d'auteur. Vous ne pouvez pas copier, modifier ou distribuer une partie du Service sans notre consentement écrit préalable.",
      },
      termination: {
        h: '7. Résiliation',
        p: "Nous nous réservons le droit de suspendre ou de résilier votre compte à tout moment si vous enfreignez ces conditions. Vous pouvez également supprimer votre compte à tout moment depuis les paramètres de l'application. Vos données seront supprimées dans les 30 jours conformément à notre politique de confidentialité.",
      },
      disclaimer: {
        h: '8. Exclusion de garanties',
        p: "Le Service est fourni \"tel quel\" sans aucune garantie. Nous ne garantissons pas que le Service sera ininterrompu, sans erreur ou exempt de virus. Vous utilisez le Service à vos propres risques.",
      },
      liability: {
        h: '9. Limitation de responsabilité',
        p: "Dans toute la mesure permise par la loi applicable, MokaSoftware ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs découlant de votre utilisation du Service.",
      },
      changes: {
        h: '10. Modifications des conditions',
        p: "Nous pouvons mettre à jour ces conditions. Nous vous informerons des modifications importantes par e-mail ou notification dans l'application au moins 14 jours avant leur entrée en vigueur.",
      },
      governing: {
        h: '11. Droit applicable',
        p: "Ces conditions sont régies par le droit applicable. Tout litige découlant de ces conditions sera résolu en premier lieu par une négociation de bonne foi.",
      },
      contactSection: {
        h: '12. Contact',
        p: "Pour toute question concernant ces conditions d'utilisation, contactez-nous à :",
      },
    },
    footer: { privacy: 'Politique de confidentialité', contact: 'Contacter le support' },
  },

  es: {
    title: 'Términos de servicio',
    subtitle: 'Última actualización',
    back: '← Volver',
    sections: {
      acceptance: { h: '1. Aceptación de los términos', p: 'Al descargar, instalar o usar la aplicación Financeo ("Servicio"), aceptas quedar vinculado por estos Términos de Servicio. Si no estás de acuerdo, no uses el Servicio.' },
      service: { h: '2. Descripción del servicio', p: 'Financeo es una aplicación de gestión de finanzas personales que te permite:', items: ['Registrar ingresos y gastos en múltiples cuentas.', 'Establecer y monitorear presupuestos por categoría.', 'Ver resúmenes financieros y análisis de gastos.', 'Gestionar tus datos financieros de forma segura en la nube.'] },
      account: { h: '3. Responsabilidades de la cuenta', items: ['Debes proporcionar información precisa al crear tu cuenta.', 'Eres responsable de mantener la confidencialidad de tu contraseña.', 'Debes notificarnos de inmediato sobre cualquier acceso no autorizado.', 'Eres responsable de toda la actividad que ocurra bajo tu cuenta.', 'Una persona no puede tener más de una cuenta activa.'] },
      acceptable: { h: '4. Uso aceptable', p: 'Aceptas no:', prohibited: ['Usar el Servicio para fines ilegales.', 'Intentar acceder sin autorización a cualquier parte del Servicio.', 'Transmitir código malicioso, virus o datos dañinos.', 'Extraer datos del Servicio por medios automatizados.', 'Hacerse pasar por otra persona o entidad.', 'Interferir con la integridad o el rendimiento del Servicio.'] },
      financial: { h: '5. Datos financieros', p1: 'Todos los datos financieros que introduces en Financeo te pertenecen. No analizamos, vendemos ni usamos tus datos financieros con fines publicitarios.', p2: 'Financeo no se conecta directamente a tus cuentas bancarias y no inicia transacciones financieras en tu nombre. Todos los datos son introducidos manualmente por ti.' },
      ip: { h: '6. Propiedad intelectual', p: 'La aplicación Financeo, incluyendo su diseño, código y contenido (excluyendo tus datos personales), es propiedad de MokaSoftware y está protegida por derechos de autor. No puedes copiar, modificar ni distribuir ninguna parte del Servicio sin nuestro consentimiento previo por escrito.' },
      termination: { h: '7. Terminación', p: 'Nos reservamos el derecho de suspender o terminar tu cuenta en cualquier momento si infringes estos Términos. También puedes eliminar tu cuenta desde la configuración de la app. Tus datos serán eliminados en 30 días según nuestra Política de Privacidad.' },
      disclaimer: { h: '8. Exención de garantías', p: 'El Servicio se proporciona "tal cual" sin garantías de ningún tipo. No garantizamos que el Servicio sea ininterrumpido, sin errores o libre de virus. Usas el Servicio bajo tu propio riesgo.' },
      liability: { h: '9. Limitación de responsabilidad', p: 'En la máxima medida permitida por la ley, MokaSoftware no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos derivados de tu uso del Servicio.' },
      changes: { h: '10. Cambios en los términos', p: 'Podemos actualizar estos Términos. Te notificaremos de cambios significativos por correo o notificación en la app al menos 14 días antes de que entren en vigor.' },
      governing: { h: '11. Ley aplicable', p: 'Estos Términos se rigen por la ley aplicable. Cualquier disputa se resolverá primero mediante negociación de buena fe.' },
      contactSection: { h: '12. Contacto', p: 'Para cualquier pregunta sobre estos Términos, contáctanos en:' },
    },
    footer: { privacy: 'Política de privacidad', contact: 'Contactar soporte' },
  },

  pt: {
    title: 'Termos de Serviço',
    subtitle: 'Última atualização',
    back: '← Voltar',
    sections: {
      acceptance: { h: '1. Aceitação dos Termos', p: 'Ao baixar, instalar ou usar o aplicativo Financeo ("Serviço"), você concorda em ficar vinculado a estes Termos de Serviço. Se não concordar, não use o Serviço.' },
      service: { h: '2. Descrição do Serviço', p: 'O Financeo é um aplicativo de gestão de finanças pessoais que permite:', items: ['Rastrear receitas e despesas em múltiplas contas.', 'Definir e monitorar orçamentos por categoria.', 'Ver resumos financeiros e análises de gastos.', 'Gerenciar seus dados financeiros com segurança na nuvem.'] },
      account: { h: '3. Responsabilidades da Conta', items: ['Você deve fornecer informações precisas ao criar sua conta.', 'Você é responsável pela confidencialidade da sua senha.', 'Você deve nos notificar imediatamente sobre qualquer acesso não autorizado.', 'Você é responsável por toda a atividade que ocorra em sua conta.', 'Uma pessoa não pode ter mais de uma conta ativa.'] },
      acceptable: { h: '4. Uso Aceitável', p: 'Você concorda em não:', prohibited: ['Usar o Serviço para fins ilegais.', 'Tentar obter acesso não autorizado a qualquer parte do Serviço.', 'Transmitir código malicioso, vírus ou dados prejudiciais.', 'Extrair dados do Serviço por meios automatizados.', 'Representar outra pessoa ou entidade.', 'Interferir na integridade ou desempenho do Serviço.'] },
      financial: { h: '5. Dados Financeiros', p1: 'Todos os dados financeiros inseridos no Financeo são seus. Não analisamos, vendemos ou usamos seus dados financeiros para fins publicitários.', p2: 'O Financeo não se conecta diretamente às suas contas bancárias e não inicia transações financeiras em seu nome. Todos os dados são inseridos manualmente por você.' },
      ip: { h: '6. Propriedade Intelectual', p: 'O aplicativo Financeo, incluindo seu design, código e conteúdo (excluindo seus dados pessoais), é propriedade da MokaSoftware e está protegido por direitos autorais. Você não pode copiar, modificar ou distribuir qualquer parte do Serviço sem nosso consentimento prévio por escrito.' },
      termination: { h: '7. Encerramento', p: 'Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento se você violar estes Termos. Você também pode excluir sua conta nas configurações do app. Seus dados serão excluídos em 30 dias conforme nossa Política de Privacidade.' },
      disclaimer: { h: '8. Isenção de Garantias', p: 'O Serviço é fornecido "como está" sem garantias de qualquer tipo. Não garantimos que o Serviço será ininterrupto, sem erros ou livre de vírus. Você usa o Serviço por sua conta e risco.' },
      liability: { h: '9. Limitação de Responsabilidade', p: 'Na máxima extensão permitida pela lei aplicável, a MokaSoftware não será responsável por danos indiretos, incidentais, especiais, consequentes ou punitivos decorrentes do uso do Serviço.' },
      changes: { h: '10. Alterações nos Termos', p: 'Podemos atualizar estes Termos. Notificaremos sobre mudanças significativas por e-mail ou notificação no app com pelo menos 14 dias de antecedência.' },
      governing: { h: '11. Lei Aplicável', p: 'Estes Termos são regidos pela lei aplicável. Quaisquer disputas serão resolvidas primeiro por negociação de boa fé.' },
      contactSection: { h: '12. Contato', p: 'Para quaisquer dúvidas sobre estes Termos, entre em contato conosco em:' },
    },
    footer: { privacy: 'Política de Privacidade', contact: 'Contatar suporte' },
  },

  it: {
    title: 'Termini di Servizio',
    subtitle: 'Ultimo aggiornamento',
    back: '← Indietro',
    sections: {
      acceptance: { h: '1. Accettazione dei Termini', p: "Scaricando, installando o utilizzando l'applicazione Financeo (\"Servizio\"), accetti di essere vincolato da questi Termini di Servizio. Se non sei d'accordo, non utilizzare il Servizio." },
      service: { h: '2. Descrizione del Servizio', p: "Financeo è un'applicazione di gestione delle finanze personali che ti consente di:", items: ['Tracciare entrate e spese su più conti.', 'Impostare e monitorare budget per categoria.', 'Visualizzare riepiloghi finanziari e analisi delle spese.', 'Gestire i tuoi dati finanziari in modo sicuro nel cloud.'] },
      account: { h: "3. Responsabilità dell'Account", items: ["Devi fornire informazioni accurate durante la creazione dell'account.", 'Sei responsabile della riservatezza della tua password.', 'Devi comunicarci immediatamente qualsiasi accesso non autorizzato.', "Sei responsabile di tutta l'attività che si svolge sotto il tuo account.", 'Una persona non può avere più di un account attivo.'] },
      acceptable: { h: '4. Uso Accettabile', p: 'Accetti di non:', prohibited: ['Utilizzare il Servizio per scopi illegali.', 'Tentare di accedere senza autorizzazione a qualsiasi parte del Servizio.', 'Trasmettere codice malevolo, virus o dati dannosi.', 'Estrarre dati dal Servizio con mezzi automatizzati.', "Impersonare un'altra persona o entità.", "Interferire con l'integrità o le prestazioni del Servizio."] },
      financial: { h: '5. Dati Finanziari', p1: 'Tutti i dati finanziari che inserisci in Financeo sono tuoi. Non analizziamo, vendiamo o utilizziamo i tuoi dati finanziari per scopi pubblicitari.', p2: 'Financeo non si connette direttamente ai tuoi conti bancari e non avvia transazioni finanziarie per tuo conto. Tutti i dati vengono inseriti manualmente da te.' },
      ip: { h: '6. Proprietà Intellettuale', p: "L'applicazione Financeo, incluso il suo design, codice e contenuto (esclusi i tuoi dati personali), è di proprietà di MokaSoftware ed è protetta dal diritto d'autore. Non puoi copiare, modificare o distribuire alcuna parte del Servizio senza il nostro previo consenso scritto." },
      termination: { h: '7. Risoluzione', p: "Ci riserviamo il diritto di sospendere o terminare il tuo account in qualsiasi momento se violi questi Termini. Puoi anche eliminare il tuo account dalle impostazioni dell'app. I tuoi dati verranno eliminati entro 30 giorni come descritto nella nostra Informativa sulla Privacy." },
      disclaimer: { h: '8. Esclusione di Garanzie', p: "Il Servizio è fornito \"così com'è\" senza garanzie di alcun tipo. Non garantiamo che il Servizio sarà ininterrotto, privo di errori o di virus. Utilizzi il Servizio a tuo rischio." },
      liability: { h: '9. Limitazione di Responsabilità', p: "Nella misura massima consentita dalla legge applicabile, MokaSoftware non sarà responsabile per danni indiretti, incidentali, speciali, consequenziali o punitivi derivanti dall'utilizzo del Servizio." },
      changes: { h: '10. Modifiche ai Termini', p: 'Potremmo aggiornare questi Termini. Ti informeremo di modifiche significative tramite email o notifica in-app almeno 14 giorni prima che entrino in vigore.' },
      governing: { h: '11. Legge Applicabile', p: 'Questi Termini sono regolati dalla legge applicabile. Qualsiasi controversia verrà risolta prima tramite negoziazione in buona fede.' },
      contactSection: { h: '12. Contatto', p: 'Per qualsiasi domanda su questi Termini di Servizio, contattaci a:' },
    },
    footer: { privacy: 'Informativa sulla Privacy', contact: 'Contatta il supporto' },
  },

  zh: {
    title: '服务条款',
    subtitle: '最后更新',
    back: '← 返回',
    sections: {
      acceptance: { h: '1. 接受条款', p: '通过下载、安装或使用 Financeo 应用程序（"服务"），您同意受本服务条款的约束。如果您不同意，请不要使用本服务。' },
      service: { h: '2. 服务描述', p: 'Financeo 是一款个人财务管理应用程序，允许您：', items: ['跨多个账户追踪收入和支出。', '按类别设置和监控预算。', '查看财务摘要和支出分析。', '在云端安全管理您的财务数据。'] },
      account: { h: '3. 账户责任', items: ['创建账户时必须提供准确的信息。', '您负责保持密码的机密性。', '如发现任何未授权访问，必须立即通知我们。', '您对账户下发生的所有活动负责。', '一个人不得拥有多个活跃账户。'] },
      acceptable: { h: '4. 可接受使用', p: '您同意不：', prohibited: ['将服务用于任何违法目的。', '尝试未经授权访问服务的任何部分。', '传输任何恶意代码、病毒或有害数据。', '通过自动化手段从服务中抓取或提取数据。', '冒充其他人或实体。', '干扰或破坏服务的完整性或性能。'] },
      financial: { h: '5. 财务数据', p1: '您在 Financeo 中输入的所有财务数据均属于您。我们不会分析、出售或将您的财务数据用于广告目的。', p2: 'Financeo 不直接连接到您的银行账户，也不代表您发起任何金融交易。所有数据均由您手动输入。' },
      ip: { h: '6. 知识产权', p: 'Financeo 应用程序（包括其设计、代码和内容，您的个人数据除外）是 MokaSoftware 的财产，受版权法保护。未经我们事先书面同意，您不得复制、修改或分发服务的任何部分。' },
      termination: { h: '7. 终止', p: '如果您违反本条款，我们保留随时暂停或终止您账户的权利。您也可以随时在应用设置中删除账户。终止后，您的数据将在 30 天内按我们的隐私政策规定删除。' },
      disclaimer: { h: '8. 免责声明', p: '服务按"现状"提供，不作任何形式的保证。我们不保证服务不间断、无错误或无病毒。您使用服务的风险由您自行承担。' },
      liability: { h: '9. 责任限制', p: '在适用法律允许的最大范围内，MokaSoftware 不对因您使用服务而产生的任何间接、附带、特殊、后果性或惩罚性损害承担责任。' },
      changes: { h: '10. 条款变更', p: '我们可能会不时更新本条款。我们将在重大变更生效前至少 14 天通过电子邮件或应用内通知告知您。' },
      governing: { h: '11. 适用法律', p: '本条款受适用法律管辖。因本条款产生的任何争议将首先通过善意协商解决。' },
      contactSection: { h: '12. 联系方式', p: '如对本服务条款有任何疑问，请通过以下方式联系我们：' },
    },
    footer: { privacy: '隐私政策', contact: '联系支持' },
  },

  ja: {
    title: '利用規約',
    subtitle: '最終更新',
    back: '← 戻る',
    sections: {
      acceptance: { h: '1. 規約への同意', p: 'Financeo アプリケーション（「サービス」）をダウンロード、インストール、または使用することにより、これらの利用規約に拘束されることに同意したことになります。同意しない場合は、サービスを使用しないでください。' },
      service: { h: '2. サービスの説明', p: 'Financeo は、以下を可能にする個人財務管理アプリケーションです：', items: ['複数の口座にわたる収入と支出の追跡。', 'カテゴリ別の予算の設定と監視。', '財務サマリーと支出分析の閲覧。', 'クラウドでの財務データの安全な管理。'] },
      account: { h: '3. アカウントの責任', items: ['アカウント作成時に正確な情報を提供する必要があります。', 'パスワードの機密性を維持する責任があります。', 'アカウントへの不正アクセスを直ちに通知する必要があります。', 'アカウントで発生するすべての活動に責任を負います。', '1人の人物が複数のアクティブなアカウントを保持することはできません。'] },
      acceptable: { h: '4. 許容される使用', p: '以下のことに同意します：', prohibited: ['サービスをいかなる違法目的にも使用しない。', 'サービスの任意の部分への不正アクセスを試みない。', '悪意のあるコード、ウイルス、または有害なデータを送信しない。', '自動化された手段でサービスからデータを収集しない。', '他の人物や組織になりすまさない。', 'サービスの完全性やパフォーマンスを妨害しない。'] },
      financial: { h: '5. 財務データ', p1: 'Financeo に入力するすべての財務データはお客様のものです。当社はお客様の財務データを広告目的で分析、販売、使用することはありません。', p2: 'Financeo はお客様の銀行口座に直接接続せず、お客様に代わって金融取引を開始しません。すべてのデータはお客様が手動で入力します。' },
      ip: { h: '6. 知的財産', p: 'Financeo アプリケーション（そのデザイン、コード、コンテンツを含み、お客様の個人データを除く）は MokaSoftware の財産であり、著作権法によって保護されています。当社の事前書面による同意なしに、サービスのいかなる部分もコピー、変更、配布することはできません。' },
      termination: { h: '7. 解約', p: 'お客様がこれらの規約に違反した場合、当社はいつでもアカウントを停止または終了する権利を留保します。アプリの設定からいつでもアカウントを削除することもできます。解約後、データはプライバシーポリシーに記載されているとおり 30 日以内に削除されます。' },
      disclaimer: { h: '8. 保証の免責', p: 'サービスは「現状のまま」提供され、いかなる種類の保証もありません。当社はサービスが中断なく、エラーなく、ウイルスなく提供されることを保証しません。お客様はサービスを自己の責任で使用します。' },
      liability: { h: '9. 責任の制限', p: '適用法が許容する最大の範囲で、MokaSoftware はサービスの使用から生じるいかなる間接的、偶発的、特別、結果的または懲罰的損害についても責任を負いません。' },
      changes: { h: '10. 規約の変更', p: '当社はこれらの規約を随時更新する場合があります。重要な変更については、発効の少なくとも 14 日前にメールまたはアプリ内通知でお知らせします。' },
      governing: { h: '11. 準拠法', p: 'これらの規約は適用法に準拠します。規約から生じるいかなる紛争も、まず誠意ある交渉によって解決されます。' },
      contactSection: { h: '12. お問い合わせ', p: 'これらの利用規約に関するご質問は、以下までお問い合わせください：' },
    },
    footer: { privacy: 'プライバシーポリシー', contact: 'サポートに連絡' },
  },

  ko: {
    title: '서비스 약관',
    subtitle: '최종 업데이트',
    back: '← 뒤로',
    sections: {
      acceptance: { h: '1. 약관 동의', p: 'Financeo 애플리케이션("서비스")을 다운로드, 설치 또는 사용함으로써 본 서비스 약관에 동의하는 것입니다. 동의하지 않으면 서비스를 사용하지 마세요.' },
      service: { h: '2. 서비스 설명', p: 'Financeo는 다음을 가능하게 하는 개인 재무 관리 애플리케이션입니다:', items: ['여러 계좌에 걸쳐 수입과 지출 추적.', '카테고리별 예산 설정 및 모니터링.', '재무 요약 및 지출 분석 보기.', '클라우드에서 안전하게 재무 데이터 관리.'] },
      account: { h: '3. 계정 책임', items: ['계정 생성 시 정확한 정보를 제공해야 합니다.', '비밀번호의 기밀성을 유지할 책임이 있습니다.', '계정에 대한 무단 접근이 있으면 즉시 알려야 합니다.', '귀하의 계정에서 발생하는 모든 활동에 책임이 있습니다.', '한 사람이 둘 이상의 활성 계정을 유지할 수 없습니다.'] },
      acceptable: { h: '4. 허용 가능한 사용', p: '다음에 동의합니다:', prohibited: ['불법 목적으로 서비스를 사용하지 않겠습니다.', '서비스의 어떤 부분에도 무단 접근을 시도하지 않겠습니다.', '악성 코드, 바이러스 또는 유해한 데이터를 전송하지 않겠습니다.', '자동화된 수단으로 서비스에서 데이터를 추출하지 않겠습니다.', '다른 사람이나 단체를 사칭하지 않겠습니다.', '서비스의 무결성이나 성능을 방해하지 않겠습니다.'] },
      financial: { h: '5. 재무 데이터', p1: 'Financeo에 입력하는 모든 재무 데이터는 귀하의 것입니다. 광고 목적으로 귀하의 재무 데이터를 분석, 판매 또는 사용하지 않습니다.', p2: 'Financeo는 귀하의 은행 계좌에 직접 연결되지 않으며 귀하를 대신하여 금융 거래를 시작하지 않습니다. 모든 데이터는 귀하가 직접 입력합니다.' },
      ip: { h: '6. 지식재산권', p: 'Financeo 애플리케이션(귀하의 개인 데이터를 제외한 디자인, 코드, 콘텐츠 포함)은 MokaSoftware의 재산이며 저작권법에 의해 보호됩니다. 사전 서면 동의 없이 서비스의 어떤 부분도 복사, 수정 또는 배포할 수 없습니다.' },
      termination: { h: '7. 해지', p: '본 약관을 위반하면 언제든지 귀하의 계정을 정지 또는 종료할 권리를 보유합니다. 앱 설정에서 언제든지 계정을 삭제할 수도 있습니다. 해지 후 데이터는 개인정보 처리방침에 따라 30일 이내에 삭제됩니다.' },
      disclaimer: { h: '8. 보증 부인', p: '서비스는 어떠한 종류의 보증도 없이 "있는 그대로" 제공됩니다. 서비스가 중단 없이, 오류 없이, 바이러스 없이 제공될 것을 보장하지 않습니다. 귀하는 자신의 책임하에 서비스를 사용합니다.' },
      liability: { h: '9. 책임 제한', p: '적용 법률이 허용하는 최대 범위에서 MokaSoftware는 서비스 사용으로 인해 발생하는 간접적, 우발적, 특별, 결과적 또는 징벌적 손해에 대해 책임지지 않습니다.' },
      changes: { h: '10. 약관 변경', p: '본 약관을 수시로 업데이트할 수 있습니다. 중요한 변경 사항은 발효 최소 14일 전에 이메일 또는 앱 내 알림으로 알려드립니다.' },
      governing: { h: '11. 준거법', p: '본 약관은 적용 법률에 따라 규정됩니다. 본 약관으로 인한 분쟁은 먼저 선의의 협상으로 해결됩니다.' },
      contactSection: { h: '12. 문의', p: '본 서비스 약관에 관한 문의는 다음으로 연락해 주세요:' },
    },
    footer: { privacy: '개인정보 처리방침', contact: '지원팀 연락' },
  },
}

export { resolveLang, SUPPORT_EMAIL, LAST_UPDATED }
