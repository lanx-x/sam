import { CustomerStory } from "@/components/CustomerStory";
import { HeroCap } from "./_components/HeroCap";
import { IQC } from "./_components/IQC";
import { PTech } from "./_components/PTech";
import { Ship } from "./_components/Ship";
import { Surface } from "./_components/Surface";
import { Industry } from "./_components/Industry";
import { Tolerance } from "./_components/Tolerance";
import { Equipment } from "@/components/Equipment";
import { FAQ } from "@/components/FAQ";
import { Resource } from "./_components/Resource";
import { Spe } from "../../_components/Spe";

export default function CapPage() {
  return (
    <div>
      <HeroCap />
      <PTech />
      <IQC />
      <Ship />
      <Spe />
      <Surface />
      <CustomerStory />
      <Industry />
      <Tolerance />
      <Equipment />
      <FAQ />
      <Resource />
    </div>
  )
}
