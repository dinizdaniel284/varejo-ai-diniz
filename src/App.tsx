import { useState } from 'react'
import './App.css'

const ASSETS = {
  banner: "https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=1200",
  pix: "https://logopsa.com/wp-content/uploads/2022/01/Logo-Pix-PNG-Icone-Transparente.png",
  cartao: "https://cdn-icons-png.flaticon.com/512/4341/4341764.png"
};

function App() {
  const [tab, setTab] = useState('home')
  const [cart, setCart] = useState<any[]>([])
  const [aiMessage, setAiMessage] = useState("Me diga o que você procura 👇")
  const [query, setQuery] = useState("")

  // ESTADO DOS PRODUTOS (Agora eles mudam de verdade!)
  const [products, setProducts] = useState([
    { id: 1, nome: "Copo Térmico 500ml", preco: 15.90, img: "https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 2, nome: "Kit Ferramentas 12pçs", preco: 29.90, img: "https://images.pexels.com/photos/175045/pexels-photo-175045.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 3, nome: "Boneca Soft Kids", preco: 19.00, img: "https://images.pexels.com/photos/3663068/pexels-photo-3663068.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 4, nome: "Organizador de Mesa", preco: 8.50, img: "https://images.pexels.com/photos/3952031/pexels-photo-3952031.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ])

  // Campos do formulário ADM
  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newImg, setNewImg] = useState("")

  // Lógica de Deletar Produto
  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  // Lógica de Cadastrar Produto
  const addProduct = () => {
    if (!newName || !newPrice) return alert("Preencha nome e preço!");
    const newItem = {
      id: Date.now(),
      nome: newName,
      preco: parseFloat(newPrice),
      img: newImg || "https://images.pexels.com/photos/4022083/pexels-photo-4022083.jpeg?auto=compress&cs=tinysrgb&w=400"
    };
    setProducts([...products, newItem]);
    setNewName(""); setNewPrice(""); setNewImg("");
    alert("Produto cadastrado com sucesso!");
  };

  const handleAI = () => {
    const q = query.toLowerCase()
    if (q.includes("copo")) setAiMessage("Temos copos térmicos por R$15,90! Quer ver agora na vitrine?")
    else if (q.includes("ferramenta")) setAiMessage("Kit de ferramentas por R$29,90! Ótima opção 👌")
    else setAiMessage("Temos produtos a partir de R$1,99! Navegue pela vitrine 👇")
    setQuery("")
  }

  const addToCart = (p: any) => setCart([...cart, { ...p, cid: Math.random() }]);

  return (
    <div className="container">
      <nav className="main-nav">
        <button className={`nav-btn ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>Início</button>
        <button className={`nav-btn ${tab === 'shop' ? 'active' : ''}`} onClick={() => setTab('shop')}>Loja</button>
        <button className={`nav-btn ${tab === 'cart' ? 'active' : ''}`} onClick={() => setTab('cart')}>Carrinho ({cart.length})</button>
        <button className={`nav-btn ${tab === 'adm' ? 'active' : ''}`} onClick={() => setTab('adm')}>⚙️ ADM</button>
      </nav>

      {tab === 'home' && (
        <div className="fade-in">
          <header className="main-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${ASSETS.banner})` }}>
            <h1 className="banner-title">🔥 OFERTAS EM SANTA RITA</h1>
            <button className="nav-btn active" style={{ marginTop: '15px' }} onClick={() => setTab('shop')}>VER PROMOÇÕES</button>
          </header>

          <section className="section">
            <h2 className="section-title">🤖 Compre com ajuda da IA</h2>
            <div className="ai-cloud-chat">
              <p style={{ fontSize: '0.9rem' }}><strong>Diniz IA:</strong> {aiMessage}</p>
              <div className="ai-input-group">
                <input className="ai-input" placeholder="Ex: Tem copo?" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="nav-btn active" onClick={handleAI}>OK</button>
              </div>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">🔥 Destaques</h2>
            <div className="horizontal-scroll">
              {products.slice(0, 3).map(p => (
                <div key={p.id} className="product-card">
                  <img src={p.img} alt={p.nome} onError={(e:any)=>{e.target.src="https://placehold.co/400x400?text=Produto"}} />
                  <p className="product-name">{p.nome}</p>
                  <p className="product-price">R$ {p.preco.toFixed(2)}</p>
                  <button className="btn-buy" onClick={() => addToCart(p)}>ADICIONAR</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'shop' && (
        <div className="fade-in">
          <section className="section">
            <h2 className="section-title">🛍️ Vitrine Completa</h2>
            <div className="shop-full-grid">
              {products.map(p => (
                <div key={p.id} className="product-card">
                  <img src={p.img} alt={p.nome} onError={(e:any)=>{e.target.src="https://placehold.co/400x400?text=Produto"}} />
                  <p className="product-name">{p.nome}</p>
                  <p className="product-price">R$ {p.preco.toFixed(2)}</p>
                  <button className="btn-buy" onClick={() => addToCart(p)}>ADICIONAR</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'cart' && (
        <section className="section fade-in">
          <h2 className="section-title">🛒 Sua Sacola</h2>
          {cart.length === 0 ? <p style={{ textAlign: 'center', padding: '20px' }}>Vazia.</p> : (
            <>
              {cart.map(i => (
                <div key={i.cid} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <span>{i.nome}</span>
                  <button style={{ color: 'red', border: 'none', background: 'none' }} onClick={() => setCart(cart.filter(x => x.cid !== i.cid))}>Remover</button>
                </div>
              ))}
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3>Total: R$ {cart.reduce((a, b) => a + b.preco, 0).toFixed(2)}</h3>
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                   <button className="nav-btn active" style={{flex:1, background:'#00BFFF'}}>PIX</button>
                   <button className="nav-btn active" style={{flex:1, background:'#4B0082'}}>CARTÃO</button>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {tab === 'adm' && (
        <div className="fade-in">
          <section className="section">
            <h2 className="section-title">⚙️ Painel de Controle (ADM)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input className="ai-input" placeholder="Nome" value={newName} onChange={(e)=>setNewName(e.target.value)} />
              <input className="ai-input" placeholder="URL da Imagem" value={newImg} onChange={(e)=>setNewImg(e.target.value)} />
              <input className="ai-input" placeholder="Preço" type="number" value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} />
              <button className="nav-btn active" onClick={addProduct}>CADASTRAR PRODUTO</button>
            </div>
            
            <h3 style={{ marginTop: '20px', fontSize: '1rem' }}>📦 Produtos Ativos</h3>
            <div style={{ marginTop: '10px' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
                  <span>{p.nome} - R${p.preco.toFixed(2)}</span>
                  <button onClick={() => deleteProduct(p.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Excluir</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App