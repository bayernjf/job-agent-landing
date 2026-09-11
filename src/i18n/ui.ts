export const languages = {
  zh: '简体中文',
  en: 'English',
} as const;

export const defaultLang = 'en';
export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function localizePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getAltLangPath(url: URL, currentLang: Lang): string {
  const targetLang = currentLang === 'en' ? 'zh' : 'en';
  const path = url.pathname;
  if (currentLang === defaultLang) {
    // Currently at root (en), switch to /zh + path
    return `/zh${path === '/' ? '' : path}`;
  } else {
    // Currently at /zh/..., strip the /zh prefix
    const withoutPrefix = path.replace(/^\/zh/, '') || '/';
    return withoutPrefix;
  }
}

export const ui = {
  zh: {
    // Nav
    'nav.problem': '理念',
    'nav.solution': '方案',
    'nav.moat': '验证引擎',
    'nav.roadmap': '路线',
    'nav.cta': '预约内测',
    'nav.langSwitch': 'English',

    // Hero
    'hero.badge': 'AI 时代的招聘新范式',
    'hero.title1': '简历会说谎，',
    'hero.title2': '代码不会。',
    'hero.lead': 'GitHub 是开发者最真实的简历——代码、commit 历史、PR 协作，都是"做过的事"而不是"说过的话"。JobAgent 把仓库分析成可验证的能力画像，让企业招到真正做过的人，让求职者用作品证明自己。',
    'hero.cta.primary': '预约内测',
    'hero.cta.secondary': '了解双向闭环',
    'hero.meta.evidence.title': '真实证据',
    'hero.meta.evidence.desc': 'commit · PR · Issue',
    'hero.meta.loop.title': '双向闭环',
    'hero.meta.loop.desc': '招聘 + 应聘',
    'hero.meta.trust.title': '证据可信',
    'hero.meta.trust.desc': 'AI 污染检测',
    'hero.repo.name': '林小满 · 全栈工程师',
    'hero.repo.handle': 'github.com/linxiaoman',
    'hero.repo.verified': '✓ 已验证',
    'hero.repo.repoTitle': 'linxiaoman / job-agent',
    'hero.repo.repoDesc': 'AI 时代的招聘平台 · 仓库深度分析',
    'hero.repo.langLabel': '语言构成',
    'hero.repo.tag1': '# 全栈',
    'hero.repo.tag2': '# TypeScript',
    'hero.repo.tag3': '# 长线投入 14 个月',
    'hero.repo.tag4': '# PR 协作 23 次',
    'hero.repo.stat1': 'commit',
    'hero.repo.stat2': 'star',
    'hero.repo.stat3': '真实性',
    'hero.repo.stat3val': '已分级验证',
    'hero.repo.note': '示意数据 · 产品演示用',

    // Problem
    'problem.eyebrow': '理念 · 问题',
    'problem.title': 'AI 时代，传统招聘链路正在失效',
    'problem.sub': '简历是自我描述，面试能被训练——真正能证明能力的，是留下过的行为痕迹。',
    'problem.card1.title': '简历可批量生成',
    'problem.card1.desc': 'AI 能写、能美化、能造假简历。HR 筛简历，筛的其实是"文案能力"，不是工作能力。',
    'problem.card2.title': '面试能被"面经"训练',
    'problem.card2.desc': '八股题与题库被反复练习，面试表现与真实工作能力越来越脱节。',
    'problem.card3.title': 'GitHub 也被 AI 污染',
    'problem.card3.desc': '一键生成的模板仓库、刷的 star、灌水的 commit——只看表面数据，一样会被骗。',
    'problem.card4.title': '筛选成本越来越高',
    'problem.card4.desc': '简历量爆炸 + 虚假信息泛滥，招聘方的验证成本和时间成本急剧上升。',
    'problem.takeaway': '问题的解药不是"更多简历数据"，而是可验证的真实工作证据——这正是 GitHub 提供的东西，也是 JobAgent 要做的事。',

    // Solution
    'solution.eyebrow': '方案 · 双向闭环',
    'solution.title': '招聘与应聘，围绕同一份真实证据运转',
    'solution.sub': 'GitHub 是中间的桥梁：企业的岗位要求与求职者的能力画像，都在同一份"真实工作痕迹"上对齐。',
    'solution.mvpNote': '当前 MVP 聚焦中间的共享分析内核——输入 GitHub 用户名即产出可验证的能力画像报告；B 端岗位/匹配与 C 端投递等双边功能在后续迭代中逐步开放。',
    'solution.b.title': '招聘侧：从筛简历，到验证据',
    'solution.b.tag': 'B端 · 企业',
    'solution.b.step1.title': '发布岗位',
    'solution.b.step1.desc': '技术栈 · 能力标签 · 项目要求',
    'solution.b.step2.title': '画像匹配排序',
    'solution.b.step2.desc': '能力画像 vs 岗位要求，自动匹配',
    'solution.b.step3.title': '真实项目面试',
    'solution.b.step3.desc': '基于候选人仓库生成问题，问"为什么这样设计"',
    'solution.bridge.title': 'GitHub —— 真实工作痕迹',
    'solution.bridge.sub': '代码 · commit 历史 · PR 协作 · Issue 讨论 · 项目演进',
    'solution.c.title': '应聘侧：GitHub 即活的简历',
    'solution.c.tag': 'C端 · 求职者',
    'solution.c.step1.title': '授权 GitHub',
    'solution.c.step1.desc': 'OAuth 登录，授权分析公开仓库',
    'solution.c.step2.title': '仓库分析',
    'solution.c.step2.desc': '真实性验证 → 深度分析：代码、活跃度、协作',
    'solution.c.step3.title': '能力画像 + 投递',
    'solution.c.step3.desc': '能力标签 · 改进建议 · 岗位推荐 · 一键投递',
    'solution.feedback': '面试反馈 → 求职者按建议改进仓库 → 能力画像持续更新 → 下一次投递更有竞争力',

    // Moat
    'moat.eyebrow': '护城河 · 验证引擎',
    'moat.title': '不止看 GitHub，更要鉴别 GitHub',
    'moat.sub': 'AI 时代，GitHub 上同样充斥着"看起来努力"的假仓库。JobAgent 的核心能力是让证据可信。',
    'moat.card1.k': 'AI 仓库识别',
    'moat.card1.title': '识别一键生成 / 模板克隆',
    'moat.card1.desc': '检测无真实开发过程、代码雷同度过高的仓库，排除"看起来像项目"的空壳。',
    'moat.card2.k': '行为模式分析',
    'moat.card2.title': '识别刷 star / 异常 commit',
    'moat.card2.desc': 'commit 时间分布、贡献者结构、star 增长曲线——异常刷量模式无处遁形。',
    'moat.card3.k': '协作信号核验',
    'moat.card3.title': 'PR · Issue · 真实协作记录',
    'moat.card3.desc': '在真实项目中合并过的代码、参与过的讨论，比任何自我描述都更有说服力。',
    'moat.note': '单纯"展示 GitHub"没有门槛；只有把仓库分析成可信、可解释、可复核的能力证据，招聘方和求职者才都愿意长期使用——这是从工具到平台的分水岭。',

    // Roadmap
    'roadmap.eyebrow': '路线 · 已决策',
    'roadmap.title': '四期迭代，从分析内核到双边平台',
    'roadmap.sub': '不做排他选择——技术岗与非技术岗、企业服务与求职者服务、海内外市场，全部纳入；按 M1→M4 分期落地，每期验证后再进入下一期。',
    'roadmap.m1.status': 'M1 · 当前 MVP',
    'roadmap.m1.title': '分析内核 + 报告',
    'roadmap.m1.desc': 'L0/L1 管道（纯 API，不 clone）、能力画像 v0.1、真实性分级 + 证据、真实项目面试问题、落地页 Demo 接真。',
    'roadmap.m1.item1': '输入 GitHub 用户名 → 可验证画像报告',
    'roadmap.m1.item2': '真实性四级分级，不输出单一百分比',
    'roadmap.m1.item3': '20–50 标注账号去风险实验',
    'roadmap.m2.status': 'M2 · 紧随其后',
    'roadmap.m2.title': '本人认领 + 轻 B 端',
    'roadmap.m2.desc': '开发者 OAuth 授权认领本人画像、改进建议、公开轻预览、异议处理入口、L3 语义层面试问题增强。',
    'roadmap.m2.item1': '本人授权/分享为"权威报告"',
    'roadmap.m2.item2': '未授权仅公开轻预览并显著标注',
    'roadmap.m2.item3': '招聘方粘贴公开账号看精简画像',
    'roadmap.m3.status': 'M3 · 验证通过后',
    'roadmap.m3.title': '双边闭环',
    'roadmap.m3.desc': '岗位发布、画像 vs 岗位匹配排序、一键投递、面试结果标签回流、订阅/增值付费验证。',
    'roadmap.m3.item1': 'B 端：企业 SaaS 招聘工具订阅',
    'roadmap.m3.item2': 'C 端：深度分析 · 岗位推荐 · 画像服务',
    'roadmap.m3.item3': '结果标签回流 = 长期数据壁垒',
    'roadmap.m4.status': 'M4 · 系统层',
    'roadmap.m4.title': '多平台 / 非技术岗',
    'roadmap.m4.desc': 'L2 clone 静态分析（隔离沙箱）、L4 跨库身份聚合、Gitee 接入、非技术岗多元证据源（作品集/案例/证书）。',
    'roadmap.m4.item1': '海外 GitHub 优先验证，Gitee 后置',
    'roadmap.m4.item2': '技术岗跑通后扩展非技术岗',
    'roadmap.m4.item3': '统一 EvidenceItem 结构接入多源',

    // Demo
    'demo.eyebrow': '内测预约',
    'demo.title': '输入你的 GitHub 用户名',
    'demo.sub': '产品开发中——提交后即加入内测队列（演示版，记录仅保存在你的浏览器本地）。',
    'demo.placeholder': '例如：torvalds',
    'demo.button': '预约内测',
    'demo.tip': '正式版将在这里展示你的仓库能力画像',
    'demo.result.success': '已记录 @{name}，你已加入内测队列（第 {count} 位）。',
    'demo.result.empty': '请输入 GitHub 用户名',
    'demo.result.error': '浏览器不支持本地存储，请换个浏览器试试。',
    'demo.button.analyze': '生成能力画像',
    'demo.state.queued': '排队中，请稍候…',
    'demo.state.running': '正在分析 GitHub 行为痕迹…',
    'demo.state.failed': '分析失败，请稍后重试',
    'demo.state.invalid': 'GitHub 用户名格式无效',

    // Footer
    'footer.copyright': '© 2026 JobAgent · 产品构想讨论稿 · 开发中',
    'footer.backToTop': '回到顶部',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',

    // 404
    '404.code': '404',
    '404.title': '页面不存在',
    '404.desc': '你访问的页面可能已被移动或删除。',
    '404.cta': '返回首页',

    // Legal shared
    'legal.lastUpdated': '最后更新：2026 年 9 月 11 日',
  },

  en: {
    // Nav
    'nav.problem': 'Why',
    'nav.solution': 'How',
    'nav.moat': 'Engine',
    'nav.roadmap': 'Roadmap',
    'nav.cta': 'Join Beta',
    'nav.langSwitch': '简体中文',

    // Hero
    'hero.badge': 'A new paradigm for hiring in the AI era',
    'hero.title1': 'Resumes lie. ',
    'hero.title2': 'Code doesn\'t.',
    'hero.lead': 'GitHub is a developer\'s most truthful resume — code, commit history, and PR collaboration are things you\'ve done, not things you\'ve said. JobAgent turns repositories into verifiable ability profiles, so companies hire people who\'ve actually built things, and candidates prove themselves with their work.',
    'hero.cta.primary': 'Join Beta',
    'hero.cta.secondary': 'See the dual loop',
    'hero.meta.evidence.title': 'Real Evidence',
    'hero.meta.evidence.desc': 'commits · PRs · Issues',
    'hero.meta.loop.title': 'Dual Loop',
    'hero.meta.loop.desc': 'hiring + applying',
    'hero.meta.trust.title': 'Verifiable',
    'hero.meta.trust.desc': 'AI pollution detection',
    'hero.repo.name': 'Lin Xiaoman · Full-Stack Engineer',
    'hero.repo.handle': 'github.com/linxiaoman',
    'hero.repo.verified': '✓ Verified',
    'hero.repo.repoTitle': 'linxiaoman / job-agent',
    'hero.repo.repoDesc': 'AI-era hiring platform · deep repository analysis',
    'hero.repo.langLabel': 'Language breakdown',
    'hero.repo.tag1': '# Full-Stack',
    'hero.repo.tag2': '# TypeScript',
    'hero.repo.tag3': '# 14-month long-term investment',
    'hero.repo.tag4': '# 23 PR collaborations',
    'hero.repo.stat1': 'commits',
    'hero.repo.stat2': 'stars',
    'hero.repo.stat3': 'Authenticity',
    'hero.repo.stat3val': 'Graded verification',
    'hero.repo.note': 'Sample data · for product demo only',

    // Problem
    'problem.eyebrow': 'Why · The Problem',
    'problem.title': 'The traditional hiring pipeline is breaking down in the AI era',
    'problem.sub': 'Resumes are self-descriptions and interviews can be trained — what truly proves ability is the behavioral trail left behind.',
    'problem.card1.title': 'Resumes can be mass-generated',
    'problem.card1.desc': 'AI can write, polish, and fabricate resumes. When HR screens resumes, they\'re really screening copywriting ability, not work ability.',
    'problem.card2.title': 'Interviews can be gamed with prep',
    'problem.card2.desc': 'Canned questions and question banks are drilled repeatedly, making interview performance increasingly disconnected from real on-the-job ability.',
    'problem.card3.title': 'GitHub is also polluted by AI',
    'problem.card3.desc': 'One-click template repos, inflated stars, padded commits — surface-level data alone can be just as misleading.',
    'problem.card4.title': 'Screening costs keep rising',
    'problem.card4.desc': 'Resume volume explodes alongside misinformation, driving verification and time costs sharply upward for hiring teams.',
    'problem.takeaway': 'The antidote isn\'t "more resume data" — it\'s verifiable, real work evidence. That\'s exactly what GitHub provides, and exactly what JobAgent is built to do.',

    // Solution
    'solution.eyebrow': 'How · The Dual Loop',
    'solution.title': 'Hiring and applying revolve around the same real evidence',
    'solution.sub': 'GitHub is the bridge in the middle: enterprise job requirements and candidate ability profiles both align on the same "real work trail."',
    'solution.mvpNote': 'The current MVP focuses on the shared analysis core in the middle — enter a GitHub username and get a verifiable ability profile report. B-side job posting/matching and C-side application features open up in later iterations.',
    'solution.b.title': 'Hiring side: from screening resumes to verifying evidence',
    'solution.b.tag': 'B-side · Enterprise',
    'solution.b.step1.title': 'Post a job',
    'solution.b.step1.desc': 'Tech stack · ability tags · project requirements',
    'solution.b.step2.title': 'Profile matching & ranking',
    'solution.b.step2.desc': 'Ability profile vs. job requirements, auto-matched',
    'solution.b.step3.title': 'Real-project interviews',
    'solution.b.step3.desc': 'Questions generated from the candidate\'s own repos — ask "why did you design it this way"',
    'solution.bridge.title': 'GitHub — real work trail',
    'solution.bridge.sub': 'code · commit history · PR collaboration · Issue discussion · project evolution',
    'solution.c.title': 'Applying side: GitHub as a living resume',
    'solution.c.tag': 'C-side · Candidate',
    'solution.c.step1.title': 'Authorize GitHub',
    'solution.c.step1.desc': 'OAuth login, authorize analysis of public repos',
    'solution.c.step2.title': 'Repository analysis',
    'solution.c.step2.desc': 'Authenticity verification → deep analysis: code, activity, collaboration',
    'solution.c.step3.title': 'Ability profile + apply',
    'solution.c.step3.desc': 'Ability tags · improvement suggestions · job recommendations · one-click apply',
    'solution.feedback': 'Interview feedback → candidates improve their repos based on suggestions → ability profile continuously updates → next application is more competitive',

    // Moat
    'moat.eyebrow': 'Moat · The Verification Engine',
    'moat.title': 'We don\'t just look at GitHub — we verify it',
    'moat.sub': 'In the AI era, GitHub is full of repos that "look hardworking" but aren\'t. JobAgent\'s core capability is making evidence trustworthy.',
    'moat.card1.k': 'AI Repo Detection',
    'moat.card1.title': 'Detect one-click generated / template-cloned repos',
    'moat.card1.desc': 'Flag repos with no real development process and excessive code similarity, filtering out "project-looking" shells.',
    'moat.card2.k': 'Behavior Pattern Analysis',
    'moat.card2.title': 'Detect star inflation / anomalous commits',
    'moat.card2.desc': 'Commit time distribution, contributor structure, star growth curves — anomalous inflation patterns have nowhere to hide.',
    'moat.card3.k': 'Collaboration Signal Verification',
    'moat.card3.title': 'PR · Issue · real collaboration records',
    'moat.card3.desc': 'Code merged in real projects and discussions participated in are more persuasive than any self-description.',
    'moat.note': 'Simply "displaying GitHub" has no moat. Only by analyzing repos into trustworthy, explainable, reviewable ability evidence will both hiring teams and candidates want to use it long-term — that\'s the watershed from tool to platform.',

    // Roadmap
    'roadmap.eyebrow': 'Roadmap · Decided',
    'roadmap.title': 'Four phases, from analysis core to two-sided platform',
    'roadmap.sub': 'No exclusive choices — technical and non-technical roles, enterprise and candidate services, overseas and domestic markets, all included. Rolled out in M1→M4 phases, each validated before moving to the next.',
    'roadmap.m1.status': 'M1 · Current MVP',
    'roadmap.m1.title': 'Analysis Core + Report',
    'roadmap.m1.desc': 'L0/L1 pipeline (API-only, no clone), AbilityProfile v0.1, authenticity grading + evidence, real-project interview questions, landing page Demo connected to real engine.',
    'roadmap.m1.item1': 'Enter GitHub username → verifiable profile report',
    'roadmap.m1.item2': 'Four-level authenticity grading, no single percentage',
    'roadmap.m1.item3': '20–50 labeled accounts de-risking experiment',
    'roadmap.m2.status': 'M2 · Next',
    'roadmap.m2.title': 'Self-claim + Light B-side',
    'roadmap.m2.desc': 'Developer OAuth to claim own profile, improvement suggestions, public light preview, dispute handling entry, L3 semantic-layer interview question enhancement.',
    'roadmap.m2.item1': 'Self-authorized/shared reports are "authoritative"',
    'roadmap.m2.item2': 'Unauthorized access gets public light preview with clear labeling',
    'roadmap.m2.item3': 'Hiring teams paste public accounts to see concise profiles',
    'roadmap.m3.status': 'M3 · After validation',
    'roadmap.m3.title': 'Two-sided Loop',
    'roadmap.m3.desc': 'Job posting, profile vs. job matching & ranking, one-click apply, interview outcome label feedback, subscription/value-added payment validation.',
    'roadmap.m3.item1': 'B-side: enterprise SaaS hiring tool subscription',
    'roadmap.m3.item2': 'C-side: deep analysis · job recommendations · profile services',
    'roadmap.m3.item3': 'Outcome label feedback = long-term data moat',
    'roadmap.m4.status': 'M4 · System Layer',
    'roadmap.m4.title': 'Multi-platform / Non-technical',
    'roadmap.m4.desc': 'L2 clone static analysis (isolated sandbox), L4 cross-repo identity aggregation, Gitee integration, non-technical multi-evidence sources (portfolios/cases/certificates).',
    'roadmap.m4.item1': 'Overseas GitHub first, Gitee later',
    'roadmap.m4.item2': 'Extend to non-technical roles after technical roles work',
    'roadmap.m4.item3': 'Unified EvidenceItem structure for multi-source intake',

    // Demo
    'demo.eyebrow': 'Beta Access',
    'demo.title': 'Enter your GitHub username',
    'demo.sub': 'Product in development — submit to join the beta queue (demo mode, records stored only in your browser local storage).',
    'demo.placeholder': 'e.g. torvalds',
    'demo.button': 'Join Beta',
    'demo.tip': 'The production version will show your repository ability profile here',
    'demo.result.success': 'Recorded @{name}, you\'ve joined the beta queue (position #{count}).',
    'demo.result.empty': 'Please enter a GitHub username',
    'demo.result.error': 'Browser doesn\'t support local storage. Please try a different browser.',
    'demo.button.analyze': 'Generate profile',
    'demo.state.queued': 'Queued, please wait…',
    'demo.state.running': 'Analyzing your GitHub activity…',
    'demo.state.failed': 'Analysis failed, please try again later',
    'demo.state.invalid': 'Invalid GitHub username',

    // Footer
    'footer.copyright': '© 2026 JobAgent · Product concept draft · In development',
    'footer.backToTop': 'Back to top',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',

    // 404
    '404.code': '404',
    '404.title': 'Page Not Found',
    '404.desc': 'The page you\'re looking for may have been moved or deleted.',
    '404.cta': 'Back to Home',

    // Legal shared
    'legal.lastUpdated': 'Last updated: September 11, 2026',
  },
} as const;

export type UIKey = keyof typeof ui[typeof defaultLang];
