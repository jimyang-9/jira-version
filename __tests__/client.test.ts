import {getAllJiraVersions} from '../src/client'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {GOOD_RESPONSE, AUTH_ERROR} from '../src/mocks'

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

describe('getLatestJiraVersion', () => {
  it('can fetch the latest jira version from a project when passed in an ', () => {})
})
