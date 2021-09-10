import React, { useEffect } from 'react'
import { Can } from 'components/Can'
import Layout from 'components/Layouts'
import { useAuth } from 'contexts/AuthContext'
import { useCan } from 'hooks/useCan/index'
import { withSSRAuth } from 'utils/WithSSRAuth'

export default function dashboard() {
  const { user, signOut } = useAuth()

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  /*   useEffect(() => {
    api.get('/me').then((response) => {})
  }, [])
 */
  return (
    <Layout title="listagem">
      Dashboard
      {userCanSeeMetrics ? (
        <div>Ta autenticado</div>
      ) : (
        <div>Não esta autenticado</div>
      )}
      <h1>dashboard!: {user?.email}</h1>
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </Layout>
  )
}
export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    /*  const apiClient = setupApiClient(ctx)
    await apiClient.get('/me') */

    return {
      props: {}
    }
  },
  {
    permissions: ['metrics.list']
  }
)
