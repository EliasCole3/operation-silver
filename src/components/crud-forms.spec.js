import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import { spy } from 'sinon'

import { CreateEntryForm, UpdateEntryForm } from './crud-forms'
import { Input, Textarea } from './form-components'

// import { clone } from '../src/toolbox/clone'

describe('The base setup', () => {
  it('works', () => {
    expect(true).to.be.true
  })
})



describe('CreateEntryForm', () => {
  it('should render an Input and Textarea', () => {
    const wrapper = shallow(<CreateEntryForm />)
    // console.log(wrapper)
    // for(let prop in wrapper) {
    //   console.log(prop)
    // }
    
    // this doesn't work...
    // expect(wrapper.containsAllMatchingElements([
    //   <Input />,
    //   <Textarea />
    // ])).to.equal(true)

    // ...but these do. WTH?
    expect(wrapper.containsMatchingElement(
      <Input />
    )).to.equal(true)

    expect(wrapper.containsMatchingElement(
      <Textarea />
    )).to.equal(true)
  })

  it('should start with empty properties', () => {
    const wrapper = shallow(<CreateEntryForm />)
    
    expect(wrapper.state('formControls')).to.eql({
      company: '',
      description: '',
      jobTitle: '',
      notes: ''
    })
  })

})

