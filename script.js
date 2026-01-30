/* ========================================
   JAVASCRIPT - Portfolio Website Functionality
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       MOBILE MENU TOGGLE
       ======================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    /* ========================================
       SMOOTH SCROLLING FOR NAVIGATION LINKS
       ======================================== */
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    /* ========================================
       SCROLL ANIMATIONS - Fade in elements on scroll
       ======================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all service cards, project cards, and feature items
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .feature-item');
    animatedElements.forEach(el => observer.observe(el));
    
    /* ========================================
       FORM HANDLING - Contact Form Submission
       
       IMPORTANT: This is where form data is handled!
       Currently set up for Firebase/backend integration.
       See instructions at the bottom for how to connect.
       ======================================== */
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                budget: document.getElementById('budget').value,
                projectDescription: document.getElementById('projectDescription').value,
                timestamp: new Date().toISOString(),
                status: 'new' // To track which submissions you've reviewed
            };
            
            // Log form data to console (for testing)
            console.log('Form submitted with data:', formData);
            
            /* ========================================
               BACKEND INTEGRATION POINT
               
               Replace the code below with one of these options:
               
               OPTION 1: FIREBASE FIRESTORE
               -------------------------
               // Add to Firestore database
               try {
                   await db.collection('contacts').add(formData);
                   showMessage('success', 'Message sent successfully! I\'ll get back to you within 24 hours.');
                   contactForm.reset();
               } catch (error) {
                   console.error('Error:', error);
                   showMessage('error', 'Something went wrong. Please try again or email me directly.');
               }
               
               OPTION 2: GOOGLE SHEETS (via Apps Script)
               -------------------------
               fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
                   method: 'POST',
                   body: JSON.stringify(formData)
               })
               .then(response => response.json())
               .then(data => {
                   showMessage('success', 'Message sent successfully!');
                   contactForm.reset();
               })
               .catch(error => {
                   console.error('Error:', error);
                   showMessage('error', 'Something went wrong. Please try again.');
               });
               
               OPTION 3: BACKEND API (Node.js/Express)
               -------------------------
               fetch('/api/contact', {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(formData)
               })
               .then(response => response.json())
               .then(data => {
                   showMessage('success', 'Message sent successfully!');
                   contactForm.reset();
               })
               .catch(error => {
                   console.error('Error:', error);
                   showMessage('error', 'Something went wrong. Please try again.');
               });
               
               ======================================== */
            
            // TEMPORARY: Show success message (replace with real backend)
            // This will work for testing, but won't actually save data
            showMessage('success', 'Message sent successfully! (Demo mode - connect to backend to save data)');
            
            // Optionally reset the form after submission
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
        });
    }
    
    /* ========================================
       HELPER FUNCTION - Show form message
       ======================================== */
    function showMessage(type, message) {
        formMessage.className = 'form-message ' + type;
        formMessage.textContent = message;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }
    
    /* ========================================
       NAVBAR BACKGROUND ON SCROLL
       ======================================== */
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

/* ========================================
   FORM DATA STORAGE INSTRUCTIONS
   ======================================== */

/*
TO STORE FORM SUBMISSIONS, CHOOSE ONE OF THESE OPTIONS:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPTION 1: FIREBASE (Easiest for beginners)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Go to firebase.google.com and create a new project
2. Enable Firestore Database
3. Add Firebase to your website:
   - Add these scripts before </body> in index.html:
   
   <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>
   <script>
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     firebase.initializeApp(firebaseConfig);
     const db = firebase.firestore();
   </script>

4. Uncomment the Firebase code in the form handler above (line ~95)
5. View submissions at: firebase.google.com/console → Your Project → Firestore Database

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPTION 2: GOOGLE SHEETS (Free & Simple)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Create a new Google Sheet
2. Go to Extensions → Apps Script
3. Paste this code:

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.fullName,
    data.email,
    data.phone,
    data.service,
    data.budget,
    data.projectDescription
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}

4. Deploy → New deployment → Web app
5. Copy the URL and replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' in OPTION 2 above
6. Uncomment the Google Sheets code in the form handler

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPTION 3: BACKEND SERVER (Advanced)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a simple Node.js backend:

1. Install dependencies: npm install express body-parser
2. Create server.js:

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Your website files

app.post('/api/contact', (req, res) => {
  const submission = req.body;
  
  // Save to JSON file
  fs.readFile('contacts.json', (err, data) => {
    let contacts = err ? [] : JSON.parse(data);
    contacts.push(submission);
    
    fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        res.status(500).json({error: 'Failed to save'});
      } else {
        res.json({success: true});
      }
    });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));

3. Run: node server.js
4. Uncomment OPTION 3 code in the form handler above

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED: Start with Firebase (easiest)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
