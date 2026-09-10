# Handoff — job-agent-landing

更新时间：2026-09-10

## 项目概况
JobAgent 落地页：以 GitHub 为桥梁的智能招聘平台（把仓库分析成可信、可解释、可复核的能力画像，服务企业与求职者）。
Astro 5 静态站点（`output: 'static'`），简体中文单语，无 i18n、无 React island；Demo 区用 localStorage
（key：`jobagent_waitlist`）做内测预约；design token 集中在 `src/styles/global.css` 的 `:root` 变量。

- 线上：**未部署**（`astro.config.mjs` 的 `site` 为占位域名 `https://jobagent.example.com`）
- 产品仓库：https://github.com/bayernjf/job-agent（public）
- 远端：`git@github.com:bayernjf/job-agent-landing.git`（public）

## 当前状态（分支 main，与 origin/main 同步，工作区干净）
最近提交：
- `a8d7102` init: JobAgent 落地页（Astro）—— 以 GitHub 为桥梁的智能招聘平台（**中文提交，历史遗留**）

规范文件（AGENTS / CLAUDE / README / handoff / git-commit-message / docs/DEPLOYMENT）于 2026-09-10
补齐对齐同级落地页，**尚在工作区未提交**（遵循"未明确要求不提交/push"）。

## 注意点
- **Commit message 一律用英文**（Conventional Commits），初始提交为中文系历史遗留，不改写（需 force push，不推荐）。
- 产品工程约定以 `job-agent` 仓库的 AGENTS.md 为准（本仓库只维护落地页自身的约定）。
- 单页结构固定：Hero → Problem → Solution → Moat → Roadmap → Demo；新增章节需同步更新 README 页面结构表。
- 未部署前不要编造线上地址；`site` 占位域名上线时替换并同步 meta / sitemap（如引入）。
- 本机 Node v22.23.2 已验证；Astro 5 要求 Node 18.17+。

## 下一步
1. 用户明确要求后，用英文 commit message 提交规范文件（docs 与配置分开原子提交）。
2. 产品 MVP 起步后，决定落地页部署方案（Cloudflare Pages 为同级惯例，见 docs/DEPLOYMENT.md）并替换占位域名。
3. 落地页文案随 `job-agent` 产品迭代同步（Demo 预约体验等数字型/功能型文案易过期）。
