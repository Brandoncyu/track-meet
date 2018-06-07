//this takes all the information in an object and creates a brand new "card" div and appends it to the "card-display"

function cardRenderer({firstName, lastName, where, when, what}, index){
  let display = document.getElementById('card-display')
  let space = document.createElement('br')
  let cardDiv = document.createElement('div')
  cardDiv.setAttribute('class', 'card border-dark mb-4 mr-2')

  //we will be the card header class to host our names.
  let headerDiv = document.createElement('h3')
  headerDiv.setAttribute('class', 'card-header')

  //we will be using the card-body class to host the 'where', the 'when', and a the 'what'.
  let bodyDiv = document.createElement('div')
  bodyDiv.setAttribute('class', 'card-body ')

  //this takes the first and last name strings, turns them into text nodes, and appends it to the header tag. We then append the header tag card div.
  if (firstName !== '' || lastName !== ''){
    let nameText = document.createTextNode(`${firstName}` + ` ${lastName}`)
    headerDiv.appendChild(nameText)
    cardDiv.appendChild(headerDiv)
    cardDiv.appendChild(space)
  }

  //this takes the where strings, turns it into a text node, and appends it to the body tag.
  if (where !== ''){
    let location = document.createElement('h4')
    let locationText = document.createTextNode(`Location met: ${where}`)
    location.appendChild(locationText)
    bodyDiv.appendChild(location)
    bodyDiv.appendChild(space)
  }
  //this takes the when strings, turns it into a text node, and appends it to the body tag. If someone did not put in one of the day, month, or year, that's ok.
  if (when !== "0000-00-00"){
    //this splits the string into an array, and we make the distinction of where to break the strings with '-'
    let newDate = when.split('-')
    let dateContainer = document.createElement('h5')

    //this displaces the new array to three new variables.
    let [year, month, day] = newDate

    //this takes the number put into the month and outputs a text string.
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
    //this is to differentiate if someone did not put in all three of day, month and year.
    if (month == "00" && day =="00"){
      dateText = document.createTextNode(`Met ${year}`)
    } else if (month == "00" && year =='0000') {
      dateText = document.createTextNode(`Met (month unknown) ${day}`)
    } else if (month == "00") {
      dateText = document.createTextNode(`Met (month unknown) ${day},  ${year}`)
    } else if (day == "00"){
      dateText = document.createTextNode(`Met ${month} ${year}`)
    } else if (year == "0000"){
      dateText = document.createTextNode(`Met ${month} ${day}`)
    } else {
      dateText = document.createTextNode(`Met ${month} ${day}, ${year}`)
    }
    //this adds the text node generated in the big if statement above into the body div
    dateContainer.appendChild(dateText)
    bodyDiv.appendChild(dateContainer)
    bodyDiv.appendChild(space)
  }
  //this takes the what strings, turns each of them into text nodes, and appends it to a new list that we create. We append the list into a string.
  if (what.length > 0){
    let attributeList = document.createElement('ul')
    //we do list-group because it displays uniquely in Bootstrap.
    attributeList.setAttribute('class', 'list-group list-group-flush')

    //this takes all the items in the what array and appends them into the attribute list
    for (i = 0; i < what.length; i++){
      let listItem = document.createElement('li')
      listItem.setAttribute('class', 'list-group-item')
      let listText = document.createTextNode(what[i])
      listItem.appendChild(listText)
      attributeList.appendChild(listItem)
    }

    //this appends the attribute list into the body tag.
    bodyDiv.appendChild(attributeList)
  }
  //this appends the body div to the card div.
  cardDiv.appendChild(bodyDiv)
  //this is a new button div that we add to the bottom
  let buttonDiv = document.createElement('div')
  buttonDiv.setAttribute('class', 'card-footer buttons d-flex justify-content-between')

  //this adds an update button and gives it attributes that will be manipulated by CSS, Flexbox and Bootstrap.
  let updateButton = document.createElement('button')
  updateButton.setAttribute('id', 'update')
  updateButton.setAttribute('class', 'btn btn-link btn-lg')
  updateButton.setAttribute('data-id', index)
  updateText = document.createTextNode('Update')
  updateButton.appendChild(updateText)
  buttonDiv.appendChild(updateButton)

  //this adds a delete button and gives it attributes that will be manipulated by CSS, Flexbox and Bootstrap.
  let deleteButton = document.createElement('button')
  deleteButton.setAttribute('id', 'delete')
  deleteButton.setAttribute('data-id', index)
  deleteButton.setAttribute('class', 'btn btn-link btn-lg')
  deleteText = document.createTextNode('Delete')
  deleteButton.appendChild(deleteText)
  buttonDiv.appendChild(deleteButton)

  //this adds the button div to the card div.
  cardDiv.appendChild(buttonDiv)

  //this adds the card div to the card-display div, and renders it on the page.
  display.appendChild(cardDiv)
  //this adds a space.
  display.appendChild(space)
}

module.exports = cardRenderer
