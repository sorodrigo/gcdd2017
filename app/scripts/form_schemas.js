import cloneDeep from 'lodash';
import VueFormGenerator from 'vue-form-generator';

const schemas = {
  professors: {
    category: {
      type: 'select',
      multiSelect: false,
      values: 'getCategories',
      selectOptions: {
        name: 'title'
      }
    },
    occupation: {
      type: 'select',
      multiSelect: false,
      values: 'getOccupations',
      selectOptions: {
        name: 'title'
      }
    },
    register_date: {
      type: 'input',
      inputType: 'datetime-local',
      validator: VueFormGenerator.validators.date
    },
    entry_date: {
      type: 'input',
      inputType: 'datetime-local',
      validator: VueFormGenerator.validators.date
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
