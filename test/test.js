'use strict';

var path = require('path');
var test = require('ava');
var Decompress = require('../');

test('extract .tar', function (t) {
	t.plan(2);

	var decompress = new Decompress()
		.src(path.join(__dirname, 'fixtures/test.tar'))
		.use(Decompress.tar());

	decompress.run(function (err, files) {
		t.assert(!err, err);
		t.assert(files[0].path === 'test.jpg', files[0].path);
	});
});

test('extract .tar.bz2', function (t) {
	t.plan(2);

	var decompress = new Decompress()
		.src(path.join(__dirname, 'fixtures/test.tar.bz2'))
		.use(Decompress.tarbz2());

	decompress.run(function (err, files) {
		t.assert(!err, err);
		t.assert(files[0].path === 'test.jpg', files[0].path);
	});
});

test('extract .tar.gz', function (t) {
	t.plan(2);

	var decompress = new Decompress()
		.src(path.join(__dirname, 'fixtures/test.tar.gz'))
		.use(Decompress.targz());

	decompress.run(function (err, files) {
		t.assert(!err, err);
		t.assert(files[0].path === 'test.jpg', files[0].path);
	});
});

test('extract .zip', function (t) {
	t.plan(2);

	var decompress = new Decompress()
		.src(path.join(__dirname, 'fixtures/test.zip'))
		.use(Decompress.zip());

	decompress.run(function (err, files) {
		t.assert(!err, err);
		t.assert(files[0].path === 'test.jpg', files[0].path);
	});
});

test('extract using the strip option', function (t) {
	t.plan(2);

	var decompress = new Decompress()
		.src(path.join(__dirname, 'fixtures/test-strip.zip'))
		.use(Decompress.zip({strip: 1}));

	decompress.run(function (err, files) {
		t.assert(!err, err);
		t.assert(files[0].path === 'test-strip.jpg', files[0].path);
	});
});

test('do not extract nested archives', function (t) {
	t.plan(2);

	var decompress = new Decompress()
		.src(path.join(__dirname, 'fixtures/test-nested.tar.gz'))
		.use(Decompress.targz())
		.use(Decompress.zip());

	decompress.run(function (err, files) {
		t.assert(!err, err);
		t.assert(files[0].path === 'test.zip', files[0].path);
	});
});
