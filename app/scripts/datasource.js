const datasource = {
  choose: {
    heading: 'Choose Course',
    columns: ['name', 'degree', 'grade', 'theory_credits', 'practical_credits', 'actions'],
    action: ['setCourses', 'setDegrees'],
    getter: 'getCoursesChoose',
  },
  assign: {
    heading: 'Assign Courses',
    columns: ['id', 'name', 'year', 'estimate', 'valid', 'actions'],
    action: 'setDegrees',
    getter: 'getDegrees',
  },
  professors: {
    management: true,
    heading: 'Manage Professors',
    columns: ['id', 'name', 'last_name', 'email', 'actions'],
    action: ['setProfessors', 'setCategories', 'setOccupations'],
    getter: 'getProfessors',
  },
  courses: {
    management: true,
    heading: 'Manage Courses',
    columns: ['id', 'name', 'grade', 'theory_credits', 'practical_credits', 'actions'],
    action: ['setCourses', 'setDegrees'],
    getter: 'getCourses',
  },
  degrees: {
    management: true,
    heading: 'Manage Degrees',
    columns: ['id', 'name', 'year', 'estimate', 'valid', 'actions'],
    action: 'setDegrees',
    getter: 'getDegrees',
  },
  staff: {
    management: true,
    heading: 'Manage Staff',
    columns: ['id', 'type', 'workload', 'hours', 'actions'],
    action: 'setStaff',
    getter: 'getStaff',
  },
  categories: {
    management: true,
    heading: 'Manage Categories',
    columns: ['id', 'title', 'priority', 'actions'],
    action: 'setCategories',
    getter: 'getCategories',
  },
  occupations: {
    management: true,
    heading: 'Manage Occupations',
    columns: ['id', 'title', 'value', 'actions'],
    action: 'setOccupations',
    getter: 'getOccupations',
  },
};

export default datasource;
