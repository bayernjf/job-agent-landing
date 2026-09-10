# Handoff — job-agent-landing

更新时间：2026-09-11

## 项目概况
JobAgent 落地页：以 GitHub 为桥梁的智能招聘平台（把仓库分析成可信、可解释、可复核的能力画像，服务企业与求职者）。
Astro 7 静态站点（`output: 'static'`），中英双语 i18n（defaultLocale=`en`，英文在根路径，中文在 `/zh/`），无 React island；
Demo 区用 localStorage（key：`jobagent_waitlist`）做内测预约；样式为 Tailwind CSS 4 + 原生 CSS 混合模式，
`global.css` 顶部 `@import "tailwindcss"` + `@import "@bay/landing-ui/styles/tokens.css"`，design token 集中在 `@theme { ... }`，
品牌色通过 `--lui-accent` 覆盖；构建时用 `scripts/shot.mjs`（Playwright）截图生成中英文预览图 / og:image。

- 线上：https://job-agent.bayjf.com （自定义域名）· `job-agent-landing.pages.dev`（Pages 域名）
- 产品仓库：https://github.com/bayernjf/job-agent（public）
- 远端：`git@github.com:bayernjf/job-agent-landing.git`（public）

## 技术栈
| 类别 | 方案 |
|------|------|
| 框架 | Astro 7（SSG，`output: 'static'`） |
| 语言 | 中英双语 i18n（`defaultLocale: 'en'`，`prefixDefaultLocale: false`，中文在 `/zh/`） |
| 样式 | Tailwind CSS 4（`@theme` token）+ 原生 CSS 组件类 + `@bay/landing-ui` tokens |
| 共享组件 | `@bay/landing-ui` v1.5.0：Nav / Footer 统一使用 `BayjfLink` + `StarOnGithub` |
| i18n | Astro 内置 i18n，翻译字典 `src/i18n/ui.ts`（`getLangFromUrl` / `useTranslations` / `localizePath` / `getAltLangPath`） |
| SEO | `@astrojs/sitemap`（含 i18n locale 映射） |
| 交互 | 原生 JS（Demo 内测预约表单，`localStorage` key：`jobagent_waitlist`，按 URL 路径 `/en` 切换中英文提示） |
| Node / 包管理 | >= 22.12.0（本机 v22）/ npm |

## 页面结构
- `/` — 英文首页（Hero → Problem → Solution → Moat → Roadmap → Demo）
- `/404` — 英文 404
- `/privacy` — 英文隐私政策
- `/terms` — 英文服务条款
- `/zh/` — 中文首页
- `/zh/404` — 中文 404
- `/zh/privacy` — 中文隐私政策（披露 Demo 表单 GitHub 用户名仅存浏览器 localStorage）
- `/zh/terms` — 中文服务条款（含产品开发阶段免责声明）

## 当前状态（分支 dev）
最近提交：
- `2f28cb8` docs(agents): document landing-ui alignment conventions
- `7b89185` feat(footer): integrate BayjfLink and StarOnGithub
- `d6ce0ae` feat(nav): integrate BayjfLink and StarOnGithub
- `69c3f02` style(global): import landing-ui tokens and add shared component styles
- `96b9030` chore(deps): add @bay/landing-ui v1.5.0
- `87c6e3a` fix: replace authenticity percentage with graded badge

**工作区有未提交改动**（任务 1-10：基线页面、文案同步 PRD、Astro 7+Tailwind 4 升级、i18n 英文版、og 图语言感知），待按原子规则提交。

`dev` 领先 `origin/dev` 若干提交，未 push。

部署：Cloudflare Pages（Git 集成）已上线，配置与 work-learn-landing 一致（build command
`npx playwright install chromium && npm run build`，env `NODE_VERSION=22` + `PLAYWRIGHT_BROWSERS_PATH=0`），
Production branch 为 `main`，`dev` 推送只出 preview。

## 注意点
- **Commit message 一律用英文**（Conventional Commits）。
- **与其他 `*-landing` 站点对齐**：依赖 `@bay/landing-ui`，Nav 和 Footer 必须包含 `BayjfLink` + `StarOnGithub`。新增共享元素优先从 landing-ui 取，不手抄。
- **i18n**：所有用户可见文案必须走 `src/i18n/ui.ts` 翻译字典，新增 key 必须同时补 `zh` 和 `en`；组件通过 `getLangFromUrl(Astro.url)` 自动检测语言，不要硬编码语言判断；英文页在根路径（无前缀），中文页在 `/zh/`。
- **Tailwind CSS 4**：design token 在 `global.css` 的 `@theme { ... }` 块中定义（`--color-*`、`--font-*`、`--radius-*` 等），新增颜色/间距先检查 `@theme` 是否已有；组件保留自定义 CSS 类（与其他 landing 混合模式一致），新组件可按需用 Tailwind utility。
- 品牌色通过 `--lui-accent` / `--lui-accent-hover` 覆盖；站点为浅色主题，需同时覆盖 `--lui-surface` / `--lui-border`（landing-ui 默认 dark-first）。
- 产品工程约定以 `job-agent` 仓库的 AGENTS.md 为准（本仓库只维护落地页自身的约定）。
- 改域名需同步 `astro.config.mjs` 的 `site` 与 `src/layouts/Layout.astro` 的 og:image / og:url（og 已按语言切换：中文 `preview-zh.png`，英文 `preview-en.png`）。
- 本机 Node v22 已验证；Astro 7 要求 Node >= 22.12.0。
- `npm run build` 内含截图脚本，本地首次构建前需 `npx playwright install chromium`。
- Demo 表单收集的 GitHub 用户名仅存于用户浏览器 localStorage（`jobagent_waitlist`），不上传服务器——隐私政策已披露。

## 下一步
1. 落地页文案随 `job-agent` 产品迭代同步（Demo 预约体验等数字型/功能型文案易过期）。
2. 产品 MVP 起步后，把落地页 og 图视觉风格与 hub 站（bayjf）产品卡片封面进一步对齐（当前 og 图为 16:10 首屏截图，格式已对齐，视觉风格待 MVP 后统一）。
3. 组件逐步从自定义 CSS 类迁移到 Tailwind utility（当前为混合模式，不阻塞功能）。
