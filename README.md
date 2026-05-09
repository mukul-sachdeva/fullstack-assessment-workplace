📊 Fullstack Assessment – NFT Stats Dashboard
Overview

This project is a fullstack implementation of an NFT Stats Dashboard feature, built as part of the assessment requirements. It includes both backend API integration and frontend UI enhancements with real-time wallet connection handling via MetaMask.

The system displays NFT metrics and wallet connection status while integrating seamlessly into the existing dashboard architecture.

🚀 Features Implemented
🔹 Backend API
Created GET /transactions/nft-stats endpoint
Returns structured response:
{
  "totalNFTs": number,
  "walletConnected": boolean
}
Currently uses mock data (can be replaced with DB aggregation logic)
Proper error handling with try/catch and HTTP status codes
🔹 Frontend NFT Stats Module

Created src/components/NFTStats.js:

Fetches data from backend API using existing Api.http service
Displays:
Total NFT count
Wallet connection status
Implements loading state
Uses reusable Address component for wallet display
Refreshes stats automatically on wallet change
🔹 Wallet Integration (MetaMask)

Implemented lightweight wallet context:

Detects wallet connection via window.ethereum
Supports:
Auto-detection of existing wallet (eth_accounts)
Manual connection (eth_requestAccounts)
Real-time account switching
Exposes:
address
connected
connectWallet()

Wallet address is displayed in truncated format:

0x1234...abcd
🔹 Routing Integration
Added /dashboard/nft-stats route
Integrated into existing dashboard navigation system
🔹 UI Integration Decision (Important Note)

The original NFT page was hidden using existing admin-based navigation logic:

{
  "pathName": "NFT",
  "admin": true
}

And replaced with NFT Stats in navigation due to:

Existing layout constraints in dashboard UI
Non-responsive navbar behavior (fixed-width issue)
Requirement focus being functionality over redesign

No core styles were modified to maintain consistency with existing system design.

🧠 Architecture Decisions
Reused existing Api.http abstraction for backend calls
Used React Context for wallet state management
Avoided unnecessary global state changes (Redux not used for wallet to keep it lightweight)
Kept backend logic inside existing controller structure (no unnecessary model additions)
🧪 Testing
Wallet Testing
Tested using MetaMask browser extension
Verified:
Account connection
Account switching
Disconnection behavior
Real-time UI updates
API Testing
Verified /transactions/nft-stats returns valid JSON
Handled both success and error responses
⚙️ How to Run
Backend
cd server
npm install
npm run dev
Frontend
npm install
npm start
📌 Key Endpoints
Method	Endpoint	Description
GET	/transactions/nft-stats	Returns NFT stats
📁 Project Structure (Relevant Parts)
src/
 ├── components/
 │    ├── NFTStats.js
 │    ├── Address.js
 │
 ├── hooks/
 │    ├── UserProvider.js
 │    ├── index.js
 │
 ├── api/
 │    ├── requests/
 │
server/
 ├── routes/
 │    ├── transactions.js
 ├── controllers/
📈 Improvements (If Extended Further)

If this project were production-hardened, next steps would include:

Replace mock NFT count with blockchain or DB aggregation
Add caching layer for stats endpoint
Improve wallet state persistence (localStorage sync)
Add error boundary UI for API failures
Add loading skeleton instead of text loader
👨‍💻 Summary

This implementation fulfills all assessment requirements:

Backend API endpoint
Wallet integration via MetaMask
Frontend dashboard component
Routing integration
Real-time UI updates

The solution focuses on clean architecture, modular design, and working integration over UI redesign, aligning with existing codebase constraints.
