// eslint-disable-next-line no-undef
module.exports = {
  "branches": [
    'feature/changelog-docs',
    '+([0-9])?(.{+([0-9]),x}).x',
    'main', 
    'next', 
    'next-major', 
    {name: 'beta', prerelease: true}, 
    {name: 'alpha', prerelease: true}
  ],
  "plugins": [
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
        npmPublish: true,
        "tarballDir": "pkgs"
      },
    ],
    [
			"@semantic-release/github",
			{
				"assets": "pkgs/*.tgz"
			}
		],
    // [
    //   '@semantic-release/git',
    //   {
    //     assets: ['release/CHANGELOG.md', 'package.json'],
    //     message:
    //       'chore(release): ${nextRelease.version} [skip ci]  ${nextRelease.notes}',
    //   },
    // ]
  ],
}
