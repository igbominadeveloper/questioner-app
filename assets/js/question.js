/**
 * Class Question
 * 
 * -------------------------------
 * This class is responsible for 
 * all question related actions
 */
var rootDomain = 'http://127.0.0.1:3000/api/v1'; 
const questionApi = 'questions';

class Question {

  static create(event, form, meetup_id) {
    event.preventDefault();
    let token;
    if (Authentication.isLoggedIn()) {
      token = Authentication.getState().token;
    }
    else {
      Authentication.redirect('/login.html');
    }
    const title = form['title'].value;
    const body = form['body'].value;
    const payload = { title, body, meetup_id };
    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "x-access-token": token
      }
    };
  fetch(`${apiDomain}/${questionApi}`, options)
      .then(response => response.json())
      .then(response => {
        if(response.error){
          return Meetup.errorTemplate(response.error);
        }
        console.log(response);
      })
      .catch(error => console.log(error))
  }
}