import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    {
      input: 'src/colors/index',
      name: 'colors',
    },
  ],
  declaration: true,
  clean: true,
})
