import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // 站点地址占位，上线时替换为真实域名
  site: 'https://jobagent.example.com',
});
