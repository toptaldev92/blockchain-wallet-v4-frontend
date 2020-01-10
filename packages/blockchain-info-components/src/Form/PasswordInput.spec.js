import { shallow } from 'enzyme'
import React from 'react'
import toJson from 'enzyme-to-json'

import PasswordInput from './PasswordInput'

describe('PasswordInput component', () => {
  it('default renders correctly', () => {
    const component = shallow(<PasswordInput bordercolor='red600' />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
