import React, { useState, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Image, FileText, Trash2, Edit3, Eye, 
  X, Plus, Check, Search, Grid, List,
  ToggleLeft, ToggleRight, LogOut,
  Save, Send, Bold, Italic, Underline, 
  Link as LinkIcon, ListOrdered, Quote,
  Heading, ImagePlus, File, FolderOpen,
  Loader2, Play, Youtube, Link2, Calendar, MapPin,
  AlertTriangle, CheckCircle, XCircle, Info, ExternalLink,
  Users, Clock, Ban, Images
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// AGI Contact Information
const AGI_CONTACT = {
  address: "42 Dr. Isert Street, North Ridge, Accra",
  digitalAddress: "GA-014-5066",
  phone: "(0302) 251266",
  phoneAlt: "986730",
  email: "agi@agighana.org",
  website: "www.agighana.org",
  logoUrl: "https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png"
};

// ==================== MOCK DATA ====================

// Blog posts data
const initialBlogPosts = [
  { id: 1, title: "Ghana's Industrial Growth Projections for 2024", category: 'Industry News', status: 'published', date: '2024-01-15', views: 1250, author: 'Sarah Akoto', content: '<p>This is the full content of the blog post...</p>', featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80', excerpt: 'An in-depth analysis of Ghana industrial sector...' },
  { id: 2, title: 'Strategic Business Scaling in Volatile Markets', category: 'Business Strategy', status: 'published', date: '2024-01-14', views: 980, author: 'John Mensah', content: '<p>Business scaling strategies for 2024...</p>', featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80', excerpt: 'Learn how to scale your business...' },
  { id: 3, title: 'Highlights from the AGI Annual General Summit', category: 'Events', status: 'draft', date: '2024-01-12', views: 0, author: 'Emma Kwame', content: '', featuredImage: '', excerpt: '' },
  { id: 4, title: 'Reviewing New SME Policy Frameworks', category: 'Policy Advocacy', status: 'published', date: '2024-01-10', views: 756, author: 'Michael Osei', content: '<p>Analysis of new SME policies...</p>', featuredImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80', excerpt: 'Understanding new SME frameworks...' },
  { id: 5, title: 'Emerging Trends in Manufacturing Technology', category: 'Technology', status: 'draft', date: '2024-01-08', views: 0, author: 'Sarah Akoto', content: '', featuredImage: '', excerpt: '' },
  { id: 6, title: 'Export Opportunities for Ghanaian Manufacturers', category: 'Business Strategy', status: 'published', date: '2024-01-05', views: 1420, author: 'John Mensah', content: '<p>Export opportunities analysis...</p>', featuredImage: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80', excerpt: 'Exploring export markets...' },
];

// Media assets - matching MediaHubPage structure
const initialMediaAssets = [
  { 
    id: 1, 
    type: 'image',
    mediaType: 'Featured',
    title: 'AGI Annual General Meeting 2024', 
    description: 'Strategic discussions on the future of Ghana\'s industrial sector and policy advocacy.',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80',
    size: '2.4 MB', 
    date: 'Oct 12, 2024', 
    location: 'Accra, Ghana',
    category: 'Events',
    sizeType: 'large'
  },
  { 
    id: 2, 
    type: 'video',
    mediaType: 'Video',
    title: 'The Rise of Local Manufacturing',
    description: 'Documentary on Ghana\'s manufacturing growth.',
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=example1',
    embedUrl: 'https://www.youtube.com/embed/example1',
    size: '150 MB', 
    date: 'Sep 28, 2024', 
    category: 'Videos',
    sizeType: 'small'
  },
  { 
    id: 3, 
    type: 'image',
    mediaType: 'Gallery',
    title: 'Factory Inspection Tour', 
    description: 'Industrial facility tours across Ghana.',
    url: 'https://images.unsplash.com/photo-1565608411388-4bb304df2487?auto=format&fit=crop&q=80',
    size: '1.8 MB', 
    date: 'Sep 15, 2024', 
    location: 'Tema, Ghana',
    category: 'Industrial Tours',
    sizeType: 'medium'
  },
  { 
    id: 4, 
    type: 'video',
    mediaType: 'Gallery',
    title: 'Industrial Awards Highlights', 
    description: 'Highlights from the annual industrial awards ceremony.',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=example2',
    embedUrl: 'https://www.youtube.com/embed/example2',
    size: '220 MB', 
    date: 'Aug 22, 2024', 
    location: 'Accra, Ghana',
    category: 'Events',
    sizeType: 'small',
    isVideo: true
  },
  { 
    id: 5, 
    type: 'image',
    mediaType: 'Gallery',
    title: 'New Infrastructure Blueprint', 
    description: 'Press conference on new infrastructure developments.',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
    size: '2.9 MB', 
    date: 'Aug 10, 2024', 
    location: 'Accra, Ghana',
    category: 'Press Conferences',
    sizeType: 'medium'
  },
  { 
    id: 6, 
    type: 'link',
    mediaType: 'External',
    title: 'TV3 Ghana Interview - AGI President',
    description: 'Exclusive interview with the AGI President on economic policies.',
    url: 'https://www.youtube.com/watch?v=external1',
    embedUrl: 'https://www.youtube.com/embed/external1',
    date: 'Jul 15, 2024',
    category: 'Videos',
    sizeType: 'small'
  },
  { 
    id: 7, 
    type: 'image',
    mediaType: 'Gallery',
    title: 'Export Processing Zone Tour',
    url: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&q=80',
    size: '4.2 MB', 
    date: 'Jun 28, 2024', 
    location: 'Tema, Ghana',
    category: 'Industrial Tours',
    sizeType: 'medium'
  },
];

// Categories matching MediaHubPage
const mediaCategories = ['All', 'Events', 'Industrial Tours', 'Press Conferences', 'Videos'];

// Categories for blog posts
const blogCategories = ['Industry News', 'Business Strategy', 'Events', 'Policy Advocacy', 'Technology', 'Market Analysis', 'SME Support'];

// ==================== COMPONENTS ====================

// Confirmation Dialog Component
const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, isDanger = true, isDark }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md rounded-2xl p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDanger ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
            {isDanger ? <AlertTriangle size={24} className="text-red-600" /> : <Info size={24} className="text-blue-600" />}
          </div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
        </div>
        <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className={`px-4 py-2 rounded-xl font-medium ${
              isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl font-medium text-white ${
              isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isDanger ? 'Delete' : 'Confirm'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Rich Text Editor Component
const RichTextEditor = ({ value, onChange, isDark, placeholder }) => {
  const editorRef = useRef(null);
  
  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };
  
  return (
    <div className={`border rounded-xl overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Toolbar */}
      <div className={`flex items-center gap-1 p-2 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} flex-wrap`}>
        <button type="button" onClick={() => execCommand('bold')} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} title="Bold">
          <Bold size={18} />
        </button>
        <button type="button" onClick={() => execCommand('italic')} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} title="Italic">
          <Italic size={18} />
        </button>
        <button type="button" onClick={() => execCommand('underline')} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} title="Underline">
          <Underline size={18} />
        </button>
        
        <div className={`w-px h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} mx-1`} />
        
        <button type="button" onClick={() => execCommand('formatBlock', 'h2')} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} title="Heading">
          <Heading size={18} />
        </button>
        <button type="button" onClick={() => execCommand('insertUnorderedList')} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} title="Bullet List">
          <ListOrdered size={18} />
        </button>
        
        <div className={`w-px h-6 ${isDark ? 'bg-gray-700' : 'bg-gray-300'} mx-1`} />
        
        <button type="button" onClick={() => {
          const url = prompt('Enter URL:');
          if (url) execCommand('createLink', url);
        }} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} title="Insert Link">
          <LinkIcon size={18} />
        </button>
        <button type="button" onClick={() => execCommand('formatBlock', 'blockquote')} className={`p-2 rounded-lg hover:bg-gray-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} title="Quote">
          <Quote size={18} />
        </button>
      </div>
      
      {/* Editor Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className={`min-h-[250px] p-4 outline-none ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = ({ size = 20, className = '' }) => (
  <Loader2 size={size} className={`animate-spin ${className}`} />
);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  const types = {
    success: { bg: 'bg-green-500', icon: CheckCircle },
    error: { bg: 'bg-red-500', icon: XCircle },
    warning: { bg: 'bg-yellow-500', icon: AlertTriangle },
    info: { bg: 'bg-blue-500', icon: Info },
  };
  
  const config = types[type] || types.info;
  const Icon = config.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 50, x: '-50%' }}
      className={`fixed bottom-6 left-1/2 ${config.bg} text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50`}
    >
      <Icon size={20} />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded p-1">
        <X size={16} />
      </button>
    </motion.div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Active' },
    inactive: { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400', label: 'Inactive' },
    published: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Published' },
    draft: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Draft' },
  };
  
  const config = statusConfig[status] || statusConfig.draft;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

// Media Type Badge Component
const MediaTypeBadge = ({ type }) => {
  const typeConfig = {
    'Featured': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', icon: Star },
    'Video': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: Play },
    'Gallery': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: Image },
    'External': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', icon: Link2 },
  };
  
  const config = typeConfig[type] || typeConfig['Gallery'];
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${config.bg} ${config.text}`}>
      <Icon size={12} />
      {type}
    </span>
  );
};

// Media Preview Modal
const MediaPreviewModal = ({ asset, isOpen, onClose, isDark }) => {
  if (!isOpen || !asset) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-4xl rounded-2xl overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="relative">
          {asset.type === 'video' || asset.embedUrl ? (
            <div className="aspect-video bg-black flex items-center justify-center">
              {asset.embedUrl ? (
                <iframe 
                  src={asset.embedUrl} 
                  title={asset.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              ) : (
                <img src={asset.url} alt={asset.title} className="w-full h-full object-contain" />
              )}
              {asset.type !== 'video' && !asset.embedUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Play size={64} className="text-white" />
                </div>
              )}
            </div>
          ) : (
            <img src={asset.url} alt={asset.title} className="w-full max-h-[60vh] object-contain" />
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 z-10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <MediaTypeBadge type={asset.mediaType} />
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
              isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>{asset.category}</span>
          </div>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.title}</h3>
          {asset.description && (
            <p className={`mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{asset.description}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className={`text-xs uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Type</p>
              <p className={`font-medium capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.type}</p>
            </div>
            <div>
              <p className={`text-xs uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Size</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.size || 'N/A'}</p>
            </div>
            {asset.location && (
              <div>
                <p className={`text-xs uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Location</p>
                <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.location}</p>
              </div>
            )}
            <div>
              <p className={`text-xs uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Date</p>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.date}</p>
            </div>
          </div>
          {asset.url && (
            <div className="flex gap-3 mt-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700">
                <ExternalLink size={18} />
                View Original
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add/Edit Media Modal
const MediaFormModal = ({ isOpen, onClose, onSave, editingMedia, isDark }) => {
  const [formData, setFormData] = useState(editingMedia || {
    type: 'image',
    mediaType: 'Gallery',
    title: '',
    description: '',
    url: '',
    videoUrl: '',
    date: '03/21/2026',
    location: 'Accra, Ghana',
    category: 'Events',
    sizeType: 'small'
  });
  
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fakeUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        url: fakeUrl,
        title: formData.title || file.name.split('.')[0]
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fakeUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        url: fakeUrl,
        title: formData.title || file.name.split('.')[0]
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.type === 'image' && !formData.url.trim()) newErrors.url = 'Image URL is required';
    if (formData.type === 'video' && !formData.videoUrl?.trim()) newErrors.videoUrl = 'Video URL is required';
    if (formData.type === 'link' && !formData.url?.trim()) newErrors.url = 'Link URL is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // Convert YouTube URL to embed URL
      let embedUrl = formData.embedUrl;
      if (formData.videoUrl && formData.videoUrl.includes('youtube.com/watch')) {
        const videoId = formData.videoUrl.split('v=')[1]?.split('&')[0];
        if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      
      onSave({
        ...formData,
        embedUrl,
        id: editingMedia?.id || Date.now()
      });
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
    >
      <div className="min-h-screen flex items-start justify-center p-4 pt-8 sm:pt-16">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className={`w-full max-w-2xl rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} mb-8`}
        >
          <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {editingMedia ? 'Edit Media' : 'Add New Media'}
            </h2>
            <button onClick={onClose} className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}>
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 sm:p-6 space-y-4">
            {/* Media Type */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Media Type</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: 'image', label: 'Image', icon: Image },
                  { value: 'video', label: 'Video Upload', icon: Play },
                  { value: 'link', label: 'External Link', icon: Link2 },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFormData({...formData, type: opt.value, mediaType: opt.value === 'video' ? 'Video' : opt.value === 'link' ? 'External' : 'Gallery'})}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                      formData.type === opt.value 
                        ? 'bg-red-600 border-red-600 text-white' 
                        : `${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`
                    }`}
                  >
                    <opt.icon size={16} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Title */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter media title..."
                className={`w-full px-4 py-3 rounded-xl border text-base ${
                  errors.title ? 'border-red-500' : isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>
            
            {/* Description */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                placeholder="Enter description..."
                className={`w-full px-4 py-3 rounded-xl border text-base ${
                  isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
              />
            </div>
            
            {/* Category */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border text-base ${
                  errors.category ? 'border-red-500' : isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
              >
                {mediaCategories.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Click to Upload Media - Prominent upload area */}
            {formData.type === 'image' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Click to upload media <span className="text-red-500">*</span>
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    dragActive 
                      ? 'border-red-500 bg-red-50/10' 
                      : errors.url 
                        ? 'border-red-500' 
                        : formData.url
                          ? 'border-green-500 bg-green-50/10'
                          : isDark 
                            ? 'border-gray-600 hover:border-gray-500' 
                            : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center gap-3">
                    {formData.url ? (
                      <>
                        <img src={formData.url} alt="Preview" className="h-40 object-contain rounded-lg" />
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Click or drag to replace</p>
                      </>
                    ) : (
                      <>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Upload className={isDark ? 'text-gray-400' : 'text-gray-500'} size={28} />
                        </div>
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Click to upload media
                          </p>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            SVG, PNG, JPG or GIF (max. 10MB)
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {errors.url && <p className="mt-1 text-sm text-red-500">{errors.url}</p>}
                
                {/* Or enter URL option */}
                <div className="mt-4">
                  <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Or enter image URL:</p>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="https://..."
                    className={`w-full px-4 py-3 rounded-xl border text-base ${
                      isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                    } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                  />
                </div>
              </div>
            )}
            
            {formData.type === 'video' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Video URL (YouTube) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value, url: e.target.value})}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={`w-full px-4 py-3 rounded-xl border text-base ${
                    errors.videoUrl ? 'border-red-500' : isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                  } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                />
                {errors.videoUrl && <p className="mt-1 text-sm text-red-500">{errors.videoUrl}</p>}
                <p className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Paste a YouTube or Vimeo URL</p>
              </div>
            )}
            
            {formData.type === 'link' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  External Link URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({...formData, url: e.target.value})}
                  placeholder="https://..."
                  className={`w-full px-4 py-3 rounded-xl border text-base ${
                    errors.url ? 'border-red-500' : isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                  } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                />
                {errors.url && <p className="mt-1 text-sm text-red-500">{errors.url}</p>}
              </div>
            )}
            
            {/* Date and Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                <div className="relative">
                  <Calendar size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    placeholder="03/21/2026"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base ${
                      isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                    } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                  />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                <div className="relative">
                  <MapPin size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Accra, Ghana"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-base ${
                      isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                    } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                  />
                </div>
              </div>
            </div>
            
            {/* Featured Type */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Display Type</label>
              <select
                value={formData.sizeType}
                onChange={(e) => setFormData({...formData, sizeType: e.target.value})}
                className={`w-full px-4 py-3 rounded-xl border text-base ${
                  isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
              >
                <option value="small">Small (1 col)</option>
                <option value="medium">Medium (1 col square)</option>
                <option value="large">Large (Featured - 2 cols)</option>
              </select>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={onClose}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium ${
                isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
            >
              <Save size={18} />
              {editingMedia ? 'Update Media' : 'Add Media'}
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Star icon helper
const Star = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ==================== MAIN COMPONENT ====================

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const mediaFileInputRef = useRef(null);
  
  // Navigation state
  const [activeTab, setActiveTab] = useState('media');
  const [showMediaForm, setShowMediaForm] = useState(false);
  
  // Applications state
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  // Load applications from localStorage
  React.useEffect(() => {
    const storedApps = localStorage.getItem('agi_applications');
    if (storedApps) {
      setApplications(JSON.parse(storedApps));
    }
  }, []);
  
  // Update application status
  const updateApplicationStatus = (serialNumber, newStatus) => {
    const updatedApps = applications.map(app => 
      app.serialNumber === serialNumber ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApps);
    localStorage.setItem('agi_applications', JSON.stringify(updatedApps));
  };
  
  // Generate PDF for application
  const generateApplicationPDF = async (app) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let yPos = 15;
    
    // Professional Header - White background with border
    doc.setFillColor(255, 255, 255);
    doc.rect(margin - 5, 5, pageWidth - 2 * margin + 10, 45, 'F');
    doc.setDrawColor(180, 180, 180);
    doc.setLineWidth(0.3);
    doc.rect(margin - 5, 5, pageWidth - 2 * margin + 10, 45, 'S');
    
    // Left side - Logo
    const logoSize = 28;
    doc.setFillColor(163, 42, 42);
    doc.roundedRect(margin, 12, logoSize, logoSize, 2, 2, 'F');
    
    try {
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoImg.src = AGI_CONTACT.logoUrl;
      await new Promise((resolve, reject) => {
        logoImg.onload = resolve;
        logoImg.onerror = reject;
        setTimeout(reject, 3000);
      });
      doc.addImage(logoImg, 'PNG', margin + 2, 14, 24, 24);
    } catch (e) {
      console.log('Logo not available');
    }
    
    // Company name - AFRICAN GLOBAL INITIATIVE as requested
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('AFRICAN GLOBAL INITIATIVE', margin + 35, 18);
    
    // Tagline
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Membership Application Form', margin + 35, 24);
    
    // Right side - Contact Information
    const rightCol = pageWidth - margin - 55;
    doc.setFontSize(7);
    doc.setTextColor(60, 60, 60);
    
    doc.text('42 Dr. Isert Street, North Ridge, Accra', rightCol, 14);
    doc.text('Digital Address: GA-014-5066', rightCol, 19);
    doc.text('Phone: (0302) 251266 | 986730', rightCol, 24);
    doc.text('Email: agi@agighana.org', rightCol, 29);
    doc.text('Website: www.agighana.org', rightCol, 34);
    
    // Application Details Section
    yPos = 58;
    
    // Application details box
    doc.setFillColor(248, 250, 252);
    doc.rect(margin - 5, yPos, pageWidth - 2 * margin + 10, 18, 'F');
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.rect(margin - 5, yPos, pageWidth - 2 * margin + 10, 18, 'S');
    
    yPos += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    
    // Application details - two columns
    const col1 = margin + 2;
    const col2 = margin + 60;
    const col3 = margin + 110;
    const col4 = margin + 150;
    
    // Row 1
    doc.text('Application Serial No:', col1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(163, 42, 42);
    doc.text(app.serialNumber || 'N/A', col1 + 38, yPos);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Member Name:', col2, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(app.organizationName || 'N/A', col2 + 25, yPos);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Membership Type:', col3, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(app.ownershipType || 'N/A', col3 + 32, yPos);
    
    // Row 2
    yPos += 7;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Application Date:', col1, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A', col1 + 32, yPos);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text('Status:', col2, yPos);
    doc.setFont('helvetica', 'normal');
    const statusColor = app.status === 'accepted' ? [22, 163, 74] : app.status === 'declined' ? [220, 38, 38] : [202, 138, 4];
    doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
    doc.text(app.status ? app.status.toUpperCase() : 'PENDING', col2 + 15, yPos);
    
    yPos += 15;
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Helper function to add section
    const addSection = (title) => {
      yPos += 5;
      if (yPos > 265) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFillColor(163, 42, 42);
      doc.rect(margin, yPos, pageWidth - 2 * margin, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin + 3, yPos + 5);
      yPos += 10;
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
    };
    
    // Helper function to add field
    const addField = (label, value) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(label, margin, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value || '-', margin + 50, yPos);
      yPos += 5;
    };
    
    // Part A: Company Details
    addSection('PART A: Company Address & Location');
    addField('Organization Name:', app.organizationName);
    addField('Postal Address:', app.postalAddress);
    addField('Town:', app.town);
    addField('Region:', app.region);
    addField('Company Telephone:', app.companyTelephone);
    addField('Email:', app.email);
    addField('Website:', app.website);
    addField('Digital Address:', app.digitalAddress);
    
    // Part A2: CEO Details
    addSection('PART A2: Chief Executive Details');
    addField('CEO Name:', `${app.ceoTitle} ${app.ceoName}`);
    addField('Position:', app.ceoPosition);
    addField('Contact:', app.ceoContact);
    
    // Alternative Contact
    if (app.altContactName) {
      addSection('PART A3: Alternative Contact Person');
      addField('Name:', `${app.altContactTitle} ${app.altContactName}`);
      addField('Position:', app.altContactPosition);
      addField('Phone:', app.altContactPhone);
      addField('Email:', app.altContactEmail);
    }
    
    // Part B: Statistical Data
    addSection('PART B: Statistical Data');
    addField('Ownership Type:', app.ownershipType);
    addField('% Ghanaian:', app.ownershipPercentGhanaian ? `${app.ownershipPercentGhanaian}%` : '-');
    addField('% Foreign:', app.ownershipPercentForeign ? `${app.ownershipPercentForeign}%` : '-');
    addField('Year Began:', app.yearOperationsBegan);
    addField('Employees:', app.employeeCount);
    addField('Turnover (USD):', app.turnover);
    
    // Part C: Publication Data
    addSection('PART C: Business Activity');
    addField('Sectors:', app.selectedSectors?.join(', ') || '-');
    addField('Main Business:', app.mainBusinessArea);
    
    // Products/Services
    const products = [
      app.productService1,
      app.productService2,
      app.productService3,
      app.productService4,
      app.productService5
    ].filter(p => p);
    
    if (products.length > 0) {
      addField('Products/Services:', products.join(', '));
    }
    
    // Documents Section
    addSection('UPLOADED DOCUMENTS');
    const docs = app.documents || [];
    if (docs.length > 0) {
      docs.forEach((docItem, index) => {
        addField(`${index + 1}. ${docItem.typeLabel || 'Document'}:`, docItem.name);
      });
    } else {
      addField('Documents:', 'No documents uploaded');
    }
    
    // Status
    addSection('APPLICATION STATUS');
    addField('Status:', app.status ? app.status.toUpperCase() : 'PENDING');
    
    // Footer
    yPos = 270;
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(AGI_CONTACT.address, pageWidth / 2, yPos, { align: 'center' });
    doc.text(`${AGI_CONTACT.phone} | ${AGI_CONTACT.email}`, pageWidth / 2, yPos + 5, { align: 'center' });
    
    // Save the PDF
    doc.save(`AGI_Application_${app.organizationName?.replace(/\s+/g, '_') || 'Unknown'}_${app.serialNumber || ''}.pdf`);
  };
  
  // Toast notifications
  const [toast, setToast] = useState(null);
  
  // Blog posts state
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [editingPost, setEditingPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [postCategoryFilter, setPostCategoryFilter] = useState('all');
  const [postStatusFilter, setPostStatusFilter] = useState('all');
  const [postFormLoading, setPostFormLoading] = useState(false);
  const [postFormErrors, setPostFormErrors] = useState({});
  
  // Media state - Load from localStorage on mount
  const [mediaAssets, setMediaAssets] = useState(() => {
    const storedMedia = localStorage.getItem('agi_media');
    return storedMedia ? JSON.parse(storedMedia) : initialMediaAssets;
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [previewAsset, setPreviewAsset] = useState(null);
  const [editingMedia, setEditingMedia] = useState(null);
  
  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, item: null, type: null });
  
  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  
  // Filtered blog posts
  const filteredBlogPosts = useMemo(() => {
    let result = blogPosts;
    
    if (postSearchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(postSearchQuery.toLowerCase())
      );
    }
    
    if (postCategoryFilter !== 'all') {
      result = result.filter(post => post.category === postCategoryFilter);
    }
    
    if (postStatusFilter !== 'all') {
      result = result.filter(post => post.status === postStatusFilter);
    }
    
    return result;
  }, [blogPosts, postSearchQuery, postCategoryFilter, postStatusFilter]);
  
  // Filtered media
  const filteredMedia = useMemo(() => {
    let result = mediaAssets;
    
    if (mediaSearchQuery) {
      result = result.filter(asset => 
        asset.title.toLowerCase().includes(mediaSearchQuery.toLowerCase()) ||
        asset.description?.toLowerCase().includes(mediaSearchQuery.toLowerCase())
      );
    }
    
    if (mediaCategoryFilter !== 'All') {
      result = result.filter(asset => asset.category === mediaCategoryFilter);
    }
    
    return result;
  }, [mediaAssets, mediaSearchQuery, mediaCategoryFilter]);
  
  // Validate blog post form
  const validatePostForm = (post) => {
    const errors = {};
    if (!post.title || post.title.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }
    if (!post.category) {
      errors.category = 'Please select a category';
    }
    if (!post.content || post.content.trim().length < 20) {
      errors.content = 'Content must be at least 20 characters';
    }
    return errors;
  };
  
  // Handle post save
  const handleSavePost = async () => {
    const errors = validatePostForm(editingPost);
    if (Object.keys(errors).length > 0) {
      setPostFormErrors(errors);
      showToast('Please fix the form errors', 'error');
      return;
    }
    
    setPostFormLoading(true);
    setPostFormErrors({});
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (editingPost.id && blogPosts.find(p => p.id === editingPost.id)) {
      setBlogPosts(blogPosts.map(post => 
        post.id === editingPost.id ? { ...editingPost, date: new Date().toISOString().split('T')[0] } : post
      ));
      showToast('Post updated successfully!', 'success');
    } else {
      const newPost = {
        ...editingPost,
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        views: 0,
      };
      setBlogPosts([newPost, ...blogPosts]);
      showToast('Post created successfully!', 'success');
    }
    
    setPostFormLoading(false);
    setIsEditing(false);
    setEditingPost(null);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    const { item, type } = deleteConfirm;
    
    if (type === 'post') {
      setBlogPosts(blogPosts.filter(post => post.id !== item.id));
      showToast('Post deleted successfully!', 'success');
    } else if (type === 'media') {
      setMediaAssets(mediaAssets.filter(asset => asset.id !== item.id));
      showToast('Media deleted successfully!', 'success');
    }
    
    setDeleteConfirm({ isOpen: false, item: null, type: null });
  };
  
  // File upload handler for images and videos
  const [uploadError, setUploadError] = useState(null);
  const [previewFiles, setPreviewFiles] = useState([]);
  
  // File type validation
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
  
  const validateFile = (file) => {
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);
    
    if (!isImage && !isVideo) {
      return { valid: false, error: `Invalid file type: ${file.name}. Allowed: JPG, PNG, GIF, WebP, MP4, WebM, MOV, AVI` };
    }
    
    if (isImage && file.size > MAX_IMAGE_SIZE) {
      return { valid: false, error: `File too large: ${file.name}. Maximum image size is 10MB` };
    }
    
    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      return { valid: false, error: `File too large: ${file.name}. Maximum video size is 50MB` };
    }
    
    return { valid: true, type: isImage ? 'image' : 'video' };
  };
  
  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setUploadError(null);
    setPreviewFiles([]);
    
    const validFiles = [];
    const errors = [];
    
    // Validate all files first
    for (let i = 0; i < files.length; i++) {
      const validation = validateFile(files[i]);
      if (validation.valid) {
        validFiles.push({
          file: files[i],
          type: validation.type,
          id: Date.now() + i
        });
      } else {
        errors.push(validation.error);
      }
    }
    
    if (errors.length > 0) {
      setUploadError(errors.join('\n'));
      showToast(errors[0], 'error');
    }
    
    if (validFiles.length === 0) return;
    
    // Create previews
    const previews = validFiles.map(({ file, type, id }) => ({
      id,
      name: file.name,
      type,
      size: file.size,
      sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      preview: type === 'image' ? URL.createObjectURL(file) : null,
      videoUrl: type === 'video' ? URL.createObjectURL(file) : null,
      category: 'Media Gallery',
      mediaType: type === 'image' ? 'Gallery' : 'Video'
    }));
    
    setPreviewFiles(previews);
    event.target.value = ''; // Reset input
  };
  
  // Confirm upload from previews
  const confirmUpload = () => {
    if (previewFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Save to localStorage for persistence
          const newAssets = previewFiles.map((preview) => ({
            id: preview.id,
            type: preview.type,
            mediaType: preview.mediaType,
            name: preview.name,
            url: preview.preview || preview.videoUrl,
            size: preview.sizeFormatted,
            sizeBytes: preview.size,
            date: new Date().toISOString().split('T')[0],
            uploadedAt: new Date().toISOString(),
            category: preview.category,
            sizeType: preview.sizeBytes < 1024 * 1024 ? 'small' : preview.sizeBytes < 5 * 1024 * 1024 ? 'medium' : 'large',
            uniqueId: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          }));
          
          // Save metadata to localStorage
          const storedMedia = JSON.parse(localStorage.getItem('agi_media') || '[]');
          const updatedMedia = [...newAssets, ...storedMedia];
          localStorage.setItem('agi_media', JSON.stringify(updatedMedia));
          
          setMediaAssets([...newAssets, ...mediaAssets]);
          setPreviewFiles([]);
          setIsUploading(false);
          setUploadProgress(0);
          showToast(`${newAssets.length} file(s) uploaded successfully!`, 'success');
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };
  
  // Cancel preview
  const cancelPreview = () => {
    previewFiles.forEach(file => {
      if (file.preview) URL.revokeObjectURL(file.preview);
      if (file.videoUrl) URL.revokeObjectURL(file.videoUrl);
    });
    setPreviewFiles([]);
  };
  
  // Delete single preview
  const removePreview = (id) => {
    const fileToRemove = previewFiles.find(f => f.id === id);
    if (fileToRemove) {
      if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
      if (fileToRemove.videoUrl) URL.revokeObjectURL(fileToRemove.videoUrl);
    }
    setPreviewFiles(previewFiles.filter(f => f.id !== id));
  };
  
  // Delete media
  const deleteMedia = (asset) => {
    setDeleteConfirm({ isOpen: true, item: asset, type: 'media' });
  };
  
  // Toggle publish status
  const togglePublishStatus = (id) => {
    setBlogPosts(blogPosts.map(post => 
      post.id === id 
        ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
        : post
    ));
    showToast('Post status updated!', 'success');
  };
  
  // Delete post
  const deletePost = (post) => {
    setDeleteConfirm({ isOpen: true, item: post, type: 'post' });
  };
  
  // Toggle selection
  const toggleSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  
  // Delete selected
  const deleteSelected = () => {
    setMediaAssets(mediaAssets.filter(asset => !selectedItems.includes(asset.id)));
    setSelectedItems([]);
    showToast(`${selectedItems.length} item(s) deleted!`, 'success');
  };
  
  // Save media
  const handleSaveMedia = (mediaData) => {
    if (editingMedia) {
      setMediaAssets(mediaAssets.map(m => m.id === mediaData.id ? mediaData : m));
      showToast('Media updated successfully!', 'success');
    } else {
      setMediaAssets([mediaData, ...mediaAssets]);
      showToast('Media added successfully!', 'success');
    }
    setEditingMedia(null);
  };
  
  // Tabs configuration
  const tabs = [
    { id: 'media', label: 'Media Hub', icon: Images },
    { id: 'posts', label: 'Blog Posts', icon: FileText },
    { id: 'applications', label: 'Applications', icon: Users },
  ];

  // Media Card Component
  const MediaCard = ({ asset, isSelected, onToggleSelect, onDelete, onPreview, onEdit, isDark }) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className={`relative group rounded-xl overflow-hidden ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
    >
      <div 
        className="aspect-square relative overflow-hidden cursor-pointer"
        onClick={() => onPreview(asset)}
      >
        {asset.type === 'video' || asset.embedUrl ? (
          <div className="w-full h-full relative">
            <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Play size={40} className="text-white" />
            </div>
          </div>
        ) : asset.type === 'link' ? (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <Link2 size={40} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
          </div>
        ) : (
          <img src={asset.url} alt={asset.title} className="w-full h-full object-cover" />
        )}
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <MediaTypeBadge type={asset.mediaType} />
        </div>
        
        {/* Actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 text-white" onClick={() => onPreview(asset)}>
            <Eye size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onEdit(asset); }} className="p-2 bg-white/20 rounded-lg hover:bg-white/30 text-white">
            <Edit3 size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(asset); }} className="p-2 bg-red-500/80 rounded-lg hover:bg-red-600 text-white">
            <Trash2 size={18} />
          </button>
        </div>
        
        {/* Selection */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSelect(); }}
          className={`absolute top-2 right-2 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
            isSelected ? 'bg-red-600 border-red-600' : 'border-white/50 bg-black/20'
          }`}
        >
          {isSelected && <Check size={14} className="text-white" />}
        </button>
      </div>
      
      <div className="p-3">
        <p className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{asset.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{asset.category}</span>
          {asset.location && (
            <>
              <span className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>•</span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{asset.location}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </AnimatePresence>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title={`Delete ${deleteConfirm.type === 'post' ? 'Post' : 'Media'}?`}
        message={`Are you sure you want to delete "${deleteConfirm.item?.name || deleteConfirm.item?.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteConfirm({ isOpen: false, item: null, type: null })}
        isDanger={true}
        isDark={isDark}
      />

      {/* Media Preview Modal */}
      <MediaPreviewModal
        asset={previewAsset}
        isOpen={!!previewAsset}
        onClose={() => setPreviewAsset(null)}
        isDark={isDark}
      />
      
      {/* Add/Edit Media Modal */}
      <MediaFormModal
        isOpen={showMediaForm}
        onClose={() => { setShowMediaForm(false); setEditingMedia(null); }}
        onSave={handleSaveMedia}
        editingMedia={editingMedia}
        isDark={isDark}
      />

      {/* Admin Header */}
      <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-50`}>
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img 
                  src="https://res.cloudinary.com/djjgkezui/image/upload/v1773797044/AGI-ACCRA4_ltlvql.png" 
                  alt="AGI ACCRA" 
                  className={`h-8 sm:h-10 w-auto ${isDark ? '' : 'brightness-0 invert'}`}
                />
              </Link>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDark ? (
                  <span className="text-yellow-400">☀️</span>
                ) : (
                  <span className="text-gray-600">🌙</span>
                )}
              </button>
              
              <Link 
                to="/"
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-sm ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } transition-colors`}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Exit</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`lg:hidden sticky top-16 z-40 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="flex overflow-x-auto px-4 py-2 gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsEditing(false);
                  setEditingPost(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : isDark 
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <nav className={`rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} p-3 sticky top-36`}>
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsEditing(false);
                      setEditingPost(null);
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/25'
                        : isDark 
                          ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium text-sm">{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              
              {/* ==================== POSTS TAB ==================== */}
              {activeTab === 'posts' && (
                <motion.div
                  key="posts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Post Editor Modal */}
                  <AnimatePresence>
                    {isEditing && editingPost && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm"
                      >
                        <div className="min-h-screen flex items-start justify-center p-4 pt-8 sm:pt-16">
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className={`w-full max-w-4xl rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'} mb-8`}
                          >
                            <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <h2 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {editingPost.id && blogPosts.find(p => p.id === editingPost.id) ? 'Edit Post' : 'Create New Post'}
                              </h2>
                              <button
                                onClick={() => { setIsEditing(false); setEditingPost(null); setPostFormErrors({}); }}
                                className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                              >
                                <X size={20} />
                              </button>
                            </div>

                            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                  Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  value={editingPost.title || ''}
                                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                                  placeholder="Enter post title..."
                                  className={`w-full px-4 py-3 rounded-xl border text-base ${
                                    postFormErrors.title ? 'border-red-500' : isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                                  } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                                />
                                {postFormErrors.title && <p className="mt-1 text-sm text-red-500">{postFormErrors.title}</p>}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Category <span className="text-red-500">*</span></label>
                                  <select
                                    value={editingPost.category || ''}
                                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                                    className={`w-full px-4 py-3 rounded-xl border text-base ${
                                      postFormErrors.category ? 'border-red-500' : isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'
                                    } ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                                  >
                                    <option value="">Select Category</option>
                                    {blogCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                                  </select>
                                </div>
                                <div>
                                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                                  <select
                                    value={editingPost.status || 'draft'}
                                    onChange={(e) => setEditingPost({...editingPost, status: e.target.value})}
                                    className={`w-full px-4 py-3 rounded-xl border text-base ${isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'} ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                                  >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Featured Image</label>
                                <div className={`border-2 border-dashed rounded-xl p-4 sm:p-6 text-center ${isDark ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`}>
                                  {editingPost.featuredImage ? (
                                    <div className="relative">
                                      <img src={editingPost.featuredImage} alt="Featured" className="max-h-48 mx-auto rounded-lg" />
                                      <button onClick={() => setEditingPost({...editingPost, featuredImage: ''})} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"><X size={14} /></button>
                                    </div>
                                  ) : (
                                    <>
                                      <ImagePlus size={32} className={`mx-auto mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                                      <input
                                        type="text"
                                        value={editingPost.featuredImage || ''}
                                        onChange={(e) => setEditingPost({...editingPost, featuredImage: e.target.value})}
                                        placeholder="Or enter image URL..."
                                        className={`mt-3 w-full px-4 py-2 rounded-lg border text-sm ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-white'}`}
                                      />
                                    </>
                                  )}
                                </div>
                              </div>

                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Excerpt</label>
                                <textarea
                                  value={editingPost.excerpt || ''}
                                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                                  rows={2}
                                  className={`w-full px-4 py-3 rounded-xl border text-base ${isDark ? 'border-gray-600 focus:ring-red-500' : 'border-gray-200 focus:ring-red-500'} ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2`}
                                />
                              </div>

                              <div>
                                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Content <span className="text-red-500">*</span></label>
                                <RichTextEditor
                                  value={editingPost.content || ''}
                                  onChange={(content) => setEditingPost({...editingPost, content})}
                                  isDark={isDark}
                                />
                                {postFormErrors.content && <p className="mt-1 text-sm text-red-500">{postFormErrors.content}</p>}
                              </div>
                            </div>

                            <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                              <div className="flex gap-3 w-full sm:w-auto">
                                <button
                                  onClick={handleSavePost}
                                  disabled={postFormLoading}
                                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50"
                                >
                                  {postFormLoading ? <LoadingSpinner className="text-white" /> : <Save size={18} />}
                                  {postFormLoading ? 'Saving...' : 'Save Post'}
                                </button>
                                {editingPost.status === 'draft' && (
                                  <button
                                    onClick={() => { setEditingPost({...editingPost, status: 'published'}); setTimeout(handleSavePost, 100); }}
                                    disabled={postFormLoading}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50"
                                  >
                                    <Send size={18} /> Publish
                                  </button>
                                )}
                              </div>
                              <button onClick={() => { setIsEditing(false); setEditingPost(null); }} className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-medium ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Cancel</button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isEditing && (
                    <>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                          <h2 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Blog Posts</h2>
                          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Create, edit, and manage your blog content</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingPost({ id: null, title: '', category: '', status: 'draft', content: '', featuredImage: '', excerpt: '', author: 'Current User' });
                            setIsEditing(true);
                            setPostFormErrors({});
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 w-full sm:w-auto justify-center"
                        >
                          <Plus size={18} /> New Post
                        </button>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                        <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                          <p className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{blogPosts.length}</p>
                          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Posts</p>
                        </div>
                        <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                          <p className={`text-xl sm:text-2xl font-black text-green-500`}>{blogPosts.filter(p => p.status === 'published').length}</p>
                          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Published</p>
                        </div>
                        <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                          <p className={`text-xl sm:text-2xl font-black text-yellow-500`}>{blogPosts.filter(p => p.status === 'draft').length}</p>
                          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Drafts</p>
                        </div>
                        <div className={`rounded-xl p-4 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                          <p className={`text-xl sm:text-2xl font-black text-red-500`}>{blogPosts.reduce((acc, p) => acc + p.views, 0).toLocaleString()}</p>
                          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Views</p>
                        </div>
                      </div>

                      <div className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                            <input
                              type="text"
                              placeholder="Search posts..."
                              value={postSearchQuery}
                              onChange={(e) => setPostSearchQuery(e.target.value)}
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} focus:ring-2 focus:ring-red-500 outline-none`}
                            />
                          </div>
                          <select
                            value={postCategoryFilter}
                            onChange={(e) => setPostCategoryFilter(e.target.value)}
                            className={`px-4 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} focus:ring-2 focus:ring-red-500 outline-none`}
                          >
                            <option value="all">All Categories</option>
                            {blogCategories.map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                          </select>
                          <select
                            value={postStatusFilter}
                            onChange={(e) => setPostStatusFilter(e.target.value)}
                            className={`px-4 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} focus:ring-2 focus:ring-red-500 outline-none`}
                          >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      </div>

                      <div className={`overflow-x-auto rounded-xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                        <table className="w-full">
                          <thead className={isDark ? 'bg-gray-700/50' : 'bg-gray-50'}>
                            <tr>
                              <th className={`px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Title</th>
                              <th className={`px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Category</th>
                              <th className={`px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Author</th>
                              <th className={`px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Views</th>
                              <th className={`px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Date</th>
                              <th className={`px-4 sm:px-6 py-4 text-left text-xs font-bold uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Status</th>
                              <th className={`px-4 sm:px-6 py-4 text-right text-xs font-bold uppercase ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Actions</th>
                            </tr>
                          </thead>
                          <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-100'}`}>
                            {filteredBlogPosts.map((post) => (
                              <tr key={post.id} className={isDark ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'}>
                                <td className="px-4 sm:px-6 py-4">
                                  <div className="flex items-center gap-3">
                                    {post.featuredImage ? (
                                      <img src={post.featuredImage} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" />
                                    ) : (
                                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        <FileText size={20} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                                      </div>
                                    )}
                                    <p className={`font-medium text-sm sm:text-base truncate max-w-[150px] sm:max-w-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>{post.title}</p>
                                  </div>
                                </td>
                                <td className={`px-4 sm:px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{post.category}</td>
                                <td className={`px-4 sm:px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{post.author}</td>
                                <td className={`px-4 sm:px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{post.views.toLocaleString()}</td>
                                <td className={`px-4 sm:px-6 py-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{post.date}</td>
                                <td className="px-4 sm:px-6 py-4"><StatusBadge status={post.status} /></td>
                                <td className="px-4 sm:px-6 py-4">
                                  <div className="flex items-center justify-end gap-1 sm:gap-2">
                                    <button onClick={() => navigate(`/blog/${post.id}`)} className={`p-1.5 sm:p-2 rounded-lg ${isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}><Eye size={16} /></button>
                                    <button onClick={() => { setEditingPost(post); setIsEditing(true); setPostFormErrors({}); }} className={`p-1.5 sm:p-2 rounded-lg ${isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}><Edit3 size={16} /></button>
                                    <button onClick={() => togglePublishStatus(post.id)} className={`p-1.5 sm:p-2 rounded-lg ${isDark ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}>
                                      {post.status === 'published' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                    </button>
                                    <button onClick={() => deletePost(post)} className={`p-1.5 sm:p-2 rounded-lg ${isDark ? 'hover:bg-red-900 text-red-400' : 'hover:bg-red-100 text-red-600'}`}><Trash2 size={16} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* ==================== MEDIA HUB TAB ==================== */}
              {activeTab === 'media' && (
                <motion.div
                  key="media"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Media Hub</h2>
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Manage images, videos, and external links</p>
                    </div>
                    <button
                      onClick={() => { setEditingMedia(null); setShowMediaForm(true); }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 w-full sm:w-auto justify-center"
                    >
                      <Plus size={18} /> Add New Media
                    </button>
                  </div>

                  {/* Filters */}
                  <div className={`rounded-2xl p-4 mb-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <input
                          type="text"
                          placeholder="Search media..."
                          value={mediaSearchQuery}
                          onChange={(e) => setMediaSearchQuery(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} focus:ring-2 focus:ring-red-500 outline-none`}
                        />
                      </div>
                      <div className="flex gap-2 overflow-x-auto">
                        {mediaCategories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setMediaCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                              mediaCategoryFilter === cat
                                ? 'bg-red-600 text-white'
                                : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <div className={`flex rounded-xl overflow-hidden border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}><Grid size={18} /></button>
                        <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}><List size={18} /></button>
                      </div>
                    </div>
                  </div>

                  {/* Bulk Actions */}
                  {selectedItems.length > 0 && (
                    <div className={`rounded-xl p-4 mb-6 flex items-center justify-between ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
                      <p className={`text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>{selectedItems.length} item(s) selected</p>
                      <button onClick={deleteSelected} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700">
                        <Trash2 size={18} /> Delete Selected
                      </button>
                    </div>
                  )}

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {filteredMedia.map((asset) => (
                      <MediaCard
                        key={asset.id}
                        asset={asset}
                        isSelected={selectedItems.includes(asset.id)}
                        onToggleSelect={() => toggleSelection(asset.id)}
                        onDelete={deleteMedia}
                        onPreview={setPreviewAsset}
                        onEdit={(media) => { setEditingMedia(media); setShowMediaForm(true); }}
                        isDark={isDark}
                      />
                    ))}
                  </div>

                  {filteredMedia.length === 0 && (
                    <div className={`rounded-xl p-8 sm:p-12 text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                      <FolderOpen size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                      <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No media found</p>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Add images, videos, or external links</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ==================== APPLICATIONS TAB ==================== */}
              {activeTab === 'applications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    <div>
                      <h2 className="text-2xl font-bold">Membership Applications</h2>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Manage and track membership applications
                      </p>
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Total: {applications.length} application(s)
                    </div>
                  </div>

                  {/* Applications List */}
                  {applications.length === 0 ? (
                    <div className={`rounded-xl p-8 sm:p-12 text-center ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                      <Users size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                      <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No applications yet</p>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Membership applications will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app, index) => (
                        <div
                          key={app.serialNumber || index}
                          className={`rounded-xl p-4 sm:p-6 ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  {app.organizationName || 'Organization Name'}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                  app.status === 'declined' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {app.status === 'accepted' ? 'Accepted' : 
                                   app.status === 'declined' ? 'Declined' : 'Pending'}
                                </span>
                              </div>
                              <div className={`text-sm space-y-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                <p><span className="font-medium">Serial No:</span> {app.serialNumber || 'N/A'}</p>
                                <p><span className="font-medium">Email:</span> {app.email || 'N/A'}</p>
                                <p><span className="font-medium">Submitted:</span> {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}</p>
                                <p><span className="font-medium">Sectors:</span> {app.selectedSectors?.join(', ') || 'N/A'}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => generateApplicationPDF(app)}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white`}
                              >
                                <FileText size={16} />
                                Download PDF
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(app.serialNumber, 'accepted')}
                                disabled={app.status === 'accepted'}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  app.status === 'accepted' 
                                    ? 'bg-green-600 text-white cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                              >
                                <CheckCircle size={16} />
                                Accept
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(app.serialNumber, 'pending')}
                                disabled={app.status === 'pending'}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  app.status === 'pending'
                                    ? 'bg-yellow-500 text-white cursor-not-allowed'
                                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                }`}
                              >
                                <Clock size={16} />
                                Pending
                              </button>
                              <button
                                onClick={() => updateApplicationStatus(app.serialNumber, 'declined')}
                                disabled={app.status === 'declined'}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  app.status === 'declined'
                                    ? 'bg-red-600 text-white cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700 text-white'
                                }`}
                              >
                                <XCircle size={16} />
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
