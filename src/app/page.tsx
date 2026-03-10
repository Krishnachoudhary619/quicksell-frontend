export default function Home() {
	return (
		<div
			dangerouslySetInnerHTML={{
				__html: `
         <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QuickShare — Digital Catalogs for B2B Commerce</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

  <style>
    /* ─── Reset & Base ─── */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; font-size: 16px; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: #f8f5f0;
      color: #1a1a1a;
      overflow-x: hidden;
      line-height: 1.6;
    }

    /* ─── Design Tokens ─── */
    :root {
      --ink: #0f0e0d;
      --ink-2: #3d3b38;
      --ink-3: #7a7570;
      --cream: #f8f5f0;
      --cream-2: #f0ece4;
      --cream-3: #e8e2d8;
      --accent: #e85d26;
      --accent-2: #f07b47;
      --accent-bg: #fdf0ea;
      --green: #1a6b4a;
      --green-light: #e6f4ee;
      --white: #ffffff;
      --shadow-sm: 0 2px 8px rgba(15,14,13,0.07);
      --shadow-md: 0 8px 24px rgba(15,14,13,0.1);
      --shadow-lg: 0 24px 64px rgba(15,14,13,0.12);
      --radius: 12px;
      --radius-lg: 20px;
      --radius-xl: 32px;
    }

    /* ─── Utility ─── */
    .container { max-width: 1180px; margin: 0 auto; padding: 0 2rem; }
    .text-center { text-align: center; }
    .eyebrow {
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--accent);
      background: var(--accent-bg); border: 1px solid rgba(232,93,38,0.15);
      padding: 0.35rem 0.85rem; border-radius: 100px;
      margin-bottom: 1.25rem;
    }
    .eyebrow::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); display: inline-block; }

    /* ─── Buttons ─── */
    .btn {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.85rem 1.75rem; border-radius: 100px;
      font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
      text-decoration: none; cursor: pointer; border: none;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;
    }
    .btn-primary {
      background: var(--ink); color: var(--white);
      box-shadow: 0 4px 16px rgba(15,14,13,0.2);
    }
    .btn-primary:hover { background: #2a2825; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(15,14,13,0.25); }
    .btn-accent {
      background: var(--accent); color: var(--white);
      box-shadow: 0 4px 16px rgba(232,93,38,0.3);
    }
    .btn-accent:hover { background: #d14f1e; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,93,38,0.4); }
    .btn-ghost {
      background: transparent; color: var(--ink-2);
      border: 1.5px solid var(--cream-3);
    }
    .btn-ghost:hover { background: var(--cream-2); border-color: var(--ink-3); }
    .btn-lg { padding: 1rem 2.25rem; font-size: 1rem; }
    .btn svg, .btn i { font-size: 0.9em; }

    /* ─── Navbar ─── */
    .navbar {
      position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
      padding: 1.1rem 0;
      background: rgba(248, 245, 240, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(15,14,13,0.06);
      transition: all 0.3s ease;
    }
    .navbar.scrolled {
      padding: 0.75rem 0;
      box-shadow: 0 4px 24px rgba(15,14,13,0.07);
    }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
    }
    .logo {
      font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.5rem;
      color: var(--ink); text-decoration: none; letter-spacing: -0.03em;
    }
    .logo span { color: var(--accent); }
    .nav-links {
      display: flex; align-items: center; gap: 2.25rem; list-style: none;
    }
    .nav-links a {
      text-decoration: none; color: var(--ink-2); font-size: 0.9rem; font-weight: 400;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--ink); }
    .nav-actions { display: flex; align-items: center; gap: 0.75rem; }
    .nav-login {
      text-decoration: none; color: var(--ink-2); font-size: 0.9rem; font-weight: 500;
      padding: 0.5rem 1rem; border-radius: 100px;
      transition: all 0.2s;
    }
    .nav-login:hover { background: var(--cream-2); color: var(--ink); }
    .hamburger {
      display: none; cursor: pointer; background: none; border: none;
      font-size: 1.4rem; color: var(--ink); padding: 0.25rem;
    }

    /* ─── Hero ─── */
    .hero {
      padding-top: 9rem; padding-bottom: 5rem;
      position: relative; overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0; z-index: 0;
      background: radial-gradient(ellipse 70% 60% at 65% 30%, rgba(232,93,38,0.07) 0%, transparent 70%),
                  radial-gradient(ellipse 50% 50% at 20% 80%, rgba(26,107,74,0.05) 0%, transparent 60%);
    }
    .hero-grid-bg {
      position: absolute; inset: 0; z-index: 0; opacity: 0.4;
      background-image:
        linear-gradient(rgba(15,14,13,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15,14,13,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
    }
    .hero-inner {
      position: relative; z-index: 1;
      display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 0.6rem;
      background: var(--green-light); color: var(--green);
      border: 1px solid rgba(26,107,74,0.15);
      padding: 0.4rem 0.9rem; border-radius: 100px;
      font-size: 0.8rem; font-weight: 500; margin-bottom: 1.5rem;
    }
    .hero-badge .dot { width: 6px; height: 6px; background: var(--green); border-radius: 50%; animation: pulse-green 2s infinite; }
    @keyframes pulse-green {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.3); }
    }
    .hero h1 {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: clamp(2.4rem, 4.5vw, 3.75rem);
      line-height: 1.08; letter-spacing: -0.04em; color: var(--ink);
      margin-bottom: 1.5rem;
    }
    .hero h1 em {
      font-style: normal; color: var(--accent);
      position: relative;
    }
    .hero h1 em::after {
      content: '';
      position: absolute; bottom: -2px; left: 0; right: 0; height: 3px;
      background: var(--accent); border-radius: 2px; opacity: 0.3;
    }
    .hero-sub {
      font-size: 1.1rem; color: var(--ink-3); line-height: 1.7;
      max-width: 460px; margin-bottom: 2.5rem;
    }
    .hero-actions { display: flex; gap: 0.875rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
    .hero-trust {
      display: flex; align-items: center; gap: 1rem;
    }
    .trust-avatars { display: flex; }
    .trust-avatars span {
      width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--cream);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; font-weight: 600; color: white;
      margin-left: -8px;
    }
    .trust-avatars span:first-child { margin-left: 0; }
    .trust-text { font-size: 0.8rem; color: var(--ink-3); }
    .trust-text strong { color: var(--ink-2); font-weight: 500; }

    /* Hero Visual */
    .hero-visual { position: relative; }
    .hero-card {
      background: var(--white); border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg); overflow: hidden;
      border: 1px solid rgba(15,14,13,0.06);
      transform: rotate(1.5deg);
      transition: transform 0.4s ease;
    }
    .hero-card:hover { transform: rotate(0deg) scale(1.01); }
    .hero-card-header {
      background: var(--ink); padding: 1.1rem 1.5rem;
      display: flex; align-items: center; gap: 0.6rem;
    }
    .mac-dots { display: flex; gap: 6px; }
    .mac-dots span {
      width: 12px; height: 12px; border-radius: 50%;
    }
    .mac-dots span:nth-child(1) { background: #ff5f57; }
    .mac-dots span:nth-child(2) { background: #febc2e; }
    .mac-dots span:nth-child(3) { background: #28c840; }
    .mac-title { color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-left: auto; letter-spacing: 0.05em; }
    .hero-card-body { padding: 1.5rem; background: var(--cream); min-height: 320px; }

    /* Dashboard mockup inside card */
    .mock-nav {
      display: flex; gap: 0.5rem; margin-bottom: 1.25rem;
    }
    .mock-nav-item {
      font-size: 0.7rem; padding: 0.3rem 0.75rem; border-radius: 100px;
      background: var(--cream-3); color: var(--ink-3); font-weight: 500;
    }
    .mock-nav-item.active { background: var(--ink); color: white; }
    .mock-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-bottom: 1.25rem; }
    .mock-stat {
      background: white; border-radius: 10px; padding: 0.875rem 1rem;
      border: 1px solid var(--cream-3);
    }
    .mock-stat-label { font-size: 0.65rem; color: var(--ink-3); margin-bottom: 0.25rem; }
    .mock-stat-value { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.15rem; color: var(--ink); }
    .mock-stat-change { font-size: 0.6rem; color: var(--green); display: flex; align-items: center; gap: 2px; margin-top: 2px; }
    .mock-products { display: flex; flex-direction: column; gap: 0.5rem; }
    .mock-product {
      background: white; border-radius: 8px; padding: 0.65rem 0.875rem;
      display: flex; align-items: center; gap: 0.75rem;
      border: 1px solid var(--cream-3);
    }
    .mock-product-img {
      width: 32px; height: 32px; border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; flex-shrink: 0;
    }
    .mock-product-info { flex: 1; min-width: 0; }
    .mock-product-name { font-size: 0.7rem; font-weight: 500; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .mock-product-meta { font-size: 0.6rem; color: var(--ink-3); }
    .mock-product-price { font-size: 0.75rem; font-weight: 600; color: var(--ink); font-family: 'Syne', sans-serif; }
    .mock-badge {
      font-size: 0.55rem; padding: 0.15rem 0.45rem; border-radius: 100px;
      font-weight: 500;
    }
    .mock-badge.green { background: var(--green-light); color: var(--green); }
    .mock-badge.orange { background: var(--accent-bg); color: var(--accent); }

    /* Floating cards */
    .float-card {
      position: absolute; background: white; border-radius: var(--radius);
      box-shadow: var(--shadow-md); padding: 0.875rem 1.1rem;
      border: 1px solid rgba(15,14,13,0.06);
      animation: float 4s ease-in-out infinite;
    }
    .float-card-1 {
      top: -1.5rem; right: -2rem;
      animation-delay: 0s;
    }
    .float-card-2 {
      bottom: 2rem; left: -2.5rem;
      animation-delay: -2s;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    .float-label { font-size: 0.65rem; color: var(--ink-3); margin-bottom: 0.2rem; }
    .float-value { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1rem; color: var(--ink); }
    .float-sub { font-size: 0.6rem; color: var(--green); }
    .float-icon { font-size: 1.25rem; margin-bottom: 0.3rem; }

    /* ─── Logos / Social Proof ─── */
    .logos-section {
      padding: 2.5rem 0; border-top: 1px solid var(--cream-3); border-bottom: 1px solid var(--cream-3);
      background: var(--white);
    }
    .logos-label { text-align: center; font-size: 0.8rem; color: var(--ink-3); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.75rem; }
    .logos-row {
      display: flex; align-items: center; justify-content: center;
      gap: 3rem; flex-wrap: wrap;
    }
    .logo-item {
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.05rem;
      color: var(--cream-3); letter-spacing: -0.02em;
      transition: color 0.2s;
    }
    .logo-item:hover { color: var(--ink-3); }

    /* ─── Features ─── */
    .features-section { padding: 6rem 0; background: var(--cream); }
    .section-head { text-align: center; margin-bottom: 3.5rem; }
    .section-head h2 {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: clamp(1.9rem, 3.5vw, 2.9rem);
      letter-spacing: -0.04em; color: var(--ink); line-height: 1.1;
      margin-bottom: 1rem;
    }
    .section-head p { font-size: 1rem; color: var(--ink-3); max-width: 520px; margin: 0 auto; }
    .features-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem;
    }
    .feature-card {
      background: var(--white); border-radius: var(--radius-lg);
      padding: 2rem 1.75rem; border: 1px solid var(--cream-3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative; overflow: hidden;
    }
    .feature-card::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(232,93,38,0.04) 0%, transparent 60%);
      opacity: 0; transition: opacity 0.3s;
    }
    .feature-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: rgba(232,93,38,0.2); }
    .feature-card:hover::before { opacity: 1; }
    .feature-icon-wrap {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 1.25rem; font-size: 1.3rem;
    }
    .icon-orange { background: var(--accent-bg); color: var(--accent); }
    .icon-green { background: var(--green-light); color: var(--green); }
    .icon-blue { background: #e8f0fe; color: #3b5bdb; }
    .icon-purple { background: #f3e8ff; color: #7c3aed; }
    .feature-card h3 { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--ink); margin-bottom: 0.6rem; letter-spacing: -0.02em; }
    .feature-card p { font-size: 0.875rem; color: var(--ink-3); line-height: 1.65; margin: 0; }

    /* ─── How It Works ─── */
    .how-section { padding: 6rem 0; background: var(--white); }
    .how-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;
    }
    .how-steps { display: flex; flex-direction: column; gap: 0; }
    .how-step {
      display: flex; gap: 1.5rem; padding: 1.75rem 0;
      border-bottom: 1px solid var(--cream-3); cursor: pointer;
      transition: all 0.2s;
    }
    .how-step:last-child { border-bottom: none; }
    .how-step:hover .step-num { background: var(--ink); color: white; }
    .step-num {
      width: 40px; height: 40px; flex-shrink: 0;
      border-radius: 50%; border: 2px solid var(--cream-3);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.9rem;
      color: var(--ink-3); transition: all 0.2s;
    }
    .how-step.active .step-num { background: var(--accent); border-color: var(--accent); color: white; }
    .step-content h3 { font-family: 'Syne', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--ink); margin-bottom: 0.4rem; letter-spacing: -0.02em; }
    .step-content p { font-size: 0.875rem; color: var(--ink-3); margin: 0; line-height: 1.65; }
    .how-visual {
      background: var(--cream); border-radius: var(--radius-xl);
      border: 1px solid var(--cream-3); overflow: hidden;
      min-height: 420px; display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .how-visual-inner { width: 88%; height: 88%; }

    /* Catalog preview inside how-it-works */
    .catalog-mock {
      background: white; border-radius: 16px;
      box-shadow: var(--shadow-md); overflow: hidden;
      border: 1px solid var(--cream-3); width: 100%;
    }
    .catalog-header {
      padding: 1rem 1.25rem; border-bottom: 1px solid var(--cream-3);
      display: flex; align-items: center; gap: 0.75rem;
    }
    .catalog-logo-dot { width: 28px; height: 28px; border-radius: 8px; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem; font-weight: 700; }
    .catalog-name { font-size: 0.85rem; font-weight: 600; color: var(--ink); }
    .catalog-sub { font-size: 0.65rem; color: var(--ink-3); }
    .catalog-share-btn { margin-left: auto; background: var(--ink); color: white; border: none; padding: 0.3rem 0.75rem; border-radius: 100px; font-size: 0.65rem; font-weight: 500; cursor: pointer; }
    .catalog-products { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; padding: 1.25rem; }
    .catalog-product {
      background: var(--cream); border-radius: 10px; overflow: hidden;
      border: 1px solid var(--cream-3);
    }
    .catalog-product-img {
      height: 80px; display: flex; align-items: center; justify-content: center;
      font-size: 2rem; background: white;
    }
    .catalog-product-info { padding: 0.6rem; }
    .catalog-product-name { font-size: 0.7rem; font-weight: 600; color: var(--ink); margin-bottom: 0.15rem; }
    .catalog-product-price { font-size: 0.65rem; color: var(--accent); font-weight: 600; }
    .catalog-footer { padding: 0.875rem 1.25rem; border-top: 1px solid var(--cream-3); display: flex; gap: 0.5rem; align-items: center; }
    .catalog-cta { flex: 1; background: var(--ink); color: white; border: none; padding: 0.5rem; border-radius: 8px; font-size: 0.7rem; font-weight: 500; cursor: pointer; text-align: center; }
    .catalog-whatsapp { width: 32px; height: 32px; border-radius: 8px; background: #25d366; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.85rem; cursor: pointer; flex-shrink: 0; }

    /* ─── Stats Strip ─── */
    .stats-section {
      padding: 4.5rem 0;
      background: var(--ink);
    }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
    .stat-item { text-align: center; }
    .stat-num {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 2.5rem; color: var(--white); letter-spacing: -0.04em;
      line-height: 1; margin-bottom: 0.4rem;
    }
    .stat-num span { color: var(--accent); }
    .stat-label { font-size: 0.85rem; color: rgba(255,255,255,0.5); }

    /* ─── Testimonials ─── */
    .testimonials-section { padding: 6rem 0; background: var(--cream); }
    .testimonials-grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
    }
    .testimonial-card {
      background: var(--white); border-radius: var(--radius-lg);
      padding: 2rem; border: 1px solid var(--cream-3);
      display: flex; flex-direction: column; gap: 1.25rem;
      transition: all 0.3s ease;
    }
    .testimonial-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
    .testimonial-stars { display: flex; gap: 3px; color: #f59e0b; font-size: 0.8rem; }
    .testimonial-text { font-size: 0.9rem; color: var(--ink-2); line-height: 1.7; flex: 1; font-style: italic; }
    .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
    .author-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.9rem; color: white; flex-shrink: 0;
    }
    .author-name { font-size: 0.875rem; font-weight: 600; color: var(--ink); }
    .author-title { font-size: 0.75rem; color: var(--ink-3); }

    /* ─── CTA ─── */
    .cta-section { padding: 6rem 0; background: var(--white); }
    .cta-box {
      background: var(--ink); border-radius: var(--radius-xl);
      padding: 5rem 4rem; text-align: center;
      position: relative; overflow: hidden;
    }
    .cta-box::before {
      content: '';
      position: absolute; top: -50%; right: -20%; width: 600px; height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(232,93,38,0.15) 0%, transparent 70%);
    }
    .cta-box::after {
      content: '';
      position: absolute; bottom: -40%; left: -15%; width: 400px; height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(26,107,74,0.1) 0%, transparent 70%);
    }
    .cta-box * { position: relative; z-index: 1; }
    .cta-box h2 {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: clamp(1.9rem, 4vw, 3rem);
      color: white; letter-spacing: -0.04em; line-height: 1.1;
      margin-bottom: 1rem;
    }
    .cta-box p { color: rgba(255,255,255,0.6); font-size: 1rem; max-width: 480px; margin: 0 auto 2.5rem; }
    .cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
    .btn-white { background: white; color: var(--ink); }
    .btn-white:hover { background: var(--cream-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,255,255,0.2); }
    .btn-outline-white { background: transparent; color: white; border: 1.5px solid rgba(255,255,255,0.25); }
    .btn-outline-white:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.4); }

    /* ─── Footer ─── */
    .footer { background: var(--cream); padding: 4rem 0 2rem; border-top: 1px solid var(--cream-3); }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
    .footer-brand p { font-size: 0.875rem; color: var(--ink-3); margin-top: 0.75rem; max-width: 260px; line-height: 1.7; }
    .footer-socials { display: flex; gap: 0.75rem; margin-top: 1.25rem; }
    .social-link {
      width: 34px; height: 34px; border-radius: 8px;
      background: var(--cream-3); color: var(--ink-3);
      display: flex; align-items: center; justify-content: center;
      text-decoration: none; font-size: 0.85rem;
      transition: all 0.2s;
    }
    .social-link:hover { background: var(--ink); color: white; }
    .footer-col h4 { font-family: 'Syne', sans-serif; font-size: 0.875rem; font-weight: 700; color: var(--ink); margin-bottom: 1.25rem; letter-spacing: -0.01em; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
    .footer-col a { text-decoration: none; font-size: 0.85rem; color: var(--ink-3); transition: color 0.2s; }
    .footer-col a:hover { color: var(--ink); }
    .footer-bottom {
      padding-top: 2rem; border-top: 1px solid var(--cream-3);
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 1rem;
    }
    .footer-bottom p { font-size: 0.8rem; color: var(--ink-3); margin: 0; }

    /* ─── Mobile Menu ─── */
    .mobile-menu {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: var(--white); z-index: 999;
      padding: 5rem 2rem 2rem;
      transform: translateX(-100%);
      transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex; flex-direction: column; gap: 0.25rem;
    }
    .mobile-menu.open { transform: translateX(0); }
    .mobile-menu a {
      text-decoration: none; color: var(--ink); font-size: 1.25rem;
      font-family: 'Syne', sans-serif; font-weight: 600;
      padding: 0.75rem 0; border-bottom: 1px solid var(--cream-3);
      display: block;
    }
    .mobile-menu-actions { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
    .mobile-menu-actions .btn { justify-content: center; }

    /* ─── Animations ─── */
    .fade-up {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
    .fade-up-delay-1 { transition-delay: 0.1s; }
    .fade-up-delay-2 { transition-delay: 0.2s; }
    .fade-up-delay-3 { transition-delay: 0.3s; }
    .fade-up-delay-4 { transition-delay: 0.4s; }

    /* ─── Responsive ─── */
    @media (max-width: 1024px) {
      .features-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-grid { grid-template-columns: repeat(2, 1fr); }
      .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
    }
    @media (max-width: 768px) {
      .nav-links, .nav-actions { display: none; }
      .hamburger { display: block; }
      .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
      .hero h1 { font-size: 2.4rem; }
      .hero-visual { order: -1; }
      .hero-card { transform: rotate(0); }
      .float-card-1 { top: -0.5rem; right: -0.5rem; }
      .float-card-2 { display: none; }
      .how-grid { grid-template-columns: 1fr; gap: 3rem; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .cta-box { padding: 3rem 1.75rem; }
      .features-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 640px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .footer-grid { grid-template-columns: 1fr; }
      .footer-bottom { flex-direction: column; align-items: flex-start; }
      .logos-row { gap: 1.5rem; }
    }
  </style>
</head>
<body>

  <!-- Navbar -->
  <nav class="navbar" id="navbar">
    <div class="container nav-inner">
      <a href="#" class="logo">Quick<span>Share</span></a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#pricing">Pricing</a></li>
      </ul>
      <div class="nav-actions">
        <a href="/login" class="nav-login">Log in</a>
        <a href="#pricing" class="btn btn-primary">Get Started Free</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div class="mobile-menu" id="mobileMenu">
    <a href="#features" class="mobile-link">Features</a>
    <a href="#how-it-works" class="mobile-link">How It Works</a>
    <a href="#pricing" class="mobile-link">Pricing</a>
    <a href="/login" class="mobile-link">Log in</a>
    <div class="mobile-menu-actions">
      <a href="/login" class="btn btn-accent btn-lg">Get Started Free</a>
    </div>
  </div>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-grid-bg"></div>
    <div class="container hero-inner">

      <div class="hero-content">
       
        <h1>Sell More with<br/><em>Digital Catalogs</em><br/>Your Buyers Love</h1>
        <p class="hero-sub">QuickShare helps wholesalers and merchants create stunning product catalogs, share them instantly, and manage orders — all from one smart dashboard.</p>
        <div class="hero-actions">
          <a href="/login" class="btn btn-accent btn-lg">
            Start Selling Free <i class="fas fa-arrow-right"></i>
          </a>
          <a href="#how-it-works" class="btn btn-ghost btn-lg">
            See How It Works
          </a>
        </div>
        <div class="hero-trust">
          <div class="trust-avatars">
            <span style="background:#e85d26;">M</span>
            <span style="background:#3b5bdb;">P</span>
            <span style="background:#1a6b4a;">R</span>
            <span style="background:#7c3aed;">S</span>
          </div>
          <p class="trust-text" style="margin:0;"><strong>10,000+ merchants</strong> growing with QuickShare</p>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-card">
          <div class="hero-card-header">
            <div class="mac-dots">
              <span></span><span></span><span></span>
            </div>
            <span class="mac-title">QuickShare Dashboard</span>
          </div>
          <div class="hero-card-body">
            <div class="mock-nav">
              <div class="mock-nav-item active">Overview</div>
              <div class="mock-nav-item">Catalogs</div>
              <div class="mock-nav-item">Orders</div>
              <div class="mock-nav-item">Products</div>
            </div>
            <div class="mock-stats">
              <div class="mock-stat">
                <div class="mock-stat-label">Total Revenue</div>
                <div class="mock-stat-value">₹2.4L</div>
                <div class="mock-stat-change"><i class="fas fa-arrow-up"></i> +18%</div>
              </div>
              <div class="mock-stat">
                <div class="mock-stat-label">Orders Today</div>
                <div class="mock-stat-value">38</div>
                <div class="mock-stat-change"><i class="fas fa-arrow-up"></i> +6</div>
              </div>
              <div class="mock-stat">
                <div class="mock-stat-label">Active Catalogs</div>
                <div class="mock-stat-value">12</div>
                <div class="mock-stat-change"><i class="fas fa-arrow-up"></i> +2</div>
              </div>
            </div>
            <div class="mock-products">
              <div class="mock-product">
                <div class="mock-product-img" style="background:#fdf0ea;">👕</div>
                <div class="mock-product-info">
                  <div class="mock-product-name">Cotton Kurta Set</div>
                  <div class="mock-product-meta">SKU: KS-201</div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;">
                  <div class="mock-product-price">₹850</div>
                  <div class="mock-badge green">In Stock</div>
                </div>
              </div>
              <div class="mock-product">
                <div class="mock-product-img" style="background:#e8f0fe;">👜</div>
                <div class="mock-product-info">
                  <div class="mock-product-name">Leather Handbag</div>
                  <div class="mock-product-meta">SKU: LH-078</div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;">
                  <div class="mock-product-price">₹1,200</div>
                  <div class="mock-badge orange">3 left</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="float-card float-card-1">
          <div class="float-icon">🛒</div>
          <div class="float-label">New order</div>
          <div class="float-value">₹3,450</div>
          <div class="float-sub">just now via WhatsApp</div>
        </div>
        <div class="float-card float-card-2">
          <div class="float-label">Catalog Views</div>
          <div class="float-value">1,248</div>
          <div class="float-sub" style="color:var(--accent)">↑ +34% this week</div>
        </div>
      </div>

    </div>
  </section>

  <!-- Logos -->
  <div class="logos-section">
    <div class="container">
      <p class="logos-label">Merchants from all industries</p>
      <div class="logos-row">
        <span class="logo-item">FabricWorld</span>
        <span class="logo-item">SpiceRoute</span>
        <span class="logo-item">TechParts</span>
        <span class="logo-item">GreenGrove</span>
        <span class="logo-item">CraftHouse</span>
        <span class="logo-item">StyleMart</span>
      </div>
    </div>
  </div>

  <!-- Features -->
  <section class="features-section" id="features">
    <div class="container">
      <div class="section-head fade-up">
        <div class="eyebrow">Core Features</div>
        <h2>Everything you need to<br/>sell smarter online</h2>
        <p>A complete toolkit for merchants and wholesalers to digitize their sales process from catalog to delivery.</p>
      </div>
      <div class="features-grid">
        <div class="feature-card fade-up fade-up-delay-1">
          <div class="feature-icon-wrap icon-orange">
            <i class="fas fa-book-open"></i>
          </div>
          <h3>Digital Catalogs</h3>
          <p>Build beautiful, mobile-first product catalogs in minutes. Add photos, descriptions, and pricing with zero technical skills required.</p>
        </div>
        <div class="feature-card fade-up fade-up-delay-2">
          <div class="feature-icon-wrap icon-green">
            <i class="fas fa-share-nodes"></i>
          </div>
          <h3>Instant Sharing</h3>
          <p>Share your catalog link anywhere — WhatsApp, Instagram, email, or embed it on your website. Buyers access it instantly, no app needed.</p>
        </div>
        <div class="feature-card fade-up fade-up-delay-3">
          <div class="feature-icon-wrap icon-blue">
            <i class="fas fa-cubes"></i>
          </div>
          <h3>Product Management</h3>
          <p>Manage your entire inventory from one dashboard. Bulk upload, edit pricing, track stock, and organize products into collections.</p>
        </div>
        <div class="feature-card fade-up fade-up-delay-4">
          <div class="feature-icon-wrap icon-purple">
            <i class="fas fa-chart-bar"></i>
          </div>
          <h3>Order Tracking</h3>
          <p>Receive orders directly inside QuickShare. Track status, manage fulfillment, and keep buyers informed at every step.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Stats -->
  <section class="stats-section">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item fade-up">
          <div class="stat-num">10<span>K+</span></div>
          <div class="stat-label">Active Merchants</div>
        </div>
        <div class="stat-item fade-up fade-up-delay-1">
          <div class="stat-num">₹500<span>Cr+</span></div>
          <div class="stat-label">Orders Processed</div>
        </div>
        <div class="stat-item fade-up fade-up-delay-2">
          <div class="stat-num">2<span>M+</span></div>
          <div class="stat-label">Catalog Views / Month</div>
        </div>
        <div class="stat-item fade-up fade-up-delay-3">
          <div class="stat-num">4.8<span>★</span></div>
          <div class="stat-label">Average Merchant Rating</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="how-section" id="how-it-works">
    <div class="container">
      <div class="how-grid">
        <div>
          <div class="eyebrow fade-up">How It Works</div>
          <h2 class="fade-up" style="font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(1.9rem,3.5vw,2.75rem);letter-spacing:-0.04em;color:var(--ink);line-height:1.1;margin-bottom:1rem;">
            Start selling in<br/>3 simple steps
          </h2>
          <p class="fade-up" style="color:var(--ink-3);margin-bottom:2.5rem;font-size:0.95rem;">No technical setup. No complex integrations. Just upload, share, and sell.</p>

          <div class="how-steps">
            <div class="how-step active fade-up">
              <div class="step-num">1</div>
              <div class="step-content">
                <h3>Create Your Catalog</h3>
                <p>Upload your products, add photos, set prices and descriptions. Organize them into beautiful collections that showcase your brand.</p>
              </div>
            </div>
            <div class="how-step fade-up fade-up-delay-1">
              <div class="step-num">2</div>
              <div class="step-content">
                <h3>Share With Buyers</h3>
                <p>Get a unique link for your catalog. Share it on WhatsApp, email, Instagram, or any platform. Buyers browse without creating an account.</p>
              </div>
            </div>
            <div class="how-step fade-up fade-up-delay-2">
              <div class="step-num">3</div>
              <div class="step-content">
                <h3>Receive & Manage Orders</h3>
                <p>Buyers place orders directly from your catalog. Track, confirm, and fulfill orders from your QuickShare dashboard in real time.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="how-visual fade-up">
          <div class="how-visual-inner">
            <div class="catalog-mock">
              <div class="catalog-header">
                <div class="catalog-logo-dot">QS</div>
                <div>
                  <div class="catalog-name">Riya Fashion House</div>
                  <div class="catalog-sub">Summer Collection 2026</div>
                </div>
                <button class="catalog-share-btn"><i class="fas fa-share-alt"></i> Share</button>
              </div>
              <div class="catalog-products">
                <div class="catalog-product">
                  <div class="catalog-product-img">👗</div>
                  <div class="catalog-product-info">
                    <div class="catalog-product-name">Floral Sundress</div>
                    <div class="catalog-product-price">₹1,450</div>
                  </div>
                </div>
                <div class="catalog-product">
                  <div class="catalog-product-img">👔</div>
                  <div class="catalog-product-info">
                    <div class="catalog-product-name">Linen Shirt</div>
                    <div class="catalog-product-price">₹750</div>
                  </div>
                </div>
                <div class="catalog-product">
                  <div class="catalog-product-img">👡</div>
                  <div class="catalog-product-info">
                    <div class="catalog-product-name">Block Heels</div>
                    <div class="catalog-product-price">₹1,200</div>
                  </div>
                </div>
                <div class="catalog-product">
                  <div class="catalog-product-img">🕶️</div>
                  <div class="catalog-product-info">
                    <div class="catalog-product-name">UV Sunglasses</div>
                    <div class="catalog-product-price">₹480</div>
                  </div>
                </div>
              </div>
              <div class="catalog-footer">
                <button class="catalog-cta">Place Order</button>
                <div class="catalog-whatsapp"><i class="fab fa-whatsapp"></i></div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="testimonials-section">
    <div class="container">
      <div class="section-head fade-up">
        <div class="eyebrow">Customer Stories</div>
        <h2>Merchants love QuickShare</h2>
        <p>Real stories from wholesalers and merchants who transformed their business with digital catalogs.</p>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card fade-up fade-up-delay-1">
          <div class="testimonial-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
          <p class="testimonial-text">"Before QuickShare, I was sending photos on WhatsApp one by one. Now my buyers just open the link and order directly. My order volume has doubled in 3 months."</p>
          <div class="testimonial-author">
            <div class="author-avatar" style="background:#e85d26;">R</div>
            <div>
              <div class="author-name">Ravi Malhotra</div>
              <div class="author-title">Textile Wholesaler, Surat</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card fade-up fade-up-delay-2">
          <div class="testimonial-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
          <p class="testimonial-text">"Setting up my first catalog took less than 20 minutes. My customers keep saying how professional it looks. QuickShare made me look like a big brand."</p>
          <div class="testimonial-author">
            <div class="author-avatar" style="background:#3b5bdb;">P</div>
            <div>
              <div class="author-name">Priya Iyer</div>
              <div class="author-title">Boutique Owner, Chennai</div>
            </div>
          </div>
        </div>
        <div class="testimonial-card fade-up fade-up-delay-3">
          <div class="testimonial-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
          <p class="testimonial-text">"The order management dashboard is incredible. I can see what's pending, what's shipped, and send updates to buyers — all from my phone while I'm at the warehouse."</p>
          <div class="testimonial-author">
            <div class="author-avatar" style="background:#1a6b4a;">A</div>
            <div>
              <div class="author-name">Arjun Shah</div>
              <div class="author-title">Electronics Distributor, Mumbai</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section" id="pricing">
    <div class="container">
      <div class="cta-box">
        <div class="eyebrow" style="background:rgba(232,93,38,0.15);border-color:rgba(232,93,38,0.2);color:#f07b47;">Free to Start</div>
        <h2>Ready to sell smarter?<br/>Create your catalog today.</h2>
        <p>Join thousands of merchants already growing their business on QuickShare. No credit card needed to get started.</p>
        <div class="cta-actions">
         
          <a href="tel:7506627003" class="btn btn-outline-white btn-lg">
            Call for Demo
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" style="display:inline-block;">Quick<span>Sell</span></div>
          <p>The digital catalog platform for wholesalers and merchants to sell products online faster and smarter.</p>
          <div class="footer-socials">
           <a href="https://wa.me/917506627003" target="_blank" class="social-link"><i class="fab fa-whatsapp"></i></a>
            <a href="tel:7506627003" class="social-link"><i class="fa fa-phone"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Product</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#demo">Demo</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="https://neelkanthtech.vercel.app/" target="_blank">About Us</a></li>
            
            
            <li><a href="tel:7506627003">Contact</a></li>
          </ul>
        </div>
       
      </div>
      <div class="footer-bottom">
        <p>© 2026 Neelkanth Tech. All rights reserved.</p>
        <p>Made with ♥ for merchants everywhere</p>
      </div>
    </div>
  </footer>

  <script>
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('open', menuOpen);
      hamburger.innerHTML = menuOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link, .mobile-menu-actions a').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('open');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      });
    });

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });

    // How It Works step interactions
    const steps = document.querySelectorAll('.how-step');
    steps.forEach(step => {
      step.addEventListener('click', () => {
        steps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
      });
    });
  </script>
</body>
</html>

        `,
			}}
		/>
	);
}
