export type User = {
  permissions: string[]
  roles: string[]
}

export type ValidateUserPermissionsParams = {
  user: User
  permissions?: string[]
  roles?: string[]
}

export type WithSSRAuthOptions = {
  permissions?: string[]
  roles?: string[]
}
