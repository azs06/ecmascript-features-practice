/*
function *bears(){
	var kind = yield "grizzly";
	yield kind + ' polar';
	return 'all done';
}

var bear = bears();

console.log(bear.next())
console.log(bear.next('icy'))
console.log(bear.next())
console.log(bear.next())
*/




var fs = require('fs')

function run (generator) {
  var data = null, yielded = false
  var iterator = generator(function (err, item) {
    data = [err, item]
    check()
  })
  yielded = !!(iterator.next())
  check()
  function check () {
    while (data && yielded) {
      var err = data[0], item = data[1]
      data = null
      yielded = false
      if (err) return iterator.throw(err)
      yielded = !!(iterator.next(item))
    }
  }
}

run(function* (resume) {
  var contents = yield fs.readFile('big.text', 'utf8', resume)
  var uppercase = contents.toUpperCase()
  yield fs.writeFile('uppercase.text', uppercase, resume)
  console.log('All done!')
})

/*

On first call run function gets passed a generator, that generator also accpets a callback function
fs.readFile passes an (err, item) on to the callback(resume) function, which here we are taking on to 
data variable in run function, then checking if generator functions yields anything again(yielded = !!iterator.next())
then we call check method, generator yielded anything then inside check method we take the passed item(data[1]) on to a
variable called item, we reset data, reset yielded. If error is thrown by fs.readFile()//first call, then we throw an error
if not we call next with item variable, which becomes contents in generator function's second line, then we yield again
from generator function, then again we save passed data(err, item) inside generator's callback, check yielded again, then
call check again, if data and yielded both are true then we continue as previously done, this process will continue generator 
finish running.

*/






