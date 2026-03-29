import { useState } from 'react'
import './App.css'

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [activeCat, setActiveCat] = useState('Todas');

  const CATEGORIES = [
    { name: 'Todas', icon: '✨' },
    { name: 'Cozinha', icon: '🍳' },
    { name: 'Limpeza', icon: '🧹' },
    { name: 'Brinquedos', icon: '🧸' },
    { name: 'Utilidades', icon: '🛠️' },
  ];

  const PRODUCTS = [
    { id: 1, cat: 'Cozinha', nome: "Jogo de Copos 6pçs", preco: 12.90, img: "https://images.unsplash.com/photo-1517256011271-103ad749172e?w=300" },
    { id: 2, cat: 'Limpeza', nome: "Vassoura Multiuso", preco: 9.90, img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300" },
    { id: 3, cat: 'Brinquedos', nome: "Carrinho de Fricção", preco: 5.00, img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300" },
    { id: 4, cat: 'Utilidades', nome: "Organizador de Gavetas", preco: 7.50, img: "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=300" },
  ];

  const filteredProducts = activeCat === 'Todas' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCat);

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header-minimal">
        <h1>DINIZ STORE 1:99</h1>
      </header>

      {/* HERO BANNER */}
      <section className="hero-flash">
        <p style={{fontWeight: 800, color: '#ffeb3b'}}>⚡ OFERTAS DO DIA</p>
        <h2>SÓ HOJE EM SANTA RITA</h2>
        <button className="btn-zap-main" onClick={() => window.open('https://wa.me/5519999999999')}>
          COMPRAR PELO WHATSAPP
        </button>
      </section>

      {/* DIFERENCIAL LOCAL */}
      <div className="local-info">
        <h4>📍 Entrega Expressa</h4>
        <p style={{fontSize: '0.85rem', fontWeight: 600}}>Receba em até 1h ou retire no Centro hoje mesmo!</p>
      </div>

      {/* CATEGORIAS */}
      <div className="categories-scroll">
        {CATEGORIES.map(c => (
          <div key={c.name} className={`cat-item ${activeCat === c.name ? 'active' : ''}`} onClick={() => setActiveCat(c.name)}>
            <div className="cat-icon">{c.icon}</div>
            {c.name}
          </div>
        ))}
      </div>

      {/* PRODUTOS */}
      <h3 style={{marginBottom: '15px'}}>🔥 Mais Vendidos</h3>
      <div className="product-list">
        {filteredProducts.map(p => (
          <div key={p.id} className="card-vendas">
            <img src={p.img} alt={p.nome} className="card-img" />
            <h3>{p.nome}</h3>
            <div className="price-box">
              <div className="price-label">De R$ {(p.preco * 1.4).toFixed(2)}</div>
              <div className="price-value">R$ {p.preco.toFixed(2)}</div>
            </div>
            <button className="btn-small-buy" onClick={() => {setCartCount(cartCount + 1); alert('Adicionado! Finalize no Zap abaixo.');}}>
              PEDIR AGORA
            </button>
          </div>
        ))}
      </div>

      {/* FEEDBACKS */}
      <section className="feedback-section">
        <h3 style={{marginBottom: '15px'}}>O que dizem os vizinhos:</h3>
        <div className="feedback-bubble">"Melhor preço de Santa Rita. Entrega muito rápido!" - <strong>Maria Silva</strong></div>
        <div className="feedback-bubble">"O atendimento pelo WhatsApp é 10." - <strong>José P.</strong></div>
      </section>

      {/* FOOTER - INFO LOJA */}
      <footer className="footer">
        <p><strong>📍 Rua do Comércio, 123 - Centro</strong></p>
        <p>Santa Rita do Passa Quatro - SP</p>
        <p style={{marginTop: '10px'}}>⏰ Seg a Sex: 08h às 18h | Sáb: 08h às 13h</p>
        <div style={{marginTop: '30px', opacity: 0.5}}>© 2026 Agência IA Diniz</div>
      </footer>

      {/* BOTÃO FIXO ZAP */}
      <a href="https://wa.me/5519999999999" className="btn-float-zap">
        <span style={{fontSize: '2rem'}}>💬</span>
      </a>
    </div>
  )
}

export default App
     
