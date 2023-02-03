import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, BodyM } from '../styles/texts'
import PageSelector from './PageSelector'
import AddressOnChainDropdown from './AddressOnChainDropdown'

const Subnavbar = ({ active, address }) => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])
  const medium = 700
  return (
    <Container>
      <SubnavbarSection>
        <AddressOnChainDropdown address={address} />
        {width <= medium ? (
          <PageSelector active={active} address={address} />
        ) : (
          <SubnavbarContainer>
            <Link to={`/smart-vaults/${address}/`}>
              <BodyM className={active === 'overview' ? 'active' : ''}>
                Overview
              </BodyM>
            </Link>
            <Link to={`/smart-vaults/${address}/action-history/`}>
              <BodyM className={active === 'history' ? 'active' : ''}>
                History
              </BodyM>
            </Link>
            <Link to={`/smart-vaults/${address}/config/`}>
              <BodyM className={active === 'configuration' ? 'active' : ''}>
                Configuration
              </BodyM>
            </Link>
          </SubnavbarContainer>
        )}
      </SubnavbarSection>
    </Container>
  )
}

const SubnavbarSection = styled.section`
  z-index: 100;
  width: 100%;
  display: flex;
  align-items: center;
  margin: auto;
  justify-content: space-between;
  .active {
    color: #a996ff;
  }
`

const SubnavbarContainer = styled.div`
  height: 60px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 40px;
  padding: 0px;
`

export default Subnavbar
