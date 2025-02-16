export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  if (!data) {
    throw new Error("No data received from the API")
  }

  return data as T
}

