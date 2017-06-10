let data = {
  data: [
    {
      id: 1,
      company: 'name1',
      description: 'brown',
      jobTitle: 'Engineer',
      notes: 'amazing',
      sortOrder: 1,
      created: 1497130826780,
      updated: 1497130826780,
      events: [
        'created: 06.10.17'
      ]
    },
    {
      id: 2,
      company: 'name2',
      description: 'blue',
      jobTitle: 'Engineer',
      notes: 'amazing',
      sortOrder: 2,
      created: 1497130826780,
      updated: 1497130826780,
      events: [
        'created: 06.10.17'
      ]
    },
    {
      id: 3,
      company: 'name3',
      description: 'green',
      jobTitle: 'Engineer',
      notes: 'amazing',
      sortOrder: 3,
      created: 1497130826780,
      updated: 1497130826780,
      events: [
        'created: 06.10.17'
      ]
    }
  ],
  modalOpen: false,
  lastId: 3,
  entryToUpdate: null,
  entryWithEventsToUpdate: null,
  singleViewEntry: null,
  table: {
    currentSortColumn: null,
    currentSortDirection: 'ascending',
    selectedEntryIds: [2],
    searchString: '',
    hiddenTableProperties: [
      'sortOrder',
      'events'
    ]
  },
  activeTab: 1
}

export { data }