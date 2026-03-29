import { useState } from 'react'
import './App.css'

function App() {
  const [tab, setTab] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [showAI, setShowAI] = useState(false);

  const PRODUCTS = [
    { id: 1, nome: "Copo Térmico 500ml", preco: 15.90, img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=400" },
    { id: 2, nome: "Kit Ferramentas 12pçs", preco: 29.90, img: "https://images.unsplash.com/photo-1530124566582-aa3751f5ba3c?w=400" },
  ];

  const addToCart = (p: any) => setCart([...cart, { ...p, cartId: Math.random() }]);
  const removeFromCart = (id: number) => setCart(cart.filter(item => item.cartId !== id));
  const total = cart.reduce((acc, i) => acc + i.preco, 0);

  return (
    <div className="app-shell">
      <nav className="nav-tabs">
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}>LOJA</button>
        <button className={tab === 'cart' ? 'active' : ''} onClick={() => setTab('cart')}>SACOLA ({cart.length})</button>
        <button className={tab === 'about' ? 'active' : ''} onClick={() => setTab('about')}>SOBRE</button>
      </nav>

      {tab === 'home' && (
        <main className="fade-in">
          <div className="hero-box">
            <div>
              <h2 style={{fontSize: '1.8rem'}}>DINIZ STORE</h2>
              <p>Economia real em Santa Rita!</p>
            </div>
          </div>

          <div className="prod-grid">
            {PRODUCTS.map(p => (
              <div key={p.id} className="card">
                <img src={p.img} alt={p.nome} />
                <h3 style={{fontSize: '0.9rem', marginTop: '10px'}}>{p.nome}</h3>
                <p style={{fontWeight: 900, color: 'var(--primary)'}}>R$ {p.preco.toFixed(2)}</p>
                <button className="btn-add" onClick={() => addToCart(p)}>ADICIONAR</button>
              </div>
            ))}
          </div>
        </main>
      )}

      {tab === 'cart' && (
        <div className="container fade-in" style={{paddingTop: '20px'}}>
          <section className="section-white">
            <h2 style={{marginBottom: '20px'}}>🛒 Sua Sacola</h2>
            {cart.length === 0 ? <p>Vazia...</p> : cart.map(item => (
              <div key={item.cartId} className="cart-item" style={{display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee'}}>
                <div>
                  <p style={{fontWeight: 600, fontSize: '0.9rem'}}>{item.nome}</p>
                  <p style={{fontSize: '0.8rem', color: 'var(--primary)'}}>R$ {item.preco.toFixed(2)}</p>
                </div>
                <button className="btn-remove" onClick={() => removeFromCart(item.cartId)}>Remover</button>
              </div>
            ))}
            {cart.length > 0 && <h3 style={{marginTop: '20px', textAlign: 'right'}}>Total: R$ {total.toFixed(2)}</h3>}
          </section>
        </div>
      )}

      {tab === 'about' && (
        <div className="container fade-in" style={{paddingTop: '20px'}}>
          <section className="section-white">
            <h3 style={{color: 'var(--primary)'}}>📍 Onde Estamos</h3>
            <p style={{fontSize: '0.9rem', marginTop: '5px'}}>Rua do Comércio, 123 - Centro<br/>Santa Rita do Passa Quatro - SP</p>
            <p style={{fontSize: '0.8rem', marginTop: '10px'}}>⏰ Seg a Sáb: 08h às 18h</p>
          </section>
          <section className="section-white">
            <h3 style={{color: 'var(--primary)'}}>📖 Sobre Nós</h3>
            <p style={{fontSize: '0.9rem', marginTop: '5px'}}>Fundada com o objetivo de trazer utilidades baratas e qualidade para nossa cidade. Somos a sua loja 1:99 de confiança!</p>
          </section>
        </div>
      )}

      {/* CHATBOT IA INTEGRADO */}
      {showAI && (
        <div className="chat-ai-box">
          <div className="chat-header">🤖 ASSISTENTE DINIZ IA</div>
          <div style={{padding: '15px', fontSize: '0.85rem'}}>
            <p><strong>IA:</strong> Olá! Procuro algo para você em Santa Rita?</p>
            <div style={{marginTop: '10px', background: '#f1f5f9', padding: '8px', borderRadius: '8px'}}>
              "Tem brinquedo hoje?"
            </div>
          </div>
        </div>
      )}

      <button className="btn-float" style={{bottom: '20px', left: '20px', background: 'var(--primary)'}} onClick={() => setShowAI(!showAI)}>🤖</button>
      <a href="https://wa.me/5519999999999" className="btn-float">💬</a>
    </div>
  )
}
export default App
            
