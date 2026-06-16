# 🔑 Step-by-Step Credentials Setup Guide

You've completed MetaMask setup. Now let's get all the credentials for the backend!

---

## ✅ Step 1: Get MongoDB Credentials (5 minutes)

### 1.1 Go to MongoDB Atlas
- Visit: https://www.mongodb.com/cloud/atlas
- Click **"Sign In"** or **"Try Free"**

### 1.2 Create a Free Cluster
- Click **"Create"** or **"Build a Database"**
- Choose **FREE M0 Shared** tier
- Select **AWS** as provider
- Choose closest region to you
- Click **"Create Cluster"**

### 1.3 Create Database User
- On left sidebar, click **"Database Access"**
- Click **"Add New Database User"**
- Authentication Method: **Password**
- Username: `decenai_user` (or any name you want)
- Password: Click **"Autogenerate Secure Password"** or create your own
- **⚠️ IMPORTANT: Copy and save this password!**
- User Privileges: **Read and write to any database**
- Click **"Add User"**

### 1.4 Whitelist Your IP
- On left sidebar, click **"Network Access"**
- Click **"Add IP Address"**
- Click **"Allow Access from Anywhere"** (for testing)
- This adds **0.0.0.0/0**
- Click **"Confirm"**

### 1.5 Get Connection String
- Go back to **"Database"** (left sidebar)
- Click **"Connect"** button on your cluster
- Choose **"Drivers"**
- Driver: **Node.js**
- Version: **5.5 or later**
- Copy the connection string that looks like:
  ```
  mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```

### 1.6 Modify Connection String
- Replace `<username>` with your username (e.g., `decenai_user`)
- Replace `<password>` with the password you saved
- Add database name `/decenAI` before the `?`

**Final format:**
```
mongodb+srv://decenai_user:YourPassword123@cluster0.xxxxx.mongodb.net/decenAI?retryWrites=true&w=majority
```

### 1.7 Update backend/.env
```env
MONGO_PASSWORD=YourPassword123
MONGODB_URI=mongodb+srv://decenai_user:YourPassword123@cluster0.xxxxx.mongodb.net/decenAI?retryWrites=true&w=majority
```

---

## ✅ Step 2: Get Pinata Credentials (5 minutes)

Pinata provides IPFS storage for your files.

### 2.1 Sign Up for Pinata
- Visit: https://www.pinata.cloud/
- Click **"Start Building"** or **"Sign Up"**
- Create account (free tier is enough)
- Verify your email

### 2.2 Create API Key
- After login, go to: https://app.pinata.cloud/developers/api-keys
- Or click **"API Keys"** in left sidebar
- Click **"New Key"** button

### 2.3 Configure API Key
- **Permissions**: Check these boxes:
  - ✅ pinFileToIPFS
  - ✅ unpin
  - ✅ pinList (optional but recommended)
- **Key Name**: `DecenAIX_Backend` (or any name)
- Click **"Create Key"**

### 2.4 Save Credentials
- You'll see a popup with:
  - **API Key**: Starts with a long alphanumeric string
  - **API Secret**: Another long alphanumeric string
- **⚠️ CRITICAL: Copy BOTH immediately!**
- **You won't see the secret again!**

### 2.5 Update backend/.env
```env
PINATA_API_KEY=your_api_key_from_pinata
PINATA_SECRET_API_KEY=your_secret_key_from_pinata
```

**Example (not real keys):**
```env
PINATA_API_KEY=a1b2c3d4e5f6g7h8i9j0
PINATA_SECRET_API_KEY=x9y8z7w6v5u4t3s2r1q0p9o8n7m6l5k4
```

---

## ✅ Step 3: Set JWT Secret (1 minute)

This is used to sign authentication tokens.

### 3.1 Generate a Random String
You can use any method:

**Option 1: Use Node.js (if you have it installed)**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Use an Online Generator**
- Visit: https://randomkeygen.com/
- Copy a "CodeIgniter Encryption Key" or "256-bit WEP Keys"

**Option 3: Just make up a long random string**
- Example: `my_jwt_secret_key_2024_decenaix_super_secure_123456`

### 3.2 Update backend/.env
```env
JWT_SECRET=paste_your_random_string_here
```

---

## ✅ Step 4: Verify Your backend/.env File

Your complete `backend/.env` should look like this:

```env
# Server Configuration
PORT=3000

# MongoDB Configuration
MONGO_PASSWORD=YourMongoPassword123
MONGODB_URI=mongodb+srv://decenai_user:YourMongoPassword123@cluster0.xxxxx.mongodb.net/decenAI?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0

# Pinata Configuration
PINATA_API_KEY=your_actual_pinata_api_key
PINATA_SECRET_API_KEY=your_actual_pinata_secret_key
```

---

## ✅ Step 5: Fix Backend Configuration Files

Now let's make sure the backend can read these environment variables.

### 5.1 Check/Fix database configuration
The file `backend/src/config/db.js` should use the full MONGODB_URI.

### 5.2 Check/Fix Pinata configuration
The file `backend/src/config/pinata.js` should read from environment variables.

---

## 🚀 Step 6: Test Backend

### 6.1 Install Dependencies
```bash
cd backend
npm install
```

### 6.2 Start Backend
```bash
npm run dev
```

### 6.3 Expected Output
You should see:
```
running on port: 3000
Connected to MongoDB
```

### 6.4 If You See Errors

**"MongooseServerSelectionError"**
- Check your MONGODB_URI is correct
- Check Network Access whitelist (0.0.0.0/0)
- Check username and password

**"Cannot find module 'dotenv'"**
```bash
npm install dotenv
```

**"Cannot find module '@pinata/sdk'"**
```bash
npm install @pinata/sdk
```

---

## 📋 Quick Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created with password saved
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string copied and modified
- [ ] Pinata account created
- [ ] Pinata API key created
- [ ] API Key and Secret saved
- [ ] JWT secret generated
- [ ] backend/.env file created with all values
- [ ] backend dependencies installed
- [ ] backend starts without errors

---

## 🆘 Troubleshooting

### Can't access MongoDB Atlas?
- Try different browser
- Check if your organization blocks MongoDB
- Use VPN if necessary

### Forgot Pinata Secret?
- You'll need to create a new API key
- Delete the old one and create fresh

### Backend won't start?
- Check for typos in .env file
- Make sure no spaces around `=` signs
- Check all environment variables are set
- Run `npm install` again

---

## 🎯 Next Steps

Once your backend is running successfully:

1. ✅ Backend .env configured and tested
2. ⏭️ Next: Deploy Smart Contract
3. ⏭️ Then: Configure Frontend .env
4. ⏭️ Finally: Full integration test

---

**You're doing great! Let me know when backend starts successfully.** 🚀
