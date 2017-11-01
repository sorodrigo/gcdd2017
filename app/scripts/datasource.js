const datasource = {
  professors: {
    management: true,
    heading: 'Manage Professors',
    columns: ['id', 'name', 'last_name', 'email', 'actions'],
    actions: [
      {
        type: 'setEntity',
        payload: 'professors'
      },
      {
        type: 'setEntity',
        payload: 'categories'
      },
      {
        type: 'setEntity',
        payload: 'occupations'
      }
    ],
    getter: 'getEntity',
    showEdit: true,
    showDelete: true
  },
  courses: {
    management: true,
    heading: 'Manage Courses',
    columns: ['id', 'name', 'grade', 'theory_credits', 'practical_credits', 'actions'],
    actions: [
      {
        type: 'setEntity',
        payload: 'courses'
      },
      {
        type: 'setEntity',
        payload: 'degrees'
      }
    ],
    getter: 'getEntity',
    showEdit: true,
    showDelete: true
  },
  degrees: {
    management: true,
    heading: 'Manage Degrees',
    columns: ['id', 'name', 'year', 'estimate', 'valid', 'actions'],
    actions: [{ type: 'setEntity', payload: 'degrees' }],
    getter: 'getEntity',
    showEdit: true,
    showDelete: true
  },
  staff: {
    management: true,
    heading: 'Manage Staff',
    columns: ['id', 'type', 'workload', 'hours', 'actions'],
    actions: [{ type: 'setEntity', payload: 'staff' }],
    getter: 'getEntity',
    showEdit: true,
    showDelete: true
  },
  categories: {
    management: true,
    heading: 'Manage Categories',
    columns: ['id', 'title', 'priority', 'actions'],
    actions: [{ type: 'setEntity', payload: 'categories' }],
    getter: 'getEntity',
    showEdit: true,
    showDelete: true
  },
  occupations: {
    management: true,
    heading: 'Manage Occupations',
    columns: ['id', 'title', 'value', 'actions'],
    actions: [{ type: 'setEntity', payload: 'occupations' }],
    getter: 'getEntity',
    showEdit: true,
    showDelete: true
  },
};

export default datasource;
