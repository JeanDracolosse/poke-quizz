import fs from "fs";
import path from "path";
import Papa from "papaparse";


export function getAbilities(language_id: number) {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "ability_names.csv"), "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data
    .filter(row => row.local_language_id === language_id.toString())
    .map(row => ({
      id: row.ability_id,
      name: row.name
    }));
}

export function getEggGroups(language_id: number) {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "egg_group_prose.csv"), "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data
    .filter(row => row.local_language_id === language_id.toString())
    .map(row => ({
      id: row.egg_group_id,
      name: row.name
    }));
}


export function getMoves(language_id: number) {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "move_names.csv"), "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data
    .filter(row => row.local_language_id === language_id.toString())
    .map(row => ({
      id: row.move_id,
      name: row.name
    }));
}

export function getColors(language_id: number) {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "pokemon_color_names.csv"), "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data
    .filter(row => row.local_language_id === language_id.toString())
    .map(row => ({
      id: row.pokemon_color_id,
      name: row.name
    }));
}

export function getHabitats(language_id: number) {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "pokemon_habitat_names.csv"), "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data
    .filter(row => row.local_language_id === language_id.toString())
    .map(row => ({
      id: row.pokemon_habitat_id,
      name: row.name
    }));
}

export function getTypes(language_id: number) {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "type_names.csv"), "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data
    .filter(row => row.local_language_id === language_id.toString())
    .map(row => ({
      id: row.type_id,
      name: row.name
    }));
}

export function getShapes(language_id: number) {
  const file = fs.readFileSync(path.join(process.cwd(), "data", "pokemon_shape_prose.csv"), "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true
  });

  return parsed.data
    .filter(row => row.local_language_id === language_id.toString())
    .map(row => ({
      id: row.pokemon_shape_id,
      name: row.name
    }));
}