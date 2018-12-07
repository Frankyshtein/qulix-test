const letters = document.getElementsByClassName('media');
const senders = document.querySelectorAll('.user-name');
const subjects = document.querySelectorAll('.media-heading');
const snippets = document.querySelectorAll('.snippet');
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
  if (cl === data.resultSizeEstimate) {
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
  clearBox();
  let param =
    '?q' +
    $('.input-group .form-control')
      .serialize()
      .slice(6)
      .replace('+', '%20')
      .replace('+', '%20');
  initData('', param).then(data => {
    showLetter(data, 0);
  });
}
function clearBox() {
  console.log([].forEach.call(letters, item => item.classList.add('hide')));
}
window.onAuthorize = function(googleUser) {
  window.googleUser = googleUser;
  initData().then(data => {
    showLetter(data, 0);
  });
};
