'use strict';
var assert = require('assert');
var semverRegex = require('./');

var fixture = [
	'0.0.0',
	'0.10.0',
	'v1.0.0',
	'0.0.0-foo',
	'1.2.3-4',
	'2.7.2+asdf',
	'1.2.3-a.b.c.10.d.5',
	'2.7.2-foo+bar',
	'1.2.3-alpha.10.beta.0',
	'1.2.3-alpha.10.beta.0+build.unicorn.rainbow',
	'foo 0.0.0 bar 0.0.0'
];

it('should match semver versions', function () {
	fixture.forEach(function (el) {
		assert(semverRegex().test(el), el);
	});

	assert(!semverRegex().test('0.88'));
	assert(!semverRegex().test('1.0.08'));
	assert(!semverRegex().test('1.08.0'));
	assert(!semverRegex().test('01.8.0'));
});

it('should not hang on SNYK-JS-SEMVERREGEX-1047770', function () {
	var start = Date.now();
	semverRegex().test('v1.1.3-0aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aa.aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa$');
	var difference = Date.now() - start;
	assert(difference < 1000, "Execution time: " + difference);
});

it('should not hang on CVE-2021-3795', function () {
	var start = Date.now();
	semverRegex().test('0.0.0-0.-------.-------.-------.-------.-------.-------.-------.-------.-------@');
	var difference = Date.now() - start;
	assert(difference < 1000, "Execution time: " + difference);
});

it('should not hang on CVE-2021-43307', function () {
	var start = Date.now();
	semverRegex().test('0.0.1--.---.---.---.---.---.---.---.---.---.-- ');
	var difference = Date.now() - start;
	assert(difference < 1000, "Execution time: " + difference);
});
