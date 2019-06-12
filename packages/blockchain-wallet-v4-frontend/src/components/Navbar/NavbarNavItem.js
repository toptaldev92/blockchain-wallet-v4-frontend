import React from 'react'
import styled from 'styled-components'
import media from 'services/ResponsiveService'

const BaseNavItem = styled.li`
  box-sizing: border-box;
  margin-right: 8px;
  cursor: pointer;
  &:last-child {
    margin-right: 0px;
  }

  ${media.mobile`
    margin-right: 2px;
    a span {
      font-size: 18px;
    }
  `};
`

const NavbarNavItem = props => {
  const { children, ...rest } = props

  return <BaseNavItem {...rest}>{children}</BaseNavItem>
}

export default NavbarNavItem
