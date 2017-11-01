import cloneDeep from 'lodash';
import VueFormGenerator from 'vue-form-generator';

const schemas = {
  professors: {
    category: {
      type: 'select',
      multiSelect: false,
      relation: {
        key: 'values',
        name: 'categories'
      },
      selectOptions: {
        name: 'title'
      }
    },
    occupation: {
      type: 'select',
      multiSelect: false,
      relation: {
        key: 'values',
        name: 'occupations'
      },
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
      relation: {
        key: 'values',
        name: 'degrees'
      },
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
