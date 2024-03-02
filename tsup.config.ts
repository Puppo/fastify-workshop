import glob from 'tiny-glob'
import {defineConfig} from 'tsup'

export default defineConfig(async () => {
  const entry = await glob('./src/**/!(*.d|*.spec).ts')
  return {
    entry: entry.reduce((acc, file) => {
      acc[file.replace('src/', '').replace('.ts', '')] = file
      return acc;
    }, {} as Record<string, string>),
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: false,
    treeshake: true,
    bundle: false
  }
})