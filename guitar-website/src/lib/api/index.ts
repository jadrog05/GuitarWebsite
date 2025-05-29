// src/lib/api/index.ts
const baseUrl = process.env.NEXT_PUBLIC_GUITAR_API_HOSTED;

// if (process.env.NODE_ENV !== 'production') {
//   baseUrl = process.env.NEXT_PUBLIC_GUITAR_API_URL
// }

if (!baseUrl) {
  throw new Error('Missing base URL for API')   
}

export async function fetchFromApi<T>(
  path: string,
  token: string,
  options: RequestInit = {}
): Promise<T> {
  console.log(`Fetching from API: ${baseUrl}${path}`, options)
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`API error: ${res.status} - ${error}`)
  }

  return res.json()
}
