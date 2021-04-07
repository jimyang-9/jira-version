export const GOOD_RESPONSE = [
  {
    self: 'https://foo.atlassian.net/rest/api/3/version/1',
    id: '1',
    name: '1.0.0',
    archived: false,
    released: true,
    startDate: '2020-10-01',
    releaseDate: '2021-01-08',
    userStartDate: '30/Sep/20',
    userReleaseDate: '07/Jan/21',
    projectId: 123
  },
  {
    self: 'https://foo.atlassian.net/rest/api/3/version/2',
    id: '2',
    description: 'Small fixes to improve MVP app',
    name: '1.0.1',
    archived: false,
    released: false,
    releaseDate: '2021-04-08',
    overdue: false,
    userReleaseDate: '07/Apr/21',
    projectId: 123
  }
]

export const NO_UNRELEASED_VERSION = [
  {
    self: 'https://foo.atlassian.net/rest/api/3/version/1',
    id: '1',
    name: '1.0.0',
    archived: false,
    released: true,
    startDate: '2020-10-01',
    releaseDate: '2021-01-08',
    userStartDate: '30/Sep/20',
    userReleaseDate: '07/Jan/21',
    projectId: 123
  },
  {
    self: 'https://foo.atlassian.net/rest/api/3/version/2',
    id: '2',
    description: 'Small fixes to improve MVP app',
    name: '1.0.1',
    archived: false,
    released: true,
    releaseDate: '2021-04-08',
    overdue: false,
    userReleaseDate: '07/Apr/21',
    projectId: 14035
  }
]

export const AUTH_ERROR = {
  errorMessages: ["No project could be found with key 'some-project-id'."],
  errors: {}
}
