import { Project, ProductItem, TemplateVariable, AIAssetItem, SyncConnection, ExportHistoryItem } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Catálogo Relojes Lujo - Extraído de IDML',
    status: 'Syncing',
    lastUpdate: '2 minutes ago',
    productsCount: 1240,
    pagesCount: 84,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADYO0IX_gSckId8UdgwtFgRQ84cE-nG7nmtc9a5bQWsC8k5GgJJUFhgvZ488d3hczBboUdddBCgfw_oDupuSG33_YcKg5QqLBQCfb0uz2GGZQLJSiZrZCwcF11ix3_3fdwTWQY-YCriNs4zK7il_NRy9aJQx2EqGqlYsLoHYWhd0LbELjlGyZZNnvbnQxGeqiVxXG_AyNTkGexjBK43fY7prVHIfco1RVO8rVFv1bRkyjfne9tgoYONK1F59vVISII9gB0V0w3UAN7',
    dataSources: ['API Shopify', 'ERP-X1', 'Precios_Proveedores.xlsx'],
    templates: { name: 'Luxe Grid v2.4', tag: 'Core' },
    aiAssets: [
      { code: 'OR', label: 'Object Recognition', bg: 'bg-red-600 text-white' },
      { code: 'SC', label: 'Semantic Copy', bg: 'bg-slate-700 text-white' },
      { code: 'NL', label: 'Neural Lighting', bg: 'bg-amber-600 text-white' },
    ]
  },
  {
    id: 'proj-2',
    name: 'Catálogo Industrial - Procesado desde INDD',
    status: 'Published',
    lastUpdate: 'May 12, 2024',
    productsCount: 42500,
    pagesCount: 1105,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFDZM0y3La0sNWlqtNrye8q7ytHuWpJT0xQi0kJQKdNX74rxabL-2epVUcplTPMOdLOnjDS3fFMDo_2J6yF3cSPNB6fT-aDM_eE2Dlla6mrbz3uFBBoWH51C7tN8gapMj2U4a6yaAqZ62X0rL0Oo6JRiu-nKzN9DJLSBPbopbHg5HxZ7jbuo-LLK6jFWtaz7sKKlKL79f9egJRQxYyxHxqxfU85ceE4Mdolx66u3eEMtCdDg1ndcG48ct4nxOhmEVfarJfXWip7YKn',
    dataSources: ['SQL-Master', 'Inventario_Bodega.xlsx'],
    templates: { name: 'Tech Specs v1.1', tag: 'Custom' },
    aiAssets: [
      { code: 'DG', label: 'Diagram Generation', bg: 'bg-red-700 text-white' },
      { code: 'TT', label: 'Tech Translation', bg: 'bg-blue-800 text-white' },
    ]
  },
  {
    id: 'proj-3',
    name: 'Catálogo Cosmética - IDML Pendiente',
    status: 'Draft',
    lastUpdate: 'Created: 2 days ago',
    productsCount: 0,
    pagesCount: 0,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGbf6lvheS51vHczvmFvWT6MyTV4Kqm56X046IceV7_esivvJo-gsCjL4GNYY1JICCzo4MTJdOBst1P9NtTj9JSXaoaDu1PLwjt6o-nORWUHNfxnT85MacgW6HPKPM3Xw2C--0l0cYhfev5-rJLbCeu45G1yAC1pAjh8ZiBHDn8Y-oUVjRWfMxmg6xUrNaMWIQGvBdSX9KY0qHNVQV40ybvkSb9cklFIaMW_jO7hcd0kyJM7tlHyoTlsNKNEgaxCaRDXkeNicNfq3G',
    dataSources: [],
    templates: { name: 'Beauty Standard v1', tag: 'Draft' },
    aiAssets: []
  }
];

export const initialProducts: ProductItem[] = [
  {
    id: 'product-1',
    sku: 'SW-001-TI',
    name: 'Vanguard Series 5',
    subtitle: 'Titanium / Slate Leather',
    category: 'Wearables',
    brand: 'Vanguard Labs',
    price: 499.00,
    status: 'Active',
    updated: '2h ago',
    catalogsCount: [1, 4, 2],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL9SIoI1ogg4AzLf_GEOYmeXDNLkgZi0_TZgkQSfvMnUXK0AeqRFX9dN8MGbxUvyeHsRde9VZiEydqQbb_2X3SOMk-fBrAn145hfU7y4reDRx6xsFCO7G6BiQdhEsk0gcxh8x6E5pQFFN-F8RRHbM0OW2xB48S1NbSJ9NnoY8BU0HzwNrabk65N_nmHdt4FVECwXESf3STzyvaKdrYceZJi0WFhDzbp4lhaMOPG5Y4YlJq5Gjtqn4YcIfIXdy-M_78IrOahOgTUCkw',
    details: {
      lastManualUpdate: 'Oct 24, 2026',
      wholesalePrice: 350.00,
      leadTime: '2 Weeks',
      affectedCatalogs: [
        { title: 'Catálogo Relojes - IDML Extraído', page: 'Pág 14 • Extraído de INDD', feature: true },
        { title: 'Lista Precios B2B - Sync Excel', page: 'Portal Digital' },
        { title: 'Catálogo Premium - Datos API', page: 'Portada • Sincronizado', feature: true }
      ]
    }
  },
  {
    id: 'product-2',
    sku: 'AUD-99-PRO',
    name: 'SonicMaster Pro Console',
    subtitle: '16-Channel / 48V Phantom',
    category: 'Audio Gear',
    brand: 'AudioTech',
    price: 1250.00,
    status: 'Review',
    updated: 'Yesterday',
    catalogsCount: [2],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp9f9kYCEO3C3XWDBJjj_Nwpu6HkYe9tq1OP8fUZphdLr-Ia-ffVf3g4VdMAcYARg666Oy5FtGJLrGTK01wb43Mv7z8Q0DmXnWRejRKsvqY1srD0a29V_uONkbMqsUtVjYoqgtT-MMOkBCbYVyR_6epsIIgEEz2jyFUzG-vxu_xejoikMxaOA-1_MChoY3LfNVpVL1MZjQQXnHMAkUcPXc6tACDljz9sRJWWB3YDFO_CwSyXpF8TlnBYZUXk6cmVUd5yI-uEq-WqRd',
    details: {
      lastManualUpdate: 'Oct 22, 2026',
      wholesalePrice: 890.00,
      leadTime: '3 Weeks',
      affectedCatalogs: [
        { title: 'Catálogo Audio - Procesado desde INDD', page: 'Pág 42 • Spread Central' }
      ]
    }
  },
  {
    id: 'product-3',
    sku: 'KIT-ES-500',
    name: 'Noir Edition Espresso',
    subtitle: '15-Bar Pump / Matte Finish',
    category: 'Kitchen',
    brand: 'Noir Appliances',
    price: 899.00,
    status: 'Active',
    updated: '3 days ago',
    catalogsCount: [3, 5],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWTMrqhiBNzvFmMfsRzKVNWNR8RGBjqka77DwZ6y-wkL4WRpUbYOrE3HhCPNYqbMafQkGzvnV-dm9pn2gXn66Yk3MZ7IMtyEkXtrcs5LpUDDBaMsUEFiS7Z3pnXXR9PJogTs2Yu26JqFQtE6okNiH8rsNeW--AtSiIKwsh4tWW-JCKDZmTBWPcoF0ee_1TpBdElJMDdirA4pTszRWEPKXHXS4QfXJL9GQ7vNTgaMwaeDaTj6iLRPbFZPwW_1OZIZof3PqeZco_e-bm',
    details: {
      lastManualUpdate: 'Oct 20, 2026',
      wholesalePrice: 620.00,
      leadTime: '1 Week',
      affectedCatalogs: [
        { title: 'Catálogo Hogar - IDML Procesado', page: 'Pág 8 • Sección Principal' }
      ]
    }
  },
  {
    id: 'product-4',
    sku: 'OFF-DSK-02',
    name: 'ErgoFlow Desk Stand',
    subtitle: 'Anodized Aluminum / Adjustable',
    category: 'Office',
    brand: 'ErgoWorks',
    price: 120.00,
    status: 'Out of Stock',
    updated: '1 week ago',
    catalogsCount: [],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjQBx50L_XMMNKpj0-9CIioCNQK6rKLza8-nmj8Zo8UOlzA3aNKVauBKbk7VdfyX6kjNKM57irADmhViP3LFIItGbnN-uWwwuqmSOERx1782lFpqBK_Qh_GnstpY8NBLR6pevfA10gVyqyWjF_LhJ7W_5agN_UV8OBXL8S2-qXxTbbACLaBxFFDpEfzcivx0ukyznhktjLmIVji92rf4KpOAh7IoVBp6C4KGyw5520xVQ6E6oRqEzYqNZTDdO_bjmfoJD85L1nqbLi',
    details: {
      lastManualUpdate: 'Oct 15, 2026',
      wholesalePrice: 75.00,
      leadTime: '4 Weeks',
      affectedCatalogs: []
    }
  }
];

export const initialVariables: TemplateVariable[] = [
  { tag: '{{price}}', sourceSystem: 'SAP_Retail_PIM_v2', fieldMapping: 'master.products.price_net', fallbackValue: 'P.O.A', status: 'Validated' },
  { tag: '{{sku}}', sourceSystem: 'Auto-selecting...', fieldMapping: 'master.catalog.identifier', fallbackValue: '—', status: 'Analyzing' },
  { tag: '{{product_name}}', sourceSystem: 'Shopify_Store_Live', fieldMapping: 'master.products.title_en', fallbackValue: 'Untitled Product', status: 'Validated' },
  { tag: '{{description}}', sourceSystem: 'PIM_Copy_Master', fieldMapping: 'master.products.description_formatted', fallbackValue: 'Details upon request', status: 'Validated' },
];

export const initialAIAssets: AIAssetItem[] = [
  {
    id: 'asset-1',
    title: 'Nexus Frame v2.4',
    version: 'v4',
    category: 'Product Frames',
    format: '4K',
    updated: 'Updated 2h ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE9nCeIhSfpdrh1x1wSMzMfBEQY_pvk711ZAxKasGxwPI0iC-7ziaHwsTIhCvYi4lkSw6OZjf1BSoUAsOfCZHU_tX7QzaUlIuTYrrGuJdUYqY37nb9pxjvcIWkvoEzuxjMhFo2ybYIImTD1DGQNl4PQUWDEjKGLaJjGbsJofr4ETbGWfMHYwAUdeNJHMYVQkdxQALBLr7yndAUGyCf6emdP6LkmIQi2ROHeT_hWbjNZsDz_lq7i0R6ZbzVz_dr_ZNYW33Uxgc6MS2S',
    isAIGenerated: true,
    status: 'Verified'
  },
  {
    id: 'asset-2',
    title: 'Iconography_Set_Final',
    version: 'v12',
    category: 'Icons',
    format: 'SVG',
    updated: 'Updated yesterday',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCG1x7jawrZWLynuVQ_pV5OD3o5Z3OY0xP9jG1z1G8XvACRJIdPYyAGfCCPn4tUKVdhUrHzwFAK81GDn31UhrFp69l3o7H6z1_8w7BFh40OpHSRwDUurk_6CgxJ-DXAcm_yEWvl0RV_OlBQTK6uWyf003zex_1do-RdAdUoEUubrzUDa5ZuJkyDaEBLNL2e3CEjvLts-ARsRjw0_fKJLM78cB2D_pNeL_8OXyddEV0IqdDI3CGBCTG0dYNgX2n1p9FcqA0IaHSOjuX',
    isAIGenerated: true,
    status: 'Verified'
  },
  {
    id: 'asset-3',
    title: 'Campaign_Hero_Dune',
    version: 'v2',
    category: 'Campaigns',
    format: 'RAW',
    updated: 'Updated 3 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf2FRgjg_dW_i5UShJm0n_33ZJhSD1jOxg9Nu66UJBTgHWUaMwuCIVXvumGeSnfbB47TKIYgylW2ShIWRRl-Lkhv4TTjIjktgkUMYRTRrboIBPqG86ZQKLXsKOzP94u5QmVgk_ZuD0EqorOVbBNUFuGyr-bDIPMTGbtqkRJUd7CoOLkpCIiCcAtE8ThegF2ROVORhdAtyMTOWQbhk1mDsYiEQv_OcxDvQw8wmNqpbCEmFncXvOrS674Qhbn_A9ngw5W9g4_CoXPsSf',
    isAIGenerated: true,
    status: 'In Draft'
  },
  {
    id: 'asset-4',
    title: 'Tablet_Mockup_Clean',
    version: 'v7',
    category: 'Product Frames',
    format: 'PNG',
    updated: 'Updated 5 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU-ipGSZRVHur9KHknVUGM1BD1HtG80BvrbIKupbpS98TqBFz1Mer0HKViu3kllcdatQQ5BDixgzYcq1SuCmdzoTY1Zo8f2YDn_PF_8-srK6GqBeMZQyywyu2qqs_gtWuvZfAZkF6SBDh-k0G_kCFB7FO5OIVU-wKffevAWhIfRh5kErjgx8-UrMIzCMtfqVcY9muE14szfXOfb3NOh_YJyZp7NYmeJs043Wq2ArYWubtSVfS4v7CSEw0bMBFrsYW43w8l_M0yq_A6',
    isAIGenerated: false,
    status: 'Verified'
  }
];

export const initialConnections: SyncConnection[] = [
  { id: 'conn-1', name: 'API Shopify', subtitle: 'Inventario en vivo', type: 'api', status: 'Active', lastSync: '14m ago', recordsCount: '84,203' },
  { id: 'conn-2', name: 'PostgreSQL Principal', subtitle: 'BDD de productos interna', type: 'postgres', status: 'Active', lastSync: '2h ago', recordsCount: '412,000' },
  { id: 'conn-3', name: 'SAP Business One', subtitle: 'Integración ERP', type: 'sap', status: 'Error', lastSync: 'Fallida', errorMessage: 'Autenticación expirada' },
  { id: 'conn-4', name: 'Precios_Proveedores.xlsx', subtitle: 'Archivo Excel cargado', type: 'excel', status: 'Idle', lastSync: '1 day ago' },
];

export const initialExportHistory: ExportHistoryItem[] = [
  { id: 'exp-1', filename: 'Catálogo_Relojes_Desde_INDD', date: '14 Oct, 2026', size: '182.4 MB', status: 'Success', type: 'pdf' },
  { id: 'exp-2', filename: 'Sync_Excel_Precios_Proveedores', date: 'En progreso...', size: 'Calc...', status: 'Processing', progress: 82, type: 'zip' },
  { id: 'exp-3', filename: 'Catálogo_Industrial_INDD_Export', date: '10 Oct, 2026', size: '42.1 MB', status: 'Success', type: 'pdf' },
  { id: 'exp-4', filename: 'Sync_BDD_Productos', date: '09 Oct, 2026', size: '0 MB', status: 'Failed', error: 'ERR_SERVIDOR_INALCANZABLE. Verificar conexión a base de datos.', type: 'zip' },
  { id: 'exp-5', filename: 'Catálogo_Cosmética_IDML_v2', date: '01 Oct, 2026', size: '175.9 MB', status: 'Success', type: 'pdf' },
];
