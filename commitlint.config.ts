import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    "header-max-length": [2, "never", 200],
    "body-max-line-length": [1, "always", 200]
  }
};

export default Configuration;