import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Volume2, Eye, EyeOff, Keyboard } from 'lucide-react';
import { vocabularyData } from '@/data/vocabulary';
import { frenchVocabularyData } from '@/data/french-vocabulary';
import { japaneseVocabulary } from '@/data/japanese-vocabulary';
import { SUPPORTED_LANGUAGES } from '@/config/languages';
import LanguageKeyboard from './LanguageKeyboard';

const getKeyboardLayout = (language) => {
  const keyboardMap = SUPPORTED_LANGUAGES.find(lang => lang.code === language)?.keyboardMap || {};
  
  // 将键盘映射转换为布局数组
  const layout = [
    // 第一行
    Object.entries(keyboardMap)
      .filter(([source]) => 'qwertyuiop[]'.includes(source))
      .map(([source, target]) => ({ source, target })),
    // 第二行
    Object.entries(keyboardMap)
      .filter(([source]) => "asdfghjkl;'".includes(source))
      .map(([source, target]) => ({ source, target })),
    // 第三行
    Object.entries(keyboardMap)
      .filter(([source]) => 'zxcvbnm,.'.includes(source))
      .map(([source, target]) => ({ source, target }))
  ];

  return layout;
};

const LanguageTrainer = () => {
  const [currentLanguage, setCurrentLanguage] = useState(SUPPORTED_LANGUAGES[0].code);
  const [currentLesson, setCurrentLesson] = useState('');
  const [currentWord, setCurrentWord] = useState(null);
  const [input, setInput] = useState('');
  const [lastPressedKey, setLastPressedKey] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showExample, setShowExample] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showOriginal, setShowOriginal] = useState(true);
  const inputRef = useRef(null);
  const [showKeyboard, setShowKeyboard] = useState(true);

  // 添加 resetWord 函数
  const resetWord = () => {
    setCurrentWord(getRandomWord());
    setInput('');
    setIsCorrect(null);
    setShowExample(false);
    setCursorPosition(0);
    // 重置后自动聚焦输入框
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // 在组件挂载和 currentLesson 改变时重置单词
  useEffect(() => {
    resetWord();
  }, [currentLesson, currentLanguage]);

  const getVocabularyData = () => {
    switch (currentLanguage) {
      case 'uk':
        return vocabularyData;
      case 'fr':
        return frenchVocabularyData;
      case 'ja':
        return japaneseVocabulary;
      default:
        return vocabularyData;
    }
  };

  const getCurrentKeyboardMap = () => {
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage);
    return language?.keyboardMap || {};
  };

  // 获取当前语言的所有课程
  const getLessons = () => {
    const vocabularyData = getVocabularyData();
    return Object.keys(vocabularyData);
  };

  // 在组件挂载和语言切换时设置默认课程
  useEffect(() => {
    const lessons = getLessons();
    if (lessons.length > 0 && !lessons.includes(currentLesson)) {
      setCurrentLesson(lessons[0]);
    }
  }, [currentLanguage]);

  // 修改课程选择器的渲染
  const renderLessonSelector = () => {
    const lessons = getLessons();
    return (
      <div className="relative">
        <select
          value={currentLesson}
          onChange={(e) => setCurrentLesson(e.target.value)}
          className="w-48 px-4 py-2 bg-white border-2 border-gray-200 
                    rounded-lg appearance-none cursor-pointer
                    focus:outline-none focus:border-orange-400
                    hover:border-gray-300 transition-colors"
        >
          {lessons.map((lesson) => (
            <option key={lesson} value={lesson}>
              {lesson}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
    );
  };

  // 修改 getRandomWord 函数，添加安全检查
  const getRandomWord = () => {
    const vocabularyData = getVocabularyData();
    if (!vocabularyData || !currentLesson || !vocabularyData[currentLesson]) {
      console.warn(`No vocabulary data found for lesson: ${currentLesson}`);
      return null;
    }
    const words = vocabularyData[currentLesson];
    return words[Math.floor(Math.random() * words.length)];
  };

  const checkInput = () => {
    const correct = currentWord && input === currentWord[currentLanguage];
    setIsCorrect(correct);
    if (correct) {
      setShowExample(true);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    const keyboardMap = getCurrentKeyboardMap();
    
    if (key === 'backspace') {
      e.preventDefault();
      setInput(prev => prev.slice(0, -1));
      setLastPressedKey(null);
      setCursorPosition(prev => Math.max(0, prev - 1));
    } else if (key in keyboardMap) {
      e.preventDefault();
      const mappedChar = keyboardMap[key];
      setInput(prev => prev + mappedChar);
      setLastPressedKey(mappedChar);
      setCursorPosition(prev => prev + 1);
      setTimeout(() => setLastPressedKey(null), 300);
    } else if (key === 'enter') {
      e.preventDefault();
      // 如果已经正确了，按回车就去下一个
      if (isCorrect) {
        resetWord();
      } else {
        // 否则检查答案
        checkInput();
      }
    }
  };

  const handleSelect = (e) => {
    setCursorPosition(e.target.selectionStart);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
  };

  const toggleKeyboard = () => {
    setShowKeyboard(!showKeyboard);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-6">
      <CardContent>
        <div className="flex justify-between mb-6">
          <div className="flex gap-4">
            <div className="relative">
              <select 
                value={currentLanguage}
                onChange={(e) => {
                  setCurrentLanguage(e.target.value);
                  resetWord();
                }}
                className="w-48 px-4 py-2 bg-white border-2 border-gray-200 
                           rounded-lg appearance-none cursor-pointer
                           focus:outline-none focus:border-orange-400
                           hover:border-gray-300 transition-colors"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {renderLessonSelector()}
          </div>

          <div className="flex gap-2">
            <button
              onClick={toggleKeyboard}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 
                       transition-colors text-sm"
              title={showKeyboard ? "隐藏键盘" : "显示键盘"}
            >
              <Keyboard className={`w-4 h-4 ${showKeyboard ? 'text-blue-500' : 'text-gray-500'}`} />
              {showKeyboard ? '隐藏键盘' : '显示键盘'}
            </button>

            <button
              onClick={toggleOriginal}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 
                       transition-colors text-sm"
            >
              {showOriginal ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  隐藏单词原型
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  显示单词原型
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {currentWord && (
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 flex items-center gap-2 justify-center">
                {currentWord.meaning}
                <Volume2 className="w-6 h-6 text-blue-500 cursor-pointer" />
              </div>
              {showOriginal && (
                <div className="text-lg text-blue-600 mb-2">
                  {currentWord.original}
                </div>
              )}
              <div className="text-gray-500">
                请输入对应的{SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)?.name}单词
              </div>
            </div>
          )}

          <div className="w-full max-w-md">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onSelect={handleSelect}
              className="w-full p-3 border-2 rounded-lg text-lg
                       focus:outline-none focus:border-orange-400
                       transition-colors duration-200"
              placeholder={`在此输入${SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)?.name}...`}
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={checkInput}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg 
                         hover:bg-orange-600 transition-colors transform 
                         active:translate-y-0.5 focus:outline-none
                         focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50"
              >
                检查
              </button>
              <button
                onClick={resetWord}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg 
                         hover:bg-gray-600 transition-colors transform 
                         active:translate-y-0.5 focus:outline-none
                         focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                下一个
              </button>
            </div>
          </div>

          {isCorrect !== null && (
            <div className="text-center">
              <div className={`text-lg ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? '正确！' : `不正确，正确答案是：${currentWord[currentLanguage]}`}
              </div>
              {showExample && currentWord.example && (
                <div className="mt-2 text-gray-600">
                  <div className="font-medium">例句：</div>
                  <div>{currentWord.example}</div>
                </div>
              )}
            </div>
          )}
        </div>

        {showKeyboard && (
          <div className="mt-6">
            <LanguageKeyboard 
              layout={getKeyboardLayout(currentLanguage)}
              highlightKey={lastPressedKey}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LanguageTrainer; 