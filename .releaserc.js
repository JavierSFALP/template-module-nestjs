
function getLocalConfig() {
  return  [
    [
      '@semantic-release/github',
    ]
  ]
}

function getCIConfig() {
  return [
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        pkgRoot: './dist',
        tarballDir: 'pkg'
      },
    ],
    [
			'@semantic-release/github',
			{
				assets: ['package.json', 'pkg/*.tgz', 'release/CHANGELOG.md'],
			}
		],
  ]
}

function isDryRun() {
  return process.argv.includes('--no-ci');
}

// eslint-disable-next-line no-undef
module.exports = {
  branches: [
    'feature/changelog-docs',
    '+([0-9])?(.{+([0-9]),x}).x',
    'main', 
    'next', 
    'next-major', 
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
    ...isDryRun() ? getLocalConfig() : getCIConfig()
  ],
}
