# Handoff — job-agent-landing

更新时间：2026-09-10

## 项目概况
JobAgent 落地页：以 GitHub 为桥梁的智能招聘平台（把仓库分析成可信、可解释、可复核的能力画像，服务企业与求职者）。
Astro 5 静态站点（`output: 'static'`）；Demo 区用 localStorage
（key：`jobagent_waitlist`）做内测预约；design token 集中在 `src/styles/global.css` 的 `:root` 变量；
构建时用 `scripts/shot.mjs`（Playwright）截图生成预览图 / og:image。

**语言状态**：线上目前仍是中文单语（`lang="zh-CN"`，无 i18n）。已决策改为根路径英文 + `/zh/` 中文，尚未实施。

- 线上：https://job-agent.bayjf.com （自定义域名）· `job-agent-landing.pages.dev`（Pages 域名）
- 产品仓库：https://github.com/bayernjf/job-agent（public）
- 远端：`git@github.com:bayernjf/job-agent-landing.git`（public）

## 当前状态（分支 dev，工作区干净，有未推送提交）
最近提交：
- `f104bcb` docs: sync handoff with i18n decisions and branch state
- `965400a` docs: record i18n decisions on locale, copy flow, switch
- `7a29d2c` docs: point AGENTS and handoff to i18n plan
- `8062e95` docs: add i18n and design token alignment plan
- `3e67511` feat: render navbar logo mark as inline SVG（已同步到 origin/dev）

> 本地历史曾与远端无共同祖先（本地根提交是远端 `cf20810` 的重复副本），已通过
> `git rebase --onto origin/dev <dup> dev` 收敛，现在 dev 与 origin/dev 同源。

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
4. **i18n + 设计 token 对齐**：方案已定稿（含已决策项与待定阻塞项），见
   [`docs/I18N-TOKENS-PLAN.md`](./docs/I18N-TOKENS-PLAN.md)。暂未动工，按 P0–P4 顺序推进。
