const cardRenderer = require('./cards/Renderer')
cardRendererNoButtons = require('./cards/RendererNoButtons')

//this gets all the data stored in local storage, saved as "cards", parses it to an array, sets it to the variable importedData. If there is nothing in storage, it sets the variable to an empty array.
let importedData = JSON.parse(localStorage.getItem('cards'))
if (importedData == null) importedData = []

//this goes through the array and renders a card, based on the required formula.
importedData.forEach((element, index) => cardRenderer(element, index))

//this is for the create form. It takes the "add attribute" button and adds a new box to the form so you can create add more than three things about the person you are making a card for.
const adding = document.getElementById('add')

adding.addEventListener('click', (event)=>{
  event.preventDefault()
  let newInputArea = document.querySelector('#newInputArea')
  let newInput = document.createElement('input')
  newInput.setAttribute('placeholder', "Something interesting about this person");
  newInput.setAttribute("class", "form-control")
  newInputArea.appendChild(newInput)

})

//this takes all the values you filled in the create form, sets them to variables, and puts in local storage.
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
  //this removes all the cards so you can re-render the new ones.
  document.getElementById('card-display').innerHTML = ''
  importedData.push(exportedValues)

  //This re-renders all the cards (plus the new one).
  importedData.forEach((element, index) => cardRenderer(element, index))
  localStorage.setItem('cards', JSON.stringify(importedData))

  //this is to make sure that every time you add a card, it takes you straight to it on the anchor tag on the page, which is where the new card renders.
  var bottom = document.getElementById("bottom");
  bottom.scrollIntoView();

  //This re-adds event listeners to the update and delete buttons.
  let deleteButtons = document.querySelectorAll('#delete')
  deleteButtons.forEach(element => element.addEventListener('click', remove))

  let updateButtons = document.querySelectorAll('#update')
  updateButtons.forEach(element => element.addEventListener('click', update))

  //this reset the create form and also brings the number of attribute boxes back to 3.
  document.getElementById('create').reset();
  if (document.querySelector('#newInputArea').innerHTML){
    document.querySelector('#newInputArea').innerHTML = ''

  }
})

//this is the function to remove the card's information from local storage
let remove = function(event){
  let dataId = event.target.getAttribute('data-id')
  importedData.splice(dataId, 1)
  //this removes all the cards so you can re-render the new ones.
  document.getElementById('card-display').innerHTML = ''
  importedData.forEach((element, index) => cardRenderer(element, index))

  localStorage.setItem('cards', JSON.stringify(importedData))

  //This re-adds event listeners to the update and delete buttons.
  let deleteButtons = document.querySelectorAll('#delete')
  deleteButtons.forEach(element => element.addEventListener('click', remove))

  let updateButtons = document.querySelectorAll('#update')
  updateButtons.forEach(element => element.addEventListener('click', update))
}

//this adds the remove function to the delete buttons as an event listener
let deleteButtons = document.querySelectorAll('#delete')
deleteButtons.forEach(element => element.addEventListener('click', remove))

//this is the function to update the card's information from local storage
const update = function(event){
  let index = event.target.getAttribute('data-id')
  let object = importedData[index]

  //this reset the create form and also brings the number of attribute boxes back to 3.
  document.getElementById('create').reset();
  document.querySelector('#newInputArea').innerHTML = ''

  //this opens the search box from the menu on the right if it is not open yet.
  let editingField = document.querySelector('#editor')
  editingField.setAttribute('style', 'display: block')

  //this puts all the values in the card to variables
  let firstName = object.firstName;
  let lastName = object.lastName;
  let where = object.where;
  let [year, month, day] = object.when.split('-');
  let what = object.what;

  //all of the things that say "create you card" now say "edit your card"
  Array.from(document.querySelectorAll('#createTitle')).forEach(element => element.innerHTML ='Edit Your Card')

  //this puts all the variables from th card into the form.
  document.querySelector('#firstname').value = firstName
  document.querySelector('#lastname').value = lastName
  document.querySelector('#where').value = where
  document.querySelector('#month').value = month
  document.querySelector('#day').value = day
  document.querySelector('#year').value = year

  //if there are more than three attributes, this adds new boxes to the form and adds them in.
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

  //this removes the "create" button and adds in a new one "update." They seem be identical but they have different event listeners.
  let makeButton = document.getElementById('make')
  let createForm = document.querySelector('#create')
  createForm.removeChild(makeButton)
  formUpdate = document.createElement('button')
  formUpdate.setAttribute('class', 'btn btn-primary btn-lg btn-block')
  formUpdateText = document.createTextNode('Update Your Card')
  formUpdate.appendChild(formUpdateText)

  createForm.appendChild(formUpdate)

  //this adds the event listener to the update button. It does the same as the create button and re-renders the cards with the updated information. However, it also takes out the new reset button and puts back in a create button.
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
    //this removes all the cards so you can re-render the new ones.
    document.getElementById('card-display').innerHTML = ''

    localStorage.setItem('cards', JSON.stringify(importedData))
    importedData.forEach((element, index) => cardRenderer(element, index))

    editingField.setAttribute('style', 'display: none')

    //this reset the create form and also brings the number of attribute boxes back to 3.
    document.getElementById('create').reset();

    if (document.querySelector('#newInputArea').innerHTML){

      document.querySelector('#newInputArea').innerHTML = ''

    }
    //this changes the "edit your card" back to "create card"
    document.querySelector('#createTitle').innerHTML = "Create Card"

    //this removes the update button and puts back in a create button
    createForm.removeChild(formUpdate)
    newCreateButton = document.createElement('button')
    newCreateButtonText = document.createTextNode('Create!')
    newCreateButton.appendChild(newCreateButtonText)
    newCreateButton.setAttribute('type', 'submit')
    newCreateButton.setAttribute('id', 'make')
    newCreateButton.setAttribute('class', 'btn btn-primary btn-lg btn-block')

    createForm.appendChild(newCreateButton)

    //This re-adds event listeners to the update and delete buttons.
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))

    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
  })
}

let updateButtons = document.querySelectorAll('#update')
updateButtons.forEach(element => element.addEventListener('click', update))


//this allows you to sort through all you cards based on first name. It has a seperate variable that you can change to determine what order you want to sort.
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

    //this removes all the cards so you can re-render the new ones.
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))

    //This re-adds event listeners to the update and delete buttons.
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))

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
    //this removes all the cards so you can re-render the new ones.
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))

    //This re-adds event listeners to the update and delete buttons.
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))

    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    firstNameOrder = ''
    }

}

sortFirst.addEventListener('click', firstNameSorter)



const sortLast = document.querySelector('#lastSort')

//this allows you to sort through all you cards based on last name. It has a seperate variable that you can change to determine what order you want to sort.
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
    //this removes all the cards so you can re-render the new ones.
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))

    //This re-adds event listeners to the update and delete buttons.
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))

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
    //this removes all the cards so you can re-render the new ones.
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))

    //This re-adds event listeners to the update and delete buttons.
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))

    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    lastNameOrder = ''
    }

}

sortLast.addEventListener('click', lastNameSorter)

const sortDate = document.querySelector('#dayMeet')

//this allows you to sort through all you cards based on date. It has a seperate variable that you can change to determine what order you want to sort.
let dateOrder
const dateSorter = function (event){
  event.preventDefault()

  if (dateOrder !== 'opposite'){
    importedData.sort(function (a, b) {
      if (a.when > b.when) return 1;
      if (a.when < b.when) return -1;
      return 0;
    })
    //this removes all the cards so you can re-render the new ones.
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))

    //This re-adds event listeners to the update and delete buttons.
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))

    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    dateOrder = 'opposite'
  } else {
    importedData.sort(function (b, a) {
      if (a.when > b.when) return 1;
      if (a.when < b.when) return -1;
      return 0;
    })
    //this removes all the cards so you can re-render the new ones.
    document.getElementById('card-display').innerHTML = ''
    importedData.forEach((element, index) => cardRenderer(element, index))

    //This re-adds event listeners to the update and delete buttons.
    let updateButtons = document.querySelectorAll('#update')
    updateButtons.forEach(element => element.addEventListener('click', update))

    let deleteButtons = document.querySelectorAll('#delete')
    deleteButtons.forEach(element => element.addEventListener('click', remove))
    dateOrder = ''
    }

}

sortDate.addEventListener('click', dateSorter)

document.getElementById('search')

//this is the function we are adding to the search button to see if the value put in the search box matches any of the values in local storage
const searcher = function(event){
  event.preventDefault()
  let myInput = document.getElementById('myInput').value
  myInput = myInput.toLowerCase()

  //unlike the others, we are setting a new array to add only the values that match what is put in the search box.
  let newInfo = []
  let queriedData = JSON.parse(localStorage.getItem('cards'))
  for (let i = 0; i < queriedData.length; i++){
    let objectItem = queriedData[i]
    let count = 0
    //every time the searched word appears in the local storage, we add a count.
    for (val1 in objectItem){
      let objectPair = objectItem[val1]
      if (typeof(objectPair) === 'string'){
        if (objectPair.toLowerCase().includes(myInput)) count++
      }
      //since the "what" variable is an object within an object, we must do the same for the values in the object
      else {
        for (val2 in objectPair){
          let objectItem2 = objectPair[val2]
          if (objectItem2.toLowerCase().includes(myInput)) count++
        }
      }
    }
    //if the word appears more than once, we add all of the data into the array.
    if (count > 0) newInfo.push(queriedData[i])
  }
  //this removes all the cards so you can re-render the new ones.
  document.getElementById('card-display').innerHTML = ''

  //this re-renders the cards, but without buttons.
  newInfo.forEach((element, index) => cardRendererNoButtons(element, index))
}

search.addEventListener('submit', searcher)

const reset = document.getElementById('reset')

const resetter = function(event){
  event.preventDefault()
  //this removes all the cards so you can re-render the new ones.
  document.getElementById('card-display').innerHTML = ''
  document.getElementById('myInput').value = '';
  let importedData = JSON.parse(localStorage.getItem('cards'))
  importedData.forEach((element, index) => cardRenderer(element, index))
}

reset.addEventListener('click', resetter)

//this puts all of the forms in one collapsible "accordion" and allows you to open and close them with a click.
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
