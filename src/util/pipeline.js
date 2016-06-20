export default (...functions) => functions.reduce.bind(functions, (accumulated, f) => f(accumulated))
