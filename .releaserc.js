function shouldPublish(branchName) {
  // Main branch always publishes
  if (branchName === 'main') return true;
  
  // Check if prerelease publishing is enabled via env
  const prereleasesEnabled = process.env.PUBLISH_PRERELEASES;
  const isPrerelease = ['develop', 'alpha', 'beta', 'next'].includes(branchName);
  
  return isPrerelease && prereleasesEnabled;
}

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
    [
      '@semantic-release/npm', 
      {
        npmPublish: shouldPublish(process.env.GITHUB_REF_NAME),
        pkgRoot: './dist',
        tarballDir: 'pkg'
      }
    ],
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

