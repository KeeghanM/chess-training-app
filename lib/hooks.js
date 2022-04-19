import { useEffect, useState } from "react"
import { auth, firestore } from "../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, getDoc } from "firebase/firestore"

export function useUserData() {
  const [authUser] = useAuthState(auth)
  const [userDetails, setuserDetails] = useState(null)

  useEffect(() => {
    if (authUser) {
      getDoc(doc(firestore, "users", authUser.uid)).then((doc) => {
        let data = doc.data()
        setuserDetails({
          uid: authUser.uid,
          email: data.email || authUser.email,
          displayName: data.displayName || authUser.displayName,
          knightHighscore:
            data.knightHighscore ||
            JSON.parse(sessionStorage.getItem("best-knight-vision-streak")) ||
            0,
          photoUrl: authUser.photoURL,
          chessRating: data.chessRating || 1500,
          puzzleDifficulty: data.puzzleDifficulty || 1,
          clubs: data.clubs || [],
        })
      })
    } else {
      setuserDetails(null)
    }
  }, [authUser])

  return { user: userDetails }
}

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      return initialValue
    }
  })
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue]
}

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener("resize", handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export function useDarkMode() {
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled")
  // See if user has set a browser or OS preference for dark mode.
  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = useMedia(
    ["(prefers-color-scheme: dark)"],
    [true],
    false
  )
  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled =
    typeof enabledState !== "undefined" ? enabledState : prefersDarkMode
  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = "dark"
      const element = window.document.body
      if (enabled) {
        element.classList.add(className)
      } else {
        element.classList.remove(className)
      }
    },
    [enabled] // Only re-call effect when value changes
  )
  // Return enabled state and setter
  return [enabled, setEnabledState]
}

export function useMedia(queries, values, defaultValue) {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map((q) => window.matchMedia(q))
  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches)
    // Return related value or defaultValue if none
    return typeof values[index] !== "undefined" ? values[index] : defaultValue
  }
  // State and setter for matched value
  const [value, setValue] = useState(getValue)
  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue)
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler))
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler))
    },
    [] // Empty array ensures effect is only run on mount and unmount
  )
  return value
}
