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
        {
          id: 1,
          sortOrder: 1,
          value: 'created: 06.10.17',
          created: 1497130826780,
          updated: 1497130826780
        },
        {
          id: 2,
          sortOrder: 2,
          value: 'Messaged someone',
          created: 1497130840000,
          updated: 1497130840000
        },
        {
          id: 3,
          sortOrder: 3,
          value: 'to do for this entry\n-----------------\nasdf\nasdf\nasdf',
          created: 1497130860000,
          updated: 1497130860000
        }
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
        {
          id: 1,
          sortOrder: 1,
          value: 'created: 06.10.17',
          created: 1497130826780,
          updated: 1497130826780
        }
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
        {
          id: 1,
          sortOrder: 1,
          value: 'created: 06.10.17',
          created: 1497130826780,
          updated: 1497130826780
        }
      ]
    }
  ],
  modalOpen: false,
  lastId: 3,
  entryToUpdate: null,
  entryWithEventsToUpdate: null,
  singleViewEntry: null,
  tableSettings: {
    entries: {
      currentSortColumn: null,
      currentSortDirection: 'ascending',
      selectedEntryIds: [2],
      searchString: '',
      modalOpen: false,
      modalSetting: null
    },
    events: {
      currentSortColumn: null,
      currentSortDirection: 'ascending',
      selectedEntryIds: [],
      searchString: '',
      modalOpen: false,
      modalSetting: null
    }
  },
  activeTab: 1
}

export { data }