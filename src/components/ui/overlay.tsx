export default function Overlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`overlay ${open ? 'active' : ''}`}
      onClick={onClose}
    />
  )
}
