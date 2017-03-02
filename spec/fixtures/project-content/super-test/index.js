import css from './index.css'
import scss from './index.scss'
import data from './data.yaml'

export class Whatever {
  print () {
    return 'hurray!'
  }
}

export default {
  cssClassName: css.component,
  scssClassName: scss.component,
  data: data
}
