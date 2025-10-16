import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveExercise = ({ exercise, onComplete, onNext }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleAnswerSelect = (questionId, answerId) => {
    if (showFeedback) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: exercise?.type === 'multiple-choice' ? answerId : 
                   exercise?.type === 'multiple-select' ? 
                   (prev?.[questionId] || [])?.includes(answerId) ?
                   (prev?.[questionId] || [])?.filter(id => id !== answerId) :
                   [...(prev?.[questionId] || []), answerId] : answerId
    }));
  };

  const handleSubmit = () => {
    setAttempts(prev => prev + 1);
    
    let correct = true;
    exercise?.questions?.forEach(question => {
      const userAnswer = selectedAnswers?.[question?.id];
      if (exercise?.type === 'multiple-select') {
        const correctAnswers = question?.options?.filter(opt => opt?.correct)?.map(opt => opt?.id);
        if (!userAnswer || userAnswer?.length !== correctAnswers?.length || 
            !correctAnswers?.every(id => userAnswer?.includes(id))) {
          correct = false;
        }
      } else {
        const correctAnswer = question?.options?.find(opt => opt?.correct)?.id;
        if (userAnswer !== correctAnswer) {
          correct = false;
        }
      }
    });

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      onComplete?.({
        exerciseId: exercise?.id,
        attempts,
        timeSpent,
        score: 100
      });
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const renderQuestion = (question) => {
    const userAnswer = selectedAnswers?.[question?.id];
    
    return (
      <div key={question?.id} className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question?.text}
        </h3>
        {question?.image && (
          <div className="mb-4">
            <img 
              src={question?.image} 
              alt={question?.imageAlt || "Question illustration"}
              className="max-w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}
        <div className="space-y-3">
          {question?.options?.map((option) => {
            const isSelected = exercise?.type === 'multiple-select' ? 
              (userAnswer || [])?.includes(option?.id) : 
              userAnswer === option?.id;
            
            const isCorrect = option?.correct;
            const showCorrectness = showFeedback;

            return (
              <button
                key={option?.id}
                onClick={() => handleAnswerSelect(question?.id, option?.id)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showCorrectness ? 
                    isCorrect ? 'border-success bg-success/10 text-success' : isSelected && !isCorrect ?'border-error bg-error/10 text-error': 'border-gray-200 bg-gray-50': isSelected ?'border-primary bg-primary/10 text-primary': 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    exercise?.type === 'multiple-select' ? 'rounded-sm' : ''
                  } ${
                    showCorrectness ? 
                      isCorrect ? 'border-success bg-success' : isSelected && !isCorrect ?'border-error bg-error': 'border-gray-300': isSelected ?'border-primary bg-primary' : 'border-gray-300'
                  }`}>
                    {isSelected && (
                      <Icon 
                        name={exercise?.type === 'multiple-select' ? "Check" : "Circle"} 
                        size={12} 
                        color="white" 
                      />
                    )}
                    {showCorrectness && isCorrect && !isSelected && (
                      <Icon name="Check" size={12} color="currentColor" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <span className="font-medium">{option?.text}</span>
                    {option?.explanation && showFeedback && (
                      <p className="text-sm mt-2 opacity-80">{option?.explanation}</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{exercise?.title}</h2>
          <p className="text-gray-600 mt-1">{exercise?.description}</p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} />
            <span>{formatTime(timeSpent)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RotateCcw" size={16} />
            <span>{attempts} attempts</span>
          </div>
        </div>
      </div>
      {/* Instructions */}
      {exercise?.instructions && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
            <p className="text-blue-800 text-sm">{exercise?.instructions}</p>
          </div>
        </div>
      )}
      {/* Questions */}
      <div className="mb-6">
        {exercise?.questions?.map(renderQuestion)}
      </div>
      {/* Feedback */}
      {showFeedback && (
        <div className={`rounded-lg p-4 mb-6 ${
          isCorrect ? 'bg-success/10 border border-success/20' : 'bg-error/10 border border-error/20'
        }`}>
          <div className="flex items-start space-x-3">
            <Icon 
              name={isCorrect ? "CheckCircle" : "XCircle"} 
              size={20} 
              className={isCorrect ? 'text-success' : 'text-error'} 
            />
            <div>
              <h4 className={`font-semibold ${isCorrect ? 'text-success' : 'text-error'}`}>
                {isCorrect ? 'Excellent work!' : 'Not quite right'}
              </h4>
              <p className={`text-sm mt-1 ${isCorrect ? 'text-success/80' : 'text-error/80'}`}>
                {isCorrect ? 
                  `You completed this exercise in ${attempts} attempt${attempts > 1 ? 's' : ''} and ${formatTime(timeSpent)}.` :
                  'Review the correct answers above and try again when you\'re ready.'
                }
              </p>
              {exercise?.feedback && (
                <p className="text-sm mt-2 text-gray-700">{exercise?.feedback}</p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!showFeedback && (
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(selectedAnswers)?.length === 0}
              iconName="Send"
              iconPosition="right"
            >
              Submit Answer
            </Button>
          )}
          
          {showFeedback && !isCorrect && (
            <Button
              variant="outline"
              onClick={handleRetry}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Try Again
            </Button>
          )}
          
          {showFeedback && isCorrect && (
            <Button
              onClick={onNext}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue Learning
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-500">
          Question {exercise?.currentQuestion || 1} of {exercise?.totalQuestions || 1}
        </div>
      </div>
    </div>
  );
};

export default InteractiveExercise;