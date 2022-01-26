const express = require('express')
const path = require('path')
const fs = require('fs')


const app  = express()

// definindo o template engine
app.set('view engine', 'ejs')

//definindo os arquivos estaticos
/*
const staticFolder = path.join(__dirname, 'views')
const expressStatic = express.static(staticFolder)
app.use(expressStatic)
*/

// não é mais necessario usar arquivos estaticos pois o templete engine já resolve
/*
app.use(express.static(path.join(__dirname, 'views')))
*/

//definindo os arquivos publicos
app.use(express.static(path.join(__dirname, 'public')))


//habilita server para receber dados via post(formulario)
app.use(express.urlencoded({extended:true}))



//MVC -MODEL VIEW CONTROLLER

//rotas
app.get('/', (req, res) => { 
    res.render('index',{
        title: 'Digital Tech - Home'
    })
})
app.get('/cadastros', (req, res) => { 
    const{c} = req.query
    res.render('cadastros',{
        title: 'Digital Tech - Cadastro de Posts',
        cadastrado: c,
    })
})
app.post('/salvar', (req, res) => { 
    const{titulo, texto} = req.body

    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)

    posts.push({
        titulo,
        texto,
    })


    const postsString = JSON.stringify(posts)

    fs.writeFileSync('./store/posts.json', postsString)

    res.redirect('/cadastros?c=1')
})
app.get('/posts',(req, res) => { 
    res.render('posts',{
        title:'Digital Tech - Posts',
        posts:[
            {
                title:'Novidades no mundo da tecnologia',
                text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. A sunt eos suscipit optio, necessitatibus deleniti sint libero voluptate illo enim, officia debitis, eveniet accusamus porro? Voluptatum dolorum quae impedit fugiat.',
                star: 3,
            },
            {
                title:'Criando um servidor com nodejs',
                text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. A sunt eos suscipit optio, necessitatibus deleniti sint libero voluptate illo enim, officia debitis, eveniet accusamus porro? Voluptatum dolorum quae impedit fugiat.',
                
            },
            {
                title:'JS é legal',
                text:'Lorem ipsum dolor sit amet consectetur adipisicing elit. A sunt eos suscipit optio, necessitatibus deleniti sint libero voluptate illo enim, officia debitis, eveniet accusamus porro? Voluptatum dolorum quae impedit fugiat.Lorem ipsum dolor sit amet consectetur adipisicing elit. A sunt eos suscipit optio, necessitatibus deleniti sint libero voluptate illo enim, officia debitis, eveniet accusamus porro? Voluptatum dolorum quae impedit fugiat.',
                star: 5,
            }
        ]
    })
})


//404 error (not found)
app.use((req, res)=>{ //middleware
    res.send('Página não encontrada')
})


//executando o Servidor
const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`Server is listening on port ${port}`))