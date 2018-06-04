(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function cardRenderer({firstName, lastName, where, when, what}){
  let display = document.getElementById('card-display')
  let space = document.createElement('br')
  let newDiv = document.createElement('div')
  if (firstName !== '' || lastName !== ''){
    let newHeader = document.createElement('h3')
    let nameText = document.createTextNode(`${firstName}` + ` ${lastName}`)
    newHeader.appendChild(nameText)
    newDiv.appendChild(newHeader)
    newDiv.appendChild(space)
  }
  if (where !== ''){
    let location = document.createElement('h4')
    let locationText = document.createTextNode(`Met at ${where}`)
    location.appendChild(locationText)
    newDiv.appendChild(location)
    newDiv.appendChild(space)
  }
  if (when !== "00-00-0000"){
    let newDate = when.split('-')
    let dateContainer = document.createElement('h5')
    let [month, day, year] = newDate
    if (month == "01") month = "January"
    if (month == "02") month = "February"
    if (month == "03") month = "March"
    if (month == "04") month = "April"
    if (month == "05") month = "May"
    if (month == "06") month = "June"
    if (month == "07") month = "July"
    if (month == "08") month = "August"
    if (month == "09") month = "September"
    if (month == "10") month = "October"
    if (month == "11") month = "November"
    if (month == "12") month = "December"
    if (month == "00" && day =="00"){
      dateText = document.createTextNode(`Met in ${year}`)
    } else if (month == "00" && year =='0000') {
      dateText = document.createTextNode(`Met on (month unknown) ${day}`)
    } else if (month == "00") {
      dateText = document.createTextNode(`Met on (month unknown) ${day},  ${year}`)
    } else if (day == "00"){
      dateText = document.createTextNode(`Met in ${month} ${year}`)
    } else if (year == "0000"){
      dateText = document.createTextNode(`Met on ${month} ${day}`)
    } else {
      dateText = document.createTextNode(`Met on ${month} ${day}, ${year}`)
    }

    dateContainer.appendChild(dateText)
    newDiv.appendChild(dateContainer)
    newDiv.appendChild(space)
  }
  if (what.length > 0){
    let attributeList = document.createElement('ul')
    for (i = 0; i < what.length; i++){
      let listItem = document.createElement('li')
      let listText = document.createTextNode(what[i])
      listItem.appendChild(listText)
      attributeList.appendChild(listItem)
    }
    newDiv.appendChild(attributeList)
  }
  display.appendChild(newDiv)
}

module.exports = cardRenderer

},{}],2:[function(require,module,exports){
const cardRenderer = require('./cards/Renderer')

let importedData = JSON.parse(localStorage.getItem('cards'))
if (importedData == null) importedData = []

importedData.forEach(element => cardRenderer(element))

const adding = document.getElementById('add')

adding.addEventListener('click', (event)=>{
  event.preventDefault()
  let bigWhat = document.querySelector('#big-what')
  let newInput = document.createElement('input')
  newInput.setAttribute('placeholder', "Something interesting about this person")
  let space = document.createElement('br')
  bigWhat.appendChild(space)
  bigWhat.appendChild(newInput)

})

const create = document.getElementById('create')

create.addEventListener('submit', (event)=>{
  event.preventDefault()

  const firstName = document.querySelector('#firstname').value
  const lastName = document.querySelector('#lastname').value
  const where = document.querySelector('#where').value
  const when = document.querySelector('#month').value + '-' + document.querySelector('#day').value + '-' + document.querySelector('#year').value
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
  let importedData = JSON.parse(localStorage.getItem('cards'))
  if (importedData == null) importedData = []
  importedData.push(exportedValues)

  importedData.forEach(element => cardRenderer(element))
  localStorage.setItem('cards', JSON.stringify(importedData))

  document.getElementById('create').reset();
})

},{"./cards/Renderer":1}]},{},[2]);
