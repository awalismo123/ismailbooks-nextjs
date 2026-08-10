import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xeerarka iyo Shuruudaha — IsmailBooks",
  description: "Akhri xeerarka iyo shuruudaha isticmaalka IsmailBooks iyo siyaasadda sirta.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0]">
      <Navbar />
      
      <main className="flex-grow py-16 sm:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display mb-8 text-4xl font-extrabold text-[#201B16] sm:text-5xl">
              Siyaasadda Sirta (Privacy Policy)
            </h1>
            
            <div className="prose prose-lg prose-p:text-[#6B5F52] prose-headings:font-display prose-headings:text-[#201B16] max-w-none">
              <p className="text-sm font-bold uppercase tracking-wider text-[#7A1F2B]">
                Cusboonaysiintii ugu dambaysay: 2026
              </p>
              
              <p className="mt-6">
                Soo dhawoow! IsmailBooks ("annaga", "yada") waxaa naga go'an inaan ilaalino sirtaada. Siyaasaddan sirta ayaa sharxaysa sida aan u ururino, u isticmaalno, una ilaalino macluumaadkaaga shakhsiyeed markaad booqato website-kayaga.
              </p>
              
              <h2 className="mt-12 text-2xl font-bold">1. Macluumaadka Aan Ururino</h2>
              <p>
                Markaad is-diiwaangeliso ama iibsato buug, waxaan ururinaa:
              </p>
              <ul>
                <li>Magacaaga (Username ama Full Name)</li>
                <li>Ciwaankaaga Emailka</li>
                <li>Macluumaadka lacag-bixinta (tixraaca lacag-bixinta, balse marna ma kaydino lambarada sirta ah ee bangigaaga)</li>
                <li>Xogta akhriska (boggaga aad akhrisay iyo waqtiga aad gelisay akhriska) si aan kuugu fududayno inaad dib uga bilowdo meeshii aad joojisay.</li>
              </ul>
              
              <h2 className="mt-12 text-2xl font-bold">2. Sida Aan U Isticmaalno Macluumaadkaaga</h2>
              <p>
                Macluumaadka aad na siiso waxaan u isticmaalnaa:
              </p>
              <ul>
                <li>Inaan ku siino marin u helka buugaagta aad iibsatay.</li>
                <li>Inaan kula socodsiino akhriskaaga iyo inaan kaydino meeshii aad ku joojisay buugga.</li>
                <li>Inaan kuu soo dirno ogeysiisyo ku saabsan adeegyadayada.</li>
                <li>Inaan horumarino khibradaada website-ka.</li>
              </ul>
              
              <h2 className="mt-12 text-2xl font-bold">3. Badbaadada Macluumaadkaaga</h2>
              <p>
                Waxaan isticmaalnaa tignoolajiyada casriga ah si aan u ilaalino macluumaadkaaga (sida Supabase iyo Vercel) oo leh nidaamyo ammaan oo heer caalami ah. Marna cid saddexaad kama iibino macluumaadkaaga shakhsiyeed.
              </p>
              
              <h2 className="mt-12 text-2xl font-bold">4. Xaquuqdaada</h2>
              <p>
                Waxaad xaq u leedahay inaad dalbato in la tirtiro akoonkaaga iyo dhammaan xogtaada. Si aad sidaas u samayso, fadlan nagala soo xiriir qaybta caawimada.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
