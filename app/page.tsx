import { getAbilities, getColors, getEggGroups, getHabitats, getMoves, getShapes, getTypes } from "@/lib/PokemonDataList";
import CriteriaSelects from "./components/CriteriaSelects";
import { LANG_ID } from "./Constants";

const abilities = getAbilities(LANG_ID)
const types = getTypes(LANG_ID)
const moves = getMoves(LANG_ID)
const shapes = getShapes(LANG_ID)
const eggGroups = getEggGroups(LANG_ID)
const habitats = getHabitats(LANG_ID)
const colors = getColors(LANG_ID)

export default async function Home() {
  return (
    <div>
      <CriteriaSelects abilities={abilities} types={types} moves={moves} shapes={shapes} eggGroups={eggGroups} habitats={habitats} colors={colors} />
    </div>
  )
}
