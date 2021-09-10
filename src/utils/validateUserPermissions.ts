import { ValidateUserPermissionsParams } from './interfaceUtils'

export function validateUserPermissions({
  user,
  permissions,
  roles
}: ValidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    //so retorna true se todas as condiçoes forem verdadeiras
    const hasAllPermissions = permissions.every((permission) =>
      user.permissions.includes(permission)
    )

    if (!hasAllPermissions) {
      return false
    }
  }

  if (roles?.length > 0) {
    const hasSomeRole = roles.some((role) => user.roles.includes(role))

    if (!hasSomeRole) {
      return false
    }
  }

  return true
}
