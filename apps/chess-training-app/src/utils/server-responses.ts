export const successResponse = (
  message: string,
  data: Record<string, unknown>,
) => {
  return new Response(
    JSON.stringify({
      message,
      data,
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    },
  )
}

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

export type ResponseJson = {
  message: string
  data?: Record<string, unknown>
}
