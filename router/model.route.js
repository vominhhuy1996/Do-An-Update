const router = require('express').Router();
const Model = require('mongoose').model('Model');
router.get('', async (req,res,next)=>{
    let a = "{\"toc_do\":99,\"lit_xang\":99,\"quang_duong\": 88, \"do_mo_buom_ga\": 1, \"gia_tri_so_xe\": 4}";
    let model = new Model();
    model.setObject(JSON.parse(a));
    await model.create();
    return res.status(200).json(model);
});

router.get('/getall', async (req,res,next)=>{
    return res.status(200).json(await Model.find());
});

module.exports = router;