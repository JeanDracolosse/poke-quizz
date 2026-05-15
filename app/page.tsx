import PokemonQueryBuilder from "./util/PokemonQueryBuilder"

const graphqlUrl = 'https://graphql.pokeapi.co/v1beta2'

export default async function Home() {
  const graphqlQueryBuilder: PokemonQueryBuilder = new PokemonQueryBuilder()
    .withGeneration(3)
    .withAbility("intimidate")
    .withType("fairy")
    .withMove("bite")
    .withShape("humanoid") // ball squiggle fish arms blob upright legs quadruped wings tentacles heads humanoid bug-wings armor
    .withEggGroup("fairy")
    .withHabitat("cave") // cave forest grassland mountain rare rough-terrain sea urban waters-edge
    .withColor("black")
    .withBaby(false)
    .withLegendary(false)
    .withMythical(false)
    .withEvolve(false)
    .withEvolutionStage(1);

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
  const pokemonList = graphqlQueryBuilder.formatReponse(posts)

  return (
    <div>{pokemonList.join(' ')}</div>
  )
}