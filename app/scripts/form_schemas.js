import cloneDeep from 'lodash';

const schemas = {
  professors: {
    category: {
      type: 'select',
      multiSelect: false,
      values: 'getCategories'
    },
    occupation: {
      type: 'select',
      multiSelect: false,
      values: 'getOccupations'
    }
  },
  courses: {
    degrees: {
      type: 'checklist',
      values: 'getDegrees',
      dispatch: (model, newVal) => {
        const m = cloneDeep(model);
        m.degrees = [...newVal];
        return m.degrees;
      },
      checklistOptions: {
        value: 'id'
      }
    }
  }
};

export default schemas;
