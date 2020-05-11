const fetch = require('node-fetch')

function ajax(url, iterator) {
	return fetch(url)
		.then(response => response.json())
		.then(data => data)
}

function* getGithubFollowers() {
	const user = yield ajax('https://api.github.com/users/azs06')
  const { followers_url } = user
	const followers = yield ajax(followers_url)
  return followers;
}


const dataGen = getGithubFollowers()

const result = dataGen.next().value.then((response)=>{
  const followersPromise = dataGen.next(response);
  return followersPromise.value.then((response)=>{
    console.log(response)
  })
})
