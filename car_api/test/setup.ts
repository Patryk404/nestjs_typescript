import {rm} from "fs/promises";
import {join} from "path";

global.beforeEach(async()=>{ // before each global
    try { 
        await rm(join(__dirname,'..','test.sqlite')); // deleting our database beforeEach test 
    }
    catch(err){

    }
});