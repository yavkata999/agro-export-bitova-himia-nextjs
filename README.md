# Агро Експорт-Импорт - B2B Static Website

A highly optimized, completely static Next.js application tailored for B2B distributor acquisition. It has been stripped of runtime backend dependencies and relies solely on static JSON data for maximum performance, security, and hosting compatibility.

## Architecture
- Next.js 14 (Pages Router, Static Export)
- TypeScript
- CSS Modules
- Jest & React Testing Library
- **EmailJS** (Browser SDK for form processing without API routes)

## Environment Variables

Create a `.env.local` file in the root directory and add your EmailJS configuration. These variables must start with `NEXT_PUBLIC_` to be accessible in the static export build.

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key