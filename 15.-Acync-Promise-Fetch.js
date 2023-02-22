const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const usersContainer = document.querySelector('#data-container')

const createUserElement = (text) => {
  const userElement = document.createElement('li')
  const userAnchorElement = document.createElement('a')
  userAnchorElement.href = '#'
  userAnchorElement.innerText = text
  userElement.append(userAnchorElement)

  return userElement
}

const toggleLoader = () => {
  const loaderHTML = document.querySelector('#loader')
  const isHidden = loaderHTML.getAttribute('hidden') !== null
  if (isHidden) {
    loaderHTML.removeAttribute('hidden')
  } else {
    loaderHTML.setAttribute('hidden', '')
  }
}

const getUsersByIds = (userIds) => {
  toggleLoader()
  Promise.all(userIds.map((id) => fetch(`${USERS_URL}/${id}`)))
    .then((responses) => {
      return Promise.all(
        responses
          .filter((response) => response.ok)
          .map((response) => response.json())
      )
    })
    .then((users) => {
      console.log('users', users)
      const usersArray = Array.isArray(users) ? users : Object.values(users)
      usersArray.forEach((user) => {
        usersContainer.append(todoHTMLElement)
      })
    })
    .catch((error) => {
      console.error('error', error)
    })
    .finally(() => {
      toggleLoader()
    })
}

getUsersByIds([5, 6, 2, 1])
