INSERT INTO "admin_users" ("id", "username", "password_hash", "created_at") VALUES
(1, 'ismail abdi', '$2y$10$oaDRADva9AQ1RSyiSups..J8Eouz4P85ahn0zn7EQgdCrJmP7323K', '2025-10-22 14:46:26');
INSERT INTO "blog_categories" ("id", "name", "name_so", "slug", "description", "description_so", "icon", "color", "sort_order", "post_count", "is_active", "created_at", "updated_at") VALUES
(1, 'Psychology', 'Cilmiga Maskaxda', 'psychology', 'Mental health, behavior, and cognitive science', 'Caafimaadka maskaxda, dhaqanka, iyo cilmiga garashada', 'bi bi-tag', '#9b59b6', 1, 1, 1, '2026-02-08 14:31:36', '2026-05-27 23:07:02'),
(2, 'Philosophy', 'Falsafada', 'philosophy', 'Wisdom, ethics, and the meaning of life', 'Xigmadda, akhlaaqda, iyo macnaha nolosha', 'bi-lightbulb', '#3498db', 2, 3, 1, '2026-02-08 14:31:36', '2026-02-14 23:17:41'),
(3, 'Self-Improvement', 'Horumar Shaqsiyeed', 'self-improvement', 'Personal growth and development', 'Kobcinta iyo horumarka shaqsiyeed', 'bi-graph-up-arrow', '#2ecc71', 3, 3, 1, '2026-02-08 14:31:36', '2026-06-15 18:53:31'),
(4, 'Islamic Perspective', 'Aragtida Islaamka', 'islamic-perspective', 'Islamic views on psychology and philosophy', 'Aragtida Islaamka ee cilmiga maskaxda iyo falsafada', 'bi-book', '#70193D', 4, 0, 1, '2026-02-08 14:31:36', '2026-02-08 14:31:36'),
(5, 'Book Reviews', 'Dib-u-eegista Buugaagta', 'book-reviews', 'Reviews and analysis of books', 'Dib-u-eegis iyo falanqayn buugaag', 'bi-star', '#f39c12', 5, 0, 1, '2026-02-08 14:31:36', '2026-02-08 14:31:36'),
(6, 'Mental Health', 'Caafimaadka Maskaxda', 'mental-health', 'Tips and guidance for mental wellness', 'Tilmaamo iyo hagid caafimaad maskaxeed oo wanaagsan', 'bi-heart-pulse', '#e74c3c', 6, 0, 1, '2026-02-08 14:31:36', '2026-02-08 14:31:36'),
(7, 'dark psychology', NULL, 'dark-psychology', '', NULL, 'bi bi-chat-dots', '#70193d', 0, 0, 1, '2026-04-01 00:23:29', '2026-04-01 00:23:29'),
(8, 'general knowledge', 'Aqoon guud', 'general-knowledge', '', NULL, 'bi bi-chat-dots', '#5ff769', 0, 4, 1, '2026-05-25 18:20:32', '2026-06-12 17:50:12');
INSERT INTO "blog_posts" ("id", "title", "slug", "excerpt", "content", "featured_image", "featured_image_alt", "category_id", "author_id", "meta_title", "meta_description", "meta_keywords", "focus_keyword", "status", "is_featured", "allow_comments", "view_count", "comment_count", "share_count", "estimated_read_time", "published_at", "scheduled_at", "created_at", "updated_at") VALUES
(1, 'Ku Soo Dhawoow Adduunka Falsafadda: Ma Doonaysaa Inaad Maskaxdaada Tuujiso?', 'ku-soo-dhawoow-adduunka-falsafadda-ma-doonaysaa-inaad-maskaxdaada-tuujiso', 'Ma isweydiisay mar uun su’aalaha nolosha ugu waaweyn ee aan inta badan jawaabta fudud loo helin? Ma doonaysaa inaad ogaato farqiga u dhexeeya sida uu saynisyahanku wax u arko iyo sida uu faylasuufku wax u eego?', '<p style="line-height: 1.5;"><span style="font-size: 14pt;"><span class="ng-star-inserted">Maanta waxaynu milicsan doonaa cutubka koowaad ee buugga caanka ah ee </span><strong class="ng-star-inserted"><span class="ng-star-inserted">Thomas Nagel</span></strong><span class="ng-star-inserted">&nbsp;ee cinwaankiisu yahay&nbsp;</span><span class="ng-star-inserted">"What Does It All Mean?"</span><span class="ng-star-inserted">&nbsp;(Maxay wax kastaa ka dhigan yihiin?), kaas oo uu af-soomaali u rogay&nbsp;</span><strong class="ng-star-inserted"><span class="ng-star-inserted">Ismail Abdi Ismail</span></strong><span class="ng-star-inserted">.</span></span></p>
<h3 class="ng-star-inserted" style="line-height: 1.5;"><span class="ng-star-inserted" style="font-size: 14pt;">Falsafaddu Maaha Wax Ku Kooban Jaamacadaha</span></h3>
<p style="line-height: 1.5;"><span class="ng-star-inserted" style="font-size: 14pt;">Dad badan waxay u haystaan in falsafaddu tahay maado adag oo loogu talagalay dadka waaweyn ama ardayda jaamacadaha oo keliya. Laakiin Nagel wuxuu inoo sheegayaa in falsafaddu ay tahay mid u furan qof kasta oo raba inuu "maskaxdiisa tuujiyo". Xitaa haddii aadan aqoon hore u lahayn, waxaad ka faa&rsquo;iideysan kartaa barashada falsafadda haddii aad tahay qof isweydiiya Su''aalahan:</span></p>
<ol class="ng-star-inserted">
<li class="ng-star-inserted" style="line-height: 1.1; font-size: 14pt;">
<p class="ng-star-inserted"><span class="ng-star-inserted" style="font-size: 14pt;">Maxaa run ah ee jira?</span></p>
</li>
<li class="ng-star-inserted" style="line-height: 1.1; font-size: 14pt;">
<p class="ng-star-inserted"><span class="ng-star-inserted" style="font-size: 14pt;">Wax walba ma ogaan karnaa?</span></p>
</li>
<li class="ng-star-inserted" style="line-height: 1.1; font-size: 14pt;">
<p class="ng-star-inserted"><span class="ng-star-inserted" style="font-size: 14pt;">Maxaa sax ah, maxaase khaldan?</span></p>
</li>
<li class="ng-star-inserted" style="line-height: 1.1; font-size: 14pt;">
<p class="ng-star-inserted" style="line-height: 1.1;"><span class="ng-star-inserted" style="font-size: 14pt;">Waa maxay macnaha noloshu?</span></p>
</li>
</ol>
<h3 class="ng-star-inserted" style="line-height: 1.5;"><span class="ng-star-inserted" style="font-size: 14pt;">Maxay Falsafaddu uga Duwan tahay Sayniska iyo Xisaabta?</span></h3>
<p class="ng-star-inserted" style="line-height: 1.5;"><span class="ng-star-inserted" style="font-size: 14pt;">Cutubka koowaad wuxuu si cad u kala saarayaa habka ay aqoontu u shaqeyso:</span></p>
<ul class="ng-star-inserted">
<li class="ng-star-inserted" style="font-size: 14pt;">
<p class="ng-star-inserted"><span style="font-size: 14pt;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Sayniska:</span></strong><span class="ng-star-inserted"> Wuxuu ku tiirsan yahay tijaabooyin iyo baadhis. Tusaale ahaan, saynisyahanku wuxuu bartaa sida ay u shaqeeyaan atom-yada iyo cufis-jiidadka (gravity).</span></span></p>
</li>
<li class="ng-star-inserted" style="font-size: 14pt;">
<p class="ng-star-inserted"><span style="font-size: 14pt;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Xisaabta:</span></strong><span class="ng-star-inserted">&nbsp;Waxay leedahay xeerar adag iyo qaacidooyin lagu xalliyo dhibaatooyinka nambarada.</span></span></p>
</li>
<li class="ng-star-inserted" style="font-size: 14pt;">
<p class="ng-star-inserted"><span style="font-size: 14pt;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Falsafadda:</span></strong><span class="ng-star-inserted"> Iyadu ma isticmaasho tijaabooyin iyo shaybaadho (lab) ama qaacidooyin go&rsquo;an sida xisaabta. Falsafaddu waa sahaminta fikradaha. Halkii taariikhyahanku isweydiin lahaa&nbsp;</span><span class="ng-star-inserted">"Maxaa dhacay waqtigii hore?"</span><span class="ng-star-inserted">, faylasuufku wuxuu isweydiiyaa&nbsp;</span><span class="ng-star-inserted">"Waa maxay waqti laftiisu?"</span><span class="ng-star-inserted">.</span></span></p>
</li>
</ul>
<h3 class="ng-star-inserted"><span class="ng-star-inserted" style="font-size: 14pt;">Maxaa Falsafadda ka Dhigay Mid Adag?</span></h3>
<p class="ng-star-inserted"><span style="font-size: 14pt;"><span class="ng-star-inserted">Sababta ay falsafaddu u adag tahay maaha inaan la fahmi karin, laakiin waxay ka hadashaa arrimaha "asaasiga ah" ee nolosheenna. Waxay isku daydaa inay fahamto waxyaabaha aan maalin kasta isticmaalo laakiin aynaan ka fikirin, sida: </span><strong class="ng-star-inserted"><span class="ng-star-inserted">Waqtiga, Nambarada, Aqoonta, iyo Saxa &amp; Khaladka.</span></strong></span></p>
<p class="ng-star-inserted"><span style="font-size: 14pt;"><span class="ng-star-inserted">Maadaama aysan jirin aalado (tools) lagu cabbi karo su''aalahan si loo helo jawaab cad, falsafaddu waxay ku tiirsan tahay oo keliya </span><strong class="ng-star-inserted"><span class="ng-star-inserted">maskaxdaada</span></strong><span class="ng-star-inserted">&nbsp;iyo inaad si qoto dheer u fikirto adigoon waxba iska qiyaasayn.</span></span></p>
<h3 class="ng-star-inserted"><span class="ng-star-inserted" style="font-size: 14pt;">Gunaanad: Sidee u Isticmaali Kartaa Falsafadda?</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="font-size: 14pt;">Thomas Nagel wuxuu inoo soo jeedinayaa in falsafaddu tahay safar aad adigu iska leedahay. Xitaa haddii qoraaga buuggu uu aragtidiisa kula wadaago, waajib kuguma aha inaad ku raacdo arigtidiisa ilaa ay maskaxdaadu ku qanacdo mooyee.</span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="font-size: 14pt;">Falsafaddu waa inaad adigu wax is-weydiisid oo aad baadho jawaabaha adiga kula saxan. Markaa, diyaar u tahay inaad bilowdo safarkaaga falsafadeed?</span></p>
<p style="line-height: 1.5;">&nbsp;</p>', 'img_20260529_180211_0df42b7aea85d0a1.webp', 'Hordhaca Falsafadda', 2, 1, 'waa maxay falsafaddu?', 'Baro waxa ay tahay falsafaddu iyo sida ay uga duwan tahay sayniska iyo xisaabta. Cutubka 1-aad ee buugga Thomas Nagel oo lagu falanqeeyay hordhaca falsafadda.', 'Falsafadda Soomaali, Thomas Nagel Soomaali, Barashada Falsafadda, Waa maxay Falsafaddu, Ismail Abdi Ismail, Hordhaca Falsafadda, What Does It All Mean Somali, Fikirka Maskaxda.', 'Hordhac Falsafaddu', 'published', 0, 1, 200, 0, 0, 2, '2026-02-08 21:56:00', NULL, '2026-02-08 21:26:02', '2026-07-19 08:02:06'),
(2, 'Adduunka Kugu Hareeraysani Ma Run Baa Mise Waa Riyo? (Cutubka 2-aad)', 'adduunka-kugu-hareeraysani-ma-run-baa-mise-waa-riyo-cutubka-2-aad', 'Horta waligaa ma isweydiisay: "Sideen ku ogaan karaa in waxa aan arkayo ay dhab u jiraan ama dhab yihiin iyo in kale?" Cutubka labaad ee buugga Thomas Nagel, waxaynu egaynaa su’aal maskaxda tuujinaysa oo ku saabsan sida aynu u ogaano wax kasta oo inagu xeeran.', '<h3 class="ng-star-inserted" style="text-align: center;"><span class="ng-star-inserted">Sidee bay dareen-wadayaasha iyo maskaxdu u wada shaqeeyaan?</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Dareen-wadayaasha waxa ka mid ah <strong>aragga</strong>, <strong>maqalka</strong>, <strong>taabashada</strong> iyo <strong>urta</strong>, waana waxa kaa caawiya inaad la falgasho oo aad ogaato adduunka kugu xeeran. Markaad wax eegto ama aad wax aragto, indhahaagu waxay fariin danabaysan (signal) u diraan maskaxdaada, markaasay maskaxdu turjuntaa fariintaas ay xididdada indhuhu u soo gudbiyeen.</span></p>
<ul>
<li>
<p><strong>Aragga</strong>: Haddii aad aragto buug yaalla miiska dushiisa, indhahaaga ayaa sawirka buuggaas fariin ahaan ugu diraya maskaxdaada, kadibna maskaxdaada ayaa ku odhanaysa: &ldquo;Waxaasi waa buug&rdquo;.</p>
</li>
<li>
<p><strong>Taabashada</strong>: Haddii jidhkaagu taabto dhulka, fariin ayaa u gudbaysa maskaxda, markaasay maskaxdu kuu sheegaysaa in waxa aad taabatay uu yahay &ldquo;dhul&rdquo;.</p>
</li>
</ul>
<p>Dhibaatadu waxay tahay haddaba in waxaas oo dhan ay ka dhex dhacayaan gudaha maskaxdaada. Ilaa maskaxdaadu turjunto fariinta uga imanaysa jidhka mooyaane, si kale uma ogaan kartid waxa ka dhacaya adduunka kugu hareeraysan. Sidaa darteed, <strong>waxa kaliya ee aad boqolkiiba boqol hubto waa waxa ay maskaxdaadu kuu sheegto</strong>&nbsp; sida fikradahaaga, dareenkaaga, iyo waayo-aragnimadaada.</p>
<p>Haddii aad is-tidhaahdo &ldquo;waan arkayaa waxan, markaa waa dhab,&rdquo; waxaad weli ku tiirsan tahay dareen-sideyaashaada, kuwaas oo iska noqon kara kuwo been kuu sheegaya.</p>
<h3 class="ng-star-inserted" style="text-align: center;"><span class="ng-star-inserted">Ma aamini karnaa fariimaha inooga imanaya dareen-wadayaasha?</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Dareen-wadayaashu mararka qaar way na khiyaami karaan. Buuggu wuxuu inoo soo bandhigayaa saddex tusaale oo muhiim ah:</span></p>
<ol>
<li class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Dhalanteedka Indhaha (Optical Illusions):</span></strong> <span class="ng-star-inserted">Markaad meel fog ka soo aragto qori biyo ku dhex jira, wuxuu kuula muuqan doonaa inuu qalloocan yahay, laakiin dhab ahaan wuu toosan yahay. Indhahaaga ayunbaa ku siraya oo maskaxdaada fariin qaldan u gudbinaya.</span></li>
</ol>
<ol class="ng-star-inserted">
<li class="ng-star-inserted">
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Riyooyinka:</span></strong><span class="ng-star-inserted"> Markaad huruddo ee aad riyoonayso, wax walba waxay kula yihiin run, inkastoo aanay adduunka dhabta ah ka dhacayn waxaasi. Waxaad moodaysaa inaad gaadhi waddo ama dad la sheekaysanayso, laakiin markaad soo toosto ayaad ogaataa inay riyo ahayd. Su&rsquo;aashu waxay tahay </span><span class="ng-star-inserted">Sideed ku ogaan kartaa in hadda aadan riyoonayn? cadeyn ma u heysaa in aadan hadda riyooneyn. Laga yaabaa inaad tidhaahdid "waayo waan taaban karaa miiska ama waxbaan arkayaa," laakiin riyada dhexdeedaba wax baad ku taabataa! Markaa, maba jiro "proof iyo cadeyn" dhab ah oo aad ku kala saari karto riyada iyo waaqica.</span></p>
</li>
<li class="ng-star-inserted">
<p class="ng-star-inserted"><strong class="ng-star-inserted"><span class="ng-star-inserted">Mala-awaalka (Hallucinations):</span></strong><span class="ng-star-inserted"> Dadka qaar ayaa laga yaabaa inay arkaan ama maqlaan waxyaabo aan meeshaba ka jirin, waayo dareen-wadayaashooda ayaa siinaya maskaxda xog khaldan, maskaxduna xogtaa khaldan ayay turjumeysaa.&nbsp;<br><br></span><span class="ng-star-inserted"><strong>ogow:</strong> Maskaxdu iskeed uma kala saarto in waxaasi run yihiin iyo in kale; waxay uun turjumaysaa fariimaha ay dareen-wadayaashu u soo gudbiyaan. Sidaa darteed, ma aamini karno inay mar walba run inoo sheegayaan, waayo ma haysanno caddayn ka baxsan dareen-wadayaashaas aan ka shakisanahay.</span></p>
</li>
</ol>
<h3 class="ng-star-inserted" style="text-align: center;"><span class="ng-star-inserted">Ma adigoo keliyaa jira? (Solipsism)</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Halkan waxaynu ku eegaynaa aragti cajiib ah oo la yidhaahdo </span><strong class="ng-star-inserted"><span class="ng-star-inserted">Solipsism</span></strong><span class="ng-star-inserted">. </span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted">Aragtida&nbsp;<strong>Solipsism</strong> waa mid ka mid ah doodaha ugu yaabka badan ee falsafadda ku jira, taas oo su''aal gelinaysa jiritaanka wax kasta oo ka baxsan maskaxdaada. Halkan waxaan kugu sharaxayaa nuxurka aragtidan:<br><br><strong>Solipsism</strong> waa aragti falsafadeed oo soo jeedinaysa in aanu jirin adduun ka baxsan kan maskaxdaada ka dhex samaysan. Marka la eego aragtidan, ma jiraan xiddigo, dhul, cir, iyo dad toona; waxa kaliya ee jira waa adiga iyo fikirka madaxaaga ku jira.<br></span></p>
<ul>
<li>
<p><strong>Ma jiro Adduun Dibadeed</strong>: Aragtidu waxay leedahay wax kasta oo aad qabato ama aad aragto dhab ma aha. Tusaale ahaan, dadka aad la hadasho ama buugaagta aad akhrido laga yaabaa inay yihiin uun wax ay maskaxdaadu kuu sheegayso balse aanay dhab ahaan u jirin.</p>
</li>
<li>
<p><strong>Jidhkaaga oo aad ka Shakido</strong>: Xitaa waxa laga yaabaa in uusan jidhkaagu run ahayn amaba uusan jirinba. Waxaad u aaminsan tahay inuu jidhkaagu jiro uun sababtoo ah waxaad rumaysanaysaa dareen-wadayaashaada, laakiin ma haysid caddayn kale oo intaas dhaafsiisan.</p>
</li>
<li>
<p><strong>Sida Riyada oo kale</strong>: Fikraddani waxay u dhowdahay sida riyada. Markaad riyoonayso, wax walba waxay kuula muuqdaan dhab, laakiin dhab ahaantii waxay ka dhex dhacayaan uun gudaha maskaxdaada. Solipsism-ku wuxuu is-weydiinayaa: "Maan la is-odhan karayn adduunkuba waa maskaxdaada dhexdeeda oo ma jiro adduun ka baxsan?".</p>
</li>
<li>
<p><strong>Waxa kaliya ee aad Hubto</strong>: Sida buugga ku qoran, waxa kaliya ee aad si dhab ah u hubto waa waxa ka dhacaya gudaha maskaxdaada sida fikirkaaga, dareenkaaga, iyo waayo-aragnimadaada.</p>
</li>
</ul>
<h3><span style="font-size: 12pt;">Maxay u adag tahay in la beeniyo?</span></h3>
<p>Dhibaatada taagan waxay tahay inaanad caddayn karin inuu jiro adduun dhab ah oo ka baxsan maskaxdaada. Haddii aad tidhaahdo "waan arkayaa geedkaa, markaa waa dhab oo wuu jiraa," weli waxaad ku tiirsan tahay dareen-wadayaashaada (aragga), kuwaas oo la ogaaday inay mararka qaar dadka siri karaan oon lagu kalsoonaan karin , cadeyna kuma noqon karaan.&nbsp;</p>
<p>In kasta oo aragtida solipsism-ku ay u muuqato mid xagjir ah oo laga yaabo inaan la aqbalin, haddana markaad si qoto dheer uga fikirto, ma jirto caddayn buuxda oo muujinaysa inuu jiro adduun maskaxdaada ka baxsan. wax kastaa waxay ka dhex dhacaan maskaxdaada.&nbsp;</p>
<p class="ng-star-inserted">&nbsp;</p>
<h3 class="ng-star-inserted" style="text-align: center;"><span class="ng-star-inserted">Skepticism iyo Xasuusta</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Haddii aad su&rsquo;aalo iska weydiinayso inuu jiro adduun dhab ah iyo in kale, waxaad adeegsanaysaa qaab-fikirka loo yaqaan&nbsp;</span><strong class="ng-star-inserted"><span class="ng-star-inserted">Skepticism</span></strong><span class="ng-star-inserted">.<br></span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted"><span class="ng-star-inserted" data-start-index="10"><strong>Skepticism</strong> waa qaab-fikirka aad su&rsquo;aalaha iskaga weydiinayso inuu jiro adduun dhab ah iyo in kale. Waa qaab aad wax isku weydiinayso oo aad su&rsquo;aal gelinayso wax walba oo adduunka ku saabsan, adigoo is-leh: &ldquo;Ka warran haddii aysan run ahayn ama aysan jirinba wax walba oo aan arko ama dareemo &ndash; oo ay kaliya maskaxdaydu samaynayso un?&rdquo;</span></span></p>
<div class="paragraph normal ng-star-inserted" data-start-index="1401">
<p>Skepticism-ku wuxuu ku dhisanyahay dhowr qodob oo muhiim ah:</p>
<ul>
<li><strong>Shakiga Dareen-wadayaasha</strong>:</li>
</ul>
<p>Xitaa haddii uu jiro adduun dhab ahi, skepticism-ku wuxuu leeyahay ma aamini kartid waxaad arkayso ama dareemayso. Sababtoo ah dareen-wadayaasha fariimaha u gudbiya maskaxda (sida aragga, maqalka, iyo taabashada) waxay mararka qaarkood noqon karaan kuwo ku marin-habaabinaya ama ku siri kara, iyagoo kuu sheegaya wax aan meeshaba oollin.</p>
<ul>
<li><strong>Mala-awaalka iyo Riyooyinka</strong>:</li>
</ul>
<p>Waxaad is-weydiinaysaa in wax kasta oo aad la kulantaa ay yihiin riyo ama mala-awaal. Maadaama riyada dhexdeeda wax kasta ay dhab u u ekaadaan, skepticism-ku wuxuu soo jeedinayaa in laga yaabo inay wax kasta ka dhex dhacayaan gudaha maskaxdaada, oo aanay jirin caddayn buuxda oo muujinaysa inuu jiro adduun ka baxsan.</p>
<ul>
<li><strong>Shakiga Xasuusta</strong>:</li>
</ul>
<p>Skepticism-ku wuxuu xitaa su''aal geliyaa xasuustaada. Tusaale ahaan, sideed ku ogaan kartaa inaanay maskaxdaada hadda un lagu shubin xogta aad u haysato inay dhacday 5 daqiiqo ka hor? Maadaama xasuustu ay tahay xog maskaxda ku kaydsan, way qaldami kartaa ama way ku siri kartaa.</p>
<p>Marka la soo koobo, skepticism waa qaab-fikir kugu dhiirrigelinaya inaad ka shakido xaqiiqada wax kasta oo aad dareemayso ama aad xasuusato, adigoo is-weydiinaya haddii ay jiraan sharaxaad kale oo ka duwan kuwa aad hadda aaminsan tahay.</p>
</div>
<h3 class="ng-star-inserted"><span class="ng-star-inserted">Maxaynu ka baranaynaa halkan?</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Saynisku inoogama jawaabi karo su&rsquo;aalahan, waayo saynisyahannadu laftoodu waxay isticmaalaan dareen-wadayaashooda si ay wax u tijaabiyaan. Haddii aynaan ku kalsoonaan karin dareen-wadayaasheenna, sideen u aamini karnaa waxa uu saynisku inoo sheegayo?</span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted">Ugu dambayn, cutubkani wuxuu inoo sheegayaa in falsafaddu tahay safar aad adigu iska leedahay. Waa inaad adigu wax is-weydiisid oo aad baadho jawaabaha adiga kula saxan.</span></p>', 'img_20260529_180139_295b827a223ac0aa.webp', 'Sidee baan ku ogaana wax walba', 2, 1, 'sidee baan ku ogaana wax walba-thomas-nagel', 'Ma dhab baa adduunka aad arkayso mise waa fariimo maskaxdaada ku jira? Akhri falanqaynta Cutubka 2-aad ee buugga Thomas Nagel iyo aragtida Solipsism-ka.', 'Thomas Nagel Soomaali, Sidee baan ku ogaana wax walba, Solipsism Soomaali, Skepticism Soomaali, Ismail Abdi Ismail, Falsafadda Soomaalida, Ma run baa adduunku.', 'Sidee baan ku ogaana wax walba', 'published', 0, 1, 187, 0, 0, 6, '2026-02-08 23:33:00', NULL, '2026-02-08 22:56:18', '2026-07-19 08:01:57'),
(3, 'Dhibaatada Maskaxaha Kale: Ma Isku si Baan Wax u Dareennaa?', 'dhibaatada-maskaxaha-kale-ma-isku-si-baan-wax-u-dareennaa', 'Qoraalkani wuxuu si qoto dheer u lafa-gurayaa mawduuca loo yaqaan "dhibaatada maskaxaha kale." In kasta oo aynu arki karno dadka kale, maqli karno waxay sheegayaan, xitaa eegi karno gudaha jidhkooda, haddana ma jirto si aynu u ogaan karno waxa maskaxdooda ka dhex dhacaya ama sida ay wax u dareemayaa', '<p><span style="font-size: 18pt;"><span class="ng-star-inserted" data-start-index="1075">Waxaynu ognahay inaynu leenahay maskax iyo waayo-aragnimo inoo gaar ah. Laakiin sideen ku ogaan karnaa in dadka kale iyo xayawaannadu ay sida inaga oo kale maskax iyo dareen leeyihiin? Su&rsquo;aashan waxaa la yidhaahdaa </span><strong class="ng-star-inserted" data-start-index="1285">"dhibaatada maskaxaha kale" (the problem of other minds).</strong></span></p>
<div class="paragraph normal ng-star-inserted" data-start-index="1342"><span style="font-size: 18pt;"><strong class="ng-star-inserted" data-start-index="1342">Ma ogaan karnaa inay dadka kale sideenoo kalaa wax u dareemaan?</strong> <span class="ng-star-inserted" data-start-index="1406">Tusaale ahaan, adiga iyo saaxiibkaa ayaa cunay jalaato. Sideed ku ogaan kartaa inaad labadiinuba isku si u dhadhaminaysaan shukulaatada?</span><span class="ng-star-inserted" data-start-index="1542"> Waxa laga yaabaa inay adiga shukulaatadu si gaar ah kuugu dhadhamaysay, laakiin saaxiibkaa uu dhadhankiisu kaa duwan yahay oo ay isaga shukulaatadu u tahay </span><strong class="ng-star-inserted" data-start-index="1699">xabxab ama qare.</strong></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1342">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" data-start-index="1342"><span style="font-size: 18pt;">Haddii aad is-tidhaahdo " jalaatada saaxibkaa dhadhami," weli adigii uun baa dhadhaminaya oo qaabkii uu dhadhankaagu ahaa&nbsp; unbuu noqonayaa mar walba. Ma haysid ama maad helin jid aad ku gasho maskaxdiisa si aad u ogaato "macaanka" isaga u muuqda iyo siduu wax u dhadhaminayo.</span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1342">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" data-start-index="1342">
<div class="paragraph normal ng-star-inserted" style="text-align: center;" data-start-index="1946"><span style="font-size: 18pt;"><strong class="ng-star-inserted" data-start-index="1946">Xaaladda Midabbada</strong> </span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1946"><span style="font-size: 18pt;"><span class="ng-star-inserted" data-start-index="1965">Waxa isna la mid ah midabbada. Markuu saaxiibkaa yidhaa &ldquo;gaadhigaasi waa casaan,&rdquo; sideed ku ogaan kartaa in casaanka uu sheegayo uu la mid yahay ka aad taqaanid?&nbsp;</span><span class="ng-star-inserted" data-start-index="2126"> Waxa laga yaabaa in waxa uu saaxiibkaa casaanka u yaqaan inaad adigu u taqaanid </span><strong class="ng-star-inserted" data-start-index="2207">&ldquo;huruud ama jaale&rdquo;</strong><span class="ng-star-inserted" data-start-index="2225">, laakiin isagu uu "casaan" ugu yeedho waayo waa kalmadda uu u bartay midabkaas.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1946">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" style="text-align: center;" data-start-index="2305"><span style="font-size: 18pt;"><strong class="ng-star-inserted" data-start-index="2305">Dadka kale ma noqon karaan sida Robots?</strong> </span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2305"><span style="font-size: 18pt;"><span class="ng-star-inserted" data-start-index="2345">Haddii aan sii wadno su&rsquo;aal is-waydiinta, waxaa xitaa laga yaaba inaan is-weydiino: horta dadka kale sideenoo kale miyay u miyir-qabaan.</span><span class="ng-star-inserted" data-start-index="2481"> Waxa laga yaabaa inay yihiin </span><strong class="ng-star-inserted" data-start-index="2511">sida mashiinnada ama robots-ka</strong><span class="ng-star-inserted" data-start-index="2541"> oo kale, kuwaas oo u dhaqma sidii kuwo wax dareemaya laakiin gudaha aan waxba ka dareemayn.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2305">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" style="text-align: center;" data-start-index="2633"><span style="font-size: 18pt;"><strong class="ng-star-inserted" data-start-index="2633">Ka warran Xayawaanka iyo Dhirta?</strong> </span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2633"><span style="font-size: 18pt;"><span class="ng-star-inserted" data-start-index="2666">Dad badan baa aaminsan in eeyaha ama shimbiruhu leeyihiin dareenno. Laakiin ka warran kalluunka, cayayaanka, ama xitaa dhirta iyo kombuyuutarrada?</span><span class="ng-star-inserted" data-start-index="2812"> Ma isleedahay waxay leeyihiin dareen ama khibrad? Dhibtu waxay tahay: si toos ah uma arki karno waxay dareemayaan, markaa ma garanayno inay leeyihiin dareenno sideenoo kale ah iyo in kale.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2633">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" data-start-index="3001"><span style="font-size: 18pt;"><strong class="ng-star-inserted" data-start-index="3001">Gunaanad: </strong></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="3001"><span style="font-size: 18pt;"><strong class="ng-star-inserted" data-start-index="3001">Maxaynu si dhab ah u ogaan karnaa?</strong> <strong class="ng-star-inserted" data-start-index="3046">Maskaxda keliya ee aan hubno inay jirto waa teena.</strong><span class="ng-star-inserted" data-start-index="3096"> Si boqolkiiba boqol ah uma ogaan karno waxay dadka kale ka fekerayaan ama dareemayaan. Waxa suurto-gal ah inay jiraan dhawr noole oo miyir-qaba, amaba se waxa laga yaabaa inay intaa ka badnaadaan.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="3001">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" style="text-align: center;" data-start-index="3001"><span style="font-size: 18pt;"><span class="ng-star-inserted" data-start-index="3096">jidhka iyo maskaxdu ma laba shay oo kala duwanbaa mise waa isku mid? La soco qoraalka dambe oo aynu ku lafa-gurayno "Dhibaatada Maskaxda iyo Jidhka."</span></span></div>
</div>
<div class="paragraph normal ng-star-inserted" data-start-index="1342">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" data-start-index="1342">&nbsp;</div>
<p>&nbsp;</p>', 'img_20260529_180107_7292cd8285ca8691.webp', 'maskaxaha kale', 2, 1, 'Ma Ogaan Karnaa Waxa ka Socda Maskaxda Dadka Kale? | Falsafadda Thomas', 'Baro "Dhibaatada Maskaxaha Kale." Ma is-weydiisay inay dadka kale u miyir-qabaan sidaada oo kale mise waa mashiinno?', 'Falsafadda, Maskaxaha Kale, Thomas Nagel, Ismail Abdi Ismail, Miyir-qabka, Dhibaatada Maskaxda, Dareenka, Solipsism, Fikirka, Somaliphilosophy.', 'Maskaxaha Kale (Other Minds).', 'published', 0, 1, 128, 0, 0, 2, '2026-05-29 18:00:00', NULL, '2026-02-14 23:00:25', '2026-07-16 18:36:14'),
(4, 'Isla-waynidu Waa Cadaw: Ma Og-tahay in Cadawgaagu uu Gudahaaga Ku Jiro?', 'isla-waynidu-waa-cadaw-ma-og-tahay-in-cadawgaagu-uu-gudahaaga-ku-jiro', 'Buuggan "Ego is the Enemy" wuxuu sharaxayaa khatarta ay leedahay isla-waynidu iyo sida ay u burburiso guusha. Baro muhiimada "Student Mindset" iyo is-hoosaysiinta.', '<div class="paragraph heading3 ng-star-inserted" style="text-align: center;" role="heading" data-start-index="1123" aria-level="3"><span style="font-family: georgia, palatino, serif;"><strong class="ng-star-inserted" data-start-index="1123">Waa Maxay Isla-waynidu (Ego)?</strong></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1152"><span style="font-family: georgia, palatino, serif;"><span class="ng-star-inserted" data-start-index="1152">Buuggan la magac baxay </span><strong class="ng-star-inserted" data-start-index="1175">&ldquo;EGO IS THE ENEMY&rdquo;</strong><span class="ng-star-inserted" data-start-index="1193">, waxa uu inoo sharaxayaa sida ay isla-waynidu nolosha qofka u burburin karto iyo dhibaatada ay leedahay</span><span class="ng-star-inserted" data-start-index="1297">. </span><span class="ng-star-inserted" data-start-index="1297">Qoraaga Ryan Holiday waxa uu "ego" ku qeexay inay tahay </span><strong class="ng-star-inserted" data-start-index="1355">is-mahadinta badan</strong><span class="ng-star-inserted" data-start-index="1373"> ama inuu qofku ismoodo wax uusan ahayn, taas oo ah mid xad-dhaaf ah.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1152">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" style="text-align: center;" data-start-index="1152"><span class="ng-star-inserted" style="font-family: georgia, palatino, serif;" data-start-index="1373"><strong class="ng-star-inserted" data-start-index="1442">Isla-waynida iyo Dunida Maanta</strong> .</span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1152"><span class="ng-star-inserted" style="font-family: georgia, palatino, serif;" data-start-index="1373"><span class="ng-star-inserted" data-start-index="1473">Dunida aan maanta ku noolnahay, gaar ahaan waqtigan uu isticmaalka intarneedku kor u kacay, waxaa aad loo buunbuuniyaa inuu qofku isla-waynaado ama uu ismoodo wax uusan ahayn in ka badan waqtiyadii hore.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1152"><span class="ng-star-inserted" style="font-family: georgia, palatino, serif;" data-start-index="1373"><span class="ng-star-inserted" data-start-index="1473">Si aad ugu noolaato nolol wanaagsan, hamigaagana aad u rumeeyo, waxaa muhiim ah inaad naftaada si sax ah u fahanto.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1152">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" data-start-index="1152">
<div class="paragraph heading3 ng-star-inserted" style="text-align: center;" role="heading" data-start-index="1792" aria-level="3"><span style="font-family: georgia, palatino, serif;"><strong class="ng-star-inserted" data-start-index="1792">Guusha dhabta ahi maaha Kibir</strong></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1821"><span style="font-family: georgia, palatino, serif;"><span class="ng-star-inserted" data-start-index="1821">Haddii aynu dib u eegno taariikhda, shaqsiyaadka ugu guulaha badan inta badan waa kuwo </span><strong class="ng-star-inserted" data-start-index="1908">is-dul dhig badan</strong><span class="ng-star-inserted" data-start-index="1925"> oo aan isla-wayni muujin; waxay kaliya eegtaan shaqadooda iyo waxay qabanayaan.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1821"><span class="ng-star-inserted" style="font-family: georgia, palatino, serif;" data-start-index="1925"><span class="ng-star-inserted">&bull; </span><strong class="ng-star-inserted" data-start-index="2005">Napoleon:</strong><span class="ng-star-inserted" data-start-index="2014"> Waxa uu ahaa nin lahaa hamiyo waawayn oo aan caqli-gal ahayn, taas oo sababtay inuu ugu dambayn dhaco.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1821"><span class="ng-star-inserted" style="font-family: georgia, palatino, serif;" data-start-index="1925"><span class="ng-star-inserted" data-start-index="2014"><span class="ng-star-inserted">&bull; </span><strong class="ng-star-inserted" data-start-index="2117">General William Tecumseh Sherman:</strong><span class="ng-star-inserted" data-start-index="2150"> Isagu waxa uu ahaa geesi caan ah, laakiin guushaasi kama dhigin inuu yeesho isla-wayni ama inuu kibro.</span></span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1821"><span class="ng-star-inserted" style="font-family: georgia, palatino, serif;" data-start-index="1925"><span class="ng-star-inserted" data-start-index="2014"><span class="ng-star-inserted" data-start-index="2150">Waxa uu iska ahaa shaqsi iska caadi ah oo is-dul dhig badan, isagoo doortay inuu ciidanka sii hogaamiyo halkii uu magac iyo siyaasad sii raadin lahaa.</span></span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="1821">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" data-start-index="1821">
<div class="paragraph heading3 ng-star-inserted" style="text-align: center;" role="heading" data-start-index="2402" aria-level="3"><span style="font-family: georgia, palatino, serif;"><strong class="ng-star-inserted" data-start-index="2402">Sideed u maareyn kartaa Isla-waynidaada?</strong></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2442"><span class="ng-star-inserted" style="font-family: georgia, palatino, serif;" data-start-index="2442">Qof kastaa wuxuu baran karaa inuu maamulo maskaxdiisa, isagoo iska ilaalinaya kalsoonida xad-dhaafka ah. <span class="ng-star-inserted" data-start-index="2545">Mid ka mid ah qaababka ugu fiican ee looga takhaluso isla-waynida waa inaad lahaato waxa loo yaqaan </span><strong class="ng-star-inserted" data-start-index="2647">&ldquo;Student Mindset&rdquo; (Maskax Ardaynimo).&nbsp;</strong></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2442">&nbsp;</div>
<div class="paragraph normal ng-star-inserted" data-start-index="2442">
<div class="paragraph normal ng-star-inserted" data-start-index="2686"><span style="font-family: georgia, palatino, serif;"><strong class="ng-star-inserted" data-start-index="2686">Maskax Ardaynimo macnaheedu waa:</strong></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2729"><span style="font-family: georgia, palatino, serif;"><span class="ng-star-inserted">1. </span><strong class="ng-star-inserted" data-start-index="2729">Diyaar u noqo inaad wax cusub barato:</strong><span class="ng-star-inserted" data-start-index="2766"> Ha isku malayn inaad kaligaa wax kasta taqaano.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2814"><span style="font-family: georgia, palatino, serif;"><span class="ng-star-inserted">2. </span><strong class="ng-star-inserted" data-start-index="2814">Raadi aqoon joogto ah:</strong><span class="ng-star-inserted" data-start-index="2836"> Intaad nooshahay oo dhan waa inaad wax barataa, waayo taasi waxay kaa caawinaysaa inaad ogaatid waxaad ku fiican tahay iyo waxa lagaaga wanaagsan yahay.</span></span></div>
<div class="paragraph normal ng-star-inserted" data-start-index="2989"><span style="font-family: georgia, palatino, serif;"><span class="ng-star-inserted">3. </span><strong class="ng-star-inserted" data-start-index="2989">Naftaada si sax ah u arag:</strong><span class="ng-star-inserted" data-start-index="3015"> Markaad maamusho isla-waynida (ego), waxaad meesha ka saaraysaa is-mahadinta, waxaadna ogaanaysaa meelaha aad ku liidato si aad u saxdo</span></span></div>
</div>
</div>
</div>', 'img_20260529_180037_827077caf50f3c87.webp', 'ego', 3, 1, 'Isla-waynidu Waa Cadaw: Casharka Guusha | Ego is the Enemy', 'Baro sida is-mahadinta badan (Ego) ay kaaga hortaagan tahay horumarkaaga iyo casharrada laga baran karo General Sherman iyo Napoleon.', 'Isla-waynida, Ego is the Enemy, Ryan Holiday, Ismail Abdi Ismail, Guusha, Is-hoosaysiin, Student Mindset.', 'Isla-waynidu Waa Cadaw.', 'published', 0, 1, 248, 0, 0, 2, '2026-02-14 23:41:00', NULL, '2026-02-14 23:37:58', '2026-07-19 13:23:57'),
(5, 'waa maxay Cognitive biases', 'waa-maxay-cognitive-biases', 'Maxad ka taqaan eexda garshada. Ama marka aad wax walba dhankaaga mariso ood isku koobto', '<p class="MsoNormal"><span style="font-size: 24pt;">Maxad ka taqaan eexda garshada. Ama marka aad wax walba dhankaaga mariso ood isku koobto.</span></p>
<p class="MsoNormal"><span style="font-size: 24pt;">Waa aqli ama fikir gaabnaan maskaxdeena ku timaada mararka qaar,xitaa mararka qaar waxay keenta inan samayno xukuno aan aqli gal ahyn, waa cilado yaryar oo ku yimaada hab fikirkeena.</span></p>
<p class="MsoNormal"><span style="font-size: 24pt;">bal qiyaas inay maskaxdadu tahay sidii mashiin kaaso isla markiiba qaadanaya go,aan dagdaga isaga oon waxba hubinayn si taxadar lehna uga fiirsanayn go,aanadisa.</span></p>
<p class="MsoNormal"><span style="font-size: 24pt;">Tusale yar ood ku fahmayso aan ku siiyo waa adigo saxiibka ku dhaho dadka taajirinta ah waa dad kibir badan oo xun xun,&nbsp; kadibna saaxibkaa mar walba uu arko qof lacag leh oo gaadhi qurxon wata wuxu u haysan donaa inu yahay qof xun waayo aminadisi hore ayu ku salaynaya wax walba iyo go,aanadissa oo waxba u fiirsan maayo.</span></p>
<p class="MsoNormal"><span style="font-size: 24pt;">&nbsp;tusaale kale dhawr dhacdo oo shilal ah ayaad maqashay kadibna waxa markaaba niyadada galaya inad qiimayso surto-galnimada &nbsp;aad shil baabur ku gali karto ama inad gali doonto shil &nbsp;waayo, naftaada ayad mar walba cid walba ka horeysinaysa, wax walba adaa isla barbar dhigaya ,waxad u malaysaa inad cid walba ka fiican tahy . cognitive bias waxy saamayn ku yeelan kartaa dareeenkaga ,waayo-aragnimadaada&nbsp; iyo noloshaadaba sababto ah, go,aanada dagdaga ah aad qaadanayso iyo hubin la,aanta .</span></p>', 'blog/featured/blog_69adc0d32218f0_1779981759.webp', '', 1, 1, '', '', '', '', 'draft', 0, 1, 18, 0, 0, 2, NULL, NULL, '2026-03-08 18:14:43', '2026-05-28 15:22:39'),
(7, 'Waa maxay Love Bombing?', 'waa-maxay-love-bombing', 'Waa maxay "Love Bombing"? (Dabinka lagu soo huwiyey Jaceylka)', '<p><strong>DABINKA JACEEYL-KU-SHUBKA (Love Bombing): Baadhitaan qoto dheer oo ku saabsan khatarta maskaxda 💣❤️</strong></p>
<p><span class="ng-star-inserted">maanta waxaynu ka hadlaynaa shay aad u khatar badan oo dad badan oo innaga mid ahi ay dhibanayaal u yihiin iyagoon ogeyn. </span><strong class="ng-star-inserted"><span class="ng-star-inserted">Love Bombing</span></strong><span class="ng-star-inserted">&nbsp;ma aha jaceyl dhab ah; waa&nbsp;</span><strong class="ng-star-inserted"><span class="ng-star-inserted">qorshe lagugu addoonsanayo</span></strong><span class="ng-star-inserted">. Waa marka qof uu kugu harqiyo ammaan, kalgacal, iyo daneyn badan oo xad-dhaaf ah si uu maskaxdaada u qabsado.</span></p>
<p>&nbsp;</p>
<p class="ng-star-inserted"><span class="ng-star-inserted">Ujeedadu ma aha inaad qofkaas jeclaatid, ee waa:</span></p>
<ul class="ng-star-inserted">
<li class="ng-star-inserted">
<p class="ng-star-inserted"><span class="ng-star-inserted">Inuu kaa dhigo qof isaga uun ku tiirsan.</span></p>
</li>
<li class="ng-star-inserted">
<p class="ng-star-inserted"><span class="ng-star-inserted">Inuu fikirkaaga xado oo uu kaa dhigo mid jahawareersan.</span></p>
</li>
<li class="ng-star-inserted">
<p class="ng-star-inserted"><span class="ng-star-inserted">Inuu kaa dhaadhiciyo inuu yahay qofkii aad nolosha la wadaagi lahayd.</span></p>
</li>
<li class="ng-star-inserted">
<p class="ng-star-inserted" style="text-align: left;"><span class="ng-star-inserted">Inuu ugu danbeyntana marku kaa maarmo kaa tago.</span></p>
</li>
</ul>
<p>&nbsp;</p>
<p>Eraygan (love bombing) markii ugu horreysay waxaa loo isticmaali jiray shabakadaha dadka maskaxda ka-dhaqa (Cults). Waxay qofka kooxsa ku cusub siin&nbsp; jireen inta hore jaceyl badan iyo soo dhaweyn dhalanteed ah si uu asxaabtiisii iyo qoyskiisii uga soo tago. Maanta, dabinkan wuxuu aad ugu dhex jiraa shukaansiga, saaxiibtinimada sunta ah, iyo xataa khayaanooyinka lacagta.</p>
<p><strong class="ng-star-inserted"><span class="ng-star-inserted">Xaqiiqada dhabta ah:</span></strong><span class="ng-star-inserted">&nbsp;Love bombing-ku ma aha "jaceyl xad-dhaaf ah," ee waa&nbsp;</span><strong class="ng-star-inserted"><span class="ng-star-inserted">Dabin</span></strong><span class="ng-star-inserted">&nbsp;lagu dhisayo ku-tiirsanaan (Dependency).</span></p>
<h2 class="ng-star-inserted"><span class="ng-star-inserted">🧠 Dhanka Cilmi-nafsiga Marka laga eegayo?</span></h2>
<p><span class="ng-star-inserted">Sidee bay suurtogal u tahay in qof aad hadda baratay uu maskaxdaada hal mar xado? Hadaba khiyaanolayaashu waxay isticmaalaan afar hab oo bini-aadamka dabeecad u ah:</span></p>
<h3 class="ng-star-inserted"><span class="ng-star-inserted">1. Mabda''a Abaalka (Reciprocity)</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Bini-aadamka waxaa si dabiici ah ugu abuuran inuu abaalka loo galo celiyo. Markuu qofku ku siiyo ammaan, hadyado, iyo wakhti badan, maskaxdaadu waxay dareemaysaa in </span><strong class="ng-star-inserted"><span class="ng-star-inserted">deyn</span></strong><span class="ng-star-inserted"> lagu leeyahay. Waxaad dareemaysaa sidii inaad ku qasban tahay inaad wakhtigaaga iyo noloshaada oo dhan u hibeyso qofkaas "wanaagsan" ee wax kasta kuu sameeyey.</span></p>
<h3 class="ng-star-inserted"><span class="ng-star-inserted">2. "Shabihida" Shakhsiyadda (Mirroring)</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Qofka dabinka kuu dhigaya ama jabka kula maagan marka hore kuma tuso shaqsiyadiisa dhabta ah. Wuxuu iska dhigi donaa qof leh shaqsiyad aad jeceshay</span><span class="ng-star-inserted">:</span></p>
<ul class="ng-star-inserted">
<li class="ng-star-inserted">
<p class="ng-star-inserted"><span class="ng-star-inserted">Haddii aad diinta jeceshahay ama sheekh tahay, isna wuxuu noqon doonaa qof cibaado badan.</span></p>
</li>
<li class="ng-star-inserted">
<p class="ng-star-inserted"><span class="ng-star-inserted">Haddii aad hami sare leedahay, isna wuxuu iska dhigi donaa qof nolosha wax weyn ka raba ama hami sare leh.</span><br class="ng-star-inserted"><span class="ng-star-inserted">Markaa waxaad galeysaa dhalanteed iyo riyo oo waxaad is odhanaysaa: </span><span class="ng-star-inserted">"Qofkani waa lammaanahaygii riyada, isaga uun baa si sax ah ii fahmaya."</span></p>
</li>
</ul>
<h3 class="ng-star-inserted"><span class="ng-star-inserted">3. Jaceylka iyo Ciqaabta (Intermittent Reinforcement)</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Tani waa meesha ay balwaddu (addiction) ka dhalato. Marka hore qofku jaceyl ayuu kugu sakhraaminayaa, ka dibna si kedis ah ayuu kaaga gooysanaya. Maskaxdaadu waxay markaas bilaabaysaa inay raadiso dareenkii macaanaa ee bilowgii lagu siin jirey, adigoo u dulqaadanaya xadgudub kasta iyo dhib kasta oo qofkaasi kuu geysto si aad kaliya u hesho ammaan yar ama jaceyl oo uu mar mar ku siinayo.</span></p>
<h3 class="ng-star-inserted"><span class="ng-star-inserted">4. Inuu Jahawareeriyo Maskaxdaada (Cognitive Dissonance)</span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted">Marka uu qofku ku dhibo ama ku xumeeyo, maskaxdaadu waxay diidaysaa inay rumaysato inuu qofkani qof xun yahay. Waxaad bilaabaysaa inaad tidhaahdo: </span><span class="ng-star-inserted">"Maya, qofkani waa qof fiican,waayo waxaan xasuustaa sidii uu iila dhaqmi jiray bilowgii xidhiidhkeena."</span><span class="ng-star-inserted"> Waxaad raadinaysaa qof aan jirin, kaas oo ahaa maaskaro bilowga.</span></p>
<h2 class="ng-star-inserted"><span class="ng-star-inserted">🧬 Kimisteriga Maskaxda: "Sakhraanka Jaceylka"</span></h2>
<p class="ng-star-inserted"><span class="ng-star-inserted"><span class="ng-star-inserted" data-start-index="290">Love bombing-ku maaha dareen iska yimaada uun, ee waa shay si dhab ah u beddelaya shaqada iyo kiimikada maskaxdaada. Marka qofku uu kugu bilaabo "Love Bombing," wuxuu khalkhal galinayaa maskaxdaada dahsoon (</span><strong class="ng-star-inserted" data-start-index="510">Subconscious Mind</strong><span class="ng-star-inserted" data-start-index="527">) isagoo isticmaalaya saddexdan hormoon.:</span></span></p>
<p class="ng-star-inserted">&nbsp;</p>
<p class="ng-star-inserted">&nbsp;</p>
<p>&nbsp;</p>', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 'draft', 0, 1, 0, 0, 0, NULL, NULL, NULL, '2026-04-01 00:56:01', '2026-04-02 23:25:06');
INSERT INTO "blog_posts" ("id", "title", "slug", "excerpt", "content", "featured_image", "featured_image_alt", "category_id", "author_id", "meta_title", "meta_description", "meta_keywords", "focus_keyword", "status", "is_featured", "allow_comments", "view_count", "comment_count", "share_count", "estimated_read_time", "published_at", "scheduled_at", "created_at", "updated_at") VALUES
(9, 'Waa Maxay Jacayl? (Sida uu qabo Cilmiga Nafsigu)', 'waa-maxay-jacayl-sida-uu-qabo-cilmiga-nafsigu', 'maxay culimada cilmi-nafsigu ka aaminsan yihiin jacaylka? Maxaase salka u ah dabcigan la yaabka leh ee aadanaha?.', '<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Jacaylku ma aha uun dareen iska yimaada; waa kakan yahay, wuu qoto dheer yahay, waana isku-dhaf dareemo kala duwan xambaarsan. Cilmi-nafsigu wuxuu jacaylka ku qeexaa inuu yahay <em><strong>"muxubbo aad u xooggan iyo kalgacal lafaha gala oo uu qofku u qaado qof kale."</strong></em></span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Haddaba, maxay culimada cilmi-nafsigu ka aaminsan yihiin jacaylka? Maxaase salka u ah dabcigan la yaabka leh ee aadanaha?</span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Haddii aad xiisaynayso inaad ogaato siraha qarsoon ee jacaylka iyo sababaha ka dambeeya, hoos u deg oo nala eeg 9-kan aragtiyood ee ugu caansan. Fadlan maqaalkan la wadaag asxaabtaada si ay iyaguna wax uga korodhsadaan!</span></p>
<hr class="ng-star-inserted">
<h3 class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">1. Aragtida Isku-xirnaanta (Attachment Theory)</span></strong></span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Aragtidani waxay qabtaa in qaabka aynu dadka u jeclaanno marka aan weynaano ay salka ku hayso sidii naloogu daryeelay carruurnimadeennii. Waxay u kala baxdaa afar nooc:</span></p>
<ul class="ng-star-inserted">
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Kalsooni Buuxda (Secure):</span></strong><span class="ng-star-inserted">&nbsp;Ilmaha yaraantiisii helay daryeel, naxariis, iyo waalid mar walba garab taagan, wuxuu qaadaa kalsooni buuxda. Mustaqbalkana wuxuu awoodaa inuu sameeyo xiriir jacayl oo caafimaad qaba.</span></span></p>
</li>
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Baahi iyo Baqdin (Anxious):</span></strong><span class="ng-star-inserted"> Waa ilmaha aan waalidkiisa si joogto ah u helin, ama aan baahidiisa si degdeg ah looga jawaabin. Tan waxa ka dhasha qof weyn oo leh maseyr badan, shaki, iyo baqdin ah in laga tagayo.</span></span></p>
</li>
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Is-fogayn iyo Aaminaad-darro (Avoidant):</span></strong><span class="ng-star-inserted">&nbsp;Waa ilmo waayay naxariistii iyo dareenkii uu waalidka uga baahnaa. Ilmahani wuxuu isbaraa inuu is-kaafiyo oo cidna uusan ku tiirsanaan. Marka uu weynaado, wuxuu noqdaa qof is-qariya, jacaylka ka carara, aadna ay ugu adag tahay inuu qof si dhab ah u aamino.</span></span></p>
</li>
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Jahwareer iyo Cabsi (Disorganized):</span></strong><span class="ng-star-inserted"> Ilmaha gacan-qaad ama dhibaato kala kulmay waalidkii (gaar ahaan waalid xanuun maskaxeed qaba), wuxuu qaadaa jahwareer. Tani waxay u horseeddaa qofka marka uu weynaado inuu yeesho dhaqan is-dhex-yaacsan ama inta badan inuu muujiya naxariis-darro.</span></span></p>
</li>
</ul>
<h3 class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">2. Aragtida Baahiyaha Noolaha (Maslow&rsquo;s Hierarchy Theory)</span></strong></span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Caalimkii cilmi-nafsiga ee Maslow wuxuu sheegay in aadanuhu isku xigxigsado baahiyihiisa.</span><br class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><span class="ng-star-inserted">Marka hore, waxaan raadinaa cunto, biyo, iyo hurdo (Baahi Jireed). Marka aan intaas helno, waxaan baadi-goobnaa meel nabad ah oo aan ku noolaano (Baahi Badbaado). Kadib marka aan helno cunto iyo ammaan,&nbsp;</span><span class="ng-star-inserted">maskaxdeennu waxay toos u dalbataa jacayl iyo wehel.</span><span class="ng-star-inserted">&nbsp;Aragtidan waxay inoo caddeynaysaa in jacaylku yahay baahi aasaasi ah oo qofka ka caawisa inuu dhisnaado caafimaad ahaan iyo maskax ahaanba.<br><br></span></span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Waan ku fahmay. Hadda waxaan gabi ahaanba meesha ka saaray hab-qoraalkii u ekaa tarjumadda tooska ah.</span></p>
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><span class="ng-star-inserted">Fikradda iyo nuxurka qoraalkaagii hore ayaan qaatay, kadibna waxaan maskaxda u shiilay sidii aan uga dhigi lahaa&nbsp;</span><strong class="ng-star-inserted"><span class="ng-star-inserted">Maqaal dabiici ah, xambaarsan dhadhan cilmi-nafsiyeed, aadna u soo jiidasho badan</span></strong><span class="ng-star-inserted">, si uu akhristaha Soomaaliyeed u dareemo in qoraalkan isaga si gaar ah loogu talagalay.</span></span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Waa kan maqaalkii oo ah mid aad ugu habboon in aad ku daabacdo Blog-gaaga ama bartaada, isagoo dhammaystiran, naxwe ahaanna hufan:</span></p>
<p class="ng-star-inserted">&nbsp;</p>
<h3 class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">3. Aragtida Saddex-geesoodka (Sternberg&rsquo;s Theory of Love)</span></strong></span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Sida uu qabo Sternberg, jacaylka dhabta ahi saddex tiir ayuu ku taagan yahay. Haddii mid maqan yahay, jacaylku wuu nusqamayaa:</span></p>
<ol class="ng-star-inserted">
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Isku-dhawaansho (Intimacy):</span></strong><span class="ng-star-inserted">&nbsp;Waa dareenka is-aaminaadda, is-fahamka, sir-wadaagga, iyo in naftu isku dunto.</span></span></p>
</li>
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Xiiso iyo Rabitaan (Passion):</span></strong><span class="ng-star-inserted">&nbsp;Waa dareenka soo-jiidashada xubinta taranka iyo rabitaanka gariirka wata ee loo qabo qofka kale.</span></span></p>
</li>
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Axdi iyo Ballanqaad (Commitment):</span></strong><span class="ng-star-inserted">&nbsp;Waa go''aanka ah "Kama hari doono qofkan", iyo u-dulqaadashada dhibka iyo dheefta xiriirka.</span></span></p>
</li>
</ol>
<h3 class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">4. Aragtida Kiimikooyinka Maskaxda (Biological Theories)</span></strong></span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Ma is-weydiisay sababta jacaylku mararka qaar ugu ekaado waalli ama qabatin? Aragtidani waxay leedahay jacaylku waa hawl bayooloji oo ka dhex socota maskaxdaada.</span><br class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><span class="ng-star-inserted">Marka aad qof jeclaato, maskaxdaadu waxay soo daysaa kiimikooyin ay ka mid yihiin&nbsp;</span><span class="ng-star-inserted">Dopamine</span><span class="ng-star-inserted"> (oo farxad iyo raynrayn ku siiya), iyo </span><span class="ng-star-inserted">Oxytocin</span><span class="ng-star-inserted"> (oo ku siiya dareen deggenaan ah, aaminaad, iyo isku-xidhnaan aad u weyn). Kiimikooyinkani waa kuwa yareeyaa walwalka, isla markaana abuura kalgacal indho-la''aan ah.</span></span></p>
<h3 class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">5. Aragtida Koboca Noolaha (Evolutionary Theory)</span></strong></span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Maxaynu wax u jeclaannaa asalkaba? Aragtidan oo dhanka taariikhda noolaha ka eegaysa ayaa qabta in jacaylku yahay hanaan badbaado oo dabiici ah.</span><br class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Bini-aadamkii hore, in ninka iyo naagtu wada joogaan isna-kaashadaan waxa u sabab ahaa jaceylka, si ay u dhalaan carruur ayna u wada korsadaan waqti dheer. </span></p>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Haddii uusan jiri lahayn dareenka soo-jiidashada ee jacaylku, aadanuhu sidaan uma tarmeen, iskuma duubnaadeen, carruurtuna kuma badbaadeen daryeel la''aan.</span></p>
<h3 class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">6. Aragtida Axdiga iyo Maalgelinta (Theory of Commitment)</span></strong></span></h3>
<p class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Maxaa xiriirka sii adkeeya, maxaase dumiya? Aragtidani waxay soo bandhigtay saddex arrimood oo go''aamiya cimri-dhererka jacaylka:</span></p>
<ol class="ng-star-inserted">
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Qanacsanaanta:</span></strong><span class="ng-star-inserted">&nbsp;Ilaa iyo inta aad ku faraxsan tahay qofkan ee uu baahidaada daboolayo, waad ku dhagnaanaysaa xiriirka.</span></span></p>
</li>
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Maalgelinta aad gelisay:</span></strong><span class="ng-star-inserted"> Waxaa xiriirka lagu maalgeliyo ma aha lacag oo qudha; waa waqtigaaga, sirtaada, xusuusaha, iyo samirkii aad bixisay. Mar kasta oo maalgelintaasi badato, in laga baxo xiriirka way adkaataa.</span></span></p>
</li>
<li class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">Beddel/Dookh kale:</span></strong><span class="ng-star-inserted"> Haddii aad aragto qof ama waddo kale oo kaaga fiican tan aad hadda ku sugan tahay, jacaylkaagu waa daciifayaa. Haddiise uusan jirin dookh kale oo ka wanaagsan qofkan, xiriirkaagu wuu sii jirayaa.</span></span></p>
</li>
</ol>
<h3 class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><strong class="ng-star-inserted"><span class="ng-star-inserted">7. Aragtida Kobcinta Nafta (Self-Expansion Theory)</span></strong></span></h3>
<p class="ng-star-inserted"><span style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;"><span class="ng-star-inserted">Aadanaha waxaa gudihiisa ku abuurma baahi ah inuu koro, is-ballaariyo, aqoon cusubna barto. Aragtidani waxay aaminsan tahay in&nbsp;</span><span class="ng-star-inserted">sababta aan wax u jeclaanno ay tahay inaan nafteenna horumarinno.</span></span><br class="ng-star-inserted"><span class="ng-star-inserted" style="color: rgb(255, 255, 255); font-size: 14pt; font-family: arial, helvetica, sans-serif;">Marka aad la sheekaysato ama aad xiriir la yeelato qof leh aqoon, xirfad, luuqado, ama aragti aadan horay u lahayn, waxaa kugu abuurma is-ballaarin nafeed. Jacaylku wuxuu noo yahay darajo aan ku helno qayb ka mid ah awoodaha iyo dhalaalka qofka aan jeclaanay.</span></p>
<p class="ng-star-inserted">&nbsp;</p>', NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, 'draft', 0, 1, 54, 0, 0, NULL, NULL, NULL, '2026-05-02 22:01:39', '2026-05-08 14:04:53'),
(10, 'Uma baahnidiin xaflad iyo aroos weyn!.', 'uma-baahnidiin-xaflad-iyo-aroos-weyn', NULL, '<p><span style="font-size: 14pt;">"Markaad dhalinyaro tihiin eed is guursanaysaan uma baahnidiin xaflad iyo aroos weyn ama hebal/heblayo arooskii qarniga ayeey dhigteen ee ana aan dhigto"</span></p>
<p><span style="font-size: 14pt;">Lacagta aad halkaas ku lumineysaan waxbaad ku qabsan kareysaan. laga yaabee lacagtaas&nbsp;inuu wiilku kala badh deyn ku keenay. marka la eego qofka Soomaaliya jooga oo aysan dhaqaallo badan jirin ma wacna inaad 10&ndash;15k$ malayacni ku qasaarisaan .</span></p>
<p><span style="font-size: 14pt;">Wiilkuna wuxuu hawshaas oo dhan u sameynayaa waa gabadhisa farxaddeeda awadeed. laakin imisa ayaa la arkay aroos hal habeen lagu gubay lacag qayru xad ah subaxnimaddiina wiilku uusan kun shilin haysan oo uu saxiibaddii waco kuna dhahao "saaxiib biil ma hayee bal wax isoo dir .</span></p>
<p><span style="font-size: 14pt;">Quruux iyo sumcad midna idiin ma aha dad aan idin ogena ha u qurxinina habeenkiinna ee wax keysi yeesha. inaad kayd leedihiin aad bay u wanaagsan tahay.</span></p>
<p><span style="font-size: 14pt;">"Lacagta aad arooska ku khasaarineysaan waxa habboon inaad dalxiis ku aadaan ama aad gurigiinna cusub ku qurxisataan ama cimro aadda.</span></p>
<p><span style="font-size: 14pt;">Guri kiro haddii aad dageysaana inaad 6 bilood contract la gashaan lacagtana aad iska sii bixisaan si aysan bilaha ugu horreeya ayaa fiican si ayna kugu adkaan ugana fikirin kirada.</span></p>
<p><span style="font-size: 14pt;">Wiilkuna waa inuu kasoo fasax qaadan karo shaqadda 2&ndash;3 bil idinkoo kaydkiinna isticmaaalaya mudadaas.&nbsp;</span></p>
<p><span style="font-size: 14pt;">Sidoo kale gabadhadda/xaaskaagga ah waa inaad ka farxiso dahab iyo waxey markaa u baahan tahay u iibiso maadaama ay masuuliyadda kula qaadey unna mahadceliso wax badan.</span></p>
<p><span style="font-size: 14pt;">Gunaanadka:&nbsp;</span></p>
<p><span style="font-size: 14pt;">Dhalinyaro dhaldhalalka yar waa laga baxayaa, garta mustaqbalka dheer iyo safarka nolosha ee idiin sugeya, iskana ilaaliya maxaa iga galay waa hagrasho iyo xaasidnimo mana fiicna.&nbsp;</span></p>
<p><span style="font-size: 14pt;">Wallaahi waa wax foolxun xaasidnimo iyo hagrasho inaad ku noolaataan. Marba haddaad qofkan nafta ag dhigtay oo midoowdeen nafta isku hura OO kalgacal kuwada noolaadda.</span></p>
<p><span style="font-size: 14pt;">" sidaan waxa yidhi gabadh dhalinyaro ah</span><br><span style="font-size: 14pt;">&nbsp;Maxay kula tahay adiga.?</span></p>', 'img_20260529_175837_5981b1adf50ecef5.jpg', NULL, 8, 1, NULL, NULL, NULL, NULL, 'published', 0, 1, 43, 0, 0, NULL, '2026-05-25 18:20:00', NULL, '2026-05-25 18:19:13', '2026-07-14 18:30:00'),
(11, 'Haddii Aad Isku Aragto 5-tan Calaamadood… Muddo Dheer Ayaad Kaligaa Ahayd (Dareen Ahaan)', 'haddii-aad-isku-aragto-5-tan-calaamadood-muddo-dheer-ayaad-kaligaa-ahayd-dareen-ahaan', NULL, '<p style="text-align: center;"><strong>Haddii Aad Isku Aragto 5-tan Calaamadood&hellip; Muddo Dheer Ayaad Kaligaa Ahayd (Dareen Ahaan)</strong></p>
<p>Noloshu mararka qaar waxay nagu qasabtaa inaan dhabarka u ridano culeysyo ka da''da weyn nafteena. Inaad kaligaa ahaato macnaheedu maahan oo kaliya inaad qol madow dhex fadhido adigoon cidna la hadlayn; waxaa jira nooc kalinimo ah oo kaa ka daran, waana <strong data-path-to-node="3" data-index-in-node="254">kalinimada dareenka</strong> (Emotional Loneliness)</p>
<p data-path-to-node="4">Waa nabar aamusnaan ah; adigoo ku dhex jira dadkii aad jecleyd, ayaad hadana gudaha ka dareemaysaa inuusan qofna ku fahmeyn.</p>
<p data-path-to-node="5">Haddaad isku aragto shan-tan calaamadood, ogow muddo dheer ayaad dareen ahaan kaligaa ahayd, naftaaduna waxay baratay inay si aamusnaan ah u dagaallanto:</p>
<h3 data-path-to-node="7">1. Dadka Uma Sheegtid Waxa Aad Dareemeyso</h3>
<p data-path-to-node="8">Maba isku dayid inaad qof la wadaagto murugadaada ama farxadaada. Sababta ugu weynna waa adoo aaminsan inuusan jirin qof dhab ahaantii kuu nugul oo kugu dhihi kara <em data-path-to-node="8" data-index-in-node="165">"Anigaa kuu joogo, ila wadaag culeyska"</em>. Waxaad doorataa inaad aamusnaato, sababtoo ah waxaad arkaysaa in sharraxaad badan eed naftaada dadka u sharaxaysid ay daal kugu tahay.</p>
<h3 data-path-to-node="9">2. Adigoon Cidna U Sheegin Ayaad Dhuumataa</h3>
<p data-path-to-node="10">Mararka qaar, adigoo dad dhex fadhiya ayaad dareentaa in neeftu kugu dhegeyso. Waxaad doorataa inaad si aamusnaan ah meesha uga tagto adigoon qofna u sheegin meesha aad aadeyso. Kaliya waxaad u baahan tahay inaad naftaada kali la noqoto, kana fogaato sawaxanka aduunka, oo aad soo ceshato deganaantii .</p>
<h3 data-path-to-node="11">3. Xiriir Ayaad U Hanqal Taagtaa, Laakiin Markuu Kuu Soo Dhowaado Qofku Waad Iska Riixdaa</h3>
<p data-path-to-node="12">Waa mid ka mid ah calaamadaha ugu adag kelinimada. Gudaha waxaad ka rabtaa inad hesho qof ku jecel, ku fahma, oo kula qaybsada nolosha. Laakiin, isla markii uu qof kuu soo dhowaado, waxaa kugu dhasha baqdin. Waxaad bilaabaysaa inaad dadka iska fogeyso oo aad iska riixdo, adoo ka baqaya in dhabarka laguu jeediyo ama laguu dhaawaco hadhow.</p>
<h3 data-path-to-node="13">4. Fekrado Culus Ayaad Kaligaa Xambaarsan Tahay</h3>
<p data-path-to-node="14">Hadday ahaan lahayd walbahaarka shaqada, nolosha, ama mustaqbalka, dhammaan fekeradaas culus madaxaagay ka guuxayaan. Sababta aadan dadka kale ula wadaageynin maahan inaadan ku kalsoonayn, balse deeqsinimo iyo naxariis ayay kaa tahay oo ma rabtid inaad qof kale culeys iyo walbahaar ku noqoto.</p>
<h3 data-path-to-node="15">5. Waxaad Rajeysaa Inuu Qof Un Ku Garto, Adigoon Caawinaad Waydiisan.</h3>
<p data-path-to-node="16">Waxaad mar walba niyaysataa inay timaado maalinta uu qof indhahaaga ka akhrisanayo xanuunkaaga. Waxaad rajeysaa inuu qof ku yidhaa <em data-path-to-node="16" data-index-in-node="125">"Maanta caadi ma tihid, maxaa jira?"</em> adigoon adigu caawinaad weydiisinin waxna u sharrixin. Waxaad u ooman tahay qof si dhab ah kuu fahma.</p>
<h2 data-path-to-node="18">Ereyga Ugu Dambeeya: Waxaad Baratay Inaad Kaligaa Badbaado</h2>
<p data-path-to-node="19">Haddii aad calaamadahan isku aragtay, waxaad tahay qof adkeysi badan. <strong data-path-to-node="19" data-index-in-node="70">Waxaad baratay inaad kaligaa badbaado iyadoon lagu dareemeynin.</strong> Middaas waxay ku tusaysaa adkeysiga gudahaaga ku jira, laakiin xusuuso: <em data-path-to-node="19" data-index-in-node="206">bini-aadam ahaan uma abuurmin inaynu wax walba kaligeen dhabarka u ridano.</em></p>
<p data-path-to-node="20">Maahan daciifnimo inaad dareenkaaga muujiso, mana aha dambi inaad qof garab weydiisato. Naftaada u naxariiso, oo u oggolow dadka saxda ah inay kuu soo dhowaadaan.</p>', 'img_20260529_175726_858388fa13060130.jpg', NULL, 8, 1, NULL, NULL, NULL, NULL, 'published', 0, 1, 81, 0, 0, NULL, '2026-05-27 21:22:00', NULL, '2026-05-27 21:54:52', '2026-07-19 04:15:54'),
(12, '4 Qaab Oo Ay Maskaxdaadu Kuu Khiyaamayso (Adigoon Is Ogeyn!)', '4-qaab-oo-ay-maskaxdaadu-kuu-khiyaamayso-adigoon-is-ogeyn', NULL, '<p style="text-align: center;"><span style="font-size: 18pt;"><strong>4 Qaab Oo Ay Maskaxdaadu Kuu Khiyaamayso (Adigoon Is Ogeyn!)</strong></span></p>
<p data-path-to-node="3">Weligaa ma is weydiisay sababta aynu mararka qaar u qaadano go''aamo khaldan u , inagoo weliba u haysana inaan saxannahay? Ama sababta dadku ay ugu yaacaan hal shay oo aan macno badneyn?</p>
<p data-path-to-node="4">Cilmi-nafsiga (Psychology) ayaa arrintan sharraxaya. Waxa jirta xaalad la yidhaahdo <strong data-path-to-node="4" data-index-in-node="84">Cognitive Biases</strong> (Khaladaadka dhanka fikirka ee maskaxda). Si fudud, waa dariiqooyin gaagaaban oo ay maskaxdu isticmaasho si ay degdeg go''aan uga gaadho, laakiin inta badan inagu rida khaladaad.</p>
<p data-path-to-node="5">Aan eegno 4-ta nooc ee ugu caansan oo ay dhalinyaradu inta badan ku dhacaan iyo sida ay cilmi-baadhistu u caddaysay:<br><br></p>
<h2 data-path-to-node="6">1. "Waan saxanahay, cidina igama badinayso" (Confirmation Bias)</h2>
<p data-path-to-node="7">Tani waa marka maskaxdaadu ay aqbasho oo kaliya xogta taageeraysa wixii aad horeba u aaminsanayd, laakiin ay iska indho-tirto wax kasta oo ka soo horjeeda aaminadaadaas.</p>
<p data-path-to-node="7"><strong data-path-to-node="8,0,0" data-index-in-node="0">Tusaale ahaan.</strong>&nbsp;Haddii aad aaminsan tahay in ciyaartoyga aad taageerto (sida Messi ama Ronaldo) uu yahay kan ugu fiican, waxa aad internet-ka ka raadinaysaa uun muuqaalada muujinaya goolashiisa iyo xirfaddiisa. Laakiin haddii saaxiibkaa isku dayo inuu ku tuso khaladaadkiisa ama meelaha uu ku liito, waxaad odhanaysaa, <em data-path-to-node="8,0,0" data-index-in-node="323">"Ha iila iman waxaa nio, ronaldo isba waxba ma garanayee"</em> Maskaxdaadu ma rabto inay aragto wax ka hor imaanaya waxaad aaminsan tahay.</p>
<p data-path-to-node="7">Sannadkii 1979-kii, Jaamacadda Stanford ayaa tijaabisay laba kooxood. Waxay hordhigeen warbixino iska soo horjeeda oo ku saabsan ciqaabta dilka. Koox walba waxay rumaysatay uun warbixintii taageraysay ra''yigooda, tii kalena way beeniyeen iyagoo leh "waa warbixin been ah."</p>
<h2 data-path-to-node="9">2. Isku-dayasho ama "Dadkuba way wada samaynayaan" (Bandwagon Effect)</h2>
<p data-path-to-node="10">Waa dabeecadda ah in qofku uu sameeyo ama aamino shay, kaliya sababtoo ah dad badan ayaa sidaas samaynaya. Waa sababta ay waxyaabaha cusub, dharka cusubi, ama "Trends-ka" TikTok ay mar qudha u wada qarxaan.</p>
<p data-path-to-node="10"><strong data-path-to-node="11,0,0" data-index-in-node="0">Tusaale ahaan:</strong> Haddii dhalinyarada iskuulkiinu ama jaamacadu ay wada iibsadaan nooc kabo ah ama shaadh ah, adna waad iibsanaysaa adigoon xitaa jecleyn ama aanu dookhaaga ahayn, si aanad asxaabtaada uga soocmin ama aanad uga hadhin.</p>
<p data-path-to-node="10">Cilmi-baadhe la odhan jiray Solomon Asch ayaa tijaabo yaab leh sameeyay 1951-kii. Wuxuu dadka qaar weydiiyay su''aal aad u fudud oo ah (inay kala gartaan xarriiqda ugu dheer). Laakiin markii uu dadkii qolka ku jiray (oo ahaa dad uu soo kireystay oo isaga u shaqeynayay) u sheegay inay si ula kac ah ugu wada jawaabaan jawaab khaldan, <strong data-path-to-node="11,1,0" data-index-in-node="294">75%</strong> dadkii dhabta ahaa ee la tijaabinayay intay is-bedeleen ayay iyaguna raaceen jawaabtii khaldanayd ee aqlabiyadda, si aanay dadka uga soocmin.</p>
<h2 data-path-to-node="12">3. Ku dhegganaanta Xogta Kowaad (Anchoring Bias)</h2>
<p data-path-to-node="13">Waa marka go''aankaaga aad ku salayso xogtii ugu horraysay ee aad maqashay ama aragtay. Arrintan waxaa aad u isticmaala dukaamada iyo meelaha wax lagu iibiyo.</p>
<p data-path-to-node="13"><strong data-path-to-node="14,0,0" data-index-in-node="0">Tusaale ahaan:</strong> Waxaad tagtay dukaan si aad kabo u soo iibsato. Kabihii ayaa lagu yidhi waa <strong data-path-to-node="14,0,0" data-index-in-node="95">$100</strong>. Aad baad ula yaabtay qaalinimadoda. Laakiin markiiba ninkii dukaanka iibinayay ayaa ku yidhi, <em data-path-to-node="14,0,0" data-index-in-node="175">"Maanta qiimo dhimis ayaa jirta ee $50&nbsp; iska bixi."</em> Maskaxdaadu waxay isla markiiba kuu sheegaysaa inaad heshay fursad weyn, sababtoo ah waxay ku dhegganeyd "$100-kii" hore laguugu sheegay. Xaqiiqaduse waxay tahay, kabahaasi malaha markii horaba $30 uun bay joogeen, ee adiga unbaa maskaxdaada la khiyaamayay.</p>
<p data-path-to-node="13">Khubaro ku guulaystay abaalmarinta Nobel-ka (Kahneman iyo Tversky) ayaa tijaabo ay sameeyeen , waxay dadkii tuseen nambaro baqtiyaa nasiib ah (Random numbers), ka dibna su''aalo ayay ka weydiiyeen. Dadku waxay qiyaastoodii gabi ahaanba ku saleeyeen nambarkii ugu horreeyay ee ay arkeen, xitaa isagoon nambarkaasi wax shaqo ah ku lahayn su''aasha la weydiiyay.</p>
<h2 data-path-to-node="15">4. "Waan sii ogaa in ay sidaas dhaceyso" (Hindsight Bias)</h2>
<p data-path-to-node="16">Marka ay dhacaan wax lama filaan ahi ama arrin ay dhammaato, qofku wuxuu isku-qanciyaa in uu hore u sii ogaa natiijada ka hor intii aanay dhicinba.</p>
<p data-path-to-node="16"><strong data-path-to-node="17,0,0" data-index-in-node="0">Tusaale ahaan:</strong> Marka la daawanayo ciyaar kubadda cagta ah, haddii koox laga badiyo daqiiqadda ugu dambaysa, saaxiibkaa ayaa markiiba ku odhanaya, <em data-path-to-node="17,0,0" data-index-in-node="151">"Walaahi waan sii ogaa inay goolkaas dhalinayaan"</em> Laakiin xaqiiqadu waxay tahay, muu ogeyn, ee marka ay dhacday ayay maskaxdiisa u sheegaysaa inuu sii garanayay.</p>
<p data-path-to-node="10">Sannadkii 1972-kii, baadhayaal ayaa dad weydiiyay inay sii saadaaliyaan waxa ka soo bixi doona safar uu madaxweynihii Maraykanku ku tagayay dalka Shiinaha. Markii uu safarkii dhamaaday ee la ogaaday wixii kasoo baxay, ayaa dadkii la waydiiyay wixii ay hore u sii saadaaliyeen. Intooda badani waxay ku dhaarteen inay sii ogaayeen wixii dhacay, iyagoo gabi ahaanba ilaaway qiyaastii khaldanayd ee ay marka hore sameeyeen.</p>
<h2 data-path-to-node="19">Guntii iyo Gebagebadii: Sidee Isaga Ilaalin Kartaa?</h2>
<p data-path-to-node="20">Inaad bini-aadam tahay macnaheedu waa in maskaxdaadu samaynayso khaladaadkan. Laakiin si aad go''aamo caqliyeysan u gaadho, raac 3-dan qodob:</p>
<ol start="1" data-path-to-node="21">
<li>
<p data-path-to-node="21,0,0"><strong data-path-to-node="21,0,0" data-index-in-node="0">Hakad yara gal (Ha degdegin):</strong> Marka aad go''aan qaadanayso ama aad cadhaysan tahay, xoogaa neefso oo waqti qaado. Maskaxdu markay degdegayso waa markay khaladaadka ugu badan samayso.</p>
</li>
<li>
<p data-path-to-node="21,1,0"><strong data-path-to-node="21,1,0" data-index-in-node="0">Raadi dhan kale:</strong> Isku day inaad dhegaysato fikirka kasoo horjeeda kaaga. Ha raadin uun dad kugu raaca waxaad aaminsan tahay.</p>
</li>
<li>
<p data-path-to-node="21,2,0"><strong data-path-to-node="21,2,0" data-index-in-node="0">Is-weydii:</strong> <em data-path-to-node="21,2,0" data-index-in-node="11">"Ma anigaa dhab ahaan go''aankan gaadhay, mise dadka uun baan iska raacayaa?"</em></p>
</li>
</ol>
<blockquote data-path-to-node="22">
<p data-path-to-node="22,0">Xusuusnow, qofka caqliga badani maaha kan aan khaldamin, waa kan og in maskaxdiisu ay mararka qaar khiyaamayso, diyaarna u ah inuu is-saxo.</p>
</blockquote>
<p data-path-to-node="10">&nbsp;</p>
<p data-path-to-node="5">&nbsp;</p>', 'img_20260529_175419_96426575adfd3216.jpg', NULL, 1, 1, NULL, NULL, NULL, NULL, 'published', 0, 1, 44, 0, 0, NULL, '2026-05-27 22:17:00', NULL, '2026-05-27 23:07:02', '2026-07-19 04:13:10'),
(13, 'Dagaalka Gudahaaga Ka Socda: Waa Maxay ''Cognitive Dissonance''?', 'dagaalka-gudahaaga-ka-socda-waa-maxay-cognitive-dissonance', NULL, '<p><span style="font-size: 18pt;"><strong>Dagaalka Gudahaaga Ka Socda: Waa Maxay ''Cognitive Dissonance''?</strong></span></p>
<p data-path-to-node="3">Weligaa ma is aragtay adigoo samaynaya wax aad si dhab ah u ogtahay inay khaldan yihiin, ama wax aan u wanaagsanayn mustaqbalkaaga?&nbsp;</p>
<p data-path-to-node="3">Tusaale ahaan, berri ayuu imtixaan kugu soo fool leeyahay, waad ogtahay inaad u baahan tahay inaad wax akhrisato, haddana waxaad 3 saacadood ku dhex jirtaa TikTok adigoo "scroll" garaynaya. Markaasaad naftaada u cudur-daaraysaa adigoo leh: <em data-path-to-node="3" data-index-in-node="365">"Waan yara nasanayaa uun, goor dhow ayaan buugga furayaa oon akhrinayaa."</em></p>
<p data-path-to-node="4">Dareenkaas ku dhibaya marka ficilkaaga iyo waxaad aaminsan tahay ay iska hor yimaadaan cilmi-nafsiga (Psychology) waxaa lagu magacaabaa&nbsp;<strong data-path-to-node="4" data-index-in-node="146">Cognitive Dissonance</strong>. Af-Soomaali ahaan waxaan dhihi karnaa <strong data-path-to-node="4" data-index-in-node="206">"Isku-dhaca Fikradaha"</strong> ama <strong data-path-to-node="4" data-index-in-node="233">"Dagaalka Qalbiga iyo Gacanta"</strong>.</p>
<p data-path-to-node="5">Waa mowduuc xiiso badan oo taabanaya nolosheena maalinlaha ah, maskaxdeena, falsafadda, iyo waliba diinteena suuban ee Islaamka. Aan isla eegno dhinacyadan kala duwan si aan u fahamno sababta aan mararka qaar u dhaqanno si liddi ku ah waxa aan aaminsannahay.</p>
<h2 data-path-to-node="7">&nbsp;Dhinaca Cilmi-Nafsiga&nbsp;</h2>
<p data-path-to-node="8">Maskaxda bini''aadamku waxay jeceshahay nidaamka iyo is-waafajinta. Markaad waxa aad aaminsan tahay iyo waxa aad samaynayso ay is-khilaafaan, maskaxdaadu waxay dareentaa culeys weyn (psychological stress). Si ay culeyskaas isaga yareyso, maskaxdu laba waddo midkood ayay qaaddaa:</p>
<ol start="1" data-path-to-node="9">
<li>
<p data-path-to-node="9,0,0"><strong data-path-to-node="9,0,0" data-index-in-node="0">Inaad joojiso dhaqanka xun</strong> (Tani waa wadada adag).</p>
</li>
<li>
<p data-path-to-node="9,1,0"><strong data-path-to-node="9,1,0" data-index-in-node="0">Inaad maskaxda been u sheegto / Cudur-daar samayso</strong> (Tani waa wadada fudud ee badankeen aan marno).</p>
</li>
</ol>
<p data-path-to-node="10"><strong data-path-to-node="10" data-index-in-node="0">Tusaale dhab ah oo waqtigan dhallinyarada haysta:</strong></p>
<p data-path-to-node="10">Qof dhalinyaro ah ayaa ogaaday in sigaarka ama ''Vape''-ka ay caafimaadka halis ku yihiin. Laakiin weli wuu cabbaa. Halkan waxaa ka dhashay <em data-path-to-node="10" data-index-in-node="179">Cognitive Dissonance</em>. Halkii uu ka joojin lahaa, wuxuu maskaxdiisa ka dhaadhicinayaa: <em data-path-to-node="10" data-index-in-node="265">"Kaliya markaan stress dareemo ayaan cabbaa,"</em> ama <em data-path-to-node="10" data-index-in-node="315">"Awoowgeyba sigaar buu cabi jiray oo 90 sano ayuu noolaa."</em> Waa cudur-daar ay maskaxdu samaysay si ay iskaga dejiso dagaalka gudaheeda ka socda.</p>
<h2 data-path-to-node="12">&nbsp;Dhinaca Falsafadda</h2>
<p data-path-to-node="13">Falsafad dhankeeda hadaan ka eegno, <em data-path-to-node="13" data-index-in-node="16">Cognitive Dissonance</em> waxay na weydiisaa su''aal weyn: <strong data-path-to-node="13" data-index-in-node="69">Bini''aadamku ma runta ayuu raadiyaa, mise raaxo been ah?</strong></p>
<p data-path-to-node="14">Faylasuufyadii hore waxay aaminsanaayeen in aadamuhu yahay xayawaan caqli badan (Rational animal). Balse arrintani waxay muujinaysaa inaan nahay makhluuq caqliga isticmaala si uu u caddeeyo khaladaadkiisa (Rationalizing animal).</p>
<p data-path-to-node="15">Falsafaddu waxay ina leedahay, in aad ogaato is-khilaafkaaga waa bilowga xikmadda. Haddii aadan waligaa is-weydiin:&nbsp;<em data-path-to-node="15" data-index-in-node="112">"Waxa aan maanta samaynayo iyo qofka aan rabo inaan berrito noqdo, ma is-waafaqsan yihiin?"</em> waxaad ku noolaanaysaa nolol dhalanteed ah. Oggolaanshaha in aad is-khilaafsan tahay waa tallaabada koowaad ee lagu raadiyo runta noloshaada.</p>
<h2 data-path-to-node="17">&nbsp;Xaqiiqada Maalinlaha ah ee Dhallinyarada&nbsp;</h2>
<p data-path-to-node="18">Dhallinyarada maanta, isku-dhacan wuxuu si joogto ah uga dhacaa <strong data-path-to-node="18" data-index-in-node="64">Baraha Bulshada (Social Media)</strong> iyo <strong data-path-to-node="18" data-index-in-node="99">Saaxiibada (Peer Pressure)</strong>.</p>
<p data-path-to-node="18">Tusaale ahaan, Waxaad online-ka soo dhigtaa sawirro muujinaya inaad aad u faraxsan tahay, noloshaaduna tahay 100% kaamil. Laakiin gudaha, waxaad ka dareemaysaa cidlo, walwal, ama isku-buuq. Farqiga u dhexeeya noloshaada dhabta ah iyo shaashadda aad dadka tustid waa&nbsp;<em data-path-to-node="19,0,0" data-index-in-node="282">Cognitive Dissonance</em> weyn, waana sababta dhallinyaro badan ay niyad-jabka (depression) u dareemaan waqtigan.</p>
<h2 data-path-to-node="21">&nbsp;Dhinaca Diinta Islaamka (The Islamic Perspective)</h2>
<p data-path-to-node="22">Halkani waa meesha ugu quruxda badan ee diinteenu ay kaga hadashay arrintan qarniyo ka hor inta aanu cilmi-nafsiga casriga ahi magac u bixin.</p>
<p data-path-to-node="23">Islaamku isku-dhacan wuxuu ugu yeedhaa dagaalka u dhexeeya <strong data-path-to-node="23" data-index-in-node="58">Fitrah</strong> (Abuurka dabiiciga ah ee nadiifta ah) iyo dhaleecaynta ay samayso <strong data-path-to-node="23" data-index-in-node="131">Nafs Al-Lawwaamah</strong> (Nafta is-canaanta).</p>
<ol start="1" data-path-to-node="24">
<li>
<p data-path-to-node="24,0,0"><strong data-path-to-node="24,0,0" data-index-in-node="0">Nafta Is-Canaanta:</strong> Quraanka dhexdiisa, Allah wuxuu ku dhaartay <em data-path-to-node="24,0,0" data-index-in-node="63">Nafta is-canaanta</em> (Suuradda Al-Qiyaamah: "وَلا أُقْسِمُ بِالنَّفْسِ اللَّوَّامَةِ"). Marka aad dembi samayso, ama aad waqtigaaga iska lumiso, diiqadda iyo eedda aad gudaha ka dareemayso ma ahan wax xun, Waa calaamad muujinaysa in Iimaankaagu nool yahay. Waa qaylodhaan kaaga timaaday qalbigaaga oo ku leh:&nbsp;<em data-path-to-node="24,0,0" data-index-in-node="368">"War waxani adiga kuma qabtaan, dariiqii saxda ahaa ku noqo."</em></p>
</li>
<li>
<p data-path-to-node="24,1,0"><strong data-path-to-node="24,1,0" data-index-in-node="0">Munaafaqnimada (Hypocrisy):</strong> Khatarta <em data-path-to-node="24,1,0" data-index-in-node="37">Cognitive Dissonance</em> waa in haddii aad iska indhatirto muddo dheer, qofku wuxuu isu beddelaa Munaafaq. Wuxuu afka ka sheegtaa Iimaan iyo wanaag, laakiin ficilkiisu waa mid kale, wuuna la qabsadaa ilaa qalbigu ka madoobaado.</p>
</li>
<li>
<p data-path-to-node="24,2,0">&nbsp;Xalku waa <strong data-path-to-node="24,2,0" data-index-in-node="26">Tawbah</strong> (Toobad-keen). Islaamku kuma qasbayo inaad ahaato malaa''ig aan waligood khaldamin. Wuxuu ku leeyahay: Marka ficilkaagu khaldamo, ha samayn cudur-daar (Ha u raadin marmarsiiyo diineed ama mid caqliyeed). Si toos ah u qiro khaladkaaga, weydiiso Allah dembi-dhaaf, dibna isku sax.</p>
</li>
</ol>
<h2 data-path-to-node="26">Gunaanad: Sideed uga adkaan kartaa Dagaalkan?</h2>
<p data-path-to-node="27">Si aad uga baxdo isku-dhacan anfeed oo aad ugu noolaato nolol deggen oo nabad ah:</p>
<ul data-path-to-node="28">
<li>
<p data-path-to-node="28,0,0"><strong data-path-to-node="28,0,0" data-index-in-node="0">Jooji Cudur-daarka :</strong> Naftaada runta u sheeg. Haddii waxa aad samaynayso ay khaldan yihiin, qiro inay khaldan yihiin.</p>
</li>
<li>
<p data-path-to-node="28,1,0"><strong data-path-to-node="28,1,0" data-index-in-node="0">Yaree Farqiga:</strong> Ujeedada noloshaadu ha noqoto in waxa aad aaminsan tahay (Diintaada, qiyamkaaga, yoolkaaga) iyo waxa aad gacanta ku samaynayso ay is-raacaan.</p>
</li>
<li>
<p data-path-to-node="28,2,0"><strong data-path-to-node="28,2,0" data-index-in-node="0">Ka digtoonow cida aad la socoto:</strong> Haddii saaxiibadaa ay kuu kaxaynayaan meel ka soo horjeedda caqiidadaada iyo akhlaaqdaada, waa waqtigii aad saaxiibo cusub raadin lahayd.</p>
</li>
</ul>
<p data-path-to-node="29">Dhallinyaro, noloshu way fududahay marka qofka aad gudaha ka tahay iyo qofka aad dibadda ka tahay ay yihiin hal qof. Is-waafaji maskaxdaada, qalbigaaga iyo gacmahaaga, halkaas ayaa laga helaa guusha iyo xasiloonida dhabta ah.</p>', 'img_20260528_190022_fafa26361a3c9e6b.jpg', NULL, 8, 1, NULL, NULL, NULL, NULL, 'published', 0, 1, 68, 0, 0, NULL, '2026-05-28 00:45:00', NULL, '2026-05-28 01:04:28', '2026-07-19 04:12:52'),
(14, 'Dhibaatada Rasmiga ah ee Xidhiidhada Fogaanta (Long-Distance)', 'dhibaatada-rasmiga-ah-ee-xidhiidhada-fogaanta-long-distance', 'Dhibaatada Rasmiga ah ee Xidhiidhada Fogaanta (Long-Distance)', '<p><span style="font-size: 14pt;"><strong>Dhibaatada Rasmiga ah ee Xidhiidhada Fogaanta (Long-Distance)</strong></span></p>
<p data-path-to-node="6"><span style="font-size: 14pt;">Sababta dhabta ah ee ay u burburaan xidhiidhada loo yaqaan <strong><em data-path-to-node="6" data-index-in-node="59">Long-Distance-ka</em></strong> ayaan maanta idiin sheegayaa.</span></p>
<p data-path-to-node="7"><span style="font-size: 14pt;">Xidhiidhada labada qof ay kala fog yihiin, masaafadu si toos ah uma burburiso, laakiin kala fogaanshahaas ayaa abuura dhib kale oo ka sii daran: <strong data-path-to-node="7" data-index-in-node="145">wuxuu abuuraa meel bannaan.</strong></span></p>
<p data-path-to-node="8"><span style="font-size: 14pt;">Xidhiidhkiinu wuxuu isku beddelayaa sidii adigoo la hadlaya qof khiyaali ah ama <strong><em data-path-to-node="8" data-index-in-node="78">virtual person</em></strong>. Waayo, qofkii si toos ah uma arki kartid; ma ogid wuxuu dareemayo, wuxuu tabayo, iyo xaaladda dhabta ah ee uu ku sugan yahay midna.</span></p>
<p data-path-to-node="9"><span style="font-size: 14pt;">Tusaale ahaan, haddii aad isku guri deggen tihiin, markii uu saygagu ama xaaskaagu aamuso/aamusto, waad garan kartaa sababta uu u aamusay; laga yaabaa inay shaqadu maanta ku soo adkaatay, wejigiisana waad ka dareemi kartaa.</span></p>
<p data-path-to-node="10"><span style="font-size: 14pt;">Laakiin xidhiidhada kale ee lakala fog yahay, haddii qofku qoraalka (text-ga) la soo daaho ama uu kaa aamuso, ma garanaysid sababta dhabta ah. Ka dib, maskaxdaada ayaa bilaabeysa inay buuxiso meeshii bannanayd, adigoo wax dhalanteed ah iska samaysanaya. Waxaad iska odhanaysaa:&nbsp;<em data-path-to-node="10" data-index-in-node="278">"Laga yaabaa inuu iga xiiso dhacay,"</em> ama <em data-path-to-node="10" data-index-in-node="319">"Laga yaabaa inay dad kale la hadlayso."</em></span></p>
<p data-path-to-node="11"><span style="font-size: 14pt;">Waa inaad ogaataa, maskaxda bini-aadamku ma jecla meelaha banaan ama waxyaabaha aan kala caddayn, ka dibna iyadaa iskeed u mala-awaalata sheekooyin si ay meesha banaan u buuxiso. Waana dhibta ugu weyn ee haysata dadka kala fog; qof walba isagoon saaxiibkii wax badan ka ogeyn ayuu haddana mala-awaal iyo shaki ka aaminsan yahay.</span></p>
<p data-path-to-node="12"><span style="font-size: 14pt;">Sidoo kale, qofku xitaa haddii uu kula soo hadlo, oo aad <em data-path-to-node="12" data-index-in-node="57">Video Call</em> kuwada jirtaan, ma dareemi kartid culayska ama xaaladda dhabta ah ee uu dhex dabaalanayo.</span></p>
<p data-path-to-node="13"><span style="font-size: 14pt;">Baraha bulshadu (<em data-path-to-node="13" data-index-in-node="17">Social Media</em>) waxay inaga dhigeen inaan iska dhigno wax aynaan ahayn, iyo inaan muujino dareen aynaan dhab ahaan dareemayn. Markaad muddo fogaanta ku wada socotaan, hadalkiinu wuxuu isku beddelaa sidii hawshaan (<em data-path-to-node="13" data-index-in-node="229">assignment</em>) maalinle ah oo la iska gudbinayo: <em data-path-to-node="13" data-index-in-node="275">"Iska warran? Sidey shaqadu ahayd? Maxaad qabanaysaa?"</em> Ma jiro wax intaas dhaafsiisan oo la wadaago.</span></p>
<p data-path-to-node="14"><span style="font-size: 14pt;">Waa cajiib walee!</span></p>', 'img_20260612_175012_626de77554625943.jpg', NULL, 8, 1, NULL, NULL, NULL, NULL, 'published', 0, 1, 46, 0, 0, NULL, '2026-06-12 17:42:00', NULL, '2026-06-12 17:50:12', '2026-07-19 09:53:53');
INSERT INTO "blog_posts" ("id", "title", "slug", "excerpt", "content", "featured_image", "featured_image_alt", "category_id", "author_id", "meta_title", "meta_description", "meta_keywords", "focus_keyword", "status", "is_featured", "allow_comments", "view_count", "comment_count", "share_count", "estimated_read_time", "published_at", "scheduled_at", "created_at", "updated_at") VALUES
(15, 'dhibaatada ay balwadu leedahay ( daawashada filimada anshaxa xun)', 'dhibaatada-ay-balwadu-leedahay-daawashada-filimada-anshaxa-xun', 'Dhibaatada Aamusan: Sida aad iskugu beddesho qof ''Addict'' ah ama balwad leh adigoon xitaa is-ogayn', '<p>wiilkan waxa la dhahaa cumar oo isagu gartay inuu sheekadiisa inala wadaago.</p>
<p>Cumar muddo dheer wuxuu isku qancin jiray inuu caadadan iska deyn karo maalinta uu doono. Haddii la weydiin lahaa wuxuu odhan lahaa, "Arrintani wax weyn maaha, saacaddaan rabo ayaan iska joojin karaa." Xitaa isaga qudhiisu beentaas iska dhaadhiciyay. Wuxuu moodayay inuu isagu shookaanta hayo, oo aanay jirin awood isaga ka xoog badani.</p>
<p>Laakiin xaqiiqada dhabta ah ee uu ka ordayay waxay ahayd in arrintu si tartiib-tartiib ah isugu beddeshay silsilad dheer oo ku xidhan.</p>
<p>Bilowgii, waxay ahayd uun wax uu mararka qaar un isku maaweeliyo; marka uu caajiso, marka uu <em data-path-to-node="3" data-index-in-node="204">stress</em> dareemo, ama habeenada uu cidlada dareemo. Wuxuu u arkayay uun madadaalo yar oo aan dhib lahayn.</p>
<p>Laakiin maalmihii baa toddobaadyo noqday, toddobaadyadiina bilo ayey isku badaleen. Cumar muu dareemin xitaa goortay caadadani xididdada siibatay ee ay dhiiggiisa raacday.</p>
<p class="isSelectedEnd">Maalin ayuu is arkay isaga oo fadhiya sariirtiisa, telefoonkiisuna gacanta ugu jiro. Wuxuu furay boggii uu caadada u lahaa ee uu filimada xun ka daawan jirey. Markii uu arkay waxa shaashadda ka muuqda ayuu si lama filaan ah isu waydiiyay:&nbsp;&ldquo;Goormaan meeshan furay?&rdquo; .&nbsp;&nbsp;</p>
<p class="isSelectedEnd">Waxay ahayd markii ugu horraysay ee uu xaqiiqsado in jidhkiisu mararka qaar dhaqaaqayo ka hor intaan maskaxdiisu wax go''aan ah gaadhin. isla Daqiiqadaas argagax ayaa galay. Waayo markuu qofku&nbsp; wax iska sameeyo isagoon miyirkiisa la kaashan, wuxuu garwaaqsadaa in dhibku uu ka weyn yahay intii uu malaynayay.</p>
<p data-path-to-node="7">Cumar muddo dheer wuxuu u haystay inuu raaxo raadinayo. Lakin markuu si daacad ah muraayadda isugu eegay, wuxuu ogaaday inaanay arrintu raaxo raadin ahayn, ee ay tahay&nbsp;<strong data-path-to-node="7" data-index-in-node="161">Baxsad (Escape)</strong>.</p>
<p data-path-to-node="8">Markuu culays xaga nolosha ah dareemo, wuxuu u baxsan jiray shaashadda iyo bogagaas filimada laga daawado. Markuu niyad-jabo, halkaasuu u carari jiray. Markuu cidloodo ama nolosha ku daalo, meeshaas ayuu gabaad ka dhigan jiray. Wuxuu ka helayay dhowr daqiiqo oo uu ku ilaawo wax kasta oo adduunka ah oo dhibaya.</p>
<p data-path-to-node="9">Laakiin dhibta ugu weyni waxay ahayd; marka aad xaqiiqada ka carartid, way kusii sugaysaa. Markuu shaashadda damiyo, culayskii halkiisii ayuu sii joogay. Kalinimadii iyo niyad-jabkii uu dareemayay way kasii darayeen. Waxa kaliya ee uu arkayay inuu sii baaba''ayo jidh ahan iyo nafsad ahanba.</p>
<p data-path-to-node="10">Sanadihii dambe, wuxuu dareemay isbeddel weyn oo noloshiisa ku yimid. Waxyaabihii farxadd gelin jiray dhadhankii ba ka guurey oo farxadd kamu heli jirin.</p>
<p data-path-to-node="10">Inuu Saaxiibadii&nbsp; la sheekaysto, inuu waqti qoyskiisa la qaato, ama inuu horumar nolosha ka gaadho dhammaantood waxay la noqdeen wax iska caadi ah oo aan xiiso gelin isaga. Maskaxdiisu waxay la baratay maandooriye iyo kicin xad-dhaaf ah, sidaas darteed noloshii caadiga aheyd waxay la noqotay mid caajis ah oo aad u gaabis ah.</p>
<p class="isSelectedEnd">Mararka qaar wuxuu fadhiisan jiray meel dad badani joogaan, laakiin haddana wuxuu dareemi jiray cidlo.&nbsp;Wuxuu la hadli jirey dad badan, hadana muu dareemayn xidhiidh dhab ah oo ka dhaxeeya isaga iyo dadkaa. wuu qosol badnaa , balse qalbigiisa holac baa ka baxayay.&nbsp;</p>
<p class="isSelectedEnd">Waxa ugu xanuunka badnaa waxay ahayd kalsoonidii naftiisa oo daciiftay. Markuu muraayadda hor istaago, ma arki jirin ninkii uu rabay inuu noqdo. Wuxuu lahaa himilooyin, qorshayaal iyo riyooyin waaweyn. Lakin maalin walba wuxuu dareemayay inuu ka fogaanayo ninkii uu rabay inuu noqdo. Hawlihii muhiimka u ahaa dib ayuu u dhigi jiray. Waqtigii uu noloshiisa ku dhisi lahaana wuu gubayay.</p>
<p class="isSelectedEnd">Ugu dambayntiina wuxuu ogaaday in dhibaatadu aanay ahayn waxan uu daawanayo oo kaliyee, ee ay tahay&nbsp;<strong data-path-to-node="13" data-index-in-node="98">waxa uu luminayo</strong>. Wuxuu luminayay waqtigiisii, tamartiisii, diiraddiisii, iyo qaybo muhiim ah oo naftiisa kamid ahaa isagoon dareensanayn.</p>
<p class="isSelectedEnd">Mar kasta oo uu yidhaahdo <em data-path-to-node="14" data-index-in-node="26">" waa markii iigu dambaysay een sameynayo,"</em> muddo yar ka dib isla meeshii ayuu hadana ka bilaabi jirey caadadii xumeyd.</p>
<p class="isSelectedEnd">Markii hore wuu la yaabin jirtay arrintan iyo sababta uu kolba ugu soo noqnonayo, lakin markii dambe wuu iskala qabsaday. Taasina waxay ahayd qaybtii ugu xanuunka badnayd noloshiisa.</p>
<p class="isSelectedEnd">Waayo wuxuu ogaaday in qabatinku (<em data-path-to-node="14" data-index-in-node="295">addiction-ku/ balwadu</em>) aanu ahayn uun markaad xakamaynta naftaada weydo. Mararka qaar qabatinku waa markaad ka daasho dagaalka aad naftaada kula jirtid kadibna aad is-dhiibto. Waa Markaad aaminto inaanad isbeddeli karin. Markaad iska dhaadhiciso in kani yahay qofka aad tahay.</p>
<p class="isSelectedEnd">Laakiin habeen habeenada ka mid ah, Cumar intuu qolkiisii soo galay ayuu sariirtiisii cidhifka kaga fadhiistay. Aamusnaan dheer kadib, telefoonkii ayuu iska fogeeyay. Qolku wuu deggan yahay. Markii ugu horreysay muddo dheer kadib, muu iskumuu dayin inuu dareenkiisa iyo xanuunkiisa ka baxsado. Wuxuu go''aansaday inuu xaqiiqada iyo runta isu sheego. Xaqiiqadaas oo aan dhagaha u roonayn, laakiin ahayd runta biyo-kama-dhibcaanka ah.</p>
<p class="isSelectedEnd">Wuxuu qirtay inuu daalay.<br>Wuxuu qirtay inuusan faraxsanayn.<br>Wuxuu qirtay in noloshu socoto isna uu meel iska taagan yahay.<br>Wuxuu qirtay inuu u ooman yahay isbeddel dhab ah.</p>
<p class="isSelectedEnd">Maalintaas mucjiso cirka kama soo dhicin. Subaxdii xigtayna qof cusub muu noqon. Dhibaatadiina hal mar may wada dhammaan. Laakiin wax weyn ayaa isbeddelay. Waayo wuxuu ugu dambayn joojiyay beentii uu naftiisa ku maaweelinayay. Wuxuu bilaabay inuu si daacad ah isu wajaho.</p>
<p data-path-to-node="18">Wuxuu fahmay in bogsashadu aanay ka bilaaban inaad qof kaamila (<em data-path-to-node="18" data-index-in-node="75">perfect</em>) noqoto, ama inaad guul degdeg ah gaadho. Waxay ka bilaabataa marka aad runta qiratid. Marka aad tidhaahdid: <strong data-path-to-node="19" data-index-in-node="0">"Waan dhibbanahay. Waan kufay marar badan. Laakiin wali dagaalka kama bixin."</strong></p>
<p>Sababtoo ah mar kasta oo uu is-xakameeyo oo uu ka hortago damacii iyo xumaantii uu shalay ku dhici jiray, wuxuu dib u soo ceshanayay qayb yar oo naftiisa kamid ah. Qaybtii kalsoonida. Qaybtii geesinimada. Qaybtii rajada. Tallaabo tallaabo, maalinba maalinta xigta, wuxuu bilaabay inuu dib u dhiso ninkii uu mar ahaan jiray.</p>
<p>Ugu dambayntiina wuxuu gartay, in soo kabashadu aanay ahayn hal maalin oo aad guul gaadhay, ee ay athay inaad maalin kasta doorato inaadan is-dhiibeynin.</p>', 'img_20260613_200910_e3a82a5197649c4b.png', NULL, 3, 1, NULL, NULL, NULL, NULL, 'published', 0, 1, 135, 0, 0, NULL, '2026-06-13 19:09:00', NULL, '2026-06-13 20:09:10', '2026-07-19 13:23:38'),
(16, 'Saynisku Maanta Ayuu Ogaaday Wax Islaamku Qarniyo Hore Inoo Sheegay', 'saynisku-maanta-ayuu-ogaaday-wax-islaamku-qarniyo-hore-inoo-sheegay', NULL, '<h1>Saynisku Maanta Ayuu Ogaaday Wax Islaamku Qarniyo Hore Inoo Sheegay</h1>
<p>Assalamu Alaikum warahmatullahi wabarakatuh.</p>
<p>Dhawaan waxaan dhegaysanayay podcast uu ka hadlayay nin la yidhaahdo Dr. Joe Dispenza oo ah cilmi-baadhe daraaseeya sida maskaxdu u shaqayso iyo saamaynta ay fikirradeennu ku leeyihiin jidhkeenna iyo nolosheenna.</p>
<p>Intii aan dhegaysanayay, hal arrin ayaa si weyn ii soo jiidatay. Mar kasta oo uu sharxayo wax cusub oo saynisku hadda bilaabay inuu fahmo, waxaan is lahaa: &ldquo;War arintani miyaaney diinteennu hore inoogu sheegin?&rdquo;</p>
<p>Waxa uu ka hadlayay sida qofku uga bogsan karo dhaawacyadii hore, sida walbahaarku jidhka u saameeyo, sida mahadnaqu nolosha u beddelo, iyo sida maskaxda loo tababari karo. Markaan sii dheeraadayna waxaan arkay in fikrado badan oo uu soo bandhigayo ay si toos ah ula xidhiidhaan waxyaabo Qur''aanka iyo Sunnuhu inoo sheegeen qarniyo badan ka hor.</p>
<p>Maqaalkan kuma soconayo inaan idinla wadaago cilmi adag ama ereyo waaweyn. Waxaan si fudud uga sheekayn doonaa fikradaha ugu muhiimsan ee aan ka faa''iidaystay podcast-kaas, iyo sida ay ula jaanqaadayaan diinteenna Islaamka.</p>
<p>Haddii aad xiisaynayso horumarinta naftaada, caafimaadka maskaxda, ama aad rabto inaad si fiican isu fahanto, waxaan filayaa inaad halkan ka heli doonto qodobo mudan in laga fekero.</p>
<h2>Sababta Aynu Uga Gudbi La&rsquo;nahay Wixii Tagay</h2>
<p>Mid ka mid ah waxyaabaha ugu yaabka badnaa ee Dr. Joe ka hadlay wuxuu ahaa sida maskaxdeennu ugu dhegganaato wixii ina dhaawacay.</p>
<p>Mararka qaarkood dhibaatadu ma aha waxa dhacay, ee waa inta jeer ee aynu dib ugu noqonno. Marka aad mar kasta dib u xasuusato xanuun hore, jidhkaagu wuxuu u falcelin karaa sidii inay arrintaasi hadda dhacayso.</p>
<p>SubhanAllah, tani waa sababta Islaamku inoogu dhiirrigeliyo inaanan ku noolaan wixii tagay. Nebigu (NNKH) wuxuu Alle ka magangeli jiray murugada iyo walbahaarka, waxaana nala baray inaan xoogga saarno waxa ina anfaca maanta.</p>
<p>Sidoo kale cafisku ma aha hadiyad aad qof kale siinayso. Inta badan waa culays aad naftaada ka dejinayso.</p>
<p>Mararka qaarkood tallaabada ugu horreysa ee bogsashadu waa inaad aqbasho wixii dhacay, ka dibna aad iska dayso inaad maalin kasta dib ugu noolaato.<br><br><span style="font-size: 18pt;"><strong data-path-to-node="6" data-index-in-node="0">Inaan ka kacno hurdo-ku-socodka</strong> </span></p>
<p>Qodobada ugu waaweyn ee barnaamijka waxaa ka mid ahaa in 95 boqolkiiba nolosheena maalmiilaha ah ay maamusho maskaxdeena qarsoon (subconscious mind). Tani waxay ka dhigan tahay inaan nolol&nbsp; iskeed isku waddo aan iska dhex soconno. Waan soo kacnaa, waxaan samaynaa isla wixii shalay, isla fikradihii xumaa ayaan ka fikirnaa, isla sidii hore ayaana uga falcelinaa dhacdooyinka maalin kasta.</p>
<p class="isSelectedEnd">Haddii si dhab ah loo eego, dad badan ma noola ee way hurdo socdaan. Waxay leeyihiin caadooyin soo noqnoqda oo iyagu is wada.</p>
<p class="isSelectedEnd">Taasina waa sababta isbeddelku ugu adkaado dad badan. Wax cusub ma samaynaysid, wax cusubna kama fikiraysid.</p>
<p class="isSelectedEnd">Islaamkuna arrintan si qurux badan ayuu inoogu baraarujiyay. <em>Tafakkur</em>, <em>Muhasabah</em>, iyo waqtiyada aad kaligaa la joogto Rabbigaa waxay kaa saarayaan mashquulka joogtada ah ee nolosha iyo warwarkeeda.</p>
<p class="isSelectedEnd">Marka aad Tahajjud u kacdo ama aad salaadda Subax ka dib meel yara fadhiisato adigoo fikiraya, ma aha oo keliya cibaado. Waa daqiiqado aad dib isu xusuusinayso qofka aad tahay, meesha aad u socoto, iyo waxa run ahaantii muhiimka kuu ah.</p>
<p>Mararka qaarkood waxa ugu badan ee aynu u baahan nahay ma aha xog cusub. Waa baraarug cusub.<br><br></p>
<h2>Inaad Alle Wanaag Ka Filato</h2>
<p>Qaybtan ayaa ahayd tii iigu sii yaabka badnayd.</p>
<p>Dr. Joe wuxuu sheegay in haddii aad rabto inay noloshaadu is beddesho, aanad ku noolaan karin cabsi, shaki, iyo fikir xun maalin kasta, adigoo haddana sugaya natiijo wanaagsan. waa waxaan is qabaneynin.</p>
<p>Wuxuu ku celceliyay hal fikrad: ka hor inta aan nimcadu iman, waa inaad qalbigaaga ku abuurtaa mahadnaq iyo yididiilo.</p>
<p>SubhanAllah, tani waxay si toos ah ii xasuusisay <em>Husnu al-Dan billah</em>.</p>
<p>Muslimku wuxuu ogyahay in Rabbigiisu yahay Mid Naxariis badan, Deeqsi ah, oo addoomihiisa wanaag la jecel. Sidaas darteed marka aad Ducaysanayso , ma ducaysaneysid adigoo niyadda ka leh "malaha lama iga aqbali doono."</p>
<p>Waxaad duceysanaysaa adigoo qalbigaaga ka aaminsan in Alle ku maqlayo, oo uu kuu doori doono wixii khayr kugu jiro.</p>
<p>Ma aha inaad wax xun iska dhaadhiciso ama mala-awaal ku noolaato. Waa inaad la timaad <em>Tawakkul</em> dhab ah. Waa inaad dadaal samaysaa, ka dibna qalbigaaga ku dejisaa kalsoonida aad ku qabto Rabbigaaga.</p>
<p>Qofka Alle wanaag ka fishaa wuxuu ku noolaadaa rajo. Qofka rajadu qalbigiisa ka buuxdaana, nolosha ayaa u fududaata.</p>
<h2>Bogsashadu Waxay Ka Bilaabataa Gudahaga</h2>
<p>Qodob kale oo xiiso lahaa ayuu Dr. Joe ka hadlay. Wuxuu sheegay in marka qofku ku jiro xaalad&nbsp; walbahaar joogto ah, in aanay maskaxdiisa oo keliya saamaynayn, ee jidhkiisuna la dhibtoonayo.</p>
<p>Laakiin marka qofku helo deganaansho, hurdadiisu hagaagto, walbahaarkuna yaraado, jidhkuna si ka duwan ayuu u shaqaynayaa.</p>
<p>Anaga Muslimiin ahaan arrintani naguma cusba.</p>
<p>Waxaan ognahay in Alle yahay <em>Ash-Shafi</em>, Bogsiiyaha dhabta ah. Waxaan kaloo ognahay in Ducada, Qur''aan akhriska, iyo Dikrigu aanay qalbiga oo keliya dejinayn, ee qofka oo dhan saamaynayaan.</p>
<p>Dabcan taa macnaheedu ma aha in daawooyinka iyo sababaha ( in dawoyinka la qaato) la iska daayo. Islaamku mar walba wuxuu ina barayaa inaan daawooyinka qaadanno.</p>
<p>Laakiin marka daawooyinka lagu daro qalbi deggan oo Alle ku xidhan, qofku wuxuu noqonayaa mid caafimaad ahaan dhameystiran jidh ahaan iyo ruux ahaanba.</p>
<p>Waxaaba laga yaabaa in sababta aynu mararka qaarkood u daalno aanay shaqada badan ahayn, ee ay tahay culayska aynu qalbiga ku sidanno.</p>
<h2 data-section-id="16fhjo4" data-start="0" data-end="18">Isku Soo Duuboo</h2>
<p data-start="20" data-end="162">Haddii waxaas oo dhan hal eray lagu soo koobo: saynisku maanta wax badan ayuu ogaaday, laakiin Islaamku hore ayuu inoogu sheegay wax walba.</p>
<p data-start="20" data-end="162"><br>Nolosha ha isku dhibin oo ha ku buuxin stress aan loo baahnayn. Maalin kasta dhowr daqiiqo is deji, nimcooyinka Alle ku siiyay xasuuso, cid kasta oo ku dhibtayna iska cafi, si dhab ahna u duceyso adigoo aaminsan in Alle ku maqlayo oo uu sida ugu khayr badan kuugu jawaabayo.</p>
<p data-start="20" data-end="162">Ugu dambayn, noloshu ma aha buuq iyo degdeg kaliya. Waa xasillooni, waa faham, waa xiriir dhab ah oo aad la yeelato Rabbigaaga.<br><br>macsalaama.&nbsp;</p>', 'img_20260615_202313_baeba300321e04a7.jpg', NULL, 3, 1, NULL, NULL, NULL, NULL, 'published', 0, 1, 102, 0, 0, NULL, '2026-06-15 18:52:00', NULL, '2026-06-15 17:31:18', '2026-07-19 13:25:17');
INSERT INTO "books" ("id", "title", "author", "description", "cover_image", "file_link", "is_paid", "is_active", "category", "pages", "price", "file_size", "file_hash", "total_downloads", "views", "created_at", "updated_at", "average_rating", "total_reviews", "reading_time_estimate") VALUES
(31, 'atomic habits', 'james clear. turjume: ismail abdi ismail', 'Waxaan ku faraxsanahay inaad buuggan heshay oo aad doonayso inaad wax ka faa’iido. Buuggan waa mid ka mid ah buugaagta ugu fiican ee lagu barto horumarinta nafta iyo dhisidda caadooyinka wanaagsan. Waxa ku jira buuggan casharro aad u fudud kuwaasoo kaa caawinaya inaad dhisto caadooyin wax kuu taraya, kuwii horena aad ka takhalusto oo aad gabi ahaanba meesha ka saarto. Buuggan waxa aan ku soo koobi doonaa cutubyada ku jira buugga “ATOMIC HABITS”, iyadoo aan u qoray si yar oo fudud oo aanad ku caajiseyn akhrintiisa. Uma baahnid inaad buugga weyn akhrid', 'cover_1762987391_8b099a5e.webp', 'book_1762987391_1372f6eb.epub', 0, 1, 'free', 89, NULL, '2078469', NULL, 0, 0, '2025-11-12 22:43:11', NULL, NULL, 0, NULL),
(35, 'siraha basaaska ee ku badbaadin kara.', 'jason hanson . turjume: ismail abdi ismail', 'Kusoo dhawoow buggan cajiibka ah .
Buugan  waxaad  ka  heli  doontaa  ,  kuna baran   dooonta   xog   aad   u muhiima oo noloshaada badbaadin karta . 
talooyinka iyo tusaalooyinka ku jira buugan waa kuwo la hubo oo ka yimaaday khabiir xaga amaanka ah .
Hadafka buugani waa inuu ku siiyo xogtii aad u baahnayd si aad nolol amaan ah ugu nolaato khatarahana uga fogaatid . 
Waxaad ku baran doonta sidii aad u noqon lahayd qof  dhiiran   , qof  ogaan   karaya   markay khatar jirto iyo qof is difaaci karaba .
Waxaan rajaynayaa inuu buugani ku caawin doono .', 'cover_1763415279_9f28275a_1779981757.webp', 'book_1763415279_e58cbafe.epub', 1, 1, 'premium', 100, 2, '58883', NULL, 16, 0, '2025-11-17 21:34:39', '2026-07-19 03:38:14', NULL, 0, NULL),
(36, 'xirfadaha qancinta dadka', 'ismail abdi', 'Buugani maaha sida bugaagta kale oo mar walba xaga wanaagsan wax ka eegta , buugan wuxuu ku bari doona farsomooyin iyo xirfado hadii aad ku dhaqanto kaa dhigi doona qofka ay dadku u adeegaan iyagoon ka warqabin inay ku adeegayaan. Waxa aan kusoo ururiyay fikrado badan oon isleeyahay waa kuwii ugu wax tarka badnaa marka ay timaado qancinta dadka .
buugani maaha buug ay erayo waawayn oo soomali ah ku jiraan , umaan qorin sida qorayaasha kale kuwaaso isku daya inay iska dhigaan aqoon-yahano,bugagtana ku qora erayo waawayn oo aanay dhalintu fahmayn.', 'cover_1763575396_415f359f_1779981757.webp', 'book_1763575396_3b07a91d.epub', 1, 1, 'premium', 80, 1, '18976', NULL, 6, 0, '2025-11-19 18:03:16', '2026-07-19 07:56:11', NULL, 0, NULL),
(37, 'noqo femme fatale', 'ismail abdi', 'Ugu horeyn kusoo dhawoow aduun aad ku noqon doontid gabar adag oo waxay doonto qabsan karta . buuggan waxa aan u hibeeyay hablaha soomaliyeed kuwasoo ay ragu badanka xumeeyaan .

Buugani wuxuu ku barayaa sidii aad u isticmaali lahayd awoodaada una wajahi lahayd aduunkan adag ee ay ka buxaan wax isdaba marinta iyo khiyaanoyinku.
Sidoo kale buugan waxa ku jira farsamooyin aad khatar u ah oo aad raga uga dhigi karto inay ku daba cararaan . inaad qof ku waalato ood daba cararto waa dhibaato cilmi-nafsi ahaan. Qof kasta maskaxdiisa waad gali kartaa hadii aad raaciso practice( ku celcelin ) waliba waad maamuli kartaa qofkaa.', 'cover_1763588326_8782d181_1779981757.webp', 'book_1763588326_0313233a.epub', 1, 1, 'premium', 100, 2, '49817', NULL, 10, 0, '2025-11-19 21:38:46', '2026-05-28 15:22:37', NULL, 0, NULL),
(38, 'hababka maskax dhaqista umadaha', 'ismail abdi', 'Hadii aynu bini-aadam nahay waxaan samayn karnaa waxyaabo cajiib leh, aduunkan sida aan doono ayaan ka yeeli karnaa, balse sidoo kale waxaynu nahay noolayaal si fudud loo khiyaami karo ama maskaxda looga badali karo
Buugani kooban wuxuu ku saabsan-yahay sida fudud ee umad dhan maskaxda looga qabsan karo ama loo maamuli karo iyaga oon ku digtoonayn .
hababka ku qoran buugani waa sida ay dawladaha iyo dadka xilalka haya u maamulaam umadaha ,maskaxdana uga badalaan.', 'cover_1763732788_8c3a870e_1779981757.webp', 'book_1763732788_ab3e0bbf.epub', 0, 1, 'free', 80, NULL, '14379', NULL, 0, 0, '2025-11-21 13:46:28', '2026-05-28 15:22:37', NULL, 0, NULL),
(42, 'CILMI NAFISGA LACAGTA', 'morgan housel turjume: ismail abdi ismail', 'Casharro Waara Oo Ku Saabsan Hantida, Dhuuniga Iyo Farxadda. 
buugani wuxu ku barayaa wax badan oo ku saabsan lacagta iyo sidii aad u maareyn lahayd . 

Buuggan wuxuu ka hadlayaa xaqiiqada ah in sida aad lacagta ula dhaqanto ay ka muhiimsan tahay heerka caqligaagu yahay. Waxaa dhici karta in qof aad u caqli badan uu si qaldan u maareeyo lacagtiisa, taasoo keeni karta in uu waayo fursado muhiim ah.', 'cover_1763914814_488eba0a_1779981757.webp', 'book_1763914814_da0dc17c.epub', 1, 1, 'premium', 230, 1, '90334', NULL, 20, 0, '2025-11-23 16:20:14', '2026-07-19 07:56:19', NULL, 0, NULL),
(43, 'SUBTLE ART OF NOT GIVING A FUCK', 'jason hanson . turjume: ismail abdi ismail', 'Buuggan uu qoray Mark Manson, wuxuu ka hadlayaa sida diirada loo saaro waxa dhabta ah ee nolosha muhiimka u ah. Wuxuu sharraxayaa in furaha nolosha wanaagsan eed rabto uu ku jiro gacmahaaga.

Buugu wuxuu ina barayaa sida aan loo danayn waxyaabaha aan muhiimada kuu ahayn noloshaada, iyo sida fikradan fududi ay kuugu horseedi karto isbedello la yaab leh noloshaada.

Waxa kale oo uu buugani sahaminayaa micnaha dhabta ah ee farxaddu leedahay, wuxuuna sharraxayaa in hadii aad rabto inaad hesho farxadd dhab ah ay lama huraan tahay inaadan waxyaabaha qaar danayn ood badaa ka martid.

BUUGANI WAA KAAGI, MAANTA AKHRI OO NOLOSHAADA BEDEL.', 'cover_1763989907_d32209e0_1779981757.webp', 'book_1763989830_29666efa.epub', 0, 1, 'free', 100, NULL, '30255', NULL, 2, 0, '2025-11-24 13:10:30', '2026-05-28 15:22:38', NULL, 0, NULL),
(44, 'U dhaqan sidii Marwo , U fikir Sidii Nin.', 'steve harvey. turjume: ismail abdi ismail', '"UDhaqan Sida Marwo,UFikir Sidii Nin" waa buug haweenka u oggolaanaya inay fahmaan dhaqanka iyo dhiirrigelinta ragga, si ay guul uga gaadhaan xiriirka ay ragga la leeyihiin.

Buuggu wuxuu ku dhiirrigelinayaa haweenka inay iska tuuraan talooyinka duugga ah iyo khuraafaadka ku saabsan ragga, wuxuuna buuggani bixinayaa aragtiyo wax-ku-ool ah oo ku saabsan siday haweenaydu u heli lahayd xiriir iyo lamaane qanciya.

“Kusoo dhawoow adduunka fahamka maskaxda ragga.”', 'cover_1763995010_1953e922_1779981758.webp', 'book_1763995010_02e69f74.epub', 1, 1, 'premium', 100, 1, '32945', NULL, 7, 0, '2025-11-24 14:36:50', '2026-06-24 21:25:25', NULL, 0, NULL),
(45, 'SIRAHA GANACSIGA .', 'ALAA ALSAADI . TURJUME : ISMAIL ABDI ISMAIL', 'Hage dhamaystiran oo ku saabsan saamaynta dadka adigoo isticmaalaya habab maskaxaysan , luuqada jidhka , soo jeedin qarsoon iyo siraha qancinta dadka si aad ganacsiga guul uga gaadhid 

Hadafka buugu waa : inay labada dhinacba guulaystaan iibiyaha iyo laga iibiyaha.

akhri oo ganacsigaga guul ka gaadh.', 'cover_1764015275_892b97cd_1779981758.webp', 'book_1764015275_2e3139bd.epub', 1, 1, 'premium', 200, 1, '76062', NULL, 4, 0, '2025-11-24 20:14:35', '2026-06-08 14:36:56', NULL, 0, NULL),
(46, 'what does it all mean', 'thomas negel. turjume: ismail abdi ismail', 'Buuggani waa hage sahlan oo wax kaa baraya falsafadda, waxa loogu talagalay dadka ku cusub maadadan falsafadda. Uma baahnid, lagamana baahna inaad aqoon hore u leedahay maadadan si aad u akhrido. Buuggani waxa loogu talagalay cid walba oo xiisaynaysa falsafadda iyo inay maskaxdooda tuujiyaan. Ku soo dhawoow adduunka falsafadda.

Dadka intooda badani waxay is-weydiiyaan su’aalaha falsafadda quseeya markay jiraan da’da 14 iyo wixii ka sareeya.

Su’aalaha waxa ka mid ah:

1. Maxaa run ah ee jira?

2. Wax walba ma ogaan karnaa?

3. Maxaa sax ah, maxaase qalad ah?

4. Waa maxay macnaha noloshu? Ama noloshu macno gooni ah ma leedahay?

5. Dhimashada kadib maxaa dhaca?

Su’aalahani ma aha kuwo cusub — waxa la is-weydiiynayay kumanaan sano ka hor, laakin su’aalahani waxay ku yimaadeen fikir aan ka fikirnay awgeed oo aan maskaxdeena iska weydiinay, ma aha waxyaabo aan buugaagta ka akhrisannay.

Ujeedada buuggani waa inuu kaa caawiyo inaad su’aalahan si toos ah uga fikirto . markaad su’aalahan ka fikirto ood iswaydiiso , waxaad awood u yeelan doontaa inaad sidoo kale fahanto aragtiyaha falsafad-yahanadii hore kuwaaso isku dayay inay ka jawaabaan su’aalahan.', 'cover_1764022327_faed396b_1779981758.webp', 'book_1764022327_ef609265.epub', 1, 1, 'premium', 200, 1, '45807', NULL, 4, 0, '2025-11-24 22:12:07', '2026-06-06 16:19:02', NULL, 0, NULL),
(47, 'Dalxiiskii xeebaha', 'cabdiraxmaan rafiiqi', 'Sheekadaan soo socota ee la magac baxday Dalxiiskii xeebaha waa
sheeko faneed aan doonayo in aan uga hadlo wanaag falidda iyo faa''iidada uu
leeyahay, waxaa ku dhex dammashaadaaya nin la yiraahdo Duuri oo diyaar u ah
in uu magaalo kasta safar gaaban ku tago isaga oo meelkasta wanaag uga taganaya
iskana ilaalinayo in uu xumaato meel uun ka abuurto, marar dhawr ah ayuu ku
badbaadayaa wanaag uu sameeyay. Waa sheeko aan ugu talagalay in ay hagto
dalxiise yaasha jecel in ay magaaladooda ka tagaan oo ay mid kale aaddaan,
waxaa ay qofka tusaysaa waxyaabaha mudan in la sameeyo iyo kuwa aanay
fiicnayn in la falo inta dalxiiska lagu guda jiro. Waa sheeko ku dareensiin doonta
dalxiiska iyo qiimahiisa, waxyaabaha ay la kulmaan dalxiise yaasha iyo sida ay
mararka qaar adiga oo dalxiise ah aad ugu baahan karto in aad iska caabbin
samayso.', 'cover_1764232786_8b6d0c16_1779981758.webp', 'book_1764232786_1831d836.epub', 0, 1, 'free', 100, NULL, '22992', NULL, 0, 0, '2025-11-27 08:39:46', '2026-05-28 15:22:38', NULL, 0, NULL),
(49, 'Eat that frog', 'brian tracy. turjume: ismail abdi ismail', 'Buugan la magac baxay “ eat that frog” gabigiisuba wuxuu ku saabsan yahay sidii aad uga takhalusi lahayd wahsiga iyo is-dhigashada iyo sidii aad ku baran lahayd inaad waqtiqaaga si fiican u maamulato . waa wax caan ah inuu qofku mararka qaar dareemo jahwareer iyo culays badan oo xaga shaqadiisa ah , laakin buugani wuxuu ku barayaa inaad qabsato ood dhamayso shaqooyinku ugu muhiimsan ugu horeynta - arintan waxa loo yaqaan “ cunista raha” . markaad sidan sameyso wax badan ayaad qabsan doontaa , farxad badana waad dareemi doontaa .', 'cover_1767394917_310526be_1779981758.webp', 'book_1767394917_ed6e7fb2.epub', 1, 1, 'premium', 100, 1, '19841', NULL, 5, 0, '2026-01-02 23:01:57', '2026-07-09 09:54:51', NULL, 0, NULL),
(50, 'psychological types', 'carl jung . turjume : ismail abdi ismail', 'Ma is weydiisay sababta dadka qaar aad markiiba isku fahantaan, halka kuwo kalena aad is qaban weydaan? Buugga "Psychological Types" ee uu qoray khabiirka caanka ah ee Carl Jung, waa fure kuu sahlaaya inaad si dhab ah u fahanto naftaada iyo dadka kugu xeeranba.

Buuggani wuxuu si qoto dheer u falanqaynayaa dabeecadaha kala duwan ee dadka iyo sida ay u saameeyaan nolosheenna maalin laha ah. Waxaad ku baran doontaa sababta ay dadka qaar u jecel yihiin dhex-galka bulshada iyo firfircoonida, halka kuwo kalena ay doorbidaan deggenaanshaha iyo inay kelidood ahaadaan. Wuxuu kuu iftiiminayaa in dadku u kala baxaan qaar caqliga raaca iyo qaar dareenkooda ku go''aan qaata, taas oo fure u ah fahamka dadka kugu xeeran.

Halkii aad is-weydiin lahayd sababta aad dadka qaar isku fahmi la’dihiin, buuggan ayaa ku baraya sida aad ula macaamili lahayd qof kasta adiga oo eegaya qaabka uu u fikirayo. Waxaad ogaan doontaa in kala duwanaanshuhu aanu ahayn dhib, balse uu yahay fursad lagu dhisi karo xidhiidho adag oo ku dhisan ixtiraam iyo is-faham dhab ah. Waa hagahaaga kowaad ee barashada naftaada iyo horumarinta xidhiidhada aad la leedahay dadka kale.', 'cover_1767645856_bc6340be_1779981758.webp', 'book_1767645856_6a6358b6.epub', 1, 1, 'premium', 100, 2, '24600', NULL, 10, 0, '2026-01-05 20:44:16', '2026-07-09 09:54:55', NULL, 0, NULL),
(51, 'Jiilka walwalku dilay ( The Anxious Generation - 2024)', 'Jonathan Haidt. turjume : ismail abdi ismail', 'Buuggani wuxuu si cad u iftiiminayaa sababta ay carruurta maanta jirtaa ay dhibaatoyinka iyo walwalku ugu badanyihiin. Wuxuu sheegaya in laba arrimood ay isasoo dhex galeen: Ciyaartii oo ay carruurtu ka tageen iyo talefannada gacanta oo xili hore loo fasaxay.

buuggani waa kaagi . ka faa''ideyso.', 'cover_1767646417_8539c2c1_1779981758.webp', 'book_1767646417_4aa630ee.epub', 1, 1, 'premium', 100, 1, '18343', NULL, 2, 0, '2026-01-05 20:53:37', '2026-05-28 15:22:38', NULL, 0, NULL),
(52, 'wealth of nations', 'Adam smith. turjume : ismail abdi ismail', 'Buuggan la yidhaahdo Hantida Qarammada waa mid si wayn looga haybadaysto dunida marka laga hadlayo cilmiga dhaqaalaha. Wuxuu si qoto dheer u lafo-gurayaa sida ay waddamadu hantida u sameeyaan ama ku taajiraan. Adam Smith wuxuu ku doodayaa in haddii dadka loo daayo inay dantooda gaarka ah raacdaan, suuqana laga dhigo mid furan oo xor ah (free market)— iyadoo aanay dawladdu soo faragelinayn, in markaas ay ummaddu gaadhayso barwaaqo iyo horumar dhab ah.', 'cover_1767890605_df869262_1779981759.webp', 'book_1767890605_2fff4228.epub', 1, 1, 'premium', 100, 2, '29884', NULL, 3, 0, '2026-01-08 16:43:25', '2026-05-28 15:22:39', NULL, 0, NULL),
(54, 'The Laws of Human Nature (Xeerarka Dabeecadda Aadanaha)', 'Robert Greene. turjume: ismail abdi ismail', 'The Laws of Human Nature, waa buug aan caadi ahayn oo si qoto dheer u galaya sirta dabeecadda bini’aadamka iyo waxa dhabta ah ee dhaqaajiya ficilladeena. 

Buuggan xikmadda badan xambaarsani wuxuu daaha ka qaadayaa ujeeddooyinka qarsoon ee qaabeeya nolosheena—kasoo bilow dareenkeena dabiiciga ah iyo qiyamka aynu jiil ahaan u dhaxalnay, ilaa sida xasuusta geeridu u saamayso go’aannada aynu maalin walba qaadanno. 
Waa muraayad ku tusaysa waxa ka dhex guuxaya naftaada iyo dadka kaleba.

Waxa buugga ka buuxa sheekooyin cajiib ah iyo talooyin toos ah oo aad noloshaada dhabta ah ku dabaqi karto. Buuggani wuxuu ku siinayaa awood aad si fiican ugu fahanto naftaada iyo dadka kugu xeeranba, taas oo kuu sahlaysa inaad yeelato xidhiidho macno leh oo qoto dheer, kana fogaato isku-dhacyada aan loo baahnayn. Fur sanduuqa sirta ah ee dabeecadda bini’aadamka, oo maanta bilow safar wax weyn ka beddelaya noloshaada iyo hab-fikiirkaaga.', 'cover_1768670275_7ac6a38b_1779981759.webp', 'book_1768321192_764af503.epub', 1, 1, 'premium', 100, 2, '38281', NULL, 9, 0, '2026-01-13 16:19:52', '2026-06-07 20:29:36', NULL, 0, NULL),
(66, 'DARK PSYCHOLOGY', 'ismail abdi ismail', 'Dark Psychology (Cilmi-nafsiga Madow) maaha sheeko xariiro; waa cilmi dhab ah oo ka hadlaya sida loo galo maskaxda aadanaha, loo barto meelaha ay ka jilicsan yihiin, loona maamulo shucuurtoda iyo go''aannadooda iyagoon xitaa dareensanayn in la xakameynayo ama la maamulayo.

Buuggan "DARK PSYCHOLOGY IYO FARSAMOOYINKA QARSOON" maaha buug caadi ah oo ku baraya sida loo noqdo qof fiican. Maya. Buuggani waa "Hub." Wuxuu ku barayaa sirta ugu hoose ee maskaxda bani''aadamka iyo sida loo maamulo dadka iyagoon ku dareensanayn.

Buuggan waxaan kugu bari doonaa casharro aadan waligaa iskuulka ku baran. Waxaad ku baran doontaa:
1.Sida loo akhriyo maskaxda iyo dabeecadaha dhabta ah ee dadka.
2.Sida loo ogaado siraha qarsoon ee qofku leeyahay.
3.Sida loo maamulo shucuurta dadka, loona hoggaamiyo go''aannadooda.
4.Iyo ugu dambayn, sida qof kasta oo aad rabto aad uga dhigi lahayd mid adiga kugu tiirsan.', 'cover_1776632024_fdb2a82f_1779981759.webp', 'book_1776632024_e633a160.epub', 1, 1, 'premium', 99, 3, '36615', NULL, 14, 0, '2026-04-19 20:53:44', '2026-07-15 10:45:11', NULL, 0, NULL),
(67, 'DHAMBAALLADA QURAANKA', 'Ad''ham Sharqaawi , turjume: Cabdulxakiim Muxammad Obsiiye', 'Buuggan, "Dhambaallada Quraanka", waxa loo hibaynayaa guud ahaan qalbiyada daalan ee iftiinka raadinaya. Waxa loo hibaynayaa da’yarta rumaysan in Eebbe (swt) uu mar kasta inoo soo diro farriimo uu inagugu soo celinayo xaggiisa.

Waa adiga, qofka akhrinayow... haddii aad dareemayso in nolosuhu kugu cidhiidhyantay, ama aad dambi isku ciilayso, ogow buuggani waa farriin toos kuugu timid oo laguugu leeyahay: "Naso, Rajo filo, Allena u laabo."', 'cover_1776713007_2ae62133_1779981759.webp', 'book_1776713007_d7d0339f.epub', 0, 1, 'free', 0, NULL, '22727', NULL, 0, 0, '2026-04-20 19:23:27', '2026-07-14 14:37:15', NULL, 0, NULL);
INSERT INTO "book_insights" ("id", "book_id", "quote", "author", "bg_color", "font_family", "display_order", "is_active", "created_at", "updated_at") VALUES
(1, 54, 'aynu runta isu sheegno: dhammaanteen in yar oo is-jacayl ah (narcissism) way inagu jirtaa, marar badan caqliga kama shidaal qaadanno ee caadifad baa ina hoda.', 'carl jung .', 'card-bg-2', 'Montserrat', 1, 1, '2026-04-11 21:02:21', '2026-04-11 21:15:54'),
(2, 66, 'Xaqiiqadu waxay tahay, mar kasta oo aad gurigaaga ka baxdo, waxaad la kulmaysaa dad xidhan "Maaskaro" ama waji-gashad, kuwaas oo qarinaya dabeecadooda dhabta ah iyo dantooda shakhsiga ah.', 'ismail abdi ismail', 'card-bg-1', 'Merriweather', 0, 1, '2026-05-08 14:07:47', '2026-05-08 14:07:47'),
(3, 66, 'Dadku waxay jecel yihiin kuwa iyaga u eg. Markaad u ekaato ama ku dayato, qofka maskaxdiisu waxay u qaadanaysaa inaad tahay "saaxiibkii" ama qof ay isku fikrad yihiin. Tani waxay furaysaa albaabka aaminaadda.', 'ismail abdi ismail', 'card-bg-3', 'Inter', 1, 1, '2026-05-08 14:16:07', '2026-05-08 14:20:32'),
(4, 66, 'Haddii aad rah soo qabatid kadibna aad dhex gelisid biyo karkaraya , markiiba wuu ka boodayaa biyahaa.', 'ismail abdi ismail', 'card-bg-4', 'Inter', 2, 1, '2026-05-08 14:19:05', '2026-05-08 14:19:05'),
(5, 66, 'Laakiin haddii aad biyo qabow dhex geliso ood dabka tartiib tartiib ugu kordhiso, ma dareemi doono kulaylka ilaa uu marka danbe ku dhex dhinto kuleylkaas. Sidaas oo kale ayaa dadkana loo maamulaa', 'ismail abdi ismail', 'card-bg-4', 'Inter', 3, 1, '2026-05-08 14:19:36', '2026-05-08 14:19:36');
INSERT INTO "daily_stats" ("id", "stat_date", "total_users", "active_users", "new_users", "books_opened", "total_reading_time", "total_books", "total_summaries", "created_at", "updated_at") VALUES
(1, '2026-02-04', 95, 2, 0, 0, 0, 17, 2, '2026-02-04 00:47:36', '2026-02-04 08:16:26'),
(225, '2026-02-05', 97, 6, 0, 0, 0, 0, 0, '2026-02-05 04:35:41', '2026-02-05 20:43:44'),
(661, '2026-02-07', 100, 5, 0, 0, 0, 0, 0, '2026-02-07 06:19:50', '2026-02-07 20:16:54'),
(755, '2026-02-08', 101, 4, 0, 0, 0, 0, 0, '2026-02-08 03:37:46', '2026-02-08 21:04:04'),
(842, '2026-02-09', 102, 3, 0, 0, 0, 0, 0, '2026-02-09 07:20:19', '2026-02-09 11:08:42'),
(1199, '2026-02-10', 106, 6, 0, 0, 0, 0, 0, '2026-02-10 08:15:42', '2026-02-10 21:08:59'),
(1706, '2026-02-12', 108, 3, 0, 0, 0, 0, 0, '2026-02-12 08:20:19', '2026-02-12 18:52:14'),
(1749, '2026-02-13', 109, 1, 0, 0, 0, 0, 0, '2026-02-13 20:52:40', '2026-02-13 20:52:40'),
(1760, '2026-02-14', 112, 3, 0, 0, 0, 0, 0, '2026-02-14 03:36:45', '2026-02-14 15:22:33'),
(1792, '2026-02-15', 113, 2, 0, 0, 0, 0, 0, '2026-02-15 13:51:51', '2026-02-15 17:13:06'),
(1801, '2026-02-16', 116, 4, 0, 0, 0, 0, 0, '2026-02-16 14:52:20', '2026-02-16 16:43:30'),
(1934, '2026-02-17', 122, 7, 0, 0, 0, 0, 0, '2026-02-17 04:45:45', '2026-02-17 20:13:35'),
(2114, '2026-02-18', 126, 5, 0, 0, 0, 0, 0, '2026-02-18 03:14:01', '2026-02-18 17:54:37'),
(2550, '2026-02-19', 127, 4, 0, 0, 0, 0, 0, '2026-02-19 06:12:41', '2026-02-19 13:57:50'),
(2645, '2026-02-20', 129, 2, 0, 0, 0, 0, 0, '2026-02-20 08:09:06', '2026-02-20 09:36:56'),
(2941, '2026-02-21', 134, 6, 0, 0, 0, 0, 0, '2026-02-21 09:37:06', '2026-02-21 23:23:02'),
(3037, '2026-02-22', 136, 4, 0, 0, 0, 0, 0, '2026-02-22 04:20:09', '2026-02-22 16:56:38'),
(3116, '2026-02-23', 139, 4, 0, 0, 0, 0, 0, '2026-02-23 00:18:22', '2026-02-23 11:45:25'),
(3141, '2026-02-24', 144, 6, 0, 0, 0, 0, 0, '2026-02-24 04:26:35', '2026-02-24 18:23:45'),
(3378, '2026-02-25', 145, 3, 0, 0, 0, 0, 0, '2026-02-25 06:49:55', '2026-02-25 14:27:10'),
(3570, '2026-02-26', 146, 6, 0, 0, 0, 0, 0, '2026-02-26 00:22:48', '2026-02-26 21:10:28'),
(4156, '2026-02-27', 147, 3, 0, 0, 0, 0, 0, '2026-02-27 12:58:11', '2026-02-27 21:23:12'),
(4344, '2026-02-28', 147, 3, 0, 0, 0, 0, 0, '2026-02-28 00:00:42', '2026-02-28 09:43:38'),
(4547, '2026-03-01', 149, 2, 0, 0, 0, 0, 0, '2026-03-01 19:22:35', '2026-03-01 19:28:00'),
(4549, '2026-03-02', 149, 1, 0, 0, 0, 0, 0, '2026-03-02 07:37:08', '2026-03-02 07:37:08'),
(4623, '2026-03-03', 152, 6, 0, 0, 0, 0, 0, '2026-03-03 10:51:17', '2026-03-03 21:19:52'),
(4777, '2026-03-04', 154, 3, 0, 0, 0, 0, 0, '2026-03-04 03:16:33', '2026-03-04 23:09:18'),
(4853, '2026-03-05', 157, 5, 0, 0, 0, 0, 0, '2026-03-05 01:57:21', '2026-03-05 18:09:12'),
(4901, '2026-03-06', 160, 5, 0, 0, 0, 0, 0, '2026-03-06 00:26:16', '2026-03-06 19:24:36'),
(6081, '2026-03-07', 163, 5, 0, 0, 0, 0, 0, '2026-03-07 00:00:14', '2026-03-07 20:50:33'),
(6281, '2026-03-08', 165, 4, 0, 0, 0, 0, 0, '2026-03-08 05:51:27', '2026-03-08 18:31:30'),
(6354, '2026-03-09', 166, 5, 0, 0, 0, 0, 0, '2026-03-09 09:31:42', '2026-03-09 23:21:34'),
(7277, '2026-03-10', 167, 6, 0, 0, 0, 0, 0, '2026-03-10 00:08:48', '2026-03-10 20:41:26'),
(8252, '2026-03-11', 167, 2, 0, 0, 0, 0, 0, '2026-03-11 00:29:11', '2026-03-11 20:52:46'),
(8988, '2026-03-12', 168, 5, 0, 0, 0, 0, 0, '2026-03-12 00:21:29', '2026-03-12 20:07:01'),
(9631, '2026-03-13', 168, 2, 0, 0, 0, 0, 0, '2026-03-13 00:07:20', '2026-03-13 05:26:13'),
(10357, '2026-03-14', 170, 4, 0, 0, 0, 0, 0, '2026-03-14 00:00:09', '2026-03-14 22:30:05'),
(10642, '2026-03-15', 171, 4, 0, 0, 0, 0, 0, '2026-03-15 00:14:23', '2026-03-15 15:21:47'),
(11306, '2026-03-16', 171, 2, 0, 0, 0, 0, 0, '2026-03-16 00:00:20', '2026-03-16 12:10:21'),
(11665, '2026-03-17', 171, 3, 0, 0, 0, 0, 0, '2026-03-17 01:36:41', '2026-03-17 23:25:33'),
(11923, '2026-03-18', 171, 3, 0, 0, 0, 0, 0, '2026-03-18 00:26:29', '2026-03-18 21:41:50'),
(12017, '2026-03-19', 171, 2, 0, 0, 0, 0, 0, '2026-03-19 00:25:37', '2026-03-19 00:54:44'),
(12051, '2026-03-20', 171, 4, 0, 0, 0, 0, 0, '2026-03-20 00:17:54', '2026-03-20 22:56:10'),
(12747, '2026-03-21', 172, 2, 0, 0, 0, 0, 0, '2026-03-21 01:06:23', '2026-03-21 06:29:45'),
(12836, '2026-03-22', 174, 2, 0, 0, 0, 0, 0, '2026-03-22 20:39:38', '2026-03-22 21:51:49'),
(12913, '2026-03-24', 176, 3, 0, 0, 0, 0, 0, '2026-03-24 04:44:50', '2026-03-24 19:45:13'),
(13065, '2026-03-25', 178, 3, 0, 0, 0, 0, 0, '2026-03-25 08:08:14', '2026-03-25 15:43:06'),
(13086, '2026-03-26', 178, 2, 0, 0, 0, 0, 0, '2026-03-26 03:57:28', '2026-03-26 13:09:21'),
(13112, '2026-03-27', 180, 3, 0, 0, 0, 0, 0, '2026-03-27 17:32:29', '2026-03-27 21:54:38'),
(13186, '2026-03-28', 182, 3, 0, 0, 0, 0, 0, '2026-03-28 12:11:34', '2026-03-28 18:18:32'),
(13438, '2026-03-29', 183, 3, 0, 0, 0, 0, 0, '2026-03-29 14:35:29', '2026-03-29 20:57:09'),
(13483, '2026-03-30', 184, 3, 0, 0, 0, 0, 0, '2026-03-30 03:01:41', '2026-03-30 15:27:35'),
(13575, '2026-03-31', 186, 4, 0, 0, 0, 0, 0, '2026-03-31 13:34:18', '2026-03-31 21:37:21'),
(13712, '2026-04-01', 189, 4, 0, 0, 0, 0, 0, '2026-04-01 01:44:10', '2026-04-01 23:16:44'),
(13963, '2026-04-02', 191, 3, 0, 0, 0, 0, 0, '2026-04-02 07:24:17', '2026-04-02 18:29:49'),
(14066, '2026-04-03', 191, 2, 0, 0, 0, 0, 0, '2026-04-03 10:24:38', '2026-04-03 18:44:33'),
(14134, '2026-04-04', 191, 2, 0, 0, 0, 0, 0, '2026-04-04 07:33:29', '2026-04-04 18:56:53'),
(14246, '2026-04-05', 191, 2, 0, 0, 0, 0, 0, '2026-04-05 15:37:07', '2026-04-05 19:42:52'),
(14384, '2026-04-06', 193, 2, 0, 0, 0, 0, 0, '2026-04-06 06:51:19', '2026-04-06 12:09:26'),
(14434, '2026-04-07', 194, 2, 0, 0, 0, 0, 0, '2026-04-07 12:07:22', '2026-04-07 22:03:19'),
(14507, '2026-04-08', 195, 2, 0, 0, 0, 0, 0, '2026-04-08 13:25:15', '2026-04-08 14:06:47'),
(14576, '2026-04-09', 196, 3, 0, 0, 0, 0, 0, '2026-04-09 08:54:28', '2026-04-09 21:29:24'),
(14779, '2026-04-10', 199, 6, 0, 0, 0, 0, 0, '2026-04-10 00:03:27', '2026-04-10 22:59:04'),
(15048, '2026-04-11', 200, 2, 0, 0, 0, 0, 0, '2026-04-11 00:28:24', '2026-04-11 21:47:49'),
(15272, '2026-04-12', 202, 5, 0, 0, 0, 0, 0, '2026-04-12 03:37:58', '2026-04-12 18:25:54'),
(15347, '2026-04-13', 202, 2, 0, 0, 0, 0, 0, '2026-04-13 13:46:33', '2026-04-13 21:43:01'),
(15407, '2026-04-14', 202, 2, 0, 0, 0, 0, 0, '2026-04-14 00:18:13', '2026-04-14 12:27:41'),
(15409, '2026-04-16', 203, 3, 0, 0, 0, 0, 0, '2026-04-16 18:02:25', '2026-04-16 23:36:04'),
(15422, '2026-04-17', 204, 2, 0, 0, 0, 0, 0, '2026-04-17 05:54:55', '2026-04-17 17:57:17'),
(15443, '2026-04-18', 207, 5, 0, 0, 0, 0, 0, '2026-04-18 01:20:47', '2026-04-18 20:08:55'),
(15621, '2026-04-19', 208, 3, 0, 0, 0, 0, 0, '2026-04-19 09:31:36', '2026-04-19 20:16:27'),
(15636, '2026-04-20', 208, 2, 0, 0, 0, 0, 0, '2026-04-20 12:36:26', '2026-04-20 15:57:32'),
(15672, '2026-04-21', 208, 3, 0, 0, 0, 0, 0, '2026-04-21 11:50:42', '2026-04-21 19:55:08'),
(15699, '2026-04-23', 208, 2, 0, 0, 0, 0, 0, '2026-04-23 13:50:14', '2026-04-23 18:36:44'),
(15728, '2026-04-24', 209, 1, 0, 0, 0, 0, 0, '2026-04-24 05:53:26', '2026-04-24 05:53:26'),
(15745, '2026-04-25', 210, 2, 0, 0, 0, 0, 0, '2026-04-25 05:53:47', '2026-04-25 16:33:25'),
(15768, '2026-04-26', 210, 2, 0, 0, 0, 0, 0, '2026-04-26 06:34:26', '2026-04-26 09:56:00'),
(15773, '2026-04-27', 211, 3, 0, 0, 0, 0, 0, '2026-04-27 04:29:27', '2026-04-27 18:16:30'),
(15841, '2026-04-28', 212, 1, 0, 0, 0, 0, 0, '2026-04-28 14:54:43', '2026-04-28 14:54:43'),
(15846, '2026-04-29', 212, 1, 0, 0, 0, 0, 0, '2026-04-29 23:28:50', '2026-04-29 23:28:50'),
(15854, '2026-05-01', 212, 3, 0, 0, 0, 0, 0, '2026-05-01 03:54:55', '2026-05-01 18:10:52'),
(15892, '2026-05-02', 214, 4, 0, 0, 0, 0, 0, '2026-05-02 06:20:11', '2026-05-02 21:36:02'),
(16013, '2026-05-03', 214, 3, 0, 0, 0, 0, 0, '2026-05-03 00:04:43', '2026-05-03 14:34:14'),
(16042, '2026-05-04', 215, 2, 0, 0, 0, 0, 0, '2026-05-04 03:11:11', '2026-05-04 11:39:28'),
(16058, '2026-05-05', 215, 2, 0, 0, 0, 0, 0, '2026-05-05 06:46:00', '2026-05-05 07:13:11'),
(16082, '2026-05-06', 219, 5, 0, 0, 0, 0, 0, '2026-05-06 00:13:14', '2026-05-06 14:29:58'),
(16138, '2026-05-07', 233, 16, 0, 0, 0, 0, 0, '2026-05-07 05:06:27', '2026-05-07 20:09:59'),
(16357, '2026-05-08', 239, 10, 0, 0, 0, 0, 0, '2026-05-08 05:41:49', '2026-05-08 23:32:26'),
(16687, '2026-05-09', 246, 12, 0, 0, 0, 0, 0, '2026-05-09 03:40:10', '2026-05-09 22:05:31'),
(16983, '2026-05-10', 247, 5, 0, 0, 0, 0, 0, '2026-05-10 06:02:07', '2026-05-10 21:38:23'),
(17149, '2026-05-11', 251, 9, 0, 0, 0, 0, 0, '2026-05-11 07:43:16', '2026-05-11 21:52:47'),
(17285, '2026-05-12', 257, 10, 0, 0, 0, 0, 0, '2026-05-12 06:18:44', '2026-05-12 21:21:40'),
(17511, '2026-05-13', 260, 9, 0, 0, 0, 0, 0, '2026-05-13 01:01:43', '2026-05-13 18:06:33'),
(17893, '2026-05-14', 264, 10, 0, 0, 0, 0, 0, '2026-05-14 07:23:56', '2026-05-14 18:51:34'),
(17980, '2026-05-15', 265, 5, 0, 0, 0, 0, 0, '2026-05-15 04:10:37', '2026-05-15 18:13:34'),
(18083, '2026-05-16', 267, 7, 0, 0, 0, 0, 0, '2026-05-16 04:29:22', '2026-05-16 19:58:49'),
(18181, '2026-05-17', 269, 7, 0, 0, 0, 0, 0, '2026-05-17 06:03:55', '2026-05-17 23:19:14'),
(18225, '2026-05-18', 271, 4, 0, 0, 0, 0, 0, '2026-05-18 08:55:46', '2026-05-18 18:44:47'),
(18297, '2026-05-19', 273, 3, 0, 0, 0, 0, 0, '2026-05-19 06:16:42', '2026-05-19 13:18:39'),
(18373, '2026-05-20', 274, 3, 0, 0, 0, 0, 0, '2026-05-20 02:55:35', '2026-05-20 21:14:33'),
(18442, '2026-05-21', 274, 6, 0, 0, 0, 0, 0, '2026-05-21 05:53:05', '2026-05-21 19:07:23'),
(18563, '2026-05-22', 288, 15, 0, 0, 0, 0, 0, '2026-05-22 10:15:31', '2026-05-22 20:59:28'),
(18689, '2026-05-23', 292, 5, 0, 0, 0, 0, 0, '2026-05-23 05:48:36', '2026-05-23 19:16:46'),
(18763, '2026-05-24', 298, 7, 0, 0, 0, 0, 0, '2026-05-24 05:52:57', '2026-05-24 19:01:30'),
(18923, '2026-05-25', 303, 5, 0, 0, 0, 0, 0, '2026-05-25 10:13:54', '2026-05-25 22:40:29'),
(19006, '2026-05-26', 304, 4, 0, 0, 0, 0, 0, '2026-05-26 03:35:47', '2026-05-26 21:46:11'),
(19079, '2026-05-27', 305, 1, 0, 0, 0, 0, 0, '2026-05-27 06:38:16', '2026-05-27 06:38:16'),
(19087, '2026-05-28', 310, 6, 0, 0, 0, 0, 0, '2026-05-28 09:49:22', '2026-05-28 16:07:35'),
(19143, '2026-05-29', 312, 3, 0, 0, 0, 0, 0, '2026-05-29 03:20:52', '2026-05-29 19:30:27'),
(19202, '2026-05-30', 314, 3, 0, 0, 0, 0, 0, '2026-05-30 06:57:19', '2026-05-30 15:23:28'),
(19256, '2026-05-31', 315, 3, 0, 0, 0, 0, 0, '2026-05-31 05:34:02', '2026-05-31 19:32:17'),
(19305, '2026-06-01', 316, 3, 0, 0, 0, 0, 0, '2026-06-01 04:39:41', '2026-06-01 20:05:59'),
(19318, '2026-06-02', 318, 7, 0, 0, 0, 0, 0, '2026-06-02 07:37:10', '2026-06-02 21:23:44'),
(19412, '2026-06-03', 320, 4, 0, 0, 0, 0, 0, '2026-06-03 03:53:42', '2026-06-03 16:15:40'),
(19450, '2026-06-04', 323, 4, 0, 0, 0, 0, 0, '2026-06-04 05:50:53', '2026-06-04 20:13:52'),
(19482, '2026-06-05', 324, 3, 0, 0, 0, 0, 0, '2026-06-05 04:43:04', '2026-06-05 16:03:05'),
(19499, '2026-06-06', 326, 5, 0, 0, 0, 0, 0, '2026-06-06 08:41:07', '2026-06-06 16:00:43'),
(19705, '2026-06-07', 327, 3, 0, 0, 0, 0, 0, '2026-06-07 16:03:38', '2026-06-07 19:43:52'),
(19790, '2026-06-08', 329, 5, 0, 0, 0, 0, 0, '2026-06-08 03:48:04', '2026-06-08 18:20:53'),
(19912, '2026-06-09', 332, 4, 0, 0, 0, 0, 0, '2026-06-09 03:37:41', '2026-06-09 21:11:58'),
(19944, '2026-06-11', 333, 3, 0, 0, 0, 0, 0, '2026-06-11 07:50:02', '2026-06-11 16:12:14'),
(19985, '2026-06-12', 334, 1, 0, 0, 0, 0, 0, '2026-06-12 17:14:48', '2026-06-12 17:14:48'),
(19995, '2026-06-13', 337, 4, 0, 0, 0, 0, 0, '2026-06-13 04:32:47', '2026-06-13 22:38:44'),
(20045, '2026-06-14', 338, 2, 0, 0, 0, 0, 0, '2026-06-14 02:38:52', '2026-06-14 23:28:01'),
(20129, '2026-06-15', 339, 1, 0, 0, 0, 0, 0, '2026-06-15 06:33:53', '2026-06-15 06:33:53'),
(20131, '2026-06-16', 340, 1, 0, 0, 0, 0, 0, '2026-06-16 21:56:26', '2026-06-16 21:56:26'),
(20133, '2026-06-17', 340, 1, 0, 0, 0, 0, 0, '2026-06-17 06:55:17', '2026-06-17 06:55:17'),
(20136, '2026-06-18', 342, 4, 0, 0, 0, 0, 0, '2026-06-18 05:14:29', '2026-06-18 16:00:09'),
(20178, '2026-06-19', 344, 4, 0, 0, 0, 0, 0, '2026-06-19 01:20:52', '2026-06-19 23:17:25'),
(20207, '2026-06-20', 345, 3, 0, 0, 0, 0, 0, '2026-06-20 03:52:34', '2026-06-20 21:43:08'),
(20294, '2026-06-21', 351, 9, 0, 0, 0, 0, 0, '2026-06-21 02:55:25', '2026-06-21 22:02:29'),
(20370, '2026-06-22', 353, 4, 0, 0, 0, 0, 0, '2026-06-22 06:50:58', '2026-06-22 22:25:57'),
(20417, '2026-06-23', 354, 3, 0, 0, 0, 0, 0, '2026-06-23 03:54:09', '2026-06-23 22:38:53'),
(20493, '2026-06-24', 360, 8, 0, 0, 0, 0, 0, '2026-06-24 03:53:12', '2026-06-24 21:43:07'),
(20553, '2026-06-25', 364, 7, 0, 0, 0, 0, 0, '2026-06-25 04:28:59', '2026-06-25 22:14:14'),
(20613, '2026-06-26', 365, 6, 0, 0, 0, 0, 0, '2026-06-26 05:25:08', '2026-06-26 22:23:48'),
(20687, '2026-06-27', 368, 8, 0, 0, 0, 0, 0, '2026-06-27 04:26:17', '2026-06-27 19:52:15'),
(20795, '2026-06-28', 369, 3, 0, 0, 0, 0, 0, '2026-06-28 05:09:54', '2026-06-28 14:27:52'),
(20826, '2026-06-29', 373, 5, 0, 0, 0, 0, 0, '2026-06-29 03:46:21', '2026-06-29 21:34:16'),
(20866, '2026-06-30', 374, 2, 0, 0, 0, 0, 0, '2026-06-30 13:16:03', '2026-06-30 20:52:24'),
(20894, '2026-07-01', 375, 4, 0, 0, 0, 0, 0, '2026-07-01 02:43:19', '2026-07-01 18:09:59'),
(20918, '2026-07-02', 376, 4, 0, 0, 0, 0, 0, '2026-07-02 03:52:28', '2026-07-02 22:22:16'),
(20955, '2026-07-03', 378, 2, 0, 0, 0, 0, 0, '2026-07-03 08:32:29', '2026-07-03 18:33:26'),
(21043, '2026-07-04', 381, 3, 0, 0, 0, 0, 0, '2026-07-04 02:06:30', '2026-07-04 20:13:53'),
(21061, '2026-07-06', 385, 5, 0, 0, 0, 0, 0, '2026-07-06 03:53:44', '2026-07-06 17:19:39'),
(21147, '2026-07-07', 385, 2, 0, 0, 0, 0, 0, '2026-07-07 16:56:51', '2026-07-07 20:06:45'),
(21153, '2026-07-08', 386, 3, 0, 0, 0, 0, 0, '2026-07-08 21:42:05', '2026-07-08 23:23:49'),
(21162, '2026-07-09', 389, 5, 0, 0, 0, 0, 0, '2026-07-09 00:11:00', '2026-07-09 08:52:32'),
(21214, '2026-07-10', 390, 4, 0, 0, 0, 0, 0, '2026-07-10 01:33:11', '2026-07-10 19:58:53'),
(21226, '2026-07-11', 391, 2, 0, 0, 0, 0, 0, '2026-07-11 03:46:06', '2026-07-11 18:54:50'),
(21249, '2026-07-12', 393, 2, 0, 0, 0, 0, 0, '2026-07-12 13:28:06', '2026-07-12 20:09:33'),
(21304, '2026-07-13', 397, 5, 0, 0, 0, 0, 0, '2026-07-13 03:52:21', '2026-07-13 22:32:52'),
(21343, '2026-07-14', 402, 6, 0, 0, 0, 0, 0, '2026-07-14 06:46:13', '2026-07-14 23:36:01'),
(21377, '2026-07-15', 403, 5, 0, 0, 0, 0, 0, '2026-07-15 08:17:45', '2026-07-15 23:22:52'),
(21475, '2026-07-16', 403, 2, 0, 0, 0, 0, 0, '2026-07-16 03:41:51', '2026-07-16 03:51:49'),
(21500, '2026-07-17', 405, 2, 0, 0, 0, 0, 0, '2026-07-17 03:52:26', '2026-07-17 19:58:11'),
(21515, '2026-07-18', 408, 5, 0, 0, 0, 0, 0, '2026-07-18 07:21:34', '2026-07-18 22:21:12'),
(21543, '2026-07-19', 409, 3, 0, 0, 0, 0, 0, '2026-07-19 02:50:00', '2026-07-19 10:13:36');
INSERT INTO "oauth_providers" ("id", "user_id", "provider", "provider_user_id", "provider_email", "provider_avatar", "created_at", "updated_at") VALUES
(1, 314, 'google', '109803080095865873843', 'ismailawaldargo13@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKpsDBNk0wSKILFXmLDWlasrAdZjLupmk1orM9GQxvZ_5aRww=s96-c', '2026-05-28 09:57:33', '2026-05-28 09:57:33'),
(2, 315, 'google', '107798279312241510284', 'awalcabdi2@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJCrj7kqjaoEnCUDVzDb-so5doORqFGG1tnvxj0K-6yze6qBA=s96-c', '2026-05-28 10:06:29', '2026-05-28 10:06:29'),
(3, 321, 'google', '110474010519566034228', 'dhoolahmedeey@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKSfSGcPwfGP9A1EY0oD1xkwsslqNctaMvG3d_sy1FBb5SXEjsE=s96-c', '2026-05-30 18:52:01', '2026-05-30 18:52:01'),
(4, 322, 'google', '100950895018735447066', 'fathimahamut6@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJPqX4jMNRbiIBA9qpzUl3I-uhAzF7Sddvi_ZDRjxjomXb8UIiM=s96-c', '2026-05-31 19:32:06', '2026-05-31 19:32:06'),
(5, 323, 'google', '101973652854754903329', 'hamzemkhtr@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKSAp71TwRHOEM4vqbBAeWKV8x0WBCnVg77pIvnCJ8H59BMzNg=s96-c', '2026-06-01 04:39:41', '2026-06-01 04:39:41'),
(6, 324, 'google', '113464697080299226948', 'maxamuudismail601@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLxQGPCq7o-Is9O6ajCWfJfL5Yp3MWJtLYIYi4i6EdG2iCNaA=s96-c', '2026-06-02 14:46:21', '2026-06-02 14:46:21'),
(7, 325, 'google', '116298351410057775051', 'ahmedmahamedhaashi2@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLbflfxwkGUqBqpLTFVeGrOFvctdWNCbY3Ns2TqAg42rca9xsb2=s96-c', '2026-06-02 21:23:43', '2026-06-02 21:23:43'),
(8, 326, 'google', '104252522998640409151', 'ayaanleabdikariim74@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLTqr8ETGg9wOXMmV2Hg5kfyZKdPMJhoMrd-Jdnfw8M1wCQLNw=s96-c', '2026-06-03 13:53:43', '2026-06-03 13:53:43'),
(9, 328, 'google', '100764648431221137709', 'maanyusuf678@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJ538QunqU0wU8zXAwpLtfS5Oftc-g6I4_ZTye8B5Pyc6yPOw=s96-c', '2026-06-04 05:50:52', '2026-06-04 05:50:52'),
(10, 332, 'google', '111923356404668638944', 'dowladlyrics@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL7hCmBWJWBXSKytzfvIg9lwoePu-NB6FihipO7aX_jqBqgdEAw=s96-c', '2026-06-06 08:41:07', '2026-06-06 08:41:07'),
(11, 331, 'google', '116920417383424539184', 'maxamedclaahi584@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocISMZBzc5YHnCZ7qbchXyDJeJVdKkhXN8QeHWrXQdgt1THXWQ=s96-c', '2026-06-06 15:55:50', '2026-06-06 15:55:50'),
(12, 3, 'google', '111710859444336725013', 'ismailawalabdi12@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIvIngEecAOZkN85o5arD-GM7Sw_2cC8H9O9rSiSubHN-ZPhunF4Q=s96-c', '2026-06-06 16:00:43', '2026-06-06 16:00:43'),
(13, 335, 'google', '106237422115555026855', 'suheibmaxamud12@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIWmtYwU3jdb8O_BmiwHWnnzrFNn-ndzIGKp7iearI454QdmtlT=s96-c', '2026-06-08 04:21:46', '2026-06-08 04:21:46'),
(14, 336, 'google', '115062082562566113633', 'abdifitahmohumedhared@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIEhkNH4vaRvvsQGYWHsLLzox-AKVQVYEWAc-tzLf74JZKsl04=s96-c', '2026-06-08 13:00:13', '2026-06-08 13:00:13'),
(15, 337, 'google', '106105474629364660731', 'maxamedmuqtaaraxmed@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIelkb55ssq8Q9t02o0iioEQO7jQpILyDObvuDvvJIDXO1JXUut=s96-c', '2026-06-09 03:37:41', '2026-06-09 03:37:41'),
(16, 341, 'google', '104267174268204914296', 'sihaamnasteex@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIsZKABQyLZQYydHRViyxllwoLYDo9CjToYltjxFQo_jjXAw4k=s96-c', '2026-06-12 17:14:48', '2026-06-12 17:14:48'),
(17, 344, 'google', '116947037306580977704', 'sundussan2@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocI0lZ27nYaDphq2EEfrR0e1ZQpdAh-K9RJ7--LP_VpQBoy1UA=s96-c', '2026-06-13 22:38:43', '2026-06-13 22:38:43'),
(18, 345, 'google', '100724507342517181471', 'mohamadcabdi90@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocK2EFsqFU_F_6d6k-iq406a1YaKPmmkNuuEerx9B70WgOYo7Q=s96-c', '2026-06-14 02:38:52', '2026-06-14 02:38:52'),
(19, 346, 'google', '111507728336225954259', 'raymamohamed31@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLos8zOKV6d9ILfRZCICUZ3wgr1rzFcCfCTuith_RZlNVj2wr6Q=s96-c', '2026-06-15 06:33:53', '2026-06-15 06:33:53'),
(20, 347, 'google', '102095023997247378175', 'abbdaleabdirahman@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLB03D_PhkIaA0MRRTiA0lMltzb8y7BfRa2jz1ulDJj5yjgqg=s96-c', '2026-06-16 21:56:26', '2026-06-16 21:56:26'),
(21, 348, 'google', '118118762910189296976', 'akhasakhas402@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKRxwG1q6ax0E5QpqvrGa7DmweN8Dmz04byX5EH5Egb6uVAHg=s96-c', '2026-06-18 05:14:29', '2026-06-18 05:14:29'),
(22, 349, 'google', '105542344834981022502', 'raxmaaxmed750@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKWes9hEacHBKAqpNM2f1cuEw4Ym3DtdQRAYgMaePhLBt-YPw=s96-c', '2026-06-18 06:12:20', '2026-06-18 06:12:20'),
(23, 351, 'google', '101189743118387990066', 'khaalidsalleban@gmail.com', 'https://lh3.googleusercontent.com/a-/ALV-UjWPeLvWz5OqsKiNrcvwsoyGx6qyjm9CGXBsAzpm6eCtb0OpgkbdOt4ZcIIJPKVPlF6pC1ITenEGJy3oJu2-Q9hcfkN8AHg6F3bLudRtfidrqvr4uqpF2mAdARz8FUV5YvZTDxalplrsROE2QH8l8kRmr0OpdHZ9LboE2GiJKTbHsZ-gHdMpjsBUqSd9_EWh8-EOKbCYHDUkTJCJyHMD1RZUXHnX1-axJRFdmgJBu5nSLUF_2NlES3Mb6Cbh9c1v5UwKZDb5hiXoa_Gs3X_FbmaTmQgNLMUNt0vqg1XmuprcYyLy7Q9uSzyMvpNr5A-xAnlyd3cJPqnJAfZb3oxCklUo2KTXQQtb3xKv5v8QtLWZJiM9YRjxBlxPqy9XzXZTEBRRCTaYes5nejPEnc6y6LPKMVZVlF1jeR2XoQyxZGFEz9Z4iuxpsofDNYzvhz2Vz_KXDCv59wo', '2026-06-19 17:01:13', '2026-06-19 17:01:13'),
(24, 352, 'google', '107802602721496819902', 'm61444175@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLibsw8a1ULIKdv_gmDZ1AN_jF8dU3iv_YekU41TANKmbx-F-0=s96-c', '2026-06-20 08:57:55', '2026-06-20 08:57:55'),
(25, 358, 'google', '114993501339285265386', 'mansuun2023@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJkxA-02OlqoV4hP1_i4WHnjhmPw_Un3njPuS1yijvp-CVlY7_V=s96-c', '2026-06-21 22:02:29', '2026-06-21 22:02:29'),
(26, 362, 'google', '108548403191912852600', 'usaamecali09@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJ9jWrWuVuQEjuDvN0lQgYmphgUJUglQpHkcjNEjjMThZvI9Q=s96-c', '2026-06-24 07:28:05', '2026-06-24 07:28:05'),
(27, 363, 'google', '111782280540295844839', 'mohankaynaan5@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL0whDvg8vjEKjX7Vu2o_O12KwrO3-9qDbJN7nBew7uHkrOLoqJ=s96-c', '2026-06-24 10:32:22', '2026-06-24 10:32:22'),
(28, 365, 'google', '117034549886617305304', 'sheekogaaban356@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL5EzwEecG5EwexhmOq9rMsnYCOhZwp2Ik8Swmd-ftjU1c1JA=s96-c', '2026-06-24 14:51:54', '2026-06-24 14:51:54'),
(29, 366, 'google', '101415813862090857969', 'isafa7016@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLUZEbzAggDX9oYKdqI5PAOZjOHNVM4XMRoaHLtRITLsLwHh_I=s96-c', '2026-06-24 21:21:06', '2026-06-24 21:21:06'),
(30, 367, 'google', '109320210202258634728', 'muusemaxamed717@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLCi9J78dTEAY5wYRydAIL4C-u16VXuMa1ooGtPbQUUB6UVeA=s96-c', '2026-06-24 21:43:07', '2026-06-24 21:43:07'),
(31, 368, 'google', '103071009003796276618', 'amarabdi757@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIUJPtpDcV-QymH9iNFJtUhR0MCKroM9z4D32AaxNhuNiCpNPo=s96-c', '2026-06-25 04:28:58', '2026-06-25 04:28:58'),
(32, 369, 'google', '106546813514038473019', 'solutionblueedge@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLXrCmWIa2jQ9uxy5ALmHmSdHyNlVHQq5xzaLTlQJ0ng8Jr1Q=s96-c', '2026-06-25 08:21:46', '2026-06-25 08:21:46'),
(33, 371, 'google', '105870000453608403799', 'hinibraa96@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLHFKVu0N1ohhwhhwQkdlC3IVhMxpeTCukUTLdhYDdm-mgZUQ=s96-c', '2026-06-25 22:14:13', '2026-06-25 22:14:13'),
(34, 372, 'google', '104852929242523449554', 'iqroomar21@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLRfHchqllAhqPziCj7W8T7zLHFnrGsbEhyX6O_Wf9NGLDR5g=s96-c', '2026-06-26 09:54:18', '2026-06-26 09:54:18'),
(35, 373, 'google', '114927469239813402201', 'abdalehmahdi9@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocI-KpTBedO84Ef5l2QH5lz6eOg4cYPWQhOXQfLZ_SJD4Gq4DxWk=s96-c', '2026-06-27 09:06:53', '2026-06-27 09:06:53'),
(36, 377, 'google', '107989334085375467567', 'barbaraawi029@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKI5IZnG9ESxCeY0OzctQsxuTIV23UcWsJm_9x4z2UZr7s3xA=s96-c', '2026-06-29 09:43:20', '2026-06-29 09:43:20'),
(37, 381, 'google', '105433243109421031898', 'ibraahimxasan704@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIseeb3JZWvk9GXBjSta7xKKjx-af-t_CEKTOdBRDui_N8nTsA=s96-c', '2026-06-30 20:52:24', '2026-06-30 20:52:24'),
(38, 384, 'google', '101944312488678404363', 'filsanyarfilsanxasan@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLX-xvSGafFG2qyD3K4quZsPG5DsESedTprNKL_5MyB0QF0N4c=s96-c', '2026-07-03 08:32:29', '2026-07-03 08:32:29'),
(39, 392, 'google', '103988565535706753211', 'maxamedfaarax123hooyo@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIusy8BLC6Xp_be61ygSf-AQf3Fp0UHDf6ai81b63GOXJtNNA=s96-c', '2026-07-06 17:19:39', '2026-07-06 17:19:39'),
(40, 395, 'google', '111369161128572536899', 'ayaanlexuseen561@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocK1rxtdnVa86p8MrqP8NmbfI5uTQTUdKGjBfFDKjfudwv_OEw=s96-c', '2026-07-09 08:37:47', '2026-07-09 08:37:47'),
(41, 398, 'google', '103607725553848373433', 'siciidhaibe@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL91CAc9K6l244Dyd-E24hEowua8wNzqPi10LykR9bexUuMSzRv=s96-c', '2026-07-11 18:54:50', '2026-07-11 18:54:50'),
(42, 399, 'google', '107919436130073866377', 'mubaarigx50@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL-OkjH_jK3FsX27POn5lM0jB5nFugAnQqt21ko1faB1gkTIc1U=s96-c', '2026-07-12 13:27:54', '2026-07-12 13:27:54'),
(43, 401, 'google', '105606750474595414669', 'abdimuuse8148@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJiFUYi3ty4JkPQh_aX471dXXAZz4bvJaK5R-2ArXEBNFtCGj4=s96-c', '2026-07-13 09:37:28', '2026-07-13 09:37:28'),
(44, 402, 'google', '105547720426882641850', 'saacidcabdullahiky@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIjpolv-omv02BEEhxChtkWwTPM8TMHaZZnM1vunACk3ZYGFA=s96-c', '2026-07-13 10:30:20', '2026-07-13 10:30:20'),
(45, 403, 'google', '112454421999919136942', 'saacidakhaa@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLF_OyJuUxNf28QeAbOXEwDN_8vEsfLZvdihY21dYeNJUe_GA=s96-c', '2026-07-13 10:31:06', '2026-07-13 10:31:06'),
(46, 404, 'google', '113796670604724706299', 'jamacahmed29ss@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLdg1QtV8rJ2iiVgfG5KA-JEF1U8UgBzO-N6ITkYfiCqwFMxw=s96-c', '2026-07-13 22:32:51', '2026-07-13 22:32:51'),
(47, 407, 'google', '114852679305623225604', 'rahmaroofa@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJ69gsa1dsZ8LvLJ9hSp3E0k_te2eYtzdGpay_SVgTHD7Dwqw=s96-c', '2026-07-14 19:18:25', '2026-07-14 19:18:25'),
(48, 409, 'google', '101020925939561826588', 'sadiqjamac859@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocL7ekNZjEX4lVGpJdLDnKZutKQYoEejh2Ft4hKjU8_A3oqkN7RW=s96-c', '2026-07-14 23:36:01', '2026-07-14 23:36:01'),
(49, 410, 'google', '103492010892783026665', 'anfacmahdi28@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLPi5vueryyEmg0lD7XgUbNXnI2eh_kGW4GWDVrwszqL-ZzxA=s96-c', '2026-07-15 16:50:22', '2026-07-15 16:50:22'),
(50, 411, 'google', '111065196850837616246', 'mubaarigxasan70@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocJnRl8HpOOcD_HritkD3cf3tollh_Xlz37N8S8K8LPO8qUdWg=s96-c', '2026-07-16 14:48:01', '2026-07-16 14:48:01'),
(51, 413, 'google', '112797006365194827221', 'sihaam3332@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocKPvaPifXYbNNxUBML5zs-rYawWEMAD11k0KJLtO34jbzBXGQ=s96-c', '2026-07-18 07:21:34', '2026-07-18 07:21:34'),
(52, 414, 'google', '105643343760918203694', 'qadarcabdullahi22@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocIN4sEknhlBhjh5suNzrft26JoUxLFMtKOnKBiTsKsELX1oyA=s96-c', '2026-07-18 07:29:57', '2026-07-18 07:29:57'),
(53, 416, 'google', '104048238332005940607', 'axmedyare46605@gmail.com', 'https://lh3.googleusercontent.com/a/ACg8ocLvKX1iXJe-fe1573UWKsarWHL1VhuEcczBB0Uhpj4zibCphg=s96-c', '2026-07-19 10:13:36', '2026-07-19 10:13:36');
INSERT INTO "password_reset_tokens" ("id", "user_id", "token", "expires_at", "used", "created_at") VALUES
(19, 1, '$2y$10$.uj5xprfyCDcwo.ar68m5u3muiSnbIaWHe1toTzsk9uFSOozMDW/.', '2025-11-08 22:19:02', 0, '2025-11-08 21:19:02'),
(20, 1, '$2y$10$A8.DGbIn/bZAIIPH05kj1e.7Zyw8AWIV2GXXZiTGbSLwHTPHVWI5.', '2025-11-08 21:28:05', 1, '2025-11-08 21:27:31'),
(21, 2, '$2y$10$b4xaOIdmkZaTgm.4kHWAXeJS.VViMFpx2A1oBaZbp2IFc4iTfYEQu', '2025-11-09 01:09:49', 0, '2025-11-09 00:09:49'),
(22, 1, '$2y$10$S.wU6zhB.HdQW48RIyul4ugkLb6Zpsre07RVgmiKAPAxN9qO3iMS.', '2025-11-09 01:10:44', 0, '2025-11-09 00:10:44'),
(23, 1, '$2y$10$LLlRmNBb75sD3Bs40zsgeOIvGYEPEf9CLAbBuVmCdk4/OwDN3E4b6', '2025-11-09 00:15:42', 1, '2025-11-09 00:15:20'),
(24, 63, '$2y$10$DUuK3xr.Dn991J9HL1YhCuwUwcrxl2iQayAJWnuffmtKpX9mwJiOy', '2026-02-08 17:00:16', 0, '2026-02-08 16:00:16'),
(25, 83, '$2y$10$8838YJs214NjtwplhImfJO76e.cc3oPTWiR7haYD3Bvrfkhq0dlyO', '2026-02-22 08:31:39', 1, '2026-02-22 08:31:06'),
(26, 19, '$2y$10$LvFkX.G20TRl0bpU3.A7Ru9Fa3m2UPT6d2lb6GAWkKkz3E5UL96RW', '2026-03-03 11:50:32', 0, '2026-03-03 10:50:32'),
(27, 19, '$2y$10$euvwv.h0YIAVOTKyBn2kBepa/uIvu8/YR3qWMXHgRUgFHqd6.WnnC', '2026-03-03 10:51:02', 1, '2026-03-03 10:50:48'),
(28, 140, '$2y$10$ugsxp8DXjmtmQgkM7mBBB.V0Ehi4TqIqyiVMlL9xh42aNvgh51wA6', '2026-03-04 22:12:40', 0, '2026-03-04 21:12:40'),
(29, 140, '$2y$10$lqjoq/HK6CzpJaq6sBDI1ex6RisGWpJhG9RYqfLtC2MPSzS2Qk3mi', '2026-03-04 21:13:50', 1, '2026-03-04 21:13:06'),
(30, 151, '$2y$10$hGMlvk/Wm2Wjcmkv2x.dVO1V/swGkboQd54D4/cGM7JJ8fiyMR8yC', '2026-03-09 13:31:23', 1, '2026-03-09 13:31:06'),
(31, 167, '$2y$10$DBpDyzHC1LvRNK9qreP3h.66KHQ9kg5d5njJavN6hSPWP6ymSUBOS', '2026-03-09 14:40:42', 1, '2026-03-09 14:40:18'),
(32, 167, '$2y$10$uc1wV2kbt0scqzBf12q9r.f1U6AXtlkghO20B13scks5WLdEDxQCK', '2026-03-09 14:42:26', 1, '2026-03-09 14:42:03'),
(33, 140, '$2y$10$qDqEpbg1hPxpmhMME34bTuUwmKNJdqGrD/FAGLtjwy4WssiryKNhq', '2026-03-10 08:19:29', 1, '2026-03-10 08:19:01'),
(34, 171, '$2y$10$MwnUp2Nw5253vnhxoAd4YeLEnirMEV1ubSuVGrT3mY8RKi0vxPf5u', '2026-03-13 06:25:34', 0, '2026-03-13 05:25:34'),
(35, 133, '$2y$10$WZqZGxkR6Di1qR4YL7NvKedaXCY01kyBwCSzeCGOuv77HUVCB4kpO', '2026-04-12 04:16:56', 0, '2026-04-12 03:16:56'),
(36, 133, '$2y$10$TAsQQXp6s.jtDbluO/FtyuwWO7mGD0disNHMK0KEkvKl2ZhARp26e', '2026-04-12 04:17:25', 0, '2026-04-12 03:17:25'),
(37, 133, '$2y$10$Apk7pkPK6LYthzWqHivkEe8pmATnoQcMAH9ty.8STxDalghxHWNcO', '2026-04-12 04:36:26', 0, '2026-04-12 03:36:26'),
(38, 63, '$2y$10$UqfzEJ9ta9z57ub78a/eI.LPzSXViUbiKxr9OaYAh4bx0JEAvlb3K', '2026-04-25 19:35:16', 0, '2026-04-25 18:35:16'),
(39, 63, '$2y$10$40WYrNxJpn8Mgl/bkKyWheWuFBKYK4QyVayF1Z017O.CzUlqJNGpC', '2026-04-25 19:36:06', 0, '2026-04-25 18:36:06'),
(40, 210, '$2y$10$/BcNhdO6tbM4b6/VDS4RGeL6TyZXNNCt9qwr8LZLCztL/SiZhP8p.', '2026-04-26 10:51:36', 0, '2026-04-26 09:51:36'),
(41, 210, '$2y$10$AHqK.5IEdk6idkEQWBHnpe4iooxz8z8GI/WjazzPo4reMYs19fUqO', '2026-04-26 10:54:39', 0, '2026-04-26 09:54:39'),
(42, 201, '$2y$10$MzF/.FN53ZBzrh.uz8b1pOjm7fKt28TwlfmDc4b2O2ormWXh5vuPy', '2026-05-01 17:29:19', 1, '2026-05-01 17:27:57'),
(43, 201, '$2y$10$Ll.bFZNVDgeuq0qZLOy62OqOslI2sxd8qPIUQsK.8tXRb8/Z4KtAO', '2026-05-07 20:43:41', 0, '2026-05-07 19:43:41'),
(44, 201, '$2y$10$iA7/eQUKSMLFVB4OTv0RA.A/p/VIms44z07.FXil9txTdcitgnUHG', '2026-05-07 20:55:45', 0, '2026-05-07 19:55:45'),
(45, 201, '$2y$10$66qif0iVwq3xZyjvdQO9fuguvZAmLWeX4KWoo7FQdrk77tjByAGnC', '2026-05-07 20:57:20', 0, '2026-05-07 19:57:20'),
(46, 201, '$2y$10$YLyFKFyKOBYn5Og2qrJI/uH1.RwBTqn27n1dQAl595na0o4a2BYX6', '2026-05-07 20:58:43', 0, '2026-05-07 19:58:43'),
(47, 250, '$2y$10$lDLcTxAv6HUgbFGGXyOAeOrvCAxa0GYd/uFWeymErLDhGhKigCF5G', '2026-05-09 19:18:24', 0, '2026-05-09 18:18:24'),
(48, 92, '$2y$10$SjG0WCPs02Ivk0xdk4yJVO4PdGb2.Eo6ux9.2dQpi.bamqTFSeDwq', '2026-05-11 11:54:04', 1, '2026-05-11 11:52:56'),
(49, 211, '$2y$10$ycxivhq5Aho8CFACWghu2.lRwSYv4uTLP0Klia3b0CMeVvQANgiBG', '2026-05-16 06:06:10', 0, '2026-05-16 05:06:10'),
(50, 211, '$2y$10$d2A8ayY/4LBvoxfCHvvcT.sGhjpwqm7A7PxGw19GL/n8ctS/Q4Swm', '2026-05-16 06:06:10', 0, '2026-05-16 05:06:10'),
(51, 211, '$2y$10$pQDvTbDlCNrtewty6BBBX.f8pHL.2yWIMuCUvD0oV0zNfRNfhSkP.', '2026-05-16 06:08:17', 0, '2026-05-16 05:08:17'),
(52, 201, '$2y$10$tHjCjAmWrfzlMfZUNcRluuToeEGGlHM9cH8.EPf8pKv74cWiCzdnO', '2026-05-16 19:58:31', 1, '2026-05-16 19:58:03'),
(53, 281, '$2y$10$dG11qTjtlWv2BMo8LfuMYept4SZXgLzhQPrTpqR.L8Vv13fuPWMHC', '2026-05-20 19:57:48', 0, '2026-05-20 18:57:48'),
(54, 292, '$2y$10$6Cj3PhnwHN2KyzSThOcPKOvfD/Wdylol8iM0rV9oq.9SyvQiuHDlu', '2026-05-23 14:35:47', 0, '2026-05-23 13:35:47'),
(55, 308, '$2y$10$TfXmf0GNE0MimidUAsSc6.NGmIhqUsPSHcfi0yxKyTkj4pLpNVMKm', '2026-05-25 23:06:44', 0, '2026-05-25 22:06:44'),
(56, 308, '$2y$10$HObUkcDxPIJ0KTfknpoqeeBFN5KazlyMFXwOaYL.BV9Oo4RN3MOCy', '2026-05-25 22:09:45', 1, '2026-05-25 22:08:32'),
(57, 315, '$2y$10$.ehDUBCmJICbfyg6QWTU6OPMOhy6Yg8iuq2ASDpk0mpfwdkUiZMIq', '2026-05-28 11:11:27', 0, '2026-05-28 10:11:27'),
(58, 207, '$2y$10$1F6v5LJUshEbf1Rit5MggeDJf0onUvOx.isMmc1VREtOabYdJGZz6', '2026-06-14 23:27:37', 1, '2026-06-14 23:26:41'),
(59, 78, '$2y$10$HEySPyyAN60FaGALc1qzHuIN9QqvQ2TVLnIp1URKSNaC8XWYOInte', '2026-06-27 18:10:38', 1, '2026-06-27 18:10:00');
INSERT INTO "payments" ("id", "payment_id", "user_id", "book_id", "summary_id", "payment_method", "reference_number", "proof_image_path", "amount", "status", "admin_notes", "notify_sent", "created_at", "processed_at") VALUES
(2, 2, 1, 20, NULL, 'ZAAD', '0636475579', 'uploads/payments/payment_6909c5ad3495a7.03042455_1762248109.jpg', 5.00, 'approved', '', 0, '2025-11-04 09:21:49', '2025-11-04 09:22:01'),
(3, 3, 1, 20, NULL, 'Sahal', '0636475579', 'uploads/payments/payment_6909d301981d25.66291654_1762251521.jpg', 5.00, 'approved', '', 0, '2025-11-04 10:18:41', '2025-11-04 10:18:49'),
(4, 4, 1, 24, NULL, 'ZAAD', '0636475579', 'uploads/payments/payment_690a567daf5900.26260530_1762285181.jpg', 4.00, 'approved', '', 0, '2025-11-04 19:39:41', '2025-11-04 19:48:17'),
(5, 5, 1, 23, NULL, 'E-Dahab', '0636475579', 'uploads/payments/payment_690f5c7ff23ba8.37266400_1762614399.jpg', 2.00, 'approved', '', 0, '2025-11-08 15:06:40', '2025-11-08 15:07:35'),
(6, 6, 3, 26, NULL, 'ZAAD', '23455', 'uploads/payments/payment_691423fd182d24.80125536_1762927613.jpg', 2.00, 'approved', '', 0, '2025-11-12 06:06:53', '2025-11-12 06:12:55'),
(7, 7, 3, 26, NULL, '', '33333', 'uploads/payments/payment_69142a96a88ae2.75171616_1762929302.jpg', 2.00, 'approved', '', 0, '2025-11-12 06:35:02', '2025-11-12 06:35:19'),
(8, 8, 3, 27, NULL, 'Ebir', '33333', 'uploads/payments/payment_691430ae784db0.69209219_1762930862.png', 4.00, 'approved', '', 0, '2025-11-12 07:01:02', '2025-11-12 07:01:20'),
(9, 9, 3, 27, NULL, 'ZAAD', '33333', 'uploads/payments/payment_6914418aa74364.98289453_1762935178.jpg', 4.00, 'approved', '', 0, '2025-11-12 08:12:58', '2025-11-12 08:13:28'),
(10, 10, 3, 27, NULL, 'ZAAD', '33333', 'uploads/payments/payment_691444d3308d96.73418917_1762936019.png', 4.00, 'approved', '', 0, '2025-11-12 08:26:59', '2025-11-12 08:27:11'),
(11, 11, 3, 26, NULL, 'ZAAD', '33333', 'uploads/payments/payment_69149aa0620260.65220920_1762957984.jpg', 2.00, 'approved', '', 0, '2025-11-12 14:33:04', '2025-11-12 14:33:32'),
(12, 12, 5, 26, NULL, 'ZAAD', '0633924885', 'uploads/payments/payment_69173bf7d80495.77186016_1763130359.jpg', 2.00, 'approved', '', 0, '2025-11-14 14:25:59', '2025-11-14 14:26:27'),
(13, 13, 6, 32, NULL, 'E-Dahab', '0654249532', 'uploads/payments/payment_6917808c49c722.83585700_1763147916.jpg', 2.00, 'approved', '', 0, '2025-11-14 19:18:36', '2025-11-14 19:19:32'),
(14, 14, 7, 35, NULL, 'Sahal', 'jofrnkjdsnkdsfd;lksmflksmlkfmlxmlml', 'uploads/payments/payment_691c00542a4f45.71484603_1763442772.jpg', 2.00, 'approved', '', 0, '2025-11-18 05:12:52', '2025-11-20 04:36:22'),
(15, 15, 10, 35, NULL, 'ZAAD', '0634249532', 'uploads/payments/payment_6920ac5b1f1215.30356912_1763748955.jpg', 2.00, 'approved', '', 0, '2025-11-21 18:15:55', '2025-11-21 18:16:27'),
(16, 16, 11, 37, NULL, 'ZAAD', '612221855', 'uploads/payments/payment_6920c1e57ab307.73690823_1763754469.png', 3.00, 'approved', '', 0, '2025-11-21 19:47:49', '2025-11-21 19:49:09'),
(17, 17, 3, 37, NULL, 'Hormuud', '33333', 'uploads/payments/payment_692442a9c82824.80185264_1763984041.jpg', 3.00, 'approved', '', 0, '2025-11-24 11:34:01', '2025-11-24 11:37:26'),
(18, 18, 17, 44, NULL, 'ZAAD', '0638231830', 'uploads/payments/payment_69257ff91efbb0.14338392_1764065273.jpg', 2.00, 'approved', '', 0, '2025-11-25 10:07:53', '2025-11-25 10:14:47'),
(19, 19, 17, 37, NULL, 'ZAAD', '063 8231830', 'uploads/payments/payment_69258a8548c775.53485685_1764067973.jpg', 3.00, 'approved', '', 0, '2025-11-25 10:52:53', '2025-11-25 10:53:05'),
(20, 20, 3, 46, NULL, 'ZAAD', '063 6475579', 'uploads/payments/payment_6925bb7658fee9.99543423_1764080502.jpg', 2.00, 'approved', '', 0, '2025-11-25 14:21:42', '2025-11-25 14:22:30'),
(21, 21, 18, 44, NULL, 'Hormuud', '612016720', 'uploads/payments/payment_692b0a449dc485.02453316_1764428356.jpeg', 2.00, 'approved', '', 0, '2025-11-29 14:59:16', '2025-11-29 15:00:48'),
(22, 22, 22, 42, NULL, '', '0740694622', 'uploads/payments/payment_69306799d547f2.41677351_1764779929.jpg', 2.00, 'rejected', '', 0, '2025-12-03 16:38:49', '2025-12-04 13:05:54'),
(23, 23, 39, 35, NULL, 'ZAAD', 'Tix:13661207544', 'uploads/payments/payment_694547b2c5a197.19129904_1766148018.jpg', 1.00, 'approved', '', 0, '2025-12-19 12:40:18', '2025-12-19 12:41:24'),
(24, 24, 42, NULL, 12, 'ZAAD', '13667277875', 'uploads/payments/payment_69466b35a06344.70686162_1766222645.png', 1.00, 'approved', '', 0, '2025-12-20 09:24:05', '2025-12-20 09:33:18'),
(25, 25, 43, 46, NULL, 'Hormuud', '13673577124', 'uploads/payments/payment_69479267810c72.98190384_1766298215.png', 1.00, 'approved', '', 0, '2025-12-21 06:23:35', '2025-12-21 06:26:07'),
(26, 26, 47, 42, NULL, 'Waafi', '252634160469', 'uploads/payments/payment_694a8b8710df94.95340211_1766493063.jpg', 1.00, 'approved', '', 0, '2025-12-23 12:31:03', '2025-12-23 14:10:04'),
(27, 27, 36, 42, NULL, 'ZAAD', '13692583334', 'uploads/payments/payment_694ac1bec68105.49311636_1766506942.jpg', 1.00, 'approved', '', 0, '2025-12-23 16:22:22', '2025-12-23 16:22:45'),
(28, 28, 49, 37, NULL, 'ZAAD', '0633766859', 'uploads/payments/payment_694ac6d1589281.85040308_1766508241.jpg', 2.00, 'approved', '', 0, '2025-12-23 16:44:01', '2025-12-23 16:44:25'),
(29, 29, 50, 42, NULL, 'ZAAD', '13701985675', 'uploads/payments/payment_694c4320a017d8.01418036_1766605600.jpg', 1.00, 'approved', '', 0, '2025-12-24 19:46:40', '2025-12-25 01:23:45'),
(30, 30, 39, 37, NULL, 'ZAAD', 'Tix:13754356791', 'uploads/payments/payment_695593ed17dbc5.92620369_1767216109.jpg', 2.00, 'approved', '', 0, '2025-12-31 21:21:49', '2026-01-01 08:48:57'),
(31, 31, 3, 49, NULL, 'ZAAD', '1234444', 'uploads/payments/payment_6959890e5a8b82.28978921_1767475470.jpg', 1.00, 'approved', '', 0, '2026-01-03 21:24:30', '2026-01-03 21:24:48'),
(32, 32, 63, 42, NULL, '', '13796226637', 'uploads/payments/payment_695cc105b06e63.01228164_1767686405.png', 1.00, 'approved', '', 0, '2026-01-06 08:00:05', '2026-01-06 08:32:53'),
(33, 33, 64, 49, NULL, '', '7 171745', 'uploads/payments/payment_695d4e1d629567.47927679_1767722525.jpg', 1.00, 'approved', '', 0, '2026-01-06 18:02:05', '2026-01-06 18:03:09'),
(34, 34, 3, 50, NULL, 'ZAAD', '12555', 'uploads/payments/payment_695fe1fce72051.44575856_1767891452.jpg', 2.00, 'approved', '', 0, '2026-01-08 16:57:32', '2026-01-08 16:59:38'),
(35, 35, 70, 50, NULL, 'Hormuud', '0636475579', 'uploads/payments/payment_696001c3178061.24358026_1767899587.png', 2.00, 'approved', '', 0, '2026-01-08 19:13:07', '2026-01-08 19:15:33'),
(36, 36, 3, 54, NULL, 'ZAAD', '13444', 'uploads/payments/payment_69668b0785a707.86809909_1768327943.jpg', 1.00, 'approved', '', 0, '2026-01-13 18:12:23', '2026-01-13 18:12:44'),
(37, 37, 74, 42, NULL, 'ZAAD', '13864770018', 'uploads/payments/payment_6968369736fe70.06384431_1768437399.jpg', 1.00, 'approved', '', 0, '2026-01-15 00:36:39', '2026-01-15 03:00:59'),
(38, 38, 96, 54, NULL, 'ZAAD', '1234566778', 'uploads/payments/payment_697f854c5ed9a3.90768967_1769964876.jpg', 1.00, 'approved', '', 0, '2026-02-01 16:54:36', '2026-02-01 16:55:05'),
(39, 39, 99, 37, NULL, 'ZAAD', '14011443205', 'uploads/payments/payment_6981e545570693.93776717_1770120517.jpg', 2.00, 'approved', '', 0, '2026-02-03 12:08:37', '2026-02-03 12:31:01'),
(40, 40, 123, 42, NULL, 'Hormuud', '682439656', 'uploads/payments/payment_69934819189109.51189043_1771259929.jpg', 1.00, 'approved', '', 0, '2026-02-16 16:38:49', '2026-02-16 16:39:59'),
(41, 41, 126, 37, NULL, '', '11222', 'uploads/payments/payment_6994a28dbb64d6.34932227_1771348621.jpg', 2.00, 'approved', '', 0, '2026-02-17 17:17:01', '2026-02-17 17:17:33'),
(42, 42, 130, 35, NULL, 'Hormuud', '612969208', 'uploads/payments/payment_699563c1824169.41370803_1771398081.jpg', 1.00, 'approved', '', 0, '2026-02-18 07:01:21', '2026-02-18 08:38:17'),
(43, 43, 133, 36, NULL, 'Hormuud', '14134904798', 'uploads/payments/payment_699601feec4e27.20270646_1771438590.jpg', 1.00, 'approved', '', 0, '2026-02-18 18:16:30', '2026-02-18 18:17:28'),
(44, 44, 136, 54, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_69982eeb79e1f7.66542749_1771581163.jpeg', 1.00, 'approved', '', 0, '2026-02-20 09:52:43', '2026-02-20 09:53:19'),
(45, 45, 136, 51, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_69983427972229.75475315_1771582503.jpeg', 1.00, 'approved', '', 0, '2026-02-20 10:15:03', '2026-02-20 10:16:55'),
(46, 46, 136, 50, NULL, 'ZAAD', '14144590953', 'uploads/payments/payment_6998385404ad86.23039982_1771583572.jpeg', 2.00, 'approved', '', 0, '2026-02-20 10:32:52', '2026-02-20 10:32:59'),
(47, 47, 136, NULL, 12, 'ZAAD', '14144590953', 'uploads/payments/payment_699838e3244ea1.42273452_1771583715.jpeg', 1.00, 'approved', '', 0, '2026-02-20 10:35:15', '2026-02-20 10:37:15'),
(48, 48, 136, 36, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_6998513a92a742.03271812_1771589946.jpeg', 1.00, 'approved', '', 0, '2026-02-20 12:19:06', '2026-02-20 13:06:49'),
(49, 49, 136, 45, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_699859d6720f90.72201786_1771592150.jpeg', 1.00, 'approved', '', 0, '2026-02-20 12:55:50', '2026-02-20 13:06:43'),
(50, 50, 136, 42, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_69985a2b0bedb0.84382011_1771592235.jpeg', 1.00, 'approved', '', 0, '2026-02-20 12:57:15', '2026-02-20 13:06:24'),
(51, 51, 140, 50, NULL, '', '14154590110', 'uploads/payments/payment_699a1b457b1885.93296633_1771707205.jpg', 2.00, 'approved', '', 0, '2026-02-21 20:53:25', '2026-02-21 20:53:39'),
(52, 52, 83, 44, NULL, 'ZAAD', '14156725733', 'uploads/payments/payment_699ac09995a6f1.26127828_1771749529.jpeg', 1.00, 'approved', '', 0, '2026-02-22 08:38:49', '2026-02-22 08:39:05'),
(53, 53, 151, 42, NULL, 'ZAAD', '14173134934', 'uploads/payments/payment_699dedcd9ec918.01474440_1771957709.png', 1.00, 'approved', '', 0, '2026-02-24 18:28:29', '2026-02-24 18:28:39'),
(54, 54, 136, 46, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_699efa7d7f9f53.96977790_1772026493.jpeg', 1.00, 'approved', '', 0, '2026-02-25 13:34:53', '2026-02-25 13:40:13'),
(55, 55, 136, 37, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_699efb204de901.38332150_1772026656.jpeg', 2.00, 'approved', '', 0, '2026-02-25 13:37:36', '2026-02-25 13:40:09'),
(56, 56, 136, 35, NULL, 'ZAAD', '14144476078', 'uploads/payments/payment_699efb6570cc47.11588889_1772026725.jpeg', 1.00, 'approved', '', 0, '2026-02-25 13:38:45', '2026-02-25 13:40:05'),
(57, 57, 152, 49, NULL, 'ZAAD', '6475579', 'uploads/payments/payment_699f07f8dc5cd2.80176257_1772029944.jpg', 1.00, 'approved', '', 0, '2026-02-25 14:32:24', '2026-02-25 14:37:14'),
(58, 58, 152, 42, NULL, 'ZAAD', '6475579', 'uploads/payments/payment_699ffcaa7ca917.78699818_1772092586.jpg', 1.00, 'approved', '', 0, '2026-02-26 07:56:26', '2026-02-26 07:57:26'),
(59, 59, 155, 42, NULL, 'Waafi', '0613261282', 'uploads/payments/payment_69a547cccc3dd3.52981045_1772439500.png', 1.00, 'approved', '', 0, '2026-03-02 08:18:20', '2026-03-02 08:20:44'),
(60, 60, 164, 35, NULL, '', '14237321293', 'uploads/payments/payment_69a9c8bc753ee5.79958992_1772734652.jpg', 1.00, 'approved', '', 0, '2026-03-05 18:17:32', '2026-03-05 18:17:47'),
(61, 61, 167, 42, NULL, 'ZAAD', '0634800980', 'uploads/payments/payment_69aad81c9802d7.86657962_1772804124.JPG', 1.00, 'approved', '', 0, '2026-03-06 13:35:24', '2026-03-06 13:38:01'),
(62, 62, 3, 43, NULL, 'ZAAD', '2233333', 'uploads/payments/payment_69ab2a2c9736e4.43664569_1772825132.png', 1.00, 'approved', '', 0, '2026-03-06 19:25:32', '2026-03-06 19:26:00'),
(63, 63, 3, 42, NULL, 'ZAAD', '2233322', 'uploads/payments/payment_69ab2dd88fb4f7.23305323_1772826072.png', 1.00, 'approved', '', 0, '2026-03-06 19:41:12', '2026-03-06 19:41:30'),
(64, 64, 173, 43, NULL, 'Waafi', '0619179754', 'uploads/payments/payment_69b021849d4803.96665136_1773150596.jpg', 1.00, 'approved', '', 0, '2026-03-10 13:49:56', '2026-03-10 13:50:49'),
(65, 65, 171, 50, NULL, 'ZAAD', '[-KAASHPLUS SERVICES-] Tix: 14286975777 SLSH20,000', 'uploads/payments/payment_69b3a0ccd48714.43208682_1773379788.jpg', 2.00, 'approved', '', 0, '2026-03-13 05:29:48', '2026-03-13 06:24:00'),
(66, 66, 176, 52, NULL, 'ZAAD', '0762852621', 'uploads/payments/payment_69b66c3d5daf33.84051349_1773562941.png', 2.00, 'approved', '', 0, '2026-03-15 08:22:21', '2026-03-15 08:24:02'),
(67, 67, 176, 50, NULL, 'ZAAD', '0762852621', 'uploads/payments/payment_69b66cfe0048d7.43653418_1773563134.png', 2.00, 'approved', '', 0, '2026-03-15 08:25:34', '2026-03-15 08:26:37'),
(68, 68, 176, 42, NULL, 'ZAAD', '0762852621', 'uploads/payments/payment_69b66d553f0d60.56333015_1773563221.png', 1.00, 'approved', '', 0, '2026-03-15 08:27:01', '2026-03-15 08:27:33'),
(69, 69, 176, 35, NULL, 'ZAAD', '0762852621', 'uploads/payments/payment_69b66dccab92b9.46077485_1773563340.png', 1.00, 'approved', '', 0, '2026-03-15 08:29:00', '2026-03-15 08:30:02'),
(70, 70, 176, 49, NULL, 'ZAAD', '0762852621', 'uploads/payments/payment_69b66e85ccb3f6.93939886_1773563525.png', 1.00, 'rejected', '', 0, '2026-03-15 08:32:05', '2026-03-25 15:49:55'),
(71, 71, 185, 35, NULL, 'Waafi', '619977045', 'uploads/payments/payment_69c402ca4d8c87.29716699_1774453450.jpeg', 1.00, 'approved', '', 0, '2026-03-25 15:44:10', '2026-03-25 15:44:33'),
(72, 72, 188, 37, NULL, 'ZAAD', '14416310457', 'uploads/payments/pay_69c7c89c3f239_1774700700.png', 2.00, 'approved', '', 0, '2026-03-28 12:25:00', '2026-03-28 14:34:54'),
(73, 73, 49, 35, NULL, 'ZAAD', '63 3766859', 'uploads/payments/pay_69c7f379bcbe7_1774711673.jpg', 1.00, 'approved', '', 0, '2026-03-28 15:27:53', '2026-03-28 15:29:16'),
(74, 74, 193, NULL, 12, 'Hormuud', '0614142040', 'uploads/payments/pay_69cbdeabbb069_1774968491.jpg', 1.00, 'rejected', '', 0, '2026-03-31 14:48:11', '2026-04-05 19:57:42'),
(75, 75, 195, 35, NULL, 'Hormuud', '617657457', 'uploads/payments/pay_69cd61a5e8f20_1775067557.jpg', 1.00, 'approved', '', 0, '2026-04-01 18:19:17', '2026-04-01 18:20:45'),
(76, 76, 3, 52, NULL, 'ZAAD', '1233333333', 'uploads/payments/pay_69d2be82c2139_1775419010.jpg', 2.00, 'approved', '', 0, '2026-04-05 19:56:50', '2026-04-05 19:57:47'),
(77, 77, 3, 51, NULL, 'ZAAD', '123333333333', 'uploads/payments/pay_69d2bef4bf28b_1775419124.jpg', 1.00, 'approved', '', 0, '2026-04-05 19:58:44', '2026-04-05 19:59:34'),
(78, 78, 201, 54, NULL, 'ZAAD', '14500896352', 'uploads/payments/pay_69d581c0c91b2_1775600064.jpg', 1.00, 'approved', '', 0, '2026-04-07 22:14:24', '2026-04-07 22:14:51'),
(79, 79, 205, 36, NULL, 'ZAAD', '14531111661', 'uploads/payments/pay_69d918482c10b_1775835208.jpg', 1.00, 'approved', '', 0, '2026-04-10 15:33:28', '2026-04-10 21:19:07'),
(80, 80, 207, 50, NULL, 'ZAAD', '0636170626', 'uploads/payments/pay_69dac578de416_1775945080.jpeg', 2.00, 'approved', '', 0, '2026-04-11 22:04:40', '2026-04-11 22:06:28'),
(81, 81, 207, 37, NULL, 'ZAAD', '0636170626', 'uploads/payments/pay_69dac63c6f263_1775945276.jpeg', 2.00, 'approved', '', 0, '2026-04-11 22:07:56', '2026-04-11 22:08:44'),
(82, 82, 209, 35, NULL, 'ZAAD', '0634758191', 'uploads/payments/pay_69dba800be117_1776003072.jpeg', 1.00, 'approved', '', 0, '2026-04-12 14:11:12', '2026-04-12 14:36:25'),
(83, 83, 3, 45, NULL, 'ZAAD', '33333', 'uploads/payments/pay_69dd746004aec_1776120928.jpg', 1.00, 'approved', '', 0, '2026-04-13 22:55:28', '2026-04-13 22:55:47'),
(84, 84, 211, 44, NULL, 'ZAAD', '0634724178', 'uploads/payments/pay_69e27505dd481_1776448773.png', 1.00, 'approved', '', 0, '2026-04-17 17:59:33', '2026-04-17 18:07:28'),
(85, 85, 213, 54, NULL, 'ZAAD', '14580851726', 'uploads/payments/pay_69e3648147800_1776510081.png', 1.00, 'approved', '', 0, '2026-04-18 11:01:21', '2026-04-18 11:10:27'),
(86, 86, 214, 54, NULL, 'ZAAD', '14585193080', 'uploads/payments/pay_69e3e5732f0a0_1776543091.jpg', 1.00, 'approved', '', 0, '2026-04-18 20:11:31', '2026-04-18 20:12:06'),
(87, 87, 3, 66, NULL, 'ZAAD', '12233333', 'uploads/payments/pay_69e64d1ca3ed9_1776700700.png', 4.00, 'approved', '', 0, '2026-04-20 15:58:20', '2026-04-20 15:58:44'),
(88, 88, 210, 45, NULL, 'ZAAD', '14646151256', 'uploads/payments/pay_69eee71e6f436_1777264414.jpg', 1.00, 'approved', '', 0, '2026-04-27 04:33:34', '2026-04-27 05:00:17'),
(89, 89, 218, 50, NULL, 'Waafi', '0615002088', 'uploads/payments/pay_69ef3ce386ab4_1777286371.png', 2.00, 'rejected', '', 0, '2026-04-27 10:39:31', '2026-05-08 13:45:35'),
(90, 90, 219, 35, NULL, 'ZAAD', '749543388', 'uploads/payments/pay_69f0caa90110f_1777388201.jpg', 1.00, 'rejected', '', 0, '2026-04-28 14:56:41', '2026-05-08 13:45:23'),
(91, 91, 239, 54, NULL, 'ZAAD', 'Tiktok', 'uploads/payments/pay_69fcdc0a231f1_1778179082.png', 1.00, 'approved', '', 0, '2026-05-07 18:38:02', '2026-05-07 19:23:28'),
(92, 92, 235, 66, NULL, 'ZAAD', '14737535203', 'uploads/payments/pay_69fdc5ba4ccef_1778238906.jpg', 4.00, 'approved', '', 0, '2026-05-08 11:15:06', '2026-05-08 11:24:10'),
(93, 93, 245, 66, NULL, 'E-Dahab', '14', 'uploads/payments/pay_69fe39963e0ee_1778268566.jpg', 4.00, 'approved', '', 0, '2026-05-08 19:29:26', '2026-05-08 19:30:34'),
(94, 94, 245, 42, NULL, 'E-Dahab', '14', 'uploads/payments/pay_69ff0498b024c_1778320536.jpg', 1.00, 'approved', '', 0, '2026-05-09 09:55:36', '2026-05-09 10:53:00'),
(95, 95, 250, 35, NULL, 'ZAAD', '14748115327', 'uploads/payments/pay_69ff649aaf226_1778345114.jpg', 1.00, 'approved', '', 0, '2026-05-09 16:45:14', '2026-05-09 16:45:59'),
(96, 96, 251, 35, NULL, 'ZAAD', '14748115327', 'uploads/payments/pay_69ff696422542_1778346340.jpg', 1.00, 'approved', '', 0, '2026-05-09 17:05:40', '2026-05-10 12:05:56'),
(97, 97, 249, 66, NULL, 'ZAAD', '14752262238', 'uploads/payments/pay_6a002dc65c699_1778396614.jpg', 4.00, 'approved', '', 0, '2026-05-10 07:03:34', '2026-05-10 07:04:36'),
(98, 98, 254, 66, NULL, 'ZAAD', '14758780592', 'uploads/payments/pay_6a00f4f327a97_1778447603.jpg', 4.00, 'approved', '', 0, '2026-05-10 21:13:23', '2026-05-10 21:15:23'),
(99, 99, 259, 50, NULL, 'E-Dahab', 'Pp260512', 'uploads/payments/pay_6a02de628fa30_1778572898.jpg', 2.00, 'rejected', '', 0, '2026-05-12 08:01:38', '2026-05-12 19:30:32'),
(100, 100, 260, 50, NULL, 'ZAAD', 'saa123BIR?', 'uploads/payments/pay_6a03836ed220a_1778615150.jpg', 2.00, 'approved', '', 0, '2026-05-12 19:45:50', '2026-05-12 19:46:05'),
(101, 101, 267, 66, NULL, 'Hormuud', '617194136', 'uploads/payments/pay_6a0448f248555_1778665714.jpg', 4.00, 'approved', '', 0, '2026-05-13 09:48:34', '2026-05-13 09:52:10'),
(102, 102, 260, 66, NULL, 'ZAAD', 'saa123BIR?', 'uploads/payments/pay_6a04a8127de66_1778690066.jpg', 3.00, 'approved', '', 0, '2026-05-13 16:34:26', '2026-05-13 16:35:06'),
(103, 103, 259, 50, NULL, 'E-Dahab', 'pp260512', 'uploads/payments/pay_6a058516d8a36_1778746646.jpg', 2.00, 'approved', '', 0, '2026-05-14 08:17:26', '2026-05-14 08:19:00'),
(104, 104, 263, 66, NULL, 'Hormuud', 'R38587359418', 'uploads/payments/pay_6a0726b09a859_1778853552.png', 3.00, 'approved', '', 0, '2026-05-15 13:59:12', '2026-05-15 16:04:43'),
(105, 105, 263, 52, NULL, 'Hormuud', 'R38587359418', 'uploads/payments/pay_6a072845c63e6_1778853957.png', 2.00, 'approved', '', 0, '2026-05-15 14:05:57', '2026-05-15 16:04:38'),
(106, 106, 263, 36, NULL, 'Hormuud', 'R38 587 359 418', 'uploads/payments/pay_6a0758b886749_1778866360.jpeg', 1.00, 'approved', '', 0, '2026-05-15 17:32:40', '2026-05-15 19:47:42'),
(107, 107, 263, 35, NULL, 'Hormuud', 'R38 587 359 418', 'uploads/payments/pay_6a0759002f434_1778866432.jpeg', 2.00, 'approved', '', 0, '2026-05-15 17:33:52', '2026-05-15 18:58:32'),
(108, 108, 263, 49, NULL, 'Hormuud', 'R38 587 359 418', 'uploads/payments/pay_6a07596477bd5_1778866532.jpeg', 1.00, 'approved', '', 0, '2026-05-15 17:35:32', '2026-05-15 19:47:38'),
(109, 109, 277, 35, NULL, 'ZAAD', '14817835448', 'uploads/payments/pay_6a0ad55482f86_1779094868.jpg', 2.00, 'approved', '', 0, '2026-05-18 09:01:08', '2026-05-18 13:16:48'),
(110, 110, 277, 36, NULL, 'ZAAD', '14817871186', 'uploads/payments/pay_6a0ad63509f45_1779095093.jpg', 1.00, 'approved', '', 0, '2026-05-18 09:04:53', '2026-05-18 13:16:44'),
(111, 111, 281, 46, NULL, 'Hormuud', '0616498687', 'uploads/payments/pay_6a0eccdfcf9d3_1779354847.jpg', 1.00, 'rejected', '', 0, '2026-05-21 09:14:07', '2026-05-23 18:32:35'),
(112, 112, 266, 42, NULL, 'ZAAD', '14843463387', 'uploads/payments/pay_6a0f175491889_1779373908.jpg', 1.00, 'approved', '', 0, '2026-05-21 14:31:48', '2026-05-21 14:44:22'),
(113, 113, 287, 66, NULL, 'Hormuud', 'Ff', 'uploads/payments/pay_6a104c45ee07a_1779452997.jpg', 3.00, 'rejected', '', 0, '2026-05-22 12:29:57', '2026-05-23 18:32:28'),
(114, 114, 307, 66, NULL, 'ZAAD', '3', 'uploads/payments/pay_6a149b3f42061_1779735359.jpg', 3.00, 'rejected', '', 0, '2026-05-25 18:55:59', '2026-05-27 13:05:41'),
(115, 115, 309, NULL, 12, '', '6536060', 'uploads/payments/pay_6a14b92ff3937_1779743023.jpg', 1.00, 'rejected', '', 0, '2026-05-25 21:03:43', '2026-05-27 13:05:29'),
(116, 116, 308, 66, NULL, 'ZAAD', '11111111111111111', 'uploads/payments/pay_6a14c92929c59_1779747113.jpg', 3.00, 'approved', '', 0, '2026-05-25 22:11:53', '2026-05-25 22:12:14'),
(117, 117, 321, 66, NULL, 'ZAAD', '0634251032', 'uploads/payments/pay_6a1b3225e8093_1780167205.jpeg', 3.00, 'approved', '', 0, '2026-05-30 18:53:25', '2026-05-30 18:54:16'),
(118, 118, 245, 54, NULL, 'E-Dahab', '2', 'uploads/payments/pay_6a1de7539808c_1780344659.jpg', 2.00, 'approved', '', 0, '2026-06-01 20:10:59', '2026-06-01 22:46:39'),
(119, 119, 333, 46, NULL, 'ZAAD', '14978056303', 'uploads/payments/pay_6a2436987ff0e_1780758168.jpg', 1.00, 'rejected', '', 0, '2026-06-06 15:02:48', '2026-06-07 20:29:42'),
(120, 120, 331, 46, NULL, 'ZAAD', '14978056303', 'uploads/payments/pay_6a2443a07eff8_1780761504.jpg', 1.00, 'approved', '', 0, '2026-06-06 15:58:24', '2026-06-06 16:19:02'),
(121, 121, 334, 54, NULL, 'ZAAD', '0637255162', 'uploads/payments/pay_6a25cae866317_1780861672.jpeg', 2.00, 'approved', '', 0, '2026-06-07 19:47:52', '2026-06-07 20:29:36'),
(122, 122, 336, 45, NULL, 'Hormuud', '617232121', 'uploads/payments/pay_6a26d37688f77_1780929398.jpg', 1.00, 'approved', '', 0, '2026-06-08 14:36:38', '2026-06-08 14:36:56'),
(123, 123, 352, 44, NULL, 'Hormuud', '55', 'uploads/payments/pay_6a3638e4ccb35_1781938404.jpeg', 1.00, 'approved', '', 0, '2026-06-20 06:53:24', '2026-06-20 06:54:42'),
(124, 124, 277, 66, NULL, 'ZAAD', '15095135752', 'uploads/payments/pay_6a377ecfdc44e_1782021839.jpg', 3.00, 'approved', '', 0, '2026-06-21 06:03:59', '2026-06-21 06:04:17'),
(125, 125, 354, 42, NULL, 'Hormuud', '615219456', 'uploads/payments/pay_6a37e82bcf541_1782048811.jpg', 1.00, 'approved', '', 0, '2026-06-21 13:33:31', '2026-06-21 13:34:14'),
(126, 126, 99, 44, NULL, 'ZAAD', '15111320622', 'uploads/payments/pay_6a3a312194a35_1782198561.jpg', 1.00, 'approved', '', 0, '2026-06-23 07:09:21', '2026-06-23 12:38:02'),
(127, 127, 361, 66, NULL, 'ZAAD', '15117752027', 'uploads/payments/pay_6a3b0cd5033f9_1782254805.jpg', 3.00, 'approved', '', 0, '2026-06-23 22:46:45', '2026-06-23 22:47:02'),
(128, 128, 366, 44, NULL, 'ZAAD', '0637151167', 'uploads/payments/pay_6a3c4b19d3f3b_1782336281.jpg', 1.00, 'approved', '', 0, '2026-06-24 21:24:41', '2026-06-24 21:25:25'),
(129, 129, 377, 66, NULL, 'Waafi', '1', 'uploads/payments/pay_6a423ed14470c_1782726353.jpg', 3.00, 'approved', '', 0, '2026-06-29 09:45:53', '2026-06-29 09:47:20'),
(130, 130, 394, 42, NULL, 'ZAAD', '0634885167', 'uploads/payments/pay_6a4f075311c6f_1783564115.png', 1.00, 'approved', '', 0, '2026-07-09 02:28:35', '2026-07-09 09:54:43'),
(131, 131, 394, 50, NULL, 'ZAAD', '4885167', 'uploads/payments/pay_6a4f08f6ed2bc_1783564534.png', 2.00, 'approved', '', 0, '2026-07-09 02:35:34', '2026-07-09 09:54:55'),
(132, 132, 394, 49, NULL, 'ZAAD', '4885167', 'uploads/payments/pay_6a4f09db1cedf_1783564763.png', 1.00, 'approved', '', 0, '2026-07-09 02:39:23', '2026-07-09 09:54:51'),
(133, 133, 99, 66, NULL, 'ZAAD', '15284707320', 'uploads/payments/pay_6a57446daf4ba_1784104045.jpg', 3.00, 'approved', '', 0, '2026-07-15 08:27:25', '2026-07-15 10:45:11'),
(134, 134, 414, 42, NULL, 'Hormuud', '0771602414', 'uploads/payments/pay_6a5b2bb333bde_1784359859.jpg', 1.00, 'approved', '', 0, '2026-07-18 07:30:59', '2026-07-18 07:51:28'),
(135, 135, 386, 35, NULL, 'Hormuud', '8GPGPU3VWK', 'uploads/payments/pay_6a5c3f618847b_1784430433.png', 2.00, 'approved', '', 0, '2026-07-19 03:07:13', '2026-07-19 03:38:14'),
(136, 136, 413, 42, NULL, 'Hormuud', '0771602414', 'uploads/payments/pay_6a5c618edc087_1784439182.jpg', 1.00, 'approved', '', 0, '2026-07-19 05:33:02', '2026-07-19 05:34:18'),
(137, 137, 386, 36, NULL, 'Hormuud', '4FT9Z3969', 'uploads/payments/pay_6a5c64cb92681_1784440011.png', 1.00, 'approved', '', 0, '2026-07-19 05:46:51', '2026-07-19 07:56:11'),
(138, 138, 386, 42, NULL, 'Hormuud', '4FT9Z3A969', 'uploads/payments/pay_6a5c659754882_1784440215.png', 1.00, 'approved', '', 0, '2026-07-19 05:50:15', '2026-07-19 07:56:19');
INSERT INTO "reading_progress" ("id", "user_id", "book_id", "chapter_index", "scroll_position", "time_spent", "completed", "last_read", "created_at") VALUES
(1, 3, 54, 11, 0, 724, 0, '2026-04-10 23:03:07', '2026-02-01 20:40:59'),
(2, 47, 42, 20, 0, 7949, 0, '2026-03-20 07:13:37', '2026-02-02 05:04:32'),
(4, 97, 38, 0, 0, 367, 0, '2026-02-02 17:10:45', '2026-02-02 17:03:21'),
(5, 97, 47, 1, 0, 52, 0, '2026-02-02 17:12:12', '2026-02-02 17:11:17'),
(7, 99, 37, 0, 0, 47394, 0, '2026-03-20 20:31:35', '2026-02-03 12:35:52'),
(9, 102, 38, 4, 0, 272, 0, '2026-02-03 23:00:33', '2026-02-03 22:15:22'),
(10, 102, 31, 0, 0, 35, 0, '2026-02-03 22:19:12', '2026-02-03 22:18:59'),
(11, 3, 49, 3, 0, 263, 0, '2026-02-05 18:31:34', '2026-02-05 18:28:59'),
(12, 104, 38, 2, 0, 41, 0, '2026-02-05 20:48:09', '2026-02-05 20:47:37'),
(14, 36, 42, 4, 0, 683, 0, '2026-03-03 16:50:05', '2026-02-07 19:02:21'),
(15, 3, 50, 4, 0, 2161, 0, '2026-04-11 00:30:04', '2026-02-08 06:28:01'),
(17, 63, 42, 0, 0, 1, 0, '2026-02-09 07:21:57', '2026-02-09 07:21:57'),
(19, 111, 31, 0, 0, 0, 0, '2026-02-10 14:15:14', '2026-02-10 14:15:14'),
(21, 113, 47, 6, 0, 57, 0, '2026-02-10 21:14:29', '2026-02-10 21:13:31'),
(23, 123, 42, 4, 0, 127, 0, '2026-02-16 16:47:28', '2026-02-16 16:40:33'),
(25, 125, 47, 0, 0, 7, 0, '2026-02-17 11:09:07', '2026-02-17 11:08:57'),
(26, 127, 31, 2, 0, 36, 0, '2026-02-17 17:09:02', '2026-02-17 17:08:26'),
(27, 126, 37, 6, 0, 3223, 0, '2026-02-18 06:36:56', '2026-02-17 17:18:39'),
(28, 18, 44, 5, 0, 24, 0, '2026-02-17 20:15:01', '2026-02-17 20:15:01'),
(29, 130, 35, 0, 0, 335, 0, '2026-02-18 08:55:28', '2026-02-18 08:50:11'),
(31, 132, 38, 4, 0, 592, 0, '2026-02-18 14:30:10', '2026-02-18 14:20:05'),
(32, 132, 31, 1, 0, 1103, 0, '2026-02-18 14:53:12', '2026-02-18 14:33:25'),
(33, 133, 36, 6, 0, 1539, 0, '2026-02-18 18:48:29', '2026-02-18 18:18:56'),
(34, 136, 54, 9, 0, 6121, 0, '2026-02-25 13:33:09', '2026-02-20 09:55:02'),
(35, 136, 50, 10, 0, 1912, 0, '2026-02-28 13:04:13', '2026-02-20 12:40:22'),
(36, 136, 51, 0, 0, 335, 0, '2026-02-20 12:58:43', '2026-02-20 12:53:07'),
(37, 136, 45, 9, 0, 292, 0, '2026-02-20 14:33:08', '2026-02-20 14:28:22'),
(38, 136, 36, 5, 0, 334, 0, '2026-02-25 13:28:37', '2026-02-20 20:26:35'),
(39, 140, 50, 3, 0, 128, 0, '2026-03-04 21:16:15', '2026-02-21 20:54:03'),
(40, 142, 38, 0, 0, 12, 0, '2026-02-22 04:22:26', '2026-02-22 04:22:26'),
(41, 83, 44, 4, 0, 403, 0, '2026-02-25 07:44:13', '2026-02-22 08:41:20'),
(43, 147, 38, 0, 0, 255, 0, '2026-02-24 10:07:08', '2026-02-24 10:03:09'),
(45, 151, 42, 7, 0, 2435, 0, '2026-03-09 14:35:42', '2026-02-24 18:36:16'),
(46, 136, 46, 6, 0, 103, 0, '2026-02-25 13:43:34', '2026-02-25 13:41:54'),
(47, 152, 49, 11, 0, 1729, 0, '2026-02-26 11:56:21', '2026-02-26 07:52:43'),
(48, 152, 42, 8, 0, 2639, 0, '2026-03-17 11:03:29', '2026-02-26 08:37:09'),
(50, 155, 42, 8, 0, 11568, 0, '2026-03-10 06:01:51', '2026-03-02 08:26:34'),
(52, 160, 31, 0, 0, 10, 0, '2026-03-04 03:18:10', '2026-03-04 03:18:04'),
(53, 161, 38, 4, 0, 73, 0, '2026-03-04 23:17:31', '2026-03-04 23:16:11'),
(54, 164, 35, 4, 0, 771, 0, '2026-03-12 16:03:33', '2026-03-06 08:55:40'),
(55, 167, 42, 38, 0, 472046, 0, '2026-03-15 01:08:16', '2026-03-06 14:07:37'),
(56, 3, 43, 10, 0, 1853, 0, '2026-04-11 03:10:02', '2026-03-06 19:26:18'),
(57, 3, 42, 1, 0, 20678, 0, '2026-04-10 23:16:05', '2026-03-06 19:41:42'),
(59, 173, 43, 3, 0, 96, 0, '2026-03-10 14:08:11', '2026-03-10 13:51:34'),
(61, 171, 31, 2, 0, 71, 0, '2026-03-13 05:50:24', '2026-03-13 05:49:08'),
(62, 171, 50, 4, 0, 814, 0, '2026-03-13 11:18:48', '2026-03-13 06:26:16'),
(63, 176, 35, 5, 0, 18933, 0, '2026-03-15 14:16:55', '2026-03-15 08:48:50'),
(64, 176, 42, 13, 0, 386849, 0, '2026-03-21 05:07:01', '2026-03-15 14:20:04'),
(66, 176, 52, 8, 0, 1445, 0, '2026-03-24 05:06:34', '2026-03-17 14:07:41'),
(67, 47, 31, 3, 0, 2051, 0, '2026-03-20 09:53:47', '2026-03-20 07:18:46'),
(68, 3, 46, 1, 0, 225, 0, '2026-04-10 22:59:26', '2026-03-20 23:04:32'),
(69, 3, 47, 4, 0, 213, 0, '2026-04-11 02:38:03', '2026-03-20 23:11:39'),
(71, 181, 31, 2, 0, 484, 0, '2026-03-22 22:11:27', '2026-03-22 22:03:25'),
(72, 182, 38, 0, 0, 4, 0, '2026-03-24 10:20:12', '2026-03-24 10:20:01'),
(74, 185, 35, 3, 0, 390, 0, '2026-03-26 04:04:06', '2026-03-25 15:45:44'),
(75, 186, 31, 0, 0, 45, 0, '2026-03-27 17:37:20', '2026-03-27 17:37:00'),
(76, 3, 52, 0, 0, 1, 0, '2026-04-10 23:03:20', '2026-04-10 23:03:20'),
(77, 3, 37, 2, 0, 34, 0, '2026-04-10 23:04:26', '2026-04-10 23:03:26'),
(78, 3, 51, 3, 0, 1280, 0, '2026-04-11 01:07:00', '2026-04-10 23:16:15'),
(79, 3, 31, 0, 0, 17, 0, '2026-04-11 00:33:10', '2026-04-11 00:33:09');
INSERT INTO "site_settings" ("id", "setting_key", "setting_value", "created_at", "updated_at") VALUES
(1, 'site_name', 'IsmailBooks', '2025-11-02 15:24:45', '2025-11-02 15:24:45'),
(2, 'site_description', '', '2025-11-02 15:24:45', '2025-11-02 15:24:45'),
(3, 'contact_email', 'ismailawalabdi12@gmail.com', '2025-11-02 15:24:45', '2025-11-02 15:24:45'),
(4, 'contact_phone', '0636475579', '2025-11-02 15:24:45', '2025-11-02 15:24:45'),
(5, 'session_timeout', '1', '2025-11-02 15:37:08', '2025-11-02 15:37:08'),
(6, 'max_login_attempts', '5', '2025-11-02 15:37:08', '2025-11-02 15:37:08'),
(7, 'lockout_duration', '8', '2025-11-02 15:37:08', '2025-11-02 15:37:08'),
(18, 'maintenance_mode', '0', '2026-04-11 13:45:56', '2026-04-11 13:45:56'),
(19, 'maintenance_message', 'waa laga shaqaynaya ee sug', '2026-04-11 13:45:56', '2026-04-11 13:45:56');
INSERT INTO "summaries" ("id", "title", "book_title", "book_author", "summary_creator", "description", "content_html", "is_paid", "price", "pages", "file_size", "cover_image", "views", "created_at", "updated_at") VALUES
(11, 'Atomic habits khulaso iyo fududeyn', 'Atomic habits', 'james clear', 'ismail abdi ismail', 'Buuggan waa mid ka mid ah buugaagta ugu fiican ee lagu barto horumarinta nafta iyo dhisidda caadooyinka wanaagsan. 
Waxa ku jira buuggan casharro aad u fudud kuwaasoo kaa caawinaya inaad dhisto caadooyin wax kuu taraya, kuwii horena aad ka takhalusto oo aad gabi ahaanba meesha ka saarto.
Buuggan waxa aan ku soo koobi doonaa cutubyada ku jira buugga “ATOMIC HABITS”, iyadoo aan u qoray si yar oo fudud oo aanad ku caajiseyn akhrintiisa. Uma baahnid inaad buugga weyn akhrido.', '<h1>Atomic habits khulaso iyo fududeyn</h1><p><strong>Original Book:</strong> Atomic habits</p><p><strong>Book Author:</strong> james clear</p><p><strong>Summary Creator:</strong> ismail abdi ismail</p><p><strong>Description:</strong> Buuggan waa mid ka mid ah buugaagta ugu fiican ee lagu barto horumarinta nafta iyo dhisidda caadooyinka wanaagsan. 
Waxa ku jira buuggan casharro aad u fudud kuwaasoo kaa caawinaya inaad dhisto caadooyin wax kuu taraya, kuwii horena aad ka takhalusto oo aad gabi ahaanba meesha ka saarto.
Buuggan waxa aan ku soo koobi doonaa cutubyada ku jira buugga “ATOMIC HABITS”, iyadoo aan u qoray si yar oo fudud oo aanad ku caajiseyn akhrintiisa. Uma baahnid inaad buugga weyn akhrido.</p><h2>Table of Contents</h2><ul></ul>', 0, NULL, 140, 39976, 'summary_cover_1763569794_cb3ee8da.webp', 0, '2025-11-19 13:39:02', '2025-11-19 16:29:54'),
(12, '48 xeer ee awooda', '48 law of power', 'robert Greene', 'ismail abdi ismail', 'Buugan la baxay 48-ka xeer ee awooda wuxuu sharaxayaa oo uu qeexaya sida ay awoodu u shaqayso iyo sidii ay dadku awood u heli lahaayeen , una sii haysan lahaayeen awoodaas.

waa buugii oo si fiican loo soo koobay , lana habeyay . waan hubaa waad ku raaxeysan doontaa .', '<h1>48 xeer ee awooda</h1><p><strong>Original Book:</strong> 48 law of power</p><p><strong>Book Author:</strong> robert Greene</p><p><strong>Summary Creator:</strong> ismail abdi ismail</p><p><strong>Description:</strong> Buugan la baxay 48-ka xeer ee awooda wuxuu sharaxayaa oo uu qeexaya sida ay awoodu u shaqayso iyo sidii ay dadku awood u heli lahaayeen , una sii haysan lahaayeen awoodaas.

waa buugii oo si fiican loo soo koobay , lana habeyay . waan hubaa waad ku raaxeysan doontaa .</p><h2>Table of Contents</h2><ul></ul>', 1, 1.00, 100, 28656, 'summary_cover_1763571823_db76ce63_1779981759.webp', 0, '2025-11-19 17:03:43', '2026-05-28 15:22:39');
INSERT INTO "users" ("user_id", "username", "email", "password_hash", "phone_number", "registration_date", "last_login", "account_status", "profile_complete", "total_reading_time", "books_completed", "current_streak", "longest_streak", "last_reading_date") VALUES
(3, 'ismail abdi ismail', 'ismailawalabdi12@gmail.com', '$2y$10$qQBFA4t3FT2bV94Asr/MNusCGP0qAvkoavZDb00d0qRCJbtFTbZJC', '', '2025-11-10 21:04:08', '2026-07-09 00:23:49', 'active', 0, 0, 0, 0, 0, NULL),
(5, 'Suhayb faarax', 'suhaybfaarah94@gmail.com', '$2y$10$VQSKXcsXfIBpjruv7uRzMeYezfK.F57IywsQhS3QCg6i.gjXADqNq', '', '2025-11-14 14:09:40', '2026-02-03 19:37:21', 'active', 0, 0, 0, 0, 0, NULL),
(8, 'Abka', 'Kheyriaahmedabdi@gmail.com', '$2y$10$w7zK9d34sdUjf4F5j3oWQufalhyTF8/2rCt/OKRXFgMxAm4R0lfqm', '', '2025-11-21 11:00:15', '2025-11-21 11:00:35', 'active', 0, 0, 0, 0, 0, NULL),
(9, 'NasraAbdirazak Botan', 'Nasiib9@hotmail.com', '$2y$10$dpTewll0oIaVOjV0EQr/XOfJyrXS27QugGiVDvkFejPzjfZ0qvZdK', '', '2025-11-21 15:13:56', '2025-11-21 15:14:51', 'active', 0, 0, 0, 0, 0, NULL),
(10, 'Yahye Yousuf', 'yahyeyusuf803@gmail.com', '$2y$10$O15FsnAFAXBl5fOGR8Dx/exjhqQcc.i2V5Z5qGdvGTYUozLL6wHLa', '', '2025-11-21 18:13:17', '2026-05-03 14:35:01', 'active', 0, 0, 0, 0, 0, NULL),
(11, 'Asma caano barax', 'asoomabashir8@gmail.com', '$2y$10$0O892AtNIK3O6xb/t0Det.sygG7KyOMAFWjVfVq7rMyNOklBcsuSu', '', '2025-11-21 19:25:46', '2026-01-03 18:53:23', 'active', 0, 0, 0, 0, 0, NULL),
(12, 'Abdilahi Omer', 'abdilahiomer555@gmail.com', '$2y$10$lLEsyDrM.K08mxo8EwQ02.xBESUsB/WK3d6edAKUjYCG7FhpgddAa', '', '2025-11-21 20:54:45', '2025-11-21 20:54:53', 'active', 0, 0, 0, 0, 0, NULL),
(13, 'Iqro maxamed', 'iqrokaboilan@gmail.com', '$2y$10$sFPMQoYalpBfOGXVoBR2nueVnj4r4jCt6XloKMi0SXke21thwk.UG', '', '2025-11-23 13:32:20', '2025-11-23 13:32:36', 'active', 0, 0, 0, 0, 0, NULL),
(14, 'HAMZA ABDIRIZAK MOHAMUD', 'hamzegelqaad@gmail.com', '$2y$10$icVBfvmMLAgBh7Ewol25uuZ2I9Fro/HsVuAFQey7sqfg1DCojA.cu', '', '2025-11-23 17:28:07', '2025-11-23 17:28:24', 'active', 0, 0, 0, 0, 0, NULL),
(15, 'abdi nasir farhaan abdulle', 'apdinasirfarhaanabdule@gmail.com', '$2y$10$Dns1POh6zCinQUHGKaG7eeL8W99ydJIoRI8eyMnAT9JtgTkoAodf6', '', '2025-11-24 06:01:04', '2025-11-24 06:01:44', 'active', 0, 0, 0, 0, 0, NULL),
(16, 'Samiya Saeed Farah', 'saamiyabasha@hotmail.com', '$2y$10$DSfaUw7Zy8exT0.MKQe3J.XOiLLxLxHOihINOYsaEPe4ccc0gUhd6', '', '2025-11-24 19:27:44', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(17, 'Amina adan', 'bahjaadan54@gamil.com', '$2y$10$IfbSdiZANH/gLwTCR1x8GOalOku4NwDOBH1f2IWU5hye3b5WQsA5u', '', '2025-11-25 10:01:09', '2025-12-30 18:29:20', 'active', 0, 0, 0, 0, 0, NULL),
(18, 'Amiira Maxamed', 'Maxamedamiira336@Gmail.com', '$2y$10$2PYUWcczHnIkUBqSdySFLeFClemnNtQiLXmrv6Uwti/EM/YLFsR8i', '', '2025-11-29 14:52:23', '2026-07-10 09:55:56', 'active', 0, 0, 0, 0, 0, NULL),
(19, 'Yusuf maxamed bare', 'yufaaboy@gmail.com', '$2y$10$.cq26tI7dcaIA1siV8Pi1.GW/IZj7yahVq61m5lysJLiJPbGcuHP2', '', '2025-12-02 10:42:29', '2026-03-03 10:51:53', 'active', 0, 0, 0, 0, 0, NULL),
(20, 'Hamse', 'hamsemahamudhusen@gmail.com', '$2y$10$vUt.m/NdF/EiLxZSdwdaPOWXjf708veCtiFSP8KeZ01GujkWxlMDm', '', '2025-12-02 14:12:19', '2025-12-02 14:13:31', 'active', 0, 0, 0, 0, 0, NULL),
(21, 'Mohmed yusu', 'mohmedjosph9@gmal.com', '$2y$10$iPawIZGlTaX4YvKG.RtyreEMVsNgcdQP1xpsSFBmvM.b0K4dnw5B6', '', '2025-12-03 14:37:33', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(22, 'Abdinajib', 'princenaja321@gmail.com', '$2y$10$seSTVT5J35gkoztnvYe.JeAYuin1som1HDWdZdsLqkrLiKnrsf7Lq', '', '2025-12-03 16:36:42', '2025-12-03 16:36:58', 'active', 0, 0, 0, 0, 0, NULL),
(23, 'Zack', 'yowga@gmail.com', '$2y$10$p27EHbq9fYDKiAh03Bg4FOGMYz3zZwfF3M8nQdrgSy2IbZqXv2IfS', '', '2025-12-03 20:03:00', '2025-12-03 20:03:13', 'active', 0, 0, 0, 0, 0, NULL),
(24, 'Muascab c/llaahi', 'muscabmuscab42@gmail.come', '$2y$10$.jDL7pPMPIeC/LalaaxJeuzxG.l.6rKmnpMOiGRs/Oy0jDqhtYxGm', '', '2025-12-03 20:45:16', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(25, 'Cabdiraxmaan khadar', 'khadargurey12@gmail.com', '$2y$10$QEIAWrwbAYDby4U3bO8DmucJRwZEWAwmOa03jiALyh0usU7ZM.kqq', '', '2025-12-03 21:09:31', '2025-12-03 21:09:46', 'active', 0, 0, 0, 0, 0, NULL),
(26, 'Nasir mahdi', 'maahirmahdi788@gmail.com', '$2y$10$Xu728sVgLTRYuJ6FVq/nyufrK2P0wqpbmmVmirNxyRkKfV47vhX3C', '', '2025-12-03 21:55:12', '2025-12-03 21:55:27', 'active', 0, 0, 0, 0, 0, NULL),
(27, 'Umalkhayr cabdi ciise', 'sakiciise28@gmail.com', '$2y$10$D9T5eEe6TaRCQd6GQliIleU4nDbFY86bzicXgezGE2QX5VH37kkvm', '', '2025-12-04 06:45:19', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(28, 'Mohamed ahmed', 'maxamedaxmedamuureye@gmail.com', '$2y$10$BqEYgCkYUwP3YNdw/GJLQ.vNRCUvEo0w/BwuQzwuY3xihx/FlpDYC', '', '2025-12-04 09:20:16', '2025-12-04 09:20:33', 'active', 0, 0, 0, 0, 0, NULL),
(29, 'IBRAAHIM XASAN CABDULE', 'xirsixaawo85@gmail.com', '$2y$10$dkf1Ce9wse3Rh2AqlQFYI./THxA.z525KkOHVfLA2bxmxBUa8m4He', '', '2025-12-04 18:14:19', '2025-12-04 18:14:26', 'active', 0, 0, 0, 0, 0, NULL),
(30, 'galad moh', 'galadmoh763@gmail.com', '$2y$10$yue.tegWNwhrwNo.la8on.1yL6Q26ufw.JmS8QAb3QQ2lNhjPYlcW', '', '2025-12-11 08:47:45', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(31, 'Romeo', 'ramadanh2g30@gmail.com', '$2y$10$.xBa4gwGvmNaVurhryCV/eS74LHrFH8J2pDc0PmWTwT7Chakw6E/6', '', '2025-12-11 18:25:36', '2025-12-11 18:25:49', 'active', 0, 0, 0, 0, 0, NULL),
(32, 'Ruwayda cabdiraxmaan Hirsi', 'ruwaydaabdirahmaan@gmail.com', '$2y$10$FYOfQAZ6VWaclQ14oOVtCe97/D9Top/ApbY8zTcYba20Wng5Vcgnu', '', '2025-12-12 15:37:40', '2025-12-12 15:37:57', 'active', 0, 0, 0, 0, 0, NULL),
(33, 'Cabdinaasir cali xuseen', 'cabdinaasircabdinaasir760@gmail.com0686131762', '$2y$10$PvhBUSa9hJGDc8zdM3FZxu2lDDSGjjZwIpd0ziWPrgOo94cUBesh.', '', '2025-12-15 10:32:48', '2025-12-15 10:33:05', 'active', 0, 0, 0, 0, 0, NULL),
(34, 'Said cumar', 'saidcumar157@gmail.com', '$2y$10$H4R5m6ZGWahnROo/on6KU.bSgm.yu0nDp8Q.B4tFRR/hJY35kKB5q', '', '2025-12-15 18:57:21', '2025-12-15 18:57:56', 'active', 0, 0, 0, 0, 0, NULL),
(35, 'ASHRAF maxamed', 'inaxaawo9775@gmail.com', '$2y$10$joX5gjWqzJU2bf6WIoUlteLKMqqkfnbZyiPoxmHalouShNdPX5gN2', '', '2025-12-15 20:56:41', '2025-12-15 20:56:56', 'active', 0, 0, 0, 0, 0, NULL),
(36, 'Mohamed', 'm.dhadheere77@gmail.com', '$2y$10$PjfsVgDWVGShh.uunTYM1.8647WbWKfwP3MEFOp4MrgByBf/8zjh.', '', '2025-12-16 19:56:33', '2026-03-03 16:50:05', 'active', 0, 0, 0, 0, 0, NULL),
(37, 'Haaris', 'Captainlii32@gmail.com', '$2y$10$S.wISP9CGg2qyH6xn9zCGOhKCa8mM14xtArzilo6brbTv9xo8QtCW', '', '2025-12-16 21:56:13', '2025-12-16 21:56:28', 'active', 0, 0, 0, 0, 0, NULL),
(38, 'Ahmed', 'iamaxmedd@gmail.com', '$2y$10$0etrXNgMUvFUHzH2rpte4ee/0mrxB24JRyUGQICuLsRt3A8uGFF4G', '', '2025-12-18 18:37:37', '2026-01-27 10:54:40', 'active', 0, 0, 0, 0, 0, NULL),
(39, 'Muxiyodiin maxamed ismacil', 'muxiyodiin158@gmail.com', '$2y$10$KDMNLFFVzoim6Q.uQqecLeLVCXotMzwuvZ7kmv.1xU4EyoBzMddp.', '', '2025-12-18 22:17:50', '2026-05-08 21:48:14', 'active', 0, 0, 0, 0, 0, NULL),
(40, 'Axmad qadar', 'axmad5296@gmail.com', '$2y$10$.ZjUvrcBRUTVVpkbnIwZX.PDdkPIGJ0B19SLfS.qV4xb7EU5S1plq', '', '2025-12-20 03:27:03', '2025-12-20 03:46:28', 'active', 0, 0, 0, 0, 0, NULL),
(41, 'Yusuf adan', 'yusufadan120@gmail.com', '$2y$10$I/oyiYxT8mO7.0PoHvBkyu1tGN9CqIkyKiX3CiYpnlzl0d8xyTVri', '', '2025-12-20 05:21:14', '2025-12-20 05:21:37', 'active', 0, 0, 0, 0, 0, NULL),
(42, 'Iqra Ismacil', 'iqraismail04@gmqil.com', '$2y$10$wxMEyLw/SK3hqxv6rn9sauRZbuwgxLgkNNx5HVQvU8hDfEpL0.Pxi', '', '2025-12-20 09:15:59', '2025-12-20 09:16:13', 'active', 0, 0, 0, 0, 0, NULL),
(43, 'SADAK MO', 'carrickyare16@gmail.com', '$2y$10$eIVWue4Xve35E8IMvNZ5auC.Q4oQ7NAtJ2c3GXr0R2fQh6W7Iav4a', '', '2025-12-21 06:11:28', '2025-12-21 06:11:52', 'active', 0, 0, 0, 0, 0, NULL),
(44, 'Anas Daahir', 'daahiranas72@gmail.com', '$2y$10$XZVxKEIHrfSYvMLDpJl1AOSk3Mg23aMG3JELd/4KiwxLMgni7O1QS', '', '2025-12-22 13:47:32', '2025-12-22 13:47:55', 'active', 0, 0, 0, 0, 0, NULL),
(45, 'Muscab ahmed', 'muscapgot@gmail.com', '$2y$10$8QZYfVko8wJO0yzLoRlbBOo8e5ON11jHxucnkPyw/oLX50z9dvIlO', '', '2025-12-22 18:25:38', '2025-12-22 18:26:06', 'active', 0, 0, 0, 0, 0, NULL),
(46, 'Abdullahi', 'cabdilaahixayi@gmail.com', '$2y$10$mbc.gF6NY62DRf6jTJKto.bYHr0j18ANSLvwIg12g2XK3NlDYw87y', '', '2025-12-23 08:39:42', '2025-12-23 08:40:26', 'active', 0, 0, 0, 0, 0, NULL),
(47, 'Ahmed Ali Ahmed', 'axmeb252@gmail.com', '$2y$10$M5O3xq/CtCd71aD2CTCfcOTHIwrReInVIsEmydz1eZ3kOv109qwia', '', '2025-12-23 09:59:19', '2026-07-17 03:54:42', 'active', 0, 0, 0, 0, 0, NULL),
(48, 'Nimco CAli Xirsi', 'calixirsinimco@gmail.com', '$2y$10$olWF6pV4Urve9rpZndHhy.P1R7/oxWhRs0mtiOzSghdBhrd/2qQne', '', '2025-12-23 11:04:15', '2025-12-23 11:05:09', 'active', 0, 0, 0, 0, 0, NULL),
(49, 'Zuka Galaad', 'zukagalad@gmail.com', '$2y$10$2p3WOtxRCdi2iuqvhG.aFeB2Qu0pMCL0q5munsYCL.tiJ6h6p5ub2', '', '2025-12-23 16:39:54', '2026-05-09 12:53:08', 'active', 0, 0, 0, 0, 0, NULL),
(50, 'Yaxye cabdinaasir faarax', 'yaxyeheena905@gmail.com', '$2y$10$GSfOYvc16R0bvdq.wE4VUer8DwnmwBybSJ0rqBOemR2wH1X1WPfD6', '', '2025-12-24 19:41:50', '2026-06-28 06:31:28', 'active', 0, 0, 0, 0, 0, NULL),
(51, 'shafici', 'maxamedshaafici144@gmail.com', '$2y$10$6t6VDnAguokTC9maQ4eV5ej4t07CV5bpydE8UCBVl0p3Lk3vUD.LW', '', '2025-12-25 13:54:57', '2025-12-25 13:55:09', 'active', 0, 0, 0, 0, 0, NULL),
(52, 'Farxaan', 'cali6852@gmail.com', '$2y$10$VpPJhMLqxYKcB24juyG3Gucs64m5cQo00ZfTIkfpUasWE981dfNQS', '', '2025-12-26 04:33:14', '2025-12-26 04:34:07', 'active', 0, 0, 0, 0, 0, NULL),
(53, 'Mumtaas', 'mumtaazaxmed66@gmail.com', '$2y$10$7JQ8R2pWNMh2ghR9ngwQi.MBO52spaeMQWL0Pdgx5BhtIrbiYYvkG', '', '2025-12-27 08:16:10', '2025-12-27 08:16:37', 'active', 0, 0, 0, 0, 0, NULL),
(54, 'Abdi', 'hassanismail0708@gmail.com', '$2y$10$V5mBF5/9LvFMrXqkuXEzY.6h8R9W1kFxAh09H4ua1NBdIQLKEkQgu', '', '2025-12-28 09:18:12', '2025-12-28 09:18:26', 'active', 0, 0, 0, 0, 0, NULL),
(55, 'Rayaan muumin', 'rayaanmuumin1@gmail.com', '$2y$10$PQcX2OgL6Yxrix8lb9QFBuA.ksEc46XHzAKaTOvXelPTQnK.IfZfy', '', '2025-12-29 08:06:45', '2025-12-29 08:06:57', 'active', 0, 0, 0, 0, 0, NULL),
(56, 'Surayo', 'amiiracaliamiiracali@gmail.com', '$2y$10$Vbq87VJcO2AEtPMdYNeEOe9DdFBH9.sdXzYaa4BR5G0rbvyFyGv0S', '', '2026-01-01 09:02:40', '2026-01-01 09:02:59', 'active', 0, 0, 0, 0, 0, NULL),
(57, 'Fadxi abdihakim', 'fadxiapdihakin@gmail.com', '$2y$10$SrZ2/lWDlBWAgspEFJbIcekCwfZMPHMUkYa//J9PYhMk9FaXo/lyS', '', '2026-01-01 13:25:31', '2026-01-01 13:25:45', 'active', 0, 0, 0, 0, 0, NULL),
(58, 'Cabdiraxmanmaxamed', 'Cabdiraxmaanmaxamed046@gmail.com', '$2y$10$DmYTyd3.97pjmziUdv1a6eEMFl4jA3uxTuyPnFnzrhZIeJTjmQkJ.', '', '2026-01-02 04:39:27', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(59, 'Sakariye C/ xasan', 'sakariyecbdlh@gmail.com', '$2y$10$0AuP89KJCGjTRT/E4Mhk5OTajyiO1KZQl775fIlwIyoWX5WMlynoK', '', '2026-01-02 08:46:06', '2026-01-02 08:46:58', 'active', 0, 0, 0, 0, 0, NULL),
(60, 'Ugz osmaan', 'ugzosmaan@gmail.com', '$2y$10$a88t/EIrWDmX2fFxjh3Xwu3.LJ1XxwxzuHX47ZElLVAe8Tew/Ob9i', '', '2026-01-02 13:48:39', '2026-01-02 13:49:06', 'active', 0, 0, 0, 0, 0, NULL),
(61, 'Abdifatah', 'suludalmar@gmail.com', '$2y$10$DCCD.gfNwAanwZPOtih3h.gkqDIH3HTsam/IzrIQN5MwIKx6hJUn.', '', '2026-01-05 10:21:47', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(62, 'Nuura Ali', 'mssnuura3731@gmail.com', '$2y$10$L/.jfX1iwfgPQ8Pqv1gZseJhLHo32tuOWJeUWn000Vd/4xObJ.o0y', '', '2026-01-06 04:06:24', '2026-01-06 04:06:58', 'active', 0, 0, 0, 0, 0, NULL),
(63, 'Abdishakuur warsame', 'abdishakuurgambool@gmail.com', '$2y$10$d267rqzW/8MG/cGqVdbI.OLGU0G1wNBkiy1QH1JbJVsNq/OwvJGCK', '', '2026-01-06 07:53:14', '2026-06-19 11:32:27', 'active', 0, 0, 0, 0, 0, NULL),
(64, 'Abdiqafar', 'apdiqafaarsaidmuuse@gmail.com', '$2y$10$Mh/GLFuive/dVKcjqZtVS.Jz0weJCIcEOZWqDkivUKXa8WsrHePVm', '', '2026-01-06 17:58:08', '2026-03-29 14:58:05', 'active', 0, 0, 0, 0, 0, NULL),
(65, 'Malcom Elmi', 'malcomzej7@gmail.com', '$2y$10$Py0DBSs5ys0aQNPxMbtYueRV1l6rOp.PSeOgLvfysOq8aQvK6klH6', '', '2026-01-07 02:43:02', '2026-01-07 02:45:32', 'active', 0, 0, 0, 0, 0, NULL),
(66, 'fathi', 'fathijama233@gmail.com', '$2y$10$zDsp10QZVWEXZNj8kgRJQO1opVkIN3onPedp7FlWwgjYr75Xeef8W', '', '2026-01-07 20:47:38', '2026-01-07 20:55:37', 'active', 0, 0, 0, 0, 0, NULL),
(67, 'Amiin abdirahman mohamoud', 'amiinabdirahman2004@gmail.com', '$2y$10$NGuXvcadvgwEzqvKVk4sSuqRUCwfBTlkuviLQ10HhaSBrYkjPga6a', '', '2026-01-07 21:30:44', '2026-01-07 21:34:16', 'active', 0, 0, 0, 0, 0, NULL),
(68, 'Clxaafid Baari cllahi', 'fxaroowe@gmail.com', '$2y$10$6/UXGtqKzkBhBLVD6WkYKOb6LvGEOrufMwfGLv3EWNsK5vZehab.2', '', '2026-01-08 10:20:07', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(69, 'Dahir Mohamed Jama', 'daahirmohan1999@gmail.com', '$2y$10$FvN71/6xKuQx7g62KaHWHuPP5KHq3gmjK3l2t/G1tapC5O5.W0a7K', '', '2026-01-08 16:05:30', '2026-01-08 16:05:44', 'active', 0, 0, 0, 0, 0, NULL),
(70, 'Zuhuura abdikadir', 'quenzuhuura@gmail.com', '$2y$10$DlPVvIbQA4uS8AsVUHAi9uzCtgnG.xSFtEBbtnvz0wGf3gn6Kse.2', '', '2026-01-08 19:03:20', '2026-02-01 02:19:08', 'active', 0, 0, 0, 0, 0, NULL),
(71, 'Mohamed abdirahman Mohamed', 'maxamadcamey2002@gmail.com', '$2y$10$eiRIqmHuyZgcX5WLHcS/a.4HS0ayQ8w.H6u4eqJm7fEP.5K/ZhTf2', '', '2026-01-09 19:05:23', '2026-01-09 19:05:39', 'active', 0, 0, 0, 0, 0, NULL),
(73, 'Updiqadir bile', 'cabdiqaadirbillemohamud2@gmail.com', '$2y$10$3NZsKTsEAavU28nzJpSlIOw5Rw0D8qSKW/H5QDf1K2xOBOsSpcucC', '', '2026-01-14 07:39:28', '2026-01-14 07:40:15', 'active', 0, 0, 0, 0, 0, NULL),
(74, 'Maxamed Siciid', 'maxameddaakir12@gmail.com', '$2y$10$l03D0i30CyF5rMeyCql.uOmJ/pcdjaOeA3vXAlQ0PdaVbtWiNCnT.', '', '2026-01-15 00:11:41', '2026-01-24 20:52:08', 'active', 0, 0, 0, 0, 0, NULL),
(75, 'Sayid mahad', 'sayidqorshe@gmail.com', '$2y$10$Hd5qjWtqCG0VsujkqAr5tuR5LWG0Y3s24VPsIOmxrAmNp4vduqAuu', '', '2026-01-15 16:38:15', '2026-01-15 16:38:27', 'active', 0, 0, 0, 0, 0, NULL),
(76, 'Najah', 'amaxamuud999@gma.com', '$2y$10$T66eQ0QeuFQzJ6sF8wNsw.tzaPMiiP4c2hct6uAvO8lGnQU8p.rYu', '', '2026-01-17 10:05:29', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(77, 'C/Fitaah', 'maanka12765@gmail.com', '$2y$10$HSmUVnKkgqYwHJO4DMcxg.IGB55hbP6qqXY.PNB0GSDtl9XoCQgdC', '', '2026-01-17 16:44:33', '2026-01-17 16:44:53', 'active', 0, 0, 0, 0, 0, NULL),
(78, 'Suleiman Ahmed', 'salmaanahmedhassan7@gmail.com', '$2y$10$uyGlrTCvb01haqkAbGYMDu47Hxeodq1G/HyV81rbzo62WEQPUbGK2', '', '2026-01-18 17:44:59', '2026-06-27 18:29:19', 'active', 0, 0, 0, 0, 0, NULL),
(79, 'Maxamed ali abdi', 'maxamedjorjinho@gmail.com', '$2y$10$40T4zP5qm5N3WUWRO7FrN.XyXJBs98.LSTYY81GZFy//Y9O0G0TF2', '', '2026-01-19 12:50:54', '2026-01-23 00:49:12', 'active', 0, 0, 0, 0, 0, NULL),
(80, 'Updi', 'cabdiqaadirbillemaxamuud@gmail.com', '$2y$10$JkQaUs0dkSBNKLYLK/6QnunogE3tPXbP7sr93CjWh7einBwy81dTC', '', '2026-01-22 05:38:23', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(81, 'Abdikani moha jama', 'Abdikanijigro@gmail.com', '$2y$10$SWNiYP1qD9V3B5A/Af8zLujHT07PtxSEf7XagN7AUV012yakDnomm', '', '2026-01-22 17:14:27', '2026-01-22 17:15:11', 'active', 0, 0, 0, 0, 0, NULL),
(82, 'Ilyas', 'abdiilyas665@gmail.com', '$2y$10$YfJWThZuM5QBZEap0fT0qebVdBFuW8CfATfypAwvciinaq15Q66XG', '', '2026-01-22 18:12:53', '2026-01-22 18:13:12', 'active', 0, 0, 0, 0, 0, NULL),
(83, 'Umalkhayr Ahmed', 'umulkhayraxmed971@gmail.com', '$2y$10$hIbBvoKH2RScDNLGgEISXOgo9JG/B/CKMXejEsK8ssa8GOrHtkDPW', '', '2026-01-23 10:04:49', '2026-02-25 07:44:13', 'active', 0, 0, 0, 0, 0, NULL),
(84, 'Maxamed Abdullahi Maxamed', 'mahamedabdullahi567@gmail.com', '$2y$10$NS3.YXCLSoDbdlAmhyxO.u5kkLyrtSeFyaVMDTYoQrb3nkxaZ4w3G', '', '2026-01-25 17:05:16', '2026-01-25 17:06:23', 'active', 0, 0, 0, 0, 0, NULL),
(85, 'Abduli', 'Updulymohamett@gmail.com', '$2y$10$uI7pezY.Qc4bx7nFTWDSW.mpvm4lr2yxR.ogjFfF1wtZ8kSUyUD6W', '', '2026-01-27 09:19:33', '2026-01-27 09:20:46', 'active', 0, 0, 0, 0, 0, NULL),
(86, 'Soo', 'Sooyfunny@gmail.com', '$2y$10$pKw7UN8kt1S8abcF9tuqduqX941qLjQozQwuaoOW9RDWJz.z27PBG', '', '2026-01-27 11:08:28', '2026-01-27 11:08:45', 'active', 0, 0, 0, 0, 0, NULL),
(87, 'Yaxye Sulaymaan', 'mashkirano5@gmail.com', '$2y$10$qVNNUAF5q.zAHrd8cLAPw.NaWh1RpX1.MGZaEXIwIyfKxhPg7QC1u', '', '2026-01-27 11:35:49', '2026-01-27 11:36:04', 'active', 0, 0, 0, 0, 0, NULL),
(88, 'Isra', 'rahmuuni22@gmail.com', '$2y$10$qAhF2WLwpKASy.DwvgFRLOXCpjZcCf3ZW6uboA2UjAzGdJYzenxzW', '', '2026-01-27 18:39:18', '2026-01-27 18:39:40', 'active', 0, 0, 0, 0, 0, NULL),
(89, 'Farhan udpy', 'farxaangamer0@gmail.com', '$2y$10$lGIJwl20ukbQrDqMqxg2oOmpRErleqOmfF9fttVAsTpZ4lhGp7pPK', '', '2026-01-27 23:01:48', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(91, 'Fathi Djama', 'Djamafathi917@gmail.com', '$2y$10$2gdWiFbEeXdmZNLeBaRHuuZOPmWrkpfIy1KocPsCfdV33qLdW0GMW', '', '2026-01-28 09:44:01', '2026-01-28 09:44:21', 'active', 0, 0, 0, 0, 0, NULL),
(92, 'Nachiip Ahmed', 'najiibahmed087@gmail.com', '$2y$10$MqjwY/WHfI6cijo.uVs3Uu31oVDGDD0R9rsRWRjpmWbEhdWc2Xwru', '', '2026-01-29 13:14:47', '2026-05-11 11:54:31', 'active', 0, 0, 0, 0, 0, NULL),
(93, 'Maxamed maxamud cumar', 'axmedxasan20262@gmail.com', '$2y$10$rzpAtoc09m42hxpnytHFsetIcpH7aXqhQiR.scLRlJmfVfIVK4UzS', '', '2026-01-29 14:15:32', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(94, 'Ziizo Ahmed', 'Ziizoahmed52@gmail.com', '$2y$10$MJFfLJm50r7X18KMrmxF6O7HV.SrlM69.9O6ZlvVKDyUsLiR85KMy', '', '2026-01-30 06:27:14', '2026-01-30 06:27:24', 'active', 0, 0, 0, 0, 0, NULL),
(95, 'Najma cabdiraxman Aadan', 'ubaxlaki820@gmail.com', '$2y$10$pVqKPTWymt.zwWjq3YLcqekjxLIhmufXAU/pphULZqEtt.ESJ2gRe', '', '2026-02-01 16:43:50', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(96, 'suhayb faarax warsame', 'suhaybfaarax02@gmail.com', '$2y$10$mmaK3fMlGpwFgBwUOCug6Oh4cFMGedzDUZFSb92Ri1oU4pp0Wr/t2', '', '2026-02-01 16:51:15', '2026-02-05 19:54:39', 'active', 0, 0, 0, 0, 0, NULL),
(97, 'Abdinasir Saciid', 'Abdinasirsaciid145@gmail.com', '$2y$10$8lsAATLj1ayc.ILZPdL1PeszmOlcq1yZLJFPS4z/k0bcZ9o8UZjCG', '', '2026-02-02 16:42:26', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(98, 'Malyuun', 'Malyuuna90@gmail.com', '$2y$10$jyn51RYA6TKNZ2qXNtH07eLm3r23Klc0/HQassy818J0lJjmEFViG', '', '2026-02-03 09:01:13', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(99, 'Najax Aadan cabdiraxman', 'ubaxlaki601@gmail.com', '$2y$10$2Tn7tW6QJQfx/5hBxEHrL.loKGZonMlQoVZzmi7iTAedArB6yJRXS', '', '2026-02-03 11:37:43', '2026-07-18 22:22:57', 'active', 0, 0, 0, 0, 0, NULL),
(100, 'Idil cabdulhi', 'idilabdulaahi252@gmail.com', '$2y$10$ETHjvxtahcD9BD7.BDI59eDwsogOZ0ISnIrARno0FTViF48XWqDiC', '', '2026-02-03 15:28:47', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(101, 'Yahye ordaaye', 'yaHyeordaaye09@gmail.com', '$2y$10$2J7LXlYSRB2n0wgfyKVap.R8GcfaKc/DM67MepQuuRqQB2W335Zz6', '', '2026-02-03 19:36:16', '2026-02-03 19:39:08', 'active', 0, 0, 0, 0, 0, NULL),
(102, 'Faarax', 'farhanabshirnor@gmail.com', '$2y$10$nR48eV2LTf9BgpceITgQne97PLy6wPZ6llX8oalXmogtASGH3t6mu', '', '2026-02-03 22:10:50', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(103, 'Farhia', 'farhia7228@gmail.com', '$2y$10$a81oIoQiZknLg6vkYsT0h.p.QbOeMkx5/ysI1Ltpq68qdKvZZCLV6', '', '2026-02-05 04:35:41', '2026-02-05 04:44:02', 'active', 0, 0, 0, 0, 0, NULL),
(104, 'Abdirisaq jaamac', 'abdirisaqjaamac01@gmail.com', '$2y$10$WS44coRLSa5wMORBjMGQiOA.9r8ReUjHpT.hbf/TLwJ9fvO3hMZ36', '', '2026-02-05 20:43:44', '2026-02-05 20:48:11', 'active', 0, 0, 0, 0, 0, NULL),
(105, 'Umalkhayr mukhtaar', 'Umalkhayrmukhtar20@gmail.com', '$2y$10$tmridWWpNqe5pVAqpRh5aeeNRbEiLKhwMYNjz5L7E8VBVKnMk.2h.', '', '2026-02-07 06:19:49', '2026-02-07 06:22:34', 'active', 0, 0, 0, 0, 0, NULL),
(106, 'Cabdirisaaq cabdulaahi nuur', 'abdiraxiina@gmail.com', '$2y$10$9..TsvbqvzXvShpZS0jxjeMcFEjGosIj67lCMHmhkAYcHXmPeXTF2', '', '2026-02-07 15:03:34', '2026-02-07 15:06:18', 'active', 0, 0, 0, 0, 0, NULL),
(107, 'Suhayb dayib cabdillaahi', 'mahdidayib775@gmail.com', '$2y$10$HvZi.X50CynvpETm1ZmMgORkGKChtAl9rYU.HkQ2FfK.cH.Y8HG6i', '', '2026-02-07 20:16:54', '2026-02-07 20:16:54', 'active', 0, 0, 0, 0, 0, NULL),
(108, 'Amiin', 'Mazter333@gmail.com', '$2y$10$ER62NMQ6N3A4fiPfAQRAjeHdsVFil.Gn2HyCit7gM0XNcqyRVV7N6', '', '2026-02-08 03:37:46', '2026-02-08 03:38:17', 'active', 0, 0, 0, 0, 0, NULL),
(109, 'Ikraan Barre', 'ikraanbarre800@gmail.com', '$2y$10$EwluWsMHQ6DuFtHMF7xc8.FabDJzCBrKTjtXkSZfrLd0zQ/GfDf7e', '', '2026-02-09 08:55:34', '2026-02-09 09:00:39', 'active', 0, 0, 0, 0, 0, NULL),
(110, 'Yareabdala534@gmail.com', 'yareabdala534@gmail.com', '$2y$10$bHufp/APhCYNE8lbf96s2uddizcuB5MVKlkqQ9bY3ECt.yHQKJYPS', '', '2026-02-10 11:03:25', '2026-02-10 11:05:07', 'active', 0, 0, 0, 0, 0, NULL),
(111, 'Cabdikariim farxaan maxamed', 'cabdikariimfarxaan4@gmail.com', '$2y$10$LUHbG8f.IaZxg6.sUl/jDOF81ZI4SjYmF3lpELxB85IaBUVU0Ecli', '', '2026-02-10 14:13:50', '2026-02-10 14:15:20', 'active', 0, 0, 0, 0, 0, NULL),
(112, 'Hamda cabdilahi', 'Abdilahihamda097@gmail.com', '$2y$10$JIOpGd8IJWo4kz4Z8WFH5e61QNtNUk5R4fNloifeoVKXzUZOfMV3i', '', '2026-02-10 18:37:13', '2026-02-10 18:39:23', 'active', 0, 0, 0, 0, 0, NULL),
(113, 'Zuhayb', 'zuhaybmaxamed402@gmail.com', '$2y$10$uE3h0zSHAAn1i.UOkk4UMe03bz7gTOrHzhWhUYJEKvbNJvLTd9VAy', '', '2026-02-10 21:08:58', '2026-02-10 21:14:29', 'active', 0, 0, 0, 0, 0, NULL),
(114, 'Abdirahman Hussain Mohamed', 'abdirahman76@gmail.com', '$2y$10$7vuzCBFp87OMWTJxL2ozBO8IG19ZFWuN5NLuWK8a73lIgn/m5rvgO', '', '2026-02-12 08:20:19', '2026-02-12 08:26:36', 'active', 0, 0, 0, 0, 0, NULL),
(115, 'Farhan abshir nor', 'abaskaabaska17@gmail.com', '$2y$10$4EtkvyWWmXED.MvAed0CvO/76VaaDfDp1qlx8Ef//j5lodoZwJmo.', '', '2026-02-12 08:28:49', '2026-02-12 08:31:01', 'active', 0, 0, 0, 0, 0, NULL),
(116, 'Muna Hussein ahmed', 'saadoy42@gmail.com', '$2y$10$0KfXeRBtLx6LYrh9dUJxiuIRmvNJWKo.nlSPnYODVeLR/xXuDsJYG', '', '2026-02-13 20:52:40', '2026-02-14 11:50:31', 'active', 0, 0, 0, 0, 0, NULL),
(117, 'Ayaan maxamed', 'aadanadna1@gmail.com', '$2y$10$PSJbXjrp1ORvRwXOSFR22uk910i9Ip7pSkhEdVzIXF34HTKRPqPN.', '', '2026-02-14 03:36:44', '2026-02-15 18:45:33', 'active', 0, 0, 0, 0, 0, NULL),
(118, 'Axmed', 'amiinahmedali@gmail.com', '$2y$10$Njy2IlYAeVTUFlw8U1VD5uezJvtAFxE6kvLtORSTQBd4oYxTfY1Gu', '', '2026-02-14 11:29:27', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(119, 'Maxamed amiin', 'koolyud2@gmail.com', '$2y$10$/095a/PW1Q8RFUB1/jXEBOhXa5j0t5vW99F1U6O8CskWxDtWdxOQ2', '', '2026-02-14 15:22:33', '2026-02-14 16:05:14', 'active', 0, 0, 0, 0, 0, NULL),
(120, 'Salmaan', 'salmaantanaas@gmail.com', '$2y$10$CNdmqiT0mxzgtDjouOeFX.Q5vwgewnvBlImiHN18vl4DCGm3oSTIe', '', '2026-02-15 13:51:51', '2026-02-15 13:53:47', 'active', 0, 0, 0, 0, 0, NULL),
(121, 'Hamduuni', 'ahmetabdalla41@gmail.com', '$2y$10$Ijn9t3yLo/YHO3XHVySbC.Ja6E4BeNcGpdpt4ne7QtQTy1QIx0ExO', '', '2026-02-16 14:52:19', '2026-02-16 16:43:16', 'active', 0, 0, 0, 0, 0, NULL),
(122, 'Shaafii Ahmed Mohamed', 'gulled5099@gmail.com', '$2y$10$En4Hk9S.IjctXGxBzyE0FuBgiEJzTva6ibL.7jNGz3xv.804AROOO', '', '2026-02-16 15:01:33', '2026-02-16 15:01:33', 'active', 0, 0, 0, 0, 0, NULL),
(123, 'Ahmed Abdulle ali', 'saaxilsaaxil4@gmail.com', '$2y$10$Y/9DCL.qKiV2TPFwRyM03uw253otHh914u5xS2N/AIAokAs/DBCLu', '', '2026-02-16 16:38:05', '2026-02-16 16:47:28', 'active', 0, 0, 0, 0, 0, NULL),
(124, 'Amiin khadare', 'muhandaskadar@gmail.com', '$2y$10$Vpxu5mHptPz4UKGAumeP7OZM9n9QUDIF9OO8IE2tXLR5Y/S9osCdi', '', '2026-02-17 04:45:45', '2026-02-17 04:48:56', 'active', 0, 0, 0, 0, 0, NULL),
(125, 'Sawda iid Qawdhan', 'sawdaiidqawdhan@gmail.com', '$2y$10$PpIAhWkV6GMjB5gLvqFjNOmECXLlR4SPWSqx8StEJH3PGTnfLQAKu', '', '2026-02-17 11:05:15', '2026-02-17 11:12:42', 'active', 0, 0, 0, 0, 0, NULL),
(126, 'Farhio Jamaal tahliil', 'sapirinmohamed49@gmail.com', '$2y$10$ETOddSWqDMlWUwCNRGNjHeg/oIP2hbyaB4fl1mPZs7DKM9ha4Cc0K', '', '2026-02-17 16:09:49', '2026-02-27 16:09:48', 'active', 0, 0, 0, 0, 0, NULL),
(127, 'Fathi mahameth', 'fathimahamethhuronahmeth@gmail.com', '$2y$10$pvCfxeNn6lmy9SHQyHuhhuea/s8/vNSaTHuvUlu67jFkJE1xztVHy', '', '2026-02-17 17:06:12', '2026-02-17 17:09:02', 'active', 0, 0, 0, 0, 0, NULL),
(128, 'Muniira Abdikaadir', 'muhiimabdikaadir@gmail.com', '$2y$10$3UQH3f/tmpcN9YSfBn4AoOnlvXg7Y5QhcE3SC96cAAHN1ely2vbCG', '', '2026-02-17 19:36:49', '2026-02-17 19:38:36', 'active', 0, 0, 0, 0, 0, NULL),
(129, 'maxamed', 'maxameetubdallah@gmail.com', '$2y$10$fdBTdM5rCZD/o4OLSq9Oa.JoUr2A6HQewgoypygtKa2cCMaiE7ZO.', '', '2026-02-17 19:47:13', '2026-02-17 19:47:39', 'active', 0, 0, 0, 0, 0, NULL),
(130, 'Ibrahim cabdalla barkaan', 'gaabshi5@gmail.com', '$2y$10$L/QvA7yVjZZlHgJwRoo70.VwOxBFGrNN8k2CIYbV0voZExh2/ersq', '', '2026-02-18 06:53:44', '2026-02-18 08:55:28', 'active', 0, 0, 0, 0, 0, NULL),
(131, 'Carafat faysal abdi', 'Carafaadf9@gmail.com', '$2y$10$HBbV67IgDdBgnVm8L4Im6uugFKPHsFHRcJdvj2TXsygdA/S05AnWy', '', '2026-02-18 11:20:01', '2026-02-18 11:23:48', 'active', 0, 0, 0, 0, 0, NULL),
(132, 'Sahra siciid ibrahim', 'Isahrasiciid6@gmail.com', '$2y$10$q4roWzv2vlmahZPjCZEdY.sBv/8R7UiWYjWIdEKWH6W96ddUt0J7q', '', '2026-02-18 14:12:40', '2026-02-18 14:53:13', 'active', 0, 0, 0, 0, 0, NULL),
(133, 'Abdi abdi mohamed', 'suley5515@email.com', '$2y$10$HoFvEUSX72A2VPLbQ0auKeueEooU/cLh/wEzR8CfkkqY/ktjRb7rm', '', '2026-02-18 17:54:37', '2026-02-18 18:48:29', 'active', 0, 0, 0, 0, 0, NULL),
(134, 'Mohamed osmaan abdirahman', 'maxamudyare323@gmail.com', '$2y$10$pG.LRUYZxKY5e3xExCJaee0oT/Qt0D6svZ.zkn.nS0g7ofvTiXz.K', '', '2026-02-19 06:50:11', '2026-02-19 06:50:11', 'active', 0, 0, 0, 0, 0, NULL),
(135, 'Maxamed abdulqadir yuusuf', 'maxamadyare428@gmail.com', '$2y$10$rdPl9Y8jAevfnxj3CmhszuCUKxF2ElIuuOut.zobENtWxM6zwXHwO', '', '2026-02-20 08:09:06', '2026-02-20 08:09:48', 'active', 0, 0, 0, 0, 0, NULL),
(136, 'Nasriin Abdi mohamed', 'nasaraapdi@gmail.com', '$2y$10$3KOJW324a9KsujEhBxMDIey2mqcWohuU2b8fonlJ/DHrGBVl9jJO2', '', '2026-02-20 09:36:56', '2026-07-18 12:23:31', 'active', 0, 0, 0, 0, 0, NULL),
(137, 'Ahmed Ali', 'AhmednouroMakoMousse@gmail.com', '$2y$10$Pt/2QFnEw0nFIzPr2EuMYu3bukTreQHQc510El/Hi7n5XK0tihvAi', '', '2026-02-21 09:37:06', '2026-02-21 09:39:23', 'active', 0, 0, 0, 0, 0, NULL),
(138, 'Abdihakinxasan', 'Aminmaxamad4@gmail.com', '$2y$10$ySDTAmkz0GwsPzvS4436zO7ms8.kAUFm0OuuR0Nk9wSDI/ITll1M.', '', '2026-02-21 12:04:50', '2026-02-21 12:04:51', 'active', 0, 0, 0, 0, 0, NULL),
(139, 'Abdihakin', 'abdihakimtrader@gmail.com', '$2y$10$0mQWLZFxDB.FTxteaGrnuuA9FIjLDQ4w7Ke3toxLxjc1bgqWBeji6', '', '2026-02-21 12:06:23', '2026-02-21 12:06:24', 'active', 0, 0, 0, 0, 0, NULL),
(140, 'Mohamednuur', 'yasiinmaxamud74@gmail.com', '$2y$10$TvyiCszv6WbJ8/ax6F.KxeXgGQuD7uekhm9n1qUDE2cTikKtGr0ga', '', '2026-02-21 19:58:26', '2026-03-10 08:21:51', 'active', 0, 0, 0, 0, 0, NULL),
(141, 'abdirisak naik', 'abdirisaknaik@gmail.com', '$2y$10$tY1nGlIoBxUm9ll.4awTlekBOtsIW/fr2n8WRP92EYcqyhi/H3Dfm', '', '2026-02-21 23:23:02', '2026-02-21 23:23:40', 'active', 0, 0, 0, 0, 0, NULL),
(142, 'Ismaaciil', 'zuperfayop098@gmail.com', '$2y$10$oX5ZOEvv0Xh97MQ6cYaSGObaMtWi7oPXDquFzTX6FZrKhoXKGhJs.', '', '2026-02-22 04:20:09', '2026-02-22 04:22:26', 'active', 0, 0, 0, 0, 0, NULL),
(143, 'Hodan mahdi', 'hodancudoon287@gmail.com', '$2y$10$Ug71EwloszsL74SNAeuTrOptC5ED1b5IOf2Z2dIMumLXVT2xR1/fO', '', '2026-02-22 12:26:33', '2026-02-22 12:32:17', 'active', 0, 0, 0, 0, 0, NULL),
(144, 'Madar Shakir', 'hollyshakir049@gmail.com', '$2y$10$XzCNM2uqsUJUo9wBkC9bNu7g5wZdY142ldyMkDDjz73JhDN5Wb5Pi', '', '2026-02-23 00:18:22', '2026-02-23 00:18:22', 'active', 0, 0, 0, 0, 0, NULL),
(145, 'Maxamuud cabdikariin diriye', 'mohamuudabdidiriye@gmail.com', '$2y$10$jhECvai2Yn9fqaU5TG/gZ.FUEQ3E26NYk0e0JlQZTZtxh.zLIJ6J2', '', '2026-02-23 10:38:45', '2026-02-23 10:41:10', 'active', 0, 0, 0, 0, 0, NULL),
(146, 'Cabdiraxman yasiin', 'cabdixmaanyaasiin67@gmail.com', '$2y$10$YBHXVjMeFtbinIFbw744LeEymyeQlLA8DpgQslw5PQDdYx0CaQGjC', '', '2026-02-23 11:45:24', '2026-02-23 11:45:25', 'active', 0, 0, 0, 0, 0, NULL),
(147, 'Sumaya', 'cabdisumaya341@gmil.com', '$2y$10$efHTMWUSQgElRBA4Oh9pWubSYPEHFm.qW6hbZXSyg7DAZyD7Wq01a', '', '2026-02-24 09:59:37', '2026-02-24 10:07:26', 'active', 0, 0, 0, 0, 0, NULL),
(148, 'Guledahmednur', 'guledahmednurkhalif@gmail.com', '$2y$10$m3eKuhv0Q0/CefotMbHnpuGJeSTwphOSDNMkK4qHs2VlyhdZHl3/K', '', '2026-02-24 10:56:41', '2026-02-24 11:12:53', 'active', 0, 0, 0, 0, 0, NULL),
(149, 'Rodo salad Adan', 'rodosalad925@gmail.com', '$2y$10$RCvh6hAwV9CyQcGZY3ekLem.Nb19snbE9Xgxq83kJfqmv6xAY4Csm', '', '2026-02-24 13:04:03', '2026-02-24 13:05:08', 'active', 0, 0, 0, 0, 0, NULL),
(150, 'Fatima siciitt', 'fatimosead@gmail.com', '$2y$10$k/MrqwvbWL18cAi1NFBGmei2ik/ftLYkCRKiRMG657K.dIzq0RvYW', '', '2026-02-24 16:10:16', '2026-02-24 17:39:49', 'active', 0, 0, 0, 0, 0, NULL),
(151, 'Suhayb cabdiraxmaan jamac', 'zupercabdiraxman@gmail.com', '$2y$10$BNMANWYEMdnK8p2.mXRPYuSIAzK56J2ezdbCcUWiW3fH91nMqhtGS', '', '2026-02-24 18:23:45', '2026-03-09 14:35:42', 'active', 0, 0, 0, 0, 0, NULL),
(152, 'Maxamed xamse maxamed', 'mohamed.hamse1412@gmail.com', '$2y$10$YThEYJnItYTtY5BDc4EvWumPXg/qFNNm5336UgEvHfCHMahyybC5K', '', '2026-02-25 14:27:08', '2026-07-10 10:28:00', 'active', 0, 0, 0, 0, 0, NULL),
(153, 'Abdirahman ali nur', 'abdirahmanibnuali828@gmail.com', '$2y$10$S5PyR40fP9EJ.hw4/.W/Fe.ytdaPucEQ29LQj6Fnw1qrnxznoTzpy', '', '2026-02-26 02:28:42', '2026-02-26 02:30:37', 'active', 0, 0, 0, 0, 0, NULL),
(154, 'Isma', 'ismahanh91@gmail.com', '$2y$10$0udijYbqfh8nV8S4pO1QmOXNw0xy/RpqqP4X02AG6EoKtJFDCE7tm', '', '2026-02-27 12:58:10', '2026-02-27 13:03:04', 'active', 0, 0, 0, 0, 0, NULL),
(155, 'Ali Mohamed ali', 'haiguboodin@exmple.com', '$2y$10$guv6BTYzYj2G5neOodBTW.6ypxGx5hgT39uPxQQ.Ut80nnf2mXDEa', '', '2026-03-01 19:22:35', '2026-03-10 06:01:51', 'active', 0, 0, 0, 0, 0, NULL),
(156, 'Khadar Omer', 'khadaromer70@gmail.com', '$2y$10$bRd9cujeJbSoCBDf.uTAluKkHv5fUf2s6BF5FP8Eq2ANefGJmNzZO', '', '2026-03-01 19:28:00', '2026-03-01 19:28:00', 'active', 0, 0, 0, 0, 0, NULL),
(157, 'Abdirahmaan mahamoud', 'jamaalcabdifataax255@gmail.com', '$2y$10$PnvXZxkmFTKnJK92L6awFOBVpLzDWP4Cd7iesKyPNIbj7Kiz8KEbm', '', '2026-03-03 11:03:59', '2026-03-03 11:07:32', 'active', 0, 0, 0, 0, 0, NULL),
(158, 'Ahmed MAHAMED ahmed', 'ahmedmahamed4779@gmail.com', '$2y$10$kwXRJkzdO82NlIA9Jx/i5uMVUZ9PmDpxd71zKufxaIHJiVWLpHEnS', '', '2026-03-03 16:21:22', '2026-03-03 16:36:57', 'active', 0, 0, 0, 0, 0, NULL),
(159, 'Dirie', 'diriyefarxaan82@gmail.com', '$2y$10$Ni5BtvnRPW9b2JDcWE4c9e9ogDmOs0kqnKEad7z/fR3B2k.pcRL6W', '', '2026-03-03 21:19:51', '2026-03-03 21:22:04', 'active', 0, 0, 0, 0, 0, NULL),
(160, 'Xafsa', 'xafsamahamed371@gmail.com', '$2y$10$8XKOEYAO2nBg4GENtYRc9Oa7i5dD/prLPRlmYoqpxlkiDUwOnX5Sa', '', '2026-03-04 03:16:33', '2026-03-04 03:18:10', 'active', 0, 0, 0, 0, 0, NULL),
(161, 'Zakariyeibrahim Cabdiraxman', 'zakariyeibrahimcabdiraxman581@gmail.com', '$2y$10$jq26q05eA.5dN2k7mCIoO.UGG2wo2HHo3T3OkDugGyB6fkydUGhRS', '', '2026-03-04 23:09:18', '2026-03-04 23:17:31', 'active', 0, 0, 0, 0, 0, NULL),
(162, 'Abdul', 'abdulaziizcusman@gmail.com', '$2y$10$mtlbJ76VjdwM/zkm/zuJge.rxl6eLly1.pDXrvXLc8nWxYqW1vhzm', '', '2026-03-05 01:57:20', '2026-03-05 01:57:21', 'active', 0, 0, 0, 0, 0, NULL),
(163, 'Siraha basaska', 'cumaraamino72@gmail.com', '$2y$10$h9n8lLDdg9HtwtNv0BUCLe7qbZMX43XMxpHauEssKJ35RHFXLPMze', '', '2026-03-05 02:12:22', '2026-03-05 02:21:18', 'active', 0, 0, 0, 0, 0, NULL),
(164, 'Hamda mohamed abdiwali', 'xamdimoha169@gmail.com', '$2y$10$FNbMGEda/aDdGVvw.pQPk.sSXVu.kkxYCt0dm5MbfQqJLPD8l3mvC', '', '2026-03-05 17:53:06', '2026-03-12 16:03:33', 'active', 0, 0, 0, 0, 0, NULL),
(165, 'Ahmed Hussein', 'axmedxuseen0008@gmail.com', '$2y$10$SItM.jYXllaA.E7GlE4EpOGnysm.M9AfvHvapK9i8iGQU96LI5zFK', '', '2026-03-06 00:26:15', '2026-03-06 00:26:16', 'active', 0, 0, 0, 0, 0, NULL),
(166, 'Saphia', 'shukuisse25@gmail.com', '$2y$10$0rR3UJJ9i3c7TMOPwUrbnuGdMsZ.LeZLn3JoG6HRS3KIdW5y0TWn.', '', '2026-03-06 08:45:40', '2026-03-06 08:48:40', 'active', 0, 0, 0, 0, 0, NULL),
(167, 'said', 'csmein965@gmail.com', '$2y$10$nQJ50iaYw.8JarZsf70nU.XSeQuOprnD5bnPftdrkYBPJOloYIgZS', '', '2026-03-06 13:31:27', '2026-03-15 01:08:16', 'active', 0, 0, 0, 0, 0, NULL),
(168, 'Mahamad yuusuf', 'djmahamadmahamaddj@gmail.com', '$2y$10$ZKoUtKhArz9lgVZDrt458.ak/KYh76rlgaH6Qh2ej.9EcBjSODzHS', '', '2026-03-07 14:59:07', '2026-03-07 15:00:42', 'active', 0, 0, 0, 0, 0, NULL),
(169, 'Amin Ali', 'amiin0705@gmail.com', '$2y$10$OESzgu2w1OQ.oHlHBiPHoOpe3UI5ySS4pREEc1czqFqcVF4FlgAgS', '', '2026-03-07 19:30:26', '2026-03-07 19:32:36', 'active', 0, 0, 0, 0, 0, NULL),
(170, 'Hamze', 'hamzesensi3@gmail.com', '$2y$10$4F.Z04bQCnZYdMcRfdfdseHRNtlWIgO9KablYN/qOE6vOyBDlI4ke', '', '2026-03-07 20:50:32', '2026-03-07 20:55:21', 'active', 0, 0, 0, 0, 0, NULL),
(171, 'Mabsuud khadar', 'mapzuttkhadar@gmail.com', '$2y$10$lK79bGFJZS85El9KZwx8BeBLxcHbaYU3fXD3.5.qolxzQTAyYUCIm', '', '2026-03-08 05:51:26', '2026-03-13 11:18:48', 'active', 0, 0, 0, 0, 0, NULL),
(172, 'Sharmaake Mohamed', 'sharmaakexooshoow@gmail.com', '$2y$10$fqQwfIyWME1KW.gVEahfbe7k4.Hzb6vcUucPfdFnGD.Tc.k0mLOdS', '', '2026-03-08 14:15:37', '2026-03-08 14:18:50', 'active', 0, 0, 0, 0, 0, NULL),
(173, 'Abdihakim Mohamed', 'enahmohamed1999@gmail.com', '$2y$10$ChG.SkmqMrGXgrqTiV6fLulhoEoNeLCyxQ/qG9QVogsLUfuVYps2.', '', '2026-03-09 22:11:17', '2026-06-07 16:28:59', 'active', 0, 0, 0, 0, 0, NULL),
(174, 'Cabdalla maxamed muumin', 'saygaaxmed28@gmail.com', '$2y$10$Ia2dSHmre3ad5G2s1MZxM.5KpBaeQeiOhAu88yAJL4TWQExc3GWjy', '', '2026-03-10 19:53:17', '2026-03-10 19:55:11', 'active', 0, 0, 0, 0, 0, NULL),
(175, 'Zaynab mohamed abuukar', 'seynabseynab85@gmail.com', '$2y$10$IcWt5v/F5160XF5mqEI2EO6eWVHzDFYFAYe5I8/MhRs9bOo/e5Yay', '', '2026-03-12 20:07:01', '2026-03-12 20:10:54', 'active', 0, 0, 0, 0, 0, NULL),
(176, 'Marwaan Abdullahi', 'mrwaan.abdullahi1202@gmail.com', '$2y$10$FwfgUrG5CkKR39EABQXw1.RXVtE9fE3ZuZciTUmmDF15EtLRPeQFC', '', '2026-03-14 07:32:47', '2026-04-03 19:46:59', 'active', 0, 0, 0, 0, 0, NULL),
(177, 'Mascuud maxamuud ahmed', 'mascuudmaxamamuud1@gmail.com', '$2y$10$2vJz97mIfnTr2/Yk4DWp7unnqh5Fu1JfuSrHfNG0xSdgIy51.qyry', '', '2026-03-14 15:51:27', '2026-03-14 15:53:02', 'active', 0, 0, 0, 0, 0, NULL),
(178, 'Ali mohamuud', 'alistarm335@gmail.com', '$2y$10$FBtAzX/55vY/W4uffuKIueLw4FN8MmfOSn41nZgeib43DAhGXgXVm', '', '2026-03-15 15:21:47', '2026-03-15 15:29:35', 'active', 0, 0, 0, 0, 0, NULL),
(179, 'Cabdi risaaq Xuseen', 'ciwaja45@gmail.com', '$2y$10$cFYbJ9pKffteceDDwrZi4uXjMncza5PNp7Q9ykvptcwfVfHrHFB5i', '', '2026-03-21 06:29:45', '2026-03-21 06:29:56', 'active', 0, 0, 0, 0, 0, NULL),
(180, 'Dada', 'daauudbool090@gmail.com', '$2y$10$4RaaJAeKWkubBtqXP8FTAeNnUoGR7YzrtA.EYgNtusVNAtLZIzwia', '', '2026-03-22 20:39:38', '2026-03-22 20:39:38', 'active', 0, 0, 0, 0, 0, NULL),
(181, 'Jabriil abdi sahal', 'jabrapoi600@gmail.com', '$2y$10$G75yJL5Q7qbdGLWF7tbIg.Cd3v3KZpDu8yaewDIsUm3q.mJa0UCkO', '', '2026-03-22 21:51:49', '2026-03-22 22:11:27', 'active', 0, 0, 0, 0, 0, NULL),
(182, 'Cabdiraxman', 'cabdiraxmanmaxamed4466@gmail.com', '$2y$10$Vgx6HtAHPO3fvkxE8OJpTOds1FtzAWAWOS.kt5FXW5eGj9Dw2ZMVa', '', '2026-03-24 10:19:03', '2026-03-24 14:12:02', 'active', 0, 0, 0, 0, 0, NULL),
(183, 'Saalim mohamed yousuf', 'sakariyemaxamedmuxumed34@gmail.com', '$2y$10$Cda/Qextjtl3ZQyf5TUlvuZEtfJaIt0aHWS1Xl20MbmUBHNpa7AMy', '', '2026-03-24 19:45:12', '2026-03-24 19:46:12', 'active', 0, 0, 0, 0, 0, NULL),
(184, 'Mustafe axmed', 'axmedmusyafeaxmed@gmail.com', '$2y$10$MbOgxnTKtVrMvV5Ah065huo83ruYG7tnT050NcIA6y967zbllNXQO', '', '2026-03-25 08:05:51', '2026-03-25 08:08:31', 'active', 0, 0, 0, 0, 0, NULL),
(185, 'Ilyas abdullahi', 'abdikhaniabdi922@gmail.com', '$2y$10$AysulwjNDkqReUS5NP6.z.5WUWdsLSFoLD/ioE5XRTqMnQKB.eImK', '', '2026-03-25 15:40:42', '2026-03-26 04:04:06', 'active', 0, 0, 0, 0, 0, NULL),
(186, 'Ayan', 'nasiibasharmaarke@gmail.com', '$2y$10$iO7des4EAJn/scHR3w1VSOTpeCIW/rw56YwGXpq74c3U/qzWqqXBS', '', '2026-03-27 17:32:29', '2026-03-27 17:37:20', 'active', 0, 0, 0, 0, 0, NULL),
(187, 'Salman ibrahim', 'Xuskaaj@gmail.com', '$2y$10$Mzs9y/QwxxfJ.H6480t3gOO4yKigetOh1XPqcI1rDvTQxsDTDRKhi', '', '2026-03-27 21:54:38', '2026-03-27 22:03:33', 'active', 0, 0, 0, 0, 0, NULL),
(188, 'Nasren bashe mohamed', 'Nasreenbaashe@gmail.com', '$2y$10$mQVIChehP6aYXYcvLg2dwe2Drk0ZcBaZMWIiyIQsW5o9Mv5psWuc6', '', '2026-03-28 12:11:34', '2026-07-15 20:06:16', 'active', 0, 0, 0, 0, 0, NULL),
(189, 'Bilanxuseen', 'bilanxuseen86@gmail.com', '$2y$10$xuZ4KChvRZHZcHde9SHqoenfotdiIjk7l0fGP9jGiZGZNxptHwIfy', '', '2026-03-28 18:18:31', '2026-03-28 18:21:27', 'active', 0, 0, 0, 0, 0, NULL),
(190, 'Maxamed acli muxuu', 'itachi6976979@gmail.com', '$2y$10$4kkaBER5udaK1iNkY7yaF.KCFBQ5W.dC790xU6w00PLRI1D1ELL0e', '', '2026-03-29 20:57:09', '2026-03-29 20:57:38', 'active', 0, 0, 0, 0, 0, NULL),
(191, 'Abokor hajji', 'abokorhajji08@gmail.comgmail.com', '$2y$10$q/mfGaPuC7zljharMhYjueXXry691Id/IGGxkc7ax0lAyCLObGe.W', '', '2026-03-30 14:23:19', '2026-03-30 14:30:28', 'active', 0, 0, 0, 0, 0, NULL),
(192, 'Cabdinuur Maxamad', 'cnuurmaxamad16@gmail.com', '$2y$10$ko0xFOcgBIykCGUBsy98nuW3uNmsMXWiukHS1YglmI8hEqremmjp.', '', '2026-03-31 13:34:17', '2026-03-31 13:35:31', 'active', 0, 0, 0, 0, 0, NULL),
(193, 'Haaruun najiib ibraahim', 'goatmessi20267@gmail.com', '$2y$10$ktPLrAfQoj2RYZ.IU7rUXepwVfSGUdJRK1vOCVjxku6h2mUflPNhG', '', '2026-03-31 14:44:00', '2026-03-31 14:56:01', 'active', 0, 0, 0, 0, 0, NULL),
(194, 'Cabdisalaan axmed cismaan', 'zupeyrtalazame@gmail.com', '$2y$10$jP0.Mc9sQRcQ6yCk/uPjuORN5GkDSJMA0FsmA8lKXroB0zuGHWYwW', '', '2026-04-01 13:04:27', '2026-04-01 13:07:22', 'active', 0, 0, 0, 0, 0, NULL),
(195, 'Omar mohamed ali', 'omarmaxamed2015@gmail.com', '$2y$10$j3VR6F6TlZ/vIpTU4OACSuMBaIwDs71c0SuhHKMCsk0/MRr5w2lcS', '', '2026-04-01 18:13:51', '2026-04-01 19:04:51', 'active', 0, 0, 0, 0, 0, NULL),
(196, 'Apdisamed', 'mohaking918@gmail.com', '$2y$10$4IrOt8.wbbL1PJTIDSls5ua/AGuDhMe8LjXc8mtx4XYZRV91eGOnO', '', '2026-04-01 23:16:43', '2026-04-02 07:24:53', 'active', 0, 0, 0, 0, 0, NULL),
(197, 'Marwa hamza mohamoud', 'marwaxamse6@gmail.com', '$2y$10$zxmq/kReGV.spjRtcqrYmuS3lnL33CJMHz2yn.gYUoJx8WPL3gp1.', '', '2026-04-02 10:42:35', '2026-04-02 11:39:32', 'active', 0, 0, 0, 0, 0, NULL),
(198, 'Jamaal abdirahman', 'mrfanproj10@gmail.com', '$2y$10$OD6E.Yc/btbmbEoLL8yyNuf3Imc006hhKtjeAm3S8HsNMsJYYsCbu', '', '2026-04-02 18:29:49', '2026-04-02 18:33:58', 'active', 0, 0, 0, 0, 0, NULL),
(199, 'Cabdiraxmaan Axmed Xuseen', 'axmedabdiraxmaan56@gmail.com', '$2y$10$tQocK4qnX4d/EwYaoYPMZuA4wiz0xg55P3ywGjSJ8LGdi0jt.4zT6', '', '2026-04-06 06:51:19', '2026-04-06 06:55:18', 'active', 0, 0, 0, 0, 0, NULL),
(200, 'Upthirizak', 'rizaka476@gmail.com', '$2y$10$S5D6/v1fLstiC39W.olXSu3b89ScMk7EEak0MZUQ4g.aYJLvT4iRe', '', '2026-04-06 12:09:25', '2026-04-06 12:14:07', 'active', 0, 0, 0, 0, 0, NULL),
(201, 'Cabdishakuur mubaarig', 'cshakuurmubaarig6@gmail.com', '$2y$10$kk./TD7sr1hro1ulXH62Kuqf/iyQfxOdXVhxEu1UQg.Fyx5H4G/1i', '', '2026-04-07 22:03:19', '2026-07-02 22:37:11', 'active', 0, 0, 0, 0, 0, NULL),
(202, 'Sicid khadar', 'khadarcadaani44@gmail.com', '$2y$10$2r.h1fhS.wZMQ5AKpSpxq.m2dmfkle158EEi067k1JWrNWBSDnwRC', '', '2026-04-08 13:25:15', '2026-04-08 13:25:15', 'active', 0, 0, 0, 0, 0, NULL),
(203, 'Abdishakuur', 'abdishakuurisack@gmail.com', '$2y$10$uJ8Ok7onrOsAT6zFZu079u3wB8LCslt0ewhH5G139r7NY2/hGLi0q', '', '2026-04-09 08:54:27', '2026-04-09 08:54:28', 'active', 0, 0, 0, 0, 0, NULL),
(204, 'Safa ahmed', 'haniahmed7994@gmail.com', '$2y$10$LmFmBrIe6QL/rZHXzcB64edITeyVQseCl6PntuZe/rcW6om39kdMu', '', '2026-04-10 12:54:17', '2026-04-10 13:13:43', 'active', 0, 0, 0, 0, 0, NULL),
(205, 'Abshir', 'apshirpiinwarsame@gmil.com', '$2y$10$AVcXcpnYbZGYfMR8Eme.m.1JLoNX3.BN86jSyto9ENmMDtHA13eoe', '', '2026-04-10 15:28:46', '2026-04-10 15:37:24', 'active', 0, 0, 0, 0, 0, NULL),
(206, 'Jama', 'jikada1995@gmail.com', '$2y$10$qUtVd7O0iwXsStJN3f7bAukk8eMzXq8lvZcU8cN6LIflaw8Fl9tIa', '', '2026-04-10 19:22:22', '2026-04-10 19:26:34', 'active', 0, 0, 0, 0, 0, NULL),
(207, 'Mabrouka', 'mabroukaquruxinaali@gmail.com', '$2y$10$Q5.kvgSTUy4xbof7uNtRx.gWBgBz3JLc0ImfLqQJnggcIga1toaDe', '', '2026-04-11 21:47:49', '2026-06-14 23:51:16', 'active', 0, 0, 0, 0, 0, NULL),
(208, 'Abdimajiid abdi', 'abdimajiidabdi711@emai.com', '$2y$10$IyJFTZbBt8EzLOGyj9PfIuvQdMTJdU1QNMWcAnzwhxDHRotvIwMg.', '', '2026-04-12 03:37:58', '2026-04-12 03:39:04', 'active', 0, 0, 0, 0, 0, NULL),
(209, 'Eng Abdirashii', 'jandiomar1@gmail.com', '$2y$10$MbQY9t0snCUnWG.jH4omjuywxOp.SdqgfNjzGeq9ygM9nNiTYKh5C', '', '2026-04-12 14:03:56', '2026-04-14 12:27:41', 'active', 0, 0, 0, 0, 0, NULL),
(210, 'Ayaanle', 'ayaanlemohamed276@gmail.com', '$2y$10$oNW8p08mRoXztL/VVYdX3.Nz4eWvAw.gz8cWqnlvxuvCpjo21D9Am', '', '2026-04-16 18:02:24', '2026-04-27 05:11:48', 'active', 0, 0, 0, 0, 0, NULL),
(211, 'Farax faysal', 'farhafai77@gmail.com', '$2y$10$QZ/o.A1stQJjVzxwxaSq4OzjgLs3ssak8jyI8YAnP8Hsz/QIldJpm', '', '2026-04-17 17:57:17', '2026-04-18 04:55:41', 'active', 0, 0, 0, 0, 0, NULL),
(212, 'Muumin', 'muminabdiqadir92@gmail.com', '$2y$10$xcJOdCcSeJaS2Uxic6pjuu793BYFzcZgLEqzLrg7SJPtt/dFyFYEW', '', '2026-04-18 01:20:47', '2026-04-18 01:25:49', 'active', 0, 0, 0, 0, 0, NULL),
(213, 'Huda ibrahim', 'ibrahimafifa757@gmail.com', '$2y$10$vtHB0XIfOBK1covSLiz9hezgLnPyDOAVl/Sy27R3Mz2KPaaKpKYaG', '', '2026-04-18 10:57:13', '2026-04-18 15:53:47', 'active', 0, 0, 0, 0, 0, NULL),
(214, 'Barkhad', 'ibroibrosame@gmail.com', '$2y$10$.FuKozZNTdoUO5CwQlz/cO83rDNb56C02wcAl3YsQk9iuODsUvZyC', '', '2026-04-18 20:08:55', '2026-05-02 06:45:01', 'active', 0, 0, 0, 0, 0, NULL),
(215, 'Guonm', 'Kooyfunny@gmail.com', '$2y$10$K5Z5In5jjYvQdaLbymyPBeTpQ2.U2zGircpdOCvorCw6m8GEdVGvi', '', '2026-04-19 09:31:35', '2026-04-19 09:31:36', 'active', 0, 0, 0, 0, 0, NULL),
(216, 'Zaciima Abdiwahaab muxamed', 'Zaciimacabdiwahaab@gmail.com', '$2y$10$LxffSS4aD00C7i9zolyTB.y8tWO6/gQ69AKk1iwXaFNRbnwjOLufC', '', '2026-04-24 05:53:25', '2026-04-24 06:08:35', 'active', 0, 0, 0, 0, 0, NULL),
(217, 'Idiris maxamed', 'calix3392@gmail.com', '$2y$10$GzlQ/J03CekefF1CLqsECOppDaAS8m6o3jqSn56DHXIkehA.qgGA2', '', '2026-04-25 05:53:47', '2026-04-25 05:54:53', 'active', 0, 0, 0, 0, 0, NULL),
(218, 'Hassan Abdullahi', 'shaxata0303@gmail.com', '$2y$10$I0IraMpwJidjbH4Cfocjt.bMX7EL01Lbir6mDWm6JFoTaYDwq85fS', '', '2026-04-27 10:36:08', '2026-04-27 11:53:17', 'active', 0, 0, 0, 0, 0, NULL),
(219, 'Khadar', 'khatterahmett7@gmail.com', '$2y$10$bFR81wPgoWo5MiNNHCnW.O0/BwCi78a3YokqB//rVkqVQVIzyocKO', '', '2026-04-28 14:54:42', '2026-04-28 14:56:58', 'active', 0, 0, 0, 0, 0, NULL),
(220, 'muraase', 'cumerwarmahaye@gmail.com', '$2y$10$YAq7FYxZ6ohxu73NleGzwOf9.x0goJZaF1dqx8mfqIE5gJRuFDa4W', '', '2026-05-02 10:38:50', '2026-05-02 10:41:17', 'active', 0, 0, 0, 0, 0, NULL),
(221, 'Najma MoHameTt', 'inakaahinwarsame@gmail.com', '$2y$10$AYzg4/0zT1/wRV5oK4DvcOPXB43dfC54Sxo3o4tqlVnRul8d1OyXy', '', '2026-05-02 17:15:57', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(222, 'Cowke xasan maxamuud', 'fitaaxcx77@gmail.com', '$2y$10$Mk3D8o0bQj.aDZ9KXeaT0ObanpQg3VoEoWgfn/7CxhRqAdrF/99eu', '', '2026-05-04 11:39:27', '2026-05-04 11:47:59', 'active', 0, 0, 0, 0, 0, NULL),
(223, 'Ashraph', 'azhrafcadde@gmail.com', '$2y$10$SKDN6/c90SaAWnCHOBkbSeMdVXALDSDceDAhbJQRAzUfo3TBzMX3y', '', '2026-05-06 00:13:14', '2026-05-06 00:14:03', 'active', 0, 0, 0, 0, 0, NULL),
(224, 'Axmed cabdi cabdilaahi', 'sharmaarkemuhani6@gmail.com', '$2y$10$bOY6vEK7pgc8oNZ1Wisfrullpf59iz82MxrkxmpWVZHeT9eE4.k0m', '', '2026-05-06 05:22:06', '2026-05-16 06:36:57', 'active', 0, 0, 0, 0, 0, NULL),
(225, 'Usaame', 'usaamem16@gmail.com', '$2y$10$iUFZ.i399HoYQrcb2jVfseiB6bey.re.BneMYIxo3J2nRluJ3hZp.', '', '2026-05-06 13:13:37', '2026-05-06 13:15:50', 'active', 0, 0, 0, 0, 0, NULL),
(226, 'Cabdinaasir', 'jiirofanto123@fmail.com', '$2y$10$JEJ9C8C3qnV9OzEdFIhMs.GTdTsoObo3WegVEDNiXvqrEr5HhE4CC', '', '2026-05-06 14:29:57', '2026-05-06 14:31:42', 'active', 0, 0, 0, 0, 0, NULL),
(227, 'Cabdi Maalik', 'cmaalikismail361@gmail.com', '$2y$10$ACBM/nKcCZZ3l4mIvs8YQeZRo5KKF9tWGJejZpm9MILQUqH2pngaW', '', '2026-05-07 09:32:15', '2026-05-07 09:32:16', 'active', 0, 0, 0, 0, 0, NULL),
(228, 'Zakaria upthinazirr bashiir', 'laylaupthilahi@gmail.com', '$2y$10$YbTFIaBIMN6kZa5W4pEVBOa3oH8U3YPHRaSC91W/2wZHM3cS..Rgm', '', '2026-05-07 09:52:32', '2026-05-07 09:54:18', 'active', 0, 0, 0, 0, 0, NULL),
(229, 'Hamse Ahmed Nour', 'xamseaxmed367@gmail.com', '$2y$10$292CrvXkK2MnXxG1FB8eLeDtuqsKkuWC2Pdidk/NTU8qLieBNlrhW', '', '2026-05-07 10:23:53', '2026-05-07 10:23:53', 'active', 0, 0, 0, 0, 0, NULL),
(230, 'Yacub', 'yacquubyare619@gmail.com', '$2y$10$WNZKNiBug4v1VBiLPf4vfuJlhPyYJINqnkFK2BrLAzBEQEvB0PRxm', '', '2026-05-07 11:15:53', '2026-05-07 11:17:33', 'active', 0, 0, 0, 0, 0, NULL),
(231, 'Kimze khan', 'hidigmusa@gmail.com', '$2y$10$dlzZ1c52XobvgwgMA9/Zk.q1HfGOcDKeNGn57nX5DRDByari9pLa.', '', '2026-05-07 13:10:54', '2026-05-07 13:10:55', 'active', 0, 0, 0, 0, 0, NULL),
(232, 'Cabdale', 'cabdalemacaane82@gmail.com', '$2y$10$RPqVBRLwEqz2KVQv41FWBOuWyx5jUT2TKC7hOPIyd7xn3iWVDfmci', '', '2026-05-07 13:59:34', '2026-05-07 14:04:06', 'active', 0, 0, 0, 0, 0, NULL),
(233, 'Anas', 'Yareanas383@gmail.com', '$2y$10$LEn47/1..HZ6JEOSJBmeaeVpdqjnq1tVk6GZ8fjTn26qrPvRK2/vG', '', '2026-05-07 16:11:55', '2026-05-07 17:22:20', 'active', 0, 0, 0, 0, 0, NULL),
(234, 'Muna Abdirashiid ahmed', 'munaabdirashiidmunaabdirashiid@gmail.com', '$2y$10$0K0RxIxiAZcvdjmvEuhgf.I/odw/LayznrPqW3bL9PQI.yS47cd.y', '', '2026-05-07 16:26:52', '2026-05-07 16:27:23', 'active', 0, 0, 0, 0, 0, NULL),
(235, 'Sidiiq', 'sidiiq557@gmail.com', '$2y$10$8e.WxHASEvPIxdGI8vYcR.aHbbzehX6jMyNL0XytzttVH4wX.9oVG', '', '2026-05-07 17:17:23', '2026-05-13 18:51:26', 'active', 0, 0, 0, 0, 0, NULL),
(236, 'Aaash', 'darkfeminine.55@gmail.com', '$2y$10$6nqURN8XoFBXoHoCJ6ns.OF7e.NoKX5hbg520lGNOO3PDCf8sAgnO', '', '2026-05-07 17:25:13', '2026-05-07 17:32:07', 'active', 0, 0, 0, 0, 0, NULL),
(237, 'Cabdifatax', 'eng.apdifatah@gmel.con', '$2y$10$gVekV8HHUiZBLcQNKrplQehZNeU2UHDb2SM3m5SeCCjTp3Od/5l8y', '', '2026-05-07 17:43:07', '2026-05-07 17:44:02', 'active', 0, 0, 0, 0, 0, NULL),
(238, 'Nadiira', 'nadirajama592@gmail.com', '$2y$10$pMGuejXfG9scBH3RDdudc.cceZPoQVIq/SySCDeY8KCDkupYBBcJm', '', '2026-05-07 18:04:15', '2026-05-07 18:06:36', 'active', 0, 0, 0, 0, 0, NULL),
(239, 'Deqsan', 'mohamalika39@gmail.com', '$2y$10$PYclrqWp5JIQp9q2yCKPL.hAVG6E2rGiIRZVNovcLg9u/sLpi0TAy', '', '2026-05-07 18:26:37', '2026-05-07 18:42:43', 'active', 0, 0, 0, 0, 0, NULL),
(240, 'ibraahim', 'ibraahimmaxamed279@gmail.com', '$2y$10$4vA9F3RwE3VHGElkeL5YdeJErnymRMPCyvWKFG/XA92DJlFDOXdpe', '', '2026-05-07 20:09:59', '2026-05-07 20:13:19', 'active', 0, 0, 0, 0, 0, NULL),
(241, 'Nimo', 'nimoamiin9@gmail.com', '$2y$10$/MNOM36QO632nGHMoajGpuA5sI2sxJvhVodVMnqzqAHqwMP/TlVNK', '', '2026-05-08 08:34:44', '2026-05-08 08:34:44', 'active', 0, 0, 0, 0, 0, NULL),
(242, 'Suhaib abdilahi', 'abdikabirali2003@gmail.com', '$2y$10$iIeA//aCdWBQtxrhMk3r4ev9UA1QDGm0QvmK4SKecXR6Yh1rawJgK', '', '2026-05-08 09:54:36', '2026-05-08 09:54:36', 'active', 0, 0, 0, 0, 0, NULL),
(243, 'Rashid', 'Gorgorila@live.com', '$2y$10$tVuASZ7e3IpdF4zTMtv4G.4gxbkUzV2tCAV9TBO4Z2.7DBR57DM4i', '', '2026-05-08 12:38:59', '2026-05-08 12:38:59', 'active', 0, 0, 0, 0, 0, NULL),
(244, 'Yasin Muhumed', 'yassinmumin9@gmail.com', '$2y$10$R7XMUXF/.5wFeMU8csZ.4eFiegf9qU8TFZVnK.Oj9jSDqgr3j2SQe', '', '2026-05-08 12:44:24', '2026-05-08 12:53:50', 'active', 0, 0, 0, 0, 0, NULL),
(245, 'Abdisalaan mohamed ahmed', 'apdizalaanmohameth@gmail.com', '$2y$10$6V/TgzD9ecRM4EIBzjlFROgqSpyGs74kLqQIzMXLFrrLMhnJHhF.y', '', '2026-05-08 19:26:03', '2026-06-02 15:20:31', 'active', 0, 0, 0, 0, 0, NULL),
(246, 'Somaliland boy', 'somalilandboy6@gmail.com', '$2y$10$hn3ngAJjaKHge.HbItqqleQT4y/lJYjUMwRRqN39QfyGZMPhsAY0e', '', '2026-05-08 23:32:26', '2026-05-08 23:35:19', 'active', 0, 0, 0, 0, 0, NULL),
(247, 'Ye', 'dicin12t3@gmail.com', '$2y$10$DA9oHNjJEIR12ksnSV5vA.NmOJ/xP1sdmfC1DCZMJZPCGj9IsnMw2', '', '2026-05-09 03:40:10', '2026-05-09 04:02:36', 'active', 0, 0, 0, 0, 0, NULL),
(248, 'Cabdirahman', 'cabdirahmaanbashiir944@gmail.com', '$2y$10$yTSFnKEgZRDZExet5d50VuWXUkuXswkV3E7wOggdlFqajWHojgI6a', '', '2026-05-09 09:26:59', '2026-05-09 09:27:51', 'active', 0, 0, 0, 0, 0, NULL),
(249, 'Apdirizak', 'apdirizakneymar3@gmail.com', '$2y$10$RpYscCgixY/3/7Yj5GQvteMKCsVABAl73ig2RsjkWMU5YklrEnLty', '', '2026-05-09 12:02:30', '2026-05-21 08:33:45', 'active', 0, 0, 0, 0, 0, NULL),
(250, 'Lukman', 'ahmedsalad12@gmail.com', '$2y$10$7y10JD2.llsjlfinXQIjXegdcF98Iwcaf0B/wSbh1/QuuLtg27FIa', '', '2026-05-09 16:07:24', '2026-05-09 16:51:14', 'active', 0, 0, 0, 0, 0, NULL),
(251, 'Luqmaan Maxamed farax', 'ahmedsalad346@gmail.com', '$2y$10$wsng63zuGEzn9PWWVKRWyO6MxrSzSASChjc1jhVnVvAPRi83CJYZ.', '', '2026-05-09 16:34:01', '2026-05-21 15:24:21', 'active', 0, 0, 0, 0, 0, NULL),
(252, 'Cabdi', 'cabdifitaaxfitaax75@gmail.com', '$2y$10$32vZrIYFPjP.XDUTxgQK8OZN87wN4vOMnQh0etl18mmbrIC5OuNyC', '', '2026-05-09 18:59:42', '2026-05-09 19:02:29', 'active', 0, 0, 0, 0, 0, NULL),
(253, 'Joker', 'abdinurhussein2222@gmail.com', '$2y$10$kCRK4ZTnbp0JsU9dI5j33OcKAKPXCweKhZFOGa7Jano6jnt423qG2', '', '2026-05-09 22:05:31', '2026-05-09 22:12:47', 'active', 0, 0, 0, 0, 0, NULL),
(254, 'Xamdi', 'xamdivip744@gmail.com', '$2y$10$T797Y/LflEaVTdD1FHh9c.p.vWbjfKe2If0mmiwBaEgZDt1a/C0re', '', '2026-05-10 21:03:08', '2026-05-10 21:51:52', 'active', 0, 0, 0, 0, 0, NULL),
(255, 'muhanad', 'muhanadosmaan36@gmail.com', '$2y$10$q5jDgg2cHsldZkuI6m4MTeqZ2HdR9XwGhrrq119ZHeXYyffQb7Ab6', '', '2026-05-11 17:58:49', '2026-05-11 18:02:20', 'active', 0, 0, 0, 0, 0, NULL),
(256, 'abdulahi ck', 'abdulahiick@gmail.com', '$2y$10$kg5FKvO.60b.dZjKElZGjO.XQgVTohdP3Ea8VGiQQyYDGtpGuw/le', '', '2026-05-11 19:57:03', '2026-05-11 19:58:38', 'active', 0, 0, 0, 0, 0, NULL),
(257, 'Hana Mohamed ismacil', 'hana.moh9900@gmail.com', '$2y$10$51tWRdYGcrQMxBCF5RhteeIg8rC3ET0t1HLsNMI7EIFSmqHcBVjHG', '', '2026-05-11 20:43:12', '2026-05-11 20:46:15', 'active', 0, 0, 0, 0, 0, NULL),
(258, 'Mascud', 'mascutabdirahman@gmail.com', '$2y$10$yc30iM2V8GvESOIKSNAIMuCEXcWQLGtaI4W4mqYnCOeTS7jtEIwsi', '', '2026-05-11 21:52:47', '2026-05-11 21:52:47', 'active', 0, 0, 0, 0, 0, NULL),
(259, 'Ismail Ukash Ahmed', 'ukashyare123@gmail.com', '$2y$10$IJX7YXX3/vFKHAZWEgNQluVUH5IqaNl9pVI4eMDmts4Mx1CBuGfmi', '', '2026-05-12 07:42:13', '2026-05-14 10:48:26', 'active', 0, 0, 0, 0, 0, NULL),
(260, 'xamse', 'akramkaamil15@gmail.com', '$2y$10$zDep/qmARmdyabO8zvAGPO9qKEE40V6ad7oAZmqj6qaZgVse8TUjq', '', '2026-05-12 09:26:00', '2026-06-27 13:51:17', 'active', 0, 0, 0, 0, 0, NULL),
(261, 'Abdihakim', 'yyaraanka3@gmail.com', '$2y$10$RFtvIEOBTag6ZZIrQa7S2.ew/NtQRLb3WCASKwTCcuH9k1YVlxESO', '', '2026-05-12 16:58:31', '2026-05-12 16:58:31', 'active', 0, 0, 0, 0, 0, NULL),
(262, 'Abdiasiis', 'ccasiiscqaadir874@gmail.com', '$2y$10$ZWh7Qm3spfn6IB8D2xhr4./GT.C/ZX9.I0pNeoUwCbHr.vIcJPvQS', '', '2026-05-12 20:25:32', '2026-05-12 20:25:32', 'active', 0, 0, 0, 0, 0, NULL),
(263, 'Mohance', 'mohance10samater@gmail.com', '$2y$10$R1SWCx4/wEnc8NRhk4QqHO3MJijxyIbQjt1uS.pmPgv3XxrZkc1um', '', '2026-05-12 21:13:00', '2026-06-07 16:43:14', 'active', 0, 0, 0, 0, 0, NULL);
INSERT INTO "users" ("user_id", "username", "email", "password_hash", "phone_number", "registration_date", "last_login", "account_status", "profile_complete", "total_reading_time", "books_completed", "current_streak", "longest_streak", "last_reading_date") VALUES
(264, 'Cabdalla', 'cabdallaaweys61@gmail.com', '$2y$10$pBUumyLTw7zHz/4FQmxcV.0jJ2jk26q5LECIjsfHLf0PKiZzfZqNi', '', '2026-05-12 21:21:40', '2026-05-12 21:21:40', 'active', 0, 0, 0, 0, 0, NULL),
(265, 'hamze Joker', 'hamzej974@gmail.com', '$2y$10$6nts4xZbCSOLNtOj1oUhkurLhCpSAT0cxDxa9MoLYikCOdTA3wPJ6', '', '2026-05-13 01:01:42', '2026-05-13 01:01:43', 'active', 0, 0, 0, 0, 0, NULL),
(266, 'Abdirahman Yassin Mohamed', 'Abdirahmanyasin744@gmail.com', '$2y$10$UkSh9TqzEb6fXiCbgwVqcOdi158SqE2v55iZXwZzAQ07FzgsU7Cs2', '', '2026-05-13 07:32:22', '2026-06-11 17:44:06', 'active', 0, 0, 0, 0, 0, NULL),
(267, 'Ismail Abdisalam', 'ismaailabdisalam2@gmail.com', '$2y$10$/p7MQrRLghTb4vWle3/pm.L.Pbx9bZJfb07D4rgwgNuxhC45hBwQS', '', '2026-05-13 09:44:25', '2026-05-26 08:31:46', 'active', 0, 0, 0, 0, 0, NULL),
(268, 'Sharmaake', 'sharmaakeaxmed783@gmail.com', '$2y$10$XE3RxSY1GYxtyw415T/QPuRljqihox24C49IDJkH2rhtSnhrmtXy6', '', '2026-05-14 07:23:55', '2026-05-14 07:23:56', 'active', 0, 0, 0, 0, 0, NULL),
(269, 'Mustafe', 'mustapheboodhac@gmail.com', '$2y$10$kDZqLHoVonDaPIRVYHvDF.62HNMPLSxdjAiS0vSVRn4s99wSPy7qO', '', '2026-05-14 09:01:22', '2026-05-14 09:07:45', 'active', 0, 0, 0, 0, 0, NULL),
(270, 'Abdiaziiz', 'caadif977@gmail.com', '$2y$10$G9dUuej5PpHKqgWMzgQyYeF.JeDJ0nBFHxjEALkNllfK74IYHugnK', '', '2026-05-14 13:59:16', '2026-05-14 13:59:44', 'active', 0, 0, 0, 0, 0, NULL),
(271, 'Ahmed abdinasir', 'abdinaasirahmed97@gmail.com', '$2y$10$FeuoE/iEeSjNqqkI7u0nyeZ6s0PoWddwRiYPPCHVorbX8DJJ9XW72', '', '2026-05-14 16:21:18', '2026-05-14 16:21:18', 'active', 0, 0, 0, 0, 0, NULL),
(272, 'Cris ar', 'daade002@gmail.com', '$2y$10$eM8X3OdP60HwiAOa8JZpuOzM7DWg6gWeOHdiuMG.0fagmwOBrar4e', '', '2026-05-15 04:10:37', '2026-05-15 04:40:05', 'active', 0, 0, 0, 0, 0, NULL),
(273, 'Ilyaas', 'saayli37@gmail.com', '$2y$10$UgUfxc5aXQEKL19BxzBx/.2USMTbJ54oNVu7sEjoV0r6bIuvvuaIK', '', '2026-05-16 11:14:46', '2026-05-16 11:14:47', 'active', 0, 0, 0, 0, 0, NULL),
(274, 'Farhan', 'f0922889@gmail.com', '$2y$10$2cOxMqZvq.tYvzBPtZrXaOpVp4x.LtEDJI65/aOhIEGE6tJoXqwXO', '', '2026-05-16 19:04:41', '2026-05-16 19:04:44', 'active', 0, 0, 0, 0, 0, NULL),
(275, 'Nuur Xuseen', 'nuurxuseen224@gmail.com', '$2y$10$l8YOJKDdJslUMNSO5WlTs.oPQxLq4V1btPJVp/00x.Wa8oay2uPmO', '', '2026-05-17 18:45:00', '2026-05-17 18:53:31', 'active', 0, 0, 0, 0, 0, NULL),
(276, 'Carafaat', 'araphatapdi@gmail.com', '$2y$10$5wXp3i8x08tDzGKBIhUr..hjEUMvKxyjrwjUR0PMdP1OpAaeb8YBW', '', '2026-05-17 20:17:12', '2026-05-17 20:17:49', 'active', 0, 0, 0, 0, 0, NULL),
(277, 'Cabdisamad Mahamed Jibril', 'abduzamedmoh19@gmail.com', '$2y$10$L9MBCUacKMpmy9Kr286SF.IbqffFUdR4wYcnJ9bKSqL7jg0HFik1m', '', '2026-05-18 08:55:46', '2026-06-28 15:08:55', 'active', 0, 0, 0, 0, 0, NULL),
(278, 'Abdi aziz', 'nagiibaxmedcabdisamad10@gmail.com', '$2y$10$LyDgsM/rCMj1M0B1ZITiPuZAo1z0Z8n6FEJQA.0Iw4MNvRBt4rpUe', '', '2026-05-18 12:35:45', '2026-05-18 12:39:33', 'active', 0, 0, 0, 0, 0, NULL),
(279, 'Samiira ahmett updy', 'samiraahmettabdi@gmail.com', '$2y$10$Emcodejt4CvZAxhctmoeKennE09yLmLHk8XgUStnMiwftNlbt71te', '', '2026-05-19 10:49:43', '2026-05-19 12:04:25', 'active', 0, 0, 0, 0, 0, NULL),
(280, 'Cabdale Nuur', 'cabdalenuurs106@gmail.com', '$2y$10$pHXbLHvih30vhAwuGcFDbOsHDs55TLeCch80wN/FSiZAn38fPbYoC', '', '2026-05-19 13:18:39', '2026-05-19 13:18:39', 'active', 0, 0, 0, 0, 0, NULL),
(281, 'libanmohammed457@gmail.com', 'libanmohammed457@gmail.com', '$2y$10$1h/RGv7RjJWIkj/6E4Dc9u9nEIDkm4g8paYg9TWcZA9nOxoYU2Zy2', '', '2026-05-20 18:35:46', '2026-05-26 19:17:24', 'active', 0, 0, 0, 0, 0, NULL),
(282, 'Mohammed abdirahman osman', 'marwafayzal12@gmail.com', '$2y$10$UU/etD/4UxVOYHOJDF8LUeuxSNp.7jqzn537t1SR6oT4Qvmk4ecZq', '', '2026-05-22 10:15:31', '2026-05-22 10:17:07', 'active', 0, 0, 0, 0, 0, NULL),
(283, 'SHUEYB BASHIR DIIRIYE', 'shueybbashirdiiriye10@gmail.com', '$2y$10$w.TLXWWmOA6vUtYh4urpNeunnZ3c10P4hO3CoLKIz/e0KD51ppckK', '', '2026-05-22 10:24:39', '2026-05-22 10:40:45', 'active', 0, 0, 0, 0, 0, NULL),
(284, 'Suhayb iid', 'ibraahimidiris318@gmail.com', '$2y$10$A.VaAHGd6JRqv.mFtN26BOz.zdEyNWTprR1Vs2N15oTlxJ/imi.EC', '', '2026-05-22 10:46:35', '2026-05-22 10:46:35', 'active', 0, 0, 0, 0, 0, NULL),
(285, 'Muscab c.fataax', 'muscababdifatahmuscab@gmail.com', '$2y$10$sxkyrpQiHSY6/1gmmnp69eo98/J23aHzfYybB6z73K3xyLDwKrvZy', '', '2026-05-22 10:53:23', '2026-05-22 10:53:23', 'active', 0, 0, 0, 0, 0, NULL),
(286, 'Hazan', 'hassanyasiin1111@gmail.com', '$2y$10$QsIv4avXKzTYK.lcFhr5Bu6ZNGKuON2w0Jl7KL1.3NOGm4n5ltfCK', '', '2026-05-22 11:05:58', '2026-05-22 11:07:21', 'active', 0, 0, 0, 0, 0, NULL),
(287, 'Abdisamad', 'abdisamadali566@gmail.com', '$2y$10$xyXKm/7hhegY2OVt3bT0XOAZRZvUsM.YWvF5/cp2MexwQEQbP24cC', '', '2026-05-22 12:28:47', '2026-05-22 12:30:37', 'active', 0, 0, 0, 0, 0, NULL),
(288, 'Hotho', 'hothohani1@gmail.com', '$2y$10$YjW.7RiN.ySsUq28wG6h/uyHKusuEGotqvnNCVy.rPuNEkeT7arS6', '', '2026-05-22 12:50:13', '2026-05-22 12:53:06', 'active', 0, 0, 0, 0, 0, NULL),
(289, 'Cbdiraxmaan', 'doonkamaanka2@gmail.com', '$2y$10$EtOOtiNbDl2972o3A5yBWOZp9UDxEOA9Z9/t.5UkcBzH1lNoWt4pu', '', '2026-05-22 13:22:37', '2026-05-22 13:22:37', 'active', 0, 0, 0, 0, 0, NULL),
(290, 'Abdirizak Hussein', 'abdirizakarts@gmail.com', '$2y$10$/XGXtdTJsc1r2F1oplcDruqTMPZKciDpSD1b.TJvG9Y0br0HMRMjO', '', '2026-05-22 14:34:48', '2026-05-22 14:40:45', 'active', 0, 0, 0, 0, 0, NULL),
(291, 'Mahir', 'cqadirfuad@gmail.com', '$2y$10$PlV6bQs61RVMoxh2S8J7xeg.x2i/GJkXs41bXMH2hRswv0f73Sasm', '', '2026-05-22 14:39:15', '2026-05-22 14:39:16', 'active', 0, 0, 0, 0, 0, NULL),
(292, 'Yaasir', 'yaasirsheikh6@gmail.com', '$2y$10$H6WAiCeyITQjTvrVGVUmhOD3OZ3mq0IPi/GucPU2BLIgMMPlKdzMG', '', '2026-05-22 15:44:39', '2026-05-22 15:49:38', 'active', 0, 0, 0, 0, 0, NULL),
(293, 'zara', 'zarayarey019@gmail.com', '$2y$10$Y9X4gssq0ab8AVxq4Sokj.TS1fTKfqKYRXP0LD1d0FFNi5aYTJlpe', '', '2026-05-22 18:57:04', '2026-05-22 18:58:40', 'active', 0, 0, 0, 0, 0, NULL),
(294, 'Mohamed abdullahi ali', 'aajaboy399@gmail.com', '$2y$10$O/ANJX8Acw5aXl/lyxwBsOwOLz7iZ86OwZO5lLFqmr5mV0MJdMei2', '', '2026-05-22 20:26:25', '2026-05-22 20:26:26', 'active', 0, 0, 0, 0, 0, NULL),
(295, 'Mahahhw', 'goperi4980@noyavip.com', '$2y$10$bEN93FsGXzTSXVHJdvscAuS0YzEI19zNgHy//elyTUar72YBYXl8O', '', '2026-05-22 20:59:28', '2026-05-22 21:01:16', 'active', 0, 0, 0, 0, 0, NULL),
(296, 'Hanan Abdullahi', 'xanaancabdullaahi478@gmail.com', '$2y$10$dyNFZuSYMQBVegfeRA4f0OcACXQZ38/0EqfpgrjVlc1OC7nOuW9/G', '', '2026-05-23 05:48:36', '2026-05-23 06:16:48', 'active', 0, 0, 0, 0, 0, NULL),
(297, 'Mukhtaar', 'mukhomukhtaar391@gmail.com', '$2y$10$mkAPIGRlJhFh3UwcAl3Rn.SGnH7gvEZsSHER6kTdiJH9bNH7fVOSG', '', '2026-05-23 16:48:31', '2026-05-23 16:49:29', 'active', 0, 0, 0, 0, 0, NULL),
(298, 'Alex Santoa', 'playchiesa@gmail.com', '$2y$10$GnlgRDiKQ9BA7vLno3b4NOGnRaJ72l5Z4pxlQoSalyfF7GRf2H8Ji', '', '2026-05-23 17:15:26', '2026-05-23 17:34:31', 'active', 0, 0, 0, 0, 0, NULL),
(299, 'Farah', 'farahelias4886@gmail.com', '$2y$10$tuBu0qiecX5cndKjtHeO3.K386ZxtXtcxy.oiddEc4Jw8ISuAo5n2', '', '2026-05-23 18:39:01', '2026-05-23 18:39:55', 'active', 0, 0, 0, 0, 0, NULL),
(300, 'CAMIR23', 'maxamedafyare613@gmail.com', '$2y$10$2YIAfYCPr.MGxD78pUIwouR5w5jO.u44AEgkbPtUrP/ejQEoCCH0K', '', '2026-05-24 05:52:57', '2026-05-24 05:54:29', 'active', 0, 0, 0, 0, 0, NULL),
(301, 'Ali', 'samatarhaaji75@gmail.com', '$2y$10$OFcZ8uI4skgw/EUj5Edj4emLZaYG4utsF8ZtYwEUEZ8IdlDI.qdMe', '', '2026-05-24 09:50:07', '2026-05-24 09:50:07', 'active', 0, 0, 0, 0, 0, NULL),
(302, 'Hidaaya', 'hidaobashir87@gmail.com', '$2y$10$1cKm.d4ELxT4o8kRY9o3P.qq43QL4rANIHxD1YEPPCQkoako2ze3y', '', '2026-05-24 10:18:48', '2026-05-24 10:20:09', 'active', 0, 0, 0, 0, 0, NULL),
(303, 'Cali', 'caddeismacil0045@gmail.com', '$2y$10$WD.I5X0HDEIrEQoBIKF/2uKfUp8QfFlANDpCXAV7j9avE0KYuSK5u', '', '2026-05-24 11:48:07', '2026-05-24 11:52:55', 'active', 0, 0, 0, 0, 0, NULL),
(304, 'Mulki Ahmed abshir', 'mulkiahmed127@gmail.com', '$2y$10$L72Ck3YFJ08EZQu7PuG30.rovqw5bgaUbd6iOqA0zJjfetlnWsgNa', '', '2026-05-24 14:33:34', '2026-05-24 15:13:26', 'active', 0, 0, 0, 0, 0, NULL),
(305, 'Abdirisaaq hareed', 'abdirisaqhareedmaxamed@gmail.com', '$2y$10$V0UGdEqwXdA16cCYygHghej0xlCVuey5kd0KB9z9EPWAUtEHnLNki', '', '2026-05-24 19:01:29', '2026-05-24 19:13:30', 'active', 0, 0, 0, 0, 0, NULL),
(306, 'ABDULAZIZ', 'baharos48@gmail.com', '$2y$10$UKMM4FAU0mi.Hi2JAJWEgercIAHTl3jV/yaO1Zo1O6SJZti0Kkg62', '', '2026-05-25 10:13:53', '2026-05-25 21:58:22', 'active', 0, 0, 0, 0, 0, NULL),
(307, 'Abwaan Hamse Haji', 'antonioahmed402@gmail.com', '$2y$10$37zubdkNcZvgX6grm4X5BO9Weh/7dV9xUP1X8QKwQnxtMY2xdLC86', '', '2026-05-25 18:54:25', '2026-05-25 18:58:05', 'active', 0, 0, 0, 0, 0, NULL),
(308, 'Abaas', 'abasabdi241@gmail.com', '$2y$10$fHM/0DiVkCLfCMMlcpgHceognRifsPNBmJndfZ3gIybA5depZx4UC', '', '2026-05-25 19:18:28', '2026-05-25 23:32:02', 'active', 0, 0, 0, 0, 0, NULL),
(309, 'Kaahin', 'prokahin432@gmail.com', '$2y$10$FLkNv0tGrfm6/S0KyP5DNOPk976aHcgvxBmxT.jvzjcCRgxDUNvhi', '', '2026-05-25 21:02:16', '2026-05-25 21:05:26', 'active', 0, 0, 0, 0, 0, NULL),
(310, 'yusuf maxamad', 'yusufmaxamadsaid@gmail.com', '$2y$10$WKbwFG321kFfPQf9IYz4POdcK.qooxtCYDUfBo/FzsPkja4/KZMS2', '', '2026-05-25 22:40:29', '2026-05-25 22:40:29', 'active', 0, 0, 0, 0, 0, NULL),
(311, 'OSMAAN', 'Othmaanahmed234@gmail.com', '$2y$10$xMHOjVof6mKoId9tcGrYU.s5vBHPse9JyR0Q6.Ftfyf1WOcHUFFmq', '', '2026-05-26 03:35:47', '2026-05-26 03:54:40', 'active', 0, 0, 0, 0, 0, NULL),
(312, 'Anna', 'asmamukhtaar404@gmail.com', '$2y$10$8zVKkJ21twjft/M4cvzfqe5xT80e06oRF4bOoiIP0RhuYYt8Td6JO', '', '2026-05-27 06:38:15', '2026-05-27 06:42:28', 'active', 0, 0, 0, 0, 0, NULL),
(313, 'Sakariye', 'sakariyeismail414@gmail.com', '$2y$10$dZ4LKZjLoE9gZyGrAIFJeON8l1vk2FyKV.yugTFoD9aGMagV767I6', '', '2026-05-28 09:49:22', '2026-05-28 10:31:08', 'active', 0, 0, 0, 0, 0, NULL),
(314, 'Awal Abdi', 'ismailawaldargo13@gmail.com', '', '', '2026-05-28 09:57:33', '2026-05-28 10:05:50', 'active', 0, 0, 0, 0, 0, NULL),
(315, 'Awal Cabdi', 'awalcabdi2@gmail.com', '', '', '2026-05-28 10:06:29', '2026-05-28 10:10:58', 'active', 0, 0, 0, 0, 0, NULL),
(316, 'suhayb', 'zuhaybawil@gmail.com', '$2y$10$mwxqgHXDYGuL.1d963XZSe7YBm4hN.jkzfsqg0H9I13wIc5B6FBcu', '', '2026-05-28 13:17:36', '2026-05-28 13:17:50', 'active', 0, 0, 0, 0, 0, NULL),
(317, 'Axmed sacad', 'axmedyasiiin360@gmail.com', '$2y$10$Ecl2G.Zggq.lRHPSUhsjhuuIVszRrzuxrEO1/OyWQSjm3Akw0XEf.', '', '2026-05-28 16:07:35', '2026-05-28 16:12:42', 'active', 0, 0, 0, 0, 0, NULL),
(318, 'Muuse Ahmed mohamed', 'muuseaxmedciiro34@gmail.com', '$2y$10$tNU2a6HZu5zKqmmOFCvrNOAVyAL9ubBwhtV/3kQzH3owmc4zPjgVe', '', '2026-05-29 03:20:52', '2026-05-29 03:29:58', 'active', 0, 0, 0, 0, 0, NULL),
(319, 'Khadro cabdi', 'moshtaqcabdi@gmail.com', '$2y$10$C0FlnhQKzMdQBLZH/LzUJ.3UuTWLDptoQ9jf/W2E3bsFbo6x7WyGi', '', '2026-05-29 12:27:42', '2026-05-29 12:28:17', 'active', 0, 0, 0, 0, 0, NULL),
(320, 'Maryan', 'maryanuptirashiid100@gmail.com', '$2y$10$Exf3aRWa1bYUcrWYHrom0.8zntdaIlMbZlZWmKrKqzCtBDXSSq4/q', '', '2026-05-30 06:57:18', '2026-05-30 07:11:11', 'active', 0, 0, 0, 0, 0, NULL),
(321, 'Hafsa Ahmed Mohamed', 'Dhoolahmedeey@gmail.com', '$2y$10$g0lSTJbsCkww52v3lSBdu.0YMzlMC/5eJppTcnllk.zXzfXvx7ore', '', '2026-05-30 15:23:27', '2026-06-26 12:51:35', 'active', 0, 0, 0, 0, 0, NULL),
(322, 'Fathi Mahamut', 'fathimahamut6@gmail.com', '', '', '2026-05-31 19:32:06', '2026-05-31 19:52:26', 'active', 0, 0, 0, 0, 0, NULL),
(323, 'Hamze Mukhtar', 'hamzemkhtr@gmail.com', '', '', '2026-06-01 04:39:41', '2026-06-01 04:39:41', 'active', 0, 0, 0, 0, 0, NULL),
(324, 'maxamuud ismail', 'maxamuudismail601@gmail.com', '', '', '2026-06-02 14:46:21', '2026-06-02 14:51:27', 'active', 0, 0, 0, 0, 0, NULL),
(325, 'Ahmedmahamed Haashi', 'ahmedmahamedhaashi2@gmail.com', '', '', '2026-06-02 21:23:43', '2026-06-02 21:24:05', 'active', 0, 0, 0, 0, 0, NULL),
(326, 'Ayaanle Abdikariim', 'ayaanleabdikariim74@gmail.com', '', '', '2026-06-03 13:53:43', '2026-06-03 13:55:02', 'active', 0, 0, 0, 0, 0, NULL),
(327, 'Abdiraxmaan', 'maaan05.2010@gemail.com', '$2y$10$OzGT81olBdI.ttwhHbYQOef9O/w0fB9oJYukOc.klKlqB48qkwCve', '', '2026-06-03 16:15:40', '2026-06-03 16:16:04', 'active', 0, 0, 0, 0, 0, NULL),
(328, 'ABDURAHMAN YUSUF', 'maanyusuf678@gmail.com', '', '', '2026-06-04 05:50:52', '2026-06-04 05:51:44', 'active', 0, 0, 0, 0, 0, NULL),
(329, 'Ciise adan abdi', 'isse3274@gmail.com', '$2y$10$q4YiT9WHlODGb0SD9bRMZ.aG6yA7aH.BP.eZMGWmc5aMsLkzKWfsi', '', '2026-06-04 13:25:06', '2026-06-04 13:43:00', 'active', 0, 0, 0, 0, 0, NULL),
(330, 'Khaalid', 'cumar61259@gmail.com', '$2y$10$URNA4qE0z1dip4z8t2rIQeMEpNuQuiN5DVM8kLvUzwotmX9/5ai5C', '', '2026-06-04 20:13:52', '2026-06-04 20:13:52', 'active', 0, 0, 0, 0, 0, NULL),
(331, 'Maxamed cllaahi', 'maxamedclaahi584@gmail.com', '$2y$10$2lv65yrzRt9hjOPL7yCvyufSbwkPzlj6rPIumr3fzExIxTz1/DFU.', '', '2026-06-05 04:43:04', '2026-06-06 18:32:56', 'active', 0, 0, 0, 0, 0, NULL),
(332, 'Dowlad Lyrics', 'dowladlyrics@gmail.com', '', '', '2026-06-06 08:41:07', '2026-06-06 08:41:07', 'active', 0, 0, 0, 0, 0, NULL),
(333, 'Maxamed cllaahi maxamuud', 'maaxamedcllaahi584@gmail.com', '$2y$10$0775PLzjTQbm.l51Di2j3.pJmFdrofmQJZwmKHNSjg62M1izUC.3e', '', '2026-06-06 14:51:38', '2026-06-06 15:21:10', 'active', 0, 0, 0, 0, 0, NULL),
(334, 'Amjaad najah', 'najahclaahi75@gmail.com', '$2y$10$geU5/TRiC.A4xzJVDWK6Q.Zbdpiqm/kh1XtD2eG45/g2mXmO2t8sq', '', '2026-06-07 19:43:52', '2026-06-08 18:22:03', 'active', 0, 0, 0, 0, 0, NULL),
(335, 'suhayb maxamud', 'suheibmaxamud12@gmail.com', '', '', '2026-06-08 04:21:46', '2026-06-08 04:21:46', 'active', 0, 0, 0, 0, 0, NULL),
(336, 'Abdifitah Mohumed hared', 'abdifitahmohumedhared@gmail.com', '', '', '2026-06-08 13:00:13', '2026-07-16 03:42:34', 'active', 0, 0, 0, 0, 0, NULL),
(337, 'Muqtaar Axmed Maxamed', 'maxamedmuqtaaraxmed@gmail.com', '', '', '2026-06-09 03:37:41', '2026-06-09 03:38:34', 'active', 0, 0, 0, 0, 0, NULL),
(338, 'Apdikafi mohamed', 'abdikaffi2003@gmail.com', '$2y$10$1BVfGOXD2kXZbQB9hYv1qOmRh44Qh5fWBPebod/ogmbxMv3/gzrHi', '', '2026-06-09 05:47:14', '2026-06-09 06:01:07', 'active', 0, 0, 0, 0, 0, NULL),
(339, 'Jacob', 'yakoubahmedomer216@gmail.com', '$2y$10$QNfCtr2i/kLdLg/uPWWyq.yiUCqtukhBrEzabLcerKIEpRavgPD2O', '', '2026-06-09 21:11:57', '2026-06-09 21:11:58', 'active', 0, 0, 0, 0, 0, NULL),
(340, 'Salwa daahir', 'salwadaahir67@gmail.com', '$2y$10$VfQ3Vk78S.AZdTyZoIPEAOg1oXy0Nmx1E/BhTBp97mNHc5z9Wk1RO', '', '2026-06-11 16:12:14', '2026-06-11 16:15:07', 'active', 0, 0, 0, 0, 0, NULL),
(341, 'Sihaam Nasteex', 'sihaamnasteex@gmail.com', '', '', '2026-06-12 17:14:48', '2026-06-12 17:16:49', 'active', 0, 0, 0, 0, 0, NULL),
(342, 'Asma', 'catikahassan447@gmail.com', '$2y$10$LIIYtNo3X2jEseJC.5yT5O5bRDFcJcaY6cwjUV8o1X1aM2eNU2e6u', '', '2026-06-13 04:32:47', '2026-06-13 05:00:12', 'active', 0, 0, 0, 0, 0, NULL),
(343, 'Zuldaan', 'suldaanmuuse44@gmail.com', '$2y$10$7exQLg.WnuRDKpnQjB.h7.gmwXAn.d5BwTuJPrX7QZMo5lAKjJQ7a', '', '2026-06-13 19:58:01', '2026-06-13 19:59:37', 'active', 0, 0, 0, 0, 0, NULL),
(344, 'Sundus San', 'sundussan2@gmail.com', '', '', '2026-06-13 22:38:43', '2026-06-13 22:40:30', 'active', 0, 0, 0, 0, 0, NULL),
(345, 'Mohamad Cabdi', 'mohamadcabdi90@gmail.com', '', '', '2026-06-14 02:38:52', '2026-06-14 02:40:36', 'active', 0, 0, 0, 0, 0, NULL),
(346, 'Rahma Mohamed Isse', 'raymamohamed31@gmail.com', '', '', '2026-06-15 06:33:53', '2026-06-15 06:34:03', 'active', 0, 0, 0, 0, 0, NULL),
(347, 'Abbdale Abdirahman', 'abbdaleabdirahman@gmail.com', '', '', '2026-06-16 21:56:26', '2026-06-16 21:56:54', 'active', 0, 0, 0, 0, 0, NULL),
(348, 'AKHAS Akhas', 'akhasakhas402@gmail.com', '', '', '2026-06-18 05:14:29', '2026-06-18 05:20:49', 'active', 0, 0, 0, 0, 0, NULL),
(349, 'Raxma axmed', 'raxmaaxmed750@gmail.com', '', '', '2026-06-18 06:12:20', '2026-06-18 06:12:53', 'active', 0, 0, 0, 0, 0, NULL),
(350, 'Said ahmed', 'naaji@gmail.com', '$2y$10$ZFmRqyH.NOgO2zE5bkBM1.6VJV/ZJlgIQpKSA.DE9DOWISKo6BbOK', '', '2026-06-19 01:20:51', '2026-06-19 01:24:20', 'active', 0, 0, 0, 0, 0, NULL),
(351, 'Sakariye Salleban', 'khaalidsalleban@gmail.com', '', '', '2026-06-19 17:01:13', '2026-06-25 12:01:22', 'active', 0, 0, 0, 0, 0, NULL),
(352, 'Asiya adam', 'm61444175@gmail.com', '$2y$10$/NH5RgQjMiXkXEIvkoAZbu.5FDcq7nwgoA6w3UCAFgd8vqRO00Hu2', '', '2026-06-20 06:36:26', '2026-06-27 04:38:48', 'active', 0, 0, 0, 0, 0, NULL),
(353, 'Mohamed Faysal', 'mohamedalkhawaarsimi@gmail.com', '$2y$10$.XyoJN0VLyL.W6d5VYulqedU6pxPfp5EoTDh.EBfbH2kDEkX9LxU2', '', '2026-06-21 11:05:39', '2026-06-21 11:06:22', 'active', 0, 0, 0, 0, 0, NULL),
(354, 'Abdulkadir', 'cqaadir139@gmail.com', '$2y$10$HkdZCfYPERwX5jaea6m7T.KSUo96dMqi0DlNFxZx/KeV.HFZWcuLC', '', '2026-06-21 13:28:57', '2026-06-21 13:37:56', 'active', 0, 0, 0, 0, 0, NULL),
(355, 'Huda', 'mx0915460@gmail.com', '$2y$10$HtJ9MXz1nRIZkHJYPurkNO4Ge0dviDB7.eLMlNCs2sCaorHka8ZoW', '', '2026-06-21 15:30:03', '2026-06-21 15:36:08', 'active', 0, 0, 0, 0, 0, NULL),
(356, 'maxamud maxamed', 'mohmout98@gmail.com', '$2y$10$5CH0FMRDDSaLm6B.AkreEuM5eKAHqrD9BRLJRDaRBDBmMOZnlnH1G', '', '2026-06-21 16:37:42', '2026-06-21 16:40:45', 'active', 0, 0, 0, 0, 0, NULL),
(357, 'Istahil', 'istahilhusseinosman@gmail.com', '$2y$10$..rb5dTpfRzJRQ4/VRWVlOMrCg5mrU7ZmneAMpHF.RuYaFGdq0zTm', '', '2026-06-21 22:01:37', '2026-06-21 22:04:24', 'active', 0, 0, 0, 0, 0, NULL),
(358, 'FE TO', 'mansuun2023@gmail.com', '', '', '2026-06-21 22:02:29', '2026-06-21 22:03:09', 'active', 0, 0, 0, 0, 0, NULL),
(359, 'Fiyore', 'awosexy93@gmail.com', '$2y$10$XL.UbbHCAC3gsPhMnUpkRuffjCdaCF6znECtPWfzZVq4GvflUqdJy', '', '2026-06-22 06:50:58', '2026-06-22 06:51:39', 'active', 0, 0, 0, 0, 0, NULL),
(360, 'Deeqsi', 'deeqsiadan623@gmail.com', '$2y$10$5G5QQwVFxZ1BDha0FWc.NOh/eu/2fyK1CyedQ2vqYGHKdudrcbISe', '', '2026-06-22 14:15:22', '2026-06-22 15:09:24', 'active', 0, 0, 0, 0, 0, NULL),
(361, 'Rabdilahi91@gmail.com', 'somaliland@2027', '$2y$10$andGFxm3s0fzBmuyKFVix.OgbMiK4JPAOrmdNsZhPsEOpmH06Xerq', '', '2026-06-23 22:38:52', '2026-06-23 23:30:58', 'active', 0, 0, 0, 0, 0, NULL),
(362, 'Usaame Cali', 'usaamecali09@gmail.com', '', '', '2026-06-24 07:28:05', '2026-06-24 07:28:24', 'active', 0, 0, 0, 0, 0, NULL),
(363, 'Mohan Kaynaan', 'mohankaynaan5@gmail.com', '', '', '2026-06-24 10:32:22', '2026-06-24 10:32:23', 'active', 0, 0, 0, 0, 0, NULL),
(364, 'Nuux maxamed', 'nuuxm433@gmail.com', '$2y$10$nTexPXwLJ5peOSvlBA35ZeHxjMa2AJysi4HDZbXSawUmN1HAeDG9a', '', '2026-06-24 13:41:53', '2026-06-24 13:42:39', 'active', 0, 0, 0, 0, 0, NULL),
(365, 'Sheeko Gaaban', 'sheekogaaban356@gmail.com', '', '', '2026-06-24 14:51:54', '2026-06-24 14:52:55', 'active', 0, 0, 0, 0, 0, NULL),
(366, 'Safa Ismail', 'isafa7016@gmail.com', '', '', '2026-06-24 21:21:06', '2026-06-30 14:36:30', 'active', 0, 0, 0, 0, 0, NULL),
(367, 'maxamed yuusuf', 'muusemaxamed717@gmail.com', '', '', '2026-06-24 21:43:07', '2026-06-24 21:43:18', 'active', 0, 0, 0, 0, 0, NULL),
(368, 'Amar Abdi', 'amarabdi757@gmail.com', '', '', '2026-06-25 04:28:58', '2026-06-25 04:28:59', 'active', 0, 0, 0, 0, 0, NULL),
(369, 'Blue-Edge Solution', 'solutionblueedge@gmail.com', '', '', '2026-06-25 08:21:46', '2026-06-25 08:32:37', 'active', 0, 0, 0, 0, 0, NULL),
(370, 'Mohameth', 'mahiradan201@gmail.com', '$2y$10$Dhm1UHtYMwkgZNRAHZIae.WKIUu0lElE9W9Gfm4USMY.JWNOwAQWm', '', '2026-06-25 08:56:58', '2026-06-25 09:03:00', 'active', 0, 0, 0, 0, 0, NULL),
(371, 'Ibraa Hin', 'hinibraa96@gmail.com', '', '', '2026-06-25 22:14:13', '2026-06-25 22:15:53', 'active', 0, 0, 0, 0, 0, NULL),
(372, 'Iqro omar', 'iqroomar21@gmail.com', '', '', '2026-06-26 09:54:18', '2026-06-26 09:57:57', 'active', 0, 0, 0, 0, 0, NULL),
(373, 'Abdaleh Mahdi', 'abdalehmahdi9@gmail.com', '', '', '2026-06-27 09:06:53', '2026-06-27 09:07:17', 'active', 0, 0, 0, 0, 0, NULL),
(374, 'Osama', 'oskarinhopoi@gmail.com', '$2y$10$nXcbMJk.EC/LcMH9RDh57e1T2yO0MCRYM.MKzrkzRgEfLYcRuMCi6', '', '2026-06-27 11:17:46', '2026-06-27 11:22:31', 'active', 0, 0, 0, 0, 0, NULL),
(375, 'Subeer', 'supermaxamed77@gmail.com', '$2y$10$2B8bK4YftSpLt9SriLx05eGSA1rNVNxa5CWDe4LpXlJDA9hWDNQXS', '', '2026-06-27 19:52:15', '2026-06-27 19:52:55', 'active', 0, 0, 0, 0, 0, NULL),
(376, 'Axmad', 'axmadjamaal38@gmail.com', '$2y$10$r0vwsDkx/eClvQLRcL45T.VFargUe9EX17UJV2hqmJIUhJsgC90zq', '', '2026-06-28 05:09:53', '2026-06-28 05:09:54', 'active', 0, 0, 0, 0, 0, NULL),
(377, 'Barbaraawi', 'barbaraawi029@gmail.com', '', '', '2026-06-29 09:43:20', '2026-07-01 02:57:15', 'active', 0, 0, 0, 0, 0, NULL),
(378, 'Abdirahman', 'abdirahmanmaano49@gmail.com', '$2y$10$InVf5PQj.RlhsZmXZ0p2aeDzm4y6Xh1tKDCfv1l33F6ojPxaYr1ry', '', '2026-06-29 19:30:48', '2026-06-29 19:30:48', 'active', 0, 0, 0, 0, 0, NULL),
(379, 'Faysal', 'faysalabdala758@gmail.com', '$2y$10$wpLukJHi6EWz5w4aePIHwewqb83nuVBORRp9MQejrfcmkFOEN4h0y', '', '2026-06-29 20:25:03', '2026-06-29 20:25:03', 'active', 0, 0, 0, 0, 0, NULL),
(380, 'Amiin Abdirahman', 'amiinnajax9@gmail.com', '$2y$10$2ApEOfUYy99H93828fsCf.8FLlereV8EHuHNud2SDUZwhLTZTbbhC', '', '2026-06-29 21:34:16', '2026-06-29 21:34:16', 'active', 0, 0, 0, 0, 0, NULL),
(381, 'Ibraahim xasan', 'ibraahimxasan704@gmail.com', '', '', '2026-06-30 20:52:24', '2026-06-30 21:05:02', 'active', 0, 0, 0, 0, 0, NULL),
(382, 'Tayasiir', 'hakiimoww@gmail.com', '$2y$10$K4LyHJgtdM7gEovpVKtnt.zXvMERDUMSlxMq3q8XLn9FHLcDXRKCK', '', '2026-07-01 15:41:52', '2026-07-01 15:42:31', 'active', 0, 0, 0, 0, 0, NULL),
(383, 'CABDULAAHI', 'aalkaboy456@gmail.com', '$2y$10$57HMbbcwJOYJXTINkIScZOHgwWZRC6U0TvS6gGck16HKejj87inCS', '', '2026-07-02 10:08:02', '2026-07-02 10:14:53', 'active', 0, 0, 0, 0, 0, NULL),
(384, 'Filsan xasan', 'filsanyarfilsanxasan@gmail.com', '', '', '2026-07-03 08:32:29', '2026-07-07 16:57:18', 'active', 0, 0, 0, 0, 0, NULL),
(385, 'MOHMID SHEFI MOHMOUTT', 'zaabirrs@gmail.com', '$2y$10$unlap.9cBSDOcCdL1/rYSe.74Xmuan8ZAikt.0/C5JyoR/aQM7kyy', '', '2026-07-03 18:33:11', '2026-07-03 18:48:07', 'active', 0, 0, 0, 0, 0, NULL),
(386, 'Abdulkadir Gure', 'abdul10@live.se', '$2y$10$7vnX3JH8/C955Ml5CbtULuvCgyl02nsu/WRPGbWOCgYhRWXsf3vXu', '', '2026-07-04 02:06:29', '2026-07-19 07:58:40', 'active', 0, 0, 0, 0, 0, NULL),
(387, 'Mr BaaBa', 'susafik9@gmail.com', '$2y$10$FsIfSv/vYDuAjsj.yKp9t.AnB3.WVRMs/iGurq1yWVk70cwSBInNi', '', '2026-07-04 15:00:24', '2026-07-04 15:01:19', 'active', 0, 0, 0, 0, 0, NULL),
(388, 'Rushdi mohamed', 'rushdimaxamed@gmail.com', '$2y$10$tgWhxnoRv4ogVu9fkhQRbu4uInUzD/mZuE0m8uI.s.mLIjUXuDHA.', '', '2026-07-04 20:13:53', '2026-07-04 20:48:11', 'active', 0, 0, 0, 0, 0, NULL),
(389, 'Maria Rabla', 'drmaariya5@gmail.com', '$2y$10$o3GLZlQQNqla/NjMYy8FKeXZ5B1kFUebM/naK.QIKuZcoTLnCc4ia', '', '2026-07-06 14:43:09', '2026-07-06 14:44:39', 'active', 0, 0, 0, 0, 0, NULL),
(390, 'Najma', 'najmasiciid359@gmail.com', '$2y$10$tjPN2Tg9DHXlbyJ4fao8S.pSWeFoiXidh/kWMg5SJUQGIUBcDHYhK', '', '2026-07-06 16:06:08', '2026-07-06 16:16:20', 'active', 0, 0, 0, 0, 0, NULL),
(391, 'Najiib taygs', 'inajiib68@gmail.com', '$2y$10$GxGOgVRyThrSAgVJH97YTew9lfqNDP5BvLT.ll.JBl9KDYk7efWBK', '', '2026-07-06 16:06:34', '2026-07-06 16:07:47', 'active', 0, 0, 0, 0, 0, NULL),
(392, 'Maxamed Faarax', 'maxamedfaarax123hooyo@gmail.com', '', '', '2026-07-06 17:19:39', '2026-07-06 17:29:09', 'active', 0, 0, 0, 0, 0, NULL),
(393, 'Aisha ahmed ali', 'aishaahmed0177@gmail.com', '$2y$10$5UZEYshdWDjACFMiOicYBOCloxcPn9uC1qEck0m3snY/3UBi5H24e', '', '2026-07-08 22:26:41', '2026-07-08 22:27:06', 'active', 0, 0, 0, 0, 0, NULL),
(394, 'Yasir Abdirahman', 'yasir.abdirahmn34@gmail.com', '$2y$10$e2gcXLUWDuUoLeuzsksqJurPVHZV/Vx6rGeWRgv5CwCm5bxvhZEde', '', '2026-07-09 02:23:57', '2026-07-10 01:35:15', 'active', 0, 0, 0, 0, 0, NULL),
(395, 'ayaanle Xuseen', 'ayaanlexuseen561@gmail.com', '', '', '2026-07-09 08:37:47', '2026-07-09 08:39:10', 'active', 0, 0, 0, 0, 0, NULL),
(396, 'Azimo', 'azimodahir@gmail.com', '$2y$10$Tx6lMGKa6y3jyJCy5Ml9Re1EmQisvwbSx0S76V7ChV/ozpxO2cqR.', '', '2026-07-09 08:52:31', '2026-07-09 08:55:55', 'active', 0, 0, 0, 0, 0, NULL),
(397, 'Radwan', 'radwanrawo815@gmail.com', '$2y$10$MYDJffTjLcUl5LeJIvPyiewlgd74JyAubaNpCQ50vYDqOngk2Y4lq', '', '2026-07-10 19:58:53', '2026-07-10 19:59:12', 'active', 0, 0, 0, 0, 0, NULL),
(398, 'siciid Mohamed', 'siciidhaibe@gmail.com', '', '', '2026-07-11 18:54:50', '2026-07-11 18:59:34', 'active', 0, 0, 0, 0, 0, NULL),
(399, 'Mubaarig Xasan', 'mubaarigx50@gmail.com', '', '', '2026-07-12 13:27:54', '2026-07-12 14:24:13', 'active', 0, 0, 0, 0, 0, NULL),
(400, 'Muna Ali', 'munacali4445@gmail.com', '$2y$10$NH1.JvUqm7AeTbldV2HJle8hlqf5FlvCckz4oa1c/NJAGLE/PDSYm', '', '2026-07-12 20:09:32', '2026-07-12 20:12:53', 'active', 0, 0, 0, 0, 0, NULL),
(401, 'Abdi Muuse', 'abdimuuse8148@gmail.com', '', '', '2026-07-13 09:37:28', '2026-07-13 09:44:50', 'active', 0, 0, 0, 0, 0, NULL),
(402, 'Saacid Cabdullahi ky', 'saacidcabdullahiky@gmail.com', '', '', '2026-07-13 10:30:20', '2026-07-13 10:30:50', 'active', 0, 0, 0, 0, 0, NULL),
(403, 'saacid akhaa', 'saacidakhaa@gmail.com', '', '', '2026-07-13 10:31:06', '2026-07-13 10:31:46', 'active', 0, 0, 0, 0, 0, NULL),
(404, 'Jama Ahmed', 'jamacahmed29ss@gmail.com', '', '', '2026-07-13 22:32:51', '2026-07-13 22:33:39', 'active', 0, 0, 0, 0, 0, NULL),
(405, 'Zakia mohamed ibrahim', 'zakiamahamed549@gmail.com', '$2y$10$v.A5MZsbyqYB.XBnpFb5Z.a7wqB/VwW3e4mvQME3pqHBYbBppas.y', '', '2026-07-14 06:46:13', '2026-07-14 06:48:06', 'active', 0, 0, 0, 0, 0, NULL),
(406, 'Hamza', 'hamzemoh100@gmail.com', '$2y$10$ZuOAwZg2XRz5CaJSuKe8Xe6pi/Gw6HRIAOEvNAdkJFCTJBF52F9Fq', '', '2026-07-14 15:36:17', '2026-07-14 15:36:17', 'active', 0, 0, 0, 0, 0, NULL),
(407, 'Rahma Roofa', 'rahmaroofa@gmail.com', '', '', '2026-07-14 19:18:25', '2026-07-14 19:25:05', 'active', 0, 0, 0, 0, 0, NULL),
(408, 'Hana mohamed', 'hannamoheth@gmail.com', '$2y$10$lAkdidlLs4ZkudztxqFCnOPaMY2cH7dW3j5AW9ghByNMxxZgxxcj.', '', '2026-07-14 21:23:31', '2026-07-14 21:23:57', 'active', 0, 0, 0, 0, 0, NULL),
(409, 'Sadiq Jamac', 'sadiqjamac859@gmail.com', '', '', '2026-07-14 23:36:01', '2026-07-14 23:37:49', 'active', 0, 0, 0, 0, 0, NULL),
(410, 'Anfac Mahdi', 'anfacmahdi28@gmail.com', '', '', '2026-07-15 16:50:22', '2026-07-15 16:56:57', 'active', 0, 0, 0, 0, 0, NULL),
(411, 'Mubaarig Xasan1', 'mubaarigxasan70@gmail.com', '', '', '2026-07-16 14:48:01', NULL, 'active', 0, 0, 0, 0, 0, NULL),
(412, 'Khalid cabdi nasaaiir', 'khalidcabdinasiir@gmail.com', '$2y$10$qPWz2.4QgxiMxuxGy5f/Re.uFnAELkNpu64.TiwBsQRnOxZHni0Zy', '', '2026-07-17 19:58:10', '2026-07-17 20:07:33', 'active', 0, 0, 0, 0, 0, NULL),
(413, 'Sihaam Khadar', 'sihaam3332@gmail.com', '', '', '2026-07-18 07:21:34', '2026-07-19 05:36:05', 'active', 0, 0, 0, 0, 0, NULL),
(414, 'Qadar Cabdullahi', 'qadarcabdullahi22@gmail.com', '', '', '2026-07-18 07:29:57', '2026-07-18 07:34:33', 'active', 0, 0, 0, 0, 0, NULL),
(415, 'Mohamett', 'xmohamett8@gmail.com', '$2y$10$5/un2lQouSlHH5zmstBmjuzOrZiBBF.jNm7StbBUcMQW3dsIjhA2G', '', '2026-07-18 19:58:51', '2026-07-18 19:58:51', 'active', 0, 0, 0, 0, 0, NULL),
(416, 'Axmed Yare', 'axmedyare46605@gmail.com', '', '', '2026-07-19 10:13:36', '2026-07-19 10:14:16', 'active', 0, 0, 0, 0, 0, NULL);
INSERT INTO "user_books" ("user_book_id", "user_id", "book_id", "payment_id", "access_count", "last_accessed", "acquired_date", "reading_status", "rating", "review_id") VALUES
(18, 10, 35, 15, 0, NULL, '2025-11-21 18:16:27', 'not_started', NULL, NULL),
(19, 11, 37, 16, 0, NULL, '2025-11-21 19:49:09', 'not_started', NULL, NULL),
(20, 3, 37, 17, 0, NULL, '2025-11-24 11:37:26', 'not_started', NULL, NULL),
(21, 17, 44, 18, 0, NULL, '2025-11-25 10:14:47', 'not_started', NULL, NULL),
(22, 17, 37, 19, 0, NULL, '2025-11-25 10:53:05', 'not_started', NULL, NULL),
(23, 3, 46, 20, 0, NULL, '2025-11-25 14:22:30', 'not_started', NULL, NULL),
(24, 18, 44, 21, 0, NULL, '2025-11-29 15:00:48', 'not_started', NULL, NULL),
(25, 39, 35, 23, 0, NULL, '2025-12-19 12:41:24', 'not_started', NULL, NULL),
(26, 43, 46, 25, 0, NULL, '2025-12-21 06:26:07', 'not_started', NULL, NULL),
(27, 47, 42, 26, 0, NULL, '2025-12-23 14:10:04', 'not_started', NULL, NULL),
(28, 36, 42, 27, 0, NULL, '2025-12-23 16:22:45', 'not_started', NULL, NULL),
(29, 49, 37, 28, 0, NULL, '2025-12-23 16:44:25', 'not_started', NULL, NULL),
(30, 50, 42, 29, 0, NULL, '2025-12-25 01:23:45', 'not_started', NULL, NULL),
(31, 39, 37, 30, 0, NULL, '2026-01-01 08:48:57', 'not_started', NULL, NULL),
(32, 3, 49, 31, 0, NULL, '2026-01-03 21:24:48', 'not_started', NULL, NULL),
(33, 63, 42, 32, 0, NULL, '2026-01-06 08:32:53', 'not_started', NULL, NULL),
(34, 64, 49, 33, 0, NULL, '2026-01-06 18:03:09', 'not_started', NULL, NULL),
(35, 3, 50, 34, 0, NULL, '2026-01-08 16:59:38', 'not_started', NULL, NULL),
(36, 70, 50, 35, 0, NULL, '2026-01-08 19:15:33', 'not_started', NULL, NULL),
(37, 3, 54, 36, 0, NULL, '2026-01-13 18:12:44', 'not_started', NULL, NULL),
(38, 74, 42, 37, 0, NULL, '2026-01-15 03:00:59', 'not_started', NULL, NULL),
(39, 96, 54, 38, 0, NULL, '2026-02-01 16:55:05', 'not_started', NULL, NULL),
(40, 99, 37, 39, 0, NULL, '2026-02-03 12:31:01', 'not_started', NULL, NULL),
(41, 123, 42, 40, 0, NULL, '2026-02-16 16:39:59', 'not_started', NULL, NULL),
(42, 126, 37, 41, 0, NULL, '2026-02-17 17:17:33', 'not_started', NULL, NULL),
(43, 130, 35, 42, 0, NULL, '2026-02-18 08:38:17', 'not_started', NULL, NULL),
(44, 133, 36, 43, 0, NULL, '2026-02-18 18:17:28', 'not_started', NULL, NULL),
(45, 136, 54, 44, 0, NULL, '2026-02-20 09:53:19', 'not_started', NULL, NULL),
(46, 136, 51, 45, 0, NULL, '2026-02-20 10:16:55', 'not_started', NULL, NULL),
(47, 136, 50, 46, 0, NULL, '2026-02-20 10:32:59', 'not_started', NULL, NULL),
(48, 136, 42, 50, 0, NULL, '2026-02-20 13:06:24', 'not_started', NULL, NULL),
(49, 136, 45, 49, 0, NULL, '2026-02-20 13:06:43', 'not_started', NULL, NULL),
(50, 136, 36, 48, 0, NULL, '2026-02-20 13:06:49', 'not_started', NULL, NULL),
(51, 140, 50, 51, 0, NULL, '2026-02-21 20:53:39', 'not_started', NULL, NULL),
(52, 83, 44, 52, 0, NULL, '2026-02-22 08:39:05', 'not_started', NULL, NULL),
(53, 151, 42, 53, 0, NULL, '2026-02-24 18:28:39', 'not_started', NULL, NULL),
(54, 136, 35, 56, 0, NULL, '2026-02-25 13:40:05', 'not_started', NULL, NULL),
(55, 136, 37, 55, 0, NULL, '2026-02-25 13:40:09', 'not_started', NULL, NULL),
(56, 136, 46, 54, 0, NULL, '2026-02-25 13:40:13', 'not_started', NULL, NULL),
(57, 152, 49, 57, 0, NULL, '2026-02-25 14:37:14', 'not_started', NULL, NULL),
(58, 152, 42, 58, 0, NULL, '2026-02-26 07:57:26', 'not_started', NULL, NULL),
(59, 155, 42, 59, 0, NULL, '2026-03-02 08:20:44', 'not_started', NULL, NULL),
(60, 164, 35, 60, 0, NULL, '2026-03-05 18:17:47', 'not_started', NULL, NULL),
(61, 167, 42, 61, 0, NULL, '2026-03-06 13:38:01', 'not_started', NULL, NULL),
(62, 3, 43, 62, 0, NULL, '2026-03-06 19:26:00', 'not_started', NULL, NULL),
(63, 3, 42, 63, 0, NULL, '2026-03-06 19:41:30', 'not_started', NULL, NULL),
(64, 173, 43, 64, 0, NULL, '2026-03-10 13:50:49', 'not_started', NULL, NULL),
(65, 171, 50, 65, 0, NULL, '2026-03-13 06:24:00', 'not_started', NULL, NULL),
(66, 176, 52, 66, 0, NULL, '2026-03-15 08:24:02', 'not_started', NULL, NULL),
(67, 176, 50, 67, 0, NULL, '2026-03-15 08:26:37', 'not_started', NULL, NULL),
(68, 176, 42, 68, 0, NULL, '2026-03-15 08:27:33', 'not_started', NULL, NULL),
(69, 176, 35, 69, 0, NULL, '2026-03-15 08:30:02', 'not_started', NULL, NULL),
(70, 185, 35, 71, 0, NULL, '2026-03-25 15:44:33', 'not_started', NULL, NULL),
(71, 188, 37, 72, 0, NULL, '2026-03-28 14:34:54', 'not_started', NULL, NULL),
(72, 49, 35, 73, 0, NULL, '2026-03-28 15:29:16', 'not_started', NULL, NULL),
(73, 195, 35, 75, 0, NULL, '2026-04-01 18:20:45', 'not_started', NULL, NULL),
(74, 3, 52, 76, 0, NULL, '2026-04-05 19:57:47', 'not_started', NULL, NULL),
(75, 3, 51, 77, 0, NULL, '2026-04-05 19:59:34', 'not_started', NULL, NULL),
(76, 201, 54, 78, 0, NULL, '2026-04-07 22:14:51', 'not_started', NULL, NULL),
(77, 205, 36, 79, 0, NULL, '2026-04-10 21:19:07', 'not_started', NULL, NULL),
(78, 207, 50, 80, 0, NULL, '2026-04-11 22:06:28', 'not_started', NULL, NULL),
(79, 207, 37, 81, 0, NULL, '2026-04-11 22:08:44', 'not_started', NULL, NULL),
(80, 209, 35, 82, 0, NULL, '2026-04-12 14:36:25', 'not_started', NULL, NULL),
(81, 3, 45, 83, 0, NULL, '2026-04-13 22:55:47', 'not_started', NULL, NULL),
(82, 211, 44, 84, 0, NULL, '2026-04-17 18:07:28', 'not_started', NULL, NULL),
(83, 213, 54, 85, 0, NULL, '2026-04-18 11:10:27', 'not_started', NULL, NULL),
(84, 214, 54, 86, 0, NULL, '2026-04-18 20:12:06', 'not_started', NULL, NULL),
(85, 3, 66, 87, 0, NULL, '2026-04-20 15:58:44', 'not_started', NULL, NULL),
(86, 210, 45, 88, 0, NULL, '2026-04-27 05:00:17', 'not_started', NULL, NULL),
(87, 239, 54, 91, 0, NULL, '2026-05-07 19:23:28', 'not_started', NULL, NULL),
(88, 235, 66, 92, 0, NULL, '2026-05-08 11:24:10', 'not_started', NULL, NULL),
(89, 245, 66, 93, 0, NULL, '2026-05-08 19:30:34', 'not_started', NULL, NULL),
(90, 245, 42, 94, 0, NULL, '2026-05-09 10:53:00', 'not_started', NULL, NULL),
(91, 250, 35, 95, 0, NULL, '2026-05-09 16:45:59', 'not_started', NULL, NULL),
(92, 249, 66, 97, 0, NULL, '2026-05-10 07:04:36', 'not_started', NULL, NULL),
(93, 251, 35, 96, 0, NULL, '2026-05-10 12:05:56', 'not_started', NULL, NULL),
(94, 254, 66, 98, 0, NULL, '2026-05-10 21:15:23', 'not_started', NULL, NULL),
(95, 260, 50, 100, 0, NULL, '2026-05-12 19:46:05', 'not_started', NULL, NULL),
(96, 267, 66, 101, 0, NULL, '2026-05-13 09:52:10', 'not_started', NULL, NULL),
(97, 260, 66, 102, 0, NULL, '2026-05-13 16:35:06', 'not_started', NULL, NULL),
(98, 259, 50, 103, 0, NULL, '2026-05-14 08:19:00', 'not_started', NULL, NULL),
(99, 263, 52, 105, 0, NULL, '2026-05-15 16:04:38', 'not_started', NULL, NULL),
(100, 263, 66, 104, 0, NULL, '2026-05-15 16:04:43', 'not_started', NULL, NULL),
(101, 263, 35, 107, 0, NULL, '2026-05-15 18:58:32', 'not_started', NULL, NULL),
(102, 263, 49, 108, 0, NULL, '2026-05-15 19:47:38', 'not_started', NULL, NULL),
(103, 263, 36, 106, 0, NULL, '2026-05-15 19:47:42', 'not_started', NULL, NULL),
(104, 277, 36, 110, 0, NULL, '2026-05-18 13:16:44', 'not_started', NULL, NULL),
(105, 277, 35, 109, 0, NULL, '2026-05-18 13:16:48', 'not_started', NULL, NULL),
(106, 266, 42, 112, 0, NULL, '2026-05-21 14:44:22', 'not_started', NULL, NULL),
(107, 308, 66, 116, 0, NULL, '2026-05-25 22:12:14', 'not_started', NULL, NULL),
(108, 321, 66, 117, 0, NULL, '2026-05-30 18:54:16', 'not_started', NULL, NULL),
(109, 245, 54, 118, 0, NULL, '2026-06-01 22:46:39', 'not_started', NULL, NULL),
(110, 331, 46, 120, 0, NULL, '2026-06-06 16:19:02', 'not_started', NULL, NULL),
(111, 334, 54, 121, 0, NULL, '2026-06-07 20:29:36', 'not_started', NULL, NULL),
(112, 336, 45, 122, 0, NULL, '2026-06-08 14:36:56', 'not_started', NULL, NULL),
(113, 352, 44, 123, 0, NULL, '2026-06-20 06:54:42', 'not_started', NULL, NULL),
(114, 277, 66, 124, 0, NULL, '2026-06-21 06:04:17', 'not_started', NULL, NULL),
(115, 354, 42, 125, 0, NULL, '2026-06-21 13:34:14', 'not_started', NULL, NULL),
(116, 99, 44, 126, 0, NULL, '2026-06-23 12:38:02', 'not_started', NULL, NULL),
(117, 361, 66, 127, 0, NULL, '2026-06-23 22:47:02', 'not_started', NULL, NULL),
(118, 366, 44, 128, 0, NULL, '2026-06-24 21:25:25', 'not_started', NULL, NULL),
(119, 377, 66, 129, 0, NULL, '2026-06-29 09:47:20', 'not_started', NULL, NULL),
(120, 394, 42, 130, 0, NULL, '2026-07-09 09:54:43', 'not_started', NULL, NULL),
(121, 394, 49, 132, 0, NULL, '2026-07-09 09:54:51', 'not_started', NULL, NULL),
(122, 394, 50, 131, 0, NULL, '2026-07-09 09:54:55', 'not_started', NULL, NULL),
(123, 99, 66, 133, 0, NULL, '2026-07-15 10:45:11', 'not_started', NULL, NULL),
(124, 414, 42, 134, 0, NULL, '2026-07-18 07:51:28', 'not_started', NULL, NULL),
(125, 386, 35, 135, 0, NULL, '2026-07-19 03:38:14', 'not_started', NULL, NULL),
(126, 413, 42, 136, 0, NULL, '2026-07-19 05:34:18', 'not_started', NULL, NULL),
(127, 386, 36, 137, 0, NULL, '2026-07-19 07:56:11', 'not_started', NULL, NULL),
(128, 386, 42, 138, 0, NULL, '2026-07-19 07:56:19', 'not_started', NULL, NULL);
INSERT INTO "user_sessions" ("id", "user_id", "session_id", "last_activity", "ip_address", "user_agent", "created_at") VALUES
(2, 3, 'nq5ndhedllafbhf9qhbqsi7vt5', '2026-02-08 14:41:59', '154.115.223.125', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', '2026-02-04 01:11:06'),
(4, 99, 'p0urfcbmvp7p8rnejbkga2s556', '2026-02-04 19:32:28', '197.231.201.219', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-04 08:16:26'),
(63, 3, '2sgmlpuiq1mltf8d98sca5ea84', '2026-02-04 09:22:48', '154.115.222.151', 'Mozilla/5.0 (Linux; Android 14; SM-A725F Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Xuyloqc/4.0 Chrome/144.0.7559.59 Mobile Safari/537.36', '2026-02-04 09:19:55'),
(228, 103, '0sa9bb5gjnfg7v8e6tqf05lf6c', '2026-02-05 04:44:02', '2600:1014:b063:d280:48f0:9793:1e2b:9f13', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_43.5.0 BytedanceWebview/d8a21c6', '2026-02-05 04:35:41'),
(238, 99, 'frptqd00l9a63griq8rc4an591', '2026-02-05 20:11:19', '197.231.201.218', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-05 05:02:38'),
(281, 47, 'vm8pk89q5h32eccmjesqp7256a', '2026-02-05 09:58:38', '2a02:3030:2:78c9:ef3c:3d11:afa8:fdd7', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-05 09:12:09'),
(443, 3, 'o4v81radg54p794l9cm72qja4o', '2026-03-14 23:29:56', '197.231.201.162', 'Mozilla/5.0 (Linux; Android 14; SM-A725F Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Xuyloqc/4.0 Chrome/144.0.7559.59 Mobile Safari/537.36', '2026-02-05 18:17:37'),
(470, 96, '249pbhc94mpra80pheonbes1r2', '2026-02-05 19:54:39', '154.115.237.53', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', '2026-02-05 18:48:22'),
(629, 104, 'qvhnd8qvpcm8bknpbvia9e1oqo', '2026-02-05 20:48:11', '197.231.201.242', 'Mozilla/5.0 (Linux; Android 13; SM-M127G Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.109 Mobile Safari/537.36 musical_ly_2024305040 AppName/musical_ly ByteLocale/en-GB', '2026-02-05 20:43:44'),
(666, 105, 'tf8i7u18bq7kjaftak8tab8oa2', '2026-02-07 06:22:34', '197.231.202.245', 'Mozilla/5.0 (Linux; Android 15; SM-A155F Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.109 Mobile Safari/537.36 musical_ly_2024307030 AppName/musical_ly ByteLocale/en-GB', '2026-02-07 06:19:50'),
(673, 47, '5pjii8307cqiahvo2k3fgucmlb', '2026-02-07 10:26:39', '2a02:3030:a75:bc0d:426b:2d2b:670e:a382', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-07 10:17:58'),
(704, 106, 'vf4fsbaqaouejp2e4uul40bf6d', '2026-02-07 15:06:18', '72.52.87.28', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-07 15:03:35'),
(710, 36, 'c245jn96ismnsmebcdjjuuhv3f', '2026-02-07 19:22:02', '154.115.245.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-07 19:01:55'),
(759, 107, '9oka0cfl72v1nn2v6n00goi7or', '2026-02-07 20:16:54', '197.231.201.224', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_42.7.0 BytedanceWebview/d8a21c6', '2026-02-07 20:16:54'),
(760, 108, '8s3ivpvpu003v2vmtrh74brk8a', '2026-02-08 03:38:17', '57.128.190.124', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Mobile Safari/537.36', '2026-02-08 03:37:46'),
(794, 99, 'u60ap822qkrstprokcs3qi2ihq', '2026-02-08 11:32:33', '197.231.200.7', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-08 07:40:59'),
(826, 63, 'dtgdp57vlblvd707jg1o2m88dt', '2026-02-08 21:20:33', '102.128.131.231', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-02-08 21:04:04'),
(849, 63, 'a2vprbgu364cte6f9am9g67han', '2026-02-09 07:21:57', '102.128.131.172', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-02-09 07:20:19'),
(870, 109, 'dtbbv5evv6g3t6kbk64tj2fvtu', '2026-02-09 09:00:39', '197.220.84.26', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-09 08:55:34'),
(887, 99, 'ea1t2moh9du8ef8qpngvs7h7g5', '2026-02-09 19:37:27', '197.231.201.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-09 11:08:42'),
(1207, 39, 'o8gclbd9jk5rprdenc2q5ieteb', '2026-02-10 08:32:22', '154.115.221.122', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-10 08:15:42'),
(1215, 99, 'pdlh0voaa78qu6noqb5slfhrmd', '2026-02-10 19:38:21', '197.231.200.7', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-10 08:38:47'),
(1335, 110, 'o7p5ghr5e5epgkicmlh7vpvhis', '2026-02-10 11:05:07', '102.210.126.17', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-10 11:03:26'),
(1341, 111, '4t2pb5ofuosf9aceu95cie7s2d', '2026-02-10 14:15:20', '154.115.231.194', 'Mozilla/5.0 (Linux; Android 15; SM-A155F Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.109 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en-GB', '2026-02-10 14:13:51'),
(1617, 112, 'g39c60tvfvpbmen6nm7vvj1j7u', '2026-02-10 18:39:23', '196.191.71.41', 'Mozilla/5.0 (Linux; Android 15; SM-A155F Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.111 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en-GB', '2026-02-10 18:37:13'),
(1674, 113, 'h88is7u4a9lonto1rp9kbmad67', '2026-02-10 21:14:29', '197.231.201.165', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-10 21:08:59'),
(1715, 114, 'oin769lp6rblenr56332vc4t0b', '2026-02-12 08:26:36', '102.38.51.89', 'Mozilla/5.0 (Linux; Android 16; Pixel 9 Pro XL Build/BP4A.260105.004.E1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.109 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en', '2026-02-12 08:20:19'),
(1731, 115, 'dojt1obm02ifcudpe84vtlncie', '2026-02-12 08:31:01', '192.145.168.186', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-12 08:28:49'),
(1734, 99, '3lr2h756b5lfrniuv9hthaer9d', '2026-02-12 18:56:07', '197.231.201.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-12 18:52:12'),
(1758, 116, 'bnrblh8ma3chm7nh2l0j0rb3db', '2026-02-13 20:53:49', '41.79.198.19', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-13 20:52:40'),
(1769, 117, 'mbu4qlnn99r4je1flmgoaju6lh', '2026-02-15 18:45:33', '154.115.236.1', 'Mozilla/5.0 (Linux; Android 13; SAMSUNG SM-A032F Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 SamsungBrowser/7.4 Chrome/144.0.7559.109 Mobile Safari/537.36', '2026-02-14 03:36:45'),
(1777, 116, 'm640milqfgpolbkdjrblvje5hr', '2026-02-14 11:50:31', '41.79.198.19', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-14 11:48:34'),
(1783, 119, '54rlp1bc1h2mak8taenaslmakh', '2026-02-14 16:05:14', '154.115.231.224', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-14 15:22:33'),
(1802, 120, 'rq7lp9vnh3ltqd34mgk9hf9rbm', '2026-02-15 13:53:47', '102.214.170.254', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-15 13:51:51'),
(1811, 121, 'j7sqkh7c84pp2d9d8f68qs8r69', '2026-02-16 16:43:16', '41.78.74.78', 'Mozilla/5.0 (Linux; Android 15; SM-A165F Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en', '2026-02-16 14:52:20'),
(1812, 122, 'rk83jh9bba4vjaqpqn4mlci8vk', '2026-02-16 15:01:33', '2001:56a:6f90:3ab4:1c00:6410:6357:557b', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-02-16 15:01:33'),
(1826, 123, 'i58kr9ffvdn0ms6prbpk49vje9', '2026-02-16 16:47:28', '192.145.175.200', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-16 16:38:07'),
(1881, 3, '9sp2rc5u2iidh6iej70v0oqd2v', '2026-02-16 16:49:59', '197.231.201.208', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-02-16 16:43:30'),
(1945, 124, 'rjmqjjnli347s7qv74aeklre42', '2026-02-17 04:48:56', '197.231.201.160', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_43.0.0 BytedanceWebview/d8a21c6', '2026-02-17 04:45:45'),
(1952, 125, 'kl0io9n7nrgg8ihhq9udg5usms', '2026-02-17 11:12:42', '154.115.232.143', 'Mozilla/5.0 (Linux; Android 13; SM-M127G Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Safari/537.36 musical_ly_2024101030 AppName/musical_ly ByteLocale/en-GB', '2026-02-17 11:05:15'),
(2012, 126, '3f4ll03dh8v6nu45nk1ldash10', '2026-02-17 17:29:16', '102.223.188.25', 'Mozilla/5.0 (Linux; Android 12; SM-A115F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en-GB', '2026-02-17 16:09:50'),
(2024, 127, 'imn7fc8imm2nfrl72gk36hucde', '2026-02-17 17:09:02', '154.115.221.93', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-17 17:06:13'),
(2033, 126, '85c0823i7gkok0odop2ru67vk3', '2026-02-17 17:25:35', '102.223.188.36', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-17 17:14:03'),
(2082, 128, '8ou1sgroe0k26gbif8akc5eiof', '2026-02-17 19:38:36', '41.223.109.220', 'Mozilla/5.0 (Linux; Android 15; SM-A145F Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024309030 AppName/musical_ly ByteLocale/en-GB', '2026-02-17 19:36:50'),
(2093, 129, '9c0e0q85bgq6kuvbker7kbt4li', '2026-02-17 19:47:39', '105.161.183.153', 'Mozilla/5.0 (Linux; Android 16; SM-A165F Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en-GB', '2026-02-17 19:47:15'),
(2095, 18, '92h1t20bgt78ujbg27mvl9mrqp', '2026-02-17 20:15:01', '192.145.168.189', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-17 20:13:35'),
(2127, 126, '2e4q53fpmeurf4cjaj8p9hlco1', '2026-02-18 06:36:56', '102.223.188.36', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-18 03:14:01'),
(2270, 130, '9796jnmv2qj8cb704tdiaj3m04', '2026-02-18 07:02:41', '192.145.174.214', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Safari/537.36', '2026-02-18 06:53:44'),
(2277, 130, 'f3r8htco1rl6i0p0he8at6vnnl', '2026-02-18 08:55:28', '192.145.174.214', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Safari/537.36', '2026-02-18 08:49:30'),
(2300, 131, 'h5tgr5ij9fgs97ejpch39pev1u', '2026-02-18 11:23:48', '102.220.40.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-02-18 11:20:02'),
(2307, 132, 'qedq6kthsec6mra675mikvo9ek', '2026-02-18 14:53:13', '41.223.109.217', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 trill_42.8.0 BytedanceWebview/d8a21c6', '2026-02-18 14:12:41'),
(2387, 133, 'ifgc7jb7bu9spdgom0mm6ejqds', '2026-02-18 18:23:54', '192.145.168.76', 'Mozilla/5.0 (Linux; Android 15; SM-A057F Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en-GB', '2026-02-18 17:54:37'),
(2398, 133, '01cbil2dnm9vvh679pc69tuep9', '2026-02-18 18:21:30', '192.145.168.76', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-18 18:15:42'),
(2454, 133, 'qeug3gu9aaoi6ods99nbhrmfvf', '2026-02-18 18:48:29', '192.145.168.76', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-18 18:24:32'),
(2565, 47, 'klr2mvb1ci4nnqq3jt0ade5seu', '2026-02-19 06:22:16', '2a02:3030:6:2959:48e4:6a84:9a0c:74ce', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-19 06:12:41'),
(2595, 134, 'ogptpa8lc3lkf842758hd07cn9', '2026-02-19 06:50:11', '192.145.174.250', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_43.7.0 BytedanceWebview/d8a21c6', '2026-02-19 06:50:11'),
(2597, 99, 'n6d18r42as8v10cplucalm7n5h', '2026-02-19 11:22:17', '197.231.201.179', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-19 11:01:56'),
(2649, 3, '5bagld3dvn2a0gd9ak5atrr3hj', '2026-02-19 14:05:19', '197.231.201.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-02-19 13:57:50'),
(2662, 135, 'bl9p1ob10g17oqaucap5f4cfq7', '2026-02-20 08:09:48', '197.220.84.25', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-20 08:09:06'),
(2664, 136, '9ns7m24ud0gfmg43kq5o63bii5', '2026-02-20 14:33:08', '154.115.222.27', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-02-20 09:36:56'),
(2932, 136, 'f7gmdvf1ludg4k09sgkq4cld16', '2026-02-20 20:30:38', '154.115.222.27', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-02-20 20:25:15'),
(2960, 137, 'jcerqgd5bhv9qathrfc11im2mc', '2026-02-21 09:39:23', '197.241.123.242', 'Mozilla/5.0 (Linux; Android 12; HarmonyOS; OCE-AN10; HMSCore 6.15.4.342) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.196 HuaweiBrowser/16.0.12.302 Mobile Safari/537.36', '2026-02-21 09:37:06'),
(2965, 138, 'qbfpu80ht12fsfpcrig4vkedsn', '2026-02-21 12:06:24', '102.208.96.131', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-21 12:04:51'),
(2968, 99, 'i9ee1683jhpmfaqubcrj8hi568', '2026-02-21 18:27:19', '197.231.201.197', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-21 18:25:12'),
(2973, 63, 'l2lkaik6k9j2c6m9qd3h1m3mh3', '2026-02-21 20:43:07', '102.128.131.197', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/145.0.7632.55 Mobile/15E148 Safari/604.1', '2026-02-21 19:16:06'),
(3003, 140, 'u1a22r8vmmjpmg8mh97fa32gr2', '2026-02-21 19:58:27', '102.220.40.195', 'Mozilla/5.0 (Linux; Android 16; SM-A165F Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en-GB', '2026-02-21 19:58:27'),
(3040, 140, 'kuvgmta62j9sp9826ol9f2uc0b', '2026-02-21 20:54:38', '102.220.40.195', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-21 20:51:33'),
(3055, 141, '9lfj585jmhcd5bo36pmhh03ktg', '2026-02-21 23:23:40', '41.79.199.22', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-21 23:23:02'),
(3058, 142, 'q012te940n0jmub1j3pbsnvkkd', '2026-02-22 04:22:26', '197.231.201.211', 'Mozilla/5.0 (Linux; Android 13; SM-A245F Build/TP1A.220624.014; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.79 Mobile Safari/537.36 musical_ly_2024305040 AppName/musical_ly ByteLocale/en-GB', '2026-02-22 04:20:09'),
(3069, 83, 'mdfnmo756vfna3s8d03a1lrv08', '2026-02-22 09:14:02', '154.115.240.2', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-22 08:32:09'),
(3113, 143, 'omlvv5achosj5iupsjtc8pagsk', '2026-02-22 12:32:17', '197.231.203.11', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1', '2026-02-22 12:26:33'),
(3134, 3, 'bc1hk5iirmhp65mu2goqh39h7e', '2026-02-22 16:57:02', '197.231.201.162', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-02-22 16:56:38'),
(3138, 144, '7qj8the2mab5dghkmf5pkj3gok', '2026-02-23 00:18:22', '154.115.245.6', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-02-23 00:18:22'),
(3139, 83, 'juebs6eog00l72o7k0vv290gn0', '2026-02-23 05:47:09', '154.115.240.2', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-23 05:46:39'),
(3144, 145, 'lbbrkfclgli60vlj5nmo3ak45j', '2026-02-23 10:41:10', '102.141.198.157', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-02-23 10:38:45'),
(3162, 146, 'mj5rur1asrki36ki46v928orf4', '2026-02-23 11:45:25', '102.223.188.26', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-02-23 11:45:25'),
(3163, 47, '3emlk7rap0s5cfg6qpvcccau3o', '2026-02-24 04:54:34', '2a02:3030:1f:5653:515a:9409:d231:69c0', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-24 04:26:35'),
(3222, 147, 'iaa88rg3t9u0aqcd33if7bfusj', '2026-02-24 10:07:26', '154.115.231.46', 'Mozilla/5.0 (Linux; Android 16; SM-E055F Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024301040 AppName/musical_ly ByteLocale/en-GB', '2026-02-24 10:02:35'),
(3266, 148, 'eartmd3dmc0bdb5af1u8543t5t', '2026-02-24 11:12:53', '196.191.79.60', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-02-24 10:56:42'),
(3302, 149, 'it9bqtvrkn0e4vom62rpjsbumb', '2026-02-24 13:05:08', '192.145.170.186', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_43.6.1 BytedanceWebview/d8a21c6', '2026-02-24 13:04:03'),
(3307, 150, '5d57h3dboeh8hkvfr8jarnmq0t', '2026-02-24 17:39:49', '41.223.108.50', 'Mozilla/5.0 (Linux; Android 15; SM-M146B Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.132 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en-GB', '2026-02-24 16:10:17'),
(3313, 151, 'cisbunsivhoamibv1qc3tao02f', '2026-02-24 18:36:16', '197.231.201.218', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-24 18:23:45'),
(3363, 151, '42psqao0u1vep7e2c4rfh276em', '2026-02-24 19:06:00', '197.231.201.187', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-24 19:05:44'),
(3368, 47, 'npp2tket3f22ng8nbfv3kabl2u', '2026-02-24 23:44:11', '2a02:3030:1d:bb42:e4d3:6831:7f08:6e50', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-24 23:36:17'),
(3401, 83, 'h6qqa1rtdree4dsghi57vhevpi', '2026-02-25 06:50:44', '154.115.216.86', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-25 06:49:55'),
(3408, 83, 'h1cc6b145quekrj09anr67gmla', '2026-02-25 07:44:13', '154.115.240.2', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-02-25 07:42:49'),
(3428, 136, '1898ug2jk1er3pkjt7lk2vgp4a', '2026-02-25 13:43:34', '154.115.232.190', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-02-25 13:08:41'),
(3583, 152, '8tdq859tipmtirfrp2me96rjog', '2026-02-25 14:34:28', '154.115.236.27', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-25 14:27:10'),
(3595, 47, 'pcdv16islituskv70c9p7snfrd', '2026-02-26 00:28:25', '2a02:3030:0:11c8:5c80:a1fb:f494:92dc', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-26 00:22:48'),
(3616, 153, 'ubp15laom9981eief0n10ikvo8', '2026-02-26 02:30:37', '102.211.213.110', 'Mozilla/5.0 (Linux; Android 15; SM-A146B Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.79 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en', '2026-02-26 02:28:42'),
(3631, 152, 'i001g8h9aniqq74ae1n1cjla95', '2026-02-26 12:19:24', '154.115.237.104', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-02-26 07:52:19'),
(3867, 99, '807f5dc623pg09acnjm6tgr1mr', '2026-02-26 09:27:52', '197.231.201.165', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-26 08:53:42'),
(4174, 136, '5j4uktou0v60kbb1olhfcavt64', '2026-02-26 18:00:54', '154.115.231.81', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-02-26 18:00:54'),
(4175, 63, 'nujnluv6t7rek6tohnsbhhf6g4', '2026-02-26 21:28:58', '102.128.131.222', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/145.0.7632.108 Mobile/15E148 Safari/604.1', '2026-02-26 21:10:28'),
(4182, 154, 'tpau4ga8rnrj3rva90p0o02bh6', '2026-02-27 13:03:04', '85.228.124.47', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_43.8.0 BytedanceWebview/d8a21c6', '2026-02-27 12:58:11'),
(4200, 126, 'm8a6atbsrcqqb67m9mse8nmo5b', '2026-02-27 16:09:48', '102.223.188.47', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-02-27 16:09:39'),
(4204, 63, 'r09d23sdau4c9o245mmkgsfki1', '2026-02-28 12:56:02', '102.223.191.252', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '2026-02-27 21:23:12'),
(4408, 136, '34vegfqn42nf40urnn0fcmavp6', '2026-02-28 00:37:47', '154.115.235.121', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-02-28 00:37:47'),
(4409, 47, 'v0tkqthjd97fril4qtl6ndj0sm', '2026-02-28 10:39:20', '2a02:3030:ab5:7902:d746:dadd:e401:d5d', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-02-28 09:43:38'),
(4461, 136, 'db1dugui88carcgf4ntlh0pgv9', '2026-02-28 13:04:13', '154.115.220.188', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-02-28 12:40:15'),
(4573, 155, 'p5r1hta33tklqbh50l0dvnn76c', '2026-03-01 19:22:35', '192.145.174.175', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-03-01 19:22:35'),
(4574, 156, 'lm7de6bjjtv1bompeia4dflsgt', '2026-03-01 19:28:00', '197.231.203.10', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-01 19:28:00'),
(4575, 155, 'u52b117rdapcl3hfeabq2rtd43', '2026-03-02 08:43:48', '192.145.175.205', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-03-02 07:37:08'),
(4650, 19, 'q00frpavr7n6b80d9uiit62vgp', '2026-03-03 10:51:53', '192.145.171.3', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-03 10:51:17'),
(4653, 157, '3i2iihlpo8ca0j8e88q7kfq2me', '2026-03-03 11:07:32', '197.231.203.32', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/409.0.872648028 Mobile/15E148 Safari/604.1', '2026-03-03 11:04:00'),
(4665, 152, '1lnmm0urqhqh19tvh2htqvie6e', '2026-03-03 12:42:51', '154.115.237.244', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-03 12:25:57'),
(4750, 158, '6s9im6og54aj6tc8ca2dhf0v6g', '2026-03-03 16:36:57', '102.218.51.197', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_43.8.0 BytedanceWebview/d8a21c6', '2026-03-03 16:21:23'),
(4783, 36, 'o79vnrdtbpcl991csl1bt266r6', '2026-03-03 16:50:05', '197.231.201.164', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-03 16:48:13'),
(4799, 159, '8q6n0q8obskog30jkss29ih8dv', '2026-03-03 21:22:04', '192.145.171.24', 'Mozilla/5.0 (Linux; Android 16; SM-A155M Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.79 Mobile Safari/537.36 musical_ly_2024308030 AppName/musical_ly ByteLocale/en', '2026-03-03 21:19:52'),
(4804, 160, 'jlq9qtr3ajhdh3ufbms9c4qq3p', '2026-03-04 03:18:10', '102.128.131.181', 'Mozilla/5.0 (Linux; Android 14; SM-A055F Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.79 Mobile Safari/537.36 musical_ly_2024307030 AppName/musical_ly ByteLocale/en-GB', '2026-03-04 03:16:33'),
(4818, 140, 'ancuvl9ssetlami84oo52t53et', '2026-03-04 21:16:15', '102.223.188.48', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-04 21:14:14'),
(4857, 161, 'jlks0jp9gj0rdhbo1ha1l65svk', '2026-03-04 23:17:31', '192.145.168.160', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-04 23:09:18'),
(4880, 162, '549ml9crs33sctrsucoctf9v0q', '2026-03-05 01:57:21', '83.137.6.188', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/23C55 Safari/604.1', '2026-03-05 01:57:21'),
(4881, 163, 'gji8sch9p38jsudct8bnopp0bq', '2026-03-05 02:21:18', '102.223.188.125', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-03-05 02:12:23'),
(4897, 47, 'tc8famtslh7lb1nns9j4lg671e', '2026-03-05 07:57:17', '2a02:3030:3:8f04:f158:90ea:d3bd:219f', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-05 07:48:39'),
(4907, 164, 'eot3b36vfgvtb7rauf2ps33bhu', '2026-03-05 18:19:56', '102.141.198.149', 'Mozilla/5.0 (Linux; Android 16; SM-A165F Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.120 Mobile Safari/537.36 musical_ly_2024309030 AppName/musical_ly ByteLocale/en-GB', '2026-03-05 17:53:07'),
(4912, 164, 'dq7iquug9a899hndvinol44182', '2026-03-05 18:02:25', '102.141.198.149', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-03-05 18:02:25'),
(4913, 164, 'o5bs62mgba9ftaj4fcjip8u316', '2026-03-05 18:03:44', '102.141.198.149', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-03-05 18:03:44'),
(4914, 164, 'orfeg5bmcneanlo2kq75g5mkph', '2026-03-05 18:06:59', '102.141.198.149', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-03-05 18:06:14'),
(4917, 164, 'o888dqnl600chlik4ql8i2dgvh', '2026-03-05 18:11:12', '102.141.198.149', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-03-05 18:07:29'),
(4918, 3, 'j21np5et6uq69ua2v3nm29j951', '2026-03-05 18:09:12', '154.115.221.159', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-03-05 18:09:12'),
(4920, 164, '5c4qiji2j4f8tsv54aoo07u3ek', '2026-03-05 18:14:40', '102.141.198.149', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-03-05 18:11:26'),
(4923, 164, 'q82k2o2r7k60dr3d5lrm1o3eel', '2026-03-05 18:17:50', '102.141.198.149', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-03-05 18:15:24'),
(4929, 165, '6ma908i2df4ucs6jhtbojjtn8l', '2026-03-06 00:26:16', '197.231.202.246', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-06 00:26:16'),
(4930, 166, 'd9plejhni8l8l0nmh58bqdo8sc', '2026-03-06 08:48:40', '192.145.171.11', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_43.9.0 BytedanceWebview/d8a21c6', '2026-03-06 08:45:40'),
(4939, 164, 'ohdlfjhemsopel4u9m3i0a3q5q', '2026-03-06 09:03:07', '102.141.198.148', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-06 08:55:01'),
(4977, 167, 'a5kkskj1ujv1a7f32tfup40oe3', '2026-03-15 01:08:16', '97.200.72.185', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-06 13:31:27'),
(5318, 167, 'tlm4itlmo82r6tftsds28h67vg', '2026-03-06 17:06:30', '13.59.165.217', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-06 16:43:27'),
(5576, 3, 'pn6n55hrbi9vsp2q63a7kcui94', '2026-03-25 15:43:06', '154.115.231.82', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-06 19:24:36'),
(6225, 168, 'u3mv6efodp2bpfff30iee6jhb9', '2026-03-07 15:00:42', '154.115.232.210', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-07 14:59:08'),
(6280, 169, 'imle545q2jn3i3ug8469l1tk0o', '2026-03-07 19:32:36', '192.145.170.86', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-07 19:30:26'),
(6304, 170, 'da49kmka4l50gaccpa1t78d1mr', '2026-03-07 20:55:21', '192.145.174.139', 'Mozilla/5.0 (Linux; Android 15; SM-A175F Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.120 Mobile Safari/537.36 musical_ly_2024309030 AppName/musical_ly ByteLocale/en-GB', '2026-03-07 20:50:33'),
(6310, 171, 'd5bu62fo77ictanmdj7msck2t4', '2026-03-12 07:02:22', '154.115.236.78', 'Mozilla/5.0 (Linux; Android 14; SM-A145P Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.79 Mobile Safari/537.36 musical_ly_2024005030 AppName/musical_ly ByteLocale/en-GB', '2026-03-08 05:51:27'),
(6319, 47, 'b4spub1jnua6o7pt9n85080c44', '2026-03-08 14:14:17', '176.4.34.57', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-08 06:40:37'),
(6354, 172, '0iiiu0j7kmehnjjgki3rm3drka', '2026-03-08 14:18:50', '197.220.90.49', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-08 14:15:37'),
(6360, 47, 'bj40m498jj4k8ckolkon94m2tb', '2026-03-08 23:26:54', '2a02:3030:2c:1197:b456:7e62:4178:ac96', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-08 23:19:50'),
(6384, 155, 'dknidfs6btvr7a6crau31fu5cf', '2026-03-09 12:22:24', '192.145.175.234', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-03-09 09:31:42'),
(6438, 151, '17m21rr9coui9d7nfdqsauhkld', '2026-03-09 14:35:42', '197.231.201.169', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-03-09 13:31:43'),
(7259, 173, 'r4t2bbfnp6crvdih25tdfaajhv', '2026-03-09 22:16:25', '197.220.91.54', 'Mozilla/5.0 (Linux; Android 16; SM-E156B Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.122 Mobile Safari/537.36 musical_ly_2024309030 AppName/musical_ly ByteLocale/en-GB', '2026-03-09 22:11:17'),
(7280, 47, 'sd72m9fcmrc0j3km1pur2lfrm0', '2026-03-09 23:28:25', '2a02:3030:a:33d6:9099:327a:6363:b8f', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-09 23:21:34'),
(7395, 155, '4c2kf7bqu9c3d4utq0hd7fgt21', '2026-03-10 06:01:51', '192.145.175.246', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-03-10 05:53:26'),
(7426, 140, 'j5pi5n1qnp9q1socj0cmgto3v7', '2026-03-10 08:21:51', '102.223.188.23', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-10 08:21:23'),
(7584, 173, 'noee3e8r6fm4hls71tf414tubo', '2026-03-10 13:55:42', '197.220.91.54', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-10 13:46:33'),
(7736, 173, 'fis2bn6om6sbvr9iadmr9arufd', '2026-03-10 14:08:11', '197.220.91.54', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-10 14:04:38'),
(8260, 174, '3d1ppg8lmme1afssupt2d2ootd', '2026-03-10 19:55:11', '193.148.48.150', 'Mozilla/5.0 (Linux; Android 14; SM-A055F Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.120 Mobile Safari/537.36 musical_ly_2024309030 AppName/musical_ly ByteLocale/en-GB', '2026-03-10 19:53:17'),
(8268, 63, 'artod0r5ndsl05eqnhukbbpl7u', '2026-03-10 20:42:48', '102.128.131.199', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/145.0.7632.108 Mobile/15E148 Safari/604.1', '2026-03-10 20:41:26'),
(9043, 47, '1ar427j9i5g642qo5ih30o4agk', '2026-03-12 08:27:41', '2a02:3030:1c:bacd:6cbe:4510:e4b7:a144', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-12 08:23:31'),
(9069, 171, 'a3pd58cjgqn3r0btq58kt3tqcp', '2026-03-12 11:35:08', '154.115.237.240', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-03-12 11:35:05'),
(9278, 164, 'i92m15ffkut5i6dshj6bdgq8fe', '2026-03-12 16:03:33', '102.141.198.158', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-12 15:23:17'),
(9607, 175, 'h83homtb5g2auihvjrrq828ab7', '2026-03-12 20:10:54', '192.145.175.96', 'Mozilla/5.0 (Linux; Android 14; SM-M135FU Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/145.0.7632.79 Mobile Safari/537.36 musical_ly_2024301040 AppName/musical_ly ByteLocale/en-GB', '2026-03-12 20:07:01'),
(9674, 171, '0p88ln02tltden8h8lev7u1459', '2026-03-13 06:31:25', '154.115.237.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-03-13 05:26:13'),
(9782, 171, 'fqkt9e26l4184d6426nff5ascr', '2026-03-13 11:18:48', '154.115.237.183', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-03-13 11:08:58'),
(10476, 176, 'q0irkheku6s187lpo9ecc2c6kk', '2026-03-14 08:17:47', '2a02:aa1:1056:a8b7:11d4:b32:3c7e:fc29', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-14 07:32:47'),
(10554, 177, 'g6fq1gpr05k2vheb3qgjvgd4h6', '2026-03-14 15:53:02', '102.68.16.43', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-03-14 15:51:27'),
(10695, 176, 'pkp2v2rvjsauq4oq3qef933rbe', '2026-03-15 00:33:13', '2a02:aa1:1056:a8b7:b0a1:5f76:7d82:51d3', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-15 00:32:54'),
(10707, 176, 'chhnqo6hjm7q44k2ejt6tbssgs', '2026-03-15 07:00:15', '2a02:aa1:1056:a8b7:3c07:7598:2dba:399d', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-15 00:49:56'),
(10728, 47, 'm8t486n723dq1n2ambua0bvg4l', '2026-03-15 04:53:28', '2a02:3030:a:5474:4b0:8519:596e:8a80', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-15 03:49:09'),
(10774, 176, 'r1aub7bj2g39qvvusuj0hp1bqg', '2026-03-15 14:36:05', '94.191.136.37', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-15 07:57:53'),
(11100, 178, 'nodte06t428mud4vup64ipjn7j', '2026-03-15 15:29:35', '192.145.174.34', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-15 15:21:47'),
(11123, 176, '3fm5o17v2jv8asc80gfng0bjne', '2026-03-15 17:26:24', '2a02:aa1:1056:a8b7:f0e2:61fd:41e7:6fbb', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-15 17:26:18'),
(11127, 176, '5kpopcu1n78qbjmf3ea94crqe3', '2026-03-15 19:42:01', '2a02:aa1:1056:a8b7:f0e2:61fd:41e7:6fbb', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-15 19:28:27'),
(11145, 176, 'hdcfs2r4jlditmhlj8gkffifkq', '2026-04-01 20:38:05', '2a02:aa1:1149:349b:3141:d283:24fd:fef3', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-15 21:13:31'),
(11578, 99, 'mogl072ljjst3aeubkr554nim3', '2026-03-16 12:37:33', '197.231.201.188', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-16 12:10:21'),
(11736, 152, 'e1hqjfrgmdh1t5cv280d9vrg3j', '2026-03-17 11:03:29', '154.115.237.127', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-17 10:56:17'),
(11814, 176, 'tavmm87lhhlsvs8lg7d0pq2h68', '2026-03-17 14:10:56', '2a02:aa1:105d:2eff:395b:9c28:9c28:61f0', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-17 14:04:28'),
(11943, 47, 'i7abct4cn8kkq0kbt2dplt8aj2', '2026-03-17 23:28:41', '2a02:3030:25:a2d7:23a7:3255:2ee7:ab9c', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-17 23:25:33'),
(11978, 3, '1unbdfl81lomck3fbt124eu0dm', '2026-03-18 19:19:06', '154.115.221.93', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-18 19:16:26'),
(12002, 99, 'njv2cfs9ru4bfi5qp3qiead3cs', '2026-03-18 21:57:34', '197.231.201.171', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-18 21:41:50'),
(12053, 47, '9nah7v3dkq14aiiot3nde4t9r2', '2026-03-19 08:47:27', '2a02:3030:b:992a:c587:7e16:b334:2f80', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-19 00:25:37'),
(12092, 47, '0m7volh8c84jlpqv7pbheb4u1e', '2026-03-20 09:53:47', '2a02:3030:c:d858:163f:d414:2b53:571b', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36', '2026-03-20 07:12:29'),
(12496, 99, 's2grag75q32d33qoloo8v8e4np', '2026-03-20 20:32:32', '197.231.201.168', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-20 20:03:17'),
(12693, 3, 'lq14holctarvh85hl5os2pt9hv', '2026-03-20 23:45:25', '154.115.231.38', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-03-20 22:56:10'),
(12870, 179, 'ci52d80mtb48hovm0pq1nejjjn', '2026-03-21 06:29:56', '143.110.175.118', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-21 06:29:45'),
(12872, 180, 'i72gh09b6ctn3fgg3t3pv3qodo', '2026-03-22 20:39:38', '192.145.175.100', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-22 20:39:38'),
(12873, 181, '7p5mq7m93b87o2bud5q763veir', '2026-03-22 22:11:27', '102.38.51.77', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-22 21:51:49'),
(12949, 176, '7ugf32e4rrpa3m3rehmnqqn2j7', '2026-03-24 05:06:34', '94.191.152.32', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-24 04:44:50'),
(13009, 182, '9va60vc4b5dde0ddipnf1efq9l', '2026-03-24 14:12:02', '197.231.201.223', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-24 10:19:03'),
(13096, 183, '2tlfp4ec6bv7uf5j5edp1ush59', '2026-03-24 19:46:12', '197.231.202.246', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-24 19:45:13'),
(13101, 184, 'aenqad6jlpl10v8g07fibbr0d1', '2026-03-25 08:08:31', '154.115.236.177', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-03-25 08:08:14'),
(13105, 185, 't1i2pqk39oc44t1vijb6hi8ibt', '2026-03-25 15:45:44', '192.145.175.219', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-25 15:40:43'),
(13122, 185, '1sf03qgp4f6ftbhu3vf94nh5r1', '2026-03-26 04:04:06', '192.145.175.219', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-03-26 03:57:28'),
(13143, 39, 'm4b1h2nat5hunuedvd65um3eo3', '2026-03-26 13:10:09', '197.231.201.164', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-26 13:09:21'),
(13150, 186, '1l3rkeg2tb90pjdk4n5qtpb8ov', '2026-03-27 17:37:20', '102.128.131.185', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-03-27 17:32:29'),
(13163, 3, '29osfeavqunvs5ts8cfbdlrf1b', '2026-03-27 20:35:10', '154.115.221.229', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-03-27 20:35:01'),
(13166, 187, 'rplnd3h7vq4i6dibgmpkfogfsg', '2026-03-27 22:03:33', '102.220.40.176', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-27 21:54:38'),
(13224, 188, 'g2c1v8u559r31bc7kohosglf1v', '2026-03-28 12:35:51', '154.115.221.224', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/146.0.7680.151 Mobile/15E148 Safari/604.1', '2026-03-28 12:11:34'),
(13276, 188, 'o7bank8fr1bb0qb5sqb99i2r8i', '2026-03-28 13:05:07', '154.115.221.224', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/146.0.7680.151 Mobile/15E148 Safari/604.1', '2026-03-28 13:02:51'),
(13288, 188, 'k04ptu1skn9h965a37r1bm7a83', '2026-03-28 14:42:05', '154.115.221.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/146.0.7680.151 Mobile/15E148 Safari/604.1', '2026-03-28 14:38:42'),
(13290, 49, 'saa921cota0no29rgaotsd1q2g', '2026-03-28 15:42:54', '154.115.222.126', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-03-28 15:19:06'),
(13301, 49, '9i7l17661bihc383p9l9ipa5to', '2026-03-30 13:34:05', '154.115.231.249', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-03-28 15:49:03'),
(13461, 189, '94re4d123rsed4lg8s8phcq9ur', '2026-03-28 18:21:27', '197.220.92.42', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-28 18:18:32'),
(13476, 10, 'r1vi8ulvej5r9ocb2nk4do51ug', '2026-03-29 14:37:17', '154.115.221.68', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-29 14:35:29'),
(13480, 64, 'o11ugbiqdhpveatgig9crukfl0', '2026-03-29 14:56:50', '102.128.131.228', 'Mozilla/5.0 (Linux; Android 16; SM-A165F Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/146.0.7680.164 Mobile Safari/537.36 musical_ly_2024301040 AppName/musical_ly ByteLocale/en-GB', '2026-03-29 14:56:07'),
(13498, 64, 'u9g65g39id4b37nehh70rtc6p0', '2026-03-29 14:58:05', '102.128.131.228', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-29 14:57:34'),
(13516, 190, '6tobmd8366ugdev9lptqase55h', '2026-03-29 20:57:38', '197.231.200.5', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-29 20:57:09'),
(13571, 191, 'i59tok0fgv9jk1j7tf514rf3ul', '2026-03-30 14:30:28', '197.231.201.177', 'Mozilla/5.0 (Linux; Android 14; SM-A135F Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/146.0.7680.119 Mobile Safari/537.36', '2026-03-30 14:23:19'),
(13610, 152, '7v1a8sp0fhkg7tamnepm4smec4', '2026-03-30 15:27:48', '154.115.236.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-03-30 15:27:35'),
(13613, 192, 'i39jfadkmlrcfosorej7cj4fil', '2026-03-31 13:35:31', '102.208.96.54', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-03-31 13:34:18'),
(13622, 193, '4g1k1fjh3mudl4d89c780j6qmp', '2026-03-31 14:56:01', '192.145.174.203', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', '2026-03-31 14:44:01'),
(13661, 136, 'hpel5rgc2i204boob58l29lf17', '2026-03-31 20:32:02', '154.115.231.124', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-03-31 20:32:02'),
(13758, 194, 'o5rfc8qfl0gnhc0jv5l04f8s5d', '2026-04-01 13:07:22', '154.115.221.184', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-01 13:04:27');
INSERT INTO "user_sessions" ("id", "user_id", "session_id", "last_activity", "ip_address", "user_agent", "created_at") VALUES
(13784, 195, 'lj50ie3g90dngdb91qmo6kiu9g', '2026-04-01 19:04:51', '102.214.169.102', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1', '2026-04-01 18:13:51'),
(13940, 196, '81gbi511j7kjhlvj1iehq3iel3', '2026-04-02 07:24:53', '41.79.198.17', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-01 23:16:44'),
(14004, 197, 'rra2redboh94v233clo1adppgn', '2026-04-02 11:39:32', '154.115.220.37', 'Mozilla/5.0 (Linux; Android 12; SM-A042F Build/SP1A.210812.016; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.59 Safari/537.36 musical_ly_2024109030 AppName/musical_ly ByteLocale/en-GB', '2026-04-02 10:42:35'),
(14089, 198, 'un19jmsgabbhmgl9l7emn8mpsm', '2026-04-02 18:33:58', '154.115.245.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-02 18:29:49'),
(14104, 136, 'rubnj6rdkd8jm6bqtpk800qfj7', '2026-04-03 10:48:32', '154.115.223.220', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-04-03 10:24:38'),
(14133, 176, 'bj4bam9au6tb0p6mq1vg9iaaj8', '2026-04-03 19:46:59', '94.191.152.38', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/414.0.890628820 Mobile/15E148 Safari/604.1', '2026-04-03 18:44:33'),
(14172, 47, 'rtjr0tn8c3eob202fn3rqjo64f', '2026-04-04 08:20:50', '2a02:3030:26:8a16:206a:f815:90b2:16cc', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-04 07:33:29'),
(14201, 47, 'tjb1vap9m5u30i5sbercej90ad', '2026-04-04 09:50:55', '2a02:3030:a:808a:2426:5814:da38:9dd5', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-04 09:40:42'),
(14228, 136, '5pandn2v1a4h0u2hg514mik5b6', '2026-04-04 19:21:46', '154.115.220.174', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1', '2026-04-04 18:56:53'),
(14284, 49, 'hq3mij00evd8mqh9valfuqj5o4', '2026-04-05 19:43:11', '154.115.222.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-04-05 15:37:07'),
(14323, 3, '6btsaf8q4cu0oak6briiv6n20s', '2026-04-05 21:14:15', '154.115.231.113', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-05 19:42:52'),
(14422, 199, 'c0e25b6ok4mpll9kfmtkor7656', '2026-04-06 06:55:18', '41.79.196.70', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-06 06:51:19'),
(14433, 200, 'vfu6n6v315ke47f8vvc2gs1fih', '2026-04-06 12:14:07', '154.115.221.70', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-06 12:09:26'),
(14472, 47, 'nfl65fnnhl9knlo1p0ic64vim5', '2026-04-07 12:36:00', '2a02:3030:7:dfe8:ab60:5f33:b7e:4e0e', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-07 12:07:22'),
(14516, 201, 'nh0odp0qrt1l3477s2isl2r4ir', '2026-04-07 22:19:31', '197.231.201.160', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-07 22:03:19'),
(14545, 202, '066h38u250tfvr808f0b30mllq', '2026-04-08 13:25:15', '41.79.198.1', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/412.0.882869339 Mobile/15E148 Safari/604.1', '2026-04-08 13:25:15'),
(14546, 201, 'u7b3q0r8qnkuji9q3ta5hvfger', '2026-04-08 14:26:43', '154.115.245.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-08 14:06:47'),
(14614, 203, '7uheb145l79hmkuq69uikc7aqv', '2026-04-09 08:54:28', '154.159.252.222', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-04-09 08:54:28'),
(14615, 188, '21s5q1gbf9p9vjua9ifdcb0hr2', '2026-04-09 17:46:28', '38.83.114.56', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/146.0.7680.151 Mobile/15E148 Safari/604.1', '2026-04-09 17:41:48'),
(14630, 188, 'cp7aqe5r5n61586p08s45gfseu', '2026-04-09 19:56:22', '38.83.114.56', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/146.0.7680.151 Mobile/15E148 Safari/604.1', '2026-04-09 17:52:43'),
(14816, 201, 'mmjgu6a66cl6bi050q258ribek', '2026-04-09 21:29:24', '197.231.201.195', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-09 21:29:24'),
(14817, 201, '0evln8it8us03dg04ub7vrpcd0', '2026-04-10 00:18:45', '197.231.201.195', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-10 00:03:27'),
(14836, 204, 'ru0vtoqi9bhipti8f8du3hhg9a', '2026-04-10 13:13:43', '196.191.223.46', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-04-10 12:54:18'),
(14914, 188, '5kqkegb6mm6n1ohg9fu81ebq6a', '2026-04-10 14:41:07', '154.115.223.120', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.47 Mobile/15E148 Safari/604.1', '2026-04-10 14:40:26'),
(14922, 205, 'n954knp1vjsvlvogu35t9mrvh3', '2026-04-10 15:37:24', '197.231.201.213', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_1_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/413.1.887139264 Mobile/15E148 Safari/604.1', '2026-04-10 15:28:46'),
(14930, 206, 'lgdaddssl682749gc9jn7kq3oj', '2026-04-10 19:26:34', '2605:b100:138:9b43:6cb1:782e:7030:bda', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_4_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/415.0.893601163 Mobile/15E148 Safari/604.1', '2026-04-10 19:22:22'),
(14939, 3, 'd3619o0cjong87fsae9bt9broi', '2026-04-10 23:04:32', '154.115.222.57', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-04-10 22:59:04'),
(14991, 3, 'd1qm4l8u73qkht7ln4jrg1afip', '2026-04-10 23:04:44', '154.115.222.57', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-04-10 23:04:44'),
(14992, 3, 'a753c2ld3cuq61m91prlf3gpdg', '2026-04-11 19:06:52', '154.115.222.57', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', '2026-04-10 23:15:03'),
(15086, 3, 'a9c332pm833b313di1ns78k6n4', '2026-04-11 20:47:05', '154.115.222.57', 'Mozilla/5.0 (Linux; Android 14; SM-A725F Build/UP1A.231005.007) AppleWebKit/537.36 (KHTML, like Gecko) Xuyloqc/4.0 Chrome/146.0.7680.164 Mobile Safari/537.36', '2026-04-11 00:28:24'),
(15219, 3, 'lqcfqsi84f3shpn79fd7c1onmc', '2026-04-11 20:19:13', '154.115.222.57', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-04-11 13:46:25'),
(15232, 3, 'tr8eph40hngcosf2dtnpijrnng', '2026-04-11 21:18:22', '154.115.235.239', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-11 20:53:51'),
(15249, 3, 'th4bhi9hn8q4l1a7d2usponpgk', '2026-04-11 21:20:32', '154.115.235.239', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-04-11 21:20:27'),
(15251, 207, 'quouvstbtl707853a7tk7ejkuf', '2026-04-11 22:09:32', '154.115.236.179', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-04-11 21:47:49'),
(15305, 207, '6ue57kiga7apcb4mpuotd9ot27', '2026-04-11 22:16:04', '154.115.236.179', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-04-11 22:12:10'),
(15310, 208, 'ddmudhj434qagaue8voghfic3n', '2026-04-12 03:39:04', '192.145.170.86', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-12 03:37:58'),
(15316, 207, 's4l98td52lno4uo1pliv2g8t5j', '2026-04-12 12:04:22', '154.115.238.140', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-04-12 12:01:30'),
(15322, 173, 'r1c8824hfk41t6tr5qdn13c6t1', '2026-04-12 12:17:06', '192.145.175.137', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-12 12:16:15'),
(15340, 209, '1tbckknjotqunkti99nruu078b', '2026-04-12 17:42:50', '197.231.201.202', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-12 14:03:56'),
(15382, 3, 'j92m6rn3omhotpav8c8n5aql1j', '2026-04-12 18:27:26', '154.115.221.200', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67', '2026-04-12 18:25:54'),
(15385, 3, 'sump6cjt1hvila4gjmtmh3q8vr', '2026-04-13 22:56:39', '154.115.221.253', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', '2026-04-13 13:46:33'),
(15387, 3, 'efill7iicrgs7n70btc8fecqn8', '2026-04-13 13:53:07', '154.115.221.253', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-04-13 13:52:57'),
(15415, 3, 'hg6gpt2tl4e6pe8farootheqtg', '2026-04-13 18:55:34', '197.231.201.176', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-04-13 18:55:20'),
(15418, 3, '5l4etj69kfclf4muribc7qjuf6', '2026-04-14 00:18:13', '197.231.201.176', 'Mozilla/5.0 (Linux; Android 14; SM-A725F Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/146.0.7680.177 Mobile Safari/537.36', '2026-04-13 18:59:36'),
(15422, 209, '31rakv4ttqfhcmfgo4bds52mtf', '2026-04-14 12:27:41', '197.231.201.170', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-04-13 21:43:01'),
(15447, 210, '79e4224hu7dlgntnu944qrjccr', '2026-04-16 18:06:38', '154.115.239.33', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-16 18:02:25'),
(15455, 3, '3pq61l5bgk0uers6bt8irm7gcb', '2026-04-16 23:32:28', '197.231.201.186', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-16 23:29:44'),
(15458, 10, 'e0rgh7f033vo6k28l38ei3h2da', '2026-04-16 23:36:08', '197.231.201.186', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-16 23:36:04'),
(15460, 47, '9s5n6uuu6dr9ml03nd6vne2mhc', '2026-04-17 05:59:26', '2a02:3030:28:1064:53f9:6e97:1c3b:e691', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-17 05:54:55'),
(15473, 211, '922k8bgsbmdmoj6k0fcm300dl0', '2026-04-17 18:11:13', '154.115.223.68', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-17 17:57:17'),
(15481, 212, 'kb9f5n3d8ectd0f5k5520mqi3o', '2026-04-18 01:25:49', '102.212.139.182', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-18 01:20:47'),
(15503, 211, 'didom48o85g65span3p3uqbdhn', '2026-04-18 04:55:41', '154.115.223.68', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-18 04:52:40'),
(15509, 213, 'nbvt2a55796m3pa761mh7utjcb', '2026-04-18 11:29:25', '197.231.201.160', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.47 Mobile/15E148 Safari/604.1', '2026-04-18 10:57:13'),
(15548, 47, 'ce9nhb0g6oo5bqbiatvbo15s7g', '2026-04-18 14:19:36', '2a02:3030:9:57fe:6989:6d49:8a96:db13', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-18 13:39:39'),
(15633, 213, '9o220p1mjp9dhecsuuf7nupo73', '2026-04-18 15:53:47', '197.231.201.209', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.47 Mobile/15E148 Safari/604.1', '2026-04-18 15:53:44'),
(15635, 214, 'v98f7a5bgir7ff7nhk8nrgsbrp', '2026-04-18 20:26:13', '197.231.201.221', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_1_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/415.0.893601163 Mobile/15E148 Safari/604.1', '2026-04-18 20:08:55'),
(15646, 214, 'kpdvknd5e69fn7g7iu6309o5o3', '2026-04-18 20:18:29', '197.231.201.221', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.1 Mobile/15E148 Safari/604.1', '2026-04-18 20:17:59'),
(15659, 215, 'u2n63luoq78ng1d5jcnhmqkkgb', '2026-04-19 09:31:36', '154.115.237.147', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-19 09:31:36'),
(15660, 214, '3him6sq0u9k2d5nhrja3fgk55q', '2026-04-19 17:52:59', '154.115.222.242', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_1_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/415.0.893601163 Mobile/15E148 Safari/604.1', '2026-04-19 17:52:34'),
(15664, 188, '0dqfrqrscf776ja00f9aed2tjk', '2026-04-19 20:24:00', '154.115.223.149', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-19 20:16:27'),
(15674, 47, '22nsft30879qpra91l5g2d2v2q', '2026-04-20 13:03:29', '2a02:3035:621:a900:56e5:dde9:7fa3:4e08', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-20 12:36:26'),
(15681, 3, 'lbk9cm6kmi51tq1hbjops85nm5', '2026-04-21 21:04:48', '197.231.201.208', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-04-20 15:57:32'),
(15710, 99, 'q1ihs7gsvm9ed35hfisd6a93eb', '2026-04-21 11:52:33', '154.115.236.128', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-04-21 11:50:42'),
(15713, 207, '5kj36i3ntgo4k7gbevasgia10n', '2026-04-21 12:13:21', '154.115.237.157', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-04-21 12:10:53'),
(15722, 207, 'thpadjhks2i3lq539densg4a6m', '2026-04-21 12:17:22', '154.115.237.157', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-04-21 12:16:52'),
(15737, 63, 'o1c32c0dgj3l05cbdcb2fa2et0', '2026-04-23 13:54:54', '102.128.131.206', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-23 13:50:14'),
(15747, 3, 'uug9dg5mlahaeksv824rmvhts9', '2026-04-23 19:04:22', '154.115.232.124', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-04-23 18:36:44'),
(15750, 63, '68igjamo1249lp312jsavhqvp4', '2026-04-23 19:18:11', '102.128.131.196', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-23 19:01:19'),
(15761, 63, 'i93civce2tgtkh6j7vs5sgu6e8', '2026-04-23 19:58:14', '102.128.131.192', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-23 19:51:18'),
(15766, 216, '5nojfefefb1une1kte3gsj37vi', '2026-04-24 06:08:35', '192.145.168.182', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-04-24 05:53:26'),
(15783, 217, '9sm1pgea07l3ouk40n3g5if27n', '2026-04-25 05:54:53', '192.145.174.231', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-25 05:53:47'),
(15789, 63, '8q5j1aodo7b2pjtjta1dise9ok', '2026-04-25 17:07:42', '102.128.131.205', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-25 16:33:25'),
(15797, 63, 'n1q9542500ile5h822msv1r7b8', '2026-04-25 18:34:29', '102.128.131.217', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-25 18:07:32'),
(15801, 63, 'ui5bdm456oi1ricr4q12j4ouu9', '2026-04-25 19:47:41', '102.128.131.190', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-25 19:47:04'),
(15806, 47, 'u89c0iospoaei33a2b3qpv7oqq', '2026-04-26 06:34:39', '196.190.52.121', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-26 06:34:26'),
(15808, 210, 'o8bi57ego1te2kr3r3oghh2qqm', '2026-04-26 09:58:04', '154.115.237.116', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-26 09:56:00'),
(15811, 210, 'equ54kmej57ksc8mg8u3mr9hug', '2026-04-27 04:35:12', '154.115.239.170', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-27 04:29:27'),
(15814, 210, '8s5j4c32c5ds2lspd5l86i8bti', '2026-04-27 04:41:43', '154.115.239.170', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-27 04:41:43'),
(15815, 210, '6d7ucol1lqh2f5khf5iikfjh99', '2026-04-27 04:48:09', '154.115.239.170', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-27 04:41:45'),
(15832, 210, 'aaqcdv5ddve6ps16646hpnbjfq', '2026-04-27 05:11:48', '154.115.239.170', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-27 05:05:28'),
(15836, 218, 'uhaplcjf3epctaffj60h54nbga', '2026-04-27 11:53:17', '156.38.63.45', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-27 10:36:08'),
(15868, 3, 'po28vtc2t2crlf2di2c12ifmk5', '2026-04-27 18:19:43', '154.115.222.243', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-04-27 18:16:30'),
(15876, 3, '20fhr4ij6idhkd3hge6fea59v7', '2026-04-27 19:49:08', '154.115.222.111', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-04-27 19:48:40'),
(15879, 219, '3051n0uqagffbvd9cgsnf6ejbn', '2026-04-28 14:56:58', '154.115.236.168', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-04-28 14:54:43'),
(15884, 63, 'vapnam4cbiemn0pa6lt3va6hm9', '2026-04-29 23:51:08', '102.128.131.181', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-04-29 23:28:50'),
(15892, 47, 'g30tbfri87upcjaj7dcnovanar', '2026-05-01 04:06:53', '196.191.223.157', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-05-01 03:54:55'),
(15900, 201, 'igla8oj6bqkvk0scgn47komj1c', '2026-05-01 17:39:17', '197.231.201.170', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-01 17:29:44'),
(15920, 3, 'p0bkdi0p1npfad1ktmc9hu44fu', '2026-05-02 21:51:10', '154.115.221.81', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-01 18:10:52'),
(15930, 214, 'l3hn652p83sbpbf3qeq7trtlk2', '2026-05-02 06:45:01', '154.115.221.190', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_1_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/415.0.893601163 Mobile/15E148 Safari/604.1', '2026-05-02 06:20:11'),
(16024, 63, 'u76438o89h923m2p7rsru3avsf', '2026-05-02 08:59:37', '102.128.131.216', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-05-02 08:20:42'),
(16028, 220, '04805bac5i45as8f785kebd8ch', '2026-05-02 10:41:17', '154.115.211.239', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-02 10:38:50'),
(16051, 3, 'ib28l65hf1584edfvhhg1pbgme', '2026-05-03 00:06:06', '154.115.222.146', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-03 00:04:43'),
(16061, 99, 'pkm6aabafgvbv5devfgtl52k1l', '2026-05-03 13:35:59', '154.115.236.127', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-03 13:35:18'),
(16067, 10, '3q5g9nnrojftfh0ktr5k0bvlt3', '2026-05-03 14:35:01', '154.115.222.126', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-03 14:34:14'),
(16075, 3, 'svsb4jo48496ig3lstq40r4jpt', '2026-05-03 19:54:46', '154.115.221.132', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-03 16:29:14'),
(16080, 47, '3r9aek6uc1t15jtali3gl9ver0', '2026-05-04 03:22:07', '196.191.223.35', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2026-05-04 03:11:11'),
(16086, 222, 'c1seuce67qcl1q3s2ja3iq3o0h', '2026-05-04 11:47:59', '38.68.135.43', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-05-04 11:39:28'),
(16096, 136, 'dncvnk5sbth1s13o03racsl6se', '2026-05-05 07:25:18', '154.115.231.118', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-05 06:46:00'),
(16102, 47, '0otbncnq8i70r7krua3qk9c544', '2026-05-05 07:19:06', '196.191.60.109', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2026-05-05 07:13:11'),
(16114, 136, 'ig5evd6c9rciqjhfl8d3d2dibl', '2026-05-05 11:12:30', '154.115.231.88', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-05 11:12:01'),
(16117, 136, 'rfspj6jr9puqljr672cc5ev01t', '2026-05-05 23:14:10', '154.115.231.88', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-05 23:13:43'),
(16120, 223, '1h486p9tnllg1fcnruntdd0o4i', '2026-05-06 00:14:03', '84.171.19.4', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_1_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-05-06 00:13:14'),
(16125, 224, 'du93mnq7gva19un0p8d54gncc9', '2026-05-06 05:22:53', '197.231.201.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-06 05:22:06'),
(16136, 63, 'cd6nl82qcqehuhoct0d3fcqlmk', '2026-05-06 08:17:39', '102.128.131.216', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-05-06 07:47:22'),
(16149, 225, '4aa0d38dast06ki0fpapukinh1', '2026-05-06 13:15:50', '192.145.174.47', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3.1 Mobile/15E148 Safari/604.1 Brave', '2026-05-06 13:13:37'),
(16157, 226, 'nfh168f9n07r3bmqig2ohd2rmp', '2026-05-06 14:31:42', '197.231.200.4', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148', '2026-05-06 14:29:58'),
(16176, 224, 'lq8moed4ku9nf5ndqqhg0h98f9', '2026-05-07 07:45:31', '197.231.201.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-07 05:06:27'),
(16203, 3, 'nspmdoslrd42fmk02iblaqkll7', '2026-05-07 08:37:33', '154.115.223.191', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-07 07:54:15'),
(16211, 227, 'r5115o0da8n5fedtm9i3f03b1a', '2026-05-07 09:32:16', '102.141.196.236', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-07 09:32:16'),
(16212, 228, 'mkgn351564tuv1pv666reng92q', '2026-05-07 09:54:18', '154.115.236.132', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-05-07 09:52:32'),
(16225, 229, 'a86lik4qf6dp702hrr22gncp3j', '2026-05-07 10:23:53', '154.115.245.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-07 10:23:53'),
(16226, 230, 'f4fsnijg793c3ep3lgj3ei8oqp', '2026-05-07 11:17:33', '169.150.227.138', 'Mozilla/5.0 (iPad; CPU OS 26_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_42.8.0 BytedanceWebview/d8a21c6', '2026-05-07 11:15:53'),
(16233, 231, 'tlhvegta839qro4fmncmrqtlq4', '2026-05-07 13:10:55', '102.69.235.62', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-07 13:10:55'),
(16234, 232, '0crl6471n8gsvb11a3nmc78ji1', '2026-05-07 14:04:06', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-07 13:59:34'),
(16249, 233, 'v69c3j1ljc0n414va97t6u95id', '2026-05-07 17:22:20', '102.223.188.114', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-07 16:11:56'),
(16263, 234, 'nu9255crai8nk6uvj16pv3ujei', '2026-05-07 16:27:23', '154.115.221.185', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-07 16:26:52'),
(16267, 235, '2022dobcq00pta6r6r25pclpa8', '2026-05-07 17:22:16', '197.231.201.192', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-07 17:17:23'),
(16303, 236, 'kjjnm5v5u1bf8ttirqi1m15t3v', '2026-05-07 17:32:07', '192.145.175.64', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/148.0.7778.100 Mobile/15E148 Safari/604.1', '2026-05-07 17:25:14'),
(16352, 237, 'ufv2je8u7fhiso43c49du4v0cf', '2026-05-07 17:44:02', '154.115.223.45', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1 musical_ly_41.9.0 BytedanceWebview/d8a21c6', '2026-05-07 17:43:08'),
(16360, 238, '7fkhh7d3ve5igdo319b7o1he6q', '2026-05-07 18:06:36', '149.50.215.248', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.7727.99 Mobile/15E148 Safari/604.1', '2026-05-07 18:04:15'),
(16369, 239, 'p0q71oks2j60kfop5rict05h2o', '2026-05-07 18:42:43', '154.115.211.232', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/374.0.773146746 Mobile/15E148 Safari/604.1', '2026-05-07 18:26:37'),
(16381, 240, '9ue7rau9r8e9i6j92corutv06h', '2026-05-07 20:13:19', '197.231.201.242', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-05-07 20:09:59'),
(16395, 47, 'lcgojmttbkkcb354v0dgv4co0v', '2026-05-08 06:22:24', '196.190.61.90', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2026-05-08 05:41:49'),
(16404, 241, 'p71pn58s6g5op8vfss4j8d8a3u', '2026-05-08 08:34:44', '197.231.202.150', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-05-08 08:34:44'),
(16405, 242, 'mqc9qs99i01svvn538a3p7lk4e', '2026-05-08 09:54:36', '154.115.211.15', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-08 09:54:36'),
(16406, 235, 'n23m4diqt4iqt7osffs98ig2kp', '2026-05-08 15:10:18', '197.231.201.207', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-08 11:08:49'),
(16517, 243, 'h2t5cacmrpvl8ged6hkgnms04i', '2026-05-08 12:38:59', '196.190.63.94', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-08 12:38:59'),
(16518, 244, 'gmg293di6jo0lbcj8hmslqckup', '2026-05-08 12:53:50', '196.190.63.150', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-08 12:44:24'),
(16525, 3, '83t8ceeu1njhlu3639v5q9gujk', '2026-05-08 14:22:50', '154.115.221.58', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-08 14:05:52'),
(16555, 245, 'fevpnto8plun47alljbstf09ki', '2026-05-08 19:30:34', '197.231.201.181', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-08 19:26:04'),
(16560, 245, 'eeik8sir5nm8qt8e0ruovbkkeh', '2026-05-08 20:39:19', '197.231.201.183', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-08 19:45:35'),
(16600, 235, '3ojne8k2cgl1qkssh247pt8p0r', '2026-05-08 21:59:05', '197.231.201.207', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-08 20:36:41'),
(16694, 39, 'giiaigkhkogb2ki04v78f3e4vg', '2026-05-08 21:48:14', '197.231.202.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-08 21:44:40'),
(16715, 246, 'a9tunppoknhkrq5me363f9ul99', '2026-05-08 23:35:19', '154.115.237.42', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36', '2026-05-08 23:32:26'),
(16725, 247, '5rfubghv3355qcutq7443uoljb', '2026-05-09 04:02:36', '154.115.211.216', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/144.0.7559.95 Mobile/15E148 Safari/604.1', '2026-05-09 03:40:10'),
(16737, 245, 'dijep4eu0jn0oslv4ucfu1i30b', '2026-05-09 05:01:05', '197.231.201.183', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-09 05:01:05'),
(16738, 235, '5ijdm2eptpf3avp0tfej38f31v', '2026-05-09 05:03:33', '197.231.201.207', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-09 05:01:06'),
(16829, 136, 'hc43bd7rtofok9f26s6pdgk9jc', '2026-05-09 08:57:34', '154.115.222.61', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-09 08:11:59'),
(16848, 248, 'o2hlcv7sc2neqmmrunhdg0u5f3', '2026-05-09 09:27:51', '102.220.40.137', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 09:26:59'),
(16858, 245, 'intntchu8ibi1cvsoaftm11hrk', '2026-05-09 10:01:09', '197.231.201.199', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-09 09:37:41'),
(16886, 245, 'l1hfa41qbja2a9rqeoqf3meh5g', '2026-05-09 10:24:19', '197.231.201.199', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-09 10:19:54'),
(16892, 245, 'cesho6i8dree8tcj24jmuenmht', '2026-05-09 10:50:32', '197.231.201.199', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-09 10:50:32'),
(16893, 249, 'emvla58hv6pbk93bkfdhhldiv9', '2026-05-09 12:03:31', '197.231.202.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 12:02:30'),
(16902, 49, 'gl7cpl16he209enajtq0ktdac5', '2026-05-09 12:53:08', '154.115.221.111', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-09 12:42:50'),
(16917, 245, 'jt8hif04sf4rhui31n1u50iskq', '2026-05-09 13:53:04', '197.231.201.199', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-09 13:52:52'),
(16919, 136, 'd5dd8vhcimugo2ie1sblv0c725', '2026-05-09 13:56:31', '154.115.222.61', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-09 13:56:25'),
(16921, 250, 'cphvl2qcht7gm6r53utuf3b0te', '2026-05-09 16:07:25', '154.115.236.153', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 16:07:25'),
(16922, 250, 'j8htcpjbhigkji5o5l2vgsqrk9', '2026-05-09 16:25:24', '197.231.202.150', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 16:25:24'),
(16923, 250, 'jlub9trbpq6oq8bkm3qm52uc9t', '2026-05-09 16:27:19', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 16:27:19'),
(16924, 251, '65ee1da2o9d8tsrurvulbcsbbv', '2026-05-09 16:34:01', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 16:34:01'),
(16925, 250, '158nqm373atqjom8rfjva0965c', '2026-05-09 16:49:14', '154.115.236.48', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 16:44:22'),
(16943, 250, '9q6rm3rr8imks1c1el804hp4b8', '2026-05-09 16:51:14', '154.115.236.48', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 16:49:20'),
(16956, 3, '7c0rj3vhh862i6ak5eribkha09', '2026-05-09 16:53:32', '197.231.201.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-09 16:50:59'),
(16967, 251, 'd75qdnn29vdce3ckhns49nejmb', '2026-05-09 17:08:06', '154.115.236.48', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 17:04:56'),
(16982, 251, '84nh5srmvaku73ajevetieuml3', '2026-05-09 18:23:41', '197.231.202.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 18:22:57'),
(16986, 252, '4k6mm0k1nfbubjbleip5gu040j', '2026-05-09 19:02:29', '197.220.90.65', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 18:59:42'),
(17002, 253, 'mng92m40osh907qdgnej38t90f', '2026-05-09 22:12:47', '31.4.214.120', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-09 22:05:31'),
(17021, 224, 'a51ka1qmgt8ib66edebl0ooa5v', '2026-05-10 06:52:12', '197.231.201.176', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 06:02:07'),
(17031, 249, 'hrt2egrb75modc94uudjvohs2j', '2026-05-10 08:22:15', '154.115.222.184', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 06:56:46'),
(17073, 249, '011gvb8u46vnv62uh8md3ube8t', '2026-05-10 08:35:13', '154.115.222.184', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 08:34:37'),
(17076, 251, 'ikfj4nga2l8hqaoqtsjcfehp08', '2026-05-10 11:17:22', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 11:17:05'),
(17080, 251, 'rnu70cpacmo157tiiio56jtfmq', '2026-05-10 11:24:31', '197.231.202.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 11:21:57'),
(17099, 251, 'mvc0dh0njjjf2lm9gvosi6jma6', '2026-05-10 12:14:07', '197.231.202.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 12:14:01'),
(17101, 249, 'gh6u004832fhcgg0krq923bmgq', '2026-05-10 13:12:11', '154.115.223.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 13:11:51'),
(17107, 249, 'g1l1fmp3ve5floc4j4ja455bgc', '2026-05-10 15:35:58', '154.115.223.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 15:32:49'),
(17114, 249, 'bva9aa1fq13gpftl9cne9d9na9', '2026-05-10 16:07:20', '154.115.223.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 16:05:42'),
(17119, 251, 'urr6embcpesgbn5fob6rfids65', '2026-05-10 17:00:34', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 16:49:48'),
(17133, 251, '40atp93lcii3atnvcvq7cl3bib', '2026-05-10 17:06:50', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 17:04:42'),
(17141, 254, 'fa9eiurj673ftva4gemhuo2idb', '2026-05-10 21:51:52', '154.115.236.87', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-10 21:03:08'),
(17151, 249, 'ionitc912ge21un4rt84p2p1bt', '2026-05-10 21:25:43', '197.231.202.150', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-10 21:21:53'),
(17174, 3, 'e8smc0qogq6um6qfmr666dksdv', '2026-05-10 22:48:17', '197.231.201.165', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-10 21:38:23'),
(17187, 249, 'i85ovf33q9l9kqgbh6a8qud8k6', '2026-05-11 07:58:17', '197.231.202.150', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-11 07:43:16'),
(17197, 249, '38r40kpd3b0jiq1vtiui4f84mq', '2026-05-11 09:49:22', '197.231.202.151', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-11 09:49:17'),
(17199, 251, '9v0kav375nghuoa6si1e8f9tvl', '2026-05-11 10:43:53', '197.231.202.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-11 10:43:51'),
(17201, 92, 't0as8nuok98al3d7l86kdk8qlv', '2026-05-11 11:52:17', '102.213.68.70', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-05-11 11:36:56'),
(17214, 92, 'g68ilts812grp2bv3j62vdkphh', '2026-05-11 11:54:31', '102.213.68.70', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1', '2026-05-11 11:54:31'),
(17215, 249, 'q205k0797b8r35f9bdtmhm7lcs', '2026-05-11 14:14:38', '154.115.223.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-11 14:12:31'),
(17221, 235, '925gj1s9ndmvt7m6o7ajptvf6p', '2026-05-11 15:00:22', '197.231.201.198', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-11 14:59:26'),
(17266, 47, 'ndeh7qu3icm7kv1op5ku0ufqlr', '2026-05-11 15:20:00', '196.191.223.215', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2026-05-11 15:06:46'),
(17275, 249, '1gghgfds3t39nq2g7bg191iutj', '2026-05-11 16:53:21', '154.115.223.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-11 16:46:53'),
(17283, 255, '1jh91cn7cn9u2l87stuss9fude', '2026-05-11 18:02:20', '2001:99a:1731:f000:2f0f:7744:c4b1:3f18', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-11 17:58:49'),
(17301, 256, 'j90d81rlr2f3j5m9h9smcmk357', '2026-05-11 19:58:38', '129.222.147.221', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/148.0.7778.100 Mobile/15E148 Safari/604.1', '2026-05-11 19:57:03'),
(17308, 251, '4r77gh0pqmjet9qt50ns1im9m1', '2026-05-11 20:10:02', '197.231.202.150', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-11 20:09:54'),
(17310, 251, 'qsc0lirpa9018tqs60kqmg5g6k', '2026-05-11 20:11:32', '197.231.202.150', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-11 20:10:15'),
(17315, 257, '69m2qsv93ka2odi93ehbebelr3', '2026-05-11 20:46:15', '197.231.201.203', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-11 20:43:12'),
(17322, 258, '6loauvivkdar74lqc36mljikih', '2026-05-11 21:52:47', '2001:861:6ed2:e180:4480:f2bf:d115:fdf', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148', '2026-05-11 21:52:47'),
(17323, 249, 'oli61c0js22pctn76q0svnt1iu', '2026-05-12 06:22:30', '154.115.223.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-12 06:18:44'),
(17339, 259, 'e5sqsnp7v85ermtf164ng20jta', '2026-05-12 08:12:09', '102.128.131.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-12 07:42:14'),
(17348, 249, '2sd2b0gdb5u0eqlqa02boca3c5', '2026-05-12 07:45:30', '154.115.220.197', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-12 07:44:58'),
(17369, 260, '96a7vqfh3ve6ppet87fnkok8oe', '2026-05-12 09:36:48', '154.115.222.203', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 09:26:01'),
(17376, 260, 'ijdkcgm08lp7hoqak7omtr9edv', '2026-05-12 09:37:08', '154.115.222.203', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 09:37:08'),
(17377, 260, 'p02sropd69rf8t6fh47okc0nek', '2026-05-12 15:20:12', '154.115.222.136', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 15:20:12'),
(17378, 260, 'hq0hf1usk78d9f0hflm6u6ig8i', '2026-05-12 15:32:35', '154.115.222.136', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 15:32:35'),
(17379, 260, 'ijai2i54fv7a19ijl15d3f8kkq', '2026-05-12 15:47:49', '154.115.222.136', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 15:39:48'),
(17381, 251, 'di3fbkevsasnr4vvcchbdrtqq0', '2026-05-12 16:27:33', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-12 16:10:32'),
(17389, 261, 'v78smgblgcoh85jtav5tmh5910', '2026-05-12 16:58:31', '89.144.221.165', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/143.0.7499.151 Mobile/15E148 Safari/604.1', '2026-05-12 16:58:31'),
(17390, 235, 'te9li2n7a80qni853g9lfjnvfj', '2026-05-12 17:13:46', '197.231.201.198', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-12 17:11:15'),
(17487, 260, 'fu9jbmqv0abc08v5f3g0t1kqov', '2026-05-12 19:04:38', '154.115.220.223', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 18:44:10'),
(17488, 3, 'fj0rbpdifeto48idjvvarrdpq5', '2026-05-12 18:52:11', '197.231.201.221', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-12 18:51:23'),
(17503, 260, '4ilcpm0sg6nqc4nvq941dql9nv', '2026-05-12 19:06:57', '154.115.220.223', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 19:04:43'),
(17505, 260, 'oi0tcdlo7j0v6ub3p9e0qdm74p', '2026-05-12 19:34:40', '154.115.220.223', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 19:07:00'),
(17506, 3, 'lkck5a8kaha419eg17edlhgd5n', '2026-05-12 19:15:59', '197.231.201.221', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-12 19:15:59'),
(17512, 260, 'qqqdeebi8tobm60lietsvih41b', '2026-05-12 19:38:40', '154.115.220.223', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 19:34:52'),
(17515, 260, '5318i40hpkg1fpr2h21mn82a7a', '2026-05-12 19:49:34', '154.115.220.223', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-12 19:38:45'),
(17516, 260, '47n3neo05snm9nbava8cj85cho', '2026-05-12 19:46:08', '197.231.201.221', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-12 19:45:09'),
(17535, 262, '8fmnctv7f59ffsgv7m88a7okeu', '2026-05-12 20:25:32', '197.231.202.151', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-12 20:25:32'),
(17536, 263, '9h4sd65l85r2pillnp8mnlm755', '2026-05-12 21:19:58', '89.144.223.205', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1 OPT/6.3.0', '2026-05-12 21:13:00'),
(17548, 264, '9vjiujpfkq7d582gpo484idlcq', '2026-05-12 21:21:40', '41.78.74.37', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/419.4.905781065 Mobile/15E148 Safari/604.1', '2026-05-12 21:21:40'),
(17549, 265, '0m0ij4r8l09uhdh9h4uotd1o3s', '2026-05-13 01:01:43', '196.191.223.162', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-13 01:01:43'),
(17550, 266, 'jp17fdmqu4tf79v2kf98ob3mnf', '2026-05-13 07:32:22', '197.231.201.205', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-05-13 07:32:22'),
(17551, 249, 'dd6n70in2njnmtmrtumm4duutr', '2026-05-13 08:58:39', '154.115.220.27', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-13 08:51:25'),
(17571, 267, 'dhetge5r4vpibrjt7h9pol5t8q', '2026-05-13 13:28:10', '46.101.188.221', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-13 09:44:25'),
(17600, 260, '0354bedjciahslre3ukkgfvssn', '2026-05-13 14:37:13', '154.115.222.137', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-13 10:28:49'),
(17618, 3, '3au2dj02cohbemmumvfa6l9m98', '2026-05-13 15:48:42', '197.231.201.222', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-13 13:28:30'),
(17639, 99, 'ijt2cnakqo097kdjq0ndrag1j4', '2026-05-13 14:53:23', '154.115.236.142', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-13 14:52:08');
INSERT INTO "user_sessions" ("id", "user_id", "session_id", "last_activity", "ip_address", "user_agent", "created_at") VALUES
(17647, 260, 'qfurfc36pghho4kodnh8amtnsc', '2026-05-13 16:09:54', '154.115.222.137', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-13 15:00:57'),
(17728, 3, '5bans6d28qhmqgtu3dbf3907m1', '2026-05-13 16:18:32', '197.231.201.222', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-13 16:01:48'),
(17767, 260, '4i28909pb7egc5bv0fe3sf6vdq', '2026-05-13 18:56:58', '154.115.231.96', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-13 16:22:37'),
(17769, 260, 'vpmd86ui48dmhf73gnulrlaouc', '2026-05-13 16:35:14', '197.231.201.222', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-13 16:33:21'),
(17786, 251, 'bhuov0mb3ajksj58o6s77spndj', '2026-05-13 17:40:40', '197.231.202.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-13 17:40:28'),
(17818, 235, 'kknluh3fkj6so52l2tdi51c4lc', '2026-05-13 18:51:26', '197.231.201.198', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-13 18:06:33'),
(17931, 268, 'g4i5mjavde6rpu7aj9rn4ea7g4', '2026-05-14 07:23:56', '192.145.175.238', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-14 07:23:56'),
(17932, 259, 'ilhl2cpkpjtr8li7u97ks4tmde', '2026-05-14 08:15:06', '102.128.131.198', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-14 07:47:55'),
(17934, 259, 'o6686ga6psc960shg9kmeq7tnt', '2026-05-14 08:21:55', '41.223.109.49', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-14 08:15:17'),
(17944, 269, 'cc18pvk6vvp516q14d57pc3a21', '2026-05-14 09:07:45', '197.231.201.216', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-14 09:01:22'),
(17964, 249, '4hu85p2th8mornp3l5g5u7f60p', '2026-05-14 09:13:37', '154.115.220.24', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-14 09:11:14'),
(17971, 259, 's06901mkmtfuu5b7v6qv5q1jq0', '2026-05-14 10:48:26', '41.223.109.50', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-14 10:46:52'),
(17980, 260, 'grccd6inld868qdng2rdsavn5k', '2026-05-14 15:35:53', '154.115.223.243', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-14 11:14:24'),
(17992, 251, 'qiie0a9c23quaib09f7rq7m9rq', '2026-05-14 13:45:16', '197.231.202.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-14 13:45:05'),
(17998, 270, 'rds5hqe0m7qfo7782c39j4d6tg', '2026-05-14 13:59:44', '197.220.92.44', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-14 13:59:16'),
(18006, 271, '0lf7pu9gq5l59j20n47u2psjan', '2026-05-14 16:21:18', '102.68.19.107', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-14 16:21:18'),
(18007, 99, '0t7t6lu3jh8avofilb8gguik6o', '2026-05-14 18:18:58', '154.115.237.20', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-14 18:09:14'),
(18016, 47, '13f0i8t856qhhrvi1cb2plohi5', '2026-05-14 18:51:51', '196.190.61.249', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-05-14 18:51:34'),
(18018, 272, 'ceg01ajmf2lteq5jb0in4ll0b9', '2026-05-15 04:40:05', '192.145.175.82', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-15 04:10:37'),
(18020, 260, 'md0if496on987f2sqtpv7v6hc8', '2026-05-15 09:16:39', '154.115.235.70', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-15 08:51:58'),
(18032, 99, 'bjagqqh9t8i1kthg18ta1f50ou', '2026-05-15 09:06:39', '154.115.237.150', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-15 09:06:19'),
(18037, 263, 't724c4usree1k3ird6cju22t6g', '2026-05-15 19:02:20', '213.147.167.143', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1 OPT/6.3.0', '2026-05-15 13:54:41'),
(18067, 260, 'qb3po10mp7gbiqd2pjiddho0pf', '2026-05-15 17:25:22', '154.115.222.215', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36', '2026-05-15 16:24:25'),
(18112, 245, 'hmdmlqigdf7rsfg2387kng4utr', '2026-05-15 18:13:34', '197.231.201.195', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-15 18:13:34'),
(18118, 260, 'r6kka90qjpoknpjnqb8hmlblo1', '2026-05-15 22:01:15', '154.115.221.187', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-15 22:00:59'),
(18121, 263, 'j84mc3ncpbiukaq0chvj9qj9kd', '2026-05-16 04:30:17', '213.147.167.143', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1 OPT/6.3.0', '2026-05-16 04:29:22'),
(18131, 47, 'ev8l5m7bmfp7d7ajlcm63juo8l', '2026-05-16 05:42:19', '196.190.61.90', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2026-05-16 05:32:34'),
(18138, 224, 'lva3226ppqmqoljt4fsrpcjmtk', '2026-05-16 06:36:57', '197.231.201.168', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-16 05:42:46'),
(18150, 47, 'jqbirn59shdtrm0cklt6es4b31', '2026-05-16 06:25:22', '196.190.61.92', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2026-05-16 06:21:35'),
(18163, 260, 'huu4403jb90m2o6gkk9iavidn5', '2026-05-16 09:51:08', '154.115.231.233', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-16 09:50:23'),
(18166, 273, '4ne6fuq3lanf3u0dnv6gjgjh52', '2026-05-16 11:14:47', '197.220.90.65', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-16 11:14:47'),
(18167, 263, 'l6q9sliblugh229s2dbuccdmhg', '2026-05-16 15:13:28', '213.147.167.143', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1 OPT/6.3.0', '2026-05-16 15:08:54'),
(18173, 274, 'rurnknohope19of2u5sqloba2e', '2026-05-16 19:04:44', '196.190.55.167', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36', '2026-05-16 19:04:44'),
(18174, 201, 'fe67gm43a1vu67tnpv5riaskqi', '2026-05-16 19:58:49', '197.231.201.188', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-16 19:58:49'),
(18175, 201, 'inovkgotcshks3clogkjdkp3mt', '2026-05-16 20:54:07', '197.231.201.169', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-16 20:53:57'),
(18178, 201, 'meglj182v5hjkmkciuhhionbca', '2026-05-16 21:29:49', '197.231.201.169', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-16 20:54:15'),
(18219, 47, 'fv4dtnso5umcaidph86ahae7d5', '2026-05-17 06:04:06', '196.191.223.243', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36', '2026-05-17 06:03:55'),
(18221, 260, 'qk2fa0j0nr30cj09q7uqhlm7vs', '2026-05-17 08:50:06', '154.115.221.159', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-17 08:21:17'),
(18234, 263, 'ib9jg827d8h481muv4chraak4f', '2026-05-17 13:32:31', '213.147.167.143', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1 OPT/6.3.0', '2026-05-17 13:30:56'),
(18242, 99, 'hu1632d2qcmsmovmreeg8tcbm2', '2026-05-17 16:50:12', '154.115.237.8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-17 16:49:34'),
(18245, 275, 'r2dsh10v1coth9i8l8ccqup9pk', '2026-05-17 18:53:31', '192.145.175.225', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', '2026-05-17 18:45:00'),
(18248, 276, 'ees3goi7lu3o7q7l8mk10hiu79', '2026-05-17 20:17:49', '154.115.237.20', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-17 20:17:13'),
(18253, 201, '5afq0003ecspftgq1f64h32t1f', '2026-05-17 23:22:54', '154.115.221.1', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-17 23:19:14'),
(18263, 277, 'fvmfbbmg8k48u90d9bkpkt1rl1', '2026-05-18 08:55:46', '154.115.237.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-18 08:55:46'),
(18264, 277, 'tbk6la288a1ict4onhc2in8qee', '2026-05-18 09:05:40', '154.115.237.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-18 09:00:16'),
(18275, 277, 'pr7app73mekitk8qpc9b9bnji9', '2026-05-18 09:34:33', '154.115.237.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-18 09:27:52'),
(18292, 278, '6qtna678n0pbgat9l3mll5o0gb', '2026-05-18 12:39:33', '197.231.201.177', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-18 12:35:46'),
(18304, 277, '7noh4275vqsd1mbdd399fs5jiv', '2026-05-18 14:53:34', '154.115.237.234', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-18 14:45:21'),
(18308, 277, '481t029ikrb77tmn7ndq1pnd3s', '2026-05-18 15:01:47', '154.115.237.234', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-18 14:55:01'),
(18314, 251, 'v71h5i13kseu6182sbooldp69g', '2026-05-18 17:48:52', '197.231.203.53', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-18 17:40:17'),
(18323, 251, '526n6ksnv02muqq9m1i9ac0vbs', '2026-05-18 17:59:05', '197.231.203.53', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-18 17:58:51'),
(18329, 136, '3tmql54rtk3kkq9bddt1i22k8o', '2026-05-18 18:46:03', '154.115.220.247', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-05-18 18:44:47'),
(18335, 277, 'is5pt9244fdmkvef60i2g15ee0', '2026-05-19 06:18:29', '154.115.237.234', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-19 06:16:42'),
(18342, 277, 'cvfscc9btjmrhdoatqtmve7sfn', '2026-05-19 06:46:41', '154.115.237.234', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-19 06:46:21'),
(18349, 279, 'hplii3e0eqlv6vqtcr89fd0eaj', '2026-05-19 12:04:25', '196.190.61.5', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', '2026-05-19 10:49:43'),
(18410, 280, '4rvmgargbl25lr07qfshnr5j63', '2026-05-19 13:18:39', '154.115.236.10', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-19 13:18:39'),
(18411, 267, '09ue82akbh153g6k2qf8vflice', '2026-05-20 02:57:45', '169.40.154.69', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-20 02:55:35'),
(18417, 281, 'kvctsebha4bsv8dpskkf5g4ivn', '2026-05-20 18:36:22', '193.148.48.33', 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/148.0.7778.120 Mobile Safari/537.36', '2026-05-20 18:35:46'),
(18419, 281, 'm1ab8965f14ps5oq52m6q6k62n', '2026-05-20 18:54:14', '193.148.48.33', 'Mozilla/5.0 (Linux; Android 15; 23124RA7EO Build/AQ3A.240829.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/148.0.7778.120 Mobile Safari/537.36', '2026-05-20 18:48:56'),
(18446, 281, 'buiuhuaae806ejmu85bdm6viba', '2026-05-20 19:05:22', '193.148.48.33', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-20 19:04:37'),
(18448, 281, 'i8vvf4912mc9d0ac7b8cve7o49', '2026-05-20 19:12:51', '193.148.48.33', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Mobile Safari/537.36', '2026-05-20 19:11:57'),
(18455, 281, 'ho3u6s6mel1qd6casedki5jdb8', '2026-05-20 19:16:21', '193.148.48.33', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-20 19:14:49'),
(18464, 281, 'oadgr201mlv0mlig8t614sk17l', '2026-05-20 20:52:33', '193.148.48.33', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-20 20:52:33'),
(18465, 277, 'h8l1h9e5hk72jlbcb1hcp3am3b', '2026-05-20 21:32:45', '154.115.236.27', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-20 21:14:33'),
(18480, 277, '52mtjkti2md7v2q0530sfg4c5e', '2026-05-21 05:54:19', '154.115.236.230', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-21 05:53:05'),
(18485, 277, '7ls2jsi72ta2hictgkgst7lc1q', '2026-05-21 05:59:06', '154.115.236.230', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-21 05:58:32'),
(18490, 277, 'l2q0p5ngvkbc2t6a9icfqfo07k', '2026-05-21 06:26:40', '154.115.236.230', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-21 06:13:08'),
(18496, 249, 'q7t8b511v9r93qvksmdib3aka7', '2026-05-21 08:33:45', '154.115.221.79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-21 08:16:04'),
(18509, 281, 'qg9fjjtlhvo8pjge6jud768lff', '2026-05-21 09:21:27', '193.148.48.55', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-21 08:53:44'),
(18517, 281, 'osg63f22sr10dev8a30vg072la', '2026-05-21 09:29:08', '193.148.48.55', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-21 09:21:32'),
(18527, 281, 'k4sges3h5a89vus7iu049fh9kd', '2026-05-21 10:10:43', '193.148.48.55', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-21 10:10:24'),
(18530, 281, 'a0tmv8ds7ij79eii9nhe1o7b06', '2026-05-21 13:54:00', '193.148.48.48', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-21 13:54:00'),
(18531, 266, 'fm88dje3amq5fin5v7pitds2r9', '2026-05-21 14:25:25', '154.115.223.44', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-05-21 14:21:33'),
(18533, 266, 'nfdsig0u054c0jqghbkvguir42', '2026-05-21 14:27:09', '154.115.223.44', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-05-21 14:25:48'),
(18540, 266, 'sif2hpl895hbdld5cs4m8bb132', '2026-05-21 16:43:07', '154.115.223.44', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-05-21 14:30:52'),
(18568, 251, '6amh9jo3hbssb4o7g5kpf1l1ns', '2026-05-21 15:24:21', '197.231.203.53', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-21 15:22:42'),
(18588, 99, 'kf3pa98cv937bojfq70r9h8eg5', '2026-05-21 19:31:29', '154.115.236.119', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-21 19:07:23'),
(18601, 282, 'i0ies93ctph0m6rtmmd95iqf54', '2026-05-22 10:17:07', '154.115.237.245', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 10:15:31'),
(18605, 283, 'k2na1cf3ho7c3v4heaoh04l39c', '2026-05-22 10:40:45', '102.214.169.101', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 10:24:40'),
(18634, 284, 'l5qfabi5achjk23parn1pvm8od', '2026-05-22 10:46:35', '102.218.59.60', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 10:46:35'),
(18635, 285, '6t4s1ab12kbah9k58rmjdfc6rr', '2026-05-22 10:53:23', '102.220.41.228', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 10:53:23'),
(18636, 286, 'srqqe0s6a92opl1mcgsm9l7bcu', '2026-05-22 11:07:21', '154.115.223.22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:150.0) Gecko/20100101 Firefox/150.0', '2026-05-22 11:05:58'),
(18646, 287, 'oe8ervqb99rgsgh9sp3nc76i5f', '2026-05-22 12:30:37', '143.177.19.116', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-22 12:28:47'),
(18663, 288, '5q8ioqo9n3bmb932ctov3fg062', '2026-05-22 12:53:06', '154.115.211.224', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 12:50:15'),
(18685, 281, 'gpqut8b5nip3g2v8l787obmomi', '2026-05-22 12:56:10', '193.148.48.215', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 12:55:04'),
(18699, 289, '2gfndu29j9u868h6ftma17tuc0', '2026-05-22 13:22:37', '102.220.41.213', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-22 13:22:37'),
(18700, 281, 'uv2njsl0qcmndl1lu9jrrepp8t', '2026-05-22 14:34:31', '193.148.48.26', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 14:34:31'),
(18701, 290, 'dcgsot344lpflvqj3t4aknu4tm', '2026-05-22 14:40:45', '192.145.175.178', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-22 14:34:48'),
(18702, 291, 'fhoji9s5qthrvol7codjec1fri', '2026-05-22 14:39:16', '192.145.168.84', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-05-22 14:39:16'),
(18704, 292, 'masjnrbuedg5jeo6sf3v2eudfh', '2026-05-22 15:49:38', '154.115.236.236', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 15:44:39'),
(18714, 293, 'kiodup7kqrsi86uroi80dulicd', '2026-05-22 18:58:40', '2a02:6b6f:f583:6100:f1fc:1616:68fd:515e', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 BytedanceWebview/d8a21c6 musical_ly_38.2.0 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/en Region/GB FalconTag/F293E378-9A22-4887-A849-3F0FF3CDB2F0', '2026-05-22 18:57:04'),
(18718, 294, 'fjnpkn21c8dvldjf3bh5a5kkcj', '2026-05-22 20:26:26', '192.145.175.187', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-22 20:26:26'),
(18719, 295, '3da8bm5eoi845s5rfjsdfce2a2', '2026-05-22 21:01:16', '154.115.237.51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15', '2026-05-22 20:59:28'),
(18727, 296, 'leehsm6r3gfgst9n428b3s2ne1', '2026-05-23 06:16:48', '192.145.175.214', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0', '2026-05-23 05:48:36'),
(18756, 297, 'nua1e6epm0afhq1pu93uh41k9l', '2026-05-23 16:49:29', '197.231.201.209', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-23 16:48:31'),
(18767, 298, 'un8ur7dhbqhrtbqq8ekjf2u1d4', '2026-05-23 17:34:31', '197.231.201.199', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-23 17:15:27'),
(18792, 299, '8lesqcqebrs7tpjc0jbemqr8im', '2026-05-23 18:39:55', '196.191.221.249', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-23 18:39:02'),
(18797, 188, '08qkeb8rtmh11p9u5hrjpsmb3a', '2026-05-23 19:22:54', '149.102.237.103', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/148.0.7778.166 Mobile/15E148 Safari/604.1', '2026-05-23 19:16:46'),
(18801, 300, 'lq82s6n8lp81ej2dng4mjlqe16', '2026-05-24 05:54:29', '102.220.42.131', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-24 05:52:57'),
(18808, 263, 'no82nff0pqkii0sgibbf318f4e', '2026-05-24 08:26:15', '89.144.222.4', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1 OPT/6.3.0', '2026-05-24 07:19:28'),
(18825, 301, 'e85m5un42efn39oe4344nsn8gm', '2026-05-24 09:50:07', '102.211.213.114', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-24 09:50:07'),
(18826, 302, 'mg10lsj1p0l61v6roajogm3spn', '2026-05-24 10:20:09', '192.145.175.103', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-24 10:18:49'),
(18861, 303, 'usnnn11f4juo1ojjvroupke45d', '2026-05-24 11:52:55', '192.145.168.165', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-05-24 11:48:07'),
(18900, 304, 'n7k0skmjc4atit6ef7j14qca2o', '2026-05-24 15:13:26', '192.145.170.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-24 14:33:34'),
(18926, 305, 'qhjtqvgh073k60ab2k27at90r9', '2026-05-24 19:13:30', '192.145.175.157', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-24 19:01:30'),
(18961, 306, 'hpt0hc9v8n04to0841li84dik2', '2026-05-25 10:23:43', '2001:569:51fe:300:4c2b:e4:ec61:73e3', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/420.4.909430193 Mobile/15E148 Safari/604.1', '2026-05-25 10:13:54'),
(18966, 307, 'hn4t0gv3gtabk4ql4d9ldhtpdd', '2026-05-25 18:58:05', '196.191.79.168', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-25 18:54:26'),
(18972, 308, 'mf1qsvbkibmvnc5hplge4hsjt6', '2026-05-25 19:38:39', '41.123.229.136', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-25 19:18:28'),
(19007, 309, '133utk4edl715h9dm9cbrju7r2', '2026-05-25 21:05:26', '41.223.109.217', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-25 21:02:17'),
(19016, 306, '9hglt5qdehh7psj93pvu4nffc4', '2026-05-25 21:58:22', '2001:569:51fe:300:2860:e58a:994b:fdef', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/420.4.909430193 Mobile/15E148 Safari/604.1', '2026-05-25 21:51:24'),
(19020, 308, 'h7ctdl19tqq4rj6ck3iquao57q', '2026-05-25 23:32:02', '154.115.221.170', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-25 22:10:17'),
(19027, 308, 'o405l4s3dpea9teg2d0r308uqo', '2026-05-25 22:16:56', '154.115.221.170', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-05-25 22:14:47'),
(19038, 310, '3644j1rg6ncujokj15ucqe9gh4', '2026-05-25 22:40:29', '105.164.22.8', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-25 22:40:29'),
(19044, 311, 'jj4el4hia732rqt94676e8g6bf', '2026-05-26 03:54:40', '2a09:bac1:27c0:cc0::46b:68', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-26 03:35:47'),
(19057, 267, '4vtifq784sdsiolup1d8k0migd', '2026-05-26 08:31:46', '209.38.216.18', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-26 08:27:04'),
(19109, 281, 'ub0bsb99qdap8i9eml7e2aebt0', '2026-05-26 19:17:04', '193.148.48.85', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-26 19:11:21'),
(19111, 281, 'atk3ubo5ncs7hl11lrbribp936', '2026-05-26 19:17:24', '193.148.48.85', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-26 19:17:12'),
(19113, 201, 'amjubcn9t9pb58be0n5a7rg92k', '2026-05-26 21:57:26', '197.231.201.185', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-26 21:46:11'),
(19117, 312, '75cv2mratlug6p64cokslpfhv8', '2026-05-27 06:42:28', '154.115.255.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-27 06:38:16'),
(19125, 313, 'rqahrd7blprr0pn6sss08vrek3', '2026-05-28 10:31:08', '197.231.201.216', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-05-28 09:49:22'),
(19136, 314, 'cgjuiln76aq04q7tsvt4aviauk', '2026-05-28 09:57:53', '154.115.235.84', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-28 09:57:34'),
(19138, 314, 'rcjn7ma1ett0mc3kfgef0aetnm', '2026-05-28 09:59:55', '154.115.235.84', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-28 09:58:46'),
(19140, 314, '646bjv9p2nb8enj7t8ouml4lct', '2026-05-28 10:01:24', '154.115.235.84', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-28 10:00:33'),
(19144, 314, 'tcgbt754v239o60ojuqacdaitf', '2026-05-28 10:05:50', '154.115.235.84', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-28 10:05:24'),
(19146, 315, 'o2c8oea0ic5nlfp96lalvl6nbn', '2026-05-28 10:10:58', '154.115.235.84', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-28 10:06:30'),
(19154, 316, 'tbspng2b1a12buqn8qqp29vucn', '2026-05-28 13:17:50', '154.115.211.133', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-28 13:17:36'),
(19157, 3, 'l8ftkhqral10fj489vj602irqs', '2026-05-28 17:19:01', '154.115.220.193', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-05-28 15:32:03'),
(19171, 317, 'kenlt66sl82kepo243ocg9087c', '2026-05-28 16:12:42', '197.231.203.55', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/148.0.7778.166 Mobile/15E148 Safari/604.1', '2026-05-28 16:07:35'),
(19181, 318, 'n6bcu30nc2uh0vlpstp679b5om', '2026-05-29 03:29:58', '102.220.41.217', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-29 03:20:52'),
(19215, 319, 'jbuqpmbmv10c7ofv8chnej17fc', '2026-05-29 12:28:17', '41.223.109.48', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-29 12:27:42'),
(19220, 245, 'ohmpvgqa0altheqbivjacrd92l', '2026-05-29 19:40:59', '197.231.201.195', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-29 19:30:27'),
(19240, 320, '75bi9hbv5mb5055ifu70m4l0ak', '2026-05-30 07:11:11', '41.223.109.220', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-05-30 06:57:19'),
(19266, 266, 'daghpsrjdive4dvbekkeqqif9u', '2026-05-30 08:17:09', '154.115.221.96', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-05-30 07:30:46'),
(19280, 321, 'vonavnpeom3nf848q00lqlah5r', '2026-05-30 15:23:28', '154.115.231.217', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-05-30 15:23:28'),
(19281, 321, 'ah8k5uk16poac5qr35bc5pg1ir', '2026-05-30 18:56:14', '154.115.231.44', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-05-30 18:52:01'),
(19294, 321, 'dtbhfdgjvql3t5jt4kv130lb3n', '2026-05-31 05:34:02', '154.115.223.253', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-05-31 05:34:02'),
(19295, 321, 'jqa373gtk85euujnamdng5lej4', '2026-05-31 05:34:04', '154.115.223.253', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-05-31 05:34:04'),
(19296, 245, 'vgieuuie17qalhjgkgoma3u2md', '2026-05-31 19:16:01', '197.231.201.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-31 19:10:37'),
(19306, 322, 'l92bpeu5li1mkmjmnqcejc2e56', '2026-05-31 19:52:26', '102.208.96.79', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-05-31 19:32:17'),
(19343, 323, 'tg6rdh5t5gpegp4sg45gqa2cur', '2026-06-01 04:39:41', '192.145.168.92', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-01 04:39:41'),
(19344, 321, 'qnp2ise5eoq7vb7oidrckr704k', '2026-06-01 17:08:38', '154.115.231.240', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-06-01 17:01:47'),
(19350, 321, '8k4kok883866k1dbig8rtv0krh', '2026-06-01 17:29:23', '154.115.231.240', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-06-01 17:27:56'),
(19352, 245, 'r5u6vuaca42cv3q0eii9ml2cba', '2026-06-01 20:05:59', '197.231.201.159', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-01 20:05:59'),
(19353, 245, 'tttose9s8k3qm6803doousabfo', '2026-06-01 20:11:10', '197.231.201.209', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-01 20:10:02'),
(19356, 266, 'gt9bb9m3t06rmfk568dcloh9ei', '2026-06-02 08:31:15', '154.115.221.180', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-06-02 07:37:10'),
(19363, 136, 'na4c6pfocfkt9b697fvjdqsdld', '2026-06-02 09:15:09', '154.115.220.172', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-06-02 07:57:39'),
(19387, 321, 'i7vinsm5uetm94hdfdq3i2mdbu', '2026-06-02 14:00:05', '41.79.196.70', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-06-02 14:00:05'),
(19388, 324, '76ol1shd67foablesbvsvhjh7n', '2026-06-02 14:51:27', '154.115.237.50', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-02 14:46:22'),
(19440, 245, '783cuq5qbicgq799u8dplemqtm', '2026-06-02 15:20:31', '197.231.201.209', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-02 15:20:19'),
(19445, 99, '63mjhvch552qjda2v9lcmgam1l', '2026-06-02 17:56:37', '154.115.236.201', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-02 17:55:57'),
(19448, 325, '3sqrlnr0dgrhohh7471dji1ard', '2026-06-02 21:24:05', '196.191.77.218', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-02 21:23:44'),
(19450, 47, '9fo3rvbr6cvqsp4dc6qhb7khih', '2026-06-03 03:59:27', '2a02:3030:a:39a0:61b3:32fc:c624:3418', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-03 03:53:42'),
(19453, 266, '6v9tqsukvvgs3tmq4lu603l06h', '2026-06-03 08:35:05', '197.231.201.223', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-06-03 07:09:17'),
(19478, 326, '8d18tic3i20u3h07p17cmm7se8', '2026-06-03 13:55:02', '154.115.236.174', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-06-03 13:53:43'),
(19483, 327, '32crqmhokh7ncj6osa04em2o92', '2026-06-03 16:16:04', '102.223.188.104', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-06-03 16:15:40'),
(19488, 328, '83ol412aukn4kgbh3424ospjtr', '2026-06-04 05:51:44', '2601:449:4401:de30:6cbe:649f:c800:920a', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-06-04 05:50:53'),
(19496, 329, 'ps73svdlds4hqu9dtjisnupo87', '2026-06-04 13:43:00', '192.145.175.244', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-04 13:25:07'),
(19513, 321, '169979a696g8go63fgihn7oebk', '2026-06-04 14:27:16', '41.79.196.70', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.3 Mobile/15E148 Safari/604.1', '2026-06-04 14:21:02'),
(19519, 330, 'ffiekl7mroirf9mvphk4sfrqgb', '2026-06-04 20:13:52', '154.115.236.27', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-04 20:13:52'),
(19520, 331, '7nuacquaq1vql9ejusbqq11oqf', '2026-06-05 04:43:28', '102.220.41.202', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-06-05 04:43:04'),
(19523, 99, 'hsrcu5c86jvrgbotq6qu0dfffe', '2026-06-05 07:42:35', '154.115.237.92', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-05 07:42:22'),
(19526, 3, 'g2g88jvia58kedpjbfp4ecq8kk', '2026-06-05 16:25:11', '197.231.201.211', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-05 16:03:05'),
(19537, 332, 'ers2tf0l03gkigjn1vh5bbk8ug', '2026-06-06 08:41:07', '197.231.201.194', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36', '2026-06-06 08:41:07'),
(19538, 63, '7o6c9b1qc0261n8fs0f76d8vhq', '2026-06-06 12:56:25', '105.160.73.174', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/148.0.7778.166 Mobile/15E148 Safari/604.1', '2026-06-06 12:55:42'),
(19545, 333, 's49r9hi70nunq4ustk61fmmbof', '2026-06-06 15:21:10', '102.220.41.215', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-06-06 14:51:38'),
(19608, 331, '4du1rf7ti17khk2j47ikdmgth3', '2026-06-06 16:07:49', '102.220.41.215', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/28.0 Chrome/130.0.0.0 Mobile Safari/537.36', '2026-06-06 15:55:50'),
(19627, 3, 'ma0kdjp7v43t2q7559ruahojl0', '2026-06-06 16:19:36', '197.231.201.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-06 16:00:43'),
(19636, 331, 'rqm519q4m6pbbs79s08qsjs4ro', '2026-06-06 16:25:52', '102.220.41.215', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-06-06 16:11:16'),
(19693, 331, '14lq5uvsg4l5q8uvesjj6pa1dn', '2026-06-06 16:45:01', '102.220.41.215', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-06-06 16:36:16'),
(19741, 331, 'msifmh4l9mlrkn0l8825h1h20l', '2026-06-06 18:32:56', '102.220.41.200', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-06-06 18:32:54'),
(19743, 263, 'mness5ddb93ftncb77nrjc5kjv', '2026-06-07 16:43:14', '213.147.167.16', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Mobile/15E148 Safari/604.1 OPT/6.3.0', '2026-06-07 16:03:38'),
(19755, 173, 'lf278700pf42hru2kq9em8otcp', '2026-06-07 16:28:59', '192.145.174.132', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-07 16:14:48'),
(19826, 334, 'kmn5duo7mv5va6r75q7ug0h68v', '2026-06-07 19:47:52', '102.218.59.66', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/423.5.920392540 Mobile/15E148 Safari/604.1', '2026-06-07 19:43:52'),
(19828, 47, 'b4ar91jm7u206902u1fumqt09j', '2026-06-08 03:54:31', '3.74.73.131', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-08 03:48:04'),
(19832, 335, 'a75nbeslt5lr5llg6021equebh', '2026-06-08 04:21:46', '102.218.59.64', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-06-08 04:21:46'),
(19833, 336, 'd6uacqco3i5h4eiepq5gt4g8bl', '2026-06-08 13:27:34', '197.220.91.70', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 13:00:14'),
(19841, 336, 'ravk3ahmco8734kqgd8c5qkqdi', '2026-06-08 13:28:12', '197.220.91.70', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 13:27:51'),
(19843, 336, 'bc3cjs2d31mk48m6tob3rdq7nh', '2026-06-08 14:19:31', '197.220.91.70', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 14:17:20'),
(19845, 336, 'aqs0c8q0f2q9dke21383gbh59q', '2026-06-08 14:22:09', '197.220.91.70', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 14:19:40'),
(19847, 63, 'pcogbg1d2vd7u80eu6qdbcs908', '2026-06-08 14:35:40', '105.164.119.86', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.45 Mobile/15E148 Safari/604.1', '2026-06-08 14:24:26'),
(19891, 336, 'a4n4r28s5j3ltlbeptffk2qm30', '2026-06-08 14:31:26', '197.220.90.40', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 14:30:25'),
(19893, 336, '51cetaarpu5faqaevp01tqr4jq', '2026-06-08 14:34:13', '197.220.90.40', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 14:31:38'),
(19898, 336, '9mqkh673eivq9lbjkicec90d7a', '2026-06-08 14:37:42', '197.220.90.40', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 14:34:26'),
(19921, 63, 'nv4ocuojngv5jlttarf2mbb5ct', '2026-06-08 16:02:02', '105.164.119.86', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_3_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.45 Mobile/15E148 Safari/604.1', '2026-06-08 16:01:49'),
(19924, 334, 'eqa4psb9q1icc6qdi58eeh9am6', '2026-06-08 18:22:03', '102.218.59.62', 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/423.5.920392540 Mobile/15E148 Safari/604.1', '2026-06-08 18:20:53'),
(19935, 336, 'srm5a16dj2suf4n15fdpt6nl82', '2026-06-08 19:06:31', '102.214.170.81', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-08 19:01:32'),
(19950, 337, 'emgf2jhj2i4kb3nokonbte9muh', '2026-06-09 03:38:34', '192.145.174.197', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-09 03:37:41'),
(19954, 338, '4foelqicgpec725q3vr7bc43c0', '2026-06-09 06:01:07', '197.231.201.222', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-09 05:47:14'),
(19964, 3, 's7rpvuf2qhtcbstdfk38c0nf1h', '2026-06-09 22:43:35', '154.115.220.90', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-09 16:06:04'),
(19978, 339, 'u74r0hn35qbhs41s4os69rcd7j', '2026-06-09 21:11:58', '64.62.219.22', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36', '2026-06-09 21:11:58'),
(19982, 266, 'ta540s2c7c6ffliumvtkuhq4ab', '2026-06-11 08:01:04', '197.231.201.193', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-06-11 07:50:02'),
(19997, 99, 'hu52d67t52pjnn8fvonc0cmn2v', '2026-06-11 10:39:32', '154.115.237.129', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-11 10:39:05'),
(20001, 340, 'sm4fkbrdojjhjvuav452v7pgo4', '2026-06-11 16:15:07', '102.68.16.67', 'Mozilla/5.0 (Linux; Android 16; SM-A155F Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/148.0.7778.217 Mobile Safari/537.36 musical_ly_2024504030 AppName/musical_ly ByteLocale/en-GB', '2026-06-11 16:12:14'),
(20003, 266, 'obdl62a44i5dm1kh4orkgv0j3q', '2026-06-11 17:44:06', '197.231.201.193', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36', '2026-06-11 16:44:12'),
(20023, 341, 'pokttl363d7587tsdqmrc4gbq9', '2026-06-12 17:16:49', '196.191.72.10', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-12 17:14:48'),
(20033, 342, 'cesmipd305ff9vld183agrmu9g', '2026-06-13 04:34:46', '197.231.203.53', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-13 04:32:47'),
(20056, 342, 'tv6et7vss9e4scfb2mcqnj55f4', '2026-06-13 05:00:12', '197.231.203.53', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-13 04:58:18'),
(20060, 63, '8dd35dm1585fhakue28b53a57j', '2026-06-13 19:16:33', '105.161.14.8', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.45 Mobile/15E148 Safari/604.1', '2026-06-13 18:43:18'),
(20065, 343, 'abnhrbvrveb1k7gj5dfioh9i7p', '2026-06-13 19:59:37', '154.115.236.55', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-13 19:58:01'),
(20074, 344, 'qs76i50kqdgq21mpp1ej67cn2i', '2026-06-13 22:40:30', '102.203.224.114', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-13 22:38:44'),
(20083, 345, '2dg8llkf57cn5ikhp2ofj2eq4s', '2026-06-14 02:40:36', '192.145.170.176', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-14 02:38:52'),
(20087, 207, '38c4mfiat4begt1nkqvc7tu79c', '2026-06-14 23:31:58', '154.115.237.88', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/148.0.7778.166 Mobile/15E148 Safari/604.1', '2026-06-14 23:28:01'),
(20107, 207, 'clrpj0be57i0s2i2r1dhvjfe36', '2026-06-14 23:51:16', '154.115.237.88', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_2_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/148.0.7778.166 Mobile/15E148 Safari/604.1', '2026-06-14 23:43:22'),
(20167, 346, 'cn92ljem7cnq5msvicrme5tgnf', '2026-06-15 06:34:03', '192.145.175.199', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-15 06:33:53'),
(20169, 347, '1ui9jkatqfh6rlqpdhagioakln', '2026-06-16 21:56:54', '154.115.223.123', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-16 21:56:26'),
(20171, 63, '5dib8jh5l0dtnmfbmhdutijri2', '2026-06-17 06:55:24', '41.60.250.87', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-17 06:55:17'),
(20174, 348, 'lfnlnaqlm3o5b99e7c5dhqpm1q', '2026-06-18 05:20:49', '197.231.203.54', 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-18 05:14:29'),
(20182, 349, '8912c91oujjcram0i858itmgo4', '2026-06-18 06:12:53', '197.231.201.183', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-18 06:12:20'),
(20185, 63, 'ufibf3sm27vn301b7mi0oic7ag', '2026-06-18 07:12:47', '41.139.224.117', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-18 06:35:56'),
(20194, 63, 'v0ias112lts4b0t46jrpja579o', '2026-06-18 09:36:00', '41.139.224.117', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-18 08:29:08'),
(20211, 277, 'c2rlqnajr9ptbl3v0hovcggn01', '2026-06-18 16:01:12', '154.115.239.1', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-18 16:00:09'),
(20216, 350, 'id3942hbnqhhdrv8210blf67u6', '2026-06-19 01:24:20', '102.69.234.154', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-19 01:20:52'),
(20219, 63, '8095fa83s6ffbu2ogf0plshs1r', '2026-06-19 09:38:36', '196.96.182.71', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-19 09:19:03'),
(20226, 63, 'qol3mmqtufigq8viaqmn5a80dk', '2026-06-19 11:32:27', '102.69.232.6', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-19 11:32:09'),
(20230, 351, 'o802jiivf24mr0oeerg0egrr5q', '2026-06-19 17:02:14', '154.115.236.191', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36', '2026-06-19 17:01:13'),
(20239, 47, 'i6qph8q8akno2c1fqadv5f268e', '2026-06-19 23:26:03', '2a02:3030:11:a3a2:5cdb:dc15:cec5:7dc2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-19 23:17:25'),
(20245, 47, 'mb9gmacm6gf70rckt7rvsm69oc', '2026-06-20 07:25:50', '2a02:3030:24:53fc:7cab:8204:81d0:f19b', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-20 03:52:34');
INSERT INTO "user_sessions" ("id", "user_id", "session_id", "last_activity", "ip_address", "user_agent", "created_at") VALUES
(20252, 352, '0j9rmrfj3t0d0nv6is8j84fmlo', '2026-06-20 06:59:34', '192.145.170.164', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-20 06:36:26'),
(20285, 352, 'cla5gcngs3mf5e5l4oekljk2o9', '2026-06-20 14:23:01', '192.145.170.164', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-20 08:57:55'),
(20287, 352, 'lpd0uvnkeb1sjj9kbfhpctuat8', '2026-06-20 09:20:18', '192.145.170.164', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-20 08:59:06'),
(20322, 352, 'vqsfhuuta9c3gn4lcn7h4d07tn', '2026-06-20 15:36:29', '192.145.168.38', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-20 15:36:14'),
(20329, 99, 'g73hmbdcf8ssmhtlarfvpgi97c', '2026-06-20 21:43:51', '197.231.201.179', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-20 21:43:08'),
(20332, 352, 'p9k4visf9vuma13ij6u5qb2spd', '2026-06-21 02:56:14', '192.145.175.156', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-21 02:55:25'),
(20336, 277, 'klftfg1l38vtv6di1cg36c0chv', '2026-06-21 06:05:13', '154.115.236.67', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-21 06:01:19'),
(20343, 277, '80dpvvbi8ikom70t962cgq61kn', '2026-06-21 07:50:45', '154.115.236.67', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-21 07:48:56'),
(20345, 136, 'coi601d145hjnhv945n9uq1gt6', '2026-06-21 10:36:00', '154.115.222.154', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-06-21 10:29:50'),
(20355, 353, 'vc78nlt5m2g914n0n5k5d9sgcb', '2026-06-21 11:06:22', '154.115.211.149', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-21 11:05:39'),
(20357, 354, 'nvee61sa12phf9b381qb69qjup', '2026-06-21 13:37:56', '192.145.175.174', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/30.0 Chrome/143.0.0.0 Mobile Safari/537.36', '2026-06-21 13:28:57'),
(20363, 355, 'j2e0079gajosagp1lde5lqpm90', '2026-06-21 15:36:08', '196.191.79.100', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-21 15:30:03'),
(20377, 356, 'r6l10rnde2n5oo5fuubnjr2rr6', '2026-06-21 16:40:45', '154.115.221.45', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-21 16:37:42'),
(20395, 357, 'luv1av1bgri6cft0m84cs3m9i9', '2026-06-21 22:04:24', '197.231.203.57', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/425.6.927981711 Mobile/15E148 Safari/604.1', '2026-06-21 22:01:37'),
(20397, 358, 'athmpl6jgdtgpbfefdci4nr0qo', '2026-06-21 22:03:09', '102.68.19.38', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-21 22:02:29'),
(20408, 359, 'osing7o294jrlj1co54e7f5na3', '2026-06-22 06:51:39', '2604:3d09:4198:7700:691d:df99:487f:d2b3', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148', '2026-06-22 06:50:58'),
(20410, 360, 'm3hn4ql2vshm8ubcgrp14h4uu4', '2026-06-22 15:09:24', '192.145.175.138', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-22 14:15:22'),
(20419, 99, 'p3nn10e56qsdge1pqrp00oif5i', '2026-06-22 17:58:19', '154.115.237.253', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-22 15:59:47'),
(20452, 47, 'pa0b2l0usdioil429osef5ea17', '2026-06-22 22:27:02', '2a02:3030:10:8fa5:ae82:21cc:f83a:e696', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-22 22:25:57'),
(20455, 47, 'e57grann07rjh5hpvn1lp0ts7u', '2026-06-23 03:58:01', '2a02:3030:2:4520:f76c:3882:ebfd:d093', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-23 03:54:09'),
(20461, 99, '006vgfb61o49lifpe24qoar0q4', '2026-06-23 09:30:28', '154.115.236.32', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-23 06:58:42'),
(20468, 99, '05bumlk5qpidr8i5f0h9r5n8li', '2026-06-23 10:41:34', '154.115.236.32', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-23 09:31:08'),
(20484, 99, '1upjkligt23vdanj47qngtrkva', '2026-06-23 13:19:32', '154.115.223.51', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-23 12:48:31'),
(20490, 99, 'dktp10ud0ajq6kaniun9e8k6pu', '2026-06-23 15:56:24', '154.115.236.32', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-23 15:04:10'),
(20495, 47, 'k0p1gqsg8g1l1c6c208516am7c', '2026-06-23 22:28:33', '2a02:3030:20:78e8:6b82:fb7d:4a44:dfcd', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-23 22:23:04'),
(20502, 361, 'cch7k86c6oa6gtu3jthv8amq1q', '2026-06-23 23:30:58', '154.115.211.72', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-23 22:38:53'),
(20531, 47, 'f2u9u9t74h3nbspn82c3rj8tsp', '2026-06-24 03:58:15', '2a02:3030:9:1286:bdb2:735b:95c9:468e', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-24 03:53:12'),
(20538, 362, '7crhk0ha45g62m47c2es5hhafi', '2026-06-24 07:28:24', '154.115.236.74', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-24 07:28:06'),
(20541, 363, 'mq32elclokqe9eqpeglmihq3ce', '2026-06-24 10:32:23', '192.145.170.196', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-24 10:32:23'),
(20542, 364, 'pqeetljlao57f13nifcgbgb2v4', '2026-06-24 13:42:39', '197.231.203.57', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/30.0 Chrome/143.0.0.0 Mobile Safari/537.36', '2026-06-24 13:41:54'),
(20554, 365, '80ag6mdvqe2o02f8hpjdmgg60j', '2026-06-24 14:52:55', '154.115.236.251', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-24 14:51:55'),
(20565, 3, 'uaehpgmb7ad309d4mnbg09lrou', '2026-06-24 15:28:07', '154.115.220.156', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-24 15:27:36'),
(20570, 366, '50ke35df9s9ofm838s1117ke1h', '2026-06-24 21:30:11', '154.115.222.169', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-24 21:21:07'),
(20586, 367, '608314qhvrs4sohs863kntrv8v', '2026-06-24 21:43:18', '196.189.31.47', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/425.6.927981711 Mobile/15E148 Safari/604.1', '2026-06-24 21:43:07'),
(20588, 47, 'smm3n896rju0mjjuv8bhdbpotn', '2026-06-24 22:23:24', '2a02:3030:1d:3dda:a2f1:b954:4b0:b643', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-24 22:11:33'),
(20591, 368, 'vugfpttvie19stf7vifohjvhg7', '2026-06-25 04:28:59', '102.208.96.174', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-25 04:28:59'),
(20592, 366, 'ase4i8uggrn97jfbm7i01bhnch', '2026-06-25 08:13:17', '154.115.222.169', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-25 07:30:30'),
(20597, 369, '6bbkhmir3t8fejphbsgiqergvh', '2026-06-25 08:32:37', '197.231.203.56', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-25 08:21:46'),
(20618, 370, 'cq8vk6p83h6s02o9m9rhur9upp', '2026-06-25 09:03:00', '197.231.203.59', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-25 08:56:58'),
(20627, 352, 'b611bql9a6b6m5a76eincjofo0', '2026-06-25 11:09:48', '192.145.168.171', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', '2026-06-25 11:09:35'),
(20630, 351, 'k2ms6jc0uo5s76a4jp1k3vf2ke', '2026-06-25 12:01:22', '154.115.236.231', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36', '2026-06-25 11:59:48'),
(20635, 371, 'at4fk916aitgu7le1k8u960njs', '2026-06-25 22:15:53', '192.145.170.106', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-25 22:14:14'),
(20651, 50, '6a29g8rrktbhkhb9642j23muuk', '2026-06-26 05:47:00', '197.231.201.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-26 05:25:08'),
(20666, 372, 'p03kdmq4kj5tovfrh0rs37c71m', '2026-06-26 09:57:57', '192.145.174.243', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-26 09:54:19'),
(20682, 321, 'hmi33qs10udqvgq5gaeejag2tb', '2026-06-26 11:54:55', '41.79.196.73', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-06-26 11:42:17'),
(20703, 136, '1e7db2it6lnv335n3gtpm426fl', '2026-06-26 12:32:02', '154.115.232.173', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-06-26 12:09:34'),
(20707, 321, '8mse16gql102f5tthe7pe0hner', '2026-06-26 12:51:35', '41.79.196.73', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-06-26 12:37:57'),
(20711, 50, '12o14lbhn5rh6lkmom9q40a55i', '2026-06-26 16:45:49', '197.231.201.159', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-26 16:40:22'),
(20718, 277, 'fluioaa4p9giqrmrc6n1vtha14', '2026-06-26 16:42:22', '154.115.236.15', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-26 16:42:22'),
(20720, 47, 'ij27od67hkr0j0d8nlem3cvsh3', '2026-06-26 22:27:30', '2a02:3030:6:1d62:f719:1484:c93:964b', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-26 22:23:48'),
(20725, 352, '32f40c32dd518m8ge0bdik4ged', '2026-06-27 04:38:48', '192.145.175.244', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/149.0.7827.137 Mobile/15E148 Safari/604.1', '2026-06-27 04:26:17'),
(20732, 373, '6pim6silntsm8dagd08fod3be7', '2026-06-27 09:07:17', '102.218.59.11', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 09:06:54'),
(20738, 374, 'tia1mv6eo20gn7516c9fmq4oro', '2026-06-27 11:22:31', '192.145.170.213', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-06-27 11:17:46'),
(20739, 136, 'anrg1orsappkpanjk0lo1m0ast', '2026-06-27 11:47:34', '154.115.231.170', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-06-27 11:18:08'),
(20766, 260, 'evc6chc7p0qvme7he35qfdurs9', '2026-06-27 12:36:22', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 12:34:29'),
(20771, 260, '48t7rjem5rpsqpu8kjr30nam7d', '2026-06-27 12:36:33', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 12:36:33'),
(20772, 260, 'lk2j36ttgmahm2sgt6ok3csla3', '2026-06-27 12:58:07', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 12:58:07'),
(20773, 260, 'eddmg0rr4omaqf5p1k58o5vl5l', '2026-06-27 13:28:57', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 13:28:36'),
(20778, 260, 'm8sk8kdka606lg29hb4rkj3em9', '2026-06-27 13:35:40', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 13:34:58'),
(20781, 260, '40kb65t8ae09r9ehs4bta19832', '2026-06-27 13:38:10', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 13:38:10'),
(20782, 260, '4tjjp7149je7f5i016q8hb6gog', '2026-06-27 13:42:48', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 13:41:02'),
(20789, 260, 'ojniudkjv3oihtk06irr60ipha', '2026-06-27 13:43:07', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 13:43:04'),
(20791, 260, 'c36bko6pia8soehme65vaikqsv', '2026-06-27 13:46:11', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 13:43:13'),
(20800, 260, 'iasjgqc2s0lou9msc5432s323a', '2026-06-27 13:51:17', '154.115.211.2', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 13:51:17'),
(20801, 99, 'q10aogbq1qilm7p25pnh5b9lrd', '2026-06-27 17:58:10', '197.231.201.206', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 17:57:02'),
(20809, 78, 'iphsut2fe868caa8468f5lbmsi', '2026-06-27 18:29:19', '2.27.242.25', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-27 18:10:59'),
(20829, 375, 'ca19jce7655ve0g0rn59grql1h', '2026-06-27 19:52:55', '196.191.72.108', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-27 19:52:15'),
(20833, 376, 'k0qa171t7vs4n6f0er9lofhrvm', '2026-06-28 05:09:54', '197.220.92.46', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-28 05:09:54'),
(20834, 50, 'gek4t5g5jbddtdm73s9kib3n60', '2026-06-28 06:31:28', '197.231.201.201', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-28 06:05:00'),
(20841, 277, 'unba36u08vkkddefsor77mqnrn', '2026-06-28 15:08:55', '154.115.237.19', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-28 14:27:52'),
(20864, 47, 'knvnc5ulffdp3c3o275k5hm15m', '2026-06-29 03:47:04', '2a02:3030:c:fc50:3122:c48f:1e4a:b54a', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-06-29 03:46:21'),
(20867, 377, 'lrqcgnlb5maadn8lt8ff3v14a3', '2026-06-29 10:34:39', '216.106.183.191', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-06-29 09:43:21'),
(20901, 378, 'ubl31du9udersbd3t5sihm2vt6', '2026-06-29 19:30:48', '102.218.51.151', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-06-29 19:30:48'),
(20902, 379, 'k14chu527fem7s2en46mb8sjqg', '2026-06-29 20:25:03', '197.231.201.190', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_11 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/137.0.7151.79 Mobile/15E148 Safari/604.1', '2026-06-29 20:25:03'),
(20903, 380, 'h849gq25m51ejmn32hd8qaeq94', '2026-06-29 21:34:16', '197.231.201.195', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-06-29 21:34:16'),
(20904, 366, 'ns214nfolrcj4qt41ptv5ec7n9', '2026-06-30 14:36:30', '154.115.222.43', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-06-30 13:16:03'),
(20920, 381, 'f1unhfhbflgkr106oqia6veg11', '2026-06-30 21:05:02', '197.231.201.228', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', '2026-06-30 20:52:24'),
(20932, 377, 'fncmk2env0a0j4g13a798ep0e1', '2026-07-01 02:57:15', '102.212.136.37', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-01 02:43:19'),
(20940, 47, 'h1avngl0bbrlsp9iks5kgu15gc', '2026-07-01 03:58:13', '2a02:3030:14:fb83:49f0:76c8:240b:f01a', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-01 03:48:04'),
(20944, 382, 'jie01c2tdhheg5ht0kk8a6fpdc', '2026-07-01 15:42:31', '154.115.236.62', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36', '2026-07-01 15:41:53'),
(20948, 99, 'fi6jolukqcnkcvpmsi88u2vj5i', '2026-07-01 18:10:28', '154.115.236.233', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-01 18:09:59'),
(20951, 99, '8ejuuabtqhaq5tumt0td033keh', '2026-07-01 19:46:45', '154.115.236.233', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-01 19:29:31'),
(20956, 47, 'upf5p8h5ou2oh07km1bkb3poau', '2026-07-02 03:52:54', '2a02:3030:2f:1aeb:6b2f:d730:39f2:7c97', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-02 03:52:28'),
(20959, 136, '2qn2rdb3jt45vegg3kujq7kebe', '2026-07-02 09:46:16', '154.115.221.174', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-07-02 09:24:37'),
(20968, 383, 'r42gqd88041amdpeg396v70gp1', '2026-07-02 10:14:53', '156.38.63.155', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-02 10:08:03'),
(20980, 201, '6tjjbchti7bho073v9eh1gu62e', '2026-07-02 22:37:11', '154.115.220.176', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-02 22:22:16'),
(20993, 384, 'e9196rtoup8h1k53tu8auq8q5u', '2026-07-03 08:40:25', '197.231.201.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-07-03 08:32:29'),
(21019, 385, '2h3amh09egjt9l790auag9rqes', '2026-07-03 18:48:07', '196.191.79.62', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-03 18:33:26'),
(21081, 386, 'rojcjs97mn01qf1mc7rqq4bql3', '2026-07-04 02:06:30', '2001:9b1:cbe2:3b00:71e3:9ae1:9854:3551', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-04 02:06:30'),
(21082, 387, 'o4flj0lg8s41ac036sn7etieli', '2026-07-04 15:01:19', '154.115.211.222', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-04 15:00:24'),
(21088, 388, 'gpj5nckq4q4g0u84abfpr250ql', '2026-07-04 20:48:11', '192.145.175.221', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-04 20:13:53'),
(21099, 47, 'ni8rjr28f8mkt4a97l7fa8hp97', '2026-07-06 03:54:08', '2a02:3030:4:28cc:2171:d5ba:fafd:2b91', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-06 03:53:44'),
(21102, 389, 'ir9b5j7h7svdqo1b9p77ppjdfl', '2026-07-06 14:44:39', '197.231.201.200', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-06 14:43:09'),
(21111, 390, '26fbdlt7bml4lq8tisrcme60r5', '2026-07-06 16:16:20', '197.231.203.18', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-06 16:06:08'),
(21115, 391, '0f5oq6i26bslarp7rven4o7utq', '2026-07-06 16:07:47', '197.231.203.54', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-06 16:06:34'),
(21148, 392, 'uu26e1ajsrv74mj256mc6dpp2k', '2026-07-06 17:29:09', '102.223.190.32', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36', '2026-07-06 17:19:39'),
(21185, 384, 'r3a7k9a7k3sm72cekkhv2dsrqr', '2026-07-07 16:57:18', '197.231.201.208', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Mobile Safari/537.36', '2026-07-07 16:56:51'),
(21188, 3, '8guo4b40en97cp0fearrhebl7t', '2026-07-09 00:23:49', '154.115.221.141', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', '2026-07-07 20:06:45'),
(21192, 393, 'aa20t69436814op18fufh0eprf', '2026-07-08 22:27:06', '192.145.168.188', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/29.0 Chrome/136.0.0.0 Mobile Safari/537.36', '2026-07-08 22:26:42'),
(21197, 47, 'vcl742aibtt7sjsl7atucilker', '2026-07-08 23:24:06', '2a02:3030:2f:8686:c24a:f39e:166d:734f', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-08 23:23:49'),
(21202, 394, 'i31o0jujc72pjt3qv7j5as2pej', '2026-07-09 02:41:00', '197.231.203.53', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-09 02:23:57'),
(21226, 47, 'n2ma1l3411fb78sikbepavpjjs', '2026-07-09 03:52:29', '2a02:3030:1b:34b8:6706:47ae:9a2d:150d', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-09 03:51:53'),
(21229, 395, 'sudo226vf79g53nv4koa9dla7s', '2026-07-09 08:39:10', '154.115.236.28', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-07-09 08:37:47'),
(21236, 396, '6s0c9g87vsqtung5ve0b221dac', '2026-07-09 08:55:55', '192.145.168.49', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-09 08:52:32'),
(21243, 394, 'pookvvhfl86vfdujjt602vpbl0', '2026-07-09 10:58:46', '197.231.203.57', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-09 10:58:46'),
(21244, 394, 'qi0vftheg36fc6oav7h7kh2478', '2026-07-09 11:02:12', '197.231.203.57', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-09 10:58:47'),
(21249, 394, 'oopro4uptoe98c5sop5udfeh6g', '2026-07-09 21:56:40', '197.231.203.53', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-09 21:52:39'),
(21252, 394, 'rv0sdru83s1msvn9h2tlp2bjnb', '2026-07-10 01:35:15', '154.115.222.68', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/15E148 Safari/604.1', '2026-07-10 01:33:11'),
(21257, 18, 'rs6ues21gtqhathmin1chtaloo', '2026-07-10 09:55:56', '192.145.170.171', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-10 09:55:56'),
(21258, 152, 's664qgrg5kk8g2cc6pscvoc0id', '2026-07-10 10:28:00', '154.115.237.32', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-10 10:28:00'),
(21259, 397, '2bg93oq7qi6psjm01cgm5glh0r', '2026-07-10 19:59:12', '41.79.199.5', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1', '2026-07-10 19:58:53'),
(21264, 47, 'vr8vbjokeamjs19m88s2rriae5', '2026-07-11 03:58:15', '2a02:3030:7:abc1:2658:80da:6c8e:5f59', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-11 03:46:06'),
(21268, 398, 'tmb6rdq43jmedb7a4g5uh7jrnp', '2026-07-11 18:59:34', '102.223.190.33', 'Mozilla/5.0 (Linux; U; Android 16; en-gb; CPH2695 Build/BP2A.250605.015) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.5970.168 Mobile Safari/537.36 HeyTapBrowser/45.14.3.1', '2026-07-11 18:54:50'),
(21287, 399, 'drdv0ifb90vi6rapt11noqg4o9', '2026-07-12 13:28:06', '196.191.223.145', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-12 13:28:06'),
(21288, 399, 'n0hfnjnvo03p0hcrmcq6b0e6br', '2026-07-12 14:24:13', '196.188.252.155', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-12 13:55:59'),
(21321, 400, '1hcuiq13q0ct0ru41tp9652pcf', '2026-07-12 20:12:53', '154.115.211.187', 'Mozilla/5.0 (iPad; CPU OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/160.0.373863126 Mobile/15E148 Safari/604.1', '2026-07-12 20:09:33'),
(21342, 47, 'epn2ikr16q36illqp1bm7a9md3', '2026-07-13 03:53:01', '2a02:3030:1e:29d9:2cf6:acd2:409c:52d0', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-13 03:52:21'),
(21345, 401, '8qpolfe992jf0pfcs7dq7dj9dp', '2026-07-13 09:44:50', '124.153.16.106', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-13 09:37:28'),
(21354, 402, 'etkoi6u4ojr0g4h7jkvn6sv6t0', '2026-07-13 10:30:50', '192.145.168.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-13 10:30:20'),
(21359, 403, '5v0ck0qbkjbg74qk8ji7lb6lir', '2026-07-13 10:31:46', '192.145.168.173', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-13 10:31:07'),
(21367, 404, 'm7mi20kvsgf1un2mv5g2ckpoa0', '2026-07-13 22:33:39', '192.145.174.188', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-13 22:32:52'),
(21377, 47, '7hljbc9lq0j21aj0dcfgad4coa', '2026-07-13 23:25:08', '2a02:3030:9:334f:7054:df2e:5483:e7c4', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-13 22:37:05'),
(21381, 405, 'rvvgi7c5cnjrgh75mrit646scd', '2026-07-14 06:48:06', '154.115.223.51', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-14 06:46:13'),
(21392, 47, 'h9avdcj06r6volt0q40to3c0da', '2026-07-14 09:06:46', '2a02:3030:8:9ced:ee94:2e64:5952:8602', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-14 08:57:03'),
(21398, 406, '05i4i7vr8g69scmurraqhs5s83', '2026-07-14 15:36:17', '41.79.198.1', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-14 15:36:17'),
(21399, 407, '8v7cnt3clpsfeoccrr30pgk9ls', '2026-07-14 19:25:05', '154.115.211.118', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-14 19:18:25'),
(21408, 408, 'sp1dbpg7jsbrcr6n7133qkr7gq', '2026-07-14 21:23:57', '154.115.224.142', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/150.0.7871.51 Mobile/15E148 Safari/604.1', '2026-07-14 21:23:32'),
(21410, 409, '5g1d9fsstetvuvak7igciccjt0', '2026-07-14 23:37:49', '154.115.220.100', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-14 23:36:01'),
(21415, 99, '6ije7hcmhmu2mua4hfmidl16tp', '2026-07-15 14:21:06', '154.115.237.1', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-15 08:17:45'),
(21461, 136, '9dviffn47qnj3a1gf38j54f23o', '2026-07-15 11:49:03', '154.115.221.186', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-07-15 11:48:28'),
(21468, 410, 'lnuqubi666fu0fkl0g08vb9c7c', '2026-07-15 16:50:59', '102.141.198.157', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-15 16:50:22'),
(21470, 410, '5n0616bgsk5bghevc1bonkdubs', '2026-07-15 16:56:57', '102.141.198.157', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-15 16:51:28'),
(21487, 188, 'upilmfgueubbog1g9seip4mvcs', '2026-07-15 20:06:16', '154.115.221.49', 'Mozilla/5.0 (iPhone; CPU iPhone OS 26_5_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/150.0.7871.51 Mobile/15E148 Safari/604.1', '2026-07-15 19:56:56'),
(21510, 47, 'g0vsc6tdh8913mhrq7du5rucsr', '2026-07-15 23:23:33', '2a02:3030:2d:948a:a05b:cba2:6557:2551', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-15 23:22:52'),
(21513, 336, '3i19g5o3nv9miplqomj324h6ah', '2026-07-16 03:42:34', '197.220.91.47', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-16 03:41:51'),
(21534, 47, 'f17e1k0rhmqa3gntsig8q0eftl', '2026-07-16 03:53:54', '2a02:3030:10:d5a9:1b9b:42ab:c5c2:6c81', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-16 03:51:49'),
(21538, 47, '5ov57qk2s04ha65gjuma7tgo8t', '2026-07-17 03:54:42', '2a02:3030:5:e467:464d:d0e4:88f4:a0c', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36', '2026-07-17 03:52:26'),
(21543, 412, 'mqfc77ml4qlvs774dgg04js2uk', '2026-07-17 20:07:33', '197.231.200.10', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-17 19:58:11'),
(21553, 413, '686ac30oqm38bd63pvdu3v7mur', '2026-07-18 07:26:26', '193.108.117.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-18 07:21:34'),
(21562, 414, '3femhj1ut2t9oouahs176mv96c', '2026-07-18 07:34:33', '193.108.117.152', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-18 07:29:57'),
(21569, 136, 'r3c8qdqjor3dkq70jv95b1c78b', '2026-07-18 12:23:31', '154.115.221.124', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.4 Mobile/15E148 Safari/604.1', '2026-07-18 10:50:49'),
(21575, 415, '5mfsni9sk4t5g98iruugga3uvq', '2026-07-18 19:58:51', '154.115.236.73', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-18 19:58:51'),
(21576, 99, 'jcsmeu7pj3vfo7rv44v2sli79s', '2026-07-18 22:22:57', '197.231.200.7', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-18 22:21:12'),
(21581, 386, 'uijn0v628e0hvgs9bmjs0hhipk', '2026-07-19 06:14:47', '2001:9b1:cbe2:3b00:9512:6d4a:a90b:b344', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/15E148 Safari/604.1', '2026-07-19 02:50:00'),
(21619, 413, '24hjc5v4v90g7rbdabr6t1dkb8', '2026-07-19 05:19:39', '172.99.189.87', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-19 05:19:39'),
(21620, 413, '3uit1lfkkojh9jp7o2dlina68h', '2026-07-19 05:23:40', '172.99.189.87', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-19 05:21:35'),
(21634, 413, 'pt4180bauqu7rhrj64q8ho5ss0', '2026-07-19 05:25:19', '172.99.189.87', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-19 05:24:38'),
(21637, 413, 'oa5dm7q80capo4lvhfakki643g', '2026-07-19 05:36:05', '172.99.189.87', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Mobile Safari/537.36', '2026-07-19 05:25:35'),
(21712, 386, 'ubl6gvvlsu0cdqm9s8shuo6e2q', '2026-07-19 06:15:11', '2001:9b1:cbe2:3b00:9512:6d4a:a90b:b344', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/15E148 Safari/604.1', '2026-07-19 06:15:11'),
(21713, 386, '4a7af6k1abff4flrt0gn9ueol2', '2026-07-19 07:58:40', '2001:9b1:cbe2:3b00:9512:6d4a:a90b:b344', 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5.2 Mobile/15E148 Safari/604.1', '2026-07-19 07:29:28'),
(21772, 416, 'sh14rjfp2fbtf87d05hu0tjl61', '2026-07-19 10:14:16', '102.223.188.78', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Mobile Safari/537.36', '2026-07-19 10:13:36');
INSERT INTO "user_summaries" ("user_summary_id", "user_id", "summary_id", "payment_id", "access_count", "last_accessed", "acquired_date", "reading_status", "rating", "review_id") VALUES
(1, 1, 7, 0, 0, NULL, '2025-11-04 09:15:20', 'not_started', NULL, NULL),
(2, 42, 12, 24, 0, NULL, '2025-12-20 09:33:19', 'not_started', NULL, NULL),
(3, 136, 12, 47, 0, NULL, '2026-02-20 10:37:15', 'not_started', NULL, NULL);

-- STEP 4: Convert integer columns to proper PostgreSQL BOOLEAN
-- Must DROP DEFAULT first, then change type, then SET DEFAULT again.
ALTER TABLE blog_categories ALTER COLUMN is_active DROP DEFAULT;
ALTER TABLE blog_categories ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1);
ALTER TABLE blog_categories ALTER COLUMN is_active SET DEFAULT true;

ALTER TABLE blog_posts ALTER COLUMN is_featured DROP DEFAULT;
ALTER TABLE blog_posts ALTER COLUMN is_featured TYPE BOOLEAN USING (is_featured = 1);
ALTER TABLE blog_posts ALTER COLUMN is_featured SET DEFAULT false;

ALTER TABLE blog_posts ALTER COLUMN allow_comments DROP DEFAULT;
ALTER TABLE blog_posts ALTER COLUMN allow_comments TYPE BOOLEAN USING (allow_comments = 1);
ALTER TABLE blog_posts ALTER COLUMN allow_comments SET DEFAULT true;

ALTER TABLE books ALTER COLUMN is_paid DROP DEFAULT;
ALTER TABLE books ALTER COLUMN is_paid TYPE BOOLEAN USING (is_paid = 1);
ALTER TABLE books ALTER COLUMN is_paid SET DEFAULT false;

ALTER TABLE books ALTER COLUMN is_active DROP DEFAULT;
ALTER TABLE books ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1);
ALTER TABLE books ALTER COLUMN is_active SET DEFAULT true;

ALTER TABLE book_insights ALTER COLUMN is_active DROP DEFAULT;
ALTER TABLE book_insights ALTER COLUMN is_active TYPE BOOLEAN USING (is_active = 1);
ALTER TABLE book_insights ALTER COLUMN is_active SET DEFAULT true;

ALTER TABLE password_reset_tokens ALTER COLUMN used DROP DEFAULT;
ALTER TABLE password_reset_tokens ALTER COLUMN used TYPE BOOLEAN USING (used = 1);
ALTER TABLE password_reset_tokens ALTER COLUMN used SET DEFAULT false;

ALTER TABLE payments ALTER COLUMN notify_sent DROP DEFAULT;
ALTER TABLE payments ALTER COLUMN notify_sent TYPE BOOLEAN USING (notify_sent = 1);
ALTER TABLE payments ALTER COLUMN notify_sent SET DEFAULT false;

ALTER TABLE reading_progress ALTER COLUMN completed DROP DEFAULT;
ALTER TABLE reading_progress ALTER COLUMN completed TYPE BOOLEAN USING (completed = 1);
ALTER TABLE reading_progress ALTER COLUMN completed SET DEFAULT false;

ALTER TABLE summaries ALTER COLUMN is_paid DROP DEFAULT;
ALTER TABLE summaries ALTER COLUMN is_paid TYPE BOOLEAN USING (is_paid = 1);
ALTER TABLE summaries ALTER COLUMN is_paid SET DEFAULT false;

ALTER TABLE users ALTER COLUMN profile_complete DROP DEFAULT;
ALTER TABLE users ALTER COLUMN profile_complete TYPE BOOLEAN USING (profile_complete = 1);
ALTER TABLE users ALTER COLUMN profile_complete SET DEFAULT false;

-- STEP 5: Reset sequences so new rows get correct IDs
SELECT setval(pg_get_serial_sequence('"admin_users"', 'id'), COALESCE((SELECT MAX("id") FROM "admin_users") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"blog_categories"', 'id'), COALESCE((SELECT MAX("id") FROM "blog_categories") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"blog_posts"', 'id'), COALESCE((SELECT MAX("id") FROM "blog_posts") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"books"', 'id'), COALESCE((SELECT MAX("id") FROM "books") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"book_insights"', 'id'), COALESCE((SELECT MAX("id") FROM "book_insights") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"daily_stats"', 'id'), COALESCE((SELECT MAX("id") FROM "daily_stats") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"oauth_providers"', 'id'), COALESCE((SELECT MAX("id") FROM "oauth_providers") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"password_reset_tokens"', 'id'), COALESCE((SELECT MAX("id") FROM "password_reset_tokens") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"payments"', 'id'), COALESCE((SELECT MAX("id") FROM "payments") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"reading_progress"', 'id'), COALESCE((SELECT MAX("id") FROM "reading_progress") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"site_settings"', 'id'), COALESCE((SELECT MAX("id") FROM "site_settings") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"summaries"', 'id'), COALESCE((SELECT MAX("id") FROM "summaries") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"users"', 'user_id'), COALESCE((SELECT MAX("user_id") FROM "users") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"user_books"', 'user_book_id'), COALESCE((SELECT MAX("user_book_id") FROM "user_books") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"user_summaries"', 'user_summary_id'), COALESCE((SELECT MAX("user_summary_id") FROM "user_summaries") + 1, 1), false);
SELECT setval(pg_get_serial_sequence('"user_sessions"', 'id'), COALESCE((SELECT MAX("id") FROM "user_sessions") + 1, 1), false);

-- STEP 6: Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE oauth_providers ENABLE ROW LEVEL SECURITY;

-- STEP 7: Public read policies (now safe because columns are BOOLEAN)
CREATE POLICY "Public read books" ON books FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blog categories" ON blog_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read book insights" ON book_insights FOR SELECT USING (is_active = true);
CREATE POLICY "Public read summaries" ON summaries FOR SELECT USING (true);
CREATE POLICY "Public read site settings" ON site_settings FOR SELECT USING (true);

-- DONE! All data migrated and secured.