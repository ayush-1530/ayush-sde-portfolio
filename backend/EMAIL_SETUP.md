# Email Setup Guide for Contact Form

## Overview
When someone fills out the contact form on your portfolio website, an email will be sent to **ayushnegiuk@gmail.com** with their details.

## Setup Steps

### 1. Create a Gmail App Password

Since you're using Gmail, you need to create an **App Password** (not your regular Gmail password) for security:

1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "How you sign in to Google", enable **2-Step Verification** (if not already enabled)
4. After enabling 2-Step Verification, go back to Security
5. Click on **App passwords**: https://myaccount.google.com/apppasswords
6. Select app: **Mail**
7. Select device: **Other (Custom name)** → Type "Portfolio Backend"
8. Click **Generate**
9. Copy the 16-digit password (it will look like: `abcd abcd abcd abcd`)

### 2. Update the `.env` File

Open `backend/.env` and update:

```bash
# Your Gmail account that will SEND the emails (and also RECEIVE them)
SENDER_EMAIL=your_email@gmail.com

# Paste the 16-digit app password (remove spaces)
SENDER_PASSWORD=abcdefghijklmnop

# Note: Receiver email is now hardcoded to ayushnegiuk@gmail.com
# You don't need to configure RECEIVER_EMAIL anymore.
```

### 3. Test the Setup

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Go to the Contact page and fill out the form
4. Click "Send Message"
5. ERROR CHECKING:
   - If it fails, check the backend terminal for error messages
   - "SMTP Authentication failed" = Wrong email or password
   - "Connection refused" = Network issue

## How It Works

1. User fills out contact form (Name, Email, Message)
2. Backend receives request
3. Backend authenticates with Gmail using your `SENDER_EMAIL` creds
4. Backend sends email **FROM** `SENDER_EMAIL` **TO** `ayushnegiuk@gmail.com`
5. The user's email is set as "Reply-To", so when you click Reply, it goes to them.

## Troubleshooting

### "Failed to send email: Authentication failed"
- Make sure you're using an **App Password**, not your regular Gmail password
- Ensure 2-Step Verification is enabled on your Google Account

### "Failed to send email: Connection refused"
- Check your internet connection
- Make sure port 587 is not blocked by firewall

### Email not received
- Check spam/junk folder
- Verify `RECEIVER_EMAIL` is set to `ayushnegiuk@gmail.com`
- Check backend logs for errors

## Security Notes

- **Never commit `.env` file to Git** (it's already in `.gitignore`)
- The App Password is specific to this application
- You can revoke the App Password anytime from your Google Account settings
