// eslint-disable-next-line no-undef
module.exports = {
  "branches": [
    'feature/changelog-docs',
    'branch-1.0.0.',
    'main'
  ],
  "plugins": [
    [
      '@semantic-release/commit-analyzer',
      {
        "preset": 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        "preset": 'conventionalcommits',
      },
    ],
    [
      '@semantic-release/changelog',
      {
        "changelogFile": 'release/CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/exec',
      {
        "publishCmd": 'echo changelog',
      },
    ],
    [
      '@semantic-release/npm',
      {
        "npmPublish": false,
        "tarballDir": 'dist'
      },
    ],
    [
      '@semantic-release/exec',
      {
        "publishCmd": 'echo npm',
      },
    ],
    [
			"@semantic-release/github",
			{
				"assets": 'dist/*.tgz'
			}
		]
  ],
}
