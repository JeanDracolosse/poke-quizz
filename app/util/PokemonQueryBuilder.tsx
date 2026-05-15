class PokemonQueryBuilder {
    where: {
        pokemonabilities?: {
            ability?: {
                id: {
                    _eq: number;
                };
            };
        };
        pokemontypes?: {
            type?: {
                id: {
                    _eq: number;
                };
            };
        };
        pokemonmoves?: {
            move?: {
                id:
                {
                    _eq: number;

                };
            };
        };
        pokemonspecy?: any;
        pokemonforms: {
            pokemonformgenerations?: {
                generation_id?: {
                    _eq: number;
                };
            };
            is_battle_only: {
                _eq: boolean;
            };
        };
    };
    fields: string;

    generation?: number;
    evolves?: boolean;
    evolutionStage?: number;

    constructor() {
        this.where = {
            pokemonforms: {
                is_battle_only: {
                    _eq: false,
                },
            },
        };

        this.fields = `
        id
        pokemonforms {
          pokemonformgenerations {
            generation_id
          }
          pokemonformnames {
            language_id
            pokemon_name
          }
        }
        pokemonspecy {
          id
          evolutionchain {
          pokemonspecies {
            id
            evolves_from_species_id
          }
          }
          pokemonspeciesnames {
            language_id
            name
          }
        }
    `;
    }

    withGeneration(generationId: number) {
        this.where.pokemonforms.pokemonformgenerations = {
            generation_id: {
                _eq: generationId,
            },
        };

        this.generation = generationId

        return this;
    }

    withType(typeId: number) {
        this.where.pokemontypes = {
            type: {
                id: {
                    _eq: typeId,
                },
            },
        };

        return this;
    }

    withAbility(abilityId: number) {
        this.where.pokemonabilities = {
            ability: {
                id: {
                    _eq: abilityId,
                },
            },
        };

        return this;
    }

    withMove(moveId: number) {
        this.where.pokemonmoves = {
            move: {
                id: {
                    _eq: moveId,
                },
            },
        };

        return this;
    }

    withShape(shapeId: number) {
        this.ensureSpecy();

        this.where.pokemonspecy.pokemonshape = {
            id: {
                _eq: shapeId,
            },
        };

        return this;
    }

    withEggGroup(groupId: number) {
        this.ensureSpecy();

        this.where.pokemonspecy.pokemonegggroups = {
            egggroup: {
                id: {
                    _eq: groupId,
                },
            },
        };

        return this;
    }

    withHabitat(habitatId: number) {
        this.ensureSpecy();

        this.where.pokemonspecy.pokemonhabitat = {
            id: {
                _eq: habitatId,
            },
        };

        return this;
    }

    withColor(colorId: number) {
        this.ensureSpecy();

        this.where.pokemonspecy.pokemoncolor = {
            id: {
                _eq: colorId,
            },
        };

        return this;
    }

    withBaby(baby: boolean) {
        this.ensureSpecy();

        this.where.pokemonspecy.is_baby = {
            _eq: baby,
        };

        return this;
    }

    withLegendary(legendary: boolean) {
        this.ensureSpecy();

        this.where.pokemonspecy.is_legendary = {
            _eq: legendary,
        };

        return this;
    }

    withMythical(mythical: boolean) {
        this.ensureSpecy();

        this.where.pokemonspecy.is_mythical = {
            _eq: mythical,
        };

        return this;
    }

    withEvolve(evolve: boolean) {
        this.evolves = evolve
        return this;

    }

    withEvolutionStage(evolutionStage: number) {
        this.evolutionStage = evolutionStage
        return this;
    }


    ensureSpecy() {
        if (!this.where.pokemonspecy) {
            this.where.pokemonspecy = {};
        }
    }

    buildWhere(obj: any): string {
        if (typeof obj !== "object" || obj === null) {
            return JSON.stringify(obj);
        }

        if (Array.isArray(obj)) {
            return `[${obj.map((v) => this.buildWhere(v)).join(", ")}]`;
        }

        return `{ ${Object.entries(obj)
            .map(([key, value]) => `${key}: ${this.buildWhere(value)}`)
            .join(", ")} }`;
    }

    build() {
        const whereString = this.buildWhere(this.where);

        return `
      query {
        pokemon(
          where: ${whereString}
        ) {
          ${this.fields}
        }
      }
    `;
    }

    formatReponse(data: any, languageId: number) {
        const pokemonList = data.data.pokemon

        var resultPokemonList = pokemonList.map((pokemon: { id: any; pokemonforms: { pokemonformnames: any[]; }[]; pokemonspecy: { pokemonspeciesnames: any[]; }; }) => {
            const id = pokemon.id
            var name
            if (pokemon.pokemonforms[0].pokemonformnames.length > 0) {
                name = pokemon.pokemonforms[0].pokemonformnames
                    .find(pokemonform => pokemonform.language_id === languageId)
                    .pokemon_name
            } else {
                name = pokemon.pokemonspecy.pokemonspeciesnames
                    .find(pokemonspecy => pokemonspecy.language_id === languageId)
                    .name
            }
            return { id, name }
        })

        if (this.generation) {
            const generationPokemonIdList = pokemonList.filter(
                (pokemon: { pokemonforms: { pokemonformgenerations: any[]; }[]; }) =>
                    Math.min(
                        ...pokemon.pokemonforms[0].pokemonformgenerations.map((generation: { generation_id: any; }) => generation.generation_id)
                    ) === this.generation
            ).map((pokemon: { id: any; }) => pokemon.id)
            resultPokemonList = resultPokemonList.filter((pokemon: { id: any; }) => generationPokemonIdList.includes(pokemon.id))
        }

        if (this.evolves !== undefined) {
            const evolvesPokemonList = pokemonList.filter(
                (pokemon: { pokemonspecy: { evolutionchain: { pokemonspecies: any[]; }; id: any; }; }) => {
                    if (this.evolves) {
                        return pokemon.pokemonspecy.evolutionchain.pokemonspecies.some(
                            pokemonSpecy =>
                                pokemonSpecy.evolves_from_species_id === pokemon.pokemonspecy.id)
                    } else {
                        return pokemon.pokemonspecy.evolutionchain.pokemonspecies.every(
                            pokemonSpecy =>
                                pokemonSpecy.evolves_from_species_id !== pokemon.pokemonspecy.id)
                    }
                }).map((pokemon: { id: any; }) => pokemon.id)
            resultPokemonList = resultPokemonList.filter((pokemon: { id: any; }) => evolvesPokemonList.includes(pokemon.id))
        }

        if (this.evolutionStage !== undefined) {
            const evolvesPokemonList = pokemonList.map(
                (pokemon: { pokemonspecy: { evolutionchain: { pokemonspecies: any[]; }; id: any; }; }) => {
                    const pokemonId = pokemon.pokemonspecy.id
                    const pokemonspecies = pokemon.pokemonspecy.evolutionchain.pokemonspecies

                    var currentPokemonIndexes = pokemonspecies.filter(pokemonChain => pokemonChain.evolves_from_species_id === null)
                        .map((pokemonspecy: { id: any; }) => pokemonspecy.id)
                    var currentStage = 1

                    while (!currentPokemonIndexes.includes(pokemonId)) {
                        currentPokemonIndexes = pokemonspecies
                            .filter(pokemonChain =>
                                currentPokemonIndexes.includes(pokemonChain.evolves_from_species_id))
                            .map((pokemonspecy: { id: any; }) => pokemonspecy.id)
                        currentStage++
                    }
                    return { id: pokemonId, evolutionStage: currentStage }
                })
                .filter((pokemon: { evolutionStage: number | undefined; }) => pokemon.evolutionStage === this.evolutionStage)
                .map((pokemon: { id: any; }) => pokemon.id)
            resultPokemonList = resultPokemonList.filter((pokemon: { id: any; }) => evolvesPokemonList.includes(pokemon.id))
        }



        return resultPokemonList.map((pokemon: { name: any; }) => pokemon.name)
    }
}

export default PokemonQueryBuilder;