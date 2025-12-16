let quizState = {
    active: false,
    questions: [],
    currentQuestionIndex: 0,
    correctCount: 0
};

/**
 * Initiates a new quiz session with unique visuals.
 */
function startQuizSession() {
    const storyQs = window.QUIZ_QUESTIONS.filter(q => q.storyId === gameState.currentStoryId);
    
    if (storyQs.length < window.QUIZ_CONSTANTS.TOTAL_QUESTIONS) {
        finishQuizSession(true); 
        return;
    }

    const shuffled = [...storyQs].sort(() => 0.5 - Math.random());
    quizState.questions = shuffled.slice(0, window.QUIZ_CONSTANTS.TOTAL_QUESTIONS);
    
    quizState.active = true;
    quizState.currentQuestionIndex = 0;
    quizState.correctCount = 0;

    // --- VISUAL OVERHAUL START ---
    // 1. Change Background to Gold Plates (Placeholder)
    document.getElementById('background-image').src = "https://placehold.co/750x300/DAA520/FFF?text=The+Golden+Plates";
    // 2. Hide Characters
    document.getElementById('protagonist-portrait').style.display = 'none';
    document.getElementById('cast-portraits-container').style.display = 'none';
    // 3. Change Panel Color
    document.getElementById('gameplay-panel').classList.add('quiz-mode-active');
    // --- VISUAL OVERHAUL END ---

    toggleGameControls(false); 
    renderNextQuestion();
}

/**
 * Renders the question and score.
 */
function renderNextQuestion() {
    const qData = quizState.questions[quizState.currentQuestionIndex];
    const storyText = document.getElementById('story-text');
    const choicesDiv = document.getElementById('choices');
    
    // Update Text with "Correct Answer" Tally
    storyText.innerHTML = `
        <h3 style="color:#b8860b; margin-bottom:5px;">Reviewing Records (${quizState.currentQuestionIndex + 1}/${window.QUIZ_CONSTANTS.TOTAL_QUESTIONS})</h3>
        <p style="font-size: 0.9em; color:#666; margin-bottom:15px; border-bottom:1px solid #ddd; padding-bottom:5px;">
            Current Score: <strong>${quizState.correctCount}</strong> correct
        </p>
        <p style="font-size: 1.1em; font-weight: bold;">${qData.question}</p>
    `;

    const wrongPool = [...qData.incorrectAnswersPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    let allAnswers = [
        { text: qData.correctAnswer, isCorrect: true },
        ...wrongPool.map(w => ({ text: w, isCorrect: false }))
    ];

    allAnswers.sort(() => 0.5 - Math.random());

    choicesDiv.innerHTML = '';
    allAnswers.forEach(ans => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = ans.text;
        // Pass the button element itself and the correctness flag
        btn.onclick = (e) => handleQuizAnswer(e.target, ans.isCorrect); 
        choicesDiv.appendChild(btn);
    });
}

/**
 * Handles the immediate feedback (Color change) and shows "Next" button.
 */
function handleQuizAnswer(clickedBtn, isCorrect) {
    const choicesDiv = document.getElementById('choices');
    const allButtons = choicesDiv.querySelectorAll('.choice-btn');
    const currentQ = quizState.questions[quizState.currentQuestionIndex];

    // 1. Disable all buttons to prevent double clicking
    allButtons.forEach(btn => btn.disabled = true);

    // 2. Visual Feedback
    if (isCorrect) {
        clickedBtn.classList.add('quiz-correct');
        quizState.correctCount++;
    } else {
        clickedBtn.classList.add('quiz-incorrect');
        // Find and highlight the correct answer so the user learns
        allButtons.forEach(btn => {
            if (btn.innerText === currentQ.correctAnswer) {
                btn.classList.add('quiz-correct');
            }
        });
    }

    // 3. Create "Next" Button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'story-btn'; // Use main button style for prominence
    nextBtn.style.marginTop = '15px';
    nextBtn.style.backgroundColor = '#b8860b'; // Gold color override
    
    const isLast = quizState.currentQuestionIndex + 1 >= window.QUIZ_CONSTANTS.TOTAL_QUESTIONS;
    nextBtn.innerText = isLast ? "Finish Review" : "Next Question →";
    
    nextBtn.onclick = advanceQuiz; // Call helper to move forward
    choicesDiv.appendChild(nextBtn);
}

/**
 * Helper to move index forward.
 */
function advanceQuiz() {
    quizState.currentQuestionIndex++;
    if (quizState.currentQuestionIndex < window.QUIZ_CONSTANTS.TOTAL_QUESTIONS) {
        renderNextQuestion();
    } else {
        finishQuizSession();
    }
}

function finishQuizSession(isFallback = false) {
    quizState.active = false;
    toggleGameControls(true);

    // --- CLEANUP VISUALS ---
    document.getElementById('gameplay-panel').classList.remove('quiz-mode-active');
    document.getElementById('protagonist-portrait').style.display = 'block';
    document.getElementById('cast-portraits-container').style.display = 'flex';
    // Note: Background image is automatically reset by renderScene below
    // -----------------------

    let addedFaith = 0;
    let addedKnowledge = 0;
    let feedbackMsg = "";

    if (isFallback) {
        addedFaith = 1.0;
        addedKnowledge = 1.0;
        feedbackMsg = "No new questions found. Your spirit is strengthened by the review.";
    } else {
        const totalQuestions = window.QUIZ_CONSTANTS.TOTAL_QUESTIONS;
        const correct = quizState.correctCount;
        addedFaith = window.QUIZ_CONSTANTS.BASE_FAITH + (correct / (totalQuestions - 1));
        addedKnowledge = correct * window.QUIZ_CONSTANTS.KNOWLEDGE_PER_CORRECT;
        
        const scorePct = Math.round((correct / totalQuestions) * 100);
        feedbackMsg = `You answered ${correct} out of ${totalQuestions} correctly (${scorePct}%).`;

        if (correct >= 3 && !gameState.covenantPathProgress.includes("Records Review")) {
            gameState.covenantPathProgress.push("Records Review");
        }
    }
    
    // Diminishing Returns Logic
    const isYouth = gameState.difficulty === 'Youth';
    const isEndowed = gameState.difficulty === 'Endowed';
    const actionTaken = gameState.actionsTakenSinceChoice > 0;
    const consecutive = gameState.lastAction === 'study';

    let reductionMsg = "";
    if (isEndowed && actionTaken) {
        addedFaith = 0; addedKnowledge = 0;
        reductionMsg = " (No benefit: Action limit reached)";
    } else if ((isYouth && actionTaken) || (gameState.difficulty === 'Primary' && consecutive)) {
        addedFaith *= 0.5;
        addedKnowledge *= 0.5;
        reductionMsg = " (Diminished by fatigue)";
    }
    
    const oldFaith = gameState.faith;
    const oldKnowledge = gameState.knowledge;

    gameState.faith += addedFaith;
    gameState.knowledge += addedKnowledge;
    gameState.worldly_influence += window.QUIZ_CONSTANTS.COSTS.worldly;
    gameState.unity += window.QUIZ_CONSTANTS.COSTS.unity;

    clampStats();
    if (checkGameOver()) return;

    gameState.lastAction = 'study';
    gameState.actionsTakenSinceChoice++;
    
    let actualDFaith = (gameState.faith - oldFaith).toFixed(1);
    let actualDKnowledge = (gameState.knowledge - oldKnowledge).toFixed(1);
    
    let statString = `Faith: ${actualDFaith > 0 ? '+' : ''}${actualDFaith} | Knowledge: ${actualDKnowledge > 0 ? '+' : ''}${actualDKnowledge} | Worldly: +${window.QUIZ_CONSTANTS.COSTS.worldly} | Unity: ${window.QUIZ_CONSTANTS.COSTS.unity}`;
    
    let feedbackHTML = `
        <span class="feedback-title">Records Review Complete!</span>
        <span class="feedback-narrative">${feedbackMsg}${reductionMsg}</span>
        <span class="feedback-stats">${statString}</span>
    `;

    renderScene(gameState.currentSceneId, false, feedbackHTML, null);
}