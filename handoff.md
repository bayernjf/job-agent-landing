# Handoff — job-agent-landing

更新时间：2026-09-10

## 项目概况
JobAgent 落地页：以 GitHub 为桥梁的智能招聘平台（把仓库分析成可信、可解释、可复核的能力画像，服务企业与求职者）。
Astro 5 静态站点（`output: 'static'`），简体中文单语，无 i18n、无 React island；Demo 区用 localStorage
（key：`jobagent_waitlist`）做内测预约；design token 集中在 `src/styles/global.css` 的 `:root` 变量；
构建时用 `scripts/shot.mjs`（Playwright）截图生成预览图 / og:image。

- 线上：https://job-agent.bayjf.com （自定义域名）· `job-agent-landing.pages.dev`（Pages 域名）
- 产品仓库：https://github.com/bayernjf/job-agent（public）
- 远端：`git@github.com:bayernjf/job-agent-landing.git`（public）

## 当前状态（分支 dev，与 origin/dev 同步，工作区干净）
最近提交：
- `6af5bb5` chore: point site url to job-agent.bayjf.com
- `20a3de0` feat: add preview screenshot pipeline and og meta
- `4d6df0c` chore: trigger initial pages deployment
- `8cff400` Merge pull request #1 from bayernjf/dev

部署：Cloudflare Pages（Git 集成）已上线，配置与 work-learn-landing 一致（build command
`npx playwright install chromium && npm run build`，env `NODE_VERSION=22` + `PLAYWRIGHT_BROWSERS_PATH=0`），
Production branch 为 `main`，`dev` 推送只出 preview。

## 注意点
- **Commit message 一律用英文**（Conventional Commits）；初始中文提交已改写为英文（`chore: scaffold Astro landing page for JobAgent`），历史干净。
- 产品工程约定以 `job-agent` 仓库的 AGENTS.md 为准（本仓库只维护落地页自身的约定）。
- 单页结构固定：Hero → Problem → Solution → Moat → Roadmap → Demo；新增章节需同步更新 README 页面结构表。
- 改域名需同步 `astro.config.mjs` 的 `site` 与 `src/layouts/Layout.astro` 的 og:image / og:url。
- 本机 Node v22.23.2 已验证；Astro 5 要求 Node 18.17+。
- `npm run build` 内含截图脚本，本地首次构建前需 `npx playwright install chromium`。

## 下一步
1. 落地页文案随 `job-agent` 产品迭代同步（Demo 预约体验等数字型/功能型文案易过期）。
2. 如需分享页 / 隐私政策 / 条款页（其他落地多有），按同级 landing 模式新增并部署。
3. 产品 MVP 起步后，把落地页 og 图与 hub 站（bayjf）产品卡片封面保持一致。
