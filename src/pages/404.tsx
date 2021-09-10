import React from 'react'
import { Button } from '@material-ui/core'
import Layout from 'components/Layouts'
import { useAuth } from 'contexts/AuthContext'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`
const ButtonStyled = styled(Button)`
  background: '#00ff00';
  color: '#00ff00';
  background-color: '#00ff00';
`

export default function Error(): JSX.Element {
  const router = useRouter()
  const { signOut, isAuthenticated, user } = useAuth()

  function handleNotFoundAuthenticaded() {
    router.push('/dashboard')
  }

  function handleNotFoundNotAuthenticaded() {
    signOut()
    router.push('/auth/login')
  }

  return (
    <div>
      {isAuthenticated ? (
        <Layout title="Page Not Found">
          <div>
            <div>
              <ErrorStyle>
                <h1>404 Página não encontrada</h1>
                <h6>{user?.name} parece que não encontramos a página.</h6>
                <ButtonStyled
                  onClick={
                    user
                      ? handleNotFoundAuthenticaded
                      : handleNotFoundNotAuthenticaded
                  }
                >
                  Voltar para dashboard
                </ButtonStyled>
              </ErrorStyle>
            </div>
          </div>
        </Layout>
      ) : (
        <div>
          <div>
            <ErrorStyle>
              <h1>Página invalida ou sem permissão</h1>
              <ButtonStyled
                onClick={handleNotFoundNotAuthenticaded}
                style={{
                  backgroundColor: 'red',
                  borderBottom: '20px',
                  cursor: 'pointer',
                  height: '20px'
                }}
              >
                Voltar para Login
              </ButtonStyled>
            </ErrorStyle>
          </div>
        </div>
      )}
    </div>
  )
}
