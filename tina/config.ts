import { defineConfig } from "tinacms";

// temporary force sync flag

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "global",
        label: "Global Content",
        path: "content/global",
        format: "json",
        match: {
          include: "global-*",
        },
        fields: [
          {
            type: "string",
            name: "language",
            label: "Language",
            required: true,
          },
          {
            type: "object",
            name: "nav",
            label: "Navigation",
            fields: [
              { type: "string", name: "home", label: "Home" },
              { type: "string", name: "about", label: "About Us" },
              { type: "string", name: "mission", label: "Mission" },
              { type: "string", name: "projects", label: "Projects" },
              { type: "string", name: "donate", label: "Donate" },
            ],
          },
          { type: "string", name: "announcement", label: "Announcement Bar", ui: { component: "textarea" } },
          {
            type: "object",
            name: "ads",
            label: "Global Ad Labels",
            fields: [
              { type: "string", name: "sponsored", label: "Sponsored Label" },
              { type: "string", name: "spotlight", label: "Spotlight Label" },
              { type: "string", name: "learnMore", label: "Learn More Label" },
              { type: "string", name: "visitSite", label: "Visit Site Label" },
            ],
          },
          {
            type: "object",
            name: "partners",
            label: "Partner Content",
            fields: [
              {
                type: "object",
                name: "tours",
                label: "Eco Tours Partner",
                fields: [
                  { type: "string", name: "brand", label: "Brand Name" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "url", label: "CTA URL" },
                ],
              },
              {
                type: "object",
                name: "welfare",
                label: "Animal Welfare Partner",
                fields: [
                  { type: "string", name: "brand", label: "Brand Name" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "url", label: "CTA URL" },
                ],
              },
              {
                type: "object",
                name: "vets",
                label: "Vet Alliance Partner",
                fields: [
                  { type: "string", name: "brand", label: "Brand Name" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "url", label: "CTA URL" },
                ],
              },
              {
                type: "object",
                name: "tours_alt",
                label: "Tours Alt (for Project Detail)",
                fields: [
                  { type: "string", name: "brand", label: "Brand Name" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", name: "url", label: "CTA URL" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "impact",
            label: "Impact Stats",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              {
                type: "object",
                list: true,
                name: "stats",
                label: "Stats List",
                ui: { itemProps: (item: any) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "number", label: "Stat Number" },
                  { type: "string", name: "label", label: "Stat Label" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer Content",
            fields: [
              { type: "string", name: "stayConnected", label: "Stay Connected Title" },
              { type: "string", name: "together", label: "Motto Text" },
              { type: "string", name: "rights", label: "Copyright Text" },
            ],
          },
        ],
      },
      {
        name: "translations",
        label: "Website Content",
        path: "content",
        format: "json",
        match: {
          include: ["en", "de"],
        },
        fields: [
          {
            type: "string",
            name: "language",
            label: "Language",
            required: true,
          },
          {
            type: "object",
            name: "index",
            label: "Home Page",
            fields: [
              { type: "string", name: "heroLabel", label: "Hero Label" },
              { type: "string", name: "heroTitle1", label: "Hero Title Line 1" },
              { type: "string", name: "heroTitle2", label: "Hero Title Line 2" },
              { type: "string", name: "heroDesc", label: "Hero Description", ui: { component: "textarea" } },
              { type: "string", name: "donateNow", label: "Donate Button" },
              { type: "string", name: "ourStory", label: "Our Story Button" },
              { type: "string", name: "aboutLabel", label: "About Section Label" },
              { type: "string", name: "aboutTitle", label: "About Section Title" },
              { type: "string", name: "aboutP1", label: "About Paragraph 1", ui: { component: "textarea" } },
              { type: "string", name: "aboutP2", label: "About Paragraph 2", ui: { component: "textarea" } },
              { type: "string", name: "aboutP3", label: "About Paragraph 3", ui: { component: "textarea" } },
              { type: "string", name: "readStory", label: "Read Story Button" },
              { type: "string", name: "missionLabel", label: "Mission Label" },
              { type: "string", name: "missionTitle", label: "Mission Title" },
              {
                type: "object",
                list: true,
                name: "missionItems",
                label: "Mission Summary Items",
                ui: { itemProps: (item: any) => ({ label: item?.title || "Mission Item" }) },
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "missionTag", label: "Mission Tag" },
              { type: "string", name: "learnMore", label: "Learn More Button" },
              { type: "string", name: "ctaLabel", label: "CTA Label" },
              { type: "string", name: "ctaTitle", label: "CTA Title" },
              { type: "string", name: "ctaDesc", label: "CTA Description", ui: { component: "textarea" } },
              { type: "string", name: "shopSupport", label: "Shop Support Text" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "About Page",
            fields: [
              { type: "string", name: "storyLabel", label: "Story Label" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "team",
                label: "Team Members",
                ui: { itemProps: (item: any) => ({ label: item?.name || "Team Member" }) },
                fields: [
                  { type: "string", name: "name", label: "Name" },
                  { type: "string", name: "role", label: "Role" },
                  { type: "image", name: "image", label: "Image Reference" },
                  { type: "string", list: true, name: "bio", label: "Bio Paragraphs", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "beginningLabel", label: "Beginning Label" },
              { type: "string", name: "beginningTitle", label: "Beginning Title" },
              { type: "string", name: "communityLabel", label: "Community Label" },
              { type: "string", name: "communityTitle", label: "Community Title" },
            ],
          },
          {
            type: "object",
            name: "mission",
            label: "Mission Page",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "subtitle", label: "Subtitle", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "sections",
                label: "Pillar Sections",
                ui: { itemProps: (item: any) => ({ label: item?.title || "Section" }) },
                fields: [
                  { type: "string", name: "label", label: "Section Label" },
                  { type: "string", name: "title", label: "Section Title" },
                  { type: "string", list: true, name: "paragraphs", label: "Paragraphs", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "projects",
            label: "Projects Page",
            fields: [
              { type: "string", name: "label", label: "Header Label" },
              { type: "string", name: "title", label: "Header Title" },
              { type: "string", name: "subtitle", label: "Header Subtitle", ui: { component: "textarea" } },
              {
                type: "object",
                list: true,
                name: "items",
                label: "Project Items",
                ui: { itemProps: (item: any) => ({ label: item?.title || "Project Item" }) },
                fields: [
                  { type: "string", name: "slug", label: "Slug" },
                  { type: "string", name: "category", label: "Category" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  { type: "string", list: true, name: "detail", label: "Detail Paragraphs", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "ctaTitle", label: "CTA Title" },
              { type: "string", name: "ctaDesc", label: "CTA Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "socialMedia",
                label: "Social Media Section",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "subtitle", label: "Subtitle" },
                  { type: "string", name: "viewMore", label: "View More Button" },
                  { type: "string", name: "followUs", label: "Follow Us Button" },
                ],
              },
              {
                type: "object",
                name: "adoption",
                label: "Adoption Section",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "subtitle", label: "Subtitle" },
                  {
                    type: "object",
                    list: true,
                    name: "testimonials",
                    label: "Testimonials",
                    ui: { itemProps: (item: any) => ({ label: item?.author || "Testimonial" }) },
                    fields: [
                      { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
                      { type: "string", name: "author", label: "Author" },
                    ],
                  },
                  {
                    type: "object",
                    name: "form",
                    label: "Adoption Form",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "subtitle", label: "Subtitle" },
                      { type: "string", name: "namePlaceholder", label: "Name Placeholder" },
                      { type: "string", name: "emailPlaceholder", label: "Email Placeholder" },
                      { type: "string", name: "messagePlaceholder", label: "Message Placeholder" },
                      { type: "string", name: "submitButton", label: "Submit Button" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "donate",
            label: "Donate Page",
            fields: [
              { type: "string", name: "heroTitle", label: "Hero Title" },
              { type: "string", list: true, name: "heroDesc", label: "Hero Description Paragraphs", ui: { component: "textarea" } },
              { type: "string", name: "donateNow", label: "Donate Button (Hero)" },
              { type: "string", name: "mainTitle", label: "Main Title" },
              { type: "string", list: true, name: "mainDesc", label: "Main Description Paragraphs", ui: { component: "textarea" } },
              { type: "string", name: "shopCTA", label: "Shop CTA Label" },
              { type: "string", name: "shopTitle", label: "Shop Title" },
              { type: "string", name: "shopButton", label: "Shop Button Label" },
              {
                type: "object",
                name: "details",
                label: "Donation Details",
                fields: [
                  {
                    type: "object",
                    name: "bank",
                    label: "Bank Details",
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "name", label: "Name" },
                      { type: "string", name: "iban", label: "IBAN" },
                      { type: "string", name: "bic", label: "BIC" },
                    ],
                  },
                ],
              },
              { type: "string", name: "fundsLabel", label: "Funds Label" },
              { type: "string", name: "fundsTitle", label: "Funds Title" },
              {
                type: "object",
                list: true,
                name: "fundsItems",
                label: "Allocation Items",
                ui: { itemProps: (item: any) => ({ label: item?.title || "Allocation Item" }) },
                fields: [
                  { type: "string", name: "title", label: "Item Title" },
                  { type: "string", name: "desc", label: "Item Description", ui: { component: "textarea" } },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});// force schema sync
// force schema sync
