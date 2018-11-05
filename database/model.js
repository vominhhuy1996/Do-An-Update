const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = new Schema({
    toc_do: {type: Number},
    lit_xang: {type: Number},
    quang_duong: {type: Number},
    do_mo_buom_ga: {type: Number},
    gia_tri_so_xe: {type: Number}
})

class Model {
    setObject(obj){
        for(let key in this){
            if (obj[key] != null){
                this[key] = obj[key];
            }
        }
    }

    async create(){
        try{
            await this.save();
        } catch(e){
            console.log(e);
            return null;
        }
    }
}

model.loadClass(Model);

mongoose.model("Model", model, "models");