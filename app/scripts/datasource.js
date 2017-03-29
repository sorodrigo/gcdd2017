const datasource = {
  choose: {
    heading: 'Choose Course',
    columns: ['id', 'name', 'grade', 'theory_credits', 'practical_credits'],
    action: 'setCourses',
    getter: 'getCourses',
  },
  assign: {
    heading: 'Assign Courses',
    columns: ['id', 'name', 'year', 'estimate', 'valid'],
    action: 'setDegrees',
    getter: 'getDegrees'
  },
};

export default datasource;
