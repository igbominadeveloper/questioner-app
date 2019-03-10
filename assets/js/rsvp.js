/**
 * class rsvp
 * 
 * ----------------------------
 * This class is resposible for
 * handling rsvp requests
 * ----------------------------
 */
var apiDomain = 'http://localhost:3000/api/v1';
class Rsvp {

 /**
  * submit user rsvp status
  * 
  * @param {Event} event 
  * @param {HTMLFormElement} form 
  * @param {Number} meetup_id
  * @return {HTMLAllCollection} rsvp 
  */

   static create(event, status, meetup_id) {
     event.preventDefault();
     let token;
     if (Authentication.isLoggedIn()) {
       token = Authentication.getState().token;
     }
     else {
       Authentication.redirect('/login.html');
     }
    const options = {
      method: 'POST',
      body: JSON.stringify({ status }),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "x-access-token": token
      }
    }
    fetch(`${apiDomain}/meetups/${meetup_id}/rsvps`, options)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          return Meetup.errorTemplate(response.error);
        }
        console.log(response);
      })
      .catch(error => console.log(error))
   }
}