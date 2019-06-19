const pptx = require('pptxgenjs');
const state = require('./state.js')
const apresentation = new pptx();


async function robot (){
    const content = state.load();
    await defineSettings(content);
    await defineSlideMaster(content);
    await createCoverSlide(content);
    await savePresentation(content);

    function defineSettings(content){
        apresentation.setAuthor("Robozinho");
        apresentation.setCompany("Associação de Robos Depressivos Anonimos - A.R.D.A");
        apresentation.setSubject(content.searchTerm);
        apresentation.setTitle(content.prefix + content.searchTerm);
    }
    function defineSlideMaster(content){
        apresentation.defineSlideMaster({
            title:'MASTER_SLIDE',
            margin:[0.5,0.25,1.00,0.25],
            bkgd: 'FFFFFFF',
            objects:[
                {iamge:{
                    x:11.45,y:5.95,h:0.75, path:'aseets/logo.png'}
                },
                {text:{
                    'This apresentation was made using AutoPpTX',
                    options:{x:0,y:6.9,w:'100%',aling:'c',color:'FFFFFF',fontSize:12}
                }}
            ],
            slideNumber: { x:1.0, y:7.0, color:'FFFFFF' }
        });
    }


    function createCoverSlide(content){
        const date = new Date();
        console.log(date.getUTCFullYear());
        console.log(date.getUTCMonth());
        console.log(date.getUTCDay());
        console.log(date);
        const author ="Robozinho";
        const company="Associação de Robos Depressivos Anonimos - A.R.D.A";
        const coverSlide =  apresentation.addNewSlide('coverSlide');
        coverSlide.addText([{
            text:"This apresentation was made by AutoPPTX",
            options:{
                hyperlink:{url:'https://github.com/LeoFC97/pptx-maker', tooltip:'GitHub'}},
        }],
            {
                x:'30%',
                y:'90%',
                fontSize:10,
                bold:true,
                color:'363636',
            }
       );
       coverSlide.addText("Author:"+ author,{
        x:'50%',
        y:'45%',
        font:20,
        color:'363636',
       });
       coverSlide.addText(content.prefix +"\n"+content.searchTerm,{
           x:'20%',
           y:'30%',
           fontSize:32,
           bold:true,
           color:'363636'
       });
       coverSlide.addText(date.getFullYear()+'/'+date.getMonth()+'/'+date.getDay(),{
        x:'55%',
        y:'50%',
        fontSize:12,
        //italic:true,
        bold:true,
        color:'363636'
    });
    }

    async function savePresentation(content){
        console.log("saving presentation");
        apresentation.save(content.searchTerm);
    }
}



module.exports = robot