import { shallow } from 'enzyme'
import React from 'react'
import toJson from 'enzyme-to-json'

import FlatLoader2 from './FlatLoader2'

describe('FlatLoader2 component', () => {
  it('default renders correctly', () => {
    const component = shallow(
      <FlatLoader2 height='10px' width='10px' color='blue900' />
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
