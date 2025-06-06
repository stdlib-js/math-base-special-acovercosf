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

#include "stdlib/math/base/special/acovercosf.h"
#include <stdio.h>

int main( void ) {
	const float x[] = { 0.0f, 0.27f, 0.56f, 0.78f, 1.67f, 1.70f, 1.78f, 1.80f, 1.89f, 2.0f };

	float v;
	int i;
	for ( i = 0; i < 10; i++ ) {
		v = stdlib_base_acovercosf( x[ i ] );
		printf( "acovercosf(%f) = %f\n", x[ i ], v );
	}
}
