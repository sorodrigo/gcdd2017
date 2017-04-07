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
    heading: 'Manage Professors',
    columns: ['id', 'name', 'last_name', 'email', 'actions'],
    action: 'setProfessors',
    getter: 'getProfessors',
  },
  courses: {
    heading: 'Manage Courses',
    columns: ['id', 'name', 'grade', 'theory_credits', 'practical_credits', 'actions'],
    action: 'setCourses',
    getter: 'getCourses',
  },
  degrees: {
    heading: 'Manage Degrees',
    columns: ['id', 'name', 'year', 'estimate', 'valid', 'actions'],
    action: 'setDegrees',
    getter: 'getDegrees',
  },
  staff: {
    heading: 'Manage Staff',
    columns: ['id', 'type', 'workload', 'hours', 'actions'],
    action: 'setStaff',
    getter: 'getStaff',
  },
  categories: {
    heading: 'Manage Categories',
    columns: ['id', 'title', 'priority', 'actions'],
    action: 'setCategories',
    getter: 'getCategories',
  },
  occupations: {
    heading: 'Manage Occupations',
    columns: ['id', 'title', 'value', 'actions'],
    action: 'setOccupations',
    getter: 'getOccupations',
  },
};

export default datasource;
