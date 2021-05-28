import {getAllJiraVersions, getUnreleasedVersion} from '../src/client'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {GOOD_RESPONSE, AUTH_ERROR, NO_UNRELEASED_VERSION, UNRELEASED_VERSIONS} from '../src/mocks'

const WORKING_PROJECT = 'some-project-id'
const SUBDOMAIN = 'a-cool-subdomain'
const EMAIL = 'test@email.example'
const TOKEN = 'abc123'

const handler = rest.get(
  'https://:subdomain.atlassian.net/rest/api/3/project/:project/versions',
  (req, res, ctx) => {
    const {subdomain, project} = req.params
    if (subdomain === SUBDOMAIN && project === WORKING_PROJECT) {
      return res(ctx.json(GOOD_RESPONSE))
    } else {
      return res(ctx.status(404), ctx.json(AUTH_ERROR))
    }
  }
)

const server = setupServer(handler)

beforeAll(() => {
  // Establish requests interception layer before all tests.
  server.listen()
})

afterAll(() => {
  // Clean up after all tests are done, preventing this
  // interception layer from affecting irrelevant tests.
  server.close()
})

describe('getAllJiraVersions', () => {
  it('can fetch all jira versions of a given project', async () => {
    const versions = await getAllJiraVersions(
      SUBDOMAIN,
      WORKING_PROJECT,
      EMAIL,
      TOKEN
    )
    expect(versions.length).toBeGreaterThan(0)
  })

  it('errors correctly when authorization fails', async () => {
    try {
      await getAllJiraVersions(SUBDOMAIN, 'OOPS', EMAIL, TOKEN)
    } catch (e) {
      expect(e.message).toMatch('this may be due to a missing/invalid API key')
    }
  })
})

describe('getLatestUnreleasedVersion', () => {
  it('returns the next unreleased version', () => {
    expect(getUnreleasedVersion(UNRELEASED_VERSIONS, false)).toEqual({
      self: 'https://foo.atlassian.net/rest/api/3/version/1',
      id: '1',
      name: '1.5.1',
      archived: false,
      released: false,
      startDate: '2020-10-01',
      releaseDate: '2021-01-08',
      userStartDate: '30/Sep/20',
      userReleaseDate: '07/Jan/21',
      projectId: 123
    },)
  })
  it('returns the latest unreleased version', () => {
    expect(getUnreleasedVersion(UNRELEASED_VERSIONS, true)).toEqual({
      self: 'https://foo.atlassian.net/rest/api/3/version/2',
      id: '2',
      description: 'Small fixes to improve MVP app',
      name: '1.5.0',
      archived: false,
      released: false,
      releaseDate: '2021-04-08',
      overdue: false,
      userReleaseDate: '07/Apr/21',
      projectId: 14035
    })
  })
  it('returns null if there is no unreleased version', () => {
    expect(getUnreleasedVersion(NO_UNRELEASED_VERSION, true)).toEqual(null)
  })
})
