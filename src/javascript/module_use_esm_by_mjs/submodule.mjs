// 方式一
export const num = 1;

// 方式二
const name = '小明';

function print(msg) {
  console.log(msg)
}

export {
  name as xiaoming,
  print
}

// 方式三
export default function square(x) {
  return x ** 2
}
