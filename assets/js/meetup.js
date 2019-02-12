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

const apiDomain = 'http://localhost:3000/api/v1';
const alertWrapper = document.querySelector('.alert-wrapper');
const meetupWrapper = document.querySelector('.meetup-wrapper');
let response;

class Meetup {
  /**
   * request GET api/v1/meetups
   * 
   * @return {Array} meetups
   */

  static all() {
    fetch(`${apiDomain}/meetups/`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
      },
    })
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        const errorTemplate = `
          <div class="alert card">
            <i class="alert-icon fa fa-warning text-danger p-20"></i>
            <p class="alert-text text-primary">${ response.error }</p>
          </div>
        `;
        alertWrapper.classList.remove('hide');
        alertWrapper.innerHTML = errorTemplate;
        setTimeout(() => {
          alertWrapper.classList.add('hide');
        }, 2000);
        return;
      }
    })
    .catch(error => console.log(error))
  }

}