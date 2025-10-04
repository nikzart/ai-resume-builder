# Deployment Guide

## Deploying to Vercel

### Prerequisites
- A Vercel account (free tier works)
- Azure OpenAI API access

### Step-by-Step Instructions

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**

   Add these in Vercel Dashboard → Settings → Environment Variables:

   ```
   AZURE_OPENAI_API_KEY=your_api_key_here
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_DEPLOYMENT_NAME=your-deployment-name
   AZURE_OPENAI_API_VERSION=2025-01-01-preview
   NEXT_PUBLIC_USE_FALLBACK_PDF=true
   ```

   ⚠️ **Important**: Set `NEXT_PUBLIC_USE_FALLBACK_PDF=true` for Vercel deployment!

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a URL like: `https://your-app.vercel.app`

### Environment Variables Explained

- `AZURE_OPENAI_API_KEY` - Your Azure OpenAI API key
- `AZURE_OPENAI_ENDPOINT` - Your Azure OpenAI endpoint URL
- `AZURE_OPENAI_DEPLOYMENT_NAME` - Your deployment name (e.g., "gpt-4", "o4-mini")
- `AZURE_OPENAI_API_VERSION` - API version (use `2025-01-01-preview`)
- `NEXT_PUBLIC_USE_FALLBACK_PDF` - **Set to `true` for Vercel** (Puppeteer doesn't work on serverless)

### PDF Generation on Vercel

**Important Note**: The screenshot-based PDF generation (with Puppeteer) **does NOT work** on Vercel's serverless functions.

When `NEXT_PUBLIC_USE_FALLBACK_PDF=true`, the app uses `@react-pdf/renderer` which:
- ✅ Works on Vercel
- ✅ Generates valid PDFs
- ❌ PDFs won't include icons
- ❌ PDFs won't exactly match web preview styling

### Local Development vs Production

**Local Development** (with Puppeteer):
```env
NEXT_PUBLIC_USE_FALLBACK_PDF=false
```
- PDFs match web preview exactly
- Includes all icons and styling
- Requires Chrome/Chromium

**Vercel Production** (without Puppeteer):
```env
NEXT_PUBLIC_USE_FALLBACK_PDF=true
```
- Simpler PDF generation
- No icons in PDF
- Works on serverless

### Troubleshooting

**Build fails on Vercel:**
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

**PDF generation fails:**
- Verify `NEXT_PUBLIC_USE_FALLBACK_PDF=true` is set
- Check API route logs in Vercel dashboard

**OpenAI errors:**
- Verify Azure OpenAI credentials
- Check API key has correct permissions
- Ensure deployment name matches your Azure setup

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatic

### Monitoring

- View logs: Vercel Dashboard → Deployments → Click deployment → Logs
- View analytics: Vercel Dashboard → Analytics
- Set up error alerts: Settings → Integrations

## Alternative: Deploy with Full Puppeteer Support

If you need screenshot-quality PDFs, deploy to a platform that supports Puppeteer:

### Railway.app
- Supports Docker containers
- Can run Puppeteer/Chrome
- Start at $5/month

### Render.com
- Supports native services
- Puppeteer works out of the box
- Free tier available

### DigitalOcean App Platform
- Full VM support
- Puppeteer compatible
- Start at $5/month

For these platforms, keep `NEXT_PUBLIC_USE_FALLBACK_PDF=false`
