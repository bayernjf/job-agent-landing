# Handoff — job-agent-landing

更新时间：2026-09-10

## 项目概况
JobAgent 落地页：以 GitHub 为桥梁的智能招聘平台（把仓库分析成可信、可解释、可复核的能力画像，服务企业与求职者）。
Astro 5 静态站点（`output: 'static'`）；Demo 区用 localStorage
（key：`jobagent_waitlist`）做内测预约；design token 集中在 `src/styles/global.css` 的 `:root` 变量；
构建时用 `scripts/shot.mjs`（Playwright）截图生成预览图 / og:image。

**语言状态**：线上目前仍是中文单语（`lang="zh-CN"`，无 i18n）。已决策改为**根路径 `/` 英文 + `/zh/` 中文**
（与同系列 `*-landing` 一致），尚未实施 —— 见下方「i18n 改造」与 `docs/I18N-TOKENS-PLAN.md`。

- 线上：https://job-agent.bayjf.com （自定义域名）· `job-agent-landing.pages.dev`（Pages 域名）
- 产品仓库：https://github.com/bayernjf/job-agent（public）
- 远端：`git@github.com:bayernjf/job-agent-landing.git`（public）

## 当前状态（分支 dev，领先 origin/dev 3 个提交，工作区干净，尚未 push）
最近提交：
- `965400a` docs: record i18n decisions on locale, copy flow, switch
- `7a29d2c` docs: point AGENTS and handoff to i18n plan
- `8062e95` docs: add i18n and design token alignment plan
- `3e67511` feat: render navbar logo mark as inline SVG（已同步到 origin/dev）

> 本地历史曾与远端无共同祖先（本地根提交是远端 `cf20810` 的重复副本），已通过
> `git rebase --onto origin/dev <dup> dev` 收敛，现在 dev 与 origin/dev 同源。

部署：Cloudflare Pages（Git 集成）已上线，配置与 work-learn-landing 一致（build command
`npx playwright install chromium && npm run build`，env `NODE_VERSION=22` + `PLAYWRIGHT_BROWSERS_PATH=0`），
Production branch 为 `main`，`dev` 推送只出 preview。

## i18n 改造（已决策，未实施）
方案全文：[`docs/I18N-TOKENS-PLAN.md`](./docs/I18N-TOKENS-PLAN.md)，分 P0–P4 五阶段。

| 决策 | 结论 |
|---|---|
| 默认语言 | 根路径 `/` 为英文，中文放 `/zh/` |
| 文案流程 | **先英文后中文**：英文为源语言定稿，中文由英文产出（现有中文不作为源语言） |
| 语言切换 | 本站内联实现，不往 `bayernjf/landing-ui` 提组件 |
| 当前阻塞 | 英文源文案由谁起草未定；P3 的 `--radius` 14px→16px 视觉微调未确认 |

开工后需同步改：`AGENTS.md`（「单语 / 无 i18n」描述）、`README.md`（技术栈 + 页面结构）、
`docs/DEPLOYMENT.md`（预览图不再「两张相同」）。

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
4. **i18n + 设计 token 对齐**：方案已定稿，关键决策见上方「i18n 改造」，全文见
   [`docs/I18N-TOKENS-PLAN.md`](./docs/I18N-TOKENS-PLAN.md)。用户选择暂不动工，等英文源文案产出方
   与 P3 视觉微调确认后从 P0 开始。
