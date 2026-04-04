import { useState } from 'react'
import './App.css'

const ASSETS = {
  banner: "https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=1200",
}

function App() {
  const [tab, setTab] = useState('home')
  const [cart, setCart] = useState<any[]>([])
  const [aiMessage, setAiMessage] = useState("Me diga o que você procura 👇")
  const [query, setQuery] = useState("")

  const [products, setProducts] = useState([
    { id: 1, nome: "Copo Térmico 500ml", preco: 15.90, img: "https://images.pexels.com/photos/5835353/pexels-photo-5835353.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 2, nome: "Kit Ferramentas 12pçs", preco: 29.90, img: "https://images.pexels.com/photos/175045/pexels-photo-175045.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 3, nome: "Boneca Soft Kids", preco: 19.00, img: "https://images.pexels.com/photos/3663068/pexels-photo-3663068.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { id: 4, nome: "Organizador de Mesa", preco: 8.50, img: "https://images.pexels.com/photos/3952031/pexels-photo-3952031.jpeg?auto=compress&cs=tinysrgb&w=400" },
  ])

  const [newName, setNewName] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newImg, setNewImg] = useState("")

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const addProduct = () => {
    if (!newName || !newPrice) return alert("Preencha nome e preço!")

    const newItem = {
      id: Date.now(),
      nome: newName,
      preco: parseFloat(newPrice),
      img: newImg || "https://images.pexels.com/photos/4022083/pexels-photo-4022083.jpeg?auto=compress&cs=tinysrgb&w=400"
    }

    setProducts([...products, newItem])
    setNewName("")
    setNewPrice("")
    setNewImg("")
  }

  const handleAI = () => {
    const q = query.toLowerCase()

    if (q.includes("copo"))
      setAiMessage("🤖 Recomendação IA: Copo térmico por R$15,90. Produto com alta saída 🔥")
    else if (q.includes("ferramenta"))
      setAiMessage("🔧 IA indica: Kit ferramentas R$29,90. Excelente custo-benefício 👌")
    else
      setAiMessage("📊 IA: Produtos a partir de R$1,99. Explore a vitrine para mais opções!")

    setQuery("")
  }

  const addToCart = (p: any) => {
    setCart([...cart, { ...p, cid: Math.random() }])
  }

  const checkout = () => {
    if (cart.length === 0) return alert("Carrinho vazio!")

    const total = cart.reduce((a, b) => a + b.preco, 0).toFixed(2)

    const msg = encodeURIComponent(
      `🛒 Pedido via sistema inteligente\nTotal: R$ ${total}\n\nItens:\n${cart.map(i => `- ${i.nome}`).join('\n')}`
    )

    window.open(`https://wa.me/5511999999999?text=${msg}`)
  }

  return (
    <div className="container">

      <nav className="main-nav">
        <button className={`nav-btn ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>Início</button>
        <button className={`nav-btn ${tab === 'shop' ? 'active' : ''}`} onClick={() => setTab('shop')}>Loja</button>
        <button className={`nav-btn ${tab === 'cart' ? 'active' : ''}`} onClick={() => setTab('cart')}>Carrinho ({cart.length})</button>
        <button className={`nav-btn ${tab === 'adm' ? 'active' : ''}`} onClick={() => setTab('adm')}>⚙️ ADM</button>
      </nav>

      {tab === 'home' && (
        <>
          <header className="main-banner" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${ASSETS.banner})` }}>
            <h1 className="banner-title">🚀 Aumente suas vendas com IA</h1>
            <p style={{marginTop:'10px'}}>Sistema inteligente que recomenda produtos automaticamente</p>
            <button className="nav-btn active" style={{marginTop:'15px'}} onClick={() => setTab('shop')}>VER PRODUTOS</button>
          </header>

          <section className="section">
            <h2 className="section-title">🤖 Assistente Inteligente</h2>
            <p><strong>IA:</strong> {aiMessage}</p>
            <input className="ai-input" placeholder="Ex: tem copo?" value={query} onChange={(e)=>setQuery(e.target.value)} />
            <button className="nav-btn active" onClick={handleAI}>Perguntar</button>
          </section>

          <section className="section">
            <h2 className="section-title">📈 Benefícios</h2>
            <p>✔ Aumenta vendas automaticamente</p>
            <p>✔ Recomenda produtos com IA</p>
            <p>✔ Reduz abandono de carrinho</p>
          </section>

          <section className="section">
            <h2 className="section-title">🔥 Destaques</h2>
            <div className="shop-full-grid">
              {products.slice(0,3).map(p=>(
                <div key={p.id} className="product-card">
                  <img src={p.img} />
                  <p>{p.nome}</p>
                  <p>R$ {p.preco}</p>
                  <button className="btn-buy" onClick={()=>addToCart(p)}>Adicionar ao Pedido Inteligente</button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === 'shop' && (
        <section className="section">
          <h2 className="section-title">🛍️ Vitrine Inteligente</h2>
          <div className="shop-full-grid">
            {products.map(p=>(
              <div key={p.id} className="product-card">
                <img src={p.img} />
                <p>{p.nome}</p>
                <p>R$ {p.preco}</p>
                <button className="btn-buy" onClick={()=>addToCart(p)}>Adicionar ao Pedido Inteligente</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'cart' && (
        <section className="section">
          <h2 className="section-title">🛒 Carrinho</h2>
          {cart.map(i=>(
            <div key={i.cid}>
              {i.nome}
            </div>
          ))}
          <button className="nav-btn active" onClick={checkout}>
            Finalizar no WhatsApp
          </button>
        </section>
      )}

      {tab === 'adm' && (
        <section className="section">
          <h2>⚙️ Painel ADM</h2>

          <input placeholder="Nome" value={newName} onChange={(e)=>setNewName(e.target.value)} />
          <input placeholder="Preço" value={newPrice} onChange={(e)=>setNewPrice(e.target.value)} />
          <input placeholder="Imagem" value={newImg} onChange={(e)=>setNewImg(e.target.value)} />

          <button onClick={addProduct}>Cadastrar</button>

          {products.map(p=>(
            <div key={p.id}>
              {p.nome}
              <button onClick={()=>deleteProduct(p.id)}>Excluir</button>
            </div>
          ))}
        </section>
      )}

    </div>
  )
}

export default App
