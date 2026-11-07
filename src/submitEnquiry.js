export async function submitEnquiry(fields, request = fetch) {
  if (fields._honey) throw new Error('Unable to submit. Please try again.')
  const response = await request('https://formsubmit.co/ajax/priyankakalla@outlook.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...fields,
      _subject: 'New design enquiry - Priyanka Kalla Portfolio',
      _template: 'table',
    }),
    signal: AbortSignal.timeout(25000),
  })
  const result = await response.json()
  if (!response.ok || !(result.success === true || result.success === 'true')) {
    throw new Error('Your enquiry could not be submitted. Please try again, or call 9432497485.')
  }
  return result
}
