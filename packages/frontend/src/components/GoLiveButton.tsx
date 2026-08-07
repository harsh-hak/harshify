import {useEffect, useState} from 'react'
import {Check, Copy, Globe, Monitor, X} from 'lucide-react'
import {getLanAddresses} from '@/api/cloudProxyClient'

function isIPv4(value: string): boolean {
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(value)
}

/**
 * "Go Live" button — exposes the console to the whole local network.
 *
 * The dev server and API already bind `0.0.0.0`, so the app is reachable from
 * any device on the same network at `http://<lan-ip>:<port>`. This component
 * asks the API for the machine's LAN IPv4 addresses and surfaces copy-ready
 * URLs, so the user can share a link without guessing the IP themselves.
 */
export function GoLiveButton() {
    const [open, setOpen] = useState(false)
    const [addresses, setAddresses] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [copied, setCopied] = useState<string | null>(null)

    // The port the browser is actually using. If it is empty the console is
    // served on the default 80/443, so `http://<ip>` is already complete.
    const port = window.location.port ? `:${window.location.port}` : ''

    useEffect(() => {
        if (!open) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setOpen(false)
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open])

    async function refresh() {
        setLoading(true)
        setError(null)
        try {
            const fromApi = await getLanAddresses()
            // When the app was opened via a LAN address (e.g. the API is
            // containerized and can only see its own bridge network), the address
            // the browser is actually connected to is the one that provably works.
            const locationHost = window.location.hostname
            const current = isIPv4(locationHost) ? [locationHost] : []
            setAddresses([...current, ...fromApi.filter((a) => a !== current[0])])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not detect LAN addresses.')
        } finally {
            setLoading(false)
        }
    }

    function openModal() {
        setOpen(true)
        setCopied(null)
        void refresh()
    }

    function copy(address: string) {
        const url = `http://${address}${port}`
        navigator.clipboard.writeText(url).then(
            () => {
                setCopied(address)
                window.setTimeout(() => setCopied((c) => (c === address ? null : c)), 1500)
            },
            () => {
                setError('Clipboard blocked by the browser — copy the URL manually.')
            },
        )
    }

    return (
        <>
            <button
                type="button"
                className="golive-trigger"
                onClick={openModal}
                title="Expose the console to your local network"
            >
                <Globe size={14}/>
                <span>Go Live</span>
            </button>

            {open && (
                <div className="modal-overlay" onMouseDown={(e) => {
                    if (e.target === e.currentTarget) setOpen(false)
                }}>
                    <div className="golive-modal" role="dialog" aria-modal="true" aria-labelledby="golive-title">
                        <div className="golive-modal-header">
                            <h3 id="golive-title">Go Live — local network</h3>
                            <button
                                type="button"
                                className="golive-close"
                                onClick={() => setOpen(false)}
                                title="Close"
                                aria-label="Close"
                            >
                                <X size={14}/>
                            </button>
                        </div>

                        <p className="golive-intro">
                            Anyone on this network can open the console from these addresses.
                            The dev server and API already listen on all interfaces — share an address
                            below and it works as-is.
                        </p>

                        <div className="golive-body">
                            {loading && <div className="golive-loading">Detecting LAN addresses…</div>}

                            {error && <div className="golive-error">{error}</div>}

                            {!loading && !error && addresses.length === 0 && (
                                <div className="golive-empty">
                                    <Monitor size={18}/>
                                    <span>No LAN address detected. Check your network connection and try again.</span>
                                </div>
                            )}

                            {!loading && !error && addresses.length > 0 && (
                                <ul className="golive-addresses">
                                    {addresses.map((address) => {
                                        const url = `http://${address}${port}`
                                        const isCopied = copied === address
                                        return (
                                            <li key={address} className="golive-address">
                                                <a href={url} target="_blank" rel="noopener noreferrer">
                                                    {url}
                                                </a>
                                                <button
                                                    type="button"
                                                    className="golive-copy"
                                                    onClick={() => copy(address)}
                                                    title="Copy link"
                                                >
                                                    {isCopied ? <Check size={14}/> : <Copy size={14}/>}
                                                    {isCopied ? 'Copied' : 'Copy'}
                                                </button>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>

                        {!loading && !error && addresses.length > 0 && (
                            <div className="golive-footer">
                                <span className="golive-hint">
                                    Same Wi-Fi/network required. Firewall may prompt to allow inbound traffic.
                                </span>
                                <button type="button" className="golive-refresh" onClick={() => void refresh()}>
                                    Refresh
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
