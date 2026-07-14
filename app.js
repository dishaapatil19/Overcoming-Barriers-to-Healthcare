/* WhyNot? Healthcare Awareness Website - Interaction Scripts */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();
    // Initialize core features
    initNavbar();
    initBarrierDetails();
    initQuiz();
    initSimulator();
    initChatbot();
    initExcuseWall();
    initDailyChallenge();
    initScrollCounters();
});
/* ==========================================
   1. Navigation & UI Core
   ========================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightNavLink();
    });
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
    // Active link highlighting on scroll
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 120; // offset
        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}
/* ==========================================
   2. Problem Cards & Drawer Interaction
   ========================================== */
function initBarrierDetails() {
    const barrierCards = document.querySelectorAll('.barrier-card');
    const drawer = document.getElementById('barrier-drawer');
    const drawerClose = document.getElementById('drawer-close');
    
    const drawerTitle = document.getElementById('drawer-title');
    const drawerIconCircle = document.getElementById('drawer-icon-circle');
    const drawerIcon = document.getElementById('drawer-icon');
    const drawerDescription = document.getElementById('drawer-description');
    const drawerTip = document.getElementById('drawer-tip');
    const drawerQuote = document.getElementById('drawer-quote');
    // Data profiles for each barrier
    const barrierData = {
        fear: {
            title: "Fear of Diagnosis",
            description: "Fear is a core survival response, but in healthcare it often triggers 'information avoidance'. People skip screenings because they subconsciously prefer the stress of uncertainty over a confirmed diagnosis, falsely believing they can delay the illness itself by not speaking it into existence.",
            tip: "Shift your focus to control. Finding out early puts you in the driver's seat. Early-stage conditions are far more treatable, less invasive, and cheaper to handle than late-stage emergencies.",
            quote: "Knowledge is not a sentence. It is the coordinates to reclaim your direction.",
            icon: "shield-alert",
            theme: "fear-theme"
        },
        stigma: {
            title: "Social Stigma",
            description: "Societal and cultural settings often associate illness with personal vulnerability, or mental healthcare with instability. Many delay seeking medical or therapeutic support to shield their social reputation or to prevent being labeled as weak by peers and family.",
            tip: "Redefine strength. Taking care of your health is the ultimate form of self-advocacy and social responsibility. Staying healthy ensures you can support those who count on you.",
            quote: "Your health is a physical reality, not a public opinion poll.",
            icon: "users",
            theme: "stigma-theme"
        },
        cost: {
            title: "Cost Concerns",
            description: "Opaque insurance policies, fear of debt, and unexpected medical bills prevent millions from visiting clinic spaces. This financial anxiety causes people to delay seeking help until minor symptoms escalate into emergency conditions.",
            tip: "Protect your budget through clarity. Request self-pay fees, sliding-scale options, or financial aid terms before booking. Modern telehealth options often charge flat, low fees transparently upfront.",
            quote: "A quick preventive checkup is always less costly than an emergency room visit.",
            icon: "dollar-sign",
            theme: "cost-theme"
        },
        time: {
            title: "Lack of Time",
            description: "With work shifts, family chores, and crowded schedules, health visits are frequently treated as non-essential delays. People put off consultations because of long waiting lines and cumbersome booking workflows.",
            tip: "Integrate care seamlessly. Leverage 15-minute telehealth appointments or virtual checkups that can be completed on your phone from the comfort of home or during a lunch break.",
            quote: "If you do not schedule time for your wellness, you will be forced to make time for your illness.",
            icon: "clock",
            theme: "time-theme"
        },
        uncertainty: {
            title: "Denial & Uncertainty",
            description: "Cognitive biases lead us to minimize physical indicators, telling ourselves 'it's just a cold' or 'it will go away'. This buffer of denial protects us from current stress but allows conditions to develop silently.",
            tip: "Run a simple timeline test. Track your symptoms. If a health worry continues for more than 10 to 14 days, it deserves an objective assessment. You don't need a medical crisis to ask a simple question.",
            quote: "Clarity dissolves hesitation. You deserve to know the facts.",
            icon: "help-circle",
            theme: "uncertainty-theme"
        },
        norms: {
            title: "Masculinity Norms",
            description: "Cultural narratives often pressure men to display invulnerability, brush off severe discomfort, and resist doctor consultations. This 'toughing it out' mindset leads to lower rates of early diagnosis and worse long-term outcomes.",
            tip: "View healthcare as routine maintenance. Just like inspecting brakes or updating software, getting professional advice is logical, protective, and essential to safeguard your family's future.",
            quote: "A shield is useless if you refuse to inspect it for stress cracks.",
            icon: "shield",
            theme: "norms-theme"
        }
    };
    barrierCards.forEach(card => {
        card.addEventListener('click', () => {
            const barrierKey = card.getAttribute('data-barrier');
            const data = barrierData[barrierKey];
            
            if (!data) return;
            // Remove active states from other cards
            barrierCards.forEach(c => c.classList.remove('active'));
            // Toggle drawer if clicking active card
            if (drawer.classList.contains('open') && drawer.getAttribute('data-active') === barrierKey) {
                closeDrawer();
            } else {
                // Set active card state
                card.classList.add('active');
                
                // Populate data
                drawerTitle.textContent = data.title;
                drawerDescription.textContent = data.description;
                drawerTip.textContent = data.tip;
                drawerQuote.textContent = data.quote;
                drawer.setAttribute('data-active', barrierKey);
                
                // Reset theme classes on icon circle
                drawerIconCircle.className = "drawer-icon-circle " + data.theme;
                drawerIcon.setAttribute('data-lucide', data.icon);
                
                // Re-render Lucide icons inside the drawer
                lucide.createIcons({
                    attrs: { class: 'lucide' }
                });
                // Open drawer
                drawer.classList.add('open');
                
                // Scroll smoothly to drawer
                setTimeout(() => {
                    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        });
    });
    drawerClose.addEventListener('click', closeDrawer);
    function closeDrawer() {
        drawer.classList.remove('open');
        drawer.removeAttribute('data-active');
        barrierCards.forEach(c => c.classList.remove('active'));
    }
}
/* ==========================================
   3. Multi-Step Quiz & Readiness Score
   ========================================== */
function initQuiz() {
    const quizCard = document.getElementById('quiz-card');
    const quizContent = document.getElementById('quiz-content');
    const quizStepIndicator = document.getElementById('quiz-step-indicator');
    const quizPercent = document.getElementById('quiz-percent');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    
    const quizLoader = document.getElementById('quiz-loader');
    const quizResults = document.getElementById('quiz-results');
    const restartBtn = document.getElementById('btn-restart-quiz');
    // Result elements
    const resultBadge = document.getElementById('barrier-result-badge');
    const resultTitle = document.getElementById('barrier-result-title');
    const resultDesc = document.getElementById('barrier-result-desc');
    const resultActions = document.getElementById('barrier-action-list');
    
    // Meter elements
    const meterFillCircle = document.getElementById('meter-fill-circle');
    const meterScoreNum = document.getElementById('meter-score-num');
    const meterFeedbackText = document.getElementById('meter-feedback-text');
    const quizData = [
        {
            question: "How long have you delayed addressing your concerns?",
            options: [
                { text: "A few days", value: "few-days", scoreWeight: 90 },
                { text: "A few weeks", value: "few-weeks", scoreWeight: 75 },
                { text: "Several months", value: "several-months", scoreWeight: 45 },
                { text: "More than a year", value: "more-year", scoreWeight: 20 }
            ]
        },
        {
            question: "What worries you most about seeking healthcare?",
            options: [
                { text: "Hearing bad news or a serious diagnosis", value: "fear", scoreWeight: -10 },
                { text: "High medical bills and unexpected costs", value: "cost", scoreWeight: -5 },
                { text: "Finding the time and juggling schedules", value: "time", scoreWeight: -5 },
                { text: "What friends, family, or coworkers might think", value: "stigma", scoreWeight: -10 },
                { text: "I'm just not sure my symptoms are serious enough", value: "uncertainty", scoreWeight: -15 }
            ]
        },
        {
            question: "What would make it easiest for you to take action today?",
            options: [
                { text: "Clearer information about symptoms and care paths", value: "uncertainty", scoreWeight: 10 },
                { text: "Affordable consultations and transparent prices", value: "cost", scoreWeight: 5 },
                { text: "Having someone to check in and support me emotionally", value: "fear", scoreWeight: 10 },
                { text: "More convenient bookings and online telehealth options", value: "time", scoreWeight: 5 },
                { text: "A cultural guarantee of judgment-free care spaces", value: "stigma", scoreWeight: 10 }
            ]
        }
    ];
    const barrierDescriptions = {
        "fear": {
            badge: "Fear-Based Avoidance",
            title: "Fear-Based Avoidance",
            desc: "Your responses suggest that anxiety about bad news or the physical reality of a medical checkup is your primary barrier. Fear leads to diagnostic avoidance, but facing it with support can relieve this stress completely.",
            actions: [
                "Book an initial consultation to talk through concerns, not to perform tests.",
                "Bring a trusted family member or close friend to keep you company and write down notes.",
                "Mention your nervousness to the healthcare provider beforehand so they can move slowly."
            ]
        },
        "cost": {
            badge: "Cost-Based Avoidance",
            title: "Cost-Based Avoidance",
            desc: "Your main obstacle appears to be the financial uncertainty of healthcare billing. The anxiety of bills stops you from verifying symptoms early.",
            actions: [
                "Search for community health centers or clinics that offer sliding-scale fees based on income.",
                "Look into fixed-price telehealth consultations that charge a flat fee with zero hidden bills.",
                "Call billing offices before visiting to ask for a transparent cash-pay price estimate."
            ]
        },
        "time": {
            badge: "Time-Based Avoidance",
            title: "Time-Based Avoidance",
            desc: "Your busy schedule, work shifts, or household duties are causing you to push personal health to the bottom of the stack.",
            actions: [
                "Utilize local virtual clinic checkups that take 15 minutes or less via laptop or smartphone.",
                "Choose clinics that offer evening or weekend walk-in options to fit around your job.",
                "Reframe health care: spending 20 minutes on yourself today protects your energy for tomorrow."
            ]
        },
        "stigma": {
            badge: "Stigma-Based Avoidance",
            title: "Stigma-Based Avoidance",
            desc: "Your answers indicate that social expectations, reputation, or cultural norms make seeking medical or emotional support feel uncomfortable.",
            actions: [
                "Select virtual consultations that guarantee 100% private, home-based health support.",
                "Connect with peer resources or community advocacy groups that share similar backgrounds.",
                "Remind yourself that seeking care is a proactive strength, showing leadership over your life."
            ]
        },
        "uncertainty": {
            badge: "Uncertainty-Based Avoidance",
            title: "Uncertainty-Based Avoidance",
            desc: "You tend to downplay symptoms, assuming they aren't serious enough to warrant clinical attention. Denial keeps you in a loop of worry.",
            actions: [
                "Log symptoms in a calendar note: record duration, severity, and how it affects daily energy.",
                "If a warning sign continues past two weeks, get it assessed as a proactive sanity check.",
                "Remember, doctors are happy to rule out issues; you don't need a medical crisis to consult them."
            ]
        }
    };
    let currentStep = 0;
    let userSelections = [];
    // Start rendering quiz
    renderStep();
    function renderStep() {
        if (currentStep >= quizData.length) {
            showQuizResults();
            return;
        }
        const stepData = quizData[currentStep];
        
        // Update header details
        const progressNum = currentStep + 1;
        const progressPercent = Math.round((currentStep / quizData.length) * 100);
        
        quizStepIndicator.textContent = `Question ${progressNum} of ${quizData.length}`;
        quizPercent.textContent = `${progressPercent}% Complete`;
        quizProgressFill.style.width = `${progressPercent}%`;
        // Render HTML content
        let optionsHTML = '';
        stepData.options.forEach((opt, idx) => {
            const letter = String.fromCharCode(65 + idx); // A, B, C, D...
            optionsHTML += `
                <button class="quiz-opt-btn" data-value="${opt.value}" data-score="${opt.scoreWeight}">
                    <span class="opt-letter">${letter}</span>
                    <span class="opt-text">${opt.text}</span>
                    <i data-lucide="chevron-right" class="opt-chevron"></i>
                </button>
            `;
        });
        quizContent.innerHTML = `
            <div class="quiz-step active">
                <h3 class="quiz-question">${stepData.question}</h3>
                <div class="quiz-options">
                    ${optionsHTML}
                </div>
            </div>
        `;
        lucide.createIcons();
        attachOptionListeners();
    }
    function attachOptionListeners() {
        const optionButtons = quizContent.querySelectorAll('.quiz-opt-btn');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const value = btn.getAttribute('data-value');
                const score = parseInt(btn.getAttribute('data-score'));
                
                userSelections.push({ value, score });
                currentStep++;
                
                // Add tiny delay for satisfying tactile click
                btn.style.borderColor = "var(--color-primary-blue)";
                btn.style.backgroundColor = "#FFFFFF";
                
                setTimeout(() => {
                    renderStep();
                }, 200);
            });
        });
    }
    function showQuizResults() {
        // Show loader first
        quizContent.classList.add('hidden');
        quizStepIndicator.parentElement.parentElement.classList.add('hidden');
        quizLoader.classList.remove('hidden');
        // Math for calculation
        // Q1 answer base
        const delaySelection = userSelections[0];
        let readinessScore = delaySelection.score; // base: 90, 75, 45, 20
        
        // Worry adjustment (Q2 selection)
        const worrySelection = userSelections[1];
        readinessScore += worrySelection.score; // -10, -5, -15...
        
        // Support adjustment (Q3 selection)
        const supportSelection = userSelections[2];
        readinessScore += supportSelection.score; // +10, +5...
        
        // Clamp between 15 and 95
        readinessScore = Math.min(Math.max(readinessScore, 15), 95);
        // Determine primary barrier profile (we evaluate Q2 & Q3 answers)
        // Q2 indicates worry (barrier). Q3 indicates helper preference.
        // We'll prioritize the category of Q2 (the core worry)
        const primaryBarrierKey = worrySelection.value;
        const profile = barrierDescriptions[primaryBarrierKey] || barrierDescriptions['fear'];
        setTimeout(() => {
            // Hide Loader
            quizLoader.classList.add('hidden');
            quizResults.classList.remove('hidden');
            // Populate profile
            resultBadge.textContent = profile.badge;
            resultTitle.textContent = profile.title;
            resultDesc.textContent = profile.desc;
            
            // Populate list actions
            resultActions.innerHTML = '';
            profile.actions.forEach(action => {
                const li = document.createElement('li');
                li.textContent = action;
                resultActions.appendChild(li);
            });
            // Trigger meter animations
            animateReadinessMeter(readinessScore);
        }, 1500);
    }
    function animateReadinessMeter(score) {
        // SVG dash calculation: radius is 85. Circumference = 2 * PI * r = ~534
        const circumference = 534;
        const offset = circumference - (score / 100) * circumference;
        
        // Animate stroke
        meterFillCircle.style.strokeDashoffset = offset;
        
        // Animate counter text
        let count = 0;
        const counterDuration = 1500; // ms
        const intervalTime = 30; // ms
        const steps = counterDuration / intervalTime;
        const increment = score / steps;
        
        const textTimer = setInterval(() => {
            count += increment;
            if (count >= score) {
                meterScoreNum.textContent = Math.round(score);
                clearInterval(textTimer);
            } else {
                meterScoreNum.textContent = Math.round(count);
            }
        }, intervalTime);
        // Provide feedback quote
        let feedback = "";
        if (score >= 75) {
            feedback = '"You are very close to taking action. Set a tiny micro-goal today."';
        } else if (score >= 45) {
            feedback = '"You are closer to taking action than you think. Focus on clarity."';
        } else {
            feedback = '"Seeking care feels heavy right now. Focus on emotional safety first."';
        }
        meterFeedbackText.textContent = feedback;
    }
    // Restart Quiz event
    restartBtn.addEventListener('click', () => {
        currentStep = 0;
        userSelections = [];
        quizResults.classList.add('hidden');
        quizContent.classList.remove('hidden');
        quizStepIndicator.parentElement.parentElement.classList.remove('hidden');
        
        // Reset progress bar
        quizProgressFill.style.width = '33%';
        
        // Reset Meter circle SVG
        meterFillCircle.style.strokeDashoffset = 534;
        meterScoreNum.textContent = '0';
        
        renderStep();
    });
}
/* ==========================================
   4. Future Impact Simulator Timeline
   ========================================== */
function initSimulator() {
    const slider = document.getElementById('sim-slider');
    const pathIgnore = document.getElementById('path-ignore');
    const pathAction = document.getElementById('path-action');
    const label = document.getElementById('slider-split-label');
    const trackHighlight = document.querySelector('.slider-track-highlight');
    // Run positioning once
    updateSimulator(slider.value);
    slider.addEventListener('input', (e) => {
        const val = e.target.value;
        updateSimulator(val);
    });
    function updateSimulator(val) {
        // Adjust track highlight bar width/position
        // val ranges from 0 to 100.
        trackHighlight.style.width = `${val}%`;
        // Map opacity of Path A (Ignore) and Path B (Action)
        // At 0: Path A fully active (1.0), Path B dimmed (0.15)
        // At 100: Path B fully active (1.0), Path A dimmed (0.15)
        const opacityA = Math.max(0.18, (100 - val) / 100);
        const opacityB = Math.max(0.18, val / 100);
        // Apply opacities to timeline item lists
        pathIgnore.style.opacity = opacityA;
        pathAction.style.opacity = opacityB;
        // Apply scale/highlight classes for clean contrast
        if (val < 40) {
            pathIgnore.classList.add('highlighted');
            pathIgnore.classList.remove('dimmed');
            pathAction.classList.add('dimmed');
            pathAction.classList.remove('highlighted');
            label.textContent = "Path of Avoidance";
            label.style.backgroundColor = "rgba(232, 74, 95, 0.15)";
            label.style.color = "#E84A5F";
        } else if (val > 60) {
            pathAction.classList.add('highlighted');
            pathAction.classList.remove('dimmed');
            pathIgnore.classList.add('dimmed');
            pathIgnore.classList.remove('highlighted');
            label.textContent = "Path of Empowerment";
            label.style.backgroundColor = "rgba(78, 205, 196, 0.15)";
            label.style.color = "var(--color-primary-teal-dark)";
        } else {
            // Neutral balance
            pathIgnore.classList.remove('highlighted', 'dimmed');
            pathAction.classList.remove('highlighted', 'dimmed');
            pathIgnore.style.opacity = 1;
            pathAction.style.opacity = 1;
            label.textContent = "Balanced Outlook";
            label.style.backgroundColor = "rgba(91, 141, 239, 0.1)";
            label.style.color = "var(--color-primary-blue-dark)";
        }
    }
}
/* ==========================================
   5. Anonymous Chatbot Companion
   ========================================== */
function initChatbot() {
    const chatFeed = document.getElementById('chat-feed');
    const chatPills = document.getElementById('chat-pills');
    const chatInput = document.getElementById('chat-input');
    const chatForm = document.getElementById('chat-form');
    const clearChatBtn = document.getElementById('btn-clear-chat');
    const typingIndicator = document.getElementById('chat-typing-indicator');
    // Dialogue database
    const dialogReplies = {
        scared: "I completely understand. Fear of bad news or diagnosis is extremely common. Many people choose to delay checkups because they subconsciously think that avoiding the appointment keeps the illness away. The reality is that knowing early gives you full control. Doctors are there to guide you, not judge. Would you like to read about a small Daily Challenge to ease your mind?",
        time: "Finding a free hour can feel impossible with a busy job and family. However, delaying care means small, easily treatable symptoms can grow into complicated emergencies that will take weeks of your time later. Try looking into telehealth: many online primary care consultations take less than 15 minutes and can be scheduled on your breaks.",
        expensive: "Medical bills are a source of high stress. The good news is that you have options. Many local clinics offer sliding scales based on income, and flat-fee virtual consultations disclose pricing transparently upfront. A tiny preventive check is always cheaper than a trip to the emergency room down the line.",
        embarrassed: "It is normal to feel nervous or embarrassed about speaking to someone about personal symptoms. But medical experts see thousands of bodies and concerns every month. They are trained to discuss these matters objectively without judgment. Acknowledge your hesitation; sharing is the bravest step you can take."
    };
    // Chat pills listener
    chatPills.querySelectorAll('.chat-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const promptKey = pill.getAttribute('data-prompt');
            const responseText = dialogReplies[promptKey];
            const pillText = pill.textContent;
            if (responseText) {
                // Disable all pills temporarily to prevent double click spam
                togglePillsState(true);
                
                // Add user message
                appendMessage(pillText, 'user-message');
                
                // Trigger typing & reply
                simulateBotReply(responseText);
            }
        });
    });
    // Form text submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;
        // Reset input field
        chatInput.value = '';
        togglePillsState(true);
        // Add user text
        appendMessage(text, 'user-message');
        // Evaluate text keywords
        let replyText = "Thank you for sharing that with me. It takes real courage to put your concerns into words. Remember, you don't need to resolve everything today. What is one tiny, low-pressure step—like jotting down your symptoms in a notebook—that you feel ready to try?";
        
        const lowerText = text.toLowerCase();
        if (lowerText.includes('scared') || lowerText.includes('fear') || lowerText.includes('afraid') || lowerText.includes('nervous') || lowerText.includes('anxious') || lowerText.includes('panic')) {
            replyText = dialogReplies.scared;
        } else if (lowerText.includes('cost') || lowerText.includes('money') || lowerText.includes('expensive') || lowerText.includes('bill') || lowerText.includes('insurance') || lowerText.includes('price') || lowerText.includes('afford')) {
            replyText = dialogReplies.expensive;
        } else if (lowerText.includes('time') || lowerText.includes('busy') || lowerText.includes('schedule') || lowerText.includes('work') || lowerText.includes('job') || lowerText.includes('hours')) {
            replyText = dialogReplies.time;
        } else if (lowerText.includes('embarrass') || lowerText.includes('shame') || lowerText.includes('stupid') || lowerText.includes('silly') || lowerText.includes('weird') || lowerText.includes('ashamed')) {
            replyText = dialogReplies.embarrassed;
        }
        // Trigger bot reply
        simulateBotReply(replyText);
    });
    // Clear feed
    clearChatBtn.addEventListener('click', () => {
        // Keep only greeting and clear the rest
        chatFeed.innerHTML = `
            <div class="chat-message bot-message">
                <div class="chat-message-text">
                    Hello! I'm here to support you in overcoming whatever stops you from addressing your health. How are you feeling about seeking care?
                </div>
                <span class="chat-message-time">Just now</span>
            </div>
            <div class="chat-message bot-message typing-indicator hidden" id="chat-typing-indicator">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        togglePillsState(false);
    });
    function appendMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${type}`;
        
        // Format date/time
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        msgDiv.innerHTML = `
            <div class="chat-message-text">${text}</div>
            <span class="chat-message-time">${timeStr}</span>
        `;
        
        // Insert right before typing indicator
        chatFeed.insertBefore(msgDiv, document.getElementById('chat-typing-indicator'));
        scrollChatToBottom();
    }
    function simulateBotReply(replyText) {
        const indicator = document.getElementById('chat-typing-indicator');
        indicator.classList.remove('hidden');
        scrollChatToBottom();
        // Delay typing indicator to simulate thinking
        setTimeout(() => {
            indicator.classList.add('hidden');
            
            // Create target bot message container
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot-message';
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            msgDiv.innerHTML = `
                <div class="chat-message-text"></div>
                <span class="chat-message-time">${timeStr}</span>
            `;
            chatFeed.insertBefore(msgDiv, indicator);
            scrollChatToBottom();
            // Type out character by character
            const textContainer = msgDiv.querySelector('.chat-message-text');
            let idx = 0;
            const typingSpeed = 12; // ms per char
            function typeChar() {
                if (idx < replyText.length) {
                    textContainer.textContent += replyText.charAt(idx);
                    idx++;
                    scrollChatToBottom();
                    setTimeout(typeChar, typingSpeed);
                } else {
                    // Done typing
                    togglePillsState(false);
                }
            }
            typeChar();
        }, 1200);
    }
    function togglePillsState(disable) {
        chatPills.querySelectorAll('.chat-pill').forEach(pill => {
            if (disable) {
                pill.classList.add('disabled');
            } else {
                pill.classList.remove('disabled');
            }
        });
    }
    function scrollChatToBottom() {
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }
}
/* ==========================================
   6. Wall of Excuses Interaction
   ========================================== */
function initExcuseWall() {
    const wallGrid = document.getElementById('wall-grid');
    const bricks = document.querySelectorAll('.excuse-brick');
    const counter = document.getElementById('excuses-counter');
    const successBanner = document.getElementById('wall-success-banner');
    const resetBtn = document.getElementById('btn-reset-wall');
    let excusesCount = bricks.length;
    bricks.forEach(brick => {
        brick.addEventListener('click', () => {
            if (brick.classList.contains('shattering')) return;
            brick.classList.add('shattering');
            excusesCount--;
            counter.textContent = excusesCount;
            // Remove from grid completely after animation plays
            setTimeout(() => {
                brick.style.display = 'none';
                
                // Show resolution banner if all bricks shattered
                if (excusesCount === 0) {
                    wallGrid.classList.add('hidden');
                    successBanner.classList.remove('hidden');
                    
                    // Award points as reward!
                    addCouragePoints(100);
                }
            }, 400);
        });
    });
    resetBtn.addEventListener('click', () => {
        excusesCount = bricks.length;
        counter.textContent = excusesCount;
        
        bricks.forEach(brick => {
            brick.classList.remove('shattering');
            brick.style.display = '';
        });
        wallGrid.classList.remove('hidden');
        successBanner.classList.add('hidden');
    });
}
/* ==========================================
   7. Daily Courage Challenge & LocalStorage Points
   ========================================== */
function initDailyChallenge() {
    const challengeText = document.getElementById('challenge-task-text');
    const completeBtn = document.getElementById('btn-complete-challenge');
    const completedState = document.getElementById('challenge-completed-state');
    const challengePointsDisp = document.getElementById('challenge-courage-points');
    const challenges = [
        "Write down your top 3 physical or symptoms worries in a private notes app. Don't book anything, just externalize them.",
        "Search online and bookmark the website of the nearest, highly-rated primary care clinic in your area.",
        "Take 5 minutes to learn about the benefits of yearly preventive health checkups and vaccinations.",
        "Ask a trusted relative or friend about their recent doctor checkup experience and how they felt about it.",
        "List three personal, emotional reasons why protecting your long-term health matters to your future plans."
    ];
    // Load Courage points
    let points = parseInt(localStorage.getItem('courage_points')) || 0;
    updatePointsUI(points);
    // Pick challenge of the day based on current calendar date
    const dateNum = new Date().getDate();
    const activeChallengeIdx = dateNum % challenges.length;
    challengeText.textContent = challenges[activeChallengeIdx];
    // Check check-in lock state
    const todayStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    const lastCompletedDate = localStorage.getItem('last_completed_challenge_date');
    if (lastCompletedDate === todayStr) {
        // Already completed
        completeBtn.classList.add('hidden');
        completedState.classList.remove('hidden');
    }
    completeBtn.addEventListener('click', () => {
        // Add 50 points
        addCouragePoints(50);
        
        // Save date to lock reuse
        localStorage.setItem('last_completed_challenge_date', todayStr);
        // Slide animation swap
        completeBtn.classList.add('hidden');
        completedState.classList.remove('hidden');
    });
    // Share points function to global scope
    window.addCouragePoints = function(value) {
        let currentPoints = parseInt(localStorage.getItem('courage_points')) || 0;
        currentPoints += value;
        localStorage.setItem('courage_points', currentPoints);
        
        // Trigger points UI update
        updatePointsUI(currentPoints);
        // Pulse notification badge in navbar
        const badge = document.getElementById('courage-badge');
        badge.classList.add('pulse');
        setTimeout(() => {
            badge.classList.remove('pulse');
        }, 1000);
    };
    function updatePointsUI(val) {
        const navPoints = document.getElementById('nav-courage-points');
        navPoints.textContent = val;
        challengePointsDisp.textContent = val;
    }
}
/* ==========================================
   8. Stats Intersection Observer Counters
   ========================================== */
function initScrollCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    const numbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        threshold: 0.25,
        rootMargin: "0px"
    };
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all numbers within the intersecting area and animate
                numbers.forEach(num => {
                    const targetStr = num.getAttribute('data-target');
                    const targetVal = parseFloat(targetStr);
                    const isFloat = targetStr.includes('.');
                    
                    animateCount(num, targetVal, isFloat);
                });
                
                // Stop observing once counter triggers
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Observe parent grid
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }
    function animateCount(elem, target, isFloat) {
        let count = 0;
        const duration = 2000; // ms
        const steps = 60;
        const intervalTime = duration / steps;
        const increment = target / steps;
        const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
                elem.textContent = isFloat ? target.toFixed(1) : Math.round(target);
                clearInterval(timer);
            } else {
                elem.textContent = isFloat ? count.toFixed(1) : Math.round(count);
            }
        }, intervalTime);
    }
}
