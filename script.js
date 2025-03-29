// AI Prediction System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const analyzeBtn = document.getElementById('analyzeBtn');
    const predictBtn = document.getElementById('predictBtn');
    const reverseBtn = document.getElementById('reverseBtn');
    const analysisResult = document.getElementById('analysisResult');
    const reversalPrediction = document.getElementById('reversalPrediction');
    const lastPrediction = document.getElementById('lastPrediction');
    const confidenceLevel = document.getElementById('confidenceLevel');
    const redCount = document.getElementById('redCount');
    const greenCount = document.getElementById('greenCount');
    const blueCount = document.getElementById('blueCount');
    const colorPattern = document.getElementById('colorPattern');
    const lossHistory = document.getElementById('lossHistory');

    // Prediction data
    let predictionHistory = [];
    let lossRecords = [];
    let currentAnalysis = null;
    let consecutiveLosses = 0;

    // AI Analysis Function
    analyzeBtn.addEventListener('click', function() {
        const pattern = colorPattern.value;
        
        // Simulate AI analysis
        const analysisTime = Math.floor(Math.random() * 1500) + 500;
        analysisResult.innerHTML = `<p class="text-gray-600"><i class="fas fa-spinner fa-spin mr-2"></i>AI is analyzing the pattern...</p>`;
        
        setTimeout(() => {
            const patterns = {
                red: { confidence: Math.floor(Math.random() * 30) + 70, prediction: 'red' },
                green: { confidence: Math.floor(Math.random() * 30) + 70, prediction: 'green' },
                blue: { confidence: Math.floor(Math.random() * 30) + 70, prediction: 'blue' },
                random: { 
                    confidence: Math.floor(Math.random() * 50) + 50,
                    prediction: ['red', 'green', 'blue'][Math.floor(Math.random() * 3)]
                }
            };
            
            currentAnalysis = patterns[pattern];
            
            analysisResult.innerHTML = `
                <p><strong>Pattern Detected:</strong> ${pattern.toUpperCase()}</p>
                <p><strong>AI Confidence:</strong> ${currentAnalysis.confidence}%</p>
                <p><strong>Suggested Action:</strong> ${currentAnalysis.prediction.toUpperCase()} prediction</p>
            `;
        }, analysisTime);
    });

    // Prediction Function
    predictBtn.addEventListener('click', function() {
        if (!currentAnalysis) {
            analysisResult.innerHTML = '<p class="text-red-500">Please analyze a pattern first</p>';
            return;
        }
        
        // Simulate AI prediction with 85% accuracy
        const isCorrect = Math.random() < 0.85;
        const prediction = isCorrect ? currentAnalysis.prediction : 
            ['red', 'green', 'blue'].filter(c => c !== currentAnalysis.prediction)[Math.floor(Math.random() * 2)];
        
        // Record prediction
        predictionHistory.push(prediction);
        lastPrediction.textContent = prediction.toUpperCase();
        confidenceLevel.textContent = `${currentAnalysis.confidence}%`;
        
        // Update counts
        redCount.textContent = predictionHistory.filter(c => c === 'red').length;
        greenCount.textContent = predictionHistory.filter(c => c === 'green').length;
        blueCount.textContent = predictionHistory.filter(c => c === 'blue').length;
        
        // Randomly add some losses (1 in 3 chance)
        if (Math.random() < 0.33) {
            consecutiveLosses++;
            const lossAmount = (Math.random() * 2 + 1).toFixed(1);
            lossRecords.push({
                color: prediction,
                amount: lossAmount
            });
            
            // Keep only last 2 losses
            if (lossRecords.length > 2) {
                lossRecords.shift();
            }
            
            updateLossHistory();
            
            // If two consecutive losses, suggest reversal
            if (consecutiveLosses >= 2) {
                reversalPrediction.innerHTML = `
                    <p class="font-bold">AI SUGGESTS REVERSAL!</p>
                    <p>After ${consecutiveLosses} losses, reverse pattern to ${getOppositeColor(prediction).toUpperCase()}</p>
                `;
            }
        } else {
            consecutiveLosses = 0;
        }
    });

    // Reverse Pattern Function
    reverseBtn.addEventListener('click', function() {
        if (lossRecords.length < 2) {
            reversalPrediction.innerHTML = '<p class="text-red-500">Need at least 2 losses to reverse pattern</p>';
            return;
        }
        
        const lastLoss = lossRecords[lossRecords.length - 1];
        const oppositeColor = getOppositeColor(lastLoss.color);
        
        // Simulate reversal prediction
        currentAnalysis = {
            prediction: oppositeColor,
            confidence: 90  // High confidence for reversal
        };
        
        reversalPrediction.innerHTML = `
            <p><strong>Pattern Reversed:</strong> ${oppositeColor.toUpperCase()}</p>
            <p><strong>AI Confidence:</strong> 90%</p>
        `;
        
        consecutiveLosses = 0;
    });

    // Helper Functions
    function updateLossHistory() {
        lossHistory.innerHTML = '';
        lossRecords.forEach((loss, index) => {
            const lossDiv = document.createElement('div');
            lossDiv.className = 'p-2 bg-red-100 text-red-800 rounded';
            lossDiv.textContent = `Loss ${index + 1}: ${loss.color.toUpperCase()} (${lossAmount}x)`;
            lossHistory.appendChild(lossDiv);
        });
    }

    function getOppositeColor(color) {
        const colors = ['red', 'green', 'blue'];
        return colors.filter(c => c !== color)[Math.floor(Math.random() * 2)];
    }
});