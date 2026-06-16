# 🚀 Production Deployment Guide

## Before You Deploy

### ⚠️ Important Checklist:
- [ ] Tested locally and everything works
- [ ] Fixed all bugs found during testing
- [ ] Have screenshots/demo ready
- [ ] Pushed code to GitHub
- [ ] Ready to spend 30-60 minutes

---

## 🎯 Deployment Options

We'll deploy:
- **Backend** → Render (Free tier)
- **Frontend** → Vercel (Free tier)
- **Smart Contract** → Already on Sepolia ✅

---

## 📦 Part 1: Prepare for Deployment

### Step 1: Create GitHub Repository

```bash
cd c:\Users\namas\Downloads\DecnAIX-main\DecnAIX-main

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - DecnAIX marketplace"

# Create repo on GitHub and push
# Visit: https://github.com/new
# Create repository: decnaix-marketplace
# Then:
git remote add origin https://github.com/YOUR_USERNAME/decnaix-marketplace.git
git branch -M main
git push -u origin main
```

### Step 2: Add .gitignore

Create `.gitignore` in root:
```
# Dependencies
node_modules/
*/node_modules/

# Environment variables
.env
.env.local
backend/.env
frontend/.env

# Build outputs
dist/
build/
artifacts/
cache/

# Logs
*.log
logs/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Deployment info (contains addresses)
deployment-info.json
```

**IMPORTANT:** Make sure `.env` files are NOT pushed to GitHub!

---

## 🔴 Part 2: Deploy Backend to Render

### Step 1: Sign Up for Render
1. Go to: https://render.com/
2. Sign up with GitHub
3. Authorize Render to access your repos

### Step 2: Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `decnaix-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

### Step 3: Add Environment Variables
Click **"Environment"** tab and add:

```
MONGO_PASSWORD=your_mongodb_password
MONGODB_URI=your_full_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret_key
PORT=3000
```

**Copy from your local `backend/.env`**

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. You'll get URL like: `https://decnaix-backend.onrender.com`
4. **Save this URL!**

### Step 5: Test Backend
Visit: `https://decnaix-backend.onrender.com/api/v1/`
Should see some response (not 404)

---

## 🔵 Part 3: Deploy Frontend to Vercel

### Step 1: Sign Up for Vercel
1. Go to: https://vercel.com/
2. Sign up with GitHub
3. Authorize Vercel

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_BACKEND_URL=https://decnaix-backend.onrender.com
VITE_CONTRACT_ADDRESS=0x9A4682c96d43ff573A020991119A3f200411a1cA
VITE_CHAIN_ID=11155111
VITE_NETWORK_NAME=Sepolia Test Network
```

**Use your actual Render backend URL!**

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-5 minutes
3. You'll get URL like: `https://decnaix-marketplace.vercel.app`
4. **Save this URL!**

---

## 🔧 Part 4: Update CORS for Production

Your backend needs to allow requests from Vercel domain.

### Option 1: Allow All Origins (Easier)
Backend is already set to `app.use(cors())` which allows all origins. ✅

### Option 2: Specific Origins (More Secure)
Edit `backend/index.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://decnaix-marketplace.vercel.app', // Your Vercel URL
    'https://your-custom-domain.com' // If you add custom domain
  ],
  credentials: true
}));
```

**Commit and push** to trigger re-deployment on Render.

---

## 🧪 Part 5: Test Production Deployment

### Test Checklist:
- [ ] Visit your Vercel URL
- [ ] Home page loads correctly
- [ ] Connect MetaMask (still use Sepolia)
- [ ] Register account
- [ ] Login works
- [ ] Provider can add machines
- [ ] Tenant can create tasks
- [ ] Payments work via blockchain

### Common Production Issues:

**Issue 1: CORS Error**
- Check backend CORS settings
- Verify frontend .env has correct backend URL
- Redeploy if needed

**Issue 2: Environment Variables Not Working**
- Check they're set in Render/Vercel dashboard
- Must start with `VITE_` for frontend
- Redeploy after adding env vars

**Issue 3: Contract Not Working**
- Verify contract address in frontend env
- Make sure users are on Sepolia network
- Check Infura/RPC is working

---

## 🌐 Part 6: Custom Domain (Optional)

### For Frontend (Vercel):
1. Buy domain from Namecheap/GoDaddy
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. Wait for propagation (5-60 mins)

### For Backend (Render):
1. Settings → Custom Domains
2. Add your domain
3. Update DNS records
4. SSL certificate auto-generated

---

## 💰 Part 7: Mainnet Deployment (Optional)

**⚠️ Only do this if you want real production!**

### Deploy Contract to Ethereum Mainnet:
```bash
# Update hardhat.config.js with mainnet RPC
# Get mainnet ETH (expensive!)
npx hardhat run scripts/deploy.js --network mainnet
```

**Costs:**
- Deployment: ~$50-200 in gas fees
- Each transaction: Users pay gas

**Alternative: Use Layer 2 (Cheaper)**
- Polygon: Much lower fees
- Arbitrum: Also low fees
- Optimism: Low fees

---

## 📊 Deployment Costs

### Free Tier Limits:

**Render (Backend):**
- ✅ 750 hours/month free
- ⚠️ Sleeps after 15 mins inactivity
- ⚠️ Cold start: 30-60 seconds
- 💡 Upgrade to $7/month for always-on

**Vercel (Frontend):**
- ✅ 100GB bandwidth/month
- ✅ Unlimited projects
- ✅ Always on
- ✅ Automatic HTTPS

**MongoDB Atlas:**
- ✅ 512MB storage free
- ✅ Shared cluster
- 💡 Upgrade for more storage

**Pinata:**
- ✅ 1GB storage free
- ✅ 100 requests/month
- 💡 Upgrade for more

---

## 🎯 Post-Deployment Checklist

After going live:

- [ ] **Update README.md** with:
  - Live URL
  - Screenshots
  - Setup instructions
  - Tech stack

- [ ] **Add to Portfolio:**
  - LinkedIn project section
  - Personal portfolio website
  - GitHub profile README

- [ ] **Monitor:**
  - Check Render logs for errors
  - Monitor MongoDB usage
  - Check Pinata storage

- [ ] **Share:**
  - Tweet about it
  - Post on LinkedIn
  - Share in developer communities

---

## 📚 Example README.md

```markdown
# DecnAIX - Decentralized AI Training Marketplace

🔗 **Live Demo:** https://decnaix-marketplace.vercel.app

## About
A blockchain-based marketplace connecting AI model trainers with GPU providers. Built with React, Node.js, MongoDB, Solidity, and IPFS.

## Features
- 🔐 MetaMask wallet integration
- 💰 Crypto payments via smart contracts
- 📁 Decentralized file storage (IPFS)
- 🔒 AES-256 file encryption
- ⚡ Real-time task management

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Ethers.js
- **Backend:** Node.js, Express, MongoDB, Pinata
- **Blockchain:** Solidity, Ethereum (Sepolia)
- **Storage:** IPFS via Pinata

## Live URLs
- Frontend: https://decnaix-marketplace.vercel.app
- Backend: https://decnaix-backend.onrender.com
- Contract: 0x9A4682c96d43ff573A020991119A3f200411a1cA (Sepolia)

## Setup
[Include local setup instructions]

## Screenshots
[Add screenshots]

## Author
Your Name - [LinkedIn](link) | [GitHub](link)
```

---

## 🎉 You're Live!

Congratulations! Your DecnAIX marketplace is now:
- ✅ Deployed and accessible worldwide
- ✅ Running on free tier (no costs)
- ✅ Ready for portfolio/resume
- ✅ Ready for demos/presentations

---

## 🆘 Need Help?

If deployment fails:
1. Check Render/Vercel logs
2. Verify all environment variables
3. Test backend URL directly
4. Check CORS settings
5. Review GitHub repo structure

---

## 📈 Monitoring Your App

### Render Dashboard:
- View deployment logs
- Check uptime
- Monitor resource usage

### Vercel Dashboard:
- View analytics
- Check performance
- Monitor bandwidth

### MongoDB Atlas:
- Check storage usage
- View connections
- Monitor queries

---

**Ready to deploy? Start with Part 1!** 🚀

**Or test locally first? Use LOCAL_TESTING_GUIDE.md** 🧪
