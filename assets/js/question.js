/**
 * Class Question
 * 
 * -------------------------------
 * This class is responsible for 
 * all question related actions
 */
var rootDomain = 'http://127.0.0.1:3000/api/v1'; 

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
  fetch(`${apiDomain}/questions`, options)
    .then(response => response.json())
    .then(response => {
      if(response.error){
        return Meetup.errorTemplate(response.error);
      }
      console.log(response);
    })
    .catch(error => console.log(error))
  }

  static all() {
    let token;
    if (Authentication.isLoggedIn()) {
      token = Authentication.getState().token;
    }
    else {
      Authentication.redirect('/login.html');
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      }
    };
    fetch(`${apiDomain}/questions`, options)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          return Meetup.errorTemplate(response.error);
        }
        console.log(response);
      })
      .catch(error => console.log(error))

    function questionListTemplate(question) {
      return `
        <div class="question flex p-1 flex-column">
          <div class="question-body flex">
            <div class="avatar bg-black">
              <p>ID</p>
            </div>

            <div class="question-details">
              <div class="question-content">
                <div class="upper-details flex space-between">
                  <p class="question-user">My new question - <a href="profile.html" class="text-black">Igbominadeveloper</a></p>
                  <p class="text-light question-time"><i class="fa fa-clock-o"></i>2 months ago</p>
                </div>
                <p class="text-light mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda laborum cumque
                  praesentium impedit obcaecati est eaque consectetur nisi tempore cupiditate?</p>
              </div>

              <div class="question-stats flex space-between mt-1">
                <p class="comment text-light" onclick="toggleComments(event)"><i class="fa fa-reply"></i>2</p>
                <p class="like text-light upvote" onclick="increaseCount(event)" ><i class="fa fa-thumbs-o-up"></i><span>10</span></p>
                <p class="dislike text-light" onclick="decreaseCount(event)"><i class="fa fa-thumbs-o-down"></i><span>2</span></p>
              </div>
            </div>
          </div>

          <div class="question-comments">
            <div class="single-comment flex p-1">
                <div class="avatar bg-black">
                  <p>ID</p>
                </div>
                <div class="comment-details">
                  <div class="comment-content">
                    <div class="upper-details flex space-between">
                      <p class="comment-user">
                      <a href="profile.html" class="text-black">Igbominadeveloper</a></p>
                      <p class="text-light comment-time"><i class="fa fa-clock-o"></i>2 months ago</p>
                    </div>
                    <p class="text-light mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda laborum cumque
                      praesentium impedit obcaecati est eaque consectetur nisi tempore cupiditate?</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="new-comment">
            <form action="" id="comment-form" class="flex flex-column">
              <div class="form-group">
                <textarea class="form-control" name="comment" id="comment" placeholder="Your comment"></textarea>
              </div>
              <button class="btn-primary p-1 shadow">post</button>
            </form>
          </div>
        </div>
        <div class="new-question">
          <form method="POST" id="question-form" class="flex flex-column" onsubmit="Question.create(event,this,${data.id})">
            <div class="form-group">
              <input required class="form-control" name="title" placeholder="title" />
            </div>
            <div class="form-group">
              <textarea required class="form-control" name="body" id="question" placeholder="Your Question"></textarea>
            </div>
            <button class="btn-primary p-1 shadow">post</button>
          </form>
        </div>
      `
    }
  }
}