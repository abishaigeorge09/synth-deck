export function PaperTexture({
  strength = 0.55,
  tint: _tint = 'rgba(255,255,255,0.9)',
}: {
  strength?: number
  tint?: string
}) {
  void _tint
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* subtle paper grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '22px 22px, 28px 28px',
          backgroundPosition: '0 0, 11px 13px',
          opacity: 0.35 * strength,
          mixBlendMode: 'multiply',
        }}
      />
      {/* soft tint wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(120deg, rgba(0,0,0,0.02), rgba(0,0,0,0) 45%, rgba(0,0,0,0.03))',
          opacity: 0.65 * strength,
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}

