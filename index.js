var assert = require('assert')
	, _ = require('lodash')
module.exports = describeTest;

function describeTest(task){
	if(_.isArray(task)) return _.forEach(task,describeTest);
	describe(task.ttl, function(){
		if(task.cases) defineTest(task.cases);
	})

	if(_.isArray(task.units) && task.units.length){ return _.forEach(task.units,describeTest);}
}

function defineTest(test){
	if(_.isArray(test)) return _.forEach(test,defineTest);

	var q = test.create(test);
	it(test.ttl, function(done){
		if(assert[test.opr]){
			var args = [ test.cmp(q, test) ];
			if(test.rslt) args.push( (_.isFunction(test.rslt)) ? test.rslt(q, test) : test.rslt);
			if(test.msg) args.push(test.msg);

			assert[test.opr].apply(this, args);
		}
		done();
	});
	// TODO:- Define units inside a test/case
	// if(_.isArray(test.units) && test.units.length){ return _.forEach(test.units,describeTest);}
	
}
