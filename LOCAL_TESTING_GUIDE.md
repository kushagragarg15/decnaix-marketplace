# 🧪 Local Testing Guide

Before deploying live, let's test all features to ensure everything works!

---

## ✅ Testing Checklist

### Phase 1: Basic Authentication (5 mins)

- [ ] **Register Provider Account**
  - Go to: http://localhost:5173/auth
  - Fill in details
  - Select "Provider" role
  - Connect MetaMask
  - Click Sign Up
  - Should redirect to Provider Dashboard

- [ ] **Logout and Register Tenant**
  - Logout (if there's a logout button)
  - Or use different browser/incognito mode
  - Register with different email
  - Select "Tenant" role (or "Renter")
  - Connect MetaMask
  - Should redirect to Tenant Dashboard

- [ ] **Test Login**
  - Logout
  - Click "Login" 
  - Enter email and password
  - Should login successfully

---

### Phase 2: Provider Features (5 mins)

Login as **Provider** and test:

- [ ] **Add Machine**
  - Go to "Add Machine" or "Machines" section
  - Fill machine details:
    - Machine Name: "Test GPU Server"
    - CPU: "Intel i9"
    - RAM: "32GB"
    - Storage: "1TB SSD"
    - Category: HIGH/MID/BASIC
  - Submit
  - Machine should appear in machine list
  - Status: Available

- [ ] **View Dashboard**
  - Check provider dashboard loads
  - View machines list
  - Check statistics (if any)

---

### Phase 3: Tenant Features (10 mins)

Login as **Tenant** and test:

- [ ] **Prepare Test Files**
  Create a simple training example:
  
  **main.py:**
  ```python
  print("Training started...")
  import time
  time.sleep(5)
  print("Training completed!")
  
  # Save a dummy output
  with open('output_weight.pkl', 'w') as f:
      f.write("Trained model weights")
  ```
  
  **requirements.txt:**
  ```
  # Empty or add: numpy
  ```
  
  - Zip both files into `test_model.zip`

- [ ] **Create Task**
  - Go to "Create Task" section
  - Fill details:
    - Task Name: "Test Training Task"
    - Duration: 2 hours
    - Password: "testpass123" (remember this!)
  - Upload `test_model.zip`
  - Click Submit
  - **MetaMask will pop up** - Approve transaction
  - Wait for blockchain confirmation
  - Task should be created

- [ ] **View Available Machines**
  - Go to "Select Machine" or "Machines" section
  - Should see the provider's machine
  - Send request to machine owner

---

### Phase 4: Provider Accepts Request (5 mins)

Switch to **Provider** account:

- [ ] **View Requests**
  - Go to "Requests" or "Dashboard"
  - Should see pending request from tenant
  - Shows task name, tenant address, duration
  
- [ ] **Accept Request**
  - Click "Accept" on the request
  - Machine status changes to "Unavailable"
  - Task status changes to "Working"

- [ ] **Mark Task Complete** (simulated)
  - Find the accepted task
  - Click "Mark Complete"
  - Status changes to "Completed"

---

### Phase 5: Payment Flow (5 mins)

Switch back to **Tenant** account:

- [ ] **View Completed Task**
  - Go to tasks or transactions
  - Should see task marked as "Completed"
  
- [ ] **Make Payment**
  - Click "Pay" or "Unlock"
  - **MetaMask will pop up** with payment amount
  - Approve transaction
  - Wait for confirmation
  - Payment splits: 95% to provider, 5% to platform

- [ ] **Verify on Blockchain**
  - Copy transaction hash
  - Visit: https://sepolia.etherscan.io/
  - Paste transaction hash
  - Should see:
    - Payment to provider
    - Platform fee
    - Status: Success

---

### Phase 6: View Transactions (2 mins)

- [ ] **Provider Transactions**
  - Login as provider
  - View earnings
  - Should show received payment

- [ ] **Tenant Transactions**
  - Login as tenant
  - View payments made
  - Should show payment history

---

## 🐛 Common Issues During Testing

### Issue 1: MetaMask Not Popping Up
**Solution:**
- Check you're on Sepolia network
- Click MetaMask extension manually
- Check for pending transactions

### Issue 2: Transaction Fails
**Solution:**
- Make sure you have enough Sepolia ETH
- Try increasing gas limit
- Check contract address is correct

### Issue 3: File Upload Fails
**Solution:**
- Check file is under 10MB
- Verify ZIP is valid format
- Check Pinata credentials in backend/.env

### Issue 4: Can't See Machine
**Solution:**
- Make sure machine is marked "Available"
- Refresh the page
- Check backend console for errors

---

## ✅ All Tests Passed?

If everything works:
- ✅ Authentication works
- ✅ Provider can add machines
- ✅ Tenant can create tasks
- ✅ Requests can be accepted
- ✅ Payments process correctly
- ✅ Blockchain transactions confirm

**Then you're ready to deploy live!** 🚀

---

## 📊 Expected Test Results

### Backend Console Should Show:
```
running on port: 3000
✅ Connected to MongoDB successfully
Pinata authentication successful
```

### Frontend Should Work:
- No console errors (check F12)
- All pages load
- Forms submit successfully
- MetaMask connects

### Blockchain Should Show:
- Contract calls succeed
- Transactions confirm
- Payments transfer

---

## ⏭️ Next Steps After Testing

Once local testing is complete:

1. **Fix any bugs** you found
2. **Take screenshots** of working features
3. **Record demo video** (optional)
4. **Push to GitHub**
5. **Deploy to production**

---

**Ready to test? Start with Phase 1!** 🧪
