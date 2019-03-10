/**
 * class Meetup
 * 
 * -----------------------------
 * This class is responsible for 
 * handling all requests to
 * the api for meetups 
 * 
 * -----------------------------
 */
var apiDomain = 'http://localhost:3000/api/v1';
var alertWrapper = document.querySelector('.alert-wrapper');
var meetupWrapper = document.querySelector('.meetup-wrapper');
var singleMeetupWrapper = document.querySelector('.single-meetup');
var response;

class Meetup {
  /**
   * request GET api/v1/meetups
   * 
   * @return {Array} meetups
   */

  static all() {
    let token;
    if (Authentication.isLoggedIn()) {
      token = Authentication.getState().token;
    }
    else {
      Authentication.redirect('/login.html');
    }
    fetch(`${apiDomain}/meetups/`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "x-access-token": token
      },
    })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        return this.errorTemplate(response.error);
      }
      response.data.forEach((meetup, index) => {
        let wrapper = document.createElement('div');
        let template = this.meetupGridItem(meetup, index);
        wrapper.innerHTML = template;
        meetupWrapper.appendChild(wrapper);
    });
    })
    .catch(error => console.log(error))
  }

  /**
   * find a single meetup
   * 
   * @param {String} param 
   */
  static find(param) {
    let id = parseInt(param.replace(/[?=a-z]+/g,''));
    let token;
    if (Authentication.isLoggedIn()) {
      token = Authentication.getState().token;
    }
    else {
      Authentication.redirect('/login.html');
    }
    fetch(`${apiDomain}/meetups/${id}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "x-access-token": token
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 404) {
          Authentication.redirect('/meetups.html');
        }
        let meetupData = response.data[0];
        let template = this.singleMeetup(meetupData);
        singleMeetupWrapper.innerHTML = template;
        })
      .catch(error => console.log(error))
    
  }
  /**
   * send POST request
   * 
   * @param {Object} payload
   * @return {Object} meetup
   */
  static createMeetup(payload) {
    let token;
    if (Authentication.isLoggedIn() && Authentication.getState().token) {
      token = Authentication.getState().token;
    }
    else {
      Authentication.redirect('/login.html');
    }
     
  }

  /**
   * generate markup for meetup grid items
   * 
   * @param {Object} data 
   * @param {Number} index
   * @return {String}  
   */

  static meetupGridItem(data, index) {
    return `
        <a href="/meetup.html?id=${data.id}">
          <div class="meetup shadow pb-2">
            <div class="meetup-image">
              <img src="assets/images/${data.images}" class="img-fluid">
            </div>
            <p class="meetup-title">${data.topic}</p>
            <p class="meetup-date text-light"><i class="fa fa-calendar"></i>${data.date}</p>
            <p class="meetup-location text-light"><i class="fa fa-map-marker"></i>${data.location}</p>
          </div>
        </a>
      `;
  }

  /**
   * generate markup for a single meetup view
   * 
   * @param {Object} data 
   * @param {Number} index
   * @return {String}  
   */
  static singleMeetup(data) {
    return `
      <div class="meetup-header">
        <p class="meetup-title">${data.topic}</p>
          <div class="wrapper">
            <div class="organizer">
              <div class="avatar bg-black"><p>${data.organizer_name.charAt(0)}</p></div>
              <div class="contact-details">
                <p class="text-light">Organised by <span class="text-black">${data.organizer_name}</span></p>
                <p class="text-light"><i class="fa fa-phone"></i><a href="tel:${data.organizer_phone}">${data.organizer_phone}</a></p>
                <p class="text-light"><i class="fa fa-envelope"></i><a href="mailto:${data.organizer_email}">${data.organizer_email}</a></p>
              </div>
            </div>
            <div class="register flex">
                <p class="p-1"><a href="#" onclick="Rsvp.create(event, 'yes', ${data.id})" class="text-heavy p-10 br-20 text-primary">Register</a></p>
                <p class="p-1"><a href="#" onclick="Rsvp.create(event, 'maybe', ${data.id})" class="p-10 br-20 text-warning">Undecided</a></p>
                <p class="p-1"><a href="#" onclick="Rsvp.create(event, 'no', ${data.id})" class="p-10 br-20 text-danger">Not Interested</a></p>
              </form>
            </div>
          </div>
      </div>
      <section class="meetup-body">
        <div class="wrapper">
          <div class="single-meetup-image shadow br-5">
            <img src="assets/images/${data.images}" id="meetup-image" width="100%" height="100%">
          </div>
          <div class="meetup-stats br-5 flex flex-column center">
            <div class="meetup-date mt-2 flex text-light">
              <i class="fa fa-clock-o"></i> 
              <div class="date">
                <p>${new Date(data.date).toDateString()} ${new Date(data.date).toLocaleTimeString()}</p>
              </div> 
            </div>
            <div class="meetup-location mt-2 flex text-light">
              <i class="fa fa-map-marker"></i>
              <p>${data.location}</p>
            </div>
          </div>
        </div>
        <article class="mt-5 meetup-questions m-20">
          <div class="question-title">
            <h3 class="text-heavy">Questions</h3>
          </div>
          <div class="questions-list">
          </div>
        </article>
      </section>
    `;
  }
  
  /**
   * return template for an error response
   * 
   * @param {Object} error 
   */
  static errorTemplate(error) {
    const errorTemplate = `
          <div class="alert card">
            <i class="alert-icon fa fa-warning text-danger p-20"></i>
            <p class="alert-text text-primary">${ error }</p>
          </div>
        `;
    alertWrapper.classList.remove('hide');
    alertWrapper.innerHTML = errorTemplate;
    setTimeout(() => {
      alertWrapper.classList.add('hide');
    }, 2000);
    return;
  }

}