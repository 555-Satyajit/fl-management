import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from '../common/Loader';
import { ErrorMessage } from '../common/ErrorMessage';

const FunFacts = () => {
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/knowledge-base/facts');
        setFacts(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching facts:', error);
        setError('Failed to load fun facts. Please try again later.');
        setLoading(false);
      }
    };

    fetchFacts();
  }, []);

  if (loading) return React.createElement(Loader);
  if (error) return React.createElement(ErrorMessage, { message: error });
  if (facts.length === 0) return React.createElement('div', null, 'No fun facts available at the moment.');

  return React.createElement(
    'div',
    { className: "fun-facts" },
    React.createElement('h3', { className: "text-xl font-semibold mb-4" }, "Did You Know?"),
    React.createElement(
      'div',
      { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
      facts.map((fact) => React.createElement(
        'div',
        { key: fact._id, className: "fact-card bg-blue-50 p-4 rounded-lg shadow-md" },
        React.createElement(
          'div',
          { className: "flex items-start" },
          React.createElement('span', { className: "text-2xl mr-3" }, "🌟"),
          React.createElement(
            'div',
            null,
            React.createElement('h4', { className: "font-medium mb-1" }, fact.title),
            React.createElement('p', { className: "text-gray-700" }, fact.content)
          )
        )
      ))
    )
  );
};

export default FunFacts;