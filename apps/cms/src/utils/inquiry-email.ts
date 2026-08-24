import type { Core } from "@strapi/strapi";
import {
  NEXT_PUBLIC_SITE_URL,
  STRAPI_ADMIN_URL,
} from "./env";

type KeyValueItem = {
  key?: string | null;
  value?: string | null;
};

type UploadedFile = {
  name?: string | null;
  url?: string | null;
};

type InquiryRecord = {
  id: number;
  documentId?: string | null;
  name?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  createdAt?: string | null;
  relevant_drawings?: UploadedFile | null;
};

type SiteRecord = {
  name?: string | null;
  email?: KeyValueItem[] | null;
};

function getInquiryAdminUrl(inquiry: InquiryRecord): string | null {
  return `${STRAPI_ADMIN_URL}/content-manager/collection-types/api::inquiry.inquiry/${inquiry.documentId || inquiry.id}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeEmail(value: string): string | null {
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : null;
}

function getAbsoluteFileUrl(url?: string | null): string | null {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;

  if (NEXT_PUBLIC_SITE_URL) {
    try {
      return new URL(`/proxy-via-next${url.startsWith("/") ? url : `/${url}`}`, NEXT_PUBLIC_SITE_URL).toString();
    } catch {
      // Fall through to Strapi-origin based URLs.
    }
  }
}

function buildInquiryText(
  inquiry: InquiryRecord,
  attachmentUrl: string | null,
  adminUrl: string | null
): string {
  return [
    "A new inquiry has been submitted.",
    "",
    `Name: ${inquiry.name || "-"}`,
    `Email: ${inquiry.email || "-"}`,
    `Company: ${inquiry.company || "-"}`,
    `Phone: ${inquiry.phone || "-"}`,
    `Created At: ${inquiry.createdAt || "-"}`,
    "",
    "Message:",
    inquiry.message || "-",
    "",
    `Attachment: ${attachmentUrl || inquiry.relevant_drawings?.url || inquiry.relevant_drawings?.name || "-"}`,
    `Admin URL: ${adminUrl || "-"}`,
    `Inquiry ID: ${inquiry.documentId || inquiry.id}`,
  ].join("\n");
}

function buildInquiryHtml(
  inquiry: InquiryRecord,
  attachmentUrl: string | null,
  adminUrl: string | null
): string {
  const rows: Array<[string, string]> = [
    ["Name", inquiry.name || "-"],
    ["Email", inquiry.email || "-"],
    ["Company", inquiry.company || "-"],
    ["Phone", inquiry.phone || "-"],
    ["Created At", inquiry.createdAt || "-"],
    ["Inquiry ID", inquiry.documentId || String(inquiry.id)],
  ];

  const attachmentHtml = attachmentUrl
    ? `<a href="${escapeHtml(attachmentUrl)}">${escapeHtml(inquiry.relevant_drawings?.name || attachmentUrl)}</a>`
    : escapeHtml(inquiry.relevant_drawings?.url || inquiry.relevant_drawings?.name || "-");
  const adminHtml = adminUrl
    ? `<a href="${escapeHtml(adminUrl)}">${escapeHtml(adminUrl)}</a>`
    : "-";

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222;">
      <h2 style="margin:0 0 16px;">A new inquiry has been submitted</h2>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">
        <tbody>
          ${rows
      .map(
        ([label, value]) => `
                <tr>
                  <th style="text-align:left;padding:8px 12px;border:1px solid #ddd;background:#f7f7f7;width:160px;">${escapeHtml(label)}</th>
                  <td style="padding:8px 12px;border:1px solid #ddd;">${escapeHtml(value)}</td>
                </tr>
              `,
      )
      .join("")}
          <tr>
            <th style="text-align:left;padding:8px 12px;border:1px solid #ddd;background:#f7f7f7;">Attachment</th>
            <td style="padding:8px 12px;border:1px solid #ddd;">${attachmentHtml}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:8px 12px;border:1px solid #ddd;background:#f7f7f7;">Admin URL</th>
            <td style="padding:8px 12px;border:1px solid #ddd;">${adminHtml}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:8px 12px;border:1px solid #ddd;background:#f7f7f7;vertical-align:top;">Message</th>
            <td style="padding:8px 12px;border:1px solid #ddd;white-space:pre-wrap;">${escapeHtml(inquiry.message || "-")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `.trim();
}

async function getRecipients(strapi: Core.Strapi): Promise<string[]> {
  const sites = (await strapi.db.query("api::site.site").findMany({
    where: {
      publishedAt: {
        $notNull: true,
      },
    },
    populate: {
      email: true,
    },
  })) as SiteRecord[];

  const recipientMap = new Map<string, string>();

  for (const site of sites) {
    for (const item of site.email ?? []) {
      if (!item?.value) continue;
      const email = normalizeEmail(item.value);
      if (!email) continue;
      recipientMap.set(email.toLowerCase(), email);
    }
  }

  return Array.from(recipientMap.values());
}

async function getInquiry(strapi: Core.Strapi, id: number): Promise<InquiryRecord | null> {
  return (await strapi.db.query("api::inquiry.inquiry").findOne({
    where: { id },
    populate: {
      relevant_drawings: true,
    },
  })) as InquiryRecord | null;
}

export async function sendInquiryNotification(strapi: Core.Strapi, inquiryId: number): Promise<void> {
  const recipients = await getRecipients(strapi);
  if (recipients.length === 0) {
    strapi.log.warn("[inquiry-email] No recipients found in site.email; skipped inquiry notification.");
    return;
  }

  const inquiry = await getInquiry(strapi, inquiryId);
  if (!inquiry) {
    strapi.log.warn(`[inquiry-email] Inquiry ${inquiryId} was not found; skipped inquiry notification.`);
    return;
  }

  const attachmentUrl = getAbsoluteFileUrl(inquiry.relevant_drawings?.url);
  const adminUrl = getInquiryAdminUrl(inquiry);
  const text = buildInquiryText(inquiry, attachmentUrl, adminUrl);
  const html = buildInquiryHtml(inquiry, attachmentUrl, adminUrl);
  const subjectParts = ["New Inquiry", inquiry.name, inquiry.company].filter(Boolean);

  await strapi.plugin("email").service("email").send({
    to: recipients,
    replyTo: inquiry.email || undefined,
    subject: subjectParts.join(" - "),
    text,
    html,
  });
}
