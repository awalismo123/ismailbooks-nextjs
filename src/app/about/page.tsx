import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ku Saabsan — IsmailBooks",
  description: "Baro wax badan oo ku saabsan IsmailBooks iyo ujeedkayaga.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F0]">
      <Navbar />
      
      <main className="flex-grow py-16 sm:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display mb-8 text-4xl font-extrabold text-[#201B16] sm:text-5xl">
              Ku Saabsan IsmailBooks
            </h1>
            
            <div className="prose prose-lg prose-p:text-[#6B5F52] prose-headings:font-display prose-headings:text-[#201B16] prose-a:text-[#1F3A54] max-w-none">
              <p className="text-xl font-medium leading-relaxed text-[#201B16]">
                IsmailBooks waa maktabad dhijitaal ah oo u heellan fidinta aqoonta iyo akhriska ku qoran afka Soomaaliga, iyadoo adeegsanaysa tignoolajiyada casriga ah si buugaagta looga dhigo kuwo la heli karo wakhti kasta iyo meel kasta.
              </p>
              
              <h2 className="mt-12 text-2xl font-bold">Ujeedkayaga</h2>
              <p>
                Ujeedkayagu waa inaan dhiirigelino akhriska iyo qoraalka afka Soomaaliga, innagoo fududaynayna sidii akhristayaasha Soomaaliyeed ay ku heli lahaayeen buugaag tayo leh oo isugu jira kuwo la tarjumay iyo kuwo asalka ah.
              </p>
              
              <h2 className="mt-12 text-2xl font-bold">Maxaan Bixinaa?</h2>
              <ul>
                <li><strong>Buugaag Tayo Leh:</strong> Waxaan soo xulnaa buugaagta ugu wanaagsan ee dhinacyada horumarka shaqsiga, falsafadda, iyo cilmiga maskaxda.</li>
                <li><strong>Akhris Fudud:</strong> Barnaamijkayaga akhriska (reader) wuxuu kuu ogolaanayaa inaad ku akhrisato buugaagta mobiilkaaga ama kombiyuutarkaaga si raaxo leh.</li>
                <li><strong>Qiimo Macquul ah:</strong> Waxaan bixinaa buugaag lacag la'aan ah iyo kuwo qiimo jaban oo qof walba goosan karo.</li>
              </ul>
              
              <h2 className="mt-12 text-2xl font-bold">Nala Soo Xiriir</h2>
              <p>
                Haddii aad qabto su'aal, talo ama tusaale, fadlan nagala soo xiriir WhatsApp-ka lambarka: <strong>+252 63 6475579</strong> ama ciwaanka emailka: <strong>info@ismailbooks.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
