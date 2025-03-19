import React from 'react';
import { FireIcon, LightningBoltIcon, ClockIcon } from '@heroicons/react/outline';
const ForumSidebar = () => {
const trendingTopics = [
{ title: 'Best irrigation practices for drought conditions', comments: 24 },
{ title: 'How to prepare crops for the upcoming season', comments: 18 },
{ title: 'Natural pest control methods that actually work', comments: 15 }
];
const recentPosts = [
{ title: 'New fertilizer recommendations for corn', time: '2 hours ago' },
{ title: 'Market trends for organic produce', time: '5 hours ago' },
{ title: 'Weather forecast for the next planting season', time: '1 day ago' }
];
return (
<div className="bg-white rounded-lg shadow-md overflow-hidden">
<div className="p-4 bg-green-700 text-white">
<h3 className="font-semibold text-lg">Forum Highlights</h3>
</div>
<div className="p-4 border-b">
    <div className="flex items-center mb-3">
      <FireIcon className="h-5 w-5 text-orange-500 mr-2" />
      <h4 className="font-medium text-gray-800">Trending Topics</h4>
    </div>
    <ul className="space-y-2">
      {trendingTopics.map((topic, index) => (
        <li key={index}>
          <a href="#" className="text-gray-700 hover:text-green-600 block">
            <span className="text-sm">{topic.title}</span>
            <span className="text-xs text-gray-500 ml-2">
              ({topic.comments} comments)
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
  
  <div className="p-4">
    <div className="flex items-center mb-3">
      <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
      <h4 className="font-medium text-gray-800">Recent Posts</h4>
    </div>
    <ul className="space-y-2">
      {recentPosts.map((post, index) => (
        <li key={index}>
          <a href="#" className="text-gray-700 hover:text-green-600 block">
            <span className="text-sm">{post.title}</span>
            <span className="block text-xs text-gray-500">
              {post.time}
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
  
  <div className="p-4 bg-green-50">
    <div className="flex items-center mb-3">
      <LightningBoltIcon className="h-5 w-5 text-yellow-500 mr-2" />
      <h4 className="font-medium text-gray-800">Quick Tips</h4>
    </div>
    <ul className="text-sm text-gray-700 space-y-2">
      <li>• Use relevant tags to help others find your post</li>
      <li>• Include details about your specific situation</li>
      <li>• Add images when possible to illustrate your question</li>
    </ul>
  </div>
</div>
);
};
export default ForumSidebar;