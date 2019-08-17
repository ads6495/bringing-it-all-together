const mainAsync = async () => {
  getSpaceImg()
  getMissionData()

}

document.addEventListener('DOMContentLoaded', mainAsync)

const createUrl = spaceImg => {
  const API_URL = `https://sdg-astro-api.herokuapp.com/api/Nasa/apod`
  return API_URL
}

const getSpaceImg = async spaceImg => {
  const response = await fetch(createUrl(spaceImg))
  const spaceData = await response.json()
  document.querySelector('.main-image').style.backgroundImage = `url('${spaceData.hdUrl}')`
}


const missions = []
let currMission = 0

const API_URL2 = `https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`

class Missions {
  constructor(name, details, date, site, container, nameBox, detailsBox, dateBox, siteBox) {
    this.name = name
    this.details = details
    this.date = date
    this.site = site
    this.container = container
    this.nameBox = nameBox
    this.detailsBox = detailsBox
    this.dateBox = dateBox
    this.siteBox = siteBox
  }
}


const getMissionData = async () => {
  const response = await fetch(API_URL2)
  const data = await response.json()

  data.forEach(mission => {
    const cardContainer = document.createElement('div')
    const cardTitle = document.createElement('h3')
    const cardDetails = document.createElement('main')
    const cardTimer = document.createElement('section')
    const cardSite = document.createElement('section')

    //mission title
    const missionName = mission.mission_name

    //mission title
    const missionDetails = mission.details

    //mission timer
    const missionDate = mission.launch_date_utc

    //mission launch site
    const missionSite = mission.launch_site.site_name_long

    let miss = new Missions(missionName, missionDetails, missionDate, missionSite, cardContainer, cardDetails, cardSite, cardTimer, cardTitle)
    missions.push(miss)
    // console.log(missions)
  })
  displayMissionData()
}

const displayMissionData = () => {
  console.log(missions[currMission])
  const mainContainer = document.querySelector('#container')

  mainContainer.textContent = ''
  missions[currMission].container.classList.add('main-container')
  // missions[currMission].container.classList.add('launch-card-main')

  // missions[currMission].container.classList.add('launch-card-secondary')

  missions[currMission].detailsBox.textContent = missions[currMission].details
  missions[currMission].detailsBox.classList.add('card-style')

  missions[currMission].dateBox.classList.add('card-style')
  missions[currMission].dateBox.textContent = missions[currMission].date

  missions[currMission].siteBox.textContent = missions[currMission].site
  missions[currMission].siteBox.classList.add('card-styles')

  missions[currMission].nameBox.textContent = missions[currMission].name



  missions[currMission].container.appendChild(missions[currMission].nameBox)

  missions[currMission].container.appendChild(missions[currMission].detailsBox)


  missions[currMission].container.appendChild(missions[currMission].dateBox)

  missions[currMission].container.appendChild(missions[currMission].siteBox)



  mainContainer.appendChild(missions[currMission].container)
}

const nextCard = () => {
  if (currMission == missions.length - 1) {
    currMission = 0
  } else {
    currMission++
  }
  displayMissionData()
}

document.querySelector('#rightButton').addEventListener('click', nextCard)