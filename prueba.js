const dayjs = require('dayjs');
var isTomorrow = require('dayjs/plugin/isTomorrow')

dayjs.extend(isTomorrow)

// const res = dayjs("2018-12-25T12:15:00-03:00").add(1, 'day').isTomorrow("2018-12-24T12:15:00-03:00")
const f1 = "2022-01-23T22:10:53-03:00"
const f2 = "2022-01-24T08:53:15-03:00"

const res2 = dayjs(f1).add(1, 'day').isAfter(f2)

console.log(res2)



