import ParticleEmitter from "./particle_emitter.js";


class GravityEmitter extends ParticleEmitter{
    
    constructor(px, py, num, perpetual){
        let creatorFunc = gravity.creatorFunc();
        super(px,py,num,creatorFunc);
        this.perpetual = perpetual;
        if(this.perpetual)
        this.baseNum = num;
    }

    emitParticles(pSet){
        super.emitParticles(pSet);
        if(this.perpetual)
        this.mNumRemains = this.baseNum;
    }


}
export default GravityEmitter;