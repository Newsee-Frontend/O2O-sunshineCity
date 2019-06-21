import moduleRouter from './_routerFiles';

const otherRouter = [];

console.log('路由信息：');
console.log([...otherRouter, ...moduleRouter]);
export default [...otherRouter, ...moduleRouter];
