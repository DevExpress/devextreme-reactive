var jasmineReporters = require('jasmine-reporters');
jasmine.VERBOSE = true;
jasmine.getEnv().addReporter(
    new jasmineReporters.JUnitXmlReporter({
        consolidateAll: false,
        consolidate: true,
        savePath: `${__dirname}/../shippable/testresults`
    })
);
