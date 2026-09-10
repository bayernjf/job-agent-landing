# 部署说明 — job-agent-landing

状态：**已部署**（2026-09-10，Cloudflare Pages + GitHub 集成）。

## 站点信息
- Pages 项目：`job-agent-landing`（已连接 GitHub 仓库 `bayernjf/job-agent-landing`）
- 域名：`job-agent.bayjf.com`（自定义，主入口）+ `job-agent-landing.pages.dev`
- 技术栈：Astro 5（SSG，`output: 'static'`），简体中文单语
- 预览图：构建时截取 `dist/preview-zh.png`、`dist/preview-en.png`（1280×800 @2x；单语项目两张相同），og:image 指向 `/preview-zh.png`
- Node：`>=18.17`；包管理器 npm

## 构建
```bash
npm install
npm run build     # astro build && node scripts/shot.mjs（Playwright 截图）
npm run preview
```

## Cloudflare Pages 配置（与 work-learn-landing 一致）
| 配置项 | 值 |
|---|---|
| Production branch | `main` |
| Build command | `npx playwright install chromium && npm run build` |
| Build output directory | `dist` |
| Environment variables | `NODE_VERSION = 22`、`PLAYWRIGHT_BROWSERS_PATH = 0` |

**分支策略**：日常开发在 `dev`，推送 `main` 才会构建发布；`dev` 等其他分支只产出 preview 部署。

## 发布后验证
1. 首页（`https://job-agent.bayjf.com`）可访问，六个章节与 Demo 表单（localStorage）正常。
2. `preview-zh.png` 可访问，og:image / og:url 与域名一致。
3. 页面 og meta（title / description / image / url）校验通过。

## 改域名时的同步点
- `astro.config.mjs` 的 `site`
- `src/layouts/Layout.astro` 的 og:image / og:url
