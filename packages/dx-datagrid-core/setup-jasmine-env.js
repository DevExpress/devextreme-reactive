/* eslint-disable */

var jasmineReporters = require('jasmine-reporters');
jasmine.VERBOSE = true;
jasmine.getEnv().addReporter(
    new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        consolidate: true,
        savePath: `../../shippable/testresults`,
        filePrefix: 'dx-datatgrid-core-'
    })
);
