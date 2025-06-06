/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var tape = require( 'tape' );
var isnanf = require( '@stdlib/math-base-assert-is-nanf' );
var randu = require( '@stdlib/random-base-randu' );
var absf = require( '@stdlib/math-base-special-absf' );
var EPS = require( '@stdlib/constants-float32-eps' );
var float64ToFloat32 = require( '@stdlib/number-float64-base-to-float32' );
var tryRequire = require( '@stdlib/utils-try-require' );


// FIXTURES //

var data = require( './fixtures/julia/data.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );


// VARIABLES //

var acovercosf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( acovercosf instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof acovercosf, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the inverse coversed cosine', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = data.x;
	expected = data.expected;

	for ( i = 0; i < x.length; i++ ) {
		e = float64ToFloat32( expected[ i ] );
		y = acovercosf( x[ i ] );
		if ( y === e ) {
			t.strictEqual( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = absf( y - e );
			tol = 230.0 * EPS * absf( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the inverse coversed cosine (small positive numbers)', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;
	var e;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		e = float64ToFloat32( expected[ i ] );
		y = acovercosf( x[ i ] );
		if ( y === e ) {
			t.strictEqual( y, e, 'x: '+x[ i ]+'. E: '+e );
		} else {
			delta = absf( y - e );
			tol = EPS * absf( e );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. y: '+y+'. E: '+e+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a `NaN`', opts, function test( t ) {
	var v = acovercosf( NaN );
	t.strictEqual( isnanf( v ), true, 'returns expected value' );
	t.end();
});

tape( 'the function returns `NaN` if provided a value less than `0`', opts, function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = -( randu() * 1.0e6 ) - EPS;
		t.strictEqual( isnanf( acovercosf( v ) ), true, 'returns expected value when provided '+v );
	}
	t.end();
});

tape( 'the function returns `NaN` if provided a value greater than `2`', opts, function test( t ) {
	var v;
	var i;
	for ( i = 0; i < 1e4; i++ ) {
		v = ( randu() * 1.0e6 ) + ( 2.0+EPS );
		t.strictEqual( isnanf( acovercosf( v ) ), true, 'returns expected value when provided '+v );
	}
	t.end();
});
