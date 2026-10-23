import { io } from 'socket.io-client';

// Read backend url from Vite env or fallback to Render backend
const BACKEND_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_URL) || 
  (typeof process !== 'undefined' && process.env && process.env.BACKEND_URL) || 
  'https://kriyabackend.psgtech.ac.in/cybersec/ctf';

let socket = null;
const leaderboardListeners = new Set();
const userRankListeners = new Set();
const newSolveListeners = new Set();

const handleLeaderboardEvent = (payload) => {
  // payload shape from backend: { leaderboard, difficulty, timestamp, updated_user }
  const normalized = {
    difficulty: payload?.difficulty || null,
    data: payload?.leaderboard || payload?.data || payload || [],
    timestamp: payload?.timestamp || null,
    updated_user: payload?.updated_user || null
  };
  
  leaderboardListeners.forEach(cb => {
    try { 
      cb(normalized); 
    } catch (e) { 
      // Silent fail for leaderboard listeners
    }
  });
};

const handleUserRank = (payload) => {
  userRankListeners.forEach(cb => {
    try { cb(payload); } catch (e) { /* Silent fail */ }
  });
};

const handleNewSolve = (payload) => {
  newSolveListeners.forEach(cb => {
    try { cb(payload); } catch (e) { /* Silent fail */ }
  });
};

export const connectLeaderboardSocket = (onConnect = () => {}, options = {}) => {
  // WebSockets are not enabled in backend - leaderboard uses REST API endpoints
  return null;
};


export const onLeaderboardUpdate = (cb) => {
  leaderboardListeners.add(cb);
  return () => leaderboardListeners.delete(cb);
};

export const onUserRankChange = (cb) => {
  userRankListeners.add(cb);
  return () => userRankListeners.delete(cb);
};

export const onNewSolve = (cb) => {
  newSolveListeners.add(cb);
  return () => newSolveListeners.delete(cb);
};

export const disconnectLeaderboardSocket = () => {
  if (!socket) return;
  socket.off('leaderboard_update_beginner', handleLeaderboardEvent);
  socket.off('leaderboard_update_intermediate', handleLeaderboardEvent);
  socket.off('user_rank_change', handleUserRank);
  socket.off('new_solve', handleNewSolve);
  socket.disconnect();
  socket = null;
  leaderboardListeners.clear();
  userRankListeners.clear();
  newSolveListeners.clear();
};

export default {
  connectLeaderboardSocket,
  onLeaderboardUpdate,
  onUserRankChange,
  onNewSolve,
  disconnectLeaderboardSocket
};
