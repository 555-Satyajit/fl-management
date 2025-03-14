import React, { useState, useEffect } from 'react';
import { Search, Sprout, Droplets, Thermometer, Sun, CloudRain, Wind, Calendar, Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const CropGuide = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedCrop, setExpandedCrop] = useState(null);

    // Sample crop data - in a real application, this would likely come from an API
    const crops = [
        {
            id: 1,
            name: 'Wheat',
            category: 'Grains',
            image: '/api/placeholder/400/320',
            description: 'A cereal grain that is a worldwide staple food.',
            growingConditions: {
                soil: 'Well-drained loamy soil with pH 6.0-7.0',
                temperature: '15-24°C (59-75°F)',
                water: 'Requires 450-650mm of water throughout growing season',
                sunlight: 'Full sun exposure',
                growingSeason: 'Winter wheat: Fall planting, Spring wheat: Early spring planting',
            },
            keyStages: [
                { name: 'Germination', days: '7-10 days after sowing' },
                { name: 'Tillering', days: '30-40 days after sowing' },
                { name: 'Stem elongation', days: '40-60 days after sowing' },
                { name: 'Heading', days: '60-80 days after sowing' },
                { name: 'Ripening', days: '110-130 days after sowing' },
            ],
            commonProblems: [
                'Leaf rust',
                'Powdery mildew',
                'Fusarium head blight',
                'Wheat stem sawfly',
                'Aphids',
            ],
        },
        {
            id: 2,
            name: 'Corn (Maize)',
            category: 'Grains',
            image: '/api/placeholder/400/320',
            description: 'A cereal grain first domesticated by indigenous peoples in southern Mexico.',
            growingConditions: {
                soil: 'Well-drained, fertile soil with pH 5.8-7.0',
                temperature: '20-30°C (68-86°F)',
                water: 'Requires 500-800mm of water throughout growing season',
                sunlight: 'Full sun exposure',
                growingSeason: 'Late spring to early summer planting',
            },
            keyStages: [
                { name: 'Germination', days: '5-10 days after sowing' },
                { name: 'Vegetative growth', days: '20-45 days after sowing' },
                { name: 'Tasseling', days: '45-55 days after sowing' },
                { name: 'Silking', days: '55-65 days after sowing' },
                { name: 'Maturity', days: '100-120 days after sowing' },
            ],
            commonProblems: [
                'Corn earworm',
                'European corn borer',
                'Gray leaf spot',
                'Northern corn leaf blight',
                'Stalk rot',
            ],
        },
        {
            id: 3,
            name: 'Tomato',
            category: 'Vegetables',
            image: '/api/placeholder/400/320',
            description: 'An edible berry of the plant Solanum lycopersicum, commonly grown worldwide.',
            growingConditions: {
                soil: 'Well-drained, fertile soil with pH 6.0-6.8',
                temperature: '20-27°C (68-80°F)',
                water: 'Regular watering, 1-2 inches per week',
                sunlight: 'Full sun exposure, minimum 6 hours daily',
                growingSeason: 'Spring to summer planting after last frost',
            },
            keyStages: [
                { name: 'Germination', days: '5-10 days after sowing' },
                { name: 'Vegetative growth', days: '20-30 days after sowing' },
                { name: 'Flowering', days: '30-45 days after sowing' },
                { name: 'Fruit development', days: '45-70 days after sowing' },
                { name: 'Ripening', days: '70-100 days after sowing' },
            ],
            commonProblems: [
                'Early blight',
                'Late blight',
                'Blossom end rot',
                'Tomato hornworm',
                'Fusarium wilt',
            ],
        },
        {
            id: 4,
            name: 'Soybean',
            category: 'Legumes',
            image: '/api/placeholder/400/320',
            description: 'A legume species native to East Asia, grown for its edible bean.',
            growingConditions: {
                soil: 'Well-drained, fertile soil with pH 6.0-7.0',
                temperature: '20-30°C (68-86°F)',
                water: 'Requires 450-700mm of water throughout growing season',
                sunlight: 'Full sun exposure',
                growingSeason: 'Late spring to early summer planting',
            },
            keyStages: [
                { name: 'Germination', days: '5-10 days after sowing' },
                { name: 'Vegetative growth', days: '20-40 days after sowing' },
                { name: 'Flowering', days: '40-60 days after sowing' },
                { name: 'Pod development', days: '60-100 days after sowing' },
                { name: 'Maturity', days: '100-140 days after sowing' },
            ],
            commonProblems: [
                'Soybean cyst nematode',
                'Sudden death syndrome',
                'Phytophthora root rot',
                'Bean leaf beetle',
                'Asian soybean rust',
            ],
        },
        {
            id: 5,
            name: 'Cotton',
            category: 'Fiber Crops',
            image: '/api/placeholder/400/320',
            description: 'A soft, fluffy staple fiber that grows in a boll around the seeds of cotton plants.',
            growingConditions: {
                soil: 'Well-drained, deep soil with pH 5.5-8.0',
                temperature: '20-30°C (68-86°F)',
                water: 'Requires 700-1300mm of water throughout growing season',
                sunlight: 'Full sun exposure',
                growingSeason: 'Spring planting when soil temperatures reach 16°C (60°F)',
            },
            keyStages: [
                { name: 'Germination', days: '5-10 days after sowing' },
                { name: 'Vegetative growth', days: '20-40 days after sowing' },
                { name: 'Flowering', days: '40-60 days after sowing' },
                { name: 'Boll development', days: '60-100 days after sowing' },
                { name: 'Maturity', days: '140-180 days after sowing' },
            ],
            commonProblems: [
                'Cotton bollworm',
                'Boll weevil',
                'Verticillium wilt',
                'Fusarium wilt',
                'Cotton leaf curl virus',
            ],
        },
        {
            id: 6,
            name: 'Rice',
            category: 'Grains',
            image: '/api/placeholder/400/320',
            description: 'The seed of the grass species Oryza sativa, a staple food source for many countries.',
            growingConditions: {
                soil: 'Clay or loamy soil with pH 5.5-7.0',
                temperature: '20-35°C (68-95°F)',
                water: 'Requires standing water for most of the growing season',
                sunlight: 'Full sun exposure',
                growingSeason: 'Spring to early summer planting',
            },
            keyStages: [
                { name: 'Germination', days: '5-10 days after sowing' },
                { name: 'Vegetative growth', days: '20-60 days after sowing' },
                { name: 'Reproductive stage', days: '60-90 days after sowing' },
                { name: 'Ripening', days: '90-120 days after sowing' },
            ],
            commonProblems: [
                'Rice blast',
                'Bacterial leaf blight',
                'Brown planthopper',
                'Rice stem borer',
                'Sheath blight',
            ],
        },
    ];

    const categories = ['All', 'Grains', 'Vegetables', 'Legumes', 'Fiber Crops'];

    // Filter crops based on search term and category
    const filteredCrops = crops.filter(crop => {
        const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Handle crop expansion
    const toggleCropExpansion = (cropId) => {
        if (expandedCrop === cropId) {
            setExpandedCrop(null);
        } else {
            setExpandedCrop(cropId);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-2 sm:p-6">
            <div className="bg-white rounded-lg shadow-lg">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Sprout className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Comprehensive Crop Guide</h1>
                                <p className="text-xs sm:text-sm text-gray-600">Essential information for successful farming</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="p-4 sm:p-6 border-b border-gray-100 bg-green-50">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-7 relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search crops by name or description..."
                                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-5">
                            <select
                                className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Crop List */}
                <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                    {filteredCrops.length > 0 ? (
                        filteredCrops.map((crop) => (
                            <div key={crop.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div
                                    className="flex flex-col sm:flex-row sm:items-center cursor-pointer"
                                    onClick={() => toggleCropExpansion(crop.id)}
                                >
                                    <div className="sm:w-1/4">
                                        <img
                                            src={crop.image}
                                            alt={crop.name}
                                            className="w-full h-48 sm:h-40 object-cover"
                                        />
                                    </div>
                                    <div className="p-4 sm:p-6 flex-1">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                                                    {crop.category}
                                                </span>
                                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-2">{crop.name}</h2>
                                            </div>
                                            {expandedCrop === crop.id ?
                                                <ChevronUp className="w-5 h-5 text-gray-500" /> :
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            }
                                        </div>
                                        <p className="text-sm sm:text-base text-gray-600 mt-2">{crop.description}</p>
                                    </div>
                                </div>

                                {expandedCrop === crop.id && (
                                    <div className="p-4 sm:p-6 border-t border-gray-200">
                                        {/* Growing Conditions */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="flex items-start gap-2">
                                                <Droplets className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Water Requirements:</span>
                                                    <p className="text-sm text-gray-600">{crop.growingConditions.water}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Thermometer className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Temperature:</span>
                                                    <p className="text-sm text-gray-600">{crop.growingConditions.temperature}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Sun className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Sunlight:</span>
                                                    <p className="text-sm text-gray-600">{crop.growingConditions.sunlight}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <Sprout className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Soil:</span>
                                                    <p className="text-sm text-gray-600">{crop.growingConditions.soil}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-2 md:col-span-2">
                                                <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="text-sm font-medium text-gray-700">Growing Season:</span>
                                                    <p className="text-sm text-gray-600">{crop.growingConditions.growingSeason}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Key Growth Stages */}
                                        <div className="mt-6">
                                            <h3 className="text-md sm:text-lg font-semibold text-green-800 mb-3">Key Growth Stages</h3>
                                            <div className="space-y-2">
                                                {crop.keyStages.map((stage, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                        <span className="text-sm font-medium text-gray-700 mr-2">{stage.name}:</span>
                                                        <span className="text-sm text-gray-600">{stage.days}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Common Problems */}
                                        <div className="mt-6">
                                            <h3 className="text-md sm:text-lg font-semibold text-green-800 mb-3">Common Problems</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {crop.commonProblems.map((problem, index) => (
                                                    <div key={index} className="flex items-center">
                                                        <Info className="w-4 h-4 text-orange-500 mr-2" />
                                                        <span className="text-sm text-gray-600">{problem}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Resources link - for a real app */}
                                        <div className="mt-4 text-right">
                                            <a href="#" className="inline-flex items-center text-sm text-green-600 hover:text-green-800">
                                                Learn more about {crop.name}
                                                <ExternalLink className="w-4 h-4 ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Sprout className="w-12 h-12 text-gray-300 mx-auto" />
                            <h3 className="mt-4 text-lg font-medium text-gray-500">No crops found</h3>
                            <p className="mt-2 text-sm text-gray-400">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );};
    export default CropGuide;
