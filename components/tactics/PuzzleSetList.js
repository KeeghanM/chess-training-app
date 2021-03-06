import { useState, useContext, useEffect } from "react"
import { UserContext } from "../../lib/context"
import { firestore } from "../../lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import CreateSetForm from "./CreateSetForm"
import SetListItem from "./PuzzleSetListItem"
import ImportSet from "./ImportSet"

export default function PuzzleSetList(props) {
  const { user } = useContext(UserContext)
  const [puzzleSetList, setpuzzleSetList] = useState([])
  useEffect(() => {
    getSetList()
  }, [])

  function getSetList() {
    let setList = []
    getDocs(collection(firestore, "users", user.uid, "tactics-sets")).then(
      (docs) => {
        docs.forEach((doc) => {
          setList.push({ id: doc.id, set: doc.data() })
        })
        for (let set of setList) {
          if (
            set.set.rounds.length < 8 &&
            set.set.rounds[set.set.rounds.length - 1].completed ==
              set.set.setSize
          ) {
            set.set.rounds.push({ completed: 0, correct: 0, timeSpent: 0 })
          }
        }
        setpuzzleSetList(setList)
        localStorage.setItem("tactics-set-list", JSON.stringify(setList))
      }
    )
  }

  return (
    <div>
      <div>
        {puzzleSetList.map((set, index) => {
          return (
            <SetListItem
              set={set}
              key={index}
              onSelect={() => props.onSelect(set.id)}
              updateList={setpuzzleSetList}
            />
          )
        })}
      </div>
      {puzzleSetList.length < 3 && (
        <div className="mt-6 flex flex-row gap-6">
          <CreateSetForm onSave={getSetList} />
          <ImportSet onSave={getSetList} />
        </div>
      )}
    </div>
  )
}
