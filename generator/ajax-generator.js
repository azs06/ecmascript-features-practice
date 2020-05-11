const fetch = require('node-fetch')

function ajax(url, callback, erroCallback) {
	return fetch(url)
		.then(response => response.json())
		.then(data => callback(data))
		.catch(err => erroCallback(err))
}

function* steps(userName, callback, erroCallback) {
	const soikat = yield ajax(`https://api.github.com/users/${userName}`, callback, erroCallback)
  const { followers_url } = soikat
	const followers = yield ajax(followers_url, callback, erroCallback)
	return followers;
}

function run(generator) {
  let data = null, yielded = false, error = null
  const iterator = generator('azs06',function (response) {
    data = response
    result.push(data)
    check()
  }, function (error){
  	error = error
  })
  yielded = !!(iterator.next())
  check()
  function check () {
    while (data && yielded) {
      const generatorData = JSON.parse(JSON.stringify(data))
      yielded = false
      data = null
      if (error) return iterator.throw(err)
      yielded = !!(iterator.next(generatorData))
    }
  }	
}

run(steps)

