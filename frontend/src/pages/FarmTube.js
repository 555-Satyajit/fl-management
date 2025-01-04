import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
const VIDEO_DETAILS_URL = 'https://www.googleapis.com/youtube/v3/videos';

const FarmTube = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [nextPageToken, setNextPageToken] = useState(null);
  const [prevPageToken, setPrevPageToken] = useState(null);
  const [showShorts, setShowShorts] = useState(true); // Toggle state

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchVideos = async (query = '', pageToken = '') => {
    setLoading(true);
    setError(null);

    try {
      // Use default query for most popular farming-related videos if no searchQuery is provided
      const searchTerm = query || 'farming agriculture techniques irrigation crops';
      const searchResponse = await fetch(
        `${SEARCH_URL}?key=${API_KEY}&q=${searchTerm}&part=snippet&type=video&maxResults=20&pageToken=${pageToken}&order=relevance`
      );
      const searchData = await searchResponse.json();

      if (!searchResponse.ok) {
        throw new Error(searchData.error.message || 'Failed to load videos');
      }

      const videoIds = searchData.items.map((item) => item.id.videoId).join(',');
      const videoDetailsResponse = await fetch(
        `${VIDEO_DETAILS_URL}?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet`
      );
      const videoDetailsData = await videoDetailsResponse.json();

      if (!videoDetailsResponse.ok) {
        throw new Error(videoDetailsData.error.message || 'Failed to load video details');
      }

      const videos = videoDetailsData.items.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        duration: item.contentDetails.duration, // ISO 8601 format
        videoId: item.id,
      }));

      const parsedVideos = parseVideoDurations(videos);

      setVideos(parsedVideos[showShorts ? 'shorts' : 'long']);
      setNextPageToken(searchData.nextPageToken || null);
      setPrevPageToken(searchData.prevPageToken || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const parseVideoDurations = (videos) => {
    const shorts = [];
    const long = [];

    videos.forEach((video) => {
      const durationInSeconds = convertDurationToSeconds(video.duration);

      if (durationInSeconds <= 60) {
        shorts.push(video);
      } else if (durationInSeconds >= 300) {
        long.push(video);
      }
    });

    return { shorts, long };
  };

  const convertDurationToSeconds = (duration) => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      fetchVideos(); // Show default popular farming videos
    } else {
      fetchVideos(searchQuery);
    }
  };

  useEffect(() => {
    fetchVideos(); // Fetch default popular videos on initial load
  }, [showShorts]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderVideoCard = (video) => (
    <div
      key={video.id}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => window.open(`https://youtube.com/watch?v=${video.videoId}`, '_blank')}
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
          >
            Watch Now
          </button>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
          {video.title}
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{video.channelTitle}</span>
          <span>{formatDate(video.publishedAt)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-2">FarmTube</h1>
          <p className="text-lg text-gray-600 mb-8">Your source for agricultural knowledge</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-12">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search farming videos..."
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" />
            <button
              onClick={handleSearch}
              className="absolute right-4 top-3 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Search
            </button>
          </div>

          {/* Toggle Button */}
          <div className="flex justify-center items-center mb-8">
            <button
              className={`px-6 py-3 rounded-l-lg ${
                showShorts ? 'bg-green-800 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => setShowShorts(true)}
            >
              Shorts
            </button>
            <button
              className={`px-6 py-3 rounded-r-lg ${
                !showShorts ? 'bg-green-800 text-white' : 'bg-gray-300 text-gray-700'
              }`}
              onClick={() => setShowShorts(false)}
            >
              Long Videos
            </button>
          </div>
        </div>

        {/* Video Section */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center text-green-700">
              <Loader2 className="animate-spin" />
              <span className="ml-2">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center">{error}</div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map(renderVideoCard)}
            </div>
          ) : (
            <div className="text-gray-600 text-center">No videos found.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          {prevPageToken && (
            <button
              onClick={() => fetchVideos(searchQuery, prevPageToken)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          {nextPageToken && (
            <button
              onClick={() => fetchVideos(searchQuery, nextPageToken)}
              className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmTube;
