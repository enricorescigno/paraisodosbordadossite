
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)
  const [isInitialized, setIsInitialized] = React.useState(false)

  React.useEffect(() => {
    const updateMobileStatus = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      if (!isInitialized) {
        setIsInitialized(true)
      }
    }
    
    // Initialize immediately
    updateMobileStatus()
    
    // Set up event listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", updateMobileStatus)
    
    return () => mql.removeEventListener("change", updateMobileStatus)
  }, [isInitialized])

  return isInitialized ? isMobile : false
}
