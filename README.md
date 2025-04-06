## PDTyper
- Website: [lemoncastle.github.io/PDTyper/](lemoncastle.github.io/PDTyper/)
- Demo Video: [https://youtu.be/jcF4mJ28G9I](https://youtu.be/jcF4mJ28G9I)  (Recorded Mar 11, 2025)

### Introduction
We used the [Tappy dataset](https://physionet.org/content/tappy/1.0.0/) from the Physionet repository, which typing data of people on different stages of Parkinson’s disease. Data included: latency, flight time, and hold time. It also gives information about the subjects, including year of birth, year of diagnosis, medications taken, and symptoms felt.
We asked the questions:
- How does Parkinson's affect typing?
- How does Medication affect typing?

We visualized this by creating a keyboard visualization that simulates a typing test of subjects.
## Development Process
### 1. Data Cleaning & Organization
- Our dataset, when combined consisted of over 9 million rows of data
- Running python notebooks with these datasets used so much ram
- we opted for simple aggregations like mean/median with indexes

### 2. Background
- A section built so people can have general understanding of what PD is. 
- A challenege I faced was what visual I wanted which we opted for distribution of medications.
- Clicking each bar shows information about the medication with a nice accompanying picture :0
### 3. Typing and Parkinsons
- A section used to understand our dataset and how we can use typing to predict Parkinson's
- Based on [this](https://pmc.ncbi.nlm.nih.gov/articles/PMC5708704/) paper, they created a classifer system with high accuracy detecting PD early on.
- The issue they presented is PD is hard to detect early on, and when symptoms show up it may be too late. 
- I included I seperate study on [spiral drawings](https://www.researchgate.net/publication/354952092_Screening_of_Parkinson's_Disease_Using_Geometric_Features_Extracted_from_Spiral_Drawings) that hopefully helped. 
### 4. Keyboards!
- A keyboard simulation/visualization that allows users to enter their own phrase and compare typing in real time!
- A struggle we had was what features we wanted to include in this visual. 
- We decided to keep it simple so we included a progress bar and time difference between the two. 

---

### Closing
- I probably spent 30-50 hours working on this project with other members contributing another ~10 hours. We had a total of 3 weeks to complete this project with multiple checkpoints and times to get feedback from our peers. 
- The bulk of this project was once again working with d3, javascript and developing the website. 
- I took website inspiration from a google website template and styling inspiration from the [motherfuckingwesbite](https://motherfuckingwebsite.com/) and [The best motherfucking website](https://thebestmotherfucking.website/) (seriously these are amazing)

### Technologies Used
- D3.js - visualizations
- Javascript & HTML/CSS - web development and styling
- Python & Pandas - data processing

### Future Improvements
- Text box clean up
- mobile device compatible
- TBD

---
Thanks for reading! We had a lot of fun with this project! There was kind of an internal strife going on throughout the project but we got through it :)