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
