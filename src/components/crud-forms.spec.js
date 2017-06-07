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

  // I don't really feel a need to test this. I rarely have HTML problems
  // it('should render an Input and Textarea', () => {
  //   const wrapper = getMockForNewEntryTests()

  //   // this doesn't work...
  //   // expect(wrapper.containsAllMatchingElements([
  //   //   <Input />,
  //   //   <Textarea />
  //   // ])).to.equal(true)

  //   // ...but these do. WTH?
  //   expect(wrapper.containsMatchingElement(
  //     <Input />
  //   )).to.equal(true)

  //   expect(wrapper.containsMatchingElement(
  //     <Textarea />
  //   )).to.equal(true)
  // })

  it('should start with empty properties', () => {
    const wrapper = getMockForNewEntryTests()
    expect(wrapper.state('formControls')).to.eql({
      company: '',
      description: '',
      jobTitle: '',
      notes: ''
    })
  })

  it('should maintain form control state', () => {
    const wrapper = getMockForNewEntryTests()
    const input = wrapper.find('input[name=\'company\']')
    input.simulate('change', getEventNodeMock('company', 'test'))
    expect(wrapper.state()['formControls']['company']).to.equal('test')
  })

  it('should properly submit data', () => {
    
    // mocks
    const addNewEntryToDataSpy = spy()
    const wrapper = shallow(<CreateEntryForm 
      addNewEntryToData={addNewEntryToDataSpy}
      getNewId={() => { return 42 }}
    />)

    // set form state
    wrapper.setState({
      formControls: {
        company: 'test company',
        description: 'test description',
        jobTitle: 'test job title',
        notes: 'test note'
      }
    })

    // click submit
    wrapper.find('#submit-new-entry').simulate('click')

    // confirm data submitted
    expect(addNewEntryToDataSpy.calledOnce).to.equal(true)
    expect(addNewEntryToDataSpy.calledWith({
      id: 42,
      company: 'test company',
      description: 'test description',
      jobTitle: 'test job title',
      notes: 'test note',
      sortOrder: 42
    })).to.equal(true)

    // confirm form cleared
    expect(wrapper.state()['formControls']['company']).to.equal('')
    expect(wrapper.state()['formControls']['description']).to.equal('')
    expect(wrapper.state()['formControls']['jobTitle']).to.equal('')
    expect(wrapper.state()['formControls']['notes']).to.equal('')
  })

})




describe('UpdateEntryForm', () => {
  it('should set it\'s state to the provided values', () => {
    const wrapper = getMockForUpdateEntryTests()
    expect(wrapper.state()['formControls']['company']).to.equal('test company')
    expect(wrapper.state()['formControls']['description']).to.equal('test description')
    expect(wrapper.state()['formControls']['jobTitle']).to.equal('test job title')
    expect(wrapper.state()['formControls']['notes']).to.equal('test note')
  })

  it('should maintain form control state', () => {
    const wrapper = getMockForUpdateEntryTests()
    const input = wrapper.find('input[name=\'company\']')
    input.simulate('change', getEventNodeMock('company', 'test'))
    expect(wrapper.state()['formControls']['company']).to.equal('test')
  })


  it('should properly update data', () => {

    // mocks
    const updateEntrySpy = spy()
    const afterUpdateSpy = spy()
    const wrapper = mount(<UpdateEntryForm
      entryToUpdate={{
        id: 42,
        company: 'test company',
        description: 'test description',
        jobTitle: 'test job title',
        notes: 'test note',
        sortOrder: 42
      }}
      updateEntry={updateEntrySpy}
      afterUpdate={afterUpdateSpy}
    />)

    // set form state
    wrapper.find('#update-form-company').simulate('change', getEventNodeMock('company', 'update company'))
    wrapper.find('#update-form-description').simulate('change', getEventNodeMock('description', 'update description'))
    wrapper.find('#update-form-job-title').simulate('change', getEventNodeMock('jobTitle', 'update job title'))
    wrapper.find('#update-form-notes').simulate('change', getEventNodeMock('notes', 'update note'))

    // click submit
    wrapper.find('#submit-updated-entry').simulate('click')

    // confirm data submitted
    expect(updateEntrySpy.calledOnce).to.equal(true)
    expect(updateEntrySpy.calledWith({
      id: 42,
      company: 'update company',
      description: 'update description',
      jobTitle: 'update job title',
      notes: 'update note'
    })).to.equal(true)

    expect(afterUpdateSpy.calledOnce).to.equal(true)

    // confirm form cleared
    expect(wrapper.state()['formControls']['company']).to.equal('')
    expect(wrapper.state()['formControls']['description']).to.equal('')
    expect(wrapper.state()['formControls']['jobTitle']).to.equal('')
    expect(wrapper.state()['formControls']['notes']).to.equal('')
  })


})


function getMockForNewEntryTests() {
  let wrapper = mount(<CreateEntryForm
    addNewEntryToData={spy()}
    getNewId={spy()}
  />)

  return wrapper
}

function getMockForUpdateEntryTests() {
  const updateEntrySpy = spy()
  const afterUpdateSpy = spy()
  const wrapper = mount(<UpdateEntryForm
    entryToUpdate={{
      id: 42,
      company: 'test company',
      description: 'test description',
      jobTitle: 'test job title',
      notes: 'test note',
      sortOrder: 42
    }}
    updateEntry={updateEntrySpy}
    afterUpdate={afterUpdateSpy}
  />)

  return wrapper
}

function getEventNodeMock(name, value) {
  let node = {
    target: {
      name: name,
      value: value,
      getAttribute: function(attr) {
        return this[attr]
      }
    }
  }
  
  return node
}