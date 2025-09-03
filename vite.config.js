import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";
import handlebars from "vite-plugin-handlebars";

const BASE_URL = "/shop-co/";

export default defineConfig({
  base: BASE_URL,
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
    tailwindcss(),
    handlebars({
      partialDirectory: [resolve(__dirname, "src/templates")],
      helpers: {
        getBaseUrl: () => BASE_URL,
        concatString: (...items) => {
          return items.slice(0, -1).join("");
        },
        concatClass: (...items) => {
          return items.slice(0, -1).join(" ");
        },
        array: (...items) => {
          return items.slice(0, -1);
        },
        object: (options) => {
          return options.hash;
        },
        concatAttrs: (options) => {
          let attrsString = "";
          const attrs = options?.hash;

          for (const key in attrs) {
            attrsString += `${key}="${attrs[key]}" `;
          }

          return attrsString.trim();
        },
        variantClass: (options) => {
          const { variant, default: defaultClass, ...variants } = options.hash;
          return variants[variant] ?? defaultClass;
        },
      },
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
    }),
  ],
});
