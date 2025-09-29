import React, { useState, useEffect } from 'react';
import { Code, Trophy, Flame, ChevronRight, RotateCcw, Lightbulb, Check, Lock } from 'lucide-react';

const PyLingo = () => {
  const levels = [
    {
      id: 1,
      title: "Hello World",
      description: "Start your Python journey by printing your first message!",
      task: "Print 'Hello, World!' to the console",
      expectedOutput: "Hello, World!",
      hint: "Use the print() function with your text in quotes",
      explanation: "The print() function displays output to the console. Text strings must be enclosed in quotes.",
      starterCode: "# Write your code here\n"
    },
    {
      id: 2,
      title: "Variables",
      description: "Learn to store and use data in variables",
      task: "Create a variable named 'name' with your name and print it",
      expectedOutput: (code) => code.includes('name') && code.includes('=') && code.includes('print'),
      hint: "Use the format: name = 'YourName' then print(name)",
      explanation: "Variables store data. Use = to assign values. Python supports strings (text), numbers, and more.",
      starterCode: "# Create a variable and print it\n"
    },
    {
      id: 3,
      title: "Math Operations",
      description: "Perform calculations using Python operators",
      task: "Calculate and print the result of 15 + 27",
      expectedOutput: "42",
      hint: "Use print(15 + 27) to display the result",
      explanation: "Python can perform math operations: + (add), - (subtract), * (multiply), / (divide)",
      starterCode: "# Calculate 15 + 27\n"
    },
    {
      id: 4,
      title: "String Concatenation",
      description: "Combine text strings together",
      task: "Print 'Python' and 'Rocks' together with a space",
      expectedOutput: "Python Rocks",
      hint: "Use + to join strings, or use print('Python', 'Rocks')",
      explanation: "Strings can be combined using + or by passing multiple arguments to print()",
      starterCode: "# Combine strings\n"
    },
    {
      id: 5,
      title: "User Input",
      description: "Get input from users interactively",
      task: "For this level, just print: Hello, User!",
      expectedOutput: "Hello, User!",
      hint: "Use print('Hello, User!')",
      explanation: "The input() function gets user input, but for this exercise, just print the greeting.",
      starterCode: "# Print a greeting\n"
    },
    {
      id: 6,
      title: "If Statements",
      description: "Make decisions in your code",
      task: "Check if 10 > 5 and print 'True' if it is",
      expectedOutput: "True",
      hint: "Use: if 10 > 5: print('True')",
      explanation: "If statements execute code only when a condition is True. Use proper indentation!",
      starterCode: "# Use an if statement\n"
    },
    {
      id: 7,
      title: "Else Statements",
      description: "Handle alternative conditions",
      task: "Check if 3 > 5, print 'Greater' if true, else print 'Smaller'",
      expectedOutput: "Smaller",
      hint: "Use if/else with proper indentation after each colon",
      explanation: "Else provides an alternative when the if condition is False",
      starterCode: "# Use if/else\n"
    },
    {
      id: 8,
      title: "For Loops",
      description: "Repeat actions multiple times",
      task: "Print numbers 1, 2, 3 each on a new line using a loop",
      expectedOutput: (code) => {
        const lines = code.split('\n').filter(l => l.trim());
        return code.includes('for') && code.includes('range');
      },
      hint: "Use: for i in range(1, 4): print(i)",
      explanation: "For loops iterate over sequences. range(1,4) generates numbers 1,2,3",
      starterCode: "# Create a for loop\n"
    },
    {
      id: 9,
      title: "While Loops",
      description: "Loop while a condition is true",
      task: "Print 'Count: 1', 'Count: 2', 'Count: 3' using a while loop",
      expectedOutput: (code) => code.includes('while') && code.includes('Count:'),
      hint: "Start with count = 1, then while count <= 3: print(f'Count: {count}'), count += 1",
      explanation: "While loops continue until their condition becomes False. Remember to update the counter!",
      starterCode: "# Create a while loop\n"
    },
    {
      id: 10,
      title: "Lists",
      description: "Store multiple values in a single variable",
      task: "Create a list with 'apple', 'banana', 'cherry' and print it",
      expectedOutput: (code) => code.includes('[') && code.includes('apple') && code.includes('banana'),
      hint: "Use: fruits = ['apple', 'banana', 'cherry'] then print(fruits)",
      explanation: "Lists store multiple items in order. Create them using square brackets []",
      starterCode: "# Create and print a list\n"
    },
    {
      id: 11,
      title: "List Indexing",
      description: "Access specific items in a list",
      task: "Create a list ['red', 'green', 'blue'] and print the first item",
      expectedOutput: "red",
      hint: "Use colors[0] to get the first item (indexing starts at 0)",
      explanation: "Access list items using [index]. Python uses 0-based indexing.",
      starterCode: "# Access list items\n"
    },
    {
      id: 12,
      title: "Dictionaries",
      description: "Store key-value pairs",
      task: "Create a dict with key 'name' and value 'Python', then print the value",
      expectedOutput: "Python",
      hint: "Use: lang = {'name': 'Python'} then print(lang['name'])",
      explanation: "Dictionaries store key-value pairs. Access values using keys in brackets.",
      starterCode: "# Create and use a dictionary\n"
    },
    {
      id: 13,
      title: "Functions",
      description: "Create reusable blocks of code",
      task: "Define a function 'greet' that prints 'Hello!' and call it",
      expectedOutput: "Hello!",
      hint: "Use: def greet(): print('Hello!') then greet()",
      explanation: "Functions are defined with 'def' and can be called multiple times",
      starterCode: "# Define and call a function\n"
    },
    {
      id: 14,
      title: "Function Parameters",
      description: "Pass data to functions",
      task: "Create a function 'add' that takes two numbers and prints their sum. Call it with 5 and 7",
      expectedOutput: "12",
      hint: "def add(a, b): print(a + b), then add(5, 7)",
      explanation: "Parameters let functions accept input values and use them in calculations",
      starterCode: "# Function with parameters\n"
    },
    {
      id: 15,
      title: "Return Values",
      description: "Make functions return values",
      task: "Create a function 'multiply' that returns a*b. Call it with 6 and 7 and print the result",
      expectedOutput: "42",
      hint: "def multiply(a, b): return a * b, then print(multiply(6, 7))",
      explanation: "Return statements send values back from functions to be used elsewhere",
      starterCode: "# Function with return\n"
    }
  ];

  const [currentLevel, setCurrentLevel] = useState(1);
  const [code, setCode] = useState(levels[0].starterCode);
  const [output, setOutput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [completedLevels, setCompletedLevels] = useState(new Set());
  const [streak, setStreak] = useState(0);
  const [lastCorrect, setLastCorrect] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLevelSelector, setShowLevelSelector] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const level = levels[currentLevel - 1];
    setCode(level.starterCode);
    setOutput('');
    setShowHint(false);
    setShowSuccess(false);
  }, [currentLevel]);

  const checkCode = async () => {
    const level = levels[currentLevel - 1];
    setIsChecking(true);
    setOutput('Evaluating your code...');

    // We use a server-side endpoint (/api/evaluate) to keep the Gemini API key secret.
    // The server will call Gemini and return a parsed JSON evaluation.

    try {
      // POST to our serverless endpoint which holds the secret key in the server environment
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: level.task, expectedOutput: typeof level.expectedOutput === 'function' ? 'See task requirements' : level.expectedOutput, code })
      });

      let result;
      try {
        result = await response.json();
      } catch (parseErr) {
        // If response isn't valid JSON, try reading text for debugging
        const txt = await response.text();
        throw new Error('Invalid JSON from /api/evaluate. Raw response: ' + txt);
      }

      if (result.error) {
        // If server returned an error with rawText, include that for debugging
        const errMsg = result.error === 'model_text' && result.rawText ? result.rawText : result.error;
        throw new Error(errMsg);
      }

      if (result.correct) {
        setOutput('✓ Correct! Well done!\n\n' + result.feedback);
        setCompletedLevels(prev => new Set([...prev, currentLevel]));
        setShowSuccess(true);
        if (lastCorrect) {
          setStreak(prev => prev + 1);
        } else {
          setStreak(1);
          setLastCorrect(true);
        }

        // Auto-advance to the next level after a brief delay
        setTimeout(() => {
          if (currentLevel < levels.length) {
            setCurrentLevel(prev => prev + 1);
          }
        }, 1500);
      } else {
        setOutput(`✗ Not quite right.\n\n${result.feedback}\n\nHint/Explanation: ${result.suggestion || level.explanation}`);
        setStreak(0);
        setLastCorrect(false);
      }

    } catch (error) {
      console.error('Gemini API Error:', error);
      setOutput(`Error evaluating code: ${error.message}\n\nPlease ensure your code is valid Python syntax and that the Gemini API key is configured.`);
    } finally {
      setIsChecking(false);
    }
  };

  const resetLevel = () => {
    const level = levels[currentLevel - 1];
    setCode(level.starterCode);
    setOutput('');
    setShowHint(false);
  };

  const selectLevel = (levelNum) => {
    if (levelNum <= 1 || completedLevels.has(levelNum - 1)) {
      setCurrentLevel(levelNum);
      setShowLevelSelector(false);
    }
  };

  const level = levels[currentLevel - 1];
  const progress = (completedLevels.size / levels.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">PyLingo</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-700">{streak} Streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">{completedLevels.size}/{levels.length}</span>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Level Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Level {currentLevel}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800">{level.title}</h2>
                  {completedLevels.has(currentLevel) && (
                    <Check className="w-6 h-6 text-green-500" />
                  )}
                </div>
                <button
                  onClick={() => setShowLevelSelector(!showLevelSelector)}
                  className="btn px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
                >
                  Select Level
                </button>
              </div>
              <p className="text-gray-600 mb-3">{level.description}</p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="font-semibold text-blue-900">Task: {level.task}</p>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <span className="text-gray-300 text-sm font-medium">Code Editor</span>
                <button
                  onClick={resetLevel}
                  className="btn flex items-center gap-1 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 focus:outline-none resize-none"
                style={{ tabSize: 4 }}
                spellCheck="false"
              />
              <div className="bg-gray-800 px-4 py-3 flex gap-3">
                <button
                  onClick={checkCode}
                  disabled={isChecking}
                  className="btn flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-full font-semibold"
                >
                  {isChecking ? 'Checking...' : 'Run Code'}
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="btn flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold"
                >
                  <Lightbulb className="w-4 h-4" />
                  {showHint ? 'Hide' : 'Show'} Hint
                </button>
              </div>
            </div>

            {/* Output */}
            {output && (
              <div className={`rounded-lg shadow-lg p-6 ${showSuccess ? 'bg-green-50' : 'bg-white'}`}>
                <h3 className="font-bold text-lg mb-2 text-gray-800">Output:</h3>
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700">{output}</pre>
              </div>
            )}

            {/* Hint */}
            {showHint && (
              <div className="bg-yellow-50 rounded-lg shadow-lg p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-yellow-900">Hint:</h3>
                    <p className="text-yellow-800">{level.hint}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Level Selector */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Course Progress</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {levels.map((lvl) => {
                  const isUnlocked = lvl.id === 1 || completedLevels.has(lvl.id - 1);
                  const isCompleted = completedLevels.has(lvl.id);
                  const isCurrent = lvl.id === currentLevel;
                  
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => isUnlocked && selectLevel(lvl.id)}
                      disabled={!isUnlocked}
                      className={`btn w-full text-left p-3 rounded-lg transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md'
                          : isCompleted
                          ? 'bg-green-100 hover:bg-green-200 text-green-900'
                          : isUnlocked
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Level {lvl.id}</span>
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : !isUnlocked ? (
                          <Lock className="w-5 h-5" />
                        ) : null}
                      </div>
                      <span className="text-sm opacity-90">{lvl.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Completion Badge */}
        {completedLevels.size === levels.length && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
              <p className="text-gray-600 mb-4">You've completed all 15 levels of PyLingo!</p>
              <p className="text-2xl font-bold text-blue-600">🎉 Python Master! 🎉</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PyLingo;