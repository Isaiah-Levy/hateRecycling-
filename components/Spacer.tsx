// components/Spacer.tsx
// components/Spacer.tsx
export default function Spacer({ h = 320 }: { h?: number }) {
    return <div style={{ height: `${h}px` }} aria-hidden="true" />;
  }
  