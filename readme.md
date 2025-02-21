# **Interactive Quiz Platform**

## 🚀 **Overview**
This is an interactive quiz platform where users can attempt quizzes, receive instant feedback, and track their progress over multiple attempts. It supports both multiple-choice and integer-type questions with a clean and responsive UI.

## 🎯 **Features**
- **Quiz Creation & Management**
  - Displays a list of questions divided into multiple-choice and integer-based questions.
  - Users can attempt quizzes with real-time feedback.
- **Multiple Attempts & History**
  - Allows users to retake quizzes and review past attempts.
  - Saves quiz history using IndexedDB for persistence across sessions.
- **User Interaction**
  - Provides instant feedback on answers (correct/incorrect).
  - Disables changing answers after selection for MCQs.
  - Timer-based quiz system with 30 seconds per question.
- **Progress Tracking**
  - Scoreboard displayed at the end of the quiz.
  - Tracks accuracy, score, and total time spent.

## 🛠 **Tech Stack**
- **Frontend:** React, Tailwind CSS, TypeScript  
- **Database:** IndexedDB (for storing attempts locally)  
- **Icons:** Lucide Icons  

## 💻 **How to Run Locally**
1. **Clone the repository:**  
   ```bash
   git clone https://github.com/your-username/quiz-platform.git
   cd quiz-platform
   ```  
2. **Install dependencies:**  
   ```bash
   npm install
   ```  
3. **Run the development server:**  
   ```bash
   npm run dev
   ```  
4. **Open the app:**  
   Navigate to `http://localhost:5173` in your browser.

## 🌐 Live Demo

Check out the deployed app [here](https://your-deployed-app-link.com) 🌍

## 🏆 Key Highlights

- Fully responsive design optimized for mobile and desktop.
- Modular codebase for easy scalability and maintenance.
- Persistent quiz history even after page refresh.

## 📄 License

Feel free to fork and modify the project for your needs!

