import axios, {AxiosError} from 'axios'
import type {Version} from './models'
import * as core from '@actions/core'

export const getAllJiraVersions = async (
  domain: string,
  project: string,
  email: string,
  apiToken: string
): Promise<Version[]> => {
  try {
    const response = await axios.get(
      `https://${domain}.atlassian.net/rest/api/3/project/${project}/versions`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString(
            'base64'
          )}`,
          Accept: 'application/json'
        }
      }
    )
    return response?.data
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response?.status === 404 &&
      Array.isArray(error.response.data?.errorMessages)
    ) {
      throw new Error(
        `${error.response.data?.errorMessages[0]} (this may be due to a missing/invalid API key)`
      )
    } else {
      throw error
    }
  }
}

export const getUnreleasedVersion = (
  versions: Version[], {latest = true}
): Version | null => {
  const unreleasedVersion = versions.filter((v) => !v.released);
  const latestVersion = unreleasedVersion[latest ? unreleasedVersion.length - 1 : 0];
  return latestVersion == undefined ? null : latestVersion;
}

export const getLatestVersion = (versions: Version[]): Version | null =>
  versions[versions.length - 1]

const isAxiosError = (error: any): error is AxiosError =>
  error?.isAxiosError ?? false
