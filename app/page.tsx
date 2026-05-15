import { getAbilities, getColors, getEggGroups, getHabitats, getMoves, getShapes, getTypes } from "@/lib/PokemonDataList";
import PokemonQueryBuilder from "./util/PokemonQueryBuilder"

export const dynamic = "force-dynamic";

const graphqlUrl = 'https://graphql.pokeapi.co/v1beta2'
const langId = 5

const criteriaList = [
  "Generation",
  "Ability",
  "Type",
  "Move",
  "Shape",
  "EggGroup",
  "Habitat",
  "Color",
  "Baby",
  "Legendary",
  "Mythical",
  "Evolve",
  "EvolutionStage"
]

const abilities = getAbilities(langId)
const types = getTypes(langId)
const moves = getMoves(langId)
const shapes = getShapes(langId)
const eggGroups = getEggGroups(langId)
const habitats = getHabitats(langId)
const colors = getColors(langId)

function randomElements(tab: any[], n: number) {
  return [...tab]
    .sort(() => Math.random() - 0.5)
    .slice(0, n);
}

const chunkSize = 10;

export default async function Home() {

  const criteriaSubList = randomElements(criteriaList, 2)
  var enigma = []

  var graphqlQueryBuilder: PokemonQueryBuilder = new PokemonQueryBuilder()

  if (criteriaSubList.includes("Generation")) {
    const generation = Math.floor(Math.random() * 9) + 1
    enigma.push({ nom: "Generation ", value: generation })
    graphqlQueryBuilder = graphqlQueryBuilder.withGeneration(generation)
  }
  if (criteriaSubList.includes("Ability")) {
    const ability = randomElements(abilities, 1)[0]
    enigma.push({ nom: "Talent ", value: ability.name })
    graphqlQueryBuilder = graphqlQueryBuilder.withGeneration(ability.id)
  }
  if (criteriaSubList.includes("Type")) {
    const type = randomElements(types, 1)[0]
    enigma.push({ nom: "Type ", value: type.name })
    graphqlQueryBuilder = graphqlQueryBuilder.withType(type.id)
  }
  if (criteriaSubList.includes("Move")) {
    const move = randomElements(moves, 1)[0]
    enigma.push({ nom: "Attaque ", value: move.name })
    graphqlQueryBuilder = graphqlQueryBuilder.withMove(move.id)
  }
  if (criteriaSubList.includes("Shape")) {
    const shape = randomElements(shapes, 1)[0]
    enigma.push({ nom: "Forme ", value: shape.name })
    graphqlQueryBuilder = graphqlQueryBuilder.withShape(shape.id)
  }
  if (criteriaSubList.includes("EggGroup")) {
    const eggGroup = randomElements(eggGroups, 1)[0]
    enigma.push({ nom: "Groupe Oeuf ", value: eggGroup.name })
    graphqlQueryBuilder = graphqlQueryBuilder.withEggGroup(eggGroup.id)
  }
  if (criteriaSubList.includes("Habitat")) {
    const habitat = randomElements(habitats, 1)[0]
    enigma.push({ nom: "Habitat ", value: habitat.name })
    graphqlQueryBuilder = graphqlQueryBuilder.withHabitat(habitat.id)
  }
  if (criteriaSubList.includes("Color")) {
    const color = randomElements(colors, 1)[0]
    enigma.push({ nom: "Couleur ", value: color.name })
    graphqlQueryBuilder = graphqlQueryBuilder.withColor(color.id)
  }
  if (criteriaSubList.includes("Baby")) {
    const baby = Math.random() < 0.5
    enigma.push({ nom: "Bébé ", value: baby })
    graphqlQueryBuilder = graphqlQueryBuilder.withBaby(baby)
  }
  if (criteriaSubList.includes("Legendary")) {
    const legendary = Math.random() < 0.5
    enigma.push({ nom: "Légendaire ", value: legendary })
    graphqlQueryBuilder = graphqlQueryBuilder.withLegendary(legendary)
  }
  if (criteriaSubList.includes("Mythical")) {
    const mythical = Math.random() < 0.5
    enigma.push({ nom: "Mythique ", value: mythical })
    graphqlQueryBuilder = graphqlQueryBuilder.withMythical(mythical)
  }
  if (criteriaSubList.includes("Evolve")) {
    const evolve = Math.random() < 0.5
    enigma.push({ nom: "Forme final ", value: evolve })
    graphqlQueryBuilder = graphqlQueryBuilder.withEvolve(evolve)
  }
  if (criteriaSubList.includes("EvolutionStage")) {
    const evolutionStage = Math.floor(Math.random() * 3) + 1
    enigma.push({ nom: "Stade d'évolution ", value: evolutionStage })
    graphqlQueryBuilder = graphqlQueryBuilder.withEvolutionStage(evolutionStage)
  }

  const graphqlBody = graphqlQueryBuilder.build()

  const data = await fetch(graphqlUrl,
    {
      method: 'POST',
      body: JSON.stringify({
        query: graphqlBody,
      })
    }
  )

  const posts = await data.json()
  const pokemonList = graphqlQueryBuilder.formatReponse(posts, langId)

  const columns = [];
  for (let i = 0; i < pokemonList.length; i += chunkSize) {
    columns.push(pokemonList.slice(i, i + chunkSize));
  }

  return (
    <div>
      <ul>
        {enigma.map((item, index) => (
          <li key={index}>
            {item.nom} : {item.value.toString()}
          </li>
        ))}
      </ul>
      <details>
        <summary>
            {"Nombre total: " + pokemonList.length}
        </summary>
        <div style={{ display: "flex", gap: "5px" }}>
          {columns.map((column, colIndex) => (
            <table key={colIndex}>
              <tbody>
                {column.map((pokemon: string, index: number) => (
                  <tr key={index}>
                    <td>{pokemon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </details>
    </div>
  )
}
