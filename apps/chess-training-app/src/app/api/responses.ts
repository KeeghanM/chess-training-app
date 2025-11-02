export const errorResponse = (message: string, status: number) => {
  return new Response(
    JSON.stringify({
      message,
    }),
    {
      status,
      headers: { 'content-type': 'application/json' },
    },
  )
}

export const successResponse = (
  message: string,
  data: Record<string, unknown>,
  status: number,
) => {
  return new Response(
    JSON.stringify({
      message,
      data,
    }),
    {
      status,
      headers: { 'content-type': 'application/json' },
    },
  )
}

export type ResponseJson = {
  message: string
  data?: Record<string, unknown>
}
