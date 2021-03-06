function mult_AB_test( assert, mode ) {
	var gpu = new GPU();
	var f = gpu.createKernel(function(a, b) {
		var sum = 0;
		sum += a[this.thread.y][0] * b[0][this.thread.x];
		sum += a[this.thread.y][1] * b[1][this.thread.x];
		sum += a[this.thread.y][2] * b[2][this.thread.x];
		return sum;
	}, {
		dimensions : [3, 3],
		mode: mode
	});
	
	assert.ok( f !== null, "function generated test");
	assert.deepEqual(f(
		[
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		],
		[
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9]
		]),
		[
			[30, 36, 42],
			[66, 81, 96],
			[102, 126, 150]
		], 
		"basic mult function test"
	);
}

QUnit.test( "mult_AB (auto)", function( assert ) {
	mult_AB_test(assert, null);
});
QUnit.test( "mult_AB (GPU)", function( assert ) {
	mult_AB_test(assert, "gpu");
});
QUnit.test( "mult_AB (CPU)", function( assert ) {
	mult_AB_test(assert, "cpu");
});

function sqrt_AB_test( assert, mode ) {
	var gpu = new GPU();
	var f = gpu.createKernel(function(a, b) {
		return Math.sqrt(a[ this.thread.x ] * b[ this.thread.x ]);
	}, {
		dimensions : [6],
		mode : mode
	});
	
	assert.ok( f !== null, "function generated test");
	
	var a = [3, 4, 5, 6, 7, 8];
	var b = [3, 4, 5, 6, 7, 8];
	
	var res = f(a,b);
	var exp = [3, 4, 5, 6, 7, 8];
	
	for(var i = 0; i < exp.length; ++i) {
		QUnit.close(res[i], exp[i], 0.1, "Result arr idx: "+i);
	}
}

QUnit.test( "sqrt_AB (auto)", function( assert ) {
	sqrt_AB_test(assert, null);
});

QUnit.test( "sqrt_AB (GPU)", function( assert ) {
	sqrt_AB_test(assert, "gpu");
});

QUnit.test( "sqrt_AB (CPU)", function( assert ) {
	sqrt_AB_test(assert, "cpu");
});
