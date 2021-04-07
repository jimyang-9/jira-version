import axios, {AxiosError, AxiosResponse} from 'axios'
import * as core from '@actions/core'
import type {Version} from './models'

// const replaceCircularThing = (key: string, value: unknown) => {
//   if (key === 'circular key') {
//     if (isGridChild(value)) {
//       return `[GridChild[${value.value.id}]]`;
//     }

//     return `[Node[${value.value.id}]]`;
//   }

//   return value;
// };

// axios.interceptors.response.use(
//   response => response,
//   error => {
//     console.log('error', error)
//     try {
//       if (
//         error.status === 404 &&
//         Array.isArray(error.response.data?.errorMessages)
//       ) {
//         return error.response.data?.errorMessages[0]
//       }
//       return error
//     } catch (_) {
//       return error
//     }
//   }
// )

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

  // throw new Error(response.data?.errormessage ?? '')
}

export const getLatestUnreleasedVersion = (
  versions: Version[]
): Version | null => {
  const latestVersion = versions[versions.length - 1]
  return latestVersion?.released === false ? latestVersion : null
}

const isAxiosError = (error: any): error is AxiosError =>
  error?.isAxiosError ?? false
