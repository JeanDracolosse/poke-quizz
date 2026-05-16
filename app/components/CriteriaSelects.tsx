"use client";

import { useState } from "react";
import PokemonQueryBuilder from "../util/PokemonQueryBuilder";
import { CHUNK_SIZE, GRAPHQL_URL, LANG_ID } from "../Constants";
import { Select, Table, Button, Spoiler } from '@mantine/core';


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
    const [expanded, setExpanded] = useState(false);

    const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);
    const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedMove, setSelectedMove] = useState<string | null>(null);
    const [selectedShape, setSelectedShape] = useState<string | null>(null);
    const [selectedEggGroup, setSelectedEggGroup] = useState<string | null>(null);
    const [selectedHabitat, setSelectedHabitat] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedEvolutionStage, setSelectedEvolutionStage] = useState<string | null>(null);
    const [selectedBaby, setSelectedBaby] = useState<string | null>(null);
    const [selectedLegendary, setSelectedLegendary] = useState<string | null>(null);
    const [selectedMythical, setSelectedMythical] = useState<string | null>(null);
    const [selectedEvolve, setSelectedEvolve] = useState<string | null>(null);

    const [pokemonList, setPokemonList] = useState<[string][]>([]);

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
            graphqlQueryBuilder = graphqlQueryBuilder.withEvolve(selectedEvolve !== "1")
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

        const pokemonFullList = graphqlQueryBuilder.formatReponse(posts, LANG_ID)
        const columns = [];
        for (let i = 0; i < pokemonFullList.length; i += CHUNK_SIZE) {
            columns.push(pokemonFullList.slice(i, i + CHUNK_SIZE));
        }
        setPokemonList(columns)
    }

    return (
        <div>
            <Select
                label="Génération"
                placeholder="Sélectionner une valeur"
                data={Array.from({ length: 9 }, (_, n) => n + 1).map(generation => ({
                    value: generation.toString(),
                    label: generation.toString()
                }))}
                value={selectedGeneration}
                onChange={setSelectedGeneration}
                allowDeselect
            />
            <Select
                label="Talent"
                placeholder="Sélectionner une valeur"
                data={abilities.map(a => ({
                    value: a.id,
                    label: a.name
                }))}
                value={selectedAbility}
                onChange={setSelectedAbility}
                allowDeselect
            />
            <Select
                label="Type"
                placeholder="Sélectionner une valeur"
                data={types.map(a => ({
                    value: a.id,
                    label: a.name
                }))}
                value={selectedType}
                onChange={setSelectedType}
                allowDeselect
            />
            <Select
                label="Attaque"
                placeholder="Sélectionner une valeur"
                data={moves.map(a => ({
                    value: a.id,
                    label: a.name
                }))}
                value={selectedMove}
                onChange={setSelectedMove}
                allowDeselect
            />
            <Select
                label="Forme"
                placeholder="Sélectionner une valeur"
                data={shapes.map(a => ({
                    value: a.id,
                    label: a.name
                }))}
                value={selectedShape}
                onChange={setSelectedShape}
                allowDeselect
            />
            <Select
                label="Groupe d'oeuf"
                placeholder="Sélectionner une valeur"
                data={eggGroups.map(a => ({
                    value: a.id,
                    label: a.name
                }))}
                value={selectedEggGroup}
                onChange={setSelectedEggGroup}
                allowDeselect
            />
            <Select
                label="Habitat"
                placeholder="Sélectionner une valeur"
                data={habitats.map(a => ({
                    value: a.id,
                    label: a.name
                }))}
                value={selectedHabitat}
                onChange={setSelectedHabitat}
                allowDeselect
            />
            <Select
                label="Couleur"
                placeholder="Sélectionner une valeur"
                data={colors.map(a => ({
                    value: a.id,
                    label: a.name
                }))}
                value={selectedColor}
                onChange={setSelectedColor}
                allowDeselect
            />
            <Select
                label="Stade d'évolution"
                placeholder="Sélectionner une valeur"
                data={Array.from({ length: 3 }, (_, n) => n + 1).map(evolutionStage => ({
                    value: evolutionStage.toString(),
                    label: evolutionStage.toString()
                }))}
                value={selectedEvolutionStage}
                onChange={setSelectedEvolutionStage}
                allowDeselect
            />
            <Select
                label="Bébé"
                placeholder="Sélectionner une valeur"
                data={Array.from({ length: 2 }, (_, n) => n + 1).map(baby => ({
                    value: baby.toString(),
                    label: baby === 1 ? "Oui" : "Non"
                }))}
                value={selectedBaby}
                onChange={setSelectedBaby}
                allowDeselect
            />
            <Select
                label="Fabuleux"
                placeholder="Sélectionner une valeur"
                data={Array.from({ length: 2 }, (_, n) => n + 1).map(mythical => ({
                    value: mythical.toString(),
                    label: mythical === 1 ? "Oui" : "Non"
                }))}
                value={selectedMythical}
                onChange={setSelectedMythical}
                allowDeselect
            />
            <Select
                label="Légendaire"
                placeholder="Sélectionner une valeur"
                data={Array.from({ length: 2 }, (_, n) => n + 1).map(legendary => ({
                    value: legendary.toString(),
                    label: legendary === 1 ? "Oui" : "Non"
                }))}
                value={selectedLegendary}
                onChange={setSelectedLegendary}
                allowDeselect
            />
            <Select
                label="Stade final"
                placeholder="Sélectionner une valeur"
                data={Array.from({ length: 2 }, (_, n) => n + 1).map(evolve => ({
                    value: evolve.toString(),
                    label: evolve === 1 ? "Oui" : "Non"
                }))}
                value={selectedEvolve}
                onChange={setSelectedEvolve}
                allowDeselect
            />
            <Button onClick={handleSearch}>
                C'est parti !
            </Button>
            {"Nombre total: " + pokemonList.reduce((acc, row) => acc + row.length, 0)}
            <Spoiler
                maxHeight={0}
                showLabel="Dévoiler la liste"
                hideLabel="Cacher la liste"
                expanded={expanded}
                onExpandedChange={setExpanded}>
                <div>
                    <Table>
                        <Table.Tbody>
                            {pokemonList.map((pokemon, i) => (
                                <Table.Tr key={i}>
                                    {pokemon.map((cell, j) => (
                                        <Table.Td key={j}>{cell}</Table.Td>
                                    ))}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </div>
            </Spoiler >
        </div>
    );
}