# AGENTS.md — job-agent-landing

供 AI coding agents（Claude Code / Codex / Cursor / Copilot 等）在本仓库工作时自动读取。

## 项目概览
JobAgent 落地页：以 GitHub 为桥梁的智能招聘平台（把仓库分析成可信、可解释、可复核的能力画像，服务企业与求职者）。
单页 Astro 5 静态站点（`output: 'static'`），简体中文，无 i18n、无 React island，Demo 区用 localStorage 做内测预约。

## 技术栈
| 类别 | 方案 |
|------|------|
| 框架 | Astro 5（SSG，`output: 'static'`） |
| 语言 | 简体中文（单语，`lang="zh-CN"`） |
| 样式 | 原生 CSS，design token 集中在 `src/styles/global.css` 的 `:root` 变量 |
| 交互 | 原生 JS（Demo 内测预约表单，`localStorage` key：`jobagent_waitlist`） |
| Node / 包管理 | >= 18.17（本机 v22）/ npm |

## 常用命令
```bash
npm install
npm run dev       # 开发服务器
npm run build     # astro build
npm run preview   # 预览 dist
```

## 约定
- 页面章节按 `src/pages/index.astro` 顺序：Hero → Problem → Solution → Moat → Roadmap → Demo（`#demo` 内测预约）。
- 文案默认简体中文，修改用户可见文案时保持全站语气一致（产品构想讨论稿基调，见产品仓库 `job-agent` 的 docs/PRD.md）。
- `astro.config.mjs` 的 `site` 目前是占位域名 `https://jobagent.example.com`，上线时替换为真实域名。
- 部署细节见 `docs/DEPLOYMENT.md`；未部署前不编造线上地址。
- 产品仓库：https://github.com/bayernjf/job-agent（工程约定以该仓库 AGENTS.md 为准）。

## 不要做的事
- 不要直接改构建产物 `dist/`。
- 不要硬编码新的 hex 色值到组件里——先检查 `src/styles/global.css` 的 `:root` 变量是否已有。
- 不要提交 `.env` 或任何密钥。
- 不要跳过 `git pull --rebase` 直接 push。
- Commit message 一律用英文（Conventional Commits，见 `git-commit-message.md`）。
