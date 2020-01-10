import { shallow } from 'enzyme'
import React from 'react'
import toJson from 'enzyme-to-json'

import FlatLoader from './FlatLoader'

describe('FlatLoader component', () => {
  it('default renders correctly', () => {
    const component = shallow(
      <FlatLoader height='10px' width='10px' color='blue900' />
    )
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})
