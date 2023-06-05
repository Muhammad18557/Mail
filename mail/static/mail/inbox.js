document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  document.querySelector('#compose-form').onsubmit= send_email;
  
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {
  // Show the compose form
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear the values of the form fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
};

function reply_email(email){
  // Show the compose form
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear the values of the form fields
  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
  document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote:\n${email.body}\n`;
};

function load_mailbox(mailbox) {
  console.log("loading load_mailbox");
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  

  // Use API to get emails
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    // Print emails
    console.log(emails);
    // ... do something else with emails ...
    emails.forEach(email => {
      show_emails(email, mailbox);
    });
  })
  .catch((error) => console.error(error));

};

// my code starts here 
function send_email() {
  const email_to = document.querySelector('#compose-recipients').value;
  const email_subject = document.querySelector('#compose-subject').value;
  const email_body = document.querySelector('#compose-body').value;

  console.log("using API to send_email");
  fetch('/emails', { 
    method: 'POST',
    body: JSON.stringify({
    recipients: email_to,
    subject: email_subject,
    body: email_body
    })
  })
  .then(() => {load_mailbox('sent')});
  return false;

};

function show_emails(email, mailbox){
  console.log("loading show_emails");
  const email_div = document.createElement('div');
  email_div.className = "row";
  email_div.id = "email";

  const email_to = document.createElement('div');
  email_to.id = "email_to";
  email_to.className = "col-lg-2 col-md-2 col-sm-2";
  if (mailbox === 'inbox' || mailbox === 'archive' ){
    email_to.innerHTML = email.sender;
  }
  else {
    email_to.innerHTML = email.recipients[0];
  }
  email_div.append(email_to);

  const subject = document.createElement('div');
  subject.id = "subject";
  subject.className = "col-lg-6 col-md-5 col-sm-12";
  subject.innerHTML = email.subject;
  email_div.append(subject)

  const timestamp = document.createElement('div');
  timestamp.id = "timestamp";
  timestamp.className = "col-lg-3 col-md-4 col-sm-10";
  timestamp.innerHTML = email.timestamp;
  email_div.append(timestamp);

  // for inbox
  if (mailbox === 'inbox' && email.archived === false){
    const img_button = document.createElement('img');
    img_button.id = "archive-icon";
    img_button.src = "data:image/png;base64,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";
    img_button.style = "width: 45px; height: 40px"
    img_button.innerHTML ="Archive";
    email_div.append(img_button);

    img_button.addEventListener('click', () => {
      // update email's status to "archived"
      fetch(`/emails/${email.id}`, { 
        method: 'PUT',
        body: JSON.stringify({
            archived: true
        })
      })
      // load the archive mailbox in the UI
      .then(() => {load_mailbox('archive');
    })
  });
  }
  //for archived
  else if (mailbox === 'archive' && email.archived === true){
    const img_button = document.createElement('img');
    img_button.id = "unarchive-icon";
    img_button.src = "data:image/png;base64,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";
    img_button.style = "width: 45px; height: 40px"
    img_button.innerHTML ="Unarchive";
    email_div.append(img_button);

    img_button.addEventListener('click', () => {
      // update email's status to "archived"
      email.archived = false;
      fetch(`/emails/${email.id}`, { 
        method: 'PUT',
        body: JSON.stringify({
            archived: false
        })
      })
      // load the archive mailbox in the UI
      .then(() => {load_mailbox('inbox');
    })
    });
  }
  const emailCard = document.createElement('div');
  emailCard.id = "email-card";
  if (email.read) {
    emailCard.style.backgroundColor = "gray";
    emailCard.className = "card mb-3"
  }
  else {
    emailCard.style.backgroundColor = "white";
    emailCard.className = "card mb-3";
  }
  emailCard.append(email_div);

  document.querySelector('#emails-view').append(emailCard);

  // a bunch of lines here to link to other stuff
  //email_to.addEventListener('click', () => load_mailbox('inbox')); // needs to be fixed
  email_to.addEventListener('click', () => show_email(email))
}

function show_email(email){

  const id = email.id;
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'block';
  
  const fullEmail = document.createElement('div');
  fullEmail.id = "full-email";

  const subject = document.createElement('h3');
  subject.innerHTML = email.subject;
  fullEmail.append(subject);

  const sender = document.createElement('h7');
  sender.innerHTML = email.sender;
  fullEmail.append(sender);


  const timestamp = document.createElement('h7');
  timestamp.innerHTML = email.timestamp;
  fullEmail.append(timestamp);

  const body = document.createElement('p');
  body.innerHTML = email.body;
  fullEmail.append(body);

  //reply button
  const button = document.createElement('button');
  button.innerText = 'Reply';
  button.addEventListener('click', () => reply_email(email));
  
  fullEmail.append(button);

  document.querySelector('#email-view').innerHTML = '';
  // Send an update request 
  fetch(`/emails/${email.id}`, {
    method: 'PUT',
    body: JSON.stringify({ read: true })
  })
  document.querySelector('#email-view').append(fullEmail);

}