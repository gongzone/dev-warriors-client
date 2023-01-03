import LoginForm from '~/components/auth/LoginForm'
import { type ActionFunction, json, type LoaderFunction } from '@remix-run/node'
import { login } from '~/libs/api/auth'
import { extractError } from '~/libs/error'
import { createAuthSession, isAlreadyLogin } from '~/libs/session'

export const loader: LoaderFunction = async ({ request }) => {
  console.log('login loader 작동')

  return isAlreadyLogin(request, '/')
}

export default function LoginRoute() {
  return <LoginForm />
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')

  if (typeof username !== 'string' || typeof password !== 'string') return

  try {
    const { tokens, expiredDate } = await login({ username, password })

    return createAuthSession({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiredDate,
      redirectTo: '/',
    })
  } catch (err) {
    const error = extractError(err)

    return json({ error }, { status: error.statusCode })
  }
}
