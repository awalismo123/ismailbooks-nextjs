const fs = require('fs');
let content = fs.readFileSync('src/app/admin/page.tsx', 'utf-8');

// Replace tabs type
content = content.replace(
  'type Tab = "overview" | "payments" | "books" | "users";',
  'type Tab = "overview" | "payments" | "books" | "blogs" | "users";'
);

// Add state for modals and blogs
content = content.replace(
  'const [books, setBooks] = useState<Book[]>(initialBooks);',
  `const [books, setBooks] = useState<Book[]>(initialBooks);
  const [blogs, setBlogs] = useState<any[]>([
    { id: 1, title: 'Ku soo dhawoow Adduunka Falsafadda', category: 'Falsafad', date: '2026-07-20', views: 120 },
    { id: 2, title: 'Awoodda Caadooyinka Wanaagsan', category: 'Horumarinta Nafta', date: '2026-07-18', views: 85 }
  ]);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);`
);

// Add blog tab to the tabs array
content = content.replace(
  '{ id: "books", label: "Buugaagta", icon: <BookOpen className="w-4 h-4" /> },',
  `{ id: "books", label: "Buugaagta", icon: <BookOpen className="w-4 h-4" /> },
    { id: "blogs", label: "Blog-ga", icon: <FileText className="w-4 h-4" /> },`
);

// Update 'Kudar Buug Cusub' button logic
content = content.replace(
  /onClick=\{\(\) => alert\("Fur foom buug cusub…"\)\}/g,
  'onClick={() => { setEditingBook(null); setBookModalOpen(true); }}'
);
content = content.replace(
  /onClick=\{\(\) => alert\("Fur form buug cusub…"\)\}/g,
  'onClick={() => { setEditingBook(null); setBookModalOpen(true); }}'
);
content = content.replace(
  /onClick=\{\(\) => alert\(`Tafatir buugga \$\{b\.id\}…`\)\}/g,
  'onClick={() => { setEditingBook(b); setBookModalOpen(true); }}'
);

// Add the blog tab UI and modals at the end just before </main>
const injectUI = `
          {/* ── Blogs Tab ── */}
          {activeTab === "blogs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-white">Qoraallada Blog-ga ({blogs.length})</h2>
                <button
                  onClick={() => { setEditingBlog(null); setBlogModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-[#70193D] text-white text-xs font-bold flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Qoraal Cusub
                </button>
              </div>
              <div className="glass-card rounded-2xl border border-white/5 overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="bg-[#1C1C26] text-[#8A8699] uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">Ciwaanka</th>
                      <th className="p-4">Qaybta</th>
                      <th className="p-4">Taariikhda</th>
                      <th className="p-4">Daawashada</th>
                      <th className="p-4 text-right">Ficilada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#F0EDF5]">
                    {blogs.map((b) => (
                      <tr key={b.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold max-w-[200px] truncate">{b.title}</td>
                        <td className="p-4 text-[#8A8699]">{b.category}</td>
                        <td className="p-4 text-[#8A8699]">{b.date}</td>
                        <td className="p-4">{b.views}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => { setEditingBlog(b); setBlogModalOpen(true); }}
                              className="p-1.5 rounded-lg bg-[#1C1C26] text-blue-400 hover:bg-blue-400/20 transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => { if(confirm('Tirtir?')) setBlogs(blogs.filter(x => x.id !== b.id)) }}
                              className="p-1.5 rounded-lg bg-[#1C1C26] text-rose-400 hover:bg-rose-400/20 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Modals */}
          {bookModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-white/10 relative">
                <button onClick={() => setBookModalOpen(false)} className="absolute top-4 right-4 text-[#8A8699] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-serif text-xl font-bold text-white mb-6">{editingBook ? 'Tafatir Buugga' : 'Kudar Buug Cusub'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#8A8699] mb-1">Ciwaanka</label>
                    <input type="text" defaultValue={editingBook?.title} className="w-full px-4 py-2.5 rounded-xl bg-[#1C1C26] border border-white/10 text-white text-sm focus:border-[#D4A843] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8A8699] mb-1">Qoraaga</label>
                    <input type="text" defaultValue={editingBook?.author} className="w-full px-4 py-2.5 rounded-xl bg-[#1C1C26] border border-white/10 text-white text-sm focus:border-[#D4A843] focus:outline-none" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isPaid" defaultChecked={editingBook?.is_paid} className="accent-[#D4A843]" />
                    <label htmlFor="isPaid" className="text-sm text-[#F0EDF5]">Waa Premium (Lacag ah)</label>
                  </div>
                  <button onClick={() => setBookModalOpen(false)} className="w-full py-3 rounded-xl bg-[#70193D] text-white font-bold hover:brightness-110 mt-4">
                    {editingBook ? 'Keydi Isbedelka' : 'Keydi Buugga'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {blogModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
              <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-white/10 relative">
                <button onClick={() => setBlogModalOpen(false)} className="absolute top-4 right-4 text-[#8A8699] hover:text-white">
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-serif text-xl font-bold text-white mb-6">{editingBlog ? 'Tafatir Qoraalka' : 'Kudar Qoraal Cusub'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#8A8699] mb-1">Ciwaanka</label>
                    <input type="text" defaultValue={editingBlog?.title} className="w-full px-4 py-2.5 rounded-xl bg-[#1C1C26] border border-white/10 text-white text-sm focus:border-[#D4A843] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8A8699] mb-1">Qaybta</label>
                    <input type="text" defaultValue={editingBlog?.category} className="w-full px-4 py-2.5 rounded-xl bg-[#1C1C26] border border-white/10 text-white text-sm focus:border-[#D4A843] focus:outline-none" />
                  </div>
                  <button onClick={() => setBlogModalOpen(false)} className="w-full py-3 rounded-xl bg-[#70193D] text-white font-bold hover:brightness-110 mt-4">
                    {editingBlog ? 'Keydi Isbedelka' : 'Keydi Qoraalka'}
                  </button>
                </div>
              </div>
            </div>
          )}
`;

content = content.replace('</main>', injectUI + '\n      </main>');

fs.writeFileSync('src/app/admin/page.tsx', content);
console.log('Update complete!');
