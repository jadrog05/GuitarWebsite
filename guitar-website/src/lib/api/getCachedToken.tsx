let tokenPromise: Promise<string> | null = null;

export async function getCachedToken() {
  if (!tokenPromise) {
    tokenPromise = fetch('/api/auth/token')
      .then((res) => res.json())
      .then((data) => data.token)
      .catch((err) => {
        tokenPromise = null
        throw err
      })
  }
  return tokenPromise
}
