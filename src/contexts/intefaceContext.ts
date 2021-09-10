export type User = {
  avatar: string
  email: string
  name: string
  permissions: string[]
  roles: string[]
  routes?: string[]
}

export type SignInCreditials = {
  email: string
  password: string
}

export type AuthContextData = {
  isAuthenticated: boolean
  signIn(credentials: SignInCreditials): Promise<void>
  user: User
  signOut(): void
}

export type AuthProviderProps = { children: React.ReactNode }
