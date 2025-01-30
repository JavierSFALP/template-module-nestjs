// eslint-disable-next-line no-undef
console.log('GITHUB_TOKEN:', process.env.GH_TOKEN);
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
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        tarballDir: 'dist'
      },
    ],
    [
			"@semantic-release/github",
			{
				assets: ['dist/*.tgz', 'release/CHANGELOG.md']
			}
		],
    [
      "@semantic-release/exec",
      {
        failCmd: "${GH_TOKEN}",
        successCmd:
          "echo 'RELEASED=1' >> $GITHUB_ENV && echo 'NEW_VERSION=${nextRelease.version}' >> $GITHUB_ENV",
      },
    ],
  ],
}
