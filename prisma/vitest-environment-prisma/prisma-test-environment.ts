import type { Environment } from 'vitest/environments'

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',

  async setup() {
    // custom setup
    console.log('Setup')
    return {
      async teardown() {
        // called after all tests with this env have been run
        console.log('Teardown')
      },
    }
  },
}
