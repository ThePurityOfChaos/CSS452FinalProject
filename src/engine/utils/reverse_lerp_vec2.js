/* 
 * File: reverse_lerp_vec2.js
 * Encapsulates linear interpolation of vec2
 */

"use strict";

import LerpVec2 from "./lerp_vec2";

class ReverseLerpVec2 extends LerpVec2{

    _interpolateValue() {
        this.mCurrentValue = this.reverseLerp(this.mCurrentValue, this.mCurrentValue, this.mFinalValue);
    }

    reverseLerp(value, v1, v2){
        const tX = (value[0] - v1[0]) / (v2[0] - v1[0]);
        const tY = (value[1] - v1[1]) / (v2[1] - v1[1]);
        return [tX, tY];
    }
}

export default ReverseLerpVec2;