import {Hono} from 'hono'
import {networkInterfaces} from 'node:os'

const app = new Hono()

/**
 * LAN IPv4 addresses the "Go Live" button advertises so the console can be
 * opened from any device on the local network.
 *
 * When the API runs inside a container (docker compose), `os.networkInterfaces()`
 * only returns the container's own bridge addresses — never the host's LAN IP.
 * Let the host pin what it wants to advertise (comma-separated) via
 * `HARSHIFY_LAN_ADDRESSES`; unset falls back to real interface detection, which
 * is correct when the API runs on the host (local dev).
 */
export function detectLanAddresses(env: NodeJS.ProcessEnv = process.env): string[] {
    const override = env.HARSHIFY_LAN_ADDRESSES?.split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    if (override && override.length > 0) return override

    return Object.values(networkInterfaces())
        .flat()
        .filter((iface): iface is NonNullable<typeof iface> => !!iface && iface.family === 'IPv4' && !iface.internal)
        .map((iface) => iface.address)
        .filter((address, index, all) => all.indexOf(address) === index)
}

app.get('/network', (c) => {
    return c.json({addresses: detectLanAddresses()})
})

export default app
