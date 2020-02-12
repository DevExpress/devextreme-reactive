import randomSeed from './random';

const femaleFirstNames = ['Mary', 'Linda', 'Barbara', 'Maria', 'Lisa', 'Nancy', 'Betty', 'Sandra', 'Sharon'];
const maleFirstNames = ['James', 'John', 'Robert', 'William', 'David', 'Richard', 'Thomas', 'Paul', 'Mark'];
const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Johnson', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson',
  'Thomas', 'Jackson', 'Williams', 'White', 'Harris', 'Davis', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark',
];
const usStates = [
  { name: 'Alabama', abbr: 'AL' },
  { name: 'Alaska', abbr: 'AK' },
  { name: 'American Samoa', abbr: 'AS' },
  { name: 'Arizona', abbr: 'AZ' },
  { name: 'Arkansas', abbr: 'AR' },
  { name: 'California', abbr: 'CA' },
  { name: 'Colorado', abbr: 'CO' },
  { name: 'Connecticut', abbr: 'CT' },
  { name: 'Delaware', abbr: 'DE' },
  { name: 'District Of Columbia', abbr: 'DC' },
  { name: 'Federated States Of Micronesia', abbr: 'FM' },
  { name: 'Florida', abbr: 'FL' },
  { name: 'Georgia', abbr: 'GA' },
  { name: 'Guam', abbr: 'GU' },
  { name: 'Hawaii', abbr: 'HI' },
  { name: 'Idaho', abbr: 'ID' },
  { name: 'Illinois', abbr: 'IL' },
  { name: 'Indiana', abbr: 'IN' },
  { name: 'Iowa', abbr: 'IA' },
  { name: 'Kansas', abbr: 'KS' },
  { name: 'Kentucky', abbr: 'KY' },
  { name: 'Louisiana', abbr: 'LA' },
  { name: 'Maine', abbr: 'ME' },
  { name: 'Marshall Islands', abbr: 'MH' },
  { name: 'Maryland', abbr: 'MD' },
  { name: 'Massachusetts', abbr: 'MA' },
  { name: 'Michigan', abbr: 'MI' },
  { name: 'Minnesota', abbr: 'MN' },
  { name: 'Mississippi', abbr: 'MS' },
  { name: 'Missouri', abbr: 'MO' },
  { name: 'Montana', abbr: 'MT' },
  { name: 'Nebraska', abbr: 'NE' },
  { name: 'Nevada', abbr: 'NV' },
  { name: 'New Hampshire', abbr: 'NH' },
  { name: 'New Jersey', abbr: 'NJ' },
  { name: 'New Mexico', abbr: 'NM' },
  { name: 'New York', abbr: 'NY' },
  { name: 'North Carolina', abbr: 'NC' },
  { name: 'North Dakota', abbr: 'ND' },
  { name: 'Northern Mariana Islands', abbr: 'MP' },
  { name: 'Ohio', abbr: 'OH' },
  { name: 'Oklahoma', abbr: 'OK' },
  { name: 'Oregon', abbr: 'OR' },
  { name: 'Palau', abbr: 'PW' },
  { name: 'Pennsylvania', abbr: 'PA' },
  { name: 'Puerto Rico', abbr: 'PR' },
  { name: 'Rhode Island', abbr: 'RI' },
  { name: 'South Carolina', abbr: 'SC' },
  { name: 'South Dakota', abbr: 'SD' },
  { name: 'Tennessee', abbr: 'TN' },
  { name: 'Texas', abbr: 'TX' },
  { name: 'Utah', abbr: 'UT' },
  { name: 'Vermont', abbr: 'VT' },
  { name: 'Virgin Islands', abbr: 'VI' },
  { name: 'Virginia', abbr: 'VA' },
  { name: 'Washington', abbr: 'WA' },
  { name: 'West Virginia', abbr: 'WV' },
  { name: 'Wisconsin', abbr: 'WI' },
  { name: 'Wyoming', abbr: 'WY' },
];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Las Vegas', 'Austin', 'Tokyo', 'Rio de Janeiro', 'London', 'Paris'];
const cars = ['Honda Civic', 'Toyota Corolla', 'Chevrolet Cruze', 'Honda Accord', 'Nissan Altima', 'Kia Optima', 'Audi A4', 'BMW 750'];
const positions = ['CEO', 'IT Manager', 'Ombudsman', 'CMO', 'Controller', 'HR Manager', 'Shipping Manager', 'Sales Assistant', 'HR Assistant'];

const generateDate = ({
  random,
  year = 2017,
  month = rand => Math.floor(rand() * 12),
  day = rand => Math.floor(rand() * 30) + 1,
}) => {
  const getPart = part => (typeof part === 'function' ? part(random) : part);
  const date = new Date(Date.UTC(getPart(year), getPart(month), getPart(day)));
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const generatePhone = () => Math.random().toString().slice(2, 12).replace(/(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');

export const defaultColumnValues = {
  gender: ['Male', 'Female'],
  name: [
    'gender',
    {
      Male: maleFirstNames,
      Female: femaleFirstNames,
    },
  ],
  city: cities,
  car: cars,
};

export const defaultNestedColumnValues = {
  user: [
    ...[...maleFirstNames, ...femaleFirstNames].map((name, i) => ({
      firstName: name,
      lastName: lastNames[i],
    })),
  ],
  position: positions,
  city: cities,
  car: cars.map(car => ({ model: car })),
};

export const globalSalesValues = {
  region: ['Asia', 'Europe', 'North America', 'South America', 'Australia', 'Africa'],
  sector: ['Energy', 'Health', 'Manufacturing', 'Insurance', 'Banking', 'Telecom'],
  channel: ['Resellers', 'Retail', 'VARs', 'Consultants', 'Direct', 'Telecom'],
  units: ({ random }) => Math.floor(random() * 4) + 1,
  customer: [
    'Renewable Supplies', 'Energy Systems', 'Environment Solar', 'Beacon Systems', 'Apollo Inc',
    'Gemini Stores', 'McCord Builders', 'Building M Inc', 'Global Services',
    'Market Eco', 'Johnson & Assoc', 'Get Solar Inc', 'Supply Warehouse', 'Discovery Systems', 'Mercury Solar'],
  product: ['SolarMax', 'SolarOne', 'EnviroCare', 'EnviroCare Max'],
  amount: ({ random }) => (Math.floor((random() * 1000000) + 1000) / 20),
  discount: ({ random }) => Math.round(random() * 0.5 * 1000) / 1000,
  saleDate: ({ random }) => generateDate({
    random,
    year: 2016,
    month: () => Math.floor(random() * 3) + 1,
  }),
  shipped: [true, false],
};

export const employeeValues = {
  gender: ['Male', 'Female'],
  prefix: [
    'gender',
    {
      Male: ['Mr.', 'Dr.'],
      Female: ['Mrs.', 'Ms.', 'Dr.'],
    },
  ],
  firstName: [
    'gender',
    {
      Male: maleFirstNames,
      Female: femaleFirstNames,
    },
  ],
  lastName: lastNames,
  position: positions,
  state: usStates.map(state => state.name),
  birthDate: ({ random }) => generateDate({
    random,
    year: () => Math.floor(random() * 30) + 1960,
  }),
  phone: generatePhone,
};

export const employeeTaskValues = {
  priority: ['High', 'Low', 'Normal'],
  status: ['Completed', 'In Progress', 'Deferred', 'Need Assistance'],
  subject: [
    'Choose between PPO and HMO Health Plan',
    'Google AdWords Strategy',
    'New Brochures',
    'Update NDA Agreement',
    'Review Product Recall Report by Engineering Team',
    'Update Personnel Files',
    'Review Health Insurance Options Under the Affordable Care Act',
    'Non-Compete Agreements',
    'Give Final Approval for Refunds',
    'Deliver R&D Plans',
    'Decide on Mobile Devices to Use in the Field',
    'Try New Touch-Enabled Apps',
    'Approval on Converting to New HDMI Specification',
    'Approve Hiring',
    'Update Employee Files with New NDA',
    'Provide New Health Insurance Docs',
    'Prepare 3013 Marketing Plan',
    'Rollout of New Website and Marketing Brochures',
    'Review Sales Report and Approve Plans',
    'Review Site Up-Time Report',
    'Review HR Budget Company Wide',
    'Final Budget Review',
    'Sign Updated NDA',
    'Review Overtime Report',
    'Upgrade Server Hardware',
    'Upgrade Personal Computers',
    'Prepare Financial',
    'Update Revenue Projections',
    'Submit D&B Number to ISP for Credit Approval',
    'Update Sales Strategy Documents',
    'Refund Request Template',
  ],
  startDate: ({ random }) => generateDate({
    random,
    year: 2016,
  }),
  dueDate: ({ random, record }) => generateDate({
    random,
    year: 2016,
    month: () => Math.floor(random() * 2) + (new Date(record.startDate)).getMonth(),
  }),
};

export function generateRows({
  columnValues = defaultColumnValues,
  length,
  random = randomSeed(329972281),
}) {
  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach((column) => {
      let values = columnValues[column];

      if (typeof values === 'function') {
        record[column] = values({ random, index: i, record });
        return;
      }

      while (values.length === 2 && typeof values[1] === 'object') {
        values = values[1][record[values[0]]];
      }

      const value = values[Math.floor(random() * values.length)];
      if (typeof value === 'object') {
        record[column] = { ...value };
      } else {
        record[column] = value;
      }
    });

    data.push(record);
  }

  return data;
}
