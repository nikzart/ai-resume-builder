# Deploy to Railway - Complete Guide

Railway is the **recommended platform** for this app because Puppeteer works perfectly there (unlike Vercel).

## Why Railway?

✅ **Puppeteer Support** - Full Chrome/Chromium support
✅ **Screenshot-Quality PDFs** - PDFs match web preview exactly with icons
✅ **Affordable** - $5/month for hobby plan
✅ **Easy Setup** - Deploy in 5 minutes
✅ **Auto Scaling** - Handles traffic automatically

---

## 🚀 Quick Deploy (5 Minutes)

### Step 1: Sign Up to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Login"** → Sign in with GitHub
3. Authorize Railway to access your GitHub

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **`nikzart/ai-resume-builder`**
4. Railway auto-detects Next.js configuration

### Step 3: Configure Environment Variables

Click **"Variables"** tab and add these:

```env
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_DEPLOYMENT_NAME=o4-mini
AZURE_OPENAI_API_VERSION=2025-01-01-preview
NODE_ENV=production
```

**How to add:**
- Click "+ New Variable"
- Paste variable name (e.g., `AZURE_OPENAI_API_KEY`)
- Paste value
- Repeat for all variables

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 3-5 minutes for build
3. Railway provides a URL: `https://your-app.up.railway.app`

### Step 5: Test Your App

1. Open the Railway URL
2. Try uploading a CV
3. Download a PDF → Should have icons and match preview exactly!

---

## 📋 Configuration Files Explained

### `railway.json`
Tells Railway how to build and deploy:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### `nixpacks.toml`
Includes Chromium for Puppeteer:
```toml
[phases.setup]
nixPkgs = ["nodejs_18", "chromium"]
```

This ensures Puppeteer can run Chrome for PDF generation.

---

## 💰 Pricing

**Hobby Plan**: $5/month
- 512 MB RAM
- 1 GB storage
- More than enough for this app
- Sleep after 1 hour of inactivity (wakes instantly)

**Pro Plan**: $20/month
- More resources
- No sleep
- Priority support

Start with Hobby - you can upgrade anytime.

---

## 🔧 Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `resume.yourdomain.com`)
4. Add DNS records shown by Railway
5. SSL certificate is automatic

---

## 📊 Monitoring & Logs

### View Logs
1. Click your service in Railway dashboard
2. Click **"Deployments"**
3. Select active deployment
4. See real-time logs

### Metrics
Railway shows:
- CPU usage
- Memory usage
- Request count
- Response times

---

## 🐛 Troubleshooting

### Build Fails
**Check:**
- Environment variables are set correctly
- GitHub repo is synced
- Build logs for specific errors

**Common fixes:**
```bash
# Clear Railway cache
Settings → Redeploy

# Check Node version
railway run node --version
```

### Puppeteer Errors
**Error**: `Could not find Chrome`

**Fix**: Make sure `nixpacks.toml` includes:
```toml
nixPkgs = ["nodejs_18", "chromium"]
```

### PDF Generation Slow
**Issue**: First PDF takes 10-15 seconds

**Explanation**: Browser pool initializes on first request. Subsequent PDFs are 2-3 seconds.

**Fix**: Keep Railway hobby plan awake with a cron job:
```bash
# Ping every 10 minutes
*/10 * * * * curl https://your-app.up.railway.app
```

---

## 🔄 Continuous Deployment

Railway auto-deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Updated feature"
git push

# Railway detects push and auto-deploys
```

No manual deployment needed!

---

## 🆚 Railway vs Vercel

| Feature | Railway | Vercel |
|---------|---------|--------|
| **Puppeteer Support** | ✅ Yes | ❌ No |
| **PDF Quality** | ✅ Perfect (with icons) | ⚠️ Basic (no icons) |
| **Price** | $5/month | Free |
| **Setup** | 5 minutes | 3 minutes |
| **Best For** | This app (Puppeteer) | Static sites |

**Recommendation**: Use Railway for production, Vercel for demos/testing.

---

## 📞 Support

**Railway Docs**: [docs.railway.app](https://docs.railway.app)
**Discord**: [discord.gg/railway](https://discord.gg/railway)
**Status**: [status.railway.app](https://status.railway.app)

---

## ✅ Checklist

Before deploying:
- [ ] GitHub repo is public/accessible
- [ ] Azure OpenAI credentials ready
- [ ] Railway account created
- [ ] Environment variables prepared

After deploying:
- [ ] Test CV upload
- [ ] Test PDF download (check for icons)
- [ ] Test AI chat
- [ ] Check logs for errors
- [ ] Set up custom domain (optional)

---

## 🎉 You're Done!

Your AI Resume Builder is now live on Railway with full Puppeteer support!

**Next Steps:**
1. Share your Railway URL
2. Monitor usage in dashboard
3. Upgrade to Pro if you get more traffic

Enjoy screenshot-quality PDFs! 🚀
