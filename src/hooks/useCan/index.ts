import { UseCanParams } from 'hooks/interfaceHooks'
import { validateUserPermissions } from 'utils/validateUserPermissions'
import { useAuth } from 'contexts/AuthContext'

export function useCan({ permissions, roles }: UseCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles
  })

  return userHasValidPermissions
}
