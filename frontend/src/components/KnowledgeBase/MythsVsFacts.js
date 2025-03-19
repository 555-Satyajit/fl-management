import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../common/Loader';
import { ErrorMessage } from '../common/ErrorMessage';

const MythsVsFacts = () => {
  const [myths, setMyths] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userGuess, setUserGuess] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5; // Number of myths per request

  useEffect(() => {
    fetchMyths(page);
  }, [page]);

  const fetchMyths = async (pageNumber) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/knowledge-base/myths?page=${pageNumber}&limit=${limit}`);
      if (data.data.length > 0) {
        setMyths((prev) => [...prev, ...data.data]); // Append new myths/facts
      } else {
        setHasMore(false); // No more myths to load
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching myths:', error);
      setError('Failed to load myths vs facts. Please try again later.');
      setLoading(false);
    }
  };

  const nextCard = () => {
    if (currentIndex < myths.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setUserGuess(null);
    } else if (hasMore) {
      setPage(page + 1); // Fetch next set of myths
    } else {
      setCurrentIndex(0); // Restart from the beginning
      setShowAnswer(false);
      setUserGuess(null);
    }
  };

  if (loading && myths.length === 0) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (myths.length === 0) return <div>No myths vs facts available at the moment.</div>;

  // Ensure currentIndex does not go out of bounds
  const currentMyth = myths[currentIndex] || {};

  return (
    <div className="myths-vs-facts">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold">Myth or Fact?</h3>
        <p className="text-gray-600">Swipe or tap to guess whether the statement is true or false</p>
      </div>

      <div className="card bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        {currentMyth.title ? (
          <>
            <div className="card-content mb-6">
              <p className="text-lg font-medium text-center mb-4">{currentMyth.title}</p>
              <p className="text-gray-700">{currentMyth.content}</p>
            </div>

            {!showAnswer ? (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setUserGuess(false) || setShowAnswer(true)}
                  className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Myth ❌
                </button>
                <button
                  onClick={() => setUserGuess(true) || setShowAnswer(true)}
                  className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Fact ✅
                </button>
              </div>
            ) : (
              <div className="answer-reveal">
                <div
                  className={`text-center p-3 mb-4 rounded-lg ${
                    currentMyth.isTrue ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  <p className="font-semibold">{currentMyth.isTrue ? 'FACT ✅' : 'MYTH ❌'}</p>
                  <p>{userGuess === currentMyth.isTrue ? 'You got it right!' : 'Not quite!'}</p>
                </div>
                <button
                  onClick={nextCard}
                  className="w-full px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                  Next Card
                </button>
              </div>
            )}

            <div className="mt-4 text-center text-sm text-gray-500">
              Card {currentIndex + 1} of {myths.length}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No more myths available.</p>
        )}

        {hasMore && !loading && (
          <button
            onClick={() => setPage(page + 1)}
            className="mt-4 w-full px-6 py-2 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition"
          >
            Load More Myths
          </button>
        )}
      </div>
    </div>
  );
};

export default MythsVsFacts;
