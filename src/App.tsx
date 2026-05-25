import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import DesktopScreen from './components/DesktopScreen'
import BootScreen from './components/BootScreen'

export default function App() {
  const [booted, setBooted] = useState(false)
  const handleBootComplete = useCallback(() => setBooted(true), [])

  return (
    <>
      {/* Desktop is mounted immediately so it's ready the moment boot fades out */}
      <DesktopScreen />

      {/* Boot screen overlays the desktop; AnimatePresence drives the exit fade */}
      <AnimatePresence>
        {!booted && (
          <BootScreen key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>
    </>
  )
}
