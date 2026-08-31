import { createLocalizedApi } from "@/api";
import type { Equipment } from "cms-types";
import PDFDocument from "pdfkit";

export const runtime = "nodejs";

const columns = [
  { label: "No.", width: 38, value: (_equipment: Equipment, index: number) => String(index + 1) },
  { label: "Type", width: 150, value: (equipment: Equipment) => equipment.name ?? "-" },
  { label: "Brand", width: 110, value: (equipment: Equipment) => equipment.brand ?? "-" },
  { label: "Specification", width: 250, value: (equipment: Equipment) => equipment.specification ?? "-" },
  { label: "Model", width: 130, value: (equipment: Equipment) => equipment.model ?? "-" },
  { label: "QTY.", width: 64, value: (equipment: Equipment) => getQuantity(equipment) },
];

function getQuantity(equipment: Equipment) {
  const quantity = equipment.parameter?.find((item) => {
    const key = item.key?.toLowerCase().replaceAll(".", "");
    return key === "qty" || key === "quantity";
  });

  return quantity?.value ?? equipment.parameter?.[0]?.value ?? "-";
}

async function getAllEquipment(locale: string) {
  const api = createLocalizedApi(locale);
  const firstPage = await api.getEquipment({});
  const pageCount = firstPage.meta.pagination?.pageCount ?? 1;

  if (pageCount <= 1) return firstPage.data ?? [];

  const remainingPages = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) => api.getEquipment({ "pagination[page]": index + 2 })),
  );

  return [
    ...(firstPage.data ?? []),
    ...remainingPages.flatMap((page) => page.data ?? []),
  ];
}

function createEquipmentPdf(equipments: Equipment[]) {
  return new Promise<Buffer>((resolve, reject) => {
    const document = new PDFDocument({
      autoFirstPage: false,
      layout: "landscape",
      margin: 36,
      size: "A4",
      info: { Title: "Equipment List" },
    });
    const chunks: Buffer[] = [];
    const rowHeight = 42;
    const left = 36;
    const pageBottom = 559;
    let rowY = 0;

    const drawTableHeader = () => {
      document.font("Helvetica-Bold").fontSize(9).fillColor("#525252");
      let x = left;

      for (const column of columns) {
        document.rect(x, rowY, column.width, 30).fillAndStroke("#F5F5F5", "#BFBFBF");
        document.fillColor("#525252").text(column.label, x + 6, rowY + 10, { width: column.width - 12, align: "center" });
        x += column.width;
      }

      rowY += 30;
    };

    const startPage = () => {
      document.addPage();
      document.font("Helvetica-Bold").fontSize(18).fillColor("#181818").text("Equipment List", left, 36);
      rowY = 72;
      drawTableHeader();
    };

    document.on("data", (chunk: Buffer) => chunks.push(chunk));
    document.on("end", () => resolve(Buffer.concat(chunks)));
    document.on("error", reject);

    startPage();
    document.font("Helvetica").fontSize(9);

    for (const [index, equipment] of equipments.entries()) {
      if (rowY + rowHeight > pageBottom) startPage();

      let x = left;
      for (const column of columns) {
        document.rect(x, rowY, column.width, rowHeight).stroke("#BFBFBF");
        document
          .font("Helvetica")
          .fontSize(9)
          .fillColor("#181818")
          .text(column.value(equipment, index), x + 6, rowY + 14, {
            ellipsis: true,
            height: rowHeight - 12,
            width: column.width - 12,
          });
        x += column.width;
      }
      rowY += rowHeight;
    }

    document.end();
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";
  const equipments = await getAllEquipment(locale);
  const pdf = await createEquipmentPdf(equipments);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Disposition": 'attachment; filename="equipment-list.pdf"',
      "Content-Type": "application/pdf",
    },
  });
}
