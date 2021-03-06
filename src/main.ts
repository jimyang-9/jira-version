import * as core from '@actions/core'
import {
  getAllJiraVersions,
  getLatestUnreleasedVersion,
  getLatestVersion
} from './client'
import {SUBDOMAIN, PROJECT, EMAIL, API_TOKEN, UNRELEASED} from './env'

async function run(): Promise<void> {
  try {
    const versions = await getAllJiraVersions(
      SUBDOMAIN,
      PROJECT,
      EMAIL,
      API_TOKEN
    )

    const latestVersion = UNRELEASED
      ? getLatestUnreleasedVersion(versions)
      : getLatestVersion(versions)

    if (!latestVersion) {
      core.setFailed('Could not find latest unreleased version')
    }

    core.startGroup('Latest Version')
    for (let key in latestVersion) {
      const value = latestVersion[key as keyof typeof latestVersion]
      core.info(`${key}: ${value}`)
      core.setOutput(key, value)
    }
    core.endGroup()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
