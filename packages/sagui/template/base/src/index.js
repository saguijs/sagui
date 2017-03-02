import style from './index.css'

const div = document.createElement('div')
div.innerHTML = '<h1>Hello World</h1>'
div.className = style.component

document.getElementById('root').appendChild(div)
