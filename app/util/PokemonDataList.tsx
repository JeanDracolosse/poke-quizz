export async function getAbilities(graphqlUrl: string, languageId: number) {
  const query = `
    query abilities($languageId: Int!) {
      abilityname(where: { language_id: { _eq: $languageId } }) {
        name
        id
      }
    }
  `;

  return (await executeRequestWithParam(graphqlUrl, query, languageId)).abilityname;
}

export async function getTypes(graphqlUrl: string, languageId: number) {
  const query = `
    query types($languageId: Int!) {
      typename(where: { language_id: { _eq: $languageId } }) {
        name
        id
      }
    }
  `;

  return (await executeRequestWithParam(graphqlUrl, query, languageId)).typename;
}

export async function getMoves(graphqlUrl: string, languageId: number) {
  const query = `
    query moves($languageId: Int!) {
      movename(where: { language_id: { _eq: $languageId } }) {
        name
        id
      }
    }
  `;

  return (await executeRequestWithParam(graphqlUrl, query, languageId)).movename;
}

export async function getShapes(graphqlUrl: string, languageId: number) {
  const query = `
    query shapes($languageId: Int!) {
      pokemonshapename(where: { language_id: { _eq: $languageId } }) {
        name
        id
      }
    }
  `;

  return (await executeRequestWithParam(graphqlUrl, query, languageId)).pokemonshapename;
}

export async function getEggGroups(graphqlUrl: string, languageId: number) {
  const query = `
    query egggroups($languageId: Int!) {
      egggroupname(where: { language_id: { _eq: $languageId } }) {
        name
        id
      }
    }
  `;

  return (await executeRequestWithParam(graphqlUrl, query, languageId)).egggroupname;
}

export async function getHabitats(graphqlUrl: string, languageId: number) {
  const query = `
    query habitats($languageId: Int!) {
      pokemonhabitatname(where: { language_id: { _eq: $languageId } }) {
        name
        id
      }
    }
  `;

  return (await executeRequestWithParam(graphqlUrl, query, languageId)).pokemonhabitatname;
}

export async function getColors(graphqlUrl: string, languageId: number) {
  const query = `
    query colors($languageId: Int!) {
      pokemoncolorname(where: { language_id: { _eq: $languageId } }) {
        name
        id
      }
    }
  `;

  return (await executeRequestWithParam(graphqlUrl, query, languageId)).pokemoncolorname;
}

async function executeRequestWithParam(graphqlUrl: string, query: string, languageId: number) {
  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        languageId,
      },
    }),
  });

  const json = await response.json();
  return json.data;
}
