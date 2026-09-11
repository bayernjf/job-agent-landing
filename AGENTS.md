# AGENTS.md — job-agent-landing

供 AI coding agents（Claude Code / Codex / Cursor / Copilot 等）在本仓库工作时自动读取。

## 项目概览
JobAgent 落地页：以 GitHub 为桥梁的智能招聘平台（把仓库分析成可信、可解释、可复核的能力画像，服务企业与求职者）。
单页 Astro 7 静态站点（`output: 'static'`），中英双语 i18n（defaultLocale=`en`，中文在 `/zh/`），无 React island，Demo 区用 localStorage 做内测预约。
样式为 Tailwind CSS 4 utility 优先（组件已全部迁移），`global.css` 仅保留 design token、共享原语和复杂视觉。

## 技术栈
| 类别 | 方案 |
|------|------|
| 框架 | Astro 7（SSG，`output: 'static'`） |
| 语言 | 中英双语 i18n（`defaultLocale: 'en'`，`prefixDefaultLocale: false`，中文在 `/zh/`） |
| 样式 | Tailwind CSS 4（`@theme` token）+ utility 优先；`global.css` 仅保留 token / 共享原语 / 复杂视觉；`@bay/landing-ui` tokens 已在 `global.css` 顶部 `@import`，品牌色通过 `--lui-accent` 覆盖 |
| 共享组件 | `@bay/landing-ui`（v1.5.0）：Nav / Footer 统一使用 `BayjfLink` + `StarOnGithub` |
| i18n | Astro 内置 i18n，翻译字典 `src/i18n/ui.ts`（`getLangFromUrl` / `useTranslations` / `localizePath` / `getAltLangPath`） |
| 交互 | 原生 JS（Demo 内测预约表单，`localStorage` key：`jobagent_waitlist`） |
| Node / 包管理 | >= 22.12.0（本机 v22）/ npm |

## 常用命令
```bash
npm install
npm run dev       # 开发服务器
npm run build     # astro build + Playwright 截图生成 og 图（首次需 npx playwright install chromium）
npm run preview   # 预览 dist
```

## 约定
- 页面章节按 `src/pages/index.astro` 顺序：Hero → Problem → Solution → Moat → Roadmap → Demo（`#demo` 内测预约）。
- **i18n**：所有用户可见文案必须走 `src/i18n/ui.ts` 翻译字典，新增 key 必须同时补 `zh` 和 `en`；组件通过 `getLangFromUrl(Astro.url)` 自动检测语言，不要硬编码文案或语言判断；英文页在根路径，中文页在 `/zh/`。
- 文案默认简体中文，修改用户可见文案时保持全站语气一致（产品构想讨论稿基调，见产品仓库 `job-agent` 的 docs/PRD.md）；英文翻译保持同等信息密度，不缩水。
- **与其他 `*-landing` 站点对齐**：依赖 `@bay/landing-ui`，Nav 和 Footer 必须包含 `BayjfLink`（bayjf.com 回链）和 `StarOnGithub`（产品仓库 Star 按钮）。新增共享元素优先从 landing-ui 取，不手抄。
- **Tailwind CSS 4**：design token 在 `global.css` 的 `@theme { ... }` 块中定义，新增颜色/间距先检查 `@theme` 是否已有；组件优先使用 Tailwind utility，仅复杂视觉（多层渐变背景、渐变文字、伪元素、进度条、legal 页面样式）保留在 `global.css`。响应式断点优先用 arbitrary 值（`max-[640px]`/``max-[960px]`）以精确匹配设计稿，不要用标准断点（md/lg）替代除非设计稿明确对应。
- 品牌色通过 `--lui-accent` / `--lui-accent-hover` 覆盖；站点为浅色主题，需同时覆盖 `--lui-surface` / `--lui-border`（landing-ui 默认 dark-first）。
- **og:image**：og 图 = 首屏截图，由 `scripts/shot.mjs` 用 Playwright 截取（1280×800，16:10），输出 `dist/preview-zh.png` / `dist/preview-en.png`，`Layout.astro` 按语言引用。格式已与 hub 站对齐，视觉风格待 MVP 后统一。不要把 og 图换成静态插画或其他形式，除非产品视觉定稿后明确要求。
- `astro.config.mjs` 的 `site` 为 `https://job-agent.bayjf.com`。
- 部署细节见 `docs/DEPLOYMENT.md`；未部署前不编造线上地址。
- 产品仓库：https://github.com/bayernjf/job-agent（工程约定以该仓库 AGENTS.md 为准）。

## 不要做的事
- 不要直接改构建产物 `dist/`。
- 不要硬编码新的 hex 色值到组件里——先检查 `src/styles/global.css` 的 `@theme` 变量和 `:root` 变量（含 `--lui-*`）是否已有。
- 不要在组件里硬编码用户可见文案——必须走 `src/i18n/ui.ts` 翻译字典，且同时补中英双语。
- 不要移除 `@bay/landing-ui` 依赖或把 `BayjfLink` / `StarOnGithub` 替换为手写版本——这是与其他 `*-landing` 站点对齐的基线。
- 不要把已迁移到 Tailwind utility 的组件改回自定义 CSS 类——保持 utility 优先的一致性。
- 不要提交 `.env` 或任何密钥。
- 不要跳过 `git pull --rebase` 直接 push。
- Commit message 一律用英文（Conventional Commits，见 `git-commit-message.md`）。
