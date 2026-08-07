import {describe, expect, test} from 'bun:test'
import createSystemRoutes, {detectLanAddresses} from './system'

describe('system routes', () => {
    test('GET /network returns the machine LAN IPv4 addresses', async () => {
        const app = createSystemRoutes
        const res = await app.request('/network')
        expect(res.status).toBe(200)

        const body = await res.json() as {addresses: string[]}
        expect(Array.isArray(body.addresses)).toBe(true)
        // Loopback is excluded and every entry is a plain IPv4 literal.
        for (const address of body.addresses) {
            expect(address).not.toBe('127.0.0.1')
            expect(/^\d{1,3}(\.\d{1,3}){3}$/.test(address)).toBe(true)
        }
    })

    test('HARSHIFY_LAN_ADDRESSES override wins over interface detection', () => {
        expect(detectLanAddresses({HARSHIFY_LAN_ADDRESSES: ' 192.168.1.50 , 10.0.0.4 '}))
            .toEqual(['192.168.1.50', '10.0.0.4'])
    })

    test('empty HARSHIFY_LAN_ADDRESSES falls back to interface detection', () => {
        const addresses = detectLanAddresses({HARSHIFY_LAN_ADDRESSES: '  , '})
        expect(Array.isArray(addresses)).toBe(true)
        for (const address of addresses) {
            expect(/^\d{1,3}(\.\d{1,3}){3}$/.test(address)).toBe(true)
        }
    })
})
