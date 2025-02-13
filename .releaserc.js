// eslint-disable-next-line no-undef
module.exports = {
  branches: [
    'main',
    'develop',
    {name: 'next', prerelease: true},
    {name: 'beta', prerelease: true}, 
    {name: 'alpha', prerelease: true}
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'release/CHANGELOG.md',
      },
    ],
    ...(process.env.GITHUB_REF_NAME === 'main' ? [
      ['@semantic-release/npm', {
        npmPublish: true,
        pkgRoot: './dist',
        tarballDir: 'pkg'
      }]
    ] : []),
    [
			'@semantic-release/github',
			{
				assets: [
          'package.json', 
          'pkg/*.tgz', 
          'release/CHANGELOG.md'
        ],
			}
		],
  ],
}

