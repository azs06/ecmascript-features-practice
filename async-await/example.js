const fetch = require('node-fetch')
function ajax(url, iterator) {
	return fetch(url)
		.then(response => response.json())
		.then(data => data)
}

async function getGithubFollowers(userName) {
  const user = await ajax(`https://api.github.com/users/${userName}`)
  const { followers_url } = user
  const followers = await ajax(followers_url)
  return followers;
}


getGithubFollowers('azs06').then(response => console.log(response))


