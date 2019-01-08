import { MagicCalendarLogic } from "./magicCalendarLogic";

let singletonEnforcer = Symbol();
let singleton = Symbol();

export class MagicCalendarCache {

    constructor(enforcer) {
        
        if (enforcer !== singletonEnforcer)
        {
            throw new Error("Cache manual construction is not allowed");
        }

        this._effects = [];

        const totalSigns = MagicCalendarLogic.TOTAL_SIGNS;

        for (let i = 1; i <= totalSigns; i++) 
        {
            let effects = this._effects[i] = [];
            
            for (let j = 1; j <= totalSigns; j++)
            {
                effects[j] = MagicCalendarLogic._getMagicEffect(i, j);
            }
        }
    }

    
    getMagicEffect(affectedSign, affectingSign) {

        return this._effects[affectedSign][affectingSign];
    }

    static get instance() {

        if (!this[singleton])
        {
            this[singleton] = new MagicCalendarCache(singletonEnforcer);
        }

        return this[singleton];
    }

    static set instance(value) { }
}