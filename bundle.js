(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const adding = document.getElementById('add')

adding.addEventListener('click', (event)=>{
  event.preventDefault()
  let bigWhat = document.querySelector('#big-what')
  let newInput = document.createElement('input')
  newInput.setAttribute('placeholder', "Something interesting about this person")
  let space = document.createElement('br')
  bigWhat.appendChild(newInput)
  bigWhat.appendChild(space)
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
  let importedData = JSON.parse(localStorage.getItem('cards'))
  if (importedData == null) importedData = []
  console.log(importedData)
  importedData.push(exportedValues)
  console.log(importedData)
  localStorage.setItem('cards', JSON.stringify(importedData))

  document.getElementById('create').reset();
})

},{}]},{},[1]);
