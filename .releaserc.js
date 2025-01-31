
function getLocalConfig() {
  console.log('en local')
  return  [
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/github',
    ]
  ]
}

function getCIConfig() {
  console.log('en ci')
  return [
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        tarballDir: 'pkgs'
      },
    ],
    [
			'@semantic-release/github',
			{
				assets: ['pkgs/*.tgz', 'release/CHANGELOG.md',
          {path: 'pkgs/index.js', name: '${LIBRARY_NAME}-${nextRelease.gitTag}', label: '${LIBRARY_NAME} (${nextRelease.gitTag}) distribution'}
        ]
			}
		],
  ]
}

function isDryRun() {
console.log(process.argv.includes('--no-ci'))
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
