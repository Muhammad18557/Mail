# Mail Project

This project is a single-page email client implemented using JavaScript, HTML, and CSS. It fulfills various requirements to provide a functional email client experience.

## Features
- Send Mail: Users can compose and send emails using the email composition form. Upon submission, the email is sent by making a POST request to `/emails` with the recipient, subject, and body fields.
- Mailbox: The application supports different mailboxes, including Inbox, Sent, and Archive. Users can navigate between these mailboxes, and the corresponding emails are loaded by making GET requests to `/emails/<mailbox>`.
- View Email: When a user clicks on an email, they are taken to a detailed view of that email. The email's sender, recipients, subject, timestamp, and body are displayed. The email is marked as read by sending a PUT request to `/emails/<email_id>`.
- Archive and Unarchive: Users can archive and unarchive received emails. When viewing an Inbox email, an archive button is presented, and when viewing an Archive email, an unarchive button is displayed. These actions are performed by sending PUT requests to `/emails/<email_id>`.
- Reply: Users can reply to emails by clicking the "Reply" button. This action opens the email composition form with the recipient field pre-filled with the sender's email, the subject line prefixed with "Re:", and the body pre-filled with the original email's content.

## Usage
To run the Mail Project locally:
1. Ensure you have Python and Django installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Apply migrations by running the following command:
   ```bash
   python manage.py migrate
