import { useCallback, useContext, useEffect, useState } from "react"
import Layout from "../../components/layout/Layout"
import ContentBlock from "../../components/utils/ContentBlock"
import { UserContext } from "../../lib/context"
import { debounce } from "lodash"
import { firestore } from "../../lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import { issuedAtTime } from "@firebase/util"

export default function ClubIndex() {
  const { user } = useContext(UserContext)
  const [clubNameValue, setclubNameValue] = useState("")
  const [isFound, setisFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  function onClubNameChange(e) {
    const val = e.target.value
    const re = /^[\w\-\s]+$/

    if (val.length >= 3 && re.test(val)) {
      setclubNameValue(val)
      setIsSearching(true)
    } else {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    searchClubNames(clubNameValue)
  }, [clubNameValue])

  const searchClubNames = useCallback(
    debounce(async (clubNameValue) => {
      if (clubNameValue?.length >= 3) {
        const clubRef = doc(firestore, "clubs", clubNameValue)
        const docSnap = await getDoc(clubRef)
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data())
          setisFound(true)
          setIsSearching(false)
        } else {
          setisFound(false)
          setIsSearching(false)
        }
      }
    }, 500),
    []
  )

  return (
    <Layout name="Club Games">
      {user?.clubs?.length > 0 && (
        <ContentBlock title="My Clubs">
          <div></div>
        </ContentBlock>
      )}
      <ContentBlock title="Join a club...">
        <div>
          and gain access to all your clubs games in PGN format. Easily browse
          and review games played by your own club mates, leave or read
          comments, and learn from their (or your own) mistakes.
        </div>
        <div>
          One of the biggest benefits of being a member of a chess club is the
          ability to learn from others, so with ChessTraining.app Clubs we aim
          to bring that knowledge to the digital space.
        </div>
        <div>
          Search for your club below, and send a join request. Once a club admin
          approves your request you'll be able to see all your clubs games right
          here.
        </div>
        <form>
          <label htmlFor="club-name">Club Name</label>
          <input
            className="text-dark"
            type="text"
            name="club-name"
            id="club-name"
            onChange={onClubNameChange}
          />
        </form>
        <SearchResultMessage
          name={clubNameValue}
          isSearching={isSearching}
          isFound={isFound}
        />
      </ContentBlock>
    </Layout>
  )
}

function SearchResultMessage({ name, isSearching, isFound }) {
  if (isSearching) {
    return <p>Searching...</p>
  } else if (isFound) {
    return <p>Club Found</p>
  } else if (name.length > 0) {
    return <p>Club not found</p>
  } else {
    return <p></p>
  }
}
