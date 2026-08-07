import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {
    ArrowRight,
    Terminal,
    Cpu,
    Database,
    Layers,
    Activity,
    Shield,
    Server,
    ExternalLink
} from 'lucide-react'

interface CloudStatus {
    aws: boolean
    azure: boolean
    gcp: boolean
}

export function LandingPage() {
    const [apiConnected, setApiConnected] = useState<boolean | null>(null)
    const [cloudStatus, setCloudStatus] = useState<CloudStatus>({
        aws: false,
        azure: false,
        gcp: false
    })

    useEffect(() => {
        fetch('/api/clouds')
            .then(res => {
                if (res.ok) {
                    setApiConnected(true)
                    return res.json()
                }
                throw new Error()
            })
            .then(() => {
                const checkCloud = (cloud: 'aws' | 'azure' | 'gcp') => {
                    fetch(`/api/clouds/${cloud}/status`)
                        .then(res => res.json())
                        .then(status => {
                            setCloudStatus(prev => ({
                                ...prev,
                                [cloud]: status.runtime === 'reachable'
                            }))
                        })
                        .catch(() => {})
                }
                checkCloud('aws')
                checkCloud('azure')
                checkCloud('gcp')
            })
            .catch(() => {
                setApiConnected(false)
            })
    }, [])

    return (
        <div className="brutalist-landing">
            {/* Embedded styles for Brutalist UI */}
            <style dangerouslySetInnerHTML={{ __html: `
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
                
                /* Liveness Badge */
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
                .status-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }
                .dot-green { background-color: #10b981; }
                .dot-red { background-color: #ef4444; }
                .dot-amber { background-color: #f59e0b; }
                
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
                .pill-red { background-color: #fee2e2; color: #991b1b; }
                
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
                        <div className="logo-square">
                            <span className="logo-text" style={{ color: '#FFF' }}>H</span>
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
                        <Link to="/console/aws" className="btn-primary">
                            Launch Console
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container-max hero-grid">
                    <div>
                        <div className="status-badge">
                            <span className={`status-dot ${apiConnected ? 'dot-green' : apiConnected === false ? 'dot-red' : 'dot-amber'}`} />
                            {apiConnected ? 'API Connected & Active' : apiConnected === false ? 'API Offline (Local runtime required)' : 'Probing API...'}
                        </div>

                        <h1 className="hero-title">
                            Any Cloud.<br/>Locally.
                        </h1>

                        <p className="hero-desc">
                            The local-first, cloud-aware developer console. Manage and explore your local AWS, Azure, and GCP emulators with a clean, unified, and schema-driven dashboard.
                        </p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <Link to="/console/aws" className="btn-primary btn-large">
                                Open Console
                                <ArrowRight size={22} />
                            </Link>
                            <a 
                                href="https://github.com/harsh-hak/harshify" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-secondary btn-large"
                            >
                                View Source
                                <svg width="22" height="22" className="fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <div className="status-widget">
                            <div className="widget-tag">System Status</div>
                            <h3 className="widget-title">
                                <Activity size={20} />
                                Emulator Status
                            </h3>

                            <div>
                                {/* AWS */}
                                <div className="status-row">
                                    <div>
                                        <div className="status-label">AWS Core Emulator</div>
                                        <div className="status-sub">localhost:4566</div>
                                    </div>
                                    <span className={`status-pill ${cloudStatus.aws ? 'pill-green' : 'pill-red'}`}>
                                        {cloudStatus.aws ? 'Connected' : 'Offline'}
                                    </span>
                                </div>

                                {/* Azure */}
                                <div className="status-row">
                                    <div>
                                        <div className="status-label">Azure AZ Emulator</div>
                                        <div className="status-sub">localhost:4577</div>
                                    </div>
                                    <span className={`status-pill ${cloudStatus.azure ? 'pill-green' : 'pill-red'}`}>
                                        {cloudStatus.azure ? 'Connected' : 'Offline'}
                                    </span>
                                </div>

                                {/* GCP */}
                                <div className="status-row">
                                    <div>
                                        <div className="status-label">GCP Emulator</div>
                                        <div className="status-sub">localhost:4588</div>
                                    </div>
                                    <span className={`status-pill ${cloudStatus.gcp ? 'pill-green' : 'pill-red'}`}>
                                        {cloudStatus.gcp ? 'Connected' : 'Offline'}
                                    </span>
                                </div>
                            </div>

                            <div style={{ marginTop: '16px', fontSize: '11px', color: '#64748b' }}>
                                Start the stack with <code style={{ backgroundColor: '#e2e8f0', padding: '2px 4px', borderRadius: '3px', color: '#014BAA', fontFamily: 'monospace' }}>docker compose --profile multicloud up</code> to activate.
                            </div>
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
                        <Link to="/console/aws" className="btn-primary">
                            Launch App Console
                        </Link>
                        <a 
                            href="https://github.com/harsh-hak/harshify" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-secondary"
                            style={{ padding: '10px 20px', fontSize: '14px' }}
                        >
                            GitHub
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="brutalist-footer">
                <div className="container-max footer-flex">
                    <div className="footer-logo">
                        <div className="footer-logo-square">H</div>
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
