import { CommonSection } from "cms-types";
import { getMaterial, getMaterialCategory } from "@/api";
import { MaterialClientList } from "./MaterialClientList";

export async function MaterialList({ section }: { section: CommonSection }) {
  const categories = await getMaterialCategory({})
  const data = await getMaterial({})

  return <MaterialClientList categories={categories} materials={data} />
}
