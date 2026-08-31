import { CmpProps } from "@/app/[locale]/[[...slug]]/page";
import { getEquipment } from "@/api";
import { mergeDisplayText, mergeExtension } from "@/utils";
import type { Equipment } from "cms-types";

const getQuantity = (equipment: Equipment) => {
  const quantity = equipment.parameter?.find((item) => {
    const key = item.key?.toLowerCase().replaceAll(".", "");
    return key === "qty" || key === "quantity";
  });

  return quantity?.value ?? equipment.parameter?.[0]?.value ?? "-";
};

export async function FeaturedEquipment({ section, locale }: CmpProps) {
  const configuredEquipments =
    (section.payload?.dynamic?.[0] as { equipment?: Equipment[] } | undefined)?.equipment ?? [];
  const equipments = configuredEquipments.length > 0 ? configuredEquipments : (await getEquipment({})).data ?? [];
  const displayText = mergeDisplayText(section);
  const extension = mergeExtension(section)
  const variant = extension.variant?.value ?? 't0'

  const headers = [
    displayText.no ?? "No.",
    displayText.type ?? "Type",
    displayText.brand ?? "Brand",
    displayText.specification ?? "Specification",
    displayText.model ?? "Model",
    displayText.qty ?? "QTY.",
  ];

  return (
    <div className={`py-15 px-5 xl:px-0 ${variant === 't1' ? 'bg-white xl:py-10 xl:pb-35' : 'bg-[#fafafa] xl:py-25'} `}>
      <div className="xl:w-7xl xl:mx-auto">
        {variant === 't0' && <h2 className="text-5xl font-semibold text-center">{section.payload?.title}</h2>}
        {variant === 't1' && <div>
          <a
            className="block mx-auto w-fit px-5.5 h-10 content-center border border-accent text-accent text-sm rounded-sm"
            href={`/api/equipment/download?locale=${encodeURIComponent(locale)}`}
          >
            {displayText.download_pdf ?? "DownLoad the PDF"}
          </a>
        </div>}
        <div className="mt-15 xl:hidden">
          {equipments.map((equipment, index) => (
            <dl key={equipment.documentId ?? index} className="mx-auto w-full border-t border-[#bfbfbf] py-3 last:border-b">
              {[
                [headers[1], equipment.name],
                [headers[2], equipment.brand ?? "-"],
                [headers[3], equipment.specification ?? "-"],
                [headers[4], equipment.model ?? "-"],
                [headers[5], getQuantity(equipment)],
              ].map(([label, value]) => (
                <div key={label} className="grid h-8 grid-cols-[110px_minmax(0,1fr)] items-center text-base font-medium leading-6">
                  <dt className="text-secondary">{label}</dt>
                  <dd className="m-0 truncate text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          ))}
        </div>

        <div className="hidden xl:block mt-15">
          <table className="w-full table-fixed  text-left">
            <colgroup>
              <col className="w-16" />
              <col className="w-50" />
              <col className="w-50" />
              <col className="w-105" />
              <col className="w-60" />
              <col className="w-25" />
            </colgroup>
            <thead>
              <tr className="h-9 text-base font-medium text-secondary">
                {headers.map((header, index) => (
                  <th
                    key={header}
                    scope="col"
                    className={`font-medium ${index === 0 || index === headers.length - 1 ? "text-center" : index === 1 ? "pl-10" : "pl-14"}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-base font-medium text-primary">
              {equipments.map((equipment, index) => (
                <tr key={equipment.documentId ?? index}>
                  <td className="h-16 border border-[#bfbfbf] text-center">{index + 1}</td>
                  <td className="h-16 border border-l-0 border-[#bfbfbf] pl-10">{equipment.name}</td>
                  <td className="h-16 border border-l-0 border-[#bfbfbf] pl-14">{equipment.brand ?? "-"}</td>
                  <td className="h-16 border border-l-0 border-[#bfbfbf] pl-14">{equipment.specification ?? "-"}</td>
                  <td className="h-16 border border-l-0 border-[#bfbfbf] pl-14">{equipment.model ?? "-"}</td>
                  <td className="h-16 border border-l-0 border-[#bfbfbf] text-center">{getQuantity(equipment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
