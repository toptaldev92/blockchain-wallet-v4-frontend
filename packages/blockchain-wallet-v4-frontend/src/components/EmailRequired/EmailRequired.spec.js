import { shallow } from 'enzyme'
import React from 'react'
import toJson from 'enzyme-to-json'

import EmailRequired from './EmailRequired'

describe('EmailRequired component', () => {
  it('renders correctly', () => {
    const component = shallow(<EmailRequired />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
