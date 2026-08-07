import {
    Terminal,
    Cpu,
    Database,
    Layers,
    Shield,
    Server,
    ExternalLink
} from 'lucide-react'

export function LandingPage() {
    return (
        <div className="brutalist-landing">
            {/* Embedded styles for Brutalist UI */}
            <style dangerouslySetInnerHTML={{ __html: `
                html, body, #root {
                    overflow: auto !important;
                    height: auto !important;
                }
                .brutalist-landing {
                    background-color: #F8F3F0;
                    color: #014BAA;
                    font-family: 'Space Mono', 'Sora', monospace;
                    min-height: 100vh;
                    box-sizing: border-box;
                }
                .brutalist-landing *, .brutalist-landing *:before, .brutalist-landing *:after {
                    box-sizing: inherit;
                }
                
                /* Layout utilities */
                .container-max {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                
                /* Header */
                .brutalist-header {
                    border-bottom: 4px solid #014BAA;
                    position: sticky;
                    top: 0;
                    background-color: #F8F3F0;
                    z-index: 100;
                }
                .header-flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 24px;
                }
                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .logo-square {
                    width: 40px;
                    height: 40px;
                    background-color: #014BAA;
                    border: 2px solid #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 2px 2px 0px 0px #000;
                }
                .logo-text {
                    font-size: 24px;
                    font-weight: 900;
                    letter-spacing: -0.5px;
                    color: #014BAA;
                    text-transform: uppercase;
                }
                
                /* Buttons */
                .btn-primary {
                    background-color: #014BAA;
                    color: #F8F3F0;
                    font-weight: bold;
                    text-transform: uppercase;
                    border: 3px solid #000;
                    box-shadow: 4px 4px 0px 0px #000;
                    padding: 10px 20px;
                    text-decoration: none;
                    font-size: 14px;
                    letter-spacing: 0.5px;
                    transition: transform 0.1s, box-shadow 0.1s;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }
                .btn-primary:hover {
                    transform: translate(2px, 2px);
                    box-shadow: 2px 2px 0px 0px #000;
                }
                .btn-secondary {
                    background-color: transparent;
                    color: #014BAA;
                    font-weight: bold;
                    text-transform: uppercase;
                    border: 3px solid #014BAA;
                    box-shadow: 4px 4px 0px 0px #014BAA;
                    padding: 12px 24px;
                    text-decoration: none;
                    font-size: 16px;
                    transition: transform 0.1s, box-shadow 0.1s;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                }
                .btn-secondary:hover {
                    transform: translate(2px, 2px);
                    box-shadow: 2px 2px 0px 0px #014BAA;
                }
                .btn-large {
                    padding: 16px 32px;
                    font-size: 18px;
                }
                
                /* Hero */
                .hero-section {
                    border-bottom: 4px solid #014BAA;
                    padding: 64px 0;
                }
                .hero-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 48px;
                    align-items: center;
                }
                @media (min-width: 992px) {
                    .hero-grid {
                        grid-template-columns: 7fr 5fr;
                    }
                }
                
                /* Support Badge */
                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 12px;
                    border: 2px solid #014BAA;
                    background-color: rgba(1, 75, 170, 0.08);
                    color: #014BAA;
                    font-weight: bold;
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 24px;
                    box-shadow: 2px 2px 0px 0px #014BAA;
                }
                
                .hero-title {
                    font-size: 48px;
                    line-height: 0.95;
                    font-weight: 900;
                    margin: 0 0 24px 0;
                    text-transform: uppercase;
                    color: #014BAA;
                }
                @media (min-width: 768px) {
                    .hero-title { font-size: 72px; }
                }
                .hero-desc {
                    font-size: 18px;
                    color: #475569;
                    line-height: 1.6;
                    margin: 0 0 32px 0;
                    max-width: 550px;
                }
                
                /* Emulator Status Widget */
                .status-widget {
                    background-color: #FFF;
                    border: 4px solid #000;
                    padding: 24px;
                    box-shadow: 6px 6px 0px 0px #014BAA;
                    position: relative;
                }
                .widget-tag {
                    position: absolute;
                    top: -14px;
                    right: 16px;
                    background-color: #014BAA;
                    color: #FFF;
                    border: 2px solid #000;
                    padding: 2px 8px;
                    font-size: 10px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 2px 2px 0px 0px #000;
                }
                .widget-title {
                    font-size: 18px;
                    font-weight: 900;
                    margin: 0 0 16px 0;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .status-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border: 2px solid #000;
                    background-color: #F8F3F0;
                    padding: 12px;
                    margin-bottom: 12px;
                }
                .status-row:last-child {
                    margin-bottom: 0;
                }
                .status-label {
                    font-weight: bold;
                    font-size: 13px;
                    text-transform: uppercase;
                }
                .status-sub {
                    font-size: 11px;
                    color: #64748b;
                }
                .status-pill {
                    font-size: 11px;
                    font-weight: 900;
                    text-transform: uppercase;
                    border: 1px solid #000;
                    padding: 4px 8px;
                }
                .pill-green { background-color: #d1fae5; color: #065f46; }
                
                /* Features Section */
                .features-section {
                    border-bottom: 4px solid #014BAA;
                    padding: 64px 0;
                }
                .section-title {
                    font-size: 36px;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin: 0 0 8px 0;
                }
                .section-desc {
                    font-size: 16px;
                    color: #475569;
                    margin: 0 0 48px 0;
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
                    gap: 32px;
                }
                .feature-card {
                    background-color: #FFF;
                    border: 4px solid #000;
                    padding: 24px;
                    box-shadow: 4px 4px 0px 0px #014BAA;
                    transition: transform 0.1s, box-shadow 0.1s;
                }
                .feature-card:hover {
                    transform: translate(2px, 2px);
                    box-shadow: 2px 2px 0px 0px #014BAA;
                }
                .feature-icon-wrapper {
                    width: 48px;
                    height: 48px;
                    border: 2px solid #000;
                    background-color: #014BAA;
                    color: #FFF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    box-shadow: 2px 2px 0px 0px #000;
                }
                .feature-title {
                    font-size: 18px;
                    font-weight: 900;
                    text-transform: uppercase;
                    margin: 0 0 12px 0;
                }
                .feature-body {
                    font-size: 13px;
                    color: #475569;
                    line-height: 1.6;
                    margin: 0;
                }
                
                /* Architecture Section */
                .arch-section {
                    border-bottom: 4px solid #014BAA;
                    padding: 64px 0;
                }
                .arch-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 48px;
                    align-items: center;
                }
                @media (min-width: 992px) {
                    .arch-grid {
                        grid-template-columns: 7fr 5fr;
                    }
                }
                .diagram-frame {
                    background-color: #FFF;
                    border: 4px solid #000;
                    padding: 16px;
                    box-shadow: 6px 6px 0px 0px #014BAA;
                }
                .arch-step {
                    display: flex;
                    gap: 16px;
                    margin-bottom: 20px;
                }
                .step-number {
                    font-size: 20px;
                    font-weight: 900;
                    color: #014BAA;
                }
                .step-title {
                    font-weight: bold;
                    text-transform: uppercase;
                    font-size: 14px;
                    margin-bottom: 4px;
                }
                .step-desc {
                    font-size: 13px;
                    color: #475569;
                    line-height: 1.5;
                }
                
                /* Quick Start Section */
                .qs-section {
                    padding: 64px 0;
                    text-align: center;
                }
                .qs-box {
                    max-width: 700px;
                    margin: 0 auto 32px auto;
                    background-color: #111827;
                    border: 4px solid #000;
                    color: #E2E8F0;
                    padding: 24px;
                    box-shadow: 6px 6px 0px 0px #014BAA;
                    text-align: left;
                    font-family: monospace;
                    position: relative;
                }
                .qs-box-tag {
                    position: absolute;
                    top: 8px;
                    right: 12px;
                    font-size: 10px;
                    color: #475569;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                .code-comment {
                    color: #64748b;
                }
                .code-cmd {
                    color: #60a5fa;
                }
                
                /* Footer */
                .brutalist-footer {
                    background-color: #111827;
                    color: #94A3B8;
                    border-top: 4px solid #014BAA;
                    padding: 48px 0;
                }
                .footer-flex {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    gap: 24px;
                }
                @media (min-width: 768px) {
                    .footer-flex {
                        flex-direction: row;
                    }
                }
                .footer-logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .footer-logo-square {
                    width: 32px;
                    height: 32px;
                    background-color: #FFF;
                    color: #000;
                    font-weight: 900;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                }
                .footer-copy {
                    font-size: 13px;
                    text-align: center;
                }
                @media (min-width: 768px) {
                    .footer-copy { text-align: right; }
                }
                .footer-link {
                    color: #FFF;
                    text-decoration: none;
                }
                .footer-link:hover {
                    text-decoration: underline;
                }
            ` }} />

            {/* Header / Nav */}
            <header className="brutalist-header">
                <div className="container-max header-flex">
                    <div className="logo-container">
                        <div className="logo-square" style={{ backgroundColor: '#014BAA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="24" height="24" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h8v48H0zM24 0h8v48h-8zM0 20h32v8H0z" fill="#FFF"/>
                            </svg>
                        </div>
                        <span className="logo-text">HARSHIFY</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <a 
                            href="https://github.com/harsh-hak/harshify" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold', textDecoration: 'none', color: '#014BAA' }}
                        >
                            <svg width="20" height="20" className="fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                            </svg>
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container-max hero-grid">
                    <div>
                        <div className="status-badge">
                            Open Source Project
                        </div>

                        <h1 className="hero-title">
                            Any Cloud.<br/>Locally.
                        </h1>

                        <p className="hero-desc">
                            The local-first, cloud-aware developer console. Manage and explore your local AWS, Azure, and GCP emulators with a clean, unified, and schema-driven dashboard.
                        </p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <a 
                                href="https://github.com/harsh-hak/harshify" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-secondary btn-large"
                            >
                                View on GitHub
                                <svg width="22" height="22" className="fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="status-widget">
                            <div className="widget-tag">Supported Clouds</div>
                            <h3 className="widget-title">
                                Supported Emulators
                            </h3>

                             <div>
                                 {/* AWS */}
                                 <div className="status-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                     <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                                         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <rect width="32" height="32" fill="#FF9900" stroke="#000" strokeWidth="2.5" />
                                             <path d="M12.5 18.2h-3v-6.4h3V18.2zm6.3-5.2c-.3-.4-.8-.6-1.5-.6-.7 0-1.2.2-1.5.6s-.5 1-.5 1.7.2 1.3.5 1.7.8.6 1.5.6 1.2-.2 1.5-.6.5-1 .5-1.7-.2-1.3-.5-1.7zm1.1-1.2h2.2v6.4h-2.2v-1c-.4.4-.9.7-1.5.9-.6.2-1.2.3-1.8.3-1.3 0-2.3-.4-2.9-1.1s-1-1.8-1-3.2.3-2.5 1-3.2 1.6-1.1 2.9-1.1c.6 0 1.2.1 1.8.3.6.2 1.1.5 1.5.9v-1.2zm6.2 3.6c0 1-.3 1.8-1 2.3s-1.6.8-2.8.8-2.1-.2-2.8-.7V16c.7.6 1.6.9 2.7.9.6 0 1.1-.1 1.4-.4s.4-.6.4-1c0-.3-.1-.6-.4-.8s-.8-.4-1.5-.6-1.4-.4-1.8-.7-.6-.8-.6-1.5c0-.9.3-1.6 1-2.1s1.6-.7 2.7-.7c1.1 0 2 .2 2.6.6v2.2c-.6-.5-1.4-.7-2.3-.7-.5 0-.9.1-1.2.3s-.4.4-.4.7c0 .3.1.5.4.7s.7.4 1.4.6c.8.2 1.4.4 1.9.7s.8.8.8 1.5z" fill="#111" />
                                             <path d="M7 23.5c4-1.5 12-1.5 18 0" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                                             <path d="M23 22c1 1.5 2 2 3 2.5" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                                         </svg>
                                     </div>
                                     <div style={{ flexGrow: 1 }}>
                                         <div className="status-label">AWS Core Emulator</div>
                                         <div className="status-sub">AWS SDK v3 Compatible</div>
                                     </div>
                                     <span className="status-pill pill-green">
                                         SUPPORTED
                                     </span>
                                 </div>

                                 {/* Azure */}
                                 <div className="status-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                     <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                                         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <rect width="32" height="32" fill="#0078D4" stroke="#000" strokeWidth="2.5" />
                                             <path d="M6 24L15.5 8.5L20 16L12.5 20L6 24Z" fill="#50E4FF" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
                                             <path d="M26 24L15.5 8.5L20 16L26 24Z" fill="#005A9E" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
                                             <path d="M12.5 20L20 16L26 24L12.5 20Z" fill="#008AD7" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
                                         </svg>
                                     </div>
                                     <div style={{ flexGrow: 1 }}>
                                         <div className="status-label">Azure AZ Emulator</div>
                                         <div className="status-sub">Azure SDK Compatible</div>
                                     </div>
                                     <span className="status-pill pill-green">
                                         SUPPORTED
                                     </span>
                                 </div>

                                 {/* GCP */}
                                 <div className="status-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                     <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                                         <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <rect width="32" height="32" fill="#FFF" stroke="#000" strokeWidth="2.5" />
                                             <path d="M16 6L24.5 11V21L16 26L7.5 21V11L16 6Z" stroke="#000" strokeWidth="2" strokeLinejoin="round" fill="#EA4335" />
                                             <path d="M16 6V16L24.5 21V11L16 6Z" fill="#4285F4" />
                                             <path d="M16 16L7.5 11V21L16 26V16Z" fill="#34A853" />
                                             <path d="M16 16L24.5 21V11L16 16Z" fill="#FBBC05" />
                                         </svg>
                                     </div>
                                     <div style={{ flexGrow: 1 }}>
                                         <div className="status-label">GCP Emulator</div>
                                         <div className="status-sub">GCP Client Library Compatible</div>
                                     </div>
                                     <span className="status-pill pill-green">
                                         SUPPORTED
                                     </span>
                                 </div>
                             </div>

                            <div style={{ marginTop: '16px', fontSize: '11px', color: '#64748b' }}>
                                Fully compatible with standard local emulation endpoints.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partner / Ecosystem Logos Section */}
            <section style={{
                borderBottom: '4px solid #014BAA',
                backgroundColor: '#FFF',
                padding: '32px 0',
                overflow: 'hidden'
            }}>
                <div className="container-max" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{ fontWeight: '900', fontSize: '14px', textTransform: 'uppercase', color: '#014BAA', letterSpacing: '1.5px' }}>
                        COMPATIBLE WITH &amp; BUILT ON
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '24px',
                        width: '100%'
                    }}>
                        {/* AWS badge */}
                        <div className="tech-badge" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            border: '3px solid #000',
                            backgroundColor: '#F8F3F0',
                            padding: '10px 20px',
                            boxShadow: '3px 3px 0px 0px #000',
                            fontWeight: 'bold',
                            fontFamily: "'Space Mono', monospace",
                            color: '#000',
                            fontSize: '15px'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" fill="#FF9900" stroke="#000" strokeWidth="2.5" />
                                <path d="M12.5 18.2h-3v-6.4h3V18.2zm6.3-5.2c-.3-.4-.8-.6-1.5-.6-.7 0-1.2.2-1.5.6s-.5 1-.5 1.7.2 1.3.5 1.7.8.6 1.5.6 1.2-.2 1.5-.6.5-1 .5-1.7-.2-1.3-.5-1.7zm1.1-1.2h2.2v6.4h-2.2v-1c-.4.4-.9.7-1.5.9-.6.2-1.2.3-1.8.3-1.3 0-2.3-.4-2.9-1.1s-1-1.8-1-3.2.3-2.5 1-3.2 1.6-1.1 2.9-1.1c.6 0 1.2.1 1.8.3.6.2 1.1.5 1.5.9v-1.2zm6.2 3.6c0 1-.3 1.8-1 2.3s-1.6.8-2.8.8-2.1-.2-2.8-.7V16c.7.6 1.6.9 2.7.9.6 0 1.1-.1 1.4-.4s.4-.6.4-1c0-.3-.1-.6-.4-.8s-.8-.4-1.5-.6-1.4-.4-1.8-.7-.6-.8-.6-1.5c0-.9.3-1.6 1-2.1s1.6-.7 2.7-.7c1.1 0 2 .2 2.6.6v2.2c-.6-.5-1.4-.7-2.3-.7-.5 0-.9.1-1.2.3s-.4.4-.4.7c0 .3.1.5.4.7s.7.4 1.4.6c.8.2 1.4.4 1.9.7s.8.8.8 1.5z" fill="#111" />
                                <path d="M7 23.5c4-1.5 12-1.5 18 0" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                                <path d="M23 22c1 1.5 2 2 3 2.5" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            AWS
                        </div>

                        {/* AZURE badge */}
                        <div className="tech-badge" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            border: '3px solid #000',
                            backgroundColor: '#F8F3F0',
                            padding: '10px 20px',
                            boxShadow: '3px 3px 0px 0px #000',
                            fontWeight: 'bold',
                            fontFamily: "'Space Mono', monospace",
                            color: '#000',
                            fontSize: '15px'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" fill="#0078D4" stroke="#000" strokeWidth="2.5" />
                                <path d="M6 24L15.5 8.5L20 16L12.5 20L6 24Z" fill="#50E4FF" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M26 24L15.5 8.5L20 16L26 24Z" fill="#005A9E" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
                                <path d="M12.5 20L20 16L26 24L12.5 20Z" fill="#008AD7" stroke="#000" strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                            AZURE
                        </div>

                        {/* GCP badge */}
                        <div className="tech-badge" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            border: '3px solid #000',
                            backgroundColor: '#F8F3F0',
                            padding: '10px 20px',
                            boxShadow: '3px 3px 0px 0px #000',
                            fontWeight: 'bold',
                            fontFamily: "'Space Mono', monospace",
                            color: '#000',
                            fontSize: '15px'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" fill="#FFF" stroke="#000" strokeWidth="2.5" />
                                <path d="M16 6L24.5 11V21L16 26L7.5 21V11L16 6Z" stroke="#000" strokeWidth="2" strokeLinejoin="round" fill="#EA4335" />
                                <path d="M16 6V16L24.5 21V11L16 6Z" fill="#4285F4" />
                                <path d="M16 16L7.5 11V21L16 26V16Z" fill="#34A853" />
                                <path d="M16 16L24.5 21V11L16 16Z" fill="#FBBC05" />
                            </svg>
                            GCP
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Grid */}
            <section className="features-section">
                <div className="container-max">
                    <h2 className="section-title">Project Features</h2>
                    <p className="section-desc">What makes Harshify the ultimate DevTools for your local multi-cloud emulation environment.</p>

                    <div className="features-grid">
                        {/* Feature 1 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <Layers size={24} />
                            </div>
                            <h3 className="feature-title">Unified Explorer</h3>
                            <p className="feature-body">
                                View resources for multiple clouds side-by-side. Explore S3 Buckets, Azure Blobs, GCP Cloud Storage, Lambdas, Cloud SQL databases, and VMs in one responsive viewport.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <Cpu size={24} />
                            </div>
                            <h3 className="feature-title">Schema-Driven UI</h3>
                            <p className="feature-body">
                                Avoid building bespoke frontend forms. Capabilities, columns, and properties are dynamically loaded from backend service schemas, rendering lists and forms automatically.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <Terminal size={24} />
                            </div>
                            <h3 className="feature-title">Invoker Terminal</h3>
                            <p className="feature-body">
                                Execute serverless functions (like AWS Lambda) directly in the UI. Read execution tails, monitor runtime performance, and diagnose handler error logs instantly.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <Database size={24} />
                            </div>
                            <h3 className="feature-title">Rich Storage Browser</h3>
                            <p className="feature-body">
                                Upload, download, and copy files locally. A full-fledged blob/bucket navigation shell supports folder prefix creation and object-level metadata checks.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <Shield size={24} />
                            </div>
                            <h3 className="feature-title">Secrets &amp; Vaults</h3>
                            <p className="feature-body">
                                Manage AWS secrets and Azure key vaults. Retrieve secret values, edit parameters, force deletion, and configure regional vaults from a secure local environment.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <Server size={24} />
                            </div>
                            <h3 className="feature-title">Multi-Cloud SPI</h3>
                            <p className="feature-body">
                                Built on a service provider interface (SPI) backend. Register new cloud adapters inside Honoclients with zero modification to the React UI code.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Section */}
            <section className="arch-section">
                <div className="container-max arch-grid">
                    <div>
                        <div className="diagram-frame">
                            <img 
                                src="/docs/images/harshify-architecture.svg" 
                                alt="Harshify Unified Architecture Diagram"
                                style={{ width: '100%', height: 'auto', display: 'block' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>System Layout</div>
                        <h2 className="section-title" style={{ marginBottom: '16px' }}>Architecture</h2>
                        <p className="hero-desc" style={{ fontSize: '15px', marginBottom: '32px' }}>
                            Harshify acts as a lightweight proxy interface. The client frontend does not call AWS/Azure/GCP endpoints directly, eliminating browser CORS issues and preventing local credentials exposure.
                        </p>

                        <div style={{ width: '100%' }}>
                            <div className="arch-step">
                                <div className="step-number">01</div>
                                <div>
                                    <div className="step-title">React Frontend</div>
                                    <div className="step-desc">Queries `/api/clouds/...` generically and constructs the sidebar navigation and resource layouts dynamically from the schema.</div>
                                </div>
                            </div>
                            
                            <div className="arch-step">
                                <div className="step-number">02</div>
                                <div>
                                    <div className="step-title">Hono/Bun Proxy API</div>
                                    <div className="step-desc">Intercepts dashboard calls, handles credentials, manages schemas, and routes operations to the target cloud adapters.</div>
                                </div>
                            </div>

                            <div className="arch-step">
                                <div className="step-number">03</div>
                                <div>
                                    <div className="step-title">SPI Cloud Adapters</div>
                                    <div className="step-desc">Translates generic proxy instructions into AWS SDK v3 / HTTP calls executed locally against your running emulators.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Start Setup Guide */}
            <section className="qs-section">
                <div className="container-max">
                    <h2 className="section-title">Quick Start</h2>
                    <p className="section-desc">Get the console running in under a minute on your local computer.</p>

                    <div className="qs-box">
                        <div className="qs-box-tag">shell</div>
                        <div className="code-comment"># 1. Spin up AWS/Azure/GCP emulator runtimes</div>
                        <div><span className="code-cmd">docker compose</span> --profile multicloud up -d</div>
                        
                        <div className="code-comment" style={{ marginTop: '16px' }}># 2. Install workspace dependencies</div>
                        <div><span className="code-cmd">pnpm</span> install</div>

                        <div className="code-comment" style={{ marginTop: '16px' }}># 3. Start development stack</div>
                        <div><span className="code-cmd">pnpm</span> dev</div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
                        <a 
                            href="https://github.com/harsh-hak/harshify" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-primary"
                        >
                            GitHub Repository
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="brutalist-footer">
                <div className="container-max footer-flex">
                    <div className="footer-logo">
                        <div className="footer-logo-square" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="18" height="18" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h8v48H0zM24 0h8v48h-8zM0 20h32v8H0z" fill="#000"/>
                            </svg>
                        </div>
                        <span style={{ color: '#FFF', fontWeight: 900, textTransform: 'uppercase', fontSize: '18px' }}>HARSHIFY</span>
                    </div>

                    <div className="footer-copy">
                        <div>Released under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="footer-link">MIT License</a>.</div>
                        <div style={{ marginTop: '4px' }}>Copyright &copy; 2026 Harsh Kanojia. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
