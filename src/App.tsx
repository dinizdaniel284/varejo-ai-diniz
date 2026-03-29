import { useState } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [aiMessage, setAiMessage] = useState("Olá! Eu sou a IA da Diniz Store. Como posso te ajudar a encontrar o produto ideal hoje?");
  const [query, setQuery] = useState("");

  const PRODUCTS = [
    { id: 1, nome: "Copo Térmico 500ml", preco: 15.90, img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=400" },
    { id: 2, nome: "Kit Ferramentas 12pçs", preco: 29.90, img: "https://images.unsplash.com/photo-1530124566582-aa3751f5ba3c?w=400" },
    { id: 3, nome: "Boneca Soft Kids", preco: 19.00, img: "https://images.unsplash.com/photo-1559441165-27663a75871b?w=400" },
  ];

  const handleAI = () => {
    if(query.toLowerCase().includes("copo")) setAiMessage("Temos copos térmicos incríveis na nossa seção de compras! Eles estão custando apenas R$ 15,90.");
    else if(query.toLowerCase().includes("ferramenta")) setAiMessage("Temos um Kit de Ferramentas completo por R$ 29,90. É o mais vendido da semana!");
    else setAiMessage("Temos várias utilidades por 1,99 e promoções especiais. Olhe nossa vitrine abaixo!");
    setQuery("");
  };

  return (
    <div className="container">
      <nav className="main-nav">
        <button className={`nav-btn ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>INÍCIO</button>
        <button className={`nav-btn ${tab === 'cart' ? 'active' : ''}`} onClick={() => setTab('cart')}>COMPRAS ({cart.length})</button>
        <button className={`nav-btn ${tab === 'admin' ? 'active' : ''}`} onClick={() => setTab('admin')}>ADM</button>
      </nav>

      {tab === 'home' && (
        <div className="fade-in">
          <header className="main-banner">
            <h1 style={{fontSize: '2.5rem', fontWeight: 900}}>LOJA 1:99 SANTA RITA</h1>
            <p style={{fontSize: '1.2rem'}}>Qualidade e economia para sua família</p>
          </header>

          <section className="section">
            <h2 className="section-title">💬 Assistente Inteligente (IA)</h2>
            <div className="ai-cloud-chat">
              <p><strong>Diniz IA:</strong> {aiMessage}</p>
              <div className="ai-input-group">
                <input className="ai-input" placeholder="O que você procura?" value={query} onChange={(e)=>setQuery(e.target.value)} />
                <button className="nav-btn active" onClick={handleAI}>Perguntar</button>
              </div>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">🛒 Vitrine de Ofertas</h2>
            <div className="shop-grid">
              {PRODUCTS.map(p => (
                <div key={p.id} className="product-card">
                  <img src={p.img} alt={p.nome} />
                  <h4>{p.nome}</h4>
                  <p style={{color: 'var(--primary)', fontWeight: 800}}>R$ {p.preco.toFixed(2)}</p>
                  <button className="nav-btn active" style={{width: '100%', marginTop: '10px'}} onClick={() => setCart([...cart, {...p, cid: Math.random()}])}>ADICIONAR</button>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">📖 Sobre Nós</h2>
            <p>Desde 2010, a Diniz Store atende Santa Rita do Passa Quatro com foco em utilidades e praticidade. Nosso objetivo é oferecer o melhor preço da região.</p>
            <div style={{marginTop: '20px', fontSize: '0.9rem'}}>
              <p>📍 <strong>Endereço:</strong> Rua do Comércio, 123 - Centro</p>
              <p>⏰ <strong>Horário:</strong> Seg a Sáb: 08h às 18h</p>
            </div>
          </section>

          <section className="section">
            <h2 className="section-title">⭐ O que dizem</h2>
            <div className="feedback-grid">
              <div className="feedback-card">"Melhor loja da cidade, a IA ajudou muito a achar o presente!" - <strong>João M.</strong></div>
              <div className="feedback-card">"Preço justo e atendimento nota 10." - <strong>Maria F.</strong></div>
            </div>
          </section>
        </div>
      )}

      {tab === 'cart' && (
        <section className="section fade-in">
          <h2 className="section-title">Sua Sacola</h2>
          {cart.map(i => (
            <div key={i.cid} style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee'}}>
              <span>{i.nome}</span>
              <button style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer'}} onClick={() => setCart(cart.filter(x => x.cid !== i.cid))}>Remover</button>
            </div>
          ))}
          <h3 style={{marginTop: '20px', textAlign: 'right'}}>Total: R$ {cart.reduce((a,b)=>a+b.preco, 0).toFixed(2)}</h3>
          <button className="nav-btn active" style={{width: '100%', marginTop: '20px', background: '#25d366'}}>Finalizar no WhatsApp</button>
        </section>
      )}

      {tab === 'admin' && (
        <section className="section fade-in">
          <h2 className="section-title">Painel Administrativo</h2>
          <p>Gerencie seus produtos e visualize métricas de vendas aqui.</p>
          <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <input className="ai-input" placeholder="Nome do Produto" />
            <input className="ai-input" placeholder="Preço" type="number" />
            <button className="nav-btn active">Cadastrar Novo Item</button>
          </div>
        </section>
      )}

      <footer style={{textAlign: 'center', padding: '40px 0', opacity: 0.5, fontSize: '0.8rem'}}>
        © 2026 Agência IA Diniz - Santa Rita do Passa Quatro
      </footer>
    </div>
  )
}
export default App
            
