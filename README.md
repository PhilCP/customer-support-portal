
Customer Portal

1.	Setup and decisions made:
•	React + Tailwind for fast and modern UI
•	LocalStorage Api: simulate backed, can be found in src/utils/api.js
•	Dark mode: toggleable.], persisted theme
•	Pwa offline: cached views for /ticked/:id
•	No external auth: Auth is mocked using local storage
•	Ticket list refreshed every 30 seconds using

2.	How to run tests:
•	Start the app: npm start
•	Follow the 3000 link or follow directly the vercel link(https://customer-support-portal-pi.vercel.app/), make sure the app is already running.
•	Login and sign up: input information, after login user will be taken to the ticket list page, if there’s no ticket the user will be given an option to create new ticket.
•	Ticket: user will be able to add a new ticket, modify it, delete it or add a comment.

3.	Github repository : https://github.com/PhilCP/customer-support-portal
