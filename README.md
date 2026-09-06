Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  
===

Achievements
---
## Reading Tracker
I created a reading tracker that allows users to keep track of the books they are currently reading. Users can enter the book title, author, pages read, and total pages. The current reading list is displayed in a table, and books can be edited or removed using the edit and delete buttons. I used CSS Flexbox to organize the form layout.

## Technical Achievements
- **Tech Achievement 1**: I created a single-page application where the form and current reading list are displayed on the same page. When a book is added, the server calculates the percentage completed and sends the updated data back to the page. The reading list then updates without having to reload the page. This was challenging because I had to make sure the client and server communicated correctly and that the table updated whenever the data changed.
- **Tech Achievement 2**: I added an edit button that allows users to modify books that are already in the Currently Reading table. When a book is edited, the server updates the existing book and recalculates the percentage completed. This was challenging because I had to keep track of which book was being edited and make sure it updated the existing book instead of adding a new one.