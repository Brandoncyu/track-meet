const cardRenderer = require('./cards/Renderer')
cardRendererNoButtons = require('./cards/RendererNoButtons')

let importedData = JSON.parse(localStorage.getItem('cards'))
if (importedData == null) importedData = []

importedData.forEach((element, index) => cardRenderer(element, index))

const adding = document.getElementById('add')

adding.addEventListener('click', (event)=>{
  event.preventDefault()
  let newInputArea = document.querySelector('#newInputArea')
  let newInput = document.createElement('input')
  newInput.setAttribute('placeholder', "Something interesting about this person");
  newInput.setAttribute("class", "form-control")
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

  var bottom = document.getElementById("bottom");
  bottom.scrollIntoView();

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

  document.getElementById('create').reset();
  document.querySelector('#newInputArea').innerHTML = ''

  let editingField = document.querySelector('#editor')
  editingField.setAttribute('style', 'display: block')

  let firstName = object.firstName;
  let lastName = object.lastName;
  let where = object.where;
  let [year, month, day] = object.when.split('-');
  let what = object.what;

  Array.from(document.querySelectorAll('#createTitle')).forEach(element => element.innerHTML ='Edit Your Card')

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
      newInput.setAttribute('class', 'removal form-control')
      newInputArea.appendChild(newInput)
    }
    let whatBox = document.getElementById(boxId)
    whatBox.value = what[i]
  }

  let makeButton = document.getElementById('make')
  let createForm = document.querySelector('#create')
  createForm.removeChild(makeButton)
  formUpdate = document.createElement('button')
  formUpdate.setAttribute('class', 'btn btn-primary btn-lg btn-block')
  formUpdateText = document.createTextNode('Update Your Card')
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

    editingField.setAttribute('style', 'display: none')

    document.getElementById('create').reset();

    if (document.querySelector('#newInputArea').innerHTML){

      document.querySelector('#newInputArea').innerHTML = ''

    }
    document.querySelector('#createTitle').innerHTML = "Create Card"


    createForm.removeChild(formUpdate)
    newCreateButton = document.createElement('button')
    newCreateButtonText = document.createTextNode('Create!')
    newCreateButton.appendChild(newCreateButtonText)
    newCreateButton.setAttribute('type', 'submit')
    newCreateButton.setAttribute('id', 'make')
    newCreateButton.setAttribute('class', 'btn btn-primary btn-lg btn-block')

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
    importedData.sort(function (a,b){
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
    importedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    firstNameOrder = 'opposite'
  } else {
    importedData.sort(function (b, a){
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
    importedData.forEach((element, index) => cardRenderer(element, index))
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
    importedData.sort(function (a,b){
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
    importedData.forEach((element, index) => cardRenderer(element, index))
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))
//
    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    lastNameOrder = 'opposite'
  } else {
    importedData.sort(function (b, a){
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
    importedData.forEach((element, index) => cardRenderer(element, index))
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

document.getElementById('search')

const searcher = function(event){
  event.preventDefault()
  let myInput = document.getElementById('myInput').value
  myInput = myInput.toLowerCase()
  console.log(myInput)
  let newInfo = []
  let queriedData = JSON.parse(localStorage.getItem('cards'))
  for (let i = 0; i < queriedData.length; i++){
    let objectItem = queriedData[i]
    let count = 0
    for (val1 in objectItem){
      let objectPair = objectItem[val1]
      if (typeof(objectPair) === 'string'){
        if (objectPair.toLowerCase().includes(myInput)) count++
      }
      else {
        for (val2 in objectPair){
          let objectItem2 = objectPair[val2]
          if (objectItem2.toLowerCase().includes(myInput)) count++
        }
      }
    }
    if (count > 0) newInfo.push(queriedData[i])
  }

  document.getElementById('card-display').innerHTML = ''

  newInfo.forEach((element, index) => cardRendererNoButtons(element, index))
}

search.addEventListener('submit', searcher)

const reset = document.getElementById('reset')

const resetter = function(event){
  event.preventDefault()
  document.getElementById('card-display').innerHTML = ''
  document.getElementById('myInput').value = '';
  let importedData = JSON.parse(localStorage.getItem('cards'))
  importedData.forEach((element, index) => cardRenderer(element, index))
}

reset.addEventListener('click', resetter)

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

var coll = document.getElementsByClassName("collapsible");
var j;

for (j = 0; j < coll.length; j++) {
    coll[j].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}
