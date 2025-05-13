import { defineConfig } from "vite"

const PORT = 3001

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port: PORT,
  },
})
