const cardRenderer = require('./cards/Renderer')

let importedData = JSON.parse(localStorage.getItem('cards'))
if (importedData == null) importedData = []

importedData.forEach((element, index) => cardRenderer(element, index))

const adding = document.getElementById('add')

adding.addEventListener('click', (event)=>{
  event.preventDefault()
  let newInputArea = document.querySelector('#newInputArea')
  let newInput = document.createElement('input')
  newInput.setAttribute('placeholder', "Something interesting about this person")
  let space = document.createElement('br')
  newInputArea.appendChild(space)
  newInputArea.appendChild(newInput)

})

const create = document.getElementById('create')

create.addEventListener('submit', (event)=>{
  event.preventDefault()

  const firstName = document.querySelector('#firstname').value
  const lastName = document.querySelector('#lastname').value
  const where = document.querySelector('#where').value
  const when = document.querySelector('#year').value + '-' + document.querySelector('#month').value + '-' + document.querySelector('#day').value
  let what = []
  const whatQueries = document.querySelectorAll('#big-what input')
  for (i = 0; i < whatQueries.length; i++){
    if (whatQueries[i].value){
      what.push(whatQueries[i].value)
    }
  }

  let exportedValues = {
    'firstName': firstName,
    'lastName': lastName,
    'where': where,
    'when': when,
    'what': what
  }
  document.getElementById('card-display').innerHTML = ''
  importedData.push(exportedValues)

  importedData.forEach((element, index) => cardRenderer(element, index))
  localStorage.setItem('cards', JSON.stringify(importedData))

  let deleteButtons = document.querySelectorAll('#delete')
  deleteButtons.forEach(element => element.addEventListener('click', remove))

  let updateButtons = document.querySelectorAll('#update')
  updateButtons.forEach(element => element.addEventListener('click', update))

  document.getElementById('create').reset();
  if (document.querySelector('#newInputArea').innerHTML){
    document.querySelector('#newInputArea').innerHTML = ''

  }
})

let remove = function(event){
  let dataId = event.target.getAttribute('data-id')
  importedData.splice(dataId, 1)

  document.getElementById('card-display').innerHTML = ''
  importedData.forEach((element, index) => cardRenderer(element, index))

  localStorage.setItem('cards', JSON.stringify(importedData))

  let deleteButtons = document.querySelectorAll('#delete')
  deleteButtons.forEach(element => element.addEventListener('click', remove))

  let updateButtons = document.querySelectorAll('#update')
  updateButtons.forEach(element => element.addEventListener('click', update))
}

let deleteButtons = document.querySelectorAll('#delete')
deleteButtons.forEach(element => element.addEventListener('click', remove))

const update = function(event){
  let index = event.target.getAttribute('data-id')
  let object = importedData[index]

  let firstName = object.firstName;
  let lastName = object.lastName;
  let where = object.where;
  let [year, month, day] = object.when.split('-');
  let what = object.what;

  document.querySelector('#createTitle').innerHTML ='Edit Your Card'

  document.querySelector('#firstname').value = firstName
  document.querySelector('#lastname').value = lastName
  document.querySelector('#where').value = where
  document.querySelector('#month').value = month
  document.querySelector('#day').value = day
  document.querySelector('#year').value = year

  for (let i = 0; i < what.length; i++){
    let boxId = 'what' + i
    if (i > 2){
      let newInputArea = document.querySelector('#newInputArea')
      let newInput = document.createElement('input')
      newInput.setAttribute('placeholder', "Something interesting about this person")
      newInput.setAttribute('id', boxId)
      newInput.setAttribute('class', 'removal')
      let space = document.createElement('br')
      newInputArea.appendChild(space)
      newInputArea.appendChild(newInput)
    }
    let whatBox = document.getElementById(boxId)
    whatBox.value = what[i]
  }

  let makeButton = document.getElementById('make')
  let createForm = document.querySelector('#create')
  createForm.removeChild(makeButton)
  formUpdate = document.createElement('button')
  formUpdateText = document.createTextNode('Update Your Card!')
  formUpdate.appendChild(formUpdateText)

  createForm.appendChild(formUpdate)

  formUpdate.addEventListener('click', (event)=>{
    event.preventDefault()

    object.firstName = document.getElementById('firstname').value
    object.lastName = document.querySelector('#lastname').value
    object.where = document.querySelector('#where').value
    month = document.querySelector('#month').value
    day = document.querySelector('#day').value
    year = document.querySelector('#year').value
    object.when = `${year}-${month}-${day}`
    newWhat = []
    const whatQueries = document.querySelectorAll('#big-what input')
    for (i = 0; i < whatQueries.length; i++){
      if (whatQueries[i].value){
        newWhat.push(whatQueries[i].value)
      }
    }
    object.what = newWhat

    document.getElementById('card-display').innerHTML = ''

    localStorage.setItem('cards', JSON.stringify(importedData))
    importedData.forEach((element, index) => cardRenderer(element, index))



    document.getElementById('create').reset();

    if (document.querySelector('#newInputArea').innerHTML){

      document.querySelector('#newInputArea').innerHTML = ''

    }
    document.querySelector('#createTitle').innerHTML = "Create Card!"


    createForm.removeChild(formUpdate)
    newCreateButton = document.createElement('button')
    newCreateButtonText = document.createTextNode('Create!')
    newCreateButton.appendChild(newCreateButtonText)
    newCreateButton.setAttribute('type', 'submit')
    newCreateButton.setAttribute('id', 'make')

    createForm.appendChild(newCreateButton)

    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
  })
}

let updateButtons = document.querySelectorAll('#update')
updateButtons.forEach(element => element.addEventListener('click', update))



const sortFirst = document.querySelector('#firstSort')


let firstNameOrder
const firstNameSorter = function (event){
  event.preventDefault()

  let sortedData = JSON.parse(localStorage.getItem('cards'))
  if (firstNameOrder !== 'opposite'){
    sortedData.sort(function (a,b){
      var nameA = a.firstName.toUpperCase();
      var nameB = b.firstName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    console.log(sortedData)
    document.getElementById('card-display').innerHTML = ''
    sortedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    firstNameOrder = 'opposite'
  } else {
    sortedData.sort(function (b, a){
      var nameA = a.firstName.toUpperCase();
      var nameB = b.firstName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    console.log(sortedData)
    document.getElementById('card-display').innerHTML = ''
    sortedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    firstNameOrder = ''
    }

}

sortFirst.addEventListener('click', firstNameSorter)

const sortLast = document.querySelector('#lastSort')


let lastNameOrder
const lastNameSorter = function (event){
  event.preventDefault()

  let sortedData = JSON.parse(localStorage.getItem('cards'))
  if (lastNameOrder !== 'opposite'){
    sortedData.sort(function (a,b){
      var nameA = a.lastName.toUpperCase();
      var nameB = b.lastName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    console.log(sortedData)
    document.getElementById('card-display').innerHTML = ''
    sortedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    lastNameOrder = 'opposite'
  } else {
    sortedData.sort(function (b, a){
      var nameA = a.lastName.toUpperCase();
      var nameB = b.lastName.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    })
    console.log(sortedData)
    document.getElementById('card-display').innerHTML = ''
    sortedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    lastNameOrder = ''
    }

}

sortLast.addEventListener('click', lastNameSorter)

const sortDate = document.querySelector('#dayMeet')


let dateOrder
const dateSorter = function (event){
  event.preventDefault()

  let sortedData = JSON.parse(localStorage.getItem('cards'))
  if (dateOrder !== 'opposite'){
    importedData.sort(function (a, b) {
      if (a.when > b.when) return 1;
      if (a.when < b.when) return -1;
      return 0;
    })
    console.log(importedData)
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    dateOrder = 'opposite'
  } else {
    importedData.sort(function (b, a) {
      if (a.when > b.when) return 1;
      if (a.when < b.when) return -1;
      return 0;
    })
    console.log(importedData)
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    dateOrder = ''
    }

}

sortDate.addEventListener('click', dateSorter)
