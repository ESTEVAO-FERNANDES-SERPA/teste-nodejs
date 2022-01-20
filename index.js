const express = require('express')
const path = require('path')
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


//MVC -MODEL VIEW CONTROLLER

//rotas
app.get('/', (req, res) => { 
    res.render('index',{
        title: 'Digital Tech - Home'
    })
})
app.get('/posts',(req, res) => { 
    res.render('posts',{
        title:'Digital Tech - Posts'
    })
})


//404 error (not found)
app.use((req, res)=>{ //middleware
    res.send('Página não encontrada')
})


//executando o Servidor
const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`Server is listening on port ${port}`))