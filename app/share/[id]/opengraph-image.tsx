import { ImageResponse } from 'next/og'

import { createClient } from '@/lib/supabase/server'
import { formatFileSize } from '@/lib/utils'

export const runtime = 'edge'
export const alt = 'Vault - File Sharing'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

function VaultLogo() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#fff">
        <path d="m35.8177 36.8043c-.5005 1.0368-1.5503 1.6957-2.7016 1.6957h-16.3076c-2.2193 0-3.6703-2.3261-2.6944-4.3193l11.2624-23c.5037-1.0286 1.5491-1.6807 2.6944-1.6807h16.1486c2.212 0 3.6633 2.3122 2.7017 4.3042z" />
        <path
          d="m6.87054 26.7399c1.05114 2.3025 4.30556 2.3487 5.42166.077l6.3838-12.9941c.9793-1.9934-.4716-4.3228-2.6926-4.3228h-12.31585c-2.18399 0-3.6360556 2.2591-2.729061 4.2459z"
          opacity=".5"
        />
      </g>
    </svg>
  )
}

export default async function og({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: file } = await supabase
    .from('files')
    .select('*')
    .eq('share_id', params.id)
    .single()

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #18181b, #09090b)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at center, #ffffff08 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage:
              'radial-gradient(circle at center, black, transparent 70%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            padding: 48,
            background:
              'linear-gradient(to bottom right, #ffffff10, #ffffff05)',
            borderRadius: 24,
            border: '1px solid #ffffff20',
            boxShadow: '0 8px 24px #00000040',
          }}
        >
          <VaultLogo />
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              background: 'linear-gradient(to bottom right, white, #ffffff40)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}
          >
            Vault
          </div>
          {file && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  color: '#ffffff99',
                  maxWidth: 600,
                  textAlign: 'center',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  padding: '12px 24px',
                  background: '#ffffff0a',
                  borderRadius: 12,
                  border: '1px solid #ffffff10',
                }}
              >
                {file.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    color: '#ffffffcc',
                    padding: '6px 12px',
                    background: '#ffffff15',
                    borderRadius: 9999,
                    border: '1px solid #ffffff20',
                  }}
                >
                  {formatFileSize(file.size)}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: '#ffffffcc',
                    padding: '6px 12px',
                    background: '#ffffff15',
                    borderRadius: 9999,
                    border: '1px solid #ffffff20',
                    textTransform: 'uppercase',
                  }}
                >
                  {file.type.split('/')[1]}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 20,
            color: '#ffffff40',
            letterSpacing: '-0.01em',
          }}
        >
          Simple File Sharing
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
