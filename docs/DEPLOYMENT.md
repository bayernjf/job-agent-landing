# 部署说明 — job-agent-landing

状态：**尚未部署**（2026-09-10）。本文档为就绪后的部署指引，与同级 landing 仓库（Cloudflare Pages）保持一致。

## 当前占位

`astro.config.mjs` 中 `site: 'https://jobagent.example.com'` 为占位域名，上线前必须替换为真实域名，并同步：

- 页面 `<head>` 的 canonical / og:url（如引入，当前单页未配置）
- `public/robots.txt` 的 Sitemap 地址（如引入）
- `public/llms.txt`（如引入，供 AI 爬虫直接引用产品定义）

## 推荐方案：Cloudflare Pages（Git 集成）

与同级落地页一致（参考 agent-world-landing / work-learn-landing 的既有配置）：

1. 在 Cloudflare 创建 Pages 项目 `job-agent-landing`，连接 GitHub 仓库 `bayernjf/job-agent-landing`。
2. 配置：
   - **Production branch**：`main`（推送到 `main` 自动构建发布；`dev` 等其他分支产出 preview 部署）
   - **Build command**：`npm run build`
   - **Build output directory**：`dist`
   - **Environment variables**：`NODE_VERSION = 22`
3. 日常开发在 `dev` 分支进行，合并到 `main` 才发生产。
4. 自定义域名（如 `jobagent.bayjf.com`）需在 DNS 加一条 `CNAME`（Proxied）指向 Pages 项目域名；换域名时同步改 `site` 与 meta。

## 上线检查清单

- [ ] `site` 已替换为真实域名，本地 `npm run build && npm run preview` 验证
- [ ] 生产分支与构建命令已按上文配置
- [ ] 首屏 / 各章节 / Demo 表单（localStorage）在预览环境验证通过
- [ ] 在 `job-agent` 产品仓库 handoff / README 登记线上地址
