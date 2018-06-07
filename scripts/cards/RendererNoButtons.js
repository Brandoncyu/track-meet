function cardRendererNoButtons({firstName, lastName, where, when, what}, index){
  let display = document.getElementById('card-display')
  let space = document.createElement('br')
  let cardDiv = document.createElement('div')
  cardDiv.setAttribute('class', 'card border-dark  mb-4 mr-4')

  let headerDiv = document.createElement('h3')
  headerDiv.setAttribute('class', 'card-header')

  let bodyDiv = document.createElement('div')
  bodyDiv.setAttribute('class', 'card-body')

  if (firstName !== '' || lastName !== ''){
    let nameText = document.createTextNode(`${firstName}` + ` ${lastName}`)
    headerDiv.appendChild(nameText)
    cardDiv.appendChild(headerDiv)
    cardDiv.appendChild(space)
  }
  if (where !== ''){
    let location = document.createElement('h4')
    let locationText = document.createTextNode(`Location met: ${where}`)
    location.appendChild(locationText)
    bodyDiv.appendChild(location)
    bodyDiv.appendChild(space)
  }
  if (when !== "0000-00-00"){
    let newDate = when.split('-')
    let dateContainer = document.createElement('h5')
    let [year, month, day] = newDate
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

    dateContainer.appendChild(dateText)
    bodyDiv.appendChild(dateContainer)
    bodyDiv.appendChild(space)
  }
  if (what.length > 0){
    let attributeList = document.createElement('ul')
    attributeList.setAttribute('class', 'list-group list-group-flush')
    for (i = 0; i < what.length; i++){
      let listItem = document.createElement('li')
      listItem.setAttribute('class', 'list-group-item')
      let listText = document.createTextNode(what[i])
      listItem.appendChild(listText)
      attributeList.appendChild(listItem)
    }
    bodyDiv.appendChild(attributeList)
  }


  cardDiv.appendChild(bodyDiv)


  display.appendChild(space)

  display.appendChild(cardDiv)
}

module.exports = cardRendererNoButtons
