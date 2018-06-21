import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { Icon } from '../../Icons/index'
import { Text } from '../../Text/index'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: ${props => transparentize(0.9, (props.theme[props.color]))};
  border: 1px solid ${props => transparentize(0.8, (props.theme[props.color]))};
  border-radius: 4px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  margin: 0 auto;
  overflow: hidden;
  height: ${props => props.collapsed ? '28px' : ''};
  width: ${props => props.width ? props.width : `initial`};
  padding: ${props => props.inline || props.label ? '3px 5px' : '5px 10px'};
  & > span:first-child { margin-right: ${props => props.inline ? '3px' : '5px'} };
`

const BannerContent = styled(Text)`
  display: flex;
  flex-direction: row;
  white-space: ${props => props.inline ? 'nowrap' : 'initial'};
  & a:last-of-type { margin-left: 5px; }
`

const ActionIcon = styled(Icon)`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`

const selectStyle = type => {
  switch (type) {
    case 'success': return { color: 'success', uppercase: false, icon: 'checkmark-in-circle' }
    case 'warning': return { color: 'error', uppercase: true, icon: 'alert' }
    case 'alert': return { color: 'brand-secondary', uppercase: false, icon: 'bell' }
    case 'caution': return { color: 'brand-yellow', uppercase: false, icon: 'alert' }
    case 'info': return { color: 'gray-5', uppercase: false, icon: null }
    default: return { color: 'brand-secondary', uppercase: false, icon: null }
  }
}

const Template = props => {
  const { type, children, inline, label, width, dismissible, collapsible, collapsed, handleDismiss, toggleCollapse } = props
  const style = selectStyle(type)
  const { color, uppercase, icon } = style

  return (
    <Container color={color} width={width} inline={inline} label={label} collapsed={collapsed}>
      { icon && <Icon name={icon} size='18px' weight={600} color={color} /> }
      <BannerContent size='12px' weight={400} color={color} uppercase={uppercase} inline={inline}>
        { children }
      </BannerContent>
      { collapsible && <ActionIcon name={collapsed ? 'down-arrow' : 'up-arrow'} size='14px' weight={600} onClick={toggleCollapse} /> }
      { dismissible && <ActionIcon name='close' size='14px' weight={600} onClick={handleDismiss} /> }
    </Container>
  )
}

export default Template
