const datasource = {
  choose: {
    heading: 'Choose Course',
    columns: ['name', 'degree', 'grade', 'theory_credits', 'practical_credits', 'actions'],
    action: ['setCourses', 'setDegrees'],
    getter: 'getCoursesChoose',
    showEdit: false,
    showDelete: false
  },
  assign: {
    heading: 'Assign Courses',
    columns: ['id', 'name', 'year', 'estimate', 'valid', 'actions'],
    action: 'setDegrees',
    getter: 'getDegrees',
    showEdit: false,
    showDelete: false
  },
  professors: {
    management: true,
    heading: 'Manage Professors',
    columns: ['id', 'name', 'last_name', 'email', 'actions'],
    action: ['setProfessors', 'setCategories', 'setOccupations'],
    getter: 'getProfessors',
    showEdit: true,
    showDelete: true
  },
  courses: {
    management: true,
    heading: 'Manage Courses',
    columns: ['id', 'name', 'grade', 'theory_credits', 'practical_credits', 'actions'],
    action: ['setCourses', 'setDegrees'],
    getter: 'getCourses',
    showEdit: true,
    showDelete: true
  },
  degrees: {
    management: true,
    heading: 'Manage Degrees',
    columns: ['id', 'name', 'year', 'estimate', 'valid', 'actions'],
    action: 'setDegrees',
    getter: 'getDegrees',
    showEdit: true,
    showDelete: true
  },
  staff: {
    management: true,
    heading: 'Manage Staff',
    columns: ['id', 'type', 'workload', 'hours', 'actions'],
    action: 'setStaff',
    getter: 'getStaff',
    showEdit: true,
    showDelete: true
  },
  categories: {
    management: true,
    heading: 'Manage Categories',
    columns: ['id', 'title', 'priority', 'actions'],
    action: 'setCategories',
    getter: 'getCategories',
    showEdit: true,
    showDelete: true
  },
  occupations: {
    management: true,
    heading: 'Manage Occupations',
    columns: ['id', 'title', 'value', 'actions'],
    action: 'setOccupations',
    getter: 'getOccupations',
    showEdit: true,
    showDelete: true
  },
};

export default datasource;
