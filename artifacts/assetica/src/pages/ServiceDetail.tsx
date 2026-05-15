import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import FaqSection from "@/components/FaqSection";
import ContactForm from "@/components/ContactForm";
import SEOHead from "@/components/SEOHead";

const services: Record<string, {
  title: string; subtitle: string; image: string; definition: string; intro: string;
  points: string[]; process: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  related?: string[];
}> = {
  "business-valuation": {
    title: "Business Valuation", subtitle: "Independent Business & Company Valuation",
    image: "/business-valuation-hero.webp",
    definition: "Business valuation in the UAE is the process of determining the economic worth of a company using internationally recognised methodologies including Discounted Cash Flow (DCF) analysis, market comparables, and the net asset value approach. In Dubai and across the GCC, independent business valuations are required for M&A transactions, shareholder disputes, DIFC and ADGM court proceedings, UAE Golden Visa applications, bank financing, corporate restructuring, and strategic exit planning. Assetica delivers certified, defensible valuations accepted by UAE regulatory authorities, courts, and institutional investors.",
    intro: "Assetica delivers independent, credible business valuations for companies across the UAE, UK, GCC, and internationally. Whether you are raising capital, planning an exit, resolving a shareholder dispute, or meeting a regulatory requirement, our valuations provide the rigour and defensibility your situation demands.",
    points: ["Independent certified business valuations","Discounted cash flow (DCF) and market multiples analysis","Valuation for fundraising and investor negotiations","Merger and acquisition (M&A) valuations","Exit planning and shareholder exit valuations","Shareholder dispute and litigation support valuations","Regulatory and compliance valuations","Goodwill and intangible asset valuations"],
    process: [
      { step: "01", title: "Engagement Scoping", desc: "We define the purpose, standard of value, and methodology appropriate for your specific valuation requirement." },
      { step: "02", title: "Financial & Commercial Analysis", desc: "In-depth review of financial statements, management accounts, market data, and business fundamentals." },
      { step: "03", title: "Valuation Modelling", desc: "Construction of a rigorous valuation model using the most appropriate methodology for your business and purpose." },
      { step: "04", title: "Report Delivery", desc: "A clear, independently supported valuation report delivered with full documentation of methodology and assumptions." },
    ],
    faqs: [
      { q: "What is business valuation and why does my company need it?", a: "Business valuation is the process of determining the economic value of your company. It is required in a wide range of situations including fundraising and investor negotiations, business sales or acquisitions, shareholder exits, estate and tax planning, regulatory compliance, dispute resolution, and strategic decision-making. An independent valuation from Assetica gives you a credible, defensible figure that you can rely on in negotiations and formal processes." },
      { q: "What methods does Assetica use to value a business?", a: "Assetica applies the most appropriate valuation methodology, or a combination of methods, based on your industry, business stage, and the purpose of the valuation. The primary methods we use are: Discounted Cash Flow (DCF) analysis, which values the business based on projected future cash flows; market comparables, which benchmarks your business against similar listed companies or recent transactions; and asset-based approaches, which are used where net assets are the primary value driver. Using multiple methods provides cross-validation and a more defensible valuation." },
      { q: "How much does a business valuation cost in Dubai?", a: "The cost of a business valuation depends on the size and complexity of the business, the purpose of the valuation, and the level of documentation required. Assetica offers competitive, transparent pricing for SME and mid-market valuations across the UAE. Contact us for a tailored quotation after an initial consultation." },
      { q: "How long does a business valuation take?", a: "For most SMEs and mid-market businesses in the UAE, Assetica can deliver an initial valuation report within 2–3 weeks from receipt of the required financial information. For larger or more complex businesses, or where the purpose requires extensive documentation (such as tax or litigation valuations), allow 4–6 weeks. Expedited timelines are available for time-sensitive transactions." },
      { q: "Can Assetica value a business for the purpose of selling it in the UAE?", a: "Yes. Assetica regularly provides pre-sale valuations for business owners across the UAE who are planning to sell their business. A professional, independently prepared valuation gives sellers a credible asking price backed by rigorous analysis, significantly strengthening their negotiating position with prospective buyers and their advisors." },
      { q: "Does Assetica provide business valuations for UAE businesses operating in Saudi Arabia, the wider GCC, UK, and Europe?", a: "Yes. Assetica provides business valuations for companies headquartered in the UAE with operations across Saudi Arabia, Qatar, Bahrain, Kuwait, Oman, the UK, and broader European markets. Our team is experienced in applying the appropriate valuation standards and market data for each jurisdiction, ensuring that our valuations are credible and defensible wherever your business operates or wherever your investors, buyers, or regulators are based." },
    ],
    related: ["due-diligence", "financial-modelling", "strategic-value-advisory"],
  },
  "due-diligence": {
    title: "Due Diligence", subtitle: "Risk Management & Business Analysis",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    definition: "Due diligence is the structured process of independently investigating a business before completing an acquisition, investment, or merger. In the UAE, professional due diligence covers financial records, legal contracts, regulatory compliance under UAE law, operational risks, and contingent liabilities. It is conducted by buyers, investors, and lenders to verify the accuracy of information provided and surface material risks before any transaction is finalised.",
    intro: "Our thorough research and analysis reveal your business's strengths, weaknesses, and growth potential. Assetica's due diligence service minimises risk and maximises investment confidence in every transaction.",
    points: ["Comprehensive financial statement analysis","Legal and regulatory compliance review","Operational efficiency assessment","Market positioning evaluation","Risk identification and quantification","Growth potential analysis","Management and team evaluation","Technology and IP assessment"],
    process: [
      { step: "01", title: "Initial Scoping", desc: "We define the scope of due diligence based on your specific transaction type and risk areas." },
      { step: "02", title: "Document Review", desc: "Comprehensive review of financial, legal, and operational documents." },
      { step: "03", title: "Analysis & Findings", desc: "In-depth analysis of all findings with risk quantification and recommendations." },
      { step: "04", title: "Report Delivery", desc: "Clear, actionable due diligence report delivered to your timeline." },
    ],
    faqs: [
      { q: "What does due diligence involve in a business acquisition in Dubai?", a: "Due diligence in Dubai involves a comprehensive review of the target business's financial statements, legal contracts, regulatory compliance under UAE law, operational processes, customer and supplier relationships, and potential liabilities. Assetica's due diligence process is designed to surface all material risks before any transaction is finalised." },
      { q: "How long does a due diligence process take?", a: "Typically 2–4 weeks depending on the size and complexity of the business. For smaller SMEs in the UAE, we can often complete a focused review within 10 business days. For larger or more complex businesses with international operations, allow 4–6 weeks. We offer expedited timelines for time-sensitive transactions." },
      { q: "What types of due diligence does Assetica conduct?", a: "Assetica conducts financial due diligence, legal due diligence, commercial due diligence, operational due diligence, tax due diligence, and technology/IP due diligence. The scope is tailored to the specific transaction type, whether it is a full acquisition, minority investment, merger, or joint venture." },
      { q: "Can due diligence uncover hidden liabilities in a UAE business?", a: "Yes. This is one of the primary purposes of professional due diligence. Our team identifies contingent liabilities, undisclosed debts, regulatory breaches, pending litigation, tax exposures, and other risks that may not be visible from a surface-level review of the business. This protects buyers and investors from costly post-transaction surprises." },
      { q: "Do I need due diligence if I am buying a small business in Dubai?", a: "Yes, due diligence is equally important for small business acquisitions. Even small businesses can carry significant hidden risks such as undisclosed debts, outstanding regulatory issues, or key-person dependency. Assetica offers right-sized due diligence packages for SMEs in Dubai and across the UAE that are thorough yet cost-effective." },
      { q: "Does Assetica conduct due diligence for businesses in Saudi Arabia, Qatar, and other GCC countries?", a: "Yes. Assetica's due diligence services extend across the entire GCC region, including Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman, as well as the UK and broader European markets. Our team is experienced in the regulatory environments of each jurisdiction, ensuring that our due diligence analysis accounts for local legal, financial, and compliance requirements wherever your transaction is based." },
    ],
    related: ["business-valuation", "buyer-seller-negotiation", "financial-modelling"],
  },
  "business-structuring": {
    title: "Business Structuring", subtitle: "Company Formation & Corporate Structure",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80",
    definition: "Business structuring in the UAE is the strategic arrangement of corporate entities, ownership frameworks, governance mechanisms, and financial flows to optimise a company for investment, tax efficiency, and long-term value. Choosing the right structure, whether mainland, free zone, DIFC, or ADGM, directly affects your company's valuation multiple, regulatory obligations, and attractiveness to investors and buyers. Assetica advises on corporate structure across all UAE jurisdictions and internationally.",
    intro: "We establish a strong valuation foundation by assessing the legal, financial, and operational aspects of your business. Our business structuring service ensures your corporate structure is optimised for valuation, investment, and growth.",
    points: ["Legal entity structure optimisation","Shareholder agreement review","Corporate governance assessment","Financial structure analysis","Tax-efficient structuring advice","Investment readiness preparation","Regulatory compliance review","Exit strategy alignment"],
    process: [
      { step: "01", title: "Current State Assessment", desc: "Review of existing corporate structure, governance, and financial arrangements." },
      { step: "02", title: "Gap Analysis", desc: "Identification of structural gaps that could affect valuation or investment readiness." },
      { step: "03", title: "Recommendations", desc: "Tailored recommendations for structural optimisation aligned with your objectives." },
      { step: "04", title: "Implementation Support", desc: "Guidance through the implementation of recommended structural changes." },
    ],
    faqs: [
      { q: "Why does business structure affect company valuation?", a: "Corporate structure directly impacts tax efficiency, investor attractiveness, risk allocation, governance quality, and ease of investment or exit. An optimally structured business in the UAE typically commands a higher valuation multiple than a comparable business with a complex or inefficient structure. Assetica helps you structure for maximum value." },
      { q: "What is the best business structure for attracting investors in the UAE?", a: "The optimal structure depends on your growth stage and investor type. For PE or VC investment, a clean holding structure with a single operating subsidiary is typically preferred. For strategic investors, a structure that facilitates partial acquisition or joint venture is important. Assetica advises on the most appropriate structure for your specific fundraising objectives." },
      { q: "How does business structuring differ from company formation?", a: "Company formation is the administrative process of registering a legal entity. Business structuring is a strategic exercise that determines the most effective arrangement of legal entities, ownership, governance, and financial flows to achieve your commercial objectives, including optimisation for valuation, taxation, and investor readiness." },
      { q: "Can Assetica help restructure an existing business in Dubai?", a: "Yes. Assetica works with existing businesses across the UAE and UK to review and restructure their corporate arrangements. This includes group restructuring, introduction of holding companies, shareholder agreement amendments, and preparation for investment or exit, all aimed at enhancing value and simplifying investor and buyer engagement." },
      { q: "How long does business structuring take?", a: "An initial assessment and recommendations typically take 1–2 weeks. Implementation timelines depend on the complexity of changes required and any regulatory approvals needed in the UAE. Simple restructuring can be completed in 4–6 weeks; complex international group restructuring may take 3–6 months." },
      { q: "Should a Dubai business set up a DIFC or ADGM holding structure for investment purposes?", a: "DIFC (Dubai International Financial Centre) and ADGM (Abu Dhabi Global Market) are internationally recognised common-law financial free zones that are highly attractive to institutional and foreign investors. A holding structure in DIFC or ADGM can significantly enhance your business's investment attractiveness, simplify cross-border capital flows, and provide access to robust legal frameworks. Assetica advises on whether a DIFC or ADGM structure is appropriate for your specific investment and exit objectives." },
    ],
    related: ["business-valuation", "tax-valuation", "strategic-value-advisory"],
  },
  "building-pitch-deck": {
    title: "Building Pitch Deck", subtitle: "Investor-Ready Presentations",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1800&q=80",
    definition: "A pitch deck is a concise visual presentation, typically 12 to 15 slides, used to communicate a company's business model, market opportunity, financial performance, and funding requirements to investors. In the UAE, where family offices, sovereign wealth funds, and institutional investors evaluate hundreds of opportunities each year, a professionally prepared, data-driven pitch deck is essential for securing meetings and closing investment rounds. Assetica combines financial modelling expertise with investor narrative to produce pitch decks that drive results.",
    intro: "We craft compelling presentations that highlight your company's value proposition, financials, and growth prospects. Our pitch decks are designed to captivate investors and stakeholders from the first slide.",
    points: ["Executive summary and company overview","Problem and solution narrative","Market opportunity sizing","Business model articulation","Financial performance and projections","Competitive landscape analysis","Team and credentials showcase","Funding requirements and use of funds"],
    process: [
      { step: "01", title: "Discovery Session", desc: "Deep-dive into your business, objectives, and target investor audience." },
      { step: "02", title: "Content Development", desc: "Building the narrative, financial slides, and supporting data." },
      { step: "03", title: "Design & Refinement", desc: "Professional design with iterative refinement based on your feedback." },
      { step: "04", title: "Final Delivery", desc: "Investment-ready pitch deck in your preferred format." },
    ],
    faqs: [
      { q: "What should a pitch deck include for UAE investors?", a: "A pitch deck for UAE and Gulf investors should include a compelling executive summary, a clear problem and solution, the size of your market opportunity in the region, your business model and revenue streams, historical financial performance, 3–5 year financial projections, your competitive positioning, your team's credentials, and your funding ask with a clear use of funds. Assetica ensures every slide is both data-driven and visually compelling." },
      { q: "How many slides should a pitch deck have?", a: "The optimal length is typically 12–15 slides. This is long enough to cover all key investor questions comprehensively but short enough to maintain engagement throughout a presentation. Assetica tailors the length and depth based on your fundraising stage, a seed-stage deck differs significantly from a Series B or pre-IPO deck." },
      { q: "How does Assetica integrate business valuation into the pitch deck?", a: "One of the most powerful elements of any pitch deck is a credible, independently supported company valuation. Assetica uniquely combines our pitch deck development service with our financial modelling expertise to produce a defensible valuation that forms the basis of your funding ask, giving investors the confidence to commit at the valuation you are seeking." },
      { q: "Can Assetica build a pitch deck for a UAE startup raising its first round?", a: "Absolutely. We work with founders and entrepreneurs across the UAE and MENA region at all stages, from pre-revenue startups raising their first angel round, to growth-stage businesses preparing for institutional investment. We adapt our approach, financial modelling depth, and narrative style to suit your specific stage and investor audience." },
      { q: "How long does it take to build a pitch deck with Assetica?", a: "Our standard pitch deck development timeline is 2–3 weeks from the initial discovery session to final delivery. We include two rounds of revisions in our standard engagement. For urgent fundraising timelines, we offer expedited delivery in 7–10 business days." },
      { q: "How should a UAE startup pitch to family offices and sovereign wealth funds in the Gulf?", a: "Family offices and sovereign wealth funds in the Gulf, particularly in Dubai, Abu Dhabi, Saudi Arabia, and Kuwait, have distinct investment criteria compared to traditional venture capital. They place significant emphasis on relationship context, capital preservation, regional alignment, and credible financial projections. Assetica tailors pitch decks specifically for Gulf institutional audiences, ensuring the narrative, valuation methodology, and financial presentation align with what these investors look for when assessing opportunities in the UAE and MENA region." },
    ],
    related: ["financial-modelling", "business-planning", "business-valuation"],
  },
  "financial-modelling": {
    title: "Financial Modelling", subtitle: "Business Financial Valuation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=80",
    definition: "Financial modelling in business valuation is the construction of a quantitative representation of a company's financial performance and projected future cash flows. In the UAE, financial models are used to support M&A transactions, bank financing applications, investor presentations, internal strategic planning, and regulatory compliance. A rigorous financial model applies independently verified market data and clearly documented assumptions to produce a defensible valuation range.",
    intro: "Our precise valuation uses financial metrics, market trends, and industry benchmarks to determine your company's worth. Advanced financial models that project future performance and guide strategic decision-making.",
    points: ["Discounted cash flow (DCF) analysis","Comparable company analysis","Precedent transactions analysis","Revenue projection modelling","EBITDA normalisation","Working capital analysis","Sensitivity and scenario analysis","Financial statement modelling"],
    process: [
      { step: "01", title: "Data Collection", desc: "Gathering financial statements, management accounts, and operational data." },
      { step: "02", title: "Model Building", desc: "Construction of a tailored financial model using industry-appropriate methodology." },
      { step: "03", title: "Scenario Analysis", desc: "Testing multiple scenarios to understand value range and key drivers." },
      { step: "04", title: "Valuation Report", desc: "Comprehensive report with clear valuation conclusion and supporting analysis." },
    ],
    faqs: [
      { q: "What valuation method does Assetica use for financial modelling?", a: "We apply the most appropriate methodology, or a combination of methodologies, based on your industry, business stage, and the purpose of the valuation. For most businesses, we use a combination of Discounted Cash Flow (DCF) analysis, market comparables (EV/EBITDA, P/E multiples), and precedent transaction analysis. Using multiple methods provides cross-validation and a more defensible valuation range." },
      { q: "What financial information is needed to build a valuation model?", a: "We typically require 3 years of audited or management financial statements (P&L, balance sheet, cash flow), current year management accounts, details of any significant one-off items or adjustments, an overview of your revenue model, and any existing forecasts or business plans. Our team will provide a specific document checklist after your initial consultation." },
      { q: "How accurate is a financial model for business valuation in Dubai?", a: "The accuracy of a financial model depends on the quality of the underlying data and the rigor of the assumptions. Assetica's models are built on independently researched market data, verified financial inputs, and thoroughly tested assumptions. We present valuations as a range with clearly documented sensitivity analysis, so you and your stakeholders understand both the central case and the range of outcomes." },
      { q: "Can financial modelling help with securing bank finance in the UAE?", a: "Yes. UAE banks and financial institutions require detailed financial projections and cash flow models as part of their credit assessment process. Assetica builds financial models that are specifically designed to satisfy the requirements of UAE and international lenders, demonstrating debt serviceability, liquidity, and covenant compliance under multiple scenarios." },
      { q: "How does financial modelling support M&A decisions in the UAE?", a: "In M&A transactions, financial modelling is used to assess the value of the target business, model the impact of the acquisition on the acquirer's financials (accretion/dilution analysis), stress-test the deal under different scenarios, and structure the consideration (cash, equity, earn-out). Assetica's M&A financial models are built to the standard expected by sophisticated buyers, sellers, and their advisors." },
      { q: "Can Assetica build a financial model for a pre-revenue startup in Dubai seeking seed or Series A funding?", a: "Yes. Financial modelling for pre-revenue or early-stage startups requires a different approach to established businesses, it is built on market sizing, customer acquisition assumptions, unit economics, and comparable growth trajectories rather than historical performance. Assetica builds bottom-up financial models for Dubai and UAE startups that are credible to seed investors, angel networks, and early-stage VC funds, clearly articulating the path to profitability and the key assumptions investors will scrutinise." },
    ],
    related: ["business-valuation", "business-planning", "building-pitch-deck"],
  },
  "buyer-seller-negotiation": {
    title: "Buyer & Seller Negotiation", subtitle: "M&A Advisory & Deal Facilitation",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80",
    definition: "Buyer and seller negotiation advisory in the UAE covers the full range of financial and strategic support required to structure, negotiate, and close a business sale or acquisition. The most common reason deals fail in the region is a valuation gap between buyer and seller. Independent negotiation advisory provides both parties with the credible financial analysis needed to bridge that gap and agree on terms that reflect the true value of the business.",
    intro: "We facilitate successful negotiations during mergers, acquisitions, or sales, ensuring favourable outcomes for all parties. Our experienced team acts as skilled intermediaries protecting your interests throughout the deal process.",
    points: ["Independent valuation as negotiation anchor","Deal structuring advice","Term sheet review and negotiation","Price gap bridging strategies","Letter of intent (LOI) guidance","SPA negotiation support","Completion mechanics advice","Post-completion adjustment mechanisms"],
    process: [
      { step: "01", title: "Valuation Establishment", desc: "Independent valuation to establish a credible, defensible value anchor." },
      { step: "02", title: "Negotiation Strategy", desc: "Development of negotiation strategy aligned with your objectives and priorities." },
      { step: "03", title: "Active Negotiation Support", desc: "Participation in negotiation meetings and real-time advisory support." },
      { step: "04", title: "Deal Closing", desc: "Support through to signing and completion to ensure all terms are met." },
    ],
    faqs: [
      { q: "How does Assetica support buyer and seller negotiations in Dubai?", a: "Assetica acts as an experienced, independent intermediary providing both parties with the financial and commercial analysis needed to bridge valuation gaps and structure a deal that works for everyone. We provide independent valuation opinions, scenario modelling for different deal structures, negotiation strategy advisory, and support in drafting and reviewing heads of terms and sale and purchase agreements." },
      { q: "Does Assetica represent buyers, sellers, or both?", a: "We can represent either buyers or sellers, or provide a neutral independent opinion for both parties. Our role is always clearly defined upfront to ensure full transparency. If we are engaged by one party, we act exclusively in their interest. If engaged as a neutral advisor, we provide objective analysis to both sides to facilitate a fair and efficient deal process." },
      { q: "What is the most common reason deals fail in the UAE and how can Assetica help?", a: "The most common reason deals fail is a valuation gap, the buyer and seller cannot agree on price. Assetica addresses this directly by providing an independent, defensible valuation that both parties can use as a credible starting point. We also help structure creative deal mechanics, such as earn-outs, deferred consideration, or equity rollovers, that can bridge valuation gaps without either party conceding their position entirely." },
      { q: "Can Assetica help negotiate an earn-out structure for a business sale in Dubai?", a: "Yes. Earn-out structures are increasingly common in UAE business sales, particularly where there is uncertainty about future performance. Assetica helps design earn-out mechanisms that are fair, measurable, and clearly documented, including defining the earn-out metrics, calculation methodology, payment schedule, and protections for both buyer and seller during the earn-out period." },
      { q: "How long does a business sale negotiation typically take in the UAE?", a: "From initial offer to signed SPA, UAE business sales typically take 3–6 months. The timeline depends on the complexity of the business, the number of parties involved, the extent of due diligence required, and how quickly valuation gaps can be resolved. Assetica's involvement from the outset significantly reduces unnecessary delays by ensuring valuations are credible and deal structures are commercially sound." },
      { q: "How does Assetica maintain confidentiality during buyer and seller negotiations in the UAE?", a: "Confidentiality is critical in any M&A or business sale process. Assetica manages this through a structured information release protocol, beginning with a teaser document, followed by an NDA before any detailed financial information is shared, and a controlled data room process for due diligence. We advise on the appropriate level of disclosure at each stage and ensure all parties are bound by appropriate confidentiality obligations under UAE and applicable international law before sensitive business information is exchanged." },
    ],
    related: ["business-valuation", "due-diligence", "strategic-value-advisory"],
  },
  "tax-valuation": {
    title: "Tax Valuation", subtitle: "Tax-Compliant Business Valuations",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1800&q=80",
    definition: "Tax valuation in the UAE is the preparation of an independently certified assessment of a business, asset, or interest specifically for tax compliance purposes. Since the introduction of UAE corporate tax at 9% in June 2023, formal tax valuations are required for transfer pricing between related parties, business reorganisations, employee share option schemes, and recognition of goodwill and intangible assets. Assetica prepares tax valuations that meet UAE Federal Tax Authority requirements and OECD Transfer Pricing Guidelines.",
    intro: "We assess tax impacts and develop optimised strategies to enhance your company's financial health. Our tax valuations are fully compliant with UAE, UK, and international tax regulations.",
    points: ["Transfer pricing valuations","Share-based compensation valuations","Estate and gift tax valuations","Intangible asset valuations for tax","Thin capitalisation analysis","Business reorganisation valuations","Intra-group transaction valuations","VAT and corporate tax compliance"],
    process: [
      { step: "01", title: "Tax Position Review", desc: "Understanding of your current tax position and valuation requirements." },
      { step: "02", title: "Regulatory Analysis", desc: "Assessment of applicable UAE, UK, and international tax regulations." },
      { step: "03", title: "Valuation & Documentation", desc: "Defensible valuation with comprehensive documentation for tax authorities." },
      { step: "04", title: "Report & Advisory", desc: "Tax valuation report with strategic recommendations for tax optimisation." },
    ],
    faqs: [
      { q: "What is a tax valuation and why is it needed in the UAE?", a: "A tax valuation is an independently prepared assessment of the value of a business, asset, or interest for a specific tax purpose. In the UAE, following the introduction of corporate tax in 2023, tax valuations are increasingly required for transfer pricing compliance, business reorganisations, employee share schemes, and transactions between related parties. Assetica prepares tax valuations that meet the requirements of the UAE Federal Tax Authority (FTA)." },
      { q: "Is a tax valuation different from a standard business valuation?", a: "Yes. While the underlying valuation methodology may be similar, tax valuations must meet specific regulatory standards set by the relevant tax authority. They require more extensive documentation, specific methodologies prescribed by tax regulations, and must be defensible against challenge from tax authorities. Assetica's tax valuations are prepared with this regulatory scrutiny in mind." },
      { q: "Does Assetica prepare transfer pricing valuations for UAE businesses?", a: "Yes. Transfer pricing is one of the most significant tax compliance requirements for UAE businesses with related-party transactions, particularly following the introduction of UAE corporate tax. Assetica prepares transfer pricing valuations and documentation that comply with the OECD Transfer Pricing Guidelines and UAE FTA requirements, protecting businesses from transfer pricing adjustments and penalties." },
      { q: "What valuations are needed for UAE employee share schemes?", a: "Employee share option plans (ESOPs) and other equity incentive arrangements require independent valuations of the company's shares at the time of grant for tax compliance purposes. Assetica provides ESOP valuations that are fully documented and defensible with the UAE FTA and other relevant tax authorities, using recognised methodologies such as the Black-Scholes model and DCF analysis." },
      { q: "How does UAE corporate tax affect business valuation requirements?", a: "The introduction of UAE corporate tax at 9% from June 2023 has created new valuation obligations for businesses, particularly around related-party transactions, group restructurings, and the recognition of goodwill and intangible assets. Businesses that were previously not required to obtain formal valuations may now need them for tax compliance. Assetica helps businesses understand and fulfil these new valuation obligations." },
      { q: "Does Assetica prepare tax valuations for businesses operating across the UAE, Saudi Arabia, and the UK?", a: "Yes. Assetica provides tax valuations for businesses with multi-jurisdictional operations across the UAE, Saudi Arabia, Bahrain, Qatar, Kuwait, Oman, the UK, and broader Europe. Each jurisdiction has its own tax valuation requirements and regulatory standards. Our team ensures that valuations prepared for cross-border transactions, group restructurings, or transfer pricing purposes comply with the applicable regulations in each territory, including OECD guidelines, UAE FTA requirements, HMRC standards for UK tax purposes, and ZATCA requirements in Saudi Arabia." },
    ],
    related: ["business-structuring", "business-valuation", "strategic-value-advisory"],
  },
  "strategic-value-advisory": {
    title: "Strategic Value Advisory", subtitle: "Value Enhancement Consulting",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1800&q=80",
    definition: "Strategic value advisory is a service that combines business valuation expertise with strategic planning to identify, quantify, and close the gap between a company's current value and its maximum achievable potential. Unlike standard management consulting, every recommendation is assessed for its measurable impact on the company's valuation multiple. In Dubai and the UAE, this service is typically engaged two to three years before a planned sale, IPO, or major fundraising event.",
    intro: "We offer insights to enhance your company's overall value and ensure long-term growth. Our strategic value advisory service goes beyond valuation to provide a roadmap for sustainable value creation.",
    points: ["Value gap analysis","Value driver identification","Strategic growth planning","Operational efficiency optimisation","Revenue enhancement strategies","Cost reduction opportunities","M&A target identification","Exit readiness assessment"],
    process: [
      { step: "01", title: "Value Baseline", desc: "Establishing your current business value and key value drivers." },
      { step: "02", title: "Gap & Opportunity Analysis", desc: "Identifying gaps between current and potential value." },
      { step: "03", title: "Strategic Roadmap", desc: "Development of a prioritised roadmap for value enhancement." },
      { step: "04", title: "Implementation & Review", desc: "Support through implementation with regular progress reviews." },
    ],
    faqs: [
      { q: "What is strategic value advisory and how does it help businesses in Dubai?", a: "Strategic value advisory is a service that goes beyond telling you what your business is worth today, it helps you understand why your business is valued as it is, what factors are suppressing your value, and what specific actions you can take to increase it. For businesses in Dubai and the UAE planning to raise capital, attract investors, or pursue an exit, this service provides a clear, financially grounded roadmap to achieving a higher valuation." },
      { q: "How does Assetica identify value gaps in a business?", a: "We start with an independent baseline valuation of your business. We then compare your financial profile, operational metrics, and growth trajectory against sector benchmarks and comparable businesses. The gap between your current valuation and your potential valuation, based on achievable improvements, defines the value creation opportunity. We then prioritise the initiatives that will have the greatest impact on value in the shortest timeframe." },
      { q: "How does strategic value advisory differ from management consulting?", a: "Management consulting typically focuses on operational improvements and strategic planning. Strategic value advisory is specifically focused on measurable financial value creation, grounded in rigorous valuation methodology. Every recommendation we make is assessed for its likely impact on your company's valuation multiple and exit price, not just operational KPIs. This ensures your management team is focused on what actually moves the needle on value." },
      { q: "How long before a planned exit should I engage strategic value advisory?", a: "Ideally 2–3 years before a planned sale or fundraising event. This gives sufficient time to implement value-enhancing initiatives, demonstrate their impact in your financial results, and build a credible track record that supports a higher valuation. However, even 12 months of focused value creation work with Assetica can make a significant difference to your exit outcome." },
      { q: "Can strategic value advisory help a UAE business attract private equity investment?", a: "Yes, this is one of the most common engagements for our strategic value advisory service. Private equity investors apply rigorous financial scrutiny to potential investments. Assetica helps business owners understand how PE investors will assess their company, identify and address the issues that could depress the investment valuation, and build the commercial narrative and financial track record that supports a premium valuation." },
      { q: "How can a business in Dubai increase its valuation before listing on DFM, ADX, or an international stock exchange?", a: "Preparing for an IPO on the Dubai Financial Market (DFM), Abu Dhabi Securities Exchange (ADX), or international exchanges such as the London Stock Exchange requires a multi-year value creation programme. Assetica's strategic value advisory service focuses on the key value drivers that public market investors prioritise, revenue quality and predictability, EBITDA margin improvement, governance and reporting standards, management team depth, and ESG credentials. We work with businesses 2–4 years ahead of a planned listing to systematically address each of these areas and maximise the IPO valuation." },
    ],
    related: ["business-valuation", "business-planning", "financial-modelling"],
  },
  "business-planning": {
    title: "Business Planning", subtitle: "Advanced Financial Business Plans",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1800&q=80",
    definition: "A professional business plan in the UAE is a structured document that combines market research, operational planning, and detailed financial projections to present a credible roadmap for business growth. Banks, development finance institutions such as the Mohammed Bin Rashid Fund and Khalifa Fund, and institutional investors require a well-prepared business plan as part of their assessment and approval process. A strong business plan demonstrates commercial viability, financial discipline, and management capability.",
    intro: "Our advanced financial models project future performance and guide strategic decision-making. Comprehensive business plans that attract investment and drive sustainable growth in competitive markets.",
    points: ["Executive summary and business overview","Market analysis and competitive positioning","Revenue model and financial projections","Operational plan and resource requirements","Marketing and sales strategy","Risk assessment and mitigation plan","Funding requirements and use of funds","Exit strategy and investor returns"],
    process: [
      { step: "01", title: "Business Understanding", desc: "Deep understanding of your business model, market, and strategic objectives." },
      { step: "02", title: "Financial Modelling", desc: "Construction of detailed financial projections using rigorous assumptions." },
      { step: "03", title: "Plan Development", desc: "Development of a comprehensive, investor-grade business plan document." },
      { step: "04", title: "Review & Finalisation", desc: "Iterative review with management to ensure accuracy and completeness." },
    ],
    faqs: [
      { q: "What is included in Assetica's business plan service?", a: "Our business planning service includes a comprehensive written business plan document, a detailed financial model with 3–5 year P&L, balance sheet, and cash flow projections, a market analysis section covering TAM, SAM, and SOM, competitive landscape assessment, operational and HR plan, marketing and sales strategy, risk register with mitigation strategies, and a management presentation summary. Every business plan is tailored to your specific business and audience." },
      { q: "Why do I need a professional business plan when applying for finance in the UAE?", a: "UAE banks, development finance institutions (such as Mohammed Bin Rashid Fund and Khalifa Fund), and private investors all require a well-structured, professionally prepared business plan as part of their assessment process. A credible business plan with robust financial projections demonstrates that you understand your business, your market, and the risks involved, significantly increasing your chances of securing finance on favourable terms." },
      { q: "Can Assetica prepare a business plan for a new business launch in Dubai?", a: "Yes. We regularly prepare business plans for entrepreneurs launching new businesses in Dubai, including businesses seeking licences from DIFC, ADGM, and other UAE free zones and mainland authorities. Our plans include the market research, financial modelling, and operational planning required to support licensing applications, visa applications, and initial fundraising." },
      { q: "How detailed should financial projections be in a UAE business plan?", a: "For most purposes, whether bank financing, investor fundraising, or strategic planning, financial projections should cover a minimum of 3 years (typically 5 years for investor-facing plans) and include monthly projections for Year 1 and annual projections thereafter. Projections should include detailed revenue build-up by product or service line, cost structure, capital expenditure plan, working capital assumptions, and key financial ratios. Assetica builds all projections from the bottom up, with clearly documented and independently benchmarked assumptions." },
      { q: "How is a business plan different from a pitch deck?", a: "A business plan is a comprehensive, detailed document typically 20–50 pages long, covering all aspects of your business in depth. It is used for bank applications, regulatory submissions, and internal strategic planning. A pitch deck is a concise visual presentation of typically 12–15 slides, designed for investor meetings where you need to communicate your key points quickly and compellingly. Assetica offers both services, and they work best when developed together, ensuring total consistency between your detailed plan and investor presentation." },
      { q: "Can Assetica prepare a business plan for applying to the Mohammed Bin Rashid Fund, Khalifa Fund, or other UAE government funding programmes?", a: "Yes. Assetica regularly prepares business plans specifically tailored for UAE government-backed funding programmes including the Mohammed Bin Rashid Fund for SMEs, the Khalifa Fund for Enterprise Development, the Dubai SME Fund, and Sharjah Entrepreneurship Centre (Sheraa). Each programme has specific financial, operational, and sector criteria. Our business plans are structured to address these requirements directly, including the detailed financial projections, market analysis, and employment impact assessments that these programmes require from applicants." },
    ],
    related: ["financial-modelling", "building-pitch-deck", "business-valuation"],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const svc = slug ? services[slug] : null;

  const serviceSchema = svc ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": svc.title,
    "description": svc.intro,
    "provider": { "@type": "Organization", "name": "Assetica", "url": "https://assetica.net" },
    "areaServed": ["AE", "GB", "SA", "EU"],
    "url": `https://assetica.net/services/${slug}/`
  } : null;

  const faqSchema = svc && svc.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": svc.faqs.map((faq: { q: string; a: string }) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  } : null;

  const breadcrumbSchema = svc ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://assetica.net" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://assetica.net/services/" },
      { "@type": "ListItem", "position": 3, "name": svc.title, "item": `https://assetica.net/services/${slug}/` }
    ]
  } : null;

  if (!svc) return (
    <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <Navbar />
      <div className="pt-32 text-center">
        <h1 className="font-display font-bold text-2xl" style={{ color: "#012241" }}>Service not found</h1>
        <Link to="/services" className="text-[#4BD1A0] mt-4 inline-block">&larr; Back to Services</Link>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      <SEOHead
        title={`${svc.title} Services in Dubai & UAE | Assetica`}
        description={svc.intro.length > 155 ? svc.intro.slice(0, 155).replace(/\s\S+$/, '') + '\u2026' : svc.intro}
        canonical={`/services/${slug}`}
        schema={[serviceSchema, faqSchema, breadcrumbSchema].filter(Boolean) as object[]}
      />
      <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
      <Navbar />
      <div className="pt-[72px] px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden" style={{ height: "clamp(280px, 45vh, 420px)" }}>
          <img src={svc.image} alt={`${svc.title}, Assetica Dubai`} className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#012241]/50 via-[#012241]/60 to-[#012241]/80" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>{svc.subtitle}</p>
            <h1 className="font-display font-bold text-white text-3xl md:text-5xl max-w-3xl leading-tight">{svc.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#4BD1A0] transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" /> All Services
        </Link>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div>
            <AnimatedSection>
              <div className="bg-[#f0fdf8] border-l-4 border-[#4BD1A0] p-5 md:p-6 rounded-xl mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#4BD1A0" }}>Definition</p>
                <p className="text-slate-700 text-sm leading-relaxed">{svc.definition}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.05}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6">
                <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Overview</p>
                    <div className="w-8 h-0.5 bg-[#4BD1A0]" />
                  </div>
                  <div>
                    <p className="text-slate-800 text-lg md:text-xl leading-relaxed font-medium">{svc.intro}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6">
                <h2 className="font-display font-bold text-xl mb-6" style={{ color: "#012241" }}>What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {svc.points.map(p => (
                    <div key={p} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#4BD1A0" }} />
                      <span className="text-slate-600 text-sm leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6">
                <h2 className="font-display font-bold text-xl mb-6" style={{ color: "#012241" }}>Our Process</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {svc.process.map(s => (
                    <div key={s.step} className="flex gap-4">
                      <div className="text-2xl font-display font-bold shrink-0" style={{ color: "#4BD1A0" }}>{s.step}</div>
                      <div>
                        <h3 className="font-display font-semibold text-sm mb-1" style={{ color: "#012241" }}>{s.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Related Services */}
            {svc.related && svc.related.length > 0 && (
              <AnimatedSection className="mb-12">
                <h2 className="font-display font-bold text-xl mb-5" style={{ color: "#012241" }}>Related Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {svc.related.map(slug => {
                    const rel = services[slug];
                    if (!rel) return null;
                    return (
                      <Link key={slug} to={`/services/${slug}`}
                        className="group flex items-center justify-between bg-white border border-slate-100 rounded-xl px-5 py-4 hover:border-[#4BD1A0] hover:shadow-sm transition-all">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "#012241" }}>{rel.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{rel.subtitle}</p>
                        </div>
                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-[#4BD1A0] transition-colors flex-shrink-0 ml-3" />
                      </Link>
                    );
                  })}
                </div>
              </AnimatedSection>
            )}

            <FaqSection faqs={svc.faqs} title={`${svc.title}, Frequently Asked Questions`} subtitle={`Common questions about Assetica's ${svc.title.toLowerCase()} service in Dubai and globally.`} />
          </div>

          <div className="lg:sticky lg:top-28">
            <AnimatedSection direction="right">
              <div className="rounded-2xl p-6 mb-4 text-white" style={{ backgroundColor: "#012241" }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#4BD1A0" }}>Get Started</p>
                <h3 className="font-display font-bold text-lg mb-2">Request a Free Consultation</h3>
                <p className="text-white/60 text-sm mb-5">Speak to our experts about your specific valuation needs.</p>
                <Link to="/contact" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-bold text-sm" style={{ backgroundColor: "#4BD1A0", color: "#012241" }}>
                  Get in Touch <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a href="tel:+971529798302" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full font-semibold text-sm mt-2 border border-white/20 text-white">
                  +971 52 979 8302
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-display font-bold text-sm mb-3" style={{ color: "#012241" }}>Other Services</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { name: "Due Diligence", slug: "due-diligence" },
                    { name: "Business Structuring", slug: "business-structuring" },
                    { name: "Building Pitch Deck", slug: "building-pitch-deck" },
                    { name: "Financial Modelling", slug: "financial-modelling" },
                    { name: "Buyer & Seller Negotiation", slug: "buyer-seller-negotiation" },
                    { name: "Tax Valuation", slug: "tax-valuation" },
                    { name: "Strategic Value Advisory", slug: "strategic-value-advisory" },
                    { name: "Business Planning", slug: "business-planning" },
                  ]
                    .filter(s => s.slug !== slug)
                    .map(s => (
                    <Link key={s.slug} to={`/services/${s.slug}`} className="text-sm text-slate-500 hover:text-[#4BD1A0] transition-colors py-1 border-b border-slate-100 last:border-0">{s.name}</Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 pb-20">
        <AnimatedSection>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-100">
            <div className="text-center mb-6">
              <h2 className="font-display font-bold text-xl mb-1" style={{ color: "#012241" }}>Enquire About {svc.title}</h2>
              <p className="text-slate-500 text-sm">Fill in the form and our specialists will be in touch within 1 business day.</p>
            </div>
            <ContactForm />
          </div>
        </AnimatedSection>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default ServiceDetail;
