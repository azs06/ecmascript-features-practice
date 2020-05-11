const fetch = require('node-fetch')
const bluebird = require('bluebird')
function ajax(url, iterator) {
	return fetch(url)
		.then(response => response.json())
		.then(data => data)
}

function* getGithubFollowers(userName) {
	const user = yield ajax(`https://api.github.com/users/${userName}`)
  const { followers_url } = user
	const followers = yield ajax(followers_url)
  return followers;
}

const ajaxRoutine = bluebird.coroutine(getGithubFollowers)

ajaxRoutine('azs06').catch(error => console.log(error)).then((response) => console.log(response))



