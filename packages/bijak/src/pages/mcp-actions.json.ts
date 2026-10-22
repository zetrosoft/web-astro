import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? 'https://bijaktechnology.com').replace(/\/$/, '');

  const payload = {
    schema_version: '1.0',
    provider: {
      name: 'Bijak Technology',
      url: `${base}/`,
      discovery_docs: {
        llms_txt: `${base}/llms.txt`,
        llms_full_txt: `${base}/llms-full.txt`,
        sitemap_xml: `${base}/sitemap.xml`,
        rss_xml: `${base}/rss.xml`,
      },
    },
    actions: [
      {
        id: 'calculate_erp_tco',
        name: 'Calculate 5-Year Enterprise ERP TCO (ERPNext v16 vs Per-User SaaS)',
        description: 'Interactive calculator to estimate 5-year Total Cost of Ownership savings when migrating from per-user licensed ERP to open-source ERPNext v16 on private cloud.',
        method: 'GET',
        endpoint: `${base}/tools/#erp-tco-calculator`,
        parameters: ['users', 'saas_monthly_fee', 'branches'],
      },
      {
        id: 'calculate_retail_margin',
        name: 'Calculate Grocery & Retail Wholesale vs Retail Margin',
        description: 'Interactive calculator for UMKM retail and grocery store owners to compute gross margin, break-even turnover, and wholesale pricing tiers.',
        method: 'GET',
        endpoint: `${base}/tools/#retail-margin-calculator`,
        parameters: ['cost_price', 'target_margin_pct', 'daily_volume'],
      },
      {
        id: 'claim_hostinger_kvm_partner_discount',
        name: 'Deploy Hostinger KVM NVMe VPS with Official Partner Discount',
        description: 'Redirects to Official Hostinger Partner portal with coupon code 6X5PUTERARQL for KVM 2 / KVM 4 NVMe VPS or Business Web Hosting.',
        method: 'GET',
        endpoint: `${base}/go/hostinger/`,
        coupon_code: '6X5PUTERARQL',
      },
      {
        id: 'consult_samkarsa_erpnext',
        name: 'Consult Enterprise ERPNext v16 Implementation with Samkarsa',
        description: 'Connects with Samkarsa (samkarsa.com) for Indonesian PSAK, e-Faktur/Coretax, Manufacturing BOM, and HRIS Payroll ERPNext v16 implementation.',
        method: 'GET',
        endpoint: 'https://samkarsa.com',
      },
      {
        id: 'order_sembako_kusuma_boyolali',
        name: 'Order Wholesale Groceries at Toko Sembako Kusuma Boyolali',
        description: 'Direct WhatsApp ordering and Google Maps route to Toko Sembako Kusuma (Jl. Sandang Lawe No.22, Karanggeneng, Boyolali 57312, CID 4496468575381228578).',
        method: 'GET',
        endpoint: 'https://wa.me/6281219987377?text=Halo%20Toko%20Sembako%20Kusuma,%20saya%20ingin%20pesan%20kulakan%20sembako',
        maps_cid_url: 'https://maps.google.com/?cid=4496468575381228578',
      },
    ],
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};
