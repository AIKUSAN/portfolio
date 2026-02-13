import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'
export const dynamic = 'force-static'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: '#1e293b', // slate-800
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                }}
            >
                <div
                    style={{
                        fontSize: 20,
                        fontWeight: 700,
                        fontFamily: 'sans-serif',
                        background: 'linear-gradient(to right, #60a5fa, #a855f7)',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    LT
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
