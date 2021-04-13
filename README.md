# Datadog Metrics Reporter Action

[![CI](https://github.com/jimyang-9/jira-version/actions/workflows/test.yml/badge.svg)](https://github.com/jimyang-9/jira-version/actions/workflows/test.yml) ![Package Version](https://img.shields.io/github/package-json/v/jimyang-9/jira-version)

Get latest Jira version (released or unreleased) for a project.

## Usage

This action gets the latest Jira version for a given Jira project. You can specify whether or not you want the latest unreleased version only.

e.g.

```yml
# ...

jobs:
  get-next-app-version:
    name: Get App Version Number
    runs-on: ubuntu-latest
    outputs:
      version-number: ${{ steps.get-version.outputs.name }}
    steps:
      - id: get-version
        uses: jimyang-9/jira-version@v0.1.0
        with:
          project: ABC
          subdomain: example
          email: ${{ secrets.JIRA_EMAIL }}
          api-token: ${{ secrets.JIRA_TOKEN }}
          unreleased: true

  do-something-with-version:
    name: Build App
    runs-un: ubuntu-latest
    needs: get-app-version
    steps:
      - uses: foo/build-app
        with:
          version-number: ${{ needs.get-next-app-version.version-number }}
```

### Inputs

| Name                    | Description                                                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `project`               | The Jira project id or key (see projectIdOrKey in the [documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#version))                         |
| `subdomain`             | The subdomain of your Jira instance (see site-url in the [documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#version))                      |
| `email`                 | Email address associated with api-token (see [basic authentication](https://developer.atlassian.com/server/jira/platform/basic-authentication/) documentation for details) |
| `api-token`             | Api token associated with email address (see [basic authentication](https://developer.atlassian.com/server/jira/platform/basic-authentication/) documentation for details) |
| `unreleased` (optional) | Determines whether or not to restrict the latest version to unreleased versions only                                                                                       |

For more info: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-versions/#api-rest-api-3-project-projectidorkey-version-get
