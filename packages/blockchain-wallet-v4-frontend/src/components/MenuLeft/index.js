import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: ${props => props.theme['gray-5']};
`
export const MenuItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 5px;
  margin-bottom: 8px;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 300;
  font-size: 14px;
  width: 100%;
  & > *:not(div) {
    cursor: pointer;
    transition: color 0.3s;
    color: ${props => props.theme['gray-5']};
  }
  & > span:first-child {
    width: 30px;
    font-size: 28px;
    margin-right: 10px;
    color: ${props => props.theme[props.colorCode]};
  }

  & > span:first-child.small {
    font-size: 22px;
    width: 30px;
    margin-right: 7px;
    margin-left: 3px;
    color: ${props => props.theme[props.colorCode]};
  }

  &.active {
    font-weight: 600;
  }

  &:hover {
    font-weight: 500;
  }
`
export const SubMenu = styled.ul`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  list-style: none;
  text-transform: none;
  padding: 5px;
  margin-left: 40px;
  margin-top: -15px;
  margin-bottom: 5px;
`
export const SubMenuItem = styled.li`
  padding: 4px 0;
  box-sizing: border-box;
  text-transform: none;
  font-weight: 300;
  font-size: 14px;
  cursor: pointer;

  &.active {
    & > * {
      font-weight: 400;
      color: ${props => props.theme['marketing-primary']};
    }
  }
`
export const Separator = styled.div`
  margin-top: 15px;
`
