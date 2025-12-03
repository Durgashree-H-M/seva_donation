# Seva Flow Donations Project

## Folder Structure
seva_flow/
├─ index.html
├─ checkout.html
├─ thankyou.html
├─ css/
│   |└─ style.css
|   |__ checkstyle.css 
├─ js/
│   |└─ checkscript.js
|   |__ script.js
├─ saveDonation.php
└─ sql/
    └─ donations.sql

## Database Structure
- Database: seva_flow
- Table: donations
- Columns: id, name, email, phone,payment_method, donation_details, total_amount

## How to Run
1. Install XAMPP and start Apache & MySQL.
2. Place project folder in htdocs.
3. Import donations.sql into phpMyAdmin.
4. Open `http://localhost/seva_flow/index.html` in browser.
5. Fill the form and submit to save donation.
