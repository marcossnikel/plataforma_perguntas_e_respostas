const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require('./database/Pergunta');
const Resposta = require("./database/Resposta");
//DATABASE
connection.authenticate()
.then(() =>{
 console.log("Succeful Conection with Database")
})
.catch((msgErro)=>{
    console.log(msgErro);
})



//DIZENDO PARA O EXPRESS USARO  EJS COMO VIEW ENGINE
app.set("view engine","ejs");
app.use(express.static('public'));

//BODYPARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.get("/",(req,res)=>{

    Pergunta.findAll({raw: true, order:[
        ['id','DESC']  //ASC = CRESCENTE ; DEC = DECRESCENTE
    ]}).then( perguntas =>{
        res.render("index",{
            perguntas : perguntas
        });
    })

    
});

app.get("/ask",(req,res)=>{
    res.render("ask");
})

app.post("/saveask",(req,res)=> {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({                                   // ´POST >> RECEBE DADOS DE FORMULARIOS
        titulo: titulo,
        descricao:descricao
    }).then( () =>{
        res.redirect("/");
    });
});

app.get("/pergunta/:id", (req,res)=>{
    var id= req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){  // ACHOU A PERGUNTA
            
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [ ['id', 'DESC'] ]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            })
            
        }else{ //NAO ENCONTRATA
            res.redirect("/");
        }
    })
})

app.post("/responder", (req,res)=>{
        let corpo = req.body.corpo;
        let perguntaId = req.body.pergunta;
        Resposta.create({
            corpo: corpo,
            perguntaId : perguntaId,
        }).then(()=>{
                res.redirect("/pergunta/" + perguntaId);
        });
});



app.listen(8080,()=>{ console.log("Server on ")})


