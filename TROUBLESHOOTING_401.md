# 🔧 Fixing 401 Error

## What's Happening

The **401 Unauthorized** error you're seeing is actually **normal behavior**. Here's why:

### Expected Behavior:
- The **home page** (landing page) should load fine
- Protected routes (dashboard, machines, tasks) require login
- If you try to access protected routes without logging in, you get 401

---

## ✅ Solution: Login/Register First

The application is working correctly! You just need to:

### Step 1: Go to Auth Page
1. Click **"Get Started"** on home page, OR
2. Go directly to: http://localhost:5173/auth

### Step 2: Register an Account
- Fill in your details:
  - Name
  - Email
  - Password
  - Connect MetaMask wallet
- Choose your role:
  - **Provider** (if you have computing resources)
  - **Tenant** (if you need computing power)
  - **Both** (for testing both sides)

### Step 3: After Registration
- You'll be logged in automatically
- JWT token saved in localStorage
- You can now access all features!

---

## 🔍 Why Am I Seeing This Error?

### Possible Reasons:

1. **No Token in localStorage** (Not logged in)
   - Solution: Register or login

2. **Token Expired**
   - Solution: Login again

3. **Wrong Backend URL**
   - Check `frontend/.env` has: `VITE_BACKEND_URL=http://localhost:3000`

4. **Backend Not Running**
   - Check backend terminal is running
   - Should show: "running on port: 3000"

---

## 🧪 Test Backend Connection

Open browser console (F12) and run:

```javascript
// Test if backend is reachable
fetch('http://localhost:3000/api/v1/user/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

If backend is running, you should get a response.

---

## 🔑 Check Authentication

### In Browser Console (F12):

```javascript
// Check if you're logged in
console.log('Token:', localStorage.getItem('token'))
console.log('User:', localStorage.getItem('user'))
console.log('Expiry:', localStorage.getItem('tokenExpiry'))
```

If all are `null`, you need to login/register.

---

## 📋 Quick Test Flow

### Test as Provider:
1. Go to http://localhost:5173/auth
2. Register with email/password
3. Select role: **Provider**
4. Connect MetaMask
5. After login → Go to "Add Machine"
6. Fill machine specs
7. Submit

### Test as Tenant:
1. Register new account (different email)
2. Select role: **Tenant**
3. Connect MetaMask  
4. After login → Go to "Create Task"
5. Upload ZIP file
6. Create task

---

## 🐛 Still Getting 401?

### Check These:

1. **Backend Running?**
   ```bash
   # Should be running on port 3000
   # Check terminal for "running on port: 3000"
   ```

2. **Frontend .env Correct?**
   ```env
   VITE_BACKEND_URL=http://localhost:3000
   VITE_CONTRACT_ADDRESS=0x9A4682c96d43ff573A020991119A3f200411a1cA
   VITE_CHAIN_ID=11155111
   ```

3. **CORS Issue?**
   - Backend should have `cors()` middleware
   - Check backend/index.js has: `app.use(cors())`

4. **Try Clearing Cache:**
   ```javascript
   // In browser console
   localStorage.clear()
   // Then refresh page
   ```

---

## ✅ What Should Work Without Login:

- ✅ Home page (http://localhost:5173)
- ✅ Auth page (http://localhost:5173/auth)
- ✅ Registration
- ✅ Login

## ❌ What Needs Login (Will Show 401):

- ❌ Provider Dashboard
- ❌ Add Machine
- ❌ Create Task
- ❌ View Transactions
- ❌ Accept Requests

---

## 🎯 Expected User Flow:

```
1. Visit Home Page (/)
   ↓
2. Click "Get Started" or go to /auth
   ↓
3. Register Account
   ↓
4. Connect MetaMask
   ↓
5. Auto-login after registration
   ↓
6. Access Protected Features
```

---

## 💡 Pro Tip:

The 401 error is **security working as intended**! It means:
- Your authentication middleware is active ✅
- Protected routes are actually protected ✅
- You just need to login first ✅

---

## 📞 Still Need Help?

If the error persists after logging in:

1. Check browser console (F12) for exact error
2. Check backend terminal for any errors
3. Verify token is being sent with requests
4. Check network tab in browser DevTools

---

**TL;DR: The error is normal - just register/login first!** 🚀
