/// <reference types="vitest/config" />
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@chevrotain/regexp-to-ast/src/utils.js': path.resolve(__dirname, 'node_modules/@chevrotain/regexp-to-ast/src/utils.js'
      ),
      '@chevrotain/regexp-to-ast/src/character-classes.js': path.resolve(__dirname, 'node_modules/@chevrotain/regexp-to-ast/src/character-classes.js'),
    }
  }
})