"use client";

import { useState } from "react";
import PokemonQueryBuilder from "../util/PokemonQueryBuilder";
import { GRAPHQL_URL, LANG_ID } from "../Constants";

export type Props = {
    abilities: { id: string, name: string }[];
    types: { id: string, name: string }[];
    moves: { id: string, name: string }[];
    shapes: { id: string, name: string }[];
    eggGroups: { id: string, name: string }[];
    habitats: { id: string, name: string }[];
    colors: { id: string, name: string }[];
};

export default function CriteriaSelects({ abilities, types, moves, shapes, eggGroups, habitats, colors }: Props) {
    const [selectedGeneration, setSelectedGeneration] = useState<string | undefined>(undefined);
    const [selectedAbility, setSelectedAbility] = useState<string | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<string | undefined>(undefined);
    const [selectedMove, setSelectedMove] = useState<string | undefined>(undefined);
    const [selectedShape, setSelectedShape] = useState<string | undefined>(undefined);
    const [selectedEggGroup, setSelectedEggGroup] = useState<string | undefined>(undefined);
    const [selectedHabitat, setSelectedHabitat] = useState<string | undefined>(undefined);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    const [selectedEvolutionStage, setSelectedEvolutionStage] = useState<string | undefined>(undefined);
    const [selectedBaby, setSelectedBaby] = useState<string | undefined>(undefined);
    const [selectedLegendary, setSelectedLegendary] = useState<string | undefined>(undefined);
    const [selectedMythical, setSelectedMythical] = useState<string | undefined>(undefined);
    const [selectedEvolve, setSelectedEvolve] = useState<string | undefined>(undefined);

    const [pokemonList, setPokemonList] = useState([]);

    async function handleSearch() {
        let graphqlQueryBuilder: PokemonQueryBuilder = new PokemonQueryBuilder()
        if (selectedGeneration) {
            graphqlQueryBuilder = graphqlQueryBuilder.withGeneration(parseInt(selectedGeneration))
        }
        if (selectedAbility) {
            graphqlQueryBuilder = graphqlQueryBuilder.withAbility(parseInt(selectedAbility))
        }
        if (selectedType) {
            graphqlQueryBuilder = graphqlQueryBuilder.withType(parseInt(selectedType))
        }
        if (selectedMove) {
            graphqlQueryBuilder = graphqlQueryBuilder.withMove(parseInt(selectedMove))
        }
        if (selectedShape) {
            graphqlQueryBuilder = graphqlQueryBuilder.withShape(parseInt(selectedShape))
        }
        if (selectedEggGroup) {
            graphqlQueryBuilder = graphqlQueryBuilder.withEggGroup(parseInt(selectedEggGroup))
        }
        if (selectedHabitat) {
            graphqlQueryBuilder = graphqlQueryBuilder.withHabitat(parseInt(selectedHabitat))
        }
        if (selectedColor) {
            graphqlQueryBuilder = graphqlQueryBuilder.withColor(parseInt(selectedColor))
        }
        if (selectedEvolutionStage) {
            graphqlQueryBuilder = graphqlQueryBuilder.withEvolutionStage(parseInt(selectedEvolutionStage))
        }
        if (selectedBaby) {
            graphqlQueryBuilder = graphqlQueryBuilder.withBaby(selectedBaby === "1")
        }
        if (selectedLegendary) {
            graphqlQueryBuilder = graphqlQueryBuilder.withLegendary(selectedLegendary === "1")
        }
        if (selectedMythical) {
            graphqlQueryBuilder = graphqlQueryBuilder.withMythical(selectedMythical === "1")
        }
        if (selectedEvolve) {
            graphqlQueryBuilder = graphqlQueryBuilder.withEvolve(selectedEvolve === "1")
        }

        const graphqlBody = graphqlQueryBuilder.build()

        const data = await fetch(GRAPHQL_URL,
            {
                method: 'POST',
                body: JSON.stringify({
                    query: graphqlBody,
                })
            }
        )

        const posts = await data.json()
        setPokemonList(graphqlQueryBuilder.formatReponse(posts, LANG_ID))
    }

    return (
        <div>
            <select
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)} >
                <option value="">
                    --Génération--
                </option>

                {Array.from({ length: 9 }, (_, n) => n + 1).map(generation => (
                    <option
                        key={generation}
                        value={generation}
                    >
                        {generation}
                    </option>
                ))}
            </select>
            <select
                value={selectedAbility}
                onChange={(e) => setSelectedAbility(e.target.value)} >
                <option value="">
                    --Talent--
                </option>

                {abilities.map((ability: { id: string, name: string }) => (
                    <option
                        key={ability.id}
                        value={ability.id}
                    >
                        {ability.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)} >
                <option value="">
                    --Type--
                </option>

                {types.map((typeEntry: { id: string, name: string }) => (
                    <option
                        key={typeEntry.id}
                        value={typeEntry.id}
                    >
                        {typeEntry.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedMove}
                onChange={(e) => setSelectedMove(e.target.value)} >
                <option value="">
                    --Attaque--
                </option>

                {moves.map((move: { id: string, name: string }) => (
                    <option
                        key={move.id}
                        value={move.id}
                    >
                        {move.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)} >
                <option value="">
                    --Forme--
                </option>

                {shapes.map((shape: { id: string, name: string }) => (
                    <option
                        key={shape.id}
                        value={shape.id}
                    >
                        {shape.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedEggGroup}
                onChange={(e) => setSelectedEggGroup(e.target.value)} >
                <option value="">
                    --Groupe d&apos;oeuf--
                </option>

                {eggGroups.map((eggGroup: { id: string, name: string }) => (
                    <option
                        key={eggGroup.id}
                        value={eggGroup.id}
                    >
                        {eggGroup.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedHabitat}
                onChange={(e) => setSelectedHabitat(e.target.value)} >
                <option value="">
                    --Habitat--
                </option>

                {habitats.map((habitat: { id: string, name: string }) => (
                    <option
                        key={habitat.id}
                        value={habitat.id}
                    >
                        {habitat.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)} >
                <option value="">
                    --Couleur--
                </option>

                {colors.map((color: { id: string, name: string }) => (
                    <option
                        key={color.id}
                        value={color.id}
                    >
                        {color.name}
                    </option>
                ))}
            </select>
            <select
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)} >
                <option value="">
                    --Génération--
                </option>

                {Array.from({ length: 9 }, (_, n) => n + 1).map(generation => (
                    <option
                        key={generation}
                        value={generation}
                    >
                        {generation}
                    </option>
                ))}
            </select>
            <select
                value={selectedEvolutionStage}
                onChange={(e) => setSelectedEvolutionStage(e.target.value)} >
                <option value="">
                    --Stade d&apos;évolution--
                </option>

                {Array.from({ length: 3 }, (_, n) => n + 1).map(evolutionStage => (
                    <option
                        key={evolutionStage}
                        value={evolutionStage}
                    >
                        {evolutionStage}
                    </option>
                ))}
            </select>
            <select
                value={selectedBaby}
                onChange={(e) => setSelectedBaby(e.target.value)} >
                <option value="">
                    --Bébé--
                </option>

                {Array.from({ length: 2 }, (_, n) => n + 1).map(baby => (
                    <option
                        key={baby}
                        value={baby}
                    >
                        {baby === 1 ? "Oui" : "Non"}
                    </option>
                ))}
            </select>
            <select
                value={selectedMythical}
                onChange={(e) => setSelectedMythical(e.target.value)} >
                <option value="">
                    --Fabuleux--
                </option>

                {Array.from({ length: 2 }, (_, n) => n + 1).map(mythical => (
                    <option
                        key={mythical}
                        value={mythical}
                    >
                        {mythical === 1 ? "Oui" : "Non"}
                    </option>
                ))}
            </select>
            <select
                value={selectedLegendary}
                onChange={(e) => setSelectedLegendary(e.target.value)} >
                <option value="">
                    --Légendaire--
                </option>

                {Array.from({ length: 2 }, (_, n) => n + 1).map(legendary => (
                    <option
                        key={legendary}
                        value={legendary}
                    >
                        {legendary === 1 ? "Oui" : "Non"}
                    </option>
                ))}
            </select>
            <select
                value={selectedEvolve}
                onChange={(e) => setSelectedEvolve(e.target.value)} >
                <option value="">
                    --Stade final--
                </option>

                {Array.from({ length: 2 }, (_, n) => n + 1).map(evolve => (
                    <option
                        key={evolve}
                        value={evolve}
                    >
                        {evolve === 1 ? "Oui" : "Non"}
                    </option>
                ))}
            </select>
            <button onClick={handleSearch}>
                Rechercher
            </button>
            <details>
                <summary>
                    {"Nombre total: " + pokemonList.length}
                </summary>
                <ul>
                    {pokemonList.map((pokemon) => (
                        <li key={pokemon}>
                            {pokemon}
                        </li>
                    ))}
                </ul>
            </details>
        </div>
    );
}