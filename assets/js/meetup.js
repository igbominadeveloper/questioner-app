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
        let template = this.createMeetupMarkup(meetup, index);
        wrapper.innerHTML = template;
        meetupWrapper.appendChild(wrapper);
    });
    })
    .catch(error => console.log(error))
  }

  static createMeetupMarkup(data, index) {
    return `
        <a href="meetup.html">
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