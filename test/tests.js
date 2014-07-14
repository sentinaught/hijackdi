require('chai').should();
var expect = require('chai').expect;

var Hijackdi = require('../lib/hijackdi.js');
var fakeDependency = require('../fakeDependencies/fakeDependency.js'),
	otherFakeDependency = require('../fakeDependencies/otherFakeDependency.js');
					

test("when in sandbox, then dependencies and mocked",function(done){
	var mocks = {
		'../fakeDependencies/fakeDependency.js': function(){
			done();
		}};

	var hijackdi = new Hijackdi('../fakeDependencies/callsStuff.js');
	hijackdi.sandbox(mocks,function(subject){

		expect(function(){
			subject();
		}).to.not.throw('Not stubbed/mocked');
	});
});

test('When multiple items faked, Then all are all dependencies are faked',function(){
	var mocks =  {
			'../fakeDependencies/fakeDependency.js': function(){},
			'../fakeDependencies/otherFakeDependency.js': function(){}
		};
	var hijackdi = new Hijackdi('../fakeDependencies/callsMultiple.js');
	hijackdi.sandbox(mocks,function(subject){
		expect(function(){
				subject();
			}).to.not.throw('Not stubbed/mocked');
	});
});

test('When item is faked, outside sandbox item acts as normal',function(){
	var mocks = {
		'../fakeDependencies/fakeDependency.js': function(){
		}};

	var hijackdi = new Hijackdi('../fakeDependencies/callsStuff.js');
	hijackdi.sandbox(mocks,function(subject){
	});
	var callsStuff = require('../fakeDependencies/callsStuff.js');
	expect(function(){ 
		callsStuff();
	}).to.throw('Not stubbed/mocked');
});