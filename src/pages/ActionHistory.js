import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container } from '../styles/texts'
import { useParams } from 'react-router-dom'
import Subnavbar from '../components/Subnavbar'
import Page from '../components/Page'
import Table from '../components/Table/Table'
import TableRow from '../components/Table/TableRow'
import TableHeader from '../components/Table/TableHeader'
import Action from '../sections/Action'
import SmartVaultNotFound from '../sections/SmartVaultNotFound'
import { Hm } from '../styles/texts'
import { Loading } from '../styles/general'
import useSmartVaultWithPrimitives from '../hooks/useSmartVaultWithPrimitives'

const ActionHistory = () => {
  const params = useParams()
  // TODO: delete limit when actionPage is ready
  const smartVault = useSmartVaultWithPrimitives(params.id, 10000)

  return (
    <Page>
      {smartVault.isLoading ? (
        <Loading>Loading Smart Vault...</Loading>
      ) : !smartVault?.id ? (
        <SmartVaultNotFound id={params.id} />
      ) : (
        <RenderContentPage smartVault={smartVault} />
      )}
    </Page>
  )
}

const RenderContentPage = ({ smartVault }) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  const large = 900

  return (
    <>
      <Subnavbar active="history" />
      <LatestActionsSection>
        <Container>
          <Hm>
            Here’s everything
            <br />
            that happened
          </Hm>
          <Table
            header={
              <TableRow>
                <TableHeader title="Date" align="left" />
                <TableHeader title="Action" align="left" />
                {width >= large && (
                  <TableHeader title="Description" align="left" />
                )}
                {width >= medium && (
                  <TableHeader title="Excecuted by" align="left" />
                )}
                <TableHeader title="Status" align="center" />
              </TableRow>
            }
          >
            {smartVault.isLoading ? (
              'Loading actions...'
            ) : (
              <>
                {smartVault?.actions?.map((primitives, i) => {
                  return (
                    <Action
                      key={primitives[0]}
                      primitives={primitives[1]}
                      index={i + 1}
                    />
                  )
                })}
                {smartVault?.actions?.length === 0 && 'No actions'}
              </>
            )}
          </Table>
        </Container>
      </LatestActionsSection>
    </>
  )
}

const LatestActionsSection = styled.section`
  height: auto;
  padding: 80px 0;
  color: white;
  width: 100%;
  margin: auto;
`

export default ActionHistory