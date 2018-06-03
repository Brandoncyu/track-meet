const create = document.querySelector('#create')

create.addEventListener('submit', (event) => {
  event.preventDefault()

  const firstName = document.querySelector('#firstname').value
  const lastName = document.querySelector('#lastname').value
  const where = document.querySelector('#where').value
  const when = document.querySelector('#when').value
  const what1 = document.querySelector('#what1').value
  const what2 = document.querySelector('#what2').value
  const what3 = document.querySelector('#what3').value

  console.log(firstName)
})
