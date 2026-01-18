
import React from 'react';
import { MOCK_POSTS } from '../constants';

const Community: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <header className="text-center">
        <h2 className="text-3xl font-serif font-bold text-mountain">Yatri Sangam</h2>
        <p className="text-gray-500">Connect with fellow travelers and share your Devbhoomi stories.</p>
      </header>

      {/* Create Post */}
      <div className="glass p-6 rounded-3xl space-y-4 shadow-sm">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-saffron rounded-full flex items-center justify-center text-white font-bold">A</div>
          <textarea 
            className="flex-1 bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-0 resize-none h-24"
            placeholder="What's your spiritual insight today?"
          />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-mountain transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-mountain transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <button className="bg-mountain text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
            Share
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {MOCK_POSTS.map(post => (
          <article key={post.id} className="glass rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <img src={post.avatar} alt={post.user} className="w-12 h-12 rounded-full object-cover ring-2 ring-saffron/20" />
                  <div>
                    <h4 className="font-bold text-gray-900">{post.user}</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{post.timestamp} • {post.location}</p>
                  </div>
                </div>
                <button className="text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </button>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{post.content}</p>
              
              {post.image && (
                <div className="rounded-2xl overflow-hidden aspect-video">
                  <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex items-center gap-6 pt-2">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors group">
                  <svg className="w-6 h-6 group-active:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-mountain transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm font-medium">{post.comments}</span>
                </button>
                <button className="ml-auto text-gray-500 hover:text-saffron transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Community;
