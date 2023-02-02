import {ErrorInfoType} from './types';

export const ErrorInfoArgs: ErrorInfoType = {
  error: {
    ruleId: 'KSV011',
    rule: {
      index: 8,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Require the CPU to be limited on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
          },
          region: {
            startLine: 16,
            startColumn: 11,
            endLine: 28,
            endColumn: 1,
          },
        },
      },
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
          },
          region: {
            startLine: 16,
            startColumn: 11,
            endLine: 28,
            endColumn: 1,
          },
        },
        logicalLocations: [
          {
            kind: 'resource',
            fullyQualifiedName: 'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
};
