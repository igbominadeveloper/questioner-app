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
        if (response.error) {
          return this.errorTemplate(response.error);
        }
        let meetupData = response.data[0];
        let template = this.singleMeetup(meetupData);
        singleMeetupWrapper.innerHTML = template;
        })
      .catch(error => console.log(error))
    
  }

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
              <p class="p-1"><a href="#" class="text-heavy p-10 br-20 text-primary">Register</a></p>
              <p class="p-1"><a href="#" class="p-10 br-20 text-warning">Undecided</a></p>
              <p class="p-1"><a href="#" class="p-10 br-20 text-danger">Not Interested</a></p>
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
        <article class="mt-5 m-20">
          <h3 class="text-heavy">
            Description
          </h3>
          <p class="text-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati dolorem consequatur autem quae aliquid, laudantium dolor excepturi commodi dolore officiis pariatur id repellendus officia perspiciatis facilis velit tempora provident ducimus. Assumenda illum nisi sunt necessitatibus autem voluptatum maxime! Optio doloremque possimus at corporis itaque maiores assumenda amet reiciendis, a dolore in non, vero voluptas ab voluptatibus laboriosam iure. Eum, non.</p>
        </article>
        <article class="mt-5 meetup-questions m-20">
          <div class="question-title">
            <h3 class="text-heavy">Questions</h3>
          </div>
          <div class="questions-list">

            <div class="question flex p-1 flex-column">
              <div class="question-body flex">
                <div class="avatar bg-black">
                  <p>ID</p>
                </div>

                <div class="question-details">
                  <div class="question-content">
                    <div class="upper-details flex space-between">
                      <p class="question-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
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
                          <p class="comment-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
                          <p class="text-light comment-time"><i class="fa fa-clock-o"></i>2 months ago</p>
                        </div>
                        <p class="text-light mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda laborum cumque
                          praesentium impedit obcaecati est eaque consectetur nisi tempore cupiditate?</p>
                      </div>
                    </div>
                </div>

                <div class="single-comment flex p-1">
                    <div class="avatar bg-black">
                      <p>ID</p>
                    </div>
                    <div class="comment-details">
                      <div class="comment-content">
                        <div class="upper-details flex space-between">
                          <p class="comment-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
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

            <div class="question flex p-1 flex-column">
              <div class="question-body flex">
                <div class="avatar bg-black">
                  <p>ID</p>
                </div>
                <div class="question-details">
                  <div class="question-content">
                    <div class="upper-details flex space-between">
                      <p class="question-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
                      <p class="text-light question-time"><i class="fa fa-clock-o"></i>2 months ago</p>
                    </div>
                    <p class="text-light mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda laborum cumque
                      praesentium impedit obcaecati est eaque consectetur nisi tempore cupiditate?</p>
                  </div>
                  <div class="question-stats flex space-between mt-1">
                    <p class="comment text-light" onclick="toggleComments(event)"><i class="fa fa-reply"></i>1</p>
                    <p class="like text-light upvote" onclick="increaseCount(event)" ><i class="fa fa-thumbs-o-up"></i><span>5</span></p>
                    <p class="dislike text-light" onclick="decreaseCount(event)"><i class="fa fa-thumbs-o-down"></i><span>1</span></p>
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
                          <p class="comment-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
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

            <div class="question flex p-1 flex-column">
              <div class="question-body flex">
                <div class="avatar bg-black">
                  <p>ID</p>
                </div>
                <div class="question-details">
                  <div class="question-content">
                    <div class="upper-details flex space-between">
                      <p class="question-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
                      <p class="text-light question-time"><i class="fa fa-clock-o"></i>2 months ago</p>
                    </div>
                    <p class="text-light mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda laborum cumque
                      praesentium impedit obcaecati est eaque consectetur nisi tempore cupiditate?</p>
                  </div>
                  <div class="question-stats flex space-between mt-1">
                    <p class="comment text-light" onclick="toggleComments(event)"><i class="fa fa-reply"></i>2</p>
                    <p class="like text-light upvote" onclick="increaseCount(event)" ><i class="fa fa-thumbs-o-up"></i><span>3</span></p>
                    <p class="dislike text-light" onclick="decreaseCount(event)"><i class="fa fa-thumbs-o-down"></i><span>1</span></p>
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
                          <p class="comment-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
                          <p class="text-light comment-time"><i class="fa fa-clock-o"></i>2 months ago</p>
                        </div>
                        <p class="text-light mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda laborum cumque
                          praesentium impedit obcaecati est eaque consectetur nisi tempore cupiditate?</p>
                      </div>
                    </div>
                </div>

                <div class="single-comment flex p-1">
                    <div class="avatar bg-black">
                      <p>ID</p>
                    </div>
                    <div class="comment-details">
                      <div class="comment-content">
                        <div class="upper-details flex space-between">
                          <p class="comment-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
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

            <div class="question flex p-1 flex-column">
              <div class="question-body flex">
                <div class="avatar bg-black">
                  <p>ID</p>
                </div>
                <div class="question-details">
                  <div class="question-content">
                    <div class="upper-details flex space-between">
                      <p class="question-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
                      <p class="text-light question-time"><i class="fa fa-clock-o"></i>2 months ago</p>
                    </div>
                    <p class="text-light mt-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda laborum cumque
                      praesentium impedit obcaecati est eaque consectetur nisi tempore cupiditate?</p>
                  </div>
                  <div class="question-stats flex space-between mt-1">
                    <p class="comment text-light" onclick="toggleComments(event)"><i class="fa fa-reply"></i>1</p>
                    <p class="like text-light upvote" onclick="increaseCount(event)" ><i class="fa fa-thumbs-o-up"></i><span>2</spa></p>
                    <p class="dislike text-light" onclick="decreaseCount(event)"><i class="fa fa-thumbs-o-down"></i><span>5</span></p>
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
                          <p class="comment-user"><a href="profile.html" class="text-black">Igbominadeveloper</a></p>
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
            
              <div class="new-question">
                <form action="" id="question-form" class="flex flex-column">
                  <div class="form-group">
                    <textarea class="form-control" name="question" id="question" placeholder="Your Question"></textarea>
                  </div>
                  <button class="btn-primary p-1 shadow">post</button>
                </form>
              </div>
            </div>
          </div>
        </article>
      </section>
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