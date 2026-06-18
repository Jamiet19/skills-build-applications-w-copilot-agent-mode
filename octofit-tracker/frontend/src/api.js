const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollectionResponse(data) {
  if (Array.isArray(data)) {
    return data
  }

  if (Array.isArray(data?.results)) {
    return data.results
  }

  if (Array.isArray(data?.data)) {
    return data.data
  }

  if (Array.isArray(data?.items)) {
    return data.items
  }

  return []
}

export async function fetchCollection(endpointPath) {
  const response = await fetch(`${apiOrigin}${endpointPath}`)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeCollectionResponse(await response.json())
}