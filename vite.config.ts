import { defineConfig } from "vite";
import { resolve } from "path";

import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";
import vitePugPlugin from "vite-plugin-pug-transformer";

const BASE_PATCH = "/shop-co/";

export default defineConfig({
  base: "/shop-co/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nav: resolve(__dirname, "nav.html"),
        product: resolve(__dirname, "product.html"),
        catalog: resolve(__dirname, "catalog.html"),
        cart: resolve(__dirname, "cart.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@scripts": "/src/scripts",
      "@": "/src",
    },
  },
  plugins: [
    vitePugPlugin({
      pugLocals: {
        BASE_PATCH,
      },
    }),
    tailwindcss(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
    }),
  ],
});
