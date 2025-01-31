
function getLocalConfig() {
  return  [
    '@semantic-release/npm',
    {
      npmPublish: false,
    },
    '@semantic-release/github'
  ]
}

function getCIConfig() {
  return [
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: 'pkgs'
      },
    ],
    [
			'@semantic-release/github',
			{
				assets: ['pkgs/*.tgz', 'release/CHANGELOG.md']
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
    'branch-1.0.0.',
    'main'
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
