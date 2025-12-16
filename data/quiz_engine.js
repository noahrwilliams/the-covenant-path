let quizState = {
    active: false,
    questions: [],
    currentQuestionIndex: 0,
    correctCount: 0
};

function startQuizSession() {
    // 1. Filter Questions by Current Story
    const storyQs = window.QUIZ_QUESTIONS.filter(q => q.storyId === gameState.currentStoryId);
    
    // Safety: If not enough questions, just give free points (fallback)
    if (storyQs.length < window.QUIZ_CONSTANTS.TOTAL_QUESTIONS) {
        finishQuizSession(5); // Auto-win if no data
        return;
    }

    // 2. Randomize and Select 5
    const shuffled = [...storyQs].sort(() => 0.5 - Math.random());
    quizState.questions = shuffled.slice(0, window.QUIZ_CONSTANTS.TOTAL_QUESTIONS);
    
    // 3. Initialize State
    quizState.active = true;
    quizState.currentQuestionIndex = 0;
    quizState.correctCount = 0;

    // 4. Disable UI Controls during quiz
    toggleGameControls(false);

    renderNextQuestion();
}

function renderNextQuestion() {
    const qData = quizState.questions[quizState.currentQuestionIndex];
    const storyText = document.getElementById('story-text');
    const choicesDiv = document.getElementById('choices');

    // 1. Update Text Area
    storyText.innerHTML = `
        <h3 style="color:#6d5e41; margin-bottom:10px;">Reviewing Records (${quizState.currentQuestionIndex + 1}/${window.QUIZ_CONSTANTS.TOTAL_QUESTIONS})</h3>
        <p>${qData.question}</p>
    `;

    // 2. Prepare Answers (1 Correct + 3 Random Incorrect)
    const wrongPool = [...qData.incorrectAnswersPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    let allAnswers = [
        { text: qData.correctAnswer, isCorrect: true },
        ...wrongPool.map(w => ({ text: w, isCorrect: false }))
    ];

    // 3. Shuffle Answer Order
    allAnswers.sort(() => 0.5 - Math.random());

    // 4. Render Buttons
    choicesDiv.innerHTML = '';
    allAnswers.forEach(ans => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.innerText = ans.text;
        btn.onclick = () => handleQuizAnswer(ans.isCorrect);
        choicesDiv.appendChild(btn);
    });
}

function handleQuizAnswer(isCorrect) {
    if (isCorrect) quizState.correctCount++;

    quizState.currentQuestionIndex++;

    if (quizState.currentQuestionIndex < window.QUIZ_CONSTANTS.TOTAL_QUESTIONS) {
        renderNextQuestion();
    } else {
        finishQuizSession();
    }
}

function finishQuizSession() {
    quizState.active = false;
    toggleGameControls(true);

    // 1. Calculate Stats
    // Formula: Base 0.25 + (Correct / 4)
    // Note: Denominator is Total - 1 (5 - 1 = 4)
    let addedFaith = window.QUIZ_CONSTANTS.BASE_FAITH + (quizState.correctCount / (window.QUIZ_CONSTANTS.TOTAL_QUESTIONS - 1));
    let addedKnowledge = quizState.correctCount * window.QUIZ_CONSTANTS.KNOWLEDGE_PER_CORRECT;
    
    // 2. Check for Diminishing Returns (Consecutive Actions)
    // Logic mirrored from engine.js globalAction
    const isYouth = gameState.difficulty === 'Youth';
    const isEndowed = gameState.difficulty === 'Endowed';
    const actionTaken = gameState.actionsTakenSinceChoice > 0;
    const consecutive = gameState.lastAction === 'review_records';

    // Apply Reductions
    let reductionMsg = "";
    if ((isYouth && actionTaken) || (gameState.difficulty === 'Primary' && consecutive)) {
        addedFaith *= 0.5;
        addedKnowledge *= 0.5;
        reductionMsg = " (Diminished by fatigue)";
    }
    
    // Endowed Hard Mode Check
    if (isEndowed && actionTaken) {
        addedFaith = 0; addedKnowledge = 0;
        reductionMsg = " (No benefit: Action limit reached)";
    }

    // 3. Apply Stats
    gameState.faith += addedFaith;
    gameState.knowledge += addedKnowledge;
    gameState.worldly_influence += window.QUIZ_CONSTANTS.COSTS.worldly;
    gameState.unity += window.QUIZ_CONSTANTS.COSTS.unity;

    // 4. Update Covenant Path
    if (quizState.correctCount >= 3 && !gameState.covenantPathProgress.includes("Records Review")) {
        gameState.covenantPathProgress.push("Records Review");
    }

    // 5. Update State Tracking
    gameState.lastAction = 'review_records';
    gameState.actionsTakenSinceChoice++;

    // 6. Generate Feedback String
    const scorePct = Math.round((quizState.correctCount / window.QUIZ_CONSTANTS.TOTAL_QUESTIONS) * 100);
    
    // Helper to format stats for the feedback string (reusing engine.js logic would be cleaner, but for succinctness we generate manually)
    let statString = `Faith: +${addedFaith.toFixed(1)} | Knowledge: +${addedKnowledge.toFixed(1)} | Worldly: +${window.QUIZ_CONSTANTS.COSTS.worldly} | Unity: ${window.QUIZ_CONSTANTS.COSTS.unity}`;

    let feedbackHTML = `
        <span class="feedback-title">Records Reviewed: ${scorePct}% Correct</span>
        <span class="feedback-stats">${statString}</span>
        <span class="feedback-narrative">You searched the scriptures.${reductionMsg}</span>
    `;

    // 7. Return to Scene
    // We call renderScene on the CURRENT scene, passing the feedback HTML
    renderScene(gameState.currentSceneId, false, feedbackHTML, null);
    
    // Re-enable Undo
    document.getElementById("undo-btn").disabled = false;
}

function toggleGameControls(enable) {
    const ids = ["btn-pray", "btn-study", "btn-service", "undo-btn"];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.disabled = !enable;
    });
}