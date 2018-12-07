const letters = document.getElementsByClassName('media');
const senders = document.querySelectorAll('.user-name');
const subjects = document.querySelectorAll('.media-heading');
const snippets = document.querySelectorAll('.snippet');
let nextPageToken;
let previousPageToken = [1];
let prev = 0;
let initData = async (id = '', param = '') => {
  const api_call = await fetch(
    `https://www.googleapis.com/batch/gmail/v1/users/${window.googleUser
      .getBasicProfile()
      .getId()}/messages/${id}${param}`,
    {
      headers: {
        Authorization: `Bearer ${window.googleUser.getAuthResponse().access_token}`
      }
    }
  );
  const data = await api_call.json();
  return data;
};
function showLetter(data, cl) {
  if (cl === data.messages.length) {
    return;
  }
  initData(data.messages[cl].id, '?format=metadata&metadataHeaders=From&metadataHeaders=Subject').then(value => {
    letters[cl].classList.remove('hide');
    senders[cl].innerText = value.payload.headers[0].value;
    subjects[cl].innerText = value.payload.headers[1].value;
    snippets[cl].innerText = value.snippet;
    showLetter(data, cl + 1);
  });
}
function searchLetter() {
  [].forEach.call(letters, item => item.classList.add('hide'));
  let param = '?maxResults=4';
  '&q' +
    $('.input-group .form-control')
      .serialize()
      .slice(6)
      .replace('+', '%20')
      .replace('+', '%20');
  initData('', param).then(data => {
    showLetter(data, 0);
  });
}
function nextPage() {
  [].forEach.call(letters, item => item.classList.add('hide'));
  initData('', `?maxResults=4&pageToken=${nextPageToken}`).then(data => {
    this.console.log(data);
    if (data.nextPageToken && previousPageToken != 1) {
      previousPageToken.push(nextPageToken);
      nextPageToken = data.nextPageToken;
      prev++;
    }
    showLetter(data, 0);
  });
}
function previousPage() {
  [].forEach.call(letters, item => item.classList.add('hide'));
  if (previousPageToken[prev] == 1) {
    initData('', '?maxResults=4').then(data => {
      this.console.log(data);
      nextPageToken = data.nextPageToken;
      showLetter(data, 0);
    });
  } else {
    prev--;
    initData('', `?maxResults=4&pageToken=${previousPageToken[prev]}`).then(data => {
      nextPageToken = data.nextPageToken;
      showLetter(data, 0);
    });
  }
}
window.onAuthorize = function(googleUser) {
  window.googleUser = googleUser;
  document.querySelector('.profile span').innerText = window.googleUser.getBasicProfile().getName();
  document.querySelector('.profile img').src = window.googleUser.getBasicProfile().getImageUrl();
  this.console.log(document.querySelector('.profile img').src);
  initData('', '?maxResults=4').then(data => {
    this.console.log(data);
    nextPageToken = data.nextPageToken;
    showLetter(data, 0);
  });
};
